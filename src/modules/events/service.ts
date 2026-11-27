import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { checkEventPublication, eventContentSchema, publicEventContent, EMPTY_EVENT_CONTENT, type EventContent } from "./content";
import { isEventTheme } from "./themes";

const publicSourceSelect = {
  id: true,
  key: true,
  title: true,
  url: true,
  author: true,
  publishedOn: true,
  sourceUpdatedOn: true,
  accessedAt: true,
  locator: true,
  materialType: true,
  reuseCondition: true,
  scopeNote: true,
  reviewStatus: true,
  reviewedAt: true,
  publisher: { select: { name: true, acronym: true } },
} as const;

export async function listPublishedEvents(options: { theme?: string | null; skip?: number; take?: number } = {}) {
  const { theme, skip, take } = options;
  return db.event.findMany({
    where: publishedWhere(theme),
    orderBy: [{ eventDate: "desc" }, { publishedAt: "desc" }],
    skip,
    take,
    select: {
      id: true,
      slug: true,
      title: true,
      eventDate: true,
      publishedAt: true,
      updatedAt: true,
      lastReviewedAt: true,
      themes: true,
      statusLabel: true,
      content: true,
      aiAssisted: true,
      autoPublished: true,
    },
  });
}

function publishedWhere(theme?: string | null) {
  return { status: "PUBLISHED" as const, isDemo: false, ...(theme && isEventTheme(theme) ? { themes: { has: theme } } : {}) };
}

export async function countPublishedEvents(theme?: string | null) {
  return db.event.count({ where: publishedWhere(theme) });
}

export async function getPublishedEvent(slug: string) {
  const event = await db.event.findFirst({
    where: { slug, status: "PUBLISHED", isDemo: false },
    include: {
      sources: { where: { source: { reviewStatus: "APPROVED" } }, include: { source: { select: publicSourceSelect } } },
      lessons: { include: { lesson: { select: { slug: true, title: true, module: { select: { slug: true, title: true } } } } } },
      topics: { where: { status: "VISIBLE" }, orderBy: { lastActivityAt: "desc" }, take: 5, select: { id: true, title: true, commentCount: true, forum: { select: { slug: true, title: true } } } },
      forums: { where: { status: "VISIBLE" }, select: { slug: true, title: true } },
    },
  });
  if (!event) return null;
  const validKeys = new Set(event.sources.map((s) => s.source.key));
  const content = publicEventContent(eventContentSchema.parse(event.content), validKeys);
  return { ...event, content };
}

export const ADMIN_EVENT_FILTERS = ["DRAFT", "IN_REVIEW", "PUBLISHED", "AUTOMATIC"] as const;
export type AdminEventFilter = (typeof ADMIN_EVENT_FILTERS)[number];

export async function listEventsForAdmin(filter?: AdminEventFilter | null, take = 100) {
  return db.event.findMany({
    where: !filter ? {} : filter === "AUTOMATIC" ? { origin: "AUTOMATIC" } : { status: filter },
    orderBy: [{ updatedAt: "desc" }],
    take,
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      isDemo: true,
      eventDate: true,
      updatedAt: true,
      publishedAt: true,
      aiAssisted: true,
      origin: true,
      autoPublished: true,
      _count: { select: { sources: true } },
    },
  });
}

