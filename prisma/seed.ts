// Explicit, idempotent seed: approved publishers and sources, validated lessons,
// published events backed by approved sources, and empty official forums.
// It never creates users, answers or fictitious activity, and never deletes
// user data. Run with `npm run db:seed` (separate from application startup).
// With `--if-outdated` (used by `npm run db:migrate:deploy` on every deploy) it
// runs only when the editorial content changed since the last release applied to
// the database (see CONTENT_VERSION); on a database that already has content it
// keeps the existing events, which the editorial team may have edited.
import "dotenv/config";
import { createHash } from "node:crypto";
import { db, disconnectDb } from "../src/lib/db";
import { checkEventPublication } from "../src/modules/events/content";
import { unverifiedQuotes, validateLessonForPublication } from "../src/modules/learning/content";
import { checkSourceUrl } from "../src/modules/sources/url-policy";
import { EVENTS } from "./seed-data/events";
import { OFFICIAL_FORUMS } from "./seed-data/forums";
import { MODULES } from "./seed-data/lessons";
import { ACCESSED_ON, PUBLISHERS } from "./seed-data/publishers";
import { ALL_SOURCES } from "./seed-data/sources";

const REVIEWER = "Equipe editorial da Polis";
const accessedAt = new Date(`${ACCESSED_ON}T12:00:00Z`);

// Changes whenever any editorial seed data changes, so deploys apply new content once.
const CONTENT_VERSION = `conteudo-${createHash("sha256")
  .update(JSON.stringify({ PUBLISHERS, ALL_SOURCES, MODULES, EVENTS, OFFICIAL_FORUMS }))
  .digest("hex")
  .slice(0, 16)}`;

function stable(value: unknown) {
  return JSON.stringify(value);
}

async function seedPublishers() {
  for (const p of PUBLISHERS) {
    const data = { name: p.name, acronym: p.acronym ?? null, category: p.category, hostnames: p.hostnames, pathPrefixes: p.pathPrefixes ?? [], notes: p.notes ?? null, approved: true };
    await db.publisher.upsert({ where: { key: p.key }, create: { key: p.key, ...data }, update: data });
  }
  return new Map((await db.publisher.findMany({ select: { id: true, key: true } })).map((p) => [p.key, p.id]));
}

/**
 * Seed excerpts are matched by locator and text. The seed removes only excerpts it
 * created itself (fromSeed), so excerpts added in the administration area are kept.
 */
async function syncSeedExcerpts(sourceId: string, excerpts: Array<{ locator: string; text: string }>) {
  const keyOf = (e: { locator: string; text: string }) => `${e.locator}\u0000${e.text}`;
  const wanted = new Set(excerpts.map(keyOf));
  const existing = await db.sourceExcerpt.findMany({ where: { sourceId }, select: { id: true, locator: true, text: true, fromSeed: true } });
  const present = new Set(existing.map(keyOf));
  await db.$transaction([
    db.sourceExcerpt.deleteMany({ where: { id: { in: existing.filter((e) => e.fromSeed && !wanted.has(keyOf(e))).map((e) => e.id) } } }),
    db.sourceExcerpt.updateMany({ where: { id: { in: existing.filter((e) => !e.fromSeed && wanted.has(keyOf(e))).map((e) => e.id) } }, data: { fromSeed: true } }),
    db.sourceExcerpt.createMany({
      data: excerpts.filter((e, i) => !present.has(keyOf(e)) && excerpts.findIndex((o) => keyOf(o) === keyOf(e)) === i).map((e) => ({ sourceId, locator: e.locator, text: e.text, fromSeed: true })),
    }),
  ]);
}

