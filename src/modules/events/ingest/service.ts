import { db } from "@/lib/db";
import { formatDate, formatPartialDate, plural } from "@/lib/format";
import { logger } from "@/lib/logger";
import { generateEventDraft } from "@/modules/ai/event-draft";
import { aiConfigured } from "@/modules/ai/provider";
import type { DraftReport } from "@/modules/ai/reference-check";
import { checkSourceUrl, type PublisherPolicy } from "@/modules/sources/url-policy";
import { eventContentSchema } from "../content";
import { attachSourceToEvent, createEventDraft, evaluatePublication, publishEventAutomatically, slugify } from "../service";
import { autoPublishProblems } from "./audit";
import { NEWS_FEEDS, type NewsFeed } from "./feeds";
import { itemParagraphs, parseRss, type RssItem } from "./rss";
import { isRunDue, latestSlot, localDate, readIngestionSettings, type IngestionSettings } from "./schedule";
import { classifyThemes, extractIdentifiers, relevance, SAME_STORY_SIMILARITY, titleSimilarity } from "./select";

// Automatic search of official news (twice a day by default; see schedule.ts):
// reads the feeds, keeps news about decisions, skips what the site already
// covers, creates an approved source with the article paragraphs and an event
// drafted by the AI from them, and publishes it only when the publication gate
// and the extra checks in audit.ts pass. Otherwise the draft waits for review.

export type IngestionTrigger = "SCHEDULE" | "MANUAL" | "CLI";
export type ItemDecision = "published" | "draft" | "duplicate" | "ignored" | "limit" | "found" | "error";

export type ItemReport = {
  feed: string;
  title: string;
  url: string;
  publishedAt: string | null;
  score: number;
  decision: ItemDecision;
  reason?: string;
  eventId?: string;
  eventSlug?: string;
};

export type IngestionDetails = { items: ItemReport[]; feedErrors: Array<{ feed: string; error: string }> };

export type IngestionResult = {
  runId: string | null;
  status: "SUCCESS" | "PARTIAL" | "FAILED" | "SKIPPED" | "BUSY";
  checked: number;
  candidates: number;
  created: number;
  published: number;
  drafts: number;
  summary: string;
  details: IngestionDetails;
};

export type IngestionOptions = {
  trigger: IngestionTrigger;
  now?: Date;
  fetchImpl?: typeof fetch;
  feeds?: NewsFeed[];
  settings?: Partial<IngestionSettings>;
  /** Reads, selects and reports without writing anything (npm run events:fetch -- --simulado). */
  dryRun?: boolean;
};

export const AUTOMATIC_REVIEWER = "Busca automática";

const LOCK = "running";
const STALE_AFTER_MS = 30 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 15_000;
const MAX_FEED_CHARS = 5_000_000;
const MAX_EXCERPTS = 8;
const MAX_EXCERPT_CHARS = 1800;
const MIN_TEXT_CHARS = 400;
/** Drafts that fail the checks do not count toward the publication target, up to this many extra attempts. */
const EXTRA_ATTEMPTS = 2;
/** A shared bill or law number means the same story only within these days (later stages become new events). */
const IDENTIFIER_WINDOW_DAYS = 4;
const SIMILARITY_WINDOW_DAYS = 10;
const MAX_REPORTED_ITEMS = 80;
const USER_AGENT = "Polis/1.0 (educacao politica; leitura de noticias institucionais)";

type Candidate = {
  feed: NewsFeed;
  publisherId: string;
  item: RssItem;
  url: string;
  publishedOn: string;
  paragraphs: string[];
  score: number;
  themes: string[];
  identifiers: string[];
};

type KnownEvent = { id: string; slug: string; title: string; when: number; identifiers: string[] };

function describe(error: unknown): string {
  if (error instanceof Error) return (error.name === "TimeoutError" || error.name === "AbortError" ? "tempo esgotado" : error.message).slice(0, 200);
  return String(error).slice(0, 200);
}

