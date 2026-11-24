import { db } from "@/lib/db";
import { enforceRateLimit } from "@/lib/rate-limit";
import { isSuspended } from "@/lib/session-utils";
import { slugify } from "@/modules/events/service";
import { commentInputSchema, forumInputSchema, reportInputSchema, topicInputSchema } from "./rules";

export const PAGE_SIZE = 20;

export class CommunityError extends Error {
  constructor(
    message: string,
    readonly code: "NOT_FOUND" | "FORBIDDEN" | "UNVERIFIED" | "SUSPENDED" | "CLOSED" | "INVALID",
  ) {
    super(message);
    this.name = "CommunityError";
  }
}

type Actor = { id: string; emailVerified: boolean; suspendedUntil: Date | null; role: string };

/** Publishing requires a verified e-mail and no active suspension. */
export function assertCanPublish(actor: Actor) {
  if (!actor.emailVerified) throw new CommunityError("Confirme seu e-mail para publicar nos fóruns.", "UNVERIFIED");
  if (isSuspended(actor)) throw new CommunityError("Sua conta está suspensa para publicações neste período.", "SUSPENDED");
}

export async function listForums(options: { q?: string; category?: string; page?: number }) {
  const page = Math.max(1, options.page ?? 1);
  const where = {
    status: "VISIBLE" as const,
    ...(options.q ? { title: { contains: options.q.slice(0, 80), mode: "insensitive" as const } } : {}),
    ...(options.category ? { category: options.category as never } : {}),
  };
  const [forums, total] = await Promise.all([
    db.forum.findMany({
      where,
      orderBy: [{ isOfficial: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true, slug: true, title: true, description: true, category: true, isOfficial: true, _count: { select: { topics: { where: { status: "VISIBLE" } }, followers: true } } },
    }),
    db.forum.count({ where }),
  ]);
  return { forums, page, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function listFollowedForums(userId: string) {
  return db.forumFollow.findMany({
    where: { userId, forum: { status: "VISIBLE" } },
    orderBy: { createdAt: "desc" },
    select: { forum: { select: { id: true, slug: true, title: true, category: true } } },
  });
}

export async function recentFromFollowed(userId: string, take = 8) {
  return db.topic.findMany({
    where: { status: "VISIBLE", forum: { status: "VISIBLE", followers: { some: { userId } } } },
    orderBy: { lastActivityAt: "desc" },
    take,
    select: { id: true, title: true, commentCount: true, lastActivityAt: true, forum: { select: { slug: true, title: true } } },
  });
}

export async function getForumPage(slug: string, page: number, userId: string | null) {
  const forum = await db.forum.findFirst({
    where: { slug, status: "VISIBLE" },
    include: {
      event: { select: { slug: true, title: true, status: true } },
      _count: { select: { followers: true } },
      creator: { select: { name: true } },
    },
  });
  if (!forum) return null;
  const safePage = Math.max(1, page);
  const [topics, totalTopics, following] = await Promise.all([
    db.topic.findMany({
      where: { forumId: forum.id, status: { in: ["VISIBLE", "DELETED"] } },
      orderBy: { lastActivityAt: "desc" },
      skip: (safePage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true, title: true, status: true, closedAt: true, commentCount: true, lastActivityAt: true, createdAt: true, author: { select: { name: true } } },
    }),
    db.topic.count({ where: { forumId: forum.id, status: { in: ["VISIBLE", "DELETED"] } } }),
    userId ? db.forumFollow.findUnique({ where: { userId_forumId: { userId, forumId: forum.id } } }) : null,
  ]);
  return { forum, topics, page: safePage, totalPages: Math.max(1, Math.ceil(totalTopics / PAGE_SIZE)), following: Boolean(following) };
}

export async function createForum(actor: Actor, raw: unknown) {
  assertCanPublish(actor);
  const input = forumInputSchema.parse(raw);
  await enforceRateLimit(`forum-create:${actor.id}`, 3, 86400, "Você pode criar até 3 fóruns por dia.");
  if (input.eventId) {
    const event = await db.event.findFirst({ where: { id: input.eventId, status: "PUBLISHED", isDemo: false }, select: { id: true } });
    if (!event) throw new CommunityError("Acontecimento não encontrado.", "INVALID");
  }
  const base = (slugify(input.title) || "forum").replace(/^(novo|regras)$/, "$1-forum");
  let slug = base;
  for (let i = 2; await db.forum.findUnique({ where: { slug }, select: { id: true } }); i++) slug = `${base}-${i}`;
  return db.forum.create({
    data: { slug, title: input.title, description: input.description, category: input.category, rules: input.rules, eventId: input.eventId, creatorId: actor.id },
  });
}

export async function setFollow(userId: string, forumId: string, follow: boolean) {
  const forum = await db.forum.findFirst({ where: { id: forumId, status: "VISIBLE" }, select: { id: true } });
  if (!forum) throw new CommunityError("Fórum não encontrado.", "NOT_FOUND");
  if (follow) {
    await db.forumFollow.upsert({ where: { userId_forumId: { userId, forumId } }, create: { userId, forumId }, update: {} });
  } else {
    await db.forumFollow.deleteMany({ where: { userId, forumId } });
  }
}

export async function createTopic(actor: Actor, forumId: string, raw: unknown) {
  assertCanPublish(actor);
  const input = topicInputSchema.parse(raw);
  const forum = await db.forum.findFirst({ where: { id: forumId, status: "VISIBLE" }, select: { id: true } });
  if (!forum) throw new CommunityError("Fórum não encontrado.", "NOT_FOUND");
  await enforceRateLimit(`topic-create:${actor.id}`, 10, 3600, "Você publicou muitos tópicos em pouco tempo. Aguarde um pouco.");
  const [lesson, event] = await Promise.all([
    input.lessonId ? db.lesson.findFirst({ where: { id: input.lessonId, status: "PUBLISHED" }, select: { id: true } }) : null,
    input.eventId ? db.event.findFirst({ where: { id: input.eventId, status: "PUBLISHED", isDemo: false }, select: { id: true } }) : null,
  ]);
  return db.topic.create({
    data: { forumId, authorId: actor.id, title: input.title, body: input.body, lessonId: lesson?.id ?? null, eventId: event?.id ?? null },
  });
}

export async function getTopicPage(topicId: string, page: number) {
  const topic = await db.topic.findFirst({
    where: { id: topicId, status: { in: ["VISIBLE", "DELETED", "REMOVED"] }, forum: { status: "VISIBLE" } },
    include: {
      forum: { select: { id: true, slug: true, title: true, rules: true } },
      author: { select: { id: true, name: true } },
      event: { select: { slug: true, title: true, status: true } },
    },
  });
  if (!topic) return null;
  const lesson = topic.lessonId
    ? await db.lesson.findFirst({ where: { id: topic.lessonId, status: "PUBLISHED" }, select: { slug: true, title: true, module: { select: { slug: true } } } })
    : null;
  const safePage = Math.max(1, page);
  const [comments, total] = await Promise.all([
    db.comment.findMany({
      where: { topicId },
      orderBy: { createdAt: "asc" },
      skip: (safePage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true, body: true, status: true, removedReason: true, editedAt: true, createdAt: true, author: { select: { id: true, name: true } } },
    }),
    db.comment.count({ where: { topicId } }),
  ]);
  return { topic, lesson, comments, page: safePage, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

async function ownTopic(actor: Actor, topicId: string) {
  const topic = await db.topic.findUnique({ where: { id: topicId }, select: { id: true, authorId: true, status: true, closedAt: true } });
  if (!topic || topic.status !== "VISIBLE") throw new CommunityError("Tópico não encontrado.", "NOT_FOUND");
  if (topic.authorId !== actor.id) throw new CommunityError("Você só pode alterar o próprio conteúdo.", "FORBIDDEN");
  return topic;
}

export async function editTopic(actor: Actor, topicId: string, raw: unknown) {
  await ownTopic(actor, topicId);
  if (isSuspended(actor)) throw new CommunityError("Sua conta está suspensa para publicações neste período.", "SUSPENDED");
  const input = topicInputSchema.pick({ title: true, body: true }).parse(raw);
  return db.topic.update({ where: { id: topicId }, data: { title: input.title, body: input.body, editedAt: new Date() } });
}

/** Removes the author's text but keeps the thread so replies remain readable. */
export async function deleteOwnTopic(actor: Actor, topicId: string) {
  await ownTopic(actor, topicId);
  return db.topic.update({ where: { id: topicId }, data: { status: "DELETED", body: "", title: "Tópico excluído pela pessoa autora" } });
}

export async function createComment(actor: Actor, topicId: string, raw: unknown) {
  assertCanPublish(actor);
  const input = commentInputSchema.parse(raw);
  const topic = await db.topic.findFirst({ where: { id: topicId, status: "VISIBLE", forum: { status: "VISIBLE" } }, select: { id: true, closedAt: true } });
  if (!topic) throw new CommunityError("Tópico não encontrado.", "NOT_FOUND");
  if (topic.closedAt) throw new CommunityError("Este tópico foi encerrado para novos comentários.", "CLOSED");
  await enforceRateLimit(`comment-create:${actor.id}`, 30, 3600, "Você comentou muitas vezes em pouco tempo. Aguarde um pouco.");
  const [comment] = await db.$transaction([
    db.comment.create({ data: { topicId, authorId: actor.id, body: input.body } }),
    db.topic.update({ where: { id: topicId }, data: { commentCount: { increment: 1 }, lastActivityAt: new Date() } }),
  ]);
  return comment;
}

async function ownComment(actor: Actor, commentId: string) {
  const comment = await db.comment.findUnique({ where: { id: commentId }, select: { id: true, authorId: true, status: true, topicId: true } });
  if (!comment || comment.status !== "VISIBLE") throw new CommunityError("Comentário não encontrado.", "NOT_FOUND");
  if (comment.authorId !== actor.id) throw new CommunityError("Você só pode alterar o próprio conteúdo.", "FORBIDDEN");
  return comment;
}

export async function editComment(actor: Actor, commentId: string, raw: unknown) {
  await ownComment(actor, commentId);
  if (isSuspended(actor)) throw new CommunityError("Sua conta está suspensa para publicações neste período.", "SUSPENDED");
  const input = commentInputSchema.parse(raw);
  return db.comment.update({ where: { id: commentId }, data: { body: input.body, editedAt: new Date() } });
}

export async function deleteOwnComment(actor: Actor, commentId: string) {
  const comment = await ownComment(actor, commentId);
  await db.comment.update({ where: { id: commentId }, data: { status: "DELETED", body: "" } });
  return comment;
}

export async function reportContent(actor: { id: string }, raw: unknown) {
  const input = reportInputSchema.parse(raw);
  await enforceRateLimit(`report:${actor.id}`, 10, 3600, "Você enviou muitas denúncias em pouco tempo. Aguarde um pouco.");
  const exists =
    input.targetType === "FORUM"
      ? await db.forum.findFirst({ where: { id: input.targetId, status: "VISIBLE" }, select: { id: true } })
      : input.targetType === "TOPIC"
        ? await db.topic.findFirst({ where: { id: input.targetId, status: "VISIBLE" }, select: { id: true } })
        : await db.comment.findFirst({ where: { id: input.targetId, status: "VISIBLE" }, select: { id: true } });
  if (!exists) throw new CommunityError("Conteúdo não encontrado.", "NOT_FOUND");
  const duplicate = await db.report.findFirst({ where: { reporterId: actor.id, targetType: input.targetType, targetId: input.targetId, status: "OPEN" }, select: { id: true } });
  if (duplicate) return duplicate;
  return db.report.create({
    data: { targetType: input.targetType, targetId: input.targetId, reason: input.reason as never, details: input.details || null, reporterId: actor.id },
  });
}