async function seedSources(publisherIds: Map<string, string>) {
  const policies = PUBLISHERS.map((p) => ({ key: p.key, approved: true, hostnames: p.hostnames, pathPrefixes: p.pathPrefixes ?? [] }));
  const seen = new Set<string>();
  for (const s of ALL_SOURCES) {
    if (seen.has(s.key)) throw new Error(`Fonte duplicada no seed: ${s.key}`);
    seen.add(s.key);
    const publisherId = publisherIds.get(s.publisher);
    if (!publisherId) throw new Error(`Editor desconhecido para ${s.key}: ${s.publisher}`);
    const check = checkSourceUrl(s.url, policies, s.publisher);
    if (!check.ok) throw new Error(`URL recusada para ${s.key}: ${check.reason}`);
    const data = {
      publisherId,
      title: s.title,
      url: check.canonicalUrl,
      author: s.author ?? null,
      publishedOn: s.publishedOn ?? null,
      sourceUpdatedOn: s.sourceUpdatedOn ?? null,
      accessedAt: s.accessedOn ? new Date(`${s.accessedOn}T12:00:00Z`) : accessedAt,
      locator: s.locator ?? null,
      materialType: s.materialType,
      reuseKind: s.reuseKind,
      reuseCondition: s.reuseCondition,
      scopeNote: s.scopeNote,
      reviewStatus: "APPROVED" as const,
      reviewedBy: REVIEWER,
    };
    const existing = await db.source.findUnique({ where: { key: s.key }, select: { id: true, reviewedAt: true } });
    const source = existing
      ? await db.source.update({ where: { id: existing.id }, data: { ...data, reviewedAt: existing.reviewedAt ?? new Date() } })
      : await db.source.create({ data: { key: s.key, ...data, reviewedAt: new Date() } });
    await syncSeedExcerpts(source.id, s.excerpts);
  }
  return new Map((await db.source.findMany({ where: { reviewStatus: "APPROVED" }, select: { id: true, key: true } })).map((s) => [s.key, s.id]));
}

// Editorial numbers are unique. A module or lesson that loses its number is
// moved below every number in use (never reused), so reorganizations can repeat.
async function parkModuleNumber(number: number, keepSlug: string) {
  const holder = await db.module.findFirst({ where: { number, slug: { not: keepSlug } }, select: { id: true } });
  if (!holder) return;
  const { _min } = await db.module.aggregate({ _min: { number: true } });
  await db.module.update({ where: { id: holder.id }, data: { number: Math.min(_min.number ?? 0, 0) - 1, status: "DRAFT" } });
}

async function unusedLessonNumber(moduleId: string) {
  const { _min } = await db.lesson.aggregate({ where: { moduleId }, _min: { number: true } });
  return Math.min(_min.number ?? 0, 0) - 1;
}

async function parkLessonNumber(moduleId: string, number: number, keepSlug: string) {
  const holder = await db.lesson.findFirst({ where: { moduleId, number, slug: { not: keepSlug } }, select: { id: true } });
  if (holder) await db.lesson.update({ where: { id: holder.id }, data: { number: await unusedLessonNumber(moduleId), status: "DRAFT" } });
}

