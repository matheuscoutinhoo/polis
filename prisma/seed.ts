// Explicit, idempotent seed: approved publishers and sources, validated lessons,
// published events backed by approved sources, and empty official forums.
// It never creates users, answers or fictitious activity, and never deletes
// user data. Run with `npm run db:seed` (separate from application startup).
// With `--if-empty` (used by `npm run db:migrate:deploy` on every deploy) it only
// runs on a database that has no modules yet, so later editorial edits are kept.
import "dotenv/config";
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
      accessedAt,
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
    await db.$transaction([
      db.sourceExcerpt.deleteMany({ where: { sourceId: source.id } }),
      db.sourceExcerpt.createMany({ data: s.excerpts.map((e) => ({ sourceId: source.id, locator: e.locator, text: e.text })) }),
    ]);
  }
  return new Map((await db.source.findMany({ where: { reviewStatus: "APPROVED" }, select: { id: true, key: true } })).map((s) => [s.key, s.id]));
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
    // Free the editorial number if another module currently holds it.
    await db.module.updateMany({ where: { number: mod.number, slug: { not: mod.slug } }, data: { number: -1_000_000 - mod.number, status: "DRAFT" } });
    const moduleData = { number: mod.number, title: mod.title, summary: mod.summary, area: mod.area, stage: mod.stage, status: mod.status, gapNote: mod.gapNote ?? null };
    const saved = await db.module.upsert({ where: { slug: mod.slug }, create: { slug: mod.slug, ...moduleData }, update: moduleData });

    for (const lesson of mod.lessons) {
      await db.lesson.updateMany({ where: { moduleId: saved.id, number: lesson.number, slug: { not: lesson.slug } }, data: { number: -1_000_000 - lesson.number, status: "DRAFT" } });
      const lessonData = {
        number: lesson.number,
        title: lesson.title,
        objective: lesson.objective,
        minutes: lesson.minutes,
        currentKeys: lesson.currentKeys,
        content: lesson.content as object,
        quiz: lesson.quiz as object,
        status: "PUBLISHED" as const,
        reviewedOn: ACCESSED_ON,
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
  await db.module.updateMany({ where: { slug: { notIn: seededModuleSlugs } }, data: { status: "DRAFT" } });

  const lessons = await db.lesson.findMany({ select: { id: true, slug: true, module: { select: { slug: true } } } });
  return new Map(lessons.map((l) => [`${l.module.slug}/${l.slug}`, l.id]));
}

async function seedEvents(sourceIds: Map<string, string>, lessonIds: Map<string, string>) {
  const published: string[] = [];
  const held: string[] = [];
  for (const event of EVENTS) {
    const validKeys = new Set(event.sourceKeys.filter((k) => sourceIds.has(k)));
    const check = checkEventPublication(event.content, validKeys);
    const status = check.publishable ? ("PUBLISHED" as const) : ("DRAFT" as const);
    const existing = await db.event.findUnique({ where: { slug: event.slug }, select: { id: true, content: true, publishedAt: true, status: true } });
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
  return { published, held };
}

async function seedForums() {
  const events = new Map((await db.event.findMany({ where: { status: "PUBLISHED" }, select: { id: true, slug: true } })).map((e) => [e.slug, e.id]));
  for (const forum of OFFICIAL_FORUMS) {
    const data = {
      title: forum.title,
      description: forum.description,
      category: forum.category,
      rules: forum.rules,
      isOfficial: true,
      eventId: forum.eventSlug ? (events.get(forum.eventSlug) ?? null) : null,
    };
    await db.forum.upsert({ where: { slug: forum.slug }, create: { slug: forum.slug, ...data }, update: data });
  }
}

async function main() {
  // Modules only come from this seed, so an empty table means it never ran here.
  if (process.argv.includes("--if-empty") && (await db.module.count()) > 0) {
    console.log("Polis · seed editorial: conteúdo inicial já carregado; nada a fazer (use npm run db:seed para atualizá-lo).");
    return;
  }
  console.log("Polis · seed editorial");
  const publisherIds = await seedPublishers();
  console.log(`✓ ${PUBLISHERS.length} editores aprovados`);
  const sourceIds = await seedSources(publisherIds);
  console.log(`✓ ${ALL_SOURCES.length} fontes aprovadas com trechos`);
  const lessonIds = await seedLearning(sourceIds);
  console.log(`✓ ${MODULES.length} módulos e ${MODULES.reduce((n, m) => n + m.lessons.length, 0)} lições validadas`);
  const events = await seedEvents(sourceIds, lessonIds);
  console.log(`✓ ${events.published.length} acontecimentos publicados${events.held.length ? `, ${events.held.length} mantidos como rascunho` : ""}`);
  await seedForums();
  console.log(`✓ ${OFFICIAL_FORUMS.length} fóruns oficiais (sem atividade fictícia)`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => disconnectDb());