export async function getEventForAdmin(id: string) {
  return db.event.findUnique({
    where: { id },
    include: {
      sources: { include: { source: { select: { ...publicSourceSelect, excerpts: { select: { id: true, locator: true, text: true } } } } } },
      lessons: { include: { lesson: { select: { id: true, title: true, slug: true, module: { select: { slug: true, title: true } } } } } },
    },
  });
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function createEventDraft(input: {
  title: string;
  eventDate: Date;
  themes: string[];
  editorNotes?: string | null;
  isDemo?: boolean;
  origin?: "EDITORIAL" | "AUTOMATIC";
}) {
  const base = slugify(input.title) || "acontecimento";
  let slug = base;
  for (let i = 2; await db.event.findUnique({ where: { slug }, select: { id: true } }); i++) slug = `${base}-${i}`;
  return db.event.create({
    data: {
      slug,
      title: input.title,
      eventDate: input.eventDate,
      themes: input.themes.filter(isEventTheme),
      statusLabel: "Em análise",
      content: EMPTY_EVENT_CONTENT,
      editorNotes: input.editorNotes ?? null,
      isDemo: Boolean(input.isDemo),
      origin: input.origin ?? "EDITORIAL",
      status: "DRAFT",
    },
  });
}

/** Material changes to a published analysis send it back to review. */
export async function saveEventContent(id: string, input: { title: string; eventDate: Date; themes: string[]; content: EventContent; editorNotes?: string | null }) {
  const current = await db.event.findUnique({ where: { id }, select: { status: true } });
  if (!current) throw new Error("Acontecimento não encontrado.");
  const content = eventContentSchema.parse(input.content);
  return db.event.update({
    where: { id },
    data: {
      title: input.title,
      eventDate: input.eventDate,
      themes: input.themes.filter(isEventTheme),
      content,
      statusLabel: content.status.label || "Em análise",
      editorNotes: input.editorNotes ?? null,
      status: current.status === "PUBLISHED" ? "IN_REVIEW" : current.status,
    },
  });
}

export async function evaluatePublication(id: string) {
  const event = await db.event.findUnique({
    where: { id },
    include: { sources: { include: { source: { select: { key: true, reviewStatus: true } } } } },
  });
  if (!event) throw new Error("Acontecimento não encontrado.");
  const validKeys = new Set(event.sources.filter((s) => s.source.reviewStatus === "APPROVED").map((s) => s.source.key));
  return { event, validKeys, check: checkEventPublication(event.content, validKeys) };
}

export async function publishEvent(id: string, reviewer: { id: string; name: string }, reason: string) {
  const { event, check } = await evaluatePublication(id);
  if (!check.publishable) return { ok: false as const, check };
  if (event.isDemo) return { ok: false as const, check: { ...check, publishable: false, blocking: ["Exemplos de demonstração não entram no feed de acontecimentos."] } };
  const now = new Date();
  await db.$transaction([
    db.event.update({ where: { id }, data: { status: "PUBLISHED", autoPublished: false, publishedAt: event.publishedAt ?? now, lastReviewedAt: now, reviewedBy: reviewer.name } }),
    db.moderationAction.create({ data: { actorId: reviewer.id, action: "PUBLISH_EVENT", targetType: "EVENT", targetId: id, reason } }),
  ]);
  logger.info("event.published", { eventId: id, omitted: check.omitted.length });
  return { ok: true as const, check };
}

/**
 * Publication by the automatic search: same gate, no human reviewer. The event
 * is marked as auto-published (shown on its page) until a person publishes it
 * again after review; the log entry has no actor ("sistema").
 */
export async function publishEventAutomatically(id: string, reason: string) {
  const { event, check } = await evaluatePublication(id);
  if (!check.publishable || event.isDemo) return { ok: false as const, check };
  await db.$transaction([
    db.event.update({ where: { id }, data: { status: "PUBLISHED", autoPublished: true, publishedAt: event.publishedAt ?? new Date() } }),
    db.moderationAction.create({ data: { actorId: null, action: "PUBLISH_EVENT", targetType: "EVENT", targetId: id, reason } }),
  ]);
  logger.info("event.published_automatically", { eventId: id, omitted: check.omitted.length });
  return { ok: true as const, check };
}

export async function unpublishEvent(id: string, actorId: string, reason: string) {
  await db.$transaction([
    db.event.update({ where: { id }, data: { status: "IN_REVIEW" } }),
    db.moderationAction.create({ data: { actorId, action: "UNPUBLISH_EVENT", targetType: "EVENT", targetId: id, reason } }),
  ]);
}

export async function attachSourceToEvent(eventId: string, sourceId: string) {
  const source = await db.source.findUnique({ where: { id: sourceId }, select: { reviewStatus: true } });
  if (!source || source.reviewStatus !== "APPROVED") throw new Error("Só fontes aprovadas podem ser vinculadas.");
  await db.eventSource.upsert({ where: { eventId_sourceId: { eventId, sourceId } }, create: { eventId, sourceId }, update: {} });
}

export async function detachSourceFromEvent(eventId: string, sourceId: string) {
  await db.eventSource.deleteMany({ where: { eventId, sourceId } });
}

export async function linkLessonToEvent(eventId: string, lessonId: string, relation: string) {
  await db.eventLesson.upsert({ where: { eventId_lessonId: { eventId, lessonId } }, create: { eventId, lessonId, relation }, update: { relation } });
}

export async function unlinkLessonFromEvent(eventId: string, lessonId: string) {
  await db.eventLesson.deleteMany({ where: { eventId, lessonId } });
}