async function seedLearning(sourceIds: Map<string, string>) {
  const approved = new Set(sourceIds.keys());
  const excerpts = new Map(ALL_SOURCES.map((s) => [s.key, s.excerpts]));
  const problems: string[] = [];
  for (const mod of MODULES) {
    if (mod.status === "DOCUMENTARY_GAP" && !mod.gapNote) problems.push(`${mod.slug}: lacuna documental sem gapNote`);
    if (mod.status === "PUBLISHED" && mod.lessons.length < 2) problems.push(`${mod.slug}: módulo publicado com menos de duas lições`);
    for (const lesson of mod.lessons) {
      const issues = validateLessonForPublication({ content: lesson.content, quiz: lesson.quiz, attachedSourceKeys: lesson.sources.map((s) => s.key), approvedSourceKeys: approved });
      issues.push(...unverifiedQuotes(lesson.content, excerpts));
      problems.push(...issues.map((issue) => `${mod.slug}/${lesson.slug}: ${issue}`));
    }
  }
  if (problems.length) throw new Error(`Conteúdo bloqueado para publicação:\n- ${problems.join("\n- ")}`);

  const seededModuleSlugs = MODULES.map((m) => m.slug);
  for (const mod of MODULES) {
    await parkModuleNumber(mod.number, mod.slug);
    const moduleData = { number: mod.number, title: mod.title, summary: mod.summary, area: mod.area, stage: mod.stage, status: mod.status, gapNote: mod.gapNote ?? null };
    const saved = await db.module.upsert({ where: { slug: mod.slug }, create: { slug: mod.slug, ...moduleData }, update: moduleData });

    for (const lesson of mod.lessons) {
      if (lesson.previous) {
        // Reorganized lesson: move the existing row so progress, XP and links stay attached.
        const [old, target] = await Promise.all([
          db.lesson.findFirst({ where: { slug: lesson.previous.lesson, module: { slug: lesson.previous.module } }, select: { id: true } }),
          db.lesson.findUnique({ where: { moduleId_slug: { moduleId: saved.id, slug: lesson.slug } }, select: { id: true } }),
        ]);
        if (old && !target) {
          await db.lesson.update({ where: { id: old.id }, data: { moduleId: saved.id, slug: lesson.slug, number: await unusedLessonNumber(saved.id) } });
        }
      }
      await parkLessonNumber(saved.id, lesson.number, lesson.slug);
      const lessonData = {
        number: lesson.number,
        title: lesson.title,
        objective: lesson.objective,
        minutes: lesson.minutes,
        currentKeys: lesson.currentKeys,
        content: lesson.content as object,
        quiz: lesson.quiz as object,
        status: "PUBLISHED" as const,
        reviewedOn: lesson.reviewedOn ?? ACCESSED_ON,
      };
      const savedLesson = await db.lesson.upsert({
        where: { moduleId_slug: { moduleId: saved.id, slug: lesson.slug } },
        create: { moduleId: saved.id, slug: lesson.slug, ...lessonData },
        update: lessonData,
      });
      await db.$transaction([
        db.lessonSource.deleteMany({ where: { lessonId: savedLesson.id } }),
        db.lessonSource.createMany({
          data: lesson.sources.map((s, position) => ({ lessonId: savedLesson.id, sourceId: sourceIds.get(s.key)!, position, supports: s.supports })),
        }),
      ]);
    }
    // Lessons removed from the seed stop being published (progress is kept).
    await db.lesson.updateMany({ where: { moduleId: saved.id, slug: { notIn: mod.lessons.map((l) => l.slug) } }, data: { status: "DRAFT" } });
  }
  // Modules removed from the seed (and lessons left in them) stop being published; progress is kept.
  await db.module.updateMany({ where: { slug: { notIn: seededModuleSlugs } }, data: { status: "DRAFT" } });
  await db.lesson.updateMany({ where: { module: { slug: { notIn: seededModuleSlugs } } }, data: { status: "DRAFT" } });

  const lessons = await db.lesson.findMany({ select: { id: true, slug: true, module: { select: { slug: true } } } });
  return new Map(lessons.map((l) => [`${l.module.slug}/${l.slug}`, l.id]));
}