function clip(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
}

async function fetchFeed(feed: NewsFeed, fetchImpl: typeof fetch): Promise<string> {
  const response = await fetchImpl(feed.url, {
    headers: { "user-agent": USER_AGENT, accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (Number(response.headers.get("content-length") ?? 0) > MAX_FEED_CHARS) throw new Error("resposta grande demais");
  const xml = await response.text();
  if (xml.length > MAX_FEED_CHARS) throw new Error("resposta grande demais");
  return xml;
}

async function readFeeds(
  feeds: Array<{ feed: NewsFeed; publisherId: string }>,
  policies: PublisherPolicy[],
  fetchImpl: typeof fetch,
  now: Date,
  settings: IngestionSettings,
) {
  const items: ItemReport[] = [];
  const candidates: Candidate[] = [];
  const feedErrors: IngestionDetails["feedErrors"] = [];
  const since = now.getTime() - settings.windowHours * 60 * 60 * 1000;
  let checked = 0;

  for (const { feed, publisherId } of feeds) {
    let parsed: RssItem[];
    try {
      parsed = parseRss(await fetchFeed(feed, fetchImpl));
    } catch (error) {
      feedErrors.push({ feed: feed.label, error: describe(error) });
      continue;
    }
    if (parsed.length === 0) feedErrors.push({ feed: feed.label, error: "nenhuma notícia encontrada no feed (formato inesperado?)" });
    checked += parsed.length;

    for (const item of parsed) {
      const base = { feed: feed.label, title: clip(item.title, 300), url: item.link.slice(0, 500), publishedAt: item.publishedAt?.toISOString() ?? null, score: 0 };
      const ignore = (reason: string, score = 0) => items.push({ ...base, score, decision: "ignored", reason });
      const check = checkSourceUrl(item.link, policies, feed.publisherKey);
      if (!check.ok) {
        ignore("endereço fora do editor aprovado");
        continue;
      }
      const url = new URL(check.canonicalUrl);
      url.hash = "";
      url.search = "";
      if (!feed.articlePath.test(url.pathname)) {
        ignore("não é uma matéria (áudio, vídeo ou página especial)");
        continue;
      }
      if (!item.publishedAt) {
        ignore("sem data de publicação");
        continue;
      }
      if (item.publishedAt.getTime() < since) {
        ignore("publicada antes do período desta busca");
        continue;
      }
      if (item.publishedAt.getTime() > now.getTime() + 60 * 60 * 1000) {
        ignore("data de publicação no futuro");
        continue;
      }
      const paragraphs = itemParagraphs(item);
      if (paragraphs.join(" ").length < MIN_TEXT_CHARS) {
        ignore("texto curto demais para sustentar uma análise");
        continue;
      }
      const rel = relevance(item.title, paragraphs);
      if (rel.excluded) {
        ignore(rel.excluded, rel.score);
        continue;
      }
      candidates.push({
        feed,
        publisherId,
        item,
        url: url.toString(),
        publishedOn: localDate(item.publishedAt, settings.timeZone),
        paragraphs,
        score: rel.score,
        themes: classifyThemes(item.title, paragraphs),
        identifiers: extractIdentifiers(item.title, paragraphs, now.getUTCFullYear()),
      });
    }
  }
  candidates.sort((a, b) => b.score - a.score || b.item.publishedAt!.getTime() - a.item.publishedAt!.getTime());
  return { checked, items, candidates, feedErrors };
}

/** Events from the last days, with the identifiers used to recognize the same story. */
async function loadRecentEvents(now: Date): Promise<KnownEvent[]> {
  const since = new Date(now.getTime() - SIMILARITY_WINDOW_DAYS * DAY_MS);
  const events = await db.event.findMany({
    where: { OR: [{ createdAt: { gte: since } }, { eventDate: { gte: since } }] },
    select: {
      id: true,
      slug: true,
      title: true,
      eventDate: true,
      createdAt: true,
      content: true,
      sources: { select: { source: { select: { excerpts: { select: { text: true }, orderBy: { createdAt: "asc" }, take: 2 } } } } },
    },
  });
  return events.map((event) => {
    const content = eventContentSchema.safeParse(event.content);
    // Opening paragraphs of the sources first: news name the bill or law there.
    const lead = [...event.sources.flatMap((s) => s.source.excerpts.map((e) => e.text)), content.success ? content.data.summary.text : ""];
    return {
      id: event.id,
      slug: event.slug,
      title: event.title,
      when: Math.max(event.eventDate.getTime(), event.createdAt.getTime()),
      identifiers: extractIdentifiers(event.title, lead, now.getUTCFullYear()),
    };
  });
}

function sameStory(candidate: Candidate, known: KnownEvent[], now: Date): KnownEvent | null {
  const identifierCutoff = now.getTime() - IDENTIFIER_WINDOW_DAYS * DAY_MS;
  return (
    known.find(
      (event) =>
        (event.when >= identifierCutoff && candidate.identifiers.some((id) => event.identifiers.includes(id))) ||
        titleSimilarity(candidate.item.title, event.title) >= SAME_STORY_SIMILARITY,
    ) ?? null
  );
}

async function existingSource(url: string) {
  const variants = [url, url.endsWith("/") ? url.slice(0, -1) : `${url}/`];
  return db.source.findFirst({
    where: { url: { in: variants } },
    select: { id: true, eventSources: { take: 1, select: { event: { select: { id: true, slug: true, title: true } } } } },
  });
}

async function appendEditorNote(eventId: string, note: string) {
  const event = await db.event.findUnique({ where: { id: eventId }, select: { editorNotes: true } });
  // The editor form accepts up to 1500 characters.
  const merged = [event?.editorNotes, note].filter(Boolean).join("\n\n");
  await db.event.update({ where: { id: eventId }, data: { editorNotes: clip(merged, 1500) } });
}

async function createNewsSource(candidate: Candidate, excerpts: Array<{ locator: string; text: string }>, now: Date) {
  const base = `${candidate.feed.publisherKey}-${slugify(candidate.item.title)}`.slice(0, 70).replace(/-+$/, "");
  let key = base;
  for (let i = 2; await db.source.findUnique({ where: { key }, select: { id: true } }); i++) key = `${base}-${i}`;
  return db.source.create({
    data: {
      key,
      publisherId: candidate.publisherId,
      title: clip(candidate.item.title, 300),
      url: candidate.url,
      author: candidate.feed.author,
      publishedOn: candidate.publishedOn,
      accessedAt: now,
      locator: excerpts.length > 1 ? `Parágrafos 1 a ${excerpts.length}` : "Parágrafo 1",
      materialType: "ATO_REGISTRO",
      reuseKind: "OPEN_LICENSE",
      reuseCondition: candidate.feed.reuseCondition,
      scopeNote: `Notícia institucional da ${candidate.feed.label}, importada pela busca automática em ${formatDate(now)}. Registra decisões e declarações; declarações de parlamentares e autoridades, estimativas e previsões citadas não são fatos verificados.`,
      reviewStatus: "APPROVED",
      reviewedAt: now,
      reviewedBy: AUTOMATIC_REVIEWER,
      // Distinct timestamps keep the paragraphs in reading order in the evidence pack.
      excerpts: { create: excerpts.map((excerpt, index) => ({ ...excerpt, createdAt: new Date(now.getTime() + index) })) },
    },
  });
}

type ImportOutcome = { ok: true; eventId: string; slug: string; published: boolean; reason: string } | { ok: false; reason: string };

/** Source + event + AI draft + checks. Until the draft is saved, failures are rolled back so the next search can retry the news. */
async function importCandidate(candidate: Candidate, now: Date): Promise<ImportOutcome> {
  const excerpts = candidate.paragraphs.slice(0, MAX_EXCERPTS).map((text, index) => ({ locator: `Parágrafo ${index + 1}`, text: clip(text, MAX_EXCERPT_CHARS) }));
  let sourceId: string | null = null;
  let eventId: string | null = null;
  const rollback = async () => {
    if (eventId) await db.event.delete({ where: { id: eventId } }).catch(() => {});
    if (sourceId) await db.source.delete({ where: { id: sourceId } }).catch(() => {});
  };
  let event: { id: string; slug: string };
  let report: DraftReport;
  try {
    sourceId = (await createNewsSource(candidate, excerpts, now)).id;
    event = await createEventDraft({
      title: clip(candidate.item.title, 200),
      eventDate: new Date(`${candidate.publishedOn}T12:00:00Z`),
      themes: candidate.themes,
      editorNotes: `Criado pela busca automática em ${formatDate(now)} a partir de notícia institucional da ${candidate.feed.label} publicada em ${formatPartialDate(candidate.publishedOn)}. Declarações de parlamentares e autoridades são posições atribuídas, não fatos verificados.`,
      origin: "AUTOMATIC",
    });
    eventId = event.id;
    await attachSourceToEvent(event.id, sourceId);
    const draft = await generateEventDraft(event.id);
    if (!draft.ok) {
      await rollback();
      return { ok: false, reason: draft.error };
    }
    report = draft.report;
  } catch (error) {
    await rollback();
    throw error;
  }

  const { event: saved, check } = await evaluatePublication(event.id);
  const content = eventContentSchema.parse(saved.content);
  const problems = check.publishable
    ? autoPublishProblems(content, report, { title: candidate.item.title, paragraphs: excerpts.map((e) => e.text), publishedOn: candidate.publishedOn })
    : check.blocking;
  if (problems.length === 0) {
    const published = await publishEventAutomatically(
      event.id,
      `Publicação automática: notícia institucional da ${candidate.feed.label} (${candidate.url}). Passou no portão de evidências e nas verificações da busca automática; sem revisão humana prévia.`,
    );
    if (published.ok) return { ok: true, eventId: event.id, slug: event.slug, published: true, reason: "passou nas verificações e foi publicado" };
    problems.push(...published.check.blocking);
  }
  await appendEditorNote(event.id, `Não publicado automaticamente: ${problems.join(" ")}`);
  return { ok: true, eventId: event.id, slug: event.slug, published: false, reason: problems.join(" ") };
}

function summarize(result: IngestionResult, mode: "create" | "dry-run" | "no-ai", found: number): string {
  const read = `${plural(result.candidates, "notícia relevante", "notícias relevantes")} entre ${plural(result.checked, "lida", "lidas")}`;
  const failedFeeds = result.details.feedErrors.length ? ` Falha ao ler: ${result.details.feedErrors.map((f) => f.feed).join(", ")}.` : "";
  if (mode === "no-ai") return `IA não configurada (OPENAI_API_KEY): nenhum acontecimento criado. ${plural(found, "notícia seria importada", "notícias seriam importadas")}; ${read}.${failedFeeds}`;
  if (mode === "dry-run") return `Simulação: ${plural(found, "notícia seria importada", "notícias seriam importadas")}; ${read}.${failedFeeds}`;
  if (result.created === 0) return `Nenhum acontecimento novo: ${read}.${failedFeeds}`;
  return `${plural(result.published, "publicado", "publicados")} e ${plural(result.drafts, "rascunho para revisão", "rascunhos para revisão")}; ${read}.${failedFeeds}`;
}

/** Marks searches that never finished (crashed process) as failed and releases the lock. */
async function releaseStaleRuns(now: Date) {
  await db.eventIngestionRun.updateMany({
    where: { lockKey: LOCK, startedAt: { lt: new Date(now.getTime() - STALE_AFTER_MS) } },
    data: { lockKey: null, status: "FAILED", finishedAt: now, summary: "Interrompida: a busca não terminou em 30 minutos." },
  });
}

/** Opens a search record holding the lock, or returns null when another search is running. */
export async function startIngestionRun(trigger: IngestionTrigger, now = new Date()) {
  await releaseStaleRuns(now);
  try {
    return await db.eventIngestionRun.create({ data: { trigger, lockKey: LOCK, startedAt: now }, select: { id: true } });
  } catch (error) {
    if ((error as { code?: string }).code === "P2002") return null;
    throw error;
  }
}

export async function executeIngestionRun(runId: string | null, options: IngestionOptions): Promise<IngestionResult> {
  const now = options.now ?? new Date();
  const settings = { ...readIngestionSettings(), ...options.settings };
  const result: IngestionResult = { runId, status: "SUCCESS", checked: 0, candidates: 0, created: 0, published: 0, drafts: 0, summary: "", details: { items: [], feedErrors: [] } };
  try {
    const publishers = await db.publisher.findMany({ select: { id: true, key: true, approved: true, hostnames: true, pathPrefixes: true } });
    const feeds: Array<{ feed: NewsFeed; publisherId: string }> = [];
    for (const feed of options.feeds ?? NEWS_FEEDS) {
      const publisher = publishers.find((p) => p.key === feed.publisherKey && p.approved);
      if (publisher) feeds.push({ feed, publisherId: publisher.id });
      else result.details.feedErrors.push({ feed: feed.label, error: `editor "${feed.publisherKey}" ausente ou não aprovado no catálogo` });
    }

    const read = await readFeeds(feeds, publishers, options.fetchImpl ?? fetch, now, settings);
    result.checked = read.checked;
    result.candidates = read.candidates.length;
    result.details.items.push(...read.items);
    result.details.feedErrors.push(...read.feedErrors);

    const mode = options.dryRun ? "dry-run" : aiConfigured() ? "create" : "no-ai";
    const known = await loadRecentEvents(now);
    let attempts = 0;
    let itemErrors = 0;
    for (const candidate of read.candidates) {
      const report: ItemReport = {
        feed: candidate.feed.label,
        title: clip(candidate.item.title, 300),
        url: candidate.url,
        publishedAt: candidate.item.publishedAt!.toISOString(),
        score: candidate.score,
        decision: "found",
      };
      const imported = await existingSource(candidate.url);
      if (imported) {
        const event = imported.eventSources[0]?.event;
        result.details.items.push({ ...report, decision: "duplicate", reason: event ? `já importada em “${clip(event.title, 80)}”` : "já cadastrada como fonte", eventId: event?.id, eventSlug: event?.slug });
        continue;
      }
      const same = sameStory(candidate, known, now);
      if (same) {
        result.details.items.push({ ...report, decision: "duplicate", reason: `mesmo assunto de “${clip(same.title, 80)}”`, eventId: same.id || undefined, eventSlug: same.slug || undefined });
        continue;
      }
      const limitReached = mode === "create" ? result.published >= settings.maxPublished || attempts >= settings.maxPublished + EXTRA_ATTEMPTS : attempts >= settings.maxPublished;
      if (limitReached) {
        result.details.items.push({ ...report, decision: "limit", reason: "limite desta busca atingido; pode entrar na próxima" });
        continue;
      }
      attempts++;
      if (mode !== "create") {
        known.push({ id: "", slug: "", title: candidate.item.title, when: now.getTime(), identifiers: candidate.identifiers });
        result.details.items.push({ ...report, decision: "found", reason: mode === "dry-run" ? "seria importada" : "não criada: IA não configurada" });
        continue;
      }
      try {
        const outcome = await importCandidate(candidate, now);
        if (!outcome.ok) {
          itemErrors++;
          result.details.items.push({ ...report, decision: "error", reason: `${outcome.reason} Nada foi gravado; a próxima busca tenta de novo.` });
          continue;
        }
        result.created++;
        if (outcome.published) result.published++;
        else result.drafts++;
        known.push({ id: outcome.eventId, slug: outcome.slug, title: candidate.item.title, when: now.getTime(), identifiers: candidate.identifiers });
        result.details.items.push({ ...report, decision: outcome.published ? "published" : "draft", reason: outcome.reason, eventId: outcome.eventId, eventSlug: outcome.slug });
      } catch (error) {
        itemErrors++;
        logger.error("events.ingest.item_failed", { feed: candidate.feed.key, error: error instanceof Error ? error : undefined });
        result.details.items.push({ ...report, decision: "error", reason: describe(error) });
      }
    }

    const found = result.details.items.filter((i) => i.decision === "found").length;
    const allFeedsFailed = read.feedErrors.length > 0 && read.feedErrors.length >= feeds.length;
    result.status = allFeedsFailed || feeds.length === 0 ? "FAILED" : mode === "no-ai" ? "SKIPPED" : result.details.feedErrors.length || itemErrors ? "PARTIAL" : "SUCCESS";
    result.summary = summarize(result, mode, found);
  } catch (error) {
    result.status = "FAILED";
    result.summary = `Falha inesperada: ${describe(error)}`;
    logger.error("events.ingest.failed", { error: error instanceof Error ? error : undefined });
  } finally {
    result.details.items.sort((a, b) => order(a.decision) - order(b.decision));
    result.details.items = result.details.items.slice(0, MAX_REPORTED_ITEMS);
    if (runId) {
      await db.eventIngestionRun
        .update({
          where: { id: runId },
          data: {
            status: result.status === "BUSY" ? "FAILED" : result.status,
            lockKey: null,
            finishedAt: new Date(),
            checked: result.checked,
            candidates: result.candidates,
            created: result.created,
            published: result.published,
            drafts: result.drafts,
            summary: result.summary,
            details: result.details,
          },
        })
        .catch((error) => logger.error("events.ingest.record_failed", { runId, error: error instanceof Error ? error : undefined }));
    }
    logger.info("events.ingest.finished", { runId, trigger: options.trigger, status: result.status, checked: result.checked, candidates: result.candidates, published: result.published, drafts: result.drafts });
  }
  return result;
}

const DECISION_ORDER: ItemDecision[] = ["published", "draft", "error", "found", "limit", "duplicate", "ignored"];
function order(decision: ItemDecision): number {
  return DECISION_ORDER.indexOf(decision);
}

export async function runEventIngestion(options: IngestionOptions): Promise<IngestionResult> {
  if (options.dryRun) return executeIngestionRun(null, options);
  const run = await startIngestionRun(options.trigger, options.now);
  if (!run) {
    return {
      runId: null,
      status: "BUSY",
      checked: 0,
      candidates: 0,
      created: 0,
      published: 0,
      drafts: 0,
      summary: "Outra busca está em andamento.",
      details: { items: [], feedErrors: [] },
    };
  }
  return executeIngestionRun(run.id, options);
}

/** Called by the in-process scheduler every few minutes: runs once per slot (and catches up after downtime). */
export async function runScheduledIngestionIfDue(now = new Date(), overrides: Omit<IngestionOptions, "trigger" | "now"> = {}): Promise<IngestionResult | null> {
  const settings = { ...readIngestionSettings(), ...overrides.settings };
  await releaseStaleRuns(now);
  const slot = latestSlot(now, settings.hours, settings.timeZone);
  const runs = await db.eventIngestionRun.findMany({ where: { startedAt: { gte: slot } }, select: { status: true, startedAt: true } });
  if (!isRunDue(now, runs)) return null;
  return runEventIngestion({ ...overrides, trigger: "SCHEDULE", now });
}

export async function listRecentIngestionRuns(take = 6) {
  return db.eventIngestionRun.findMany({ orderBy: { startedAt: "desc" }, take });
}

export function ingestionDetails(raw: unknown): IngestionDetails {
  const value = raw as Partial<IngestionDetails> | null;
  return { items: Array.isArray(value?.items) ? value.items : [], feedErrors: Array.isArray(value?.feedErrors) ? value.feedErrors : [] };
}