/** With `keepExisting`, events already in the database are left as they are (only missing ones are created). */
async function seedEvents(sourceIds: Map<string, string>, lessonIds: Map<string, string>, { keepExisting = false } = {}) {
  const published: string[] = [];
  const held: string[] = [];
  const kept: string[] = [];
  for (const event of EVENTS) {
    const validKeys = new Set(event.sourceKeys.filter((k) => sourceIds.has(k)));
    const check = checkEventPublication(event.content, validKeys);
    const status = check.publishable ? ("PUBLISHED" as const) : ("DRAFT" as const);
    const existing = await db.event.findUnique({ where: { slug: event.slug }, select: { id: true, content: true, publishedAt: true, status: true } });
    if (existing && keepExisting) {
      kept.push(event.slug);
      continue;
    }
    const changed = !existing || stable(existing.content) !== stable(event.content) || existing.status !== status;
    const now = new Date();
    const data = {
      title: event.title,
      eventDate: new Date(`${event.eventDate}T12:00:00Z`),
      themes: event.themes,
      statusLabel: event.content.status.label || "Em análise",
      content: event.content as object,
      isDemo: false,
      aiAssisted: false,
      status,
      ...(status === "PUBLISHED" ? { publishedAt: existing?.publishedAt ?? now } : {}),
      ...(changed && status === "PUBLISHED" ? { lastReviewedAt: now, reviewedBy: REVIEWER } : {}),
    };
    const saved = existing ? await db.event.update({ where: { id: existing.id }, data }) : await db.event.create({ data: { slug: event.slug, ...data } });

    const lessonLinks = event.lessons
      .map((l) => ({ lessonId: lessonIds.get(`${l.module}/${l.lesson}`), relation: l.relation }))
      .filter((l): l is { lessonId: string; relation: string } => Boolean(l.lessonId));
    await db.$transaction([
      db.eventSource.deleteMany({ where: { eventId: saved.id } }),
      db.eventSource.createMany({ data: [...validKeys].map((key) => ({ eventId: saved.id, sourceId: sourceIds.get(key)! })) }),
      db.eventLesson.deleteMany({ where: { eventId: saved.id } }),
      db.eventLesson.createMany({ data: lessonLinks.map((l) => ({ eventId: saved.id, ...l })) }),
    ]);
    if (changed && status === "PUBLISHED") {
      await db.moderationAction.create({ data: { actorId: null, action: "PUBLISH_EVENT", targetType: "EVENT", targetId: saved.id, reason: `Seed editorial: ${event.reviewNote}` } });
    }
    (status === "PUBLISHED" ? published : held).push(event.slug);
    if (!check.publishable) console.warn(`  ! ${event.slug} mantido como rascunho: ${check.blocking.join(" ")}`);
  }
  return { published, held, kept };
}

async function seedForums() {
  const events = new Map((await db.event.findMany({ where: { status: "PUBLISHED" }, select: { id: true, slug: true } })).map((e) => [e.slug, e.id]));
  for (const forum of OFFICIAL_FORUMS) {
    const data = { title: forum.title, description: forum.description, category: forum.category, rules: forum.rules, isOfficial: true };
    // An event under review is not published: keep the existing link instead of clearing it.
    const eventId = forum.eventSlug ? events.get(forum.eventSlug) : null;
    await db.forum.upsert({
      where: { slug: forum.slug },
      create: { slug: forum.slug, ...data, eventId: eventId ?? null },
      update: { ...data, ...(eventId !== undefined ? { eventId } : {}) },
    });
  }
}

async function main() {
  // Modules only come from this seed, so an empty table means it never ran here.
  const empty = (await db.module.count()) === 0;
  if (process.argv.includes("--if-empty") && !empty) {
    console.log("Polis · seed editorial: conteúdo inicial já carregado; nada a fazer (use npm run db:seed para atualizá-lo).");
    return;
  }
  const ifOutdated = process.argv.includes("--if-outdated");
  if (ifOutdated && !empty && (await db.editorialRelease.findUnique({ where: { version: CONTENT_VERSION } }))) {
    console.log(`Polis · seed editorial: versão ${CONTENT_VERSION} já aplicada; nada a fazer.`);
    return;
  }
  console.log(`Polis · seed editorial (${CONTENT_VERSION})`);
  const publisherIds = await seedPublishers();
  console.log(`✓ ${PUBLISHERS.length} editores aprovados`);
  const sourceIds = await seedSources(publisherIds);
  console.log(`✓ ${ALL_SOURCES.length} fontes aprovadas com trechos`);
  const lessonIds = await seedLearning(sourceIds);
  console.log(`✓ ${MODULES.length} módulos e ${MODULES.reduce((n, m) => n + m.lessons.length, 0)} lições validadas`);
  const events = await seedEvents(sourceIds, lessonIds, { keepExisting: ifOutdated && !empty });
  console.log(
    `✓ ${events.published.length} acontecimentos publicados${events.held.length ? `, ${events.held.length} mantidos como rascunho` : ""}${events.kept.length ? `, ${events.kept.length} já existentes preservados` : ""}`,
  );
  await seedForums();
  console.log(`✓ ${OFFICIAL_FORUMS.length} fóruns oficiais (sem atividade fictícia)`);
  await db.editorialRelease.upsert({ where: { version: CONTENT_VERSION }, create: { version: CONTENT_VERSION }, update: {} });
  console.log(`✓ versão editorial ${CONTENT_VERSION} registrada`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => disconnectDb());
