import { z } from "zod";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

// Human moderation. Every decision records a reason; AI never decides. Admins
// handle conduct (threats, harassment, personal data, hate speech, spam), never
// political orientation, and routine moderation never touches questionnaire data.

export const resolutionSchema = z.object({
  reportId: z.string().min(1),
  decision: z.enum(["DISMISS", "REMOVE_CONTENT", "CLOSE_TOPIC", "SUSPEND_AUTHOR"]),
  reason: z.string().trim().min(10, "Descreva o motivo (mínimo de 10 caracteres).").max(1000),
  suspensionDays: z.coerce.number().int().min(1).max(365).default(7),
});

type Admin = { id: string; name: string };

async function loadTarget(targetType: string, targetId: string) {
  if (targetType === "FORUM") {
    const forum = await db.forum.findUnique({ where: { id: targetId }, select: { id: true, title: true, description: true, status: true, creatorId: true, slug: true } });
    return forum && { kind: "FORUM" as const, id: forum.id, authorId: forum.creatorId, title: forum.title, text: forum.description, status: forum.status, href: `/comunidade/${forum.slug}` };
  }
  if (targetType === "TOPIC") {
    const topic = await db.topic.findUnique({ where: { id: targetId }, select: { id: true, title: true, body: true, status: true, authorId: true, closedAt: true, forum: { select: { slug: true } } } });
    return topic && { kind: "TOPIC" as const, id: topic.id, authorId: topic.authorId, title: topic.title, text: topic.body, status: topic.status, href: `/comunidade/${topic.forum.slug}/${topic.id}` };
  }
  const comment = await db.comment.findUnique({ where: { id: targetId }, select: { id: true, body: true, status: true, authorId: true, topicId: true, topic: { select: { title: true, forum: { select: { slug: true } } } } } });
  return comment && { kind: "COMMENT" as const, id: comment.id, authorId: comment.authorId, title: `Comentário em “${comment.topic.title}”`, text: comment.body, status: comment.status, href: `/comunidade/${comment.topic.forum.slug}/${comment.topicId}`, topicId: comment.topicId };
}

export async function listOpenReports() {
  const reports = await db.report.findMany({ where: { status: "OPEN" }, orderBy: { createdAt: "asc" }, take: 100 });
  return Promise.all(reports.map(async (report) => ({ report, target: await loadTarget(report.targetType, report.targetId) })));
}

export async function resolveReport(admin: Admin, raw: unknown) {
  const input = resolutionSchema.parse(raw);
  const report = await db.report.findUnique({ where: { id: input.reportId } });
  if (!report || report.status !== "OPEN") throw new Error("Denúncia não encontrada ou já resolvida.");
  const target = await loadTarget(report.targetType, report.targetId);
  const now = new Date();
  const ops = [];

  if (input.decision === "DISMISS") {
    ops.push(db.moderationAction.create({ data: { actorId: admin.id, action: "DISMISS_REPORT", targetType: report.targetType, targetId: report.targetId, reason: input.reason, reportId: report.id } }));
  }
  if (input.decision === "REMOVE_CONTENT" && target) {
    if (target.kind === "FORUM") ops.push(db.forum.update({ where: { id: target.id }, data: { status: "REMOVED", removedReason: input.reason } }));
    if (target.kind === "TOPIC") ops.push(db.topic.update({ where: { id: target.id }, data: { status: "REMOVED", removedReason: input.reason } }));
    if (target.kind === "COMMENT") ops.push(db.comment.update({ where: { id: target.id }, data: { status: "REMOVED", removedReason: input.reason } }));
    ops.push(db.moderationAction.create({ data: { actorId: admin.id, action: "REMOVE_CONTENT", targetType: target.kind, targetId: target.id, reason: input.reason, reportId: report.id } }));
  }
  if (input.decision === "CLOSE_TOPIC" && target) {
    const topicId = target.kind === "TOPIC" ? target.id : target.kind === "COMMENT" ? target.topicId : null;
    if (!topicId) throw new Error("Só é possível encerrar tópicos.");
    ops.push(db.topic.update({ where: { id: topicId }, data: { closedAt: now, closedReason: input.reason } }));
    ops.push(db.moderationAction.create({ data: { actorId: admin.id, action: "CLOSE_TOPIC", targetType: "TOPIC", targetId: topicId, reason: input.reason, reportId: report.id } }));
  }
  if (input.decision === "SUSPEND_AUTHOR") {
    if (!target?.authorId) throw new Error("A autoria deste conteúdo não está mais vinculada a uma conta.");
    const until = new Date(now.getTime() + input.suspensionDays * 86400000);
    ops.push(db.user.update({ where: { id: target.authorId }, data: { suspendedUntil: until, suspensionReason: input.reason } }));
    ops.push(db.moderationAction.create({ data: { actorId: admin.id, action: "SUSPEND_USER", targetType: "USER", targetId: target.authorId, reason: `${input.reason} (${input.suspensionDays} dias)`, reportId: report.id } }));
  }
  ops.push(
    db.report.update({
      where: { id: report.id },
      data: { status: input.decision === "DISMISS" ? "DISMISSED" : "ACTION_TAKEN", resolutionNote: input.reason, resolvedAt: now, resolvedBy: admin.name },
    }),
  );
  await db.$transaction(ops);
  logger.info("moderation.report_resolved", { decision: input.decision });
}

export async function liftSuspension(admin: Admin, userId: string, reason: string) {
  await db.$transaction([
    db.user.update({ where: { id: userId }, data: { suspendedUntil: null, suspensionReason: null } }),
    db.moderationAction.create({ data: { actorId: admin.id, action: "LIFT_SUSPENSION", targetType: "USER", targetId: userId, reason } }),
  ]);
}

export async function listSuspendedUsers() {
  return db.user.findMany({
    where: { suspendedUntil: { gt: new Date() } },
    select: { id: true, name: true, suspendedUntil: true, suspensionReason: true },
    orderBy: { suspendedUntil: "desc" },
  });
}

export async function listOpenFlags() {
  const flags = await db.contentFlag.findMany({ where: { status: "OPEN" }, orderBy: { createdAt: "asc" }, take: 100 });
  return Promise.all(
    flags.map(async (flag) => {
      if (flag.targetType === "EVENT") {
        const event = await db.event.findUnique({ where: { id: flag.targetId }, select: { title: true, slug: true } });
        return { flag, title: event?.title ?? "Acontecimento removido", href: event ? `/acontecimentos/${event.slug}` : null };
      }
      const lesson = await db.lesson.findUnique({ where: { id: flag.targetId }, select: { title: true, slug: true, module: { select: { slug: true } } } });
      return { flag, title: lesson?.title ?? "Lição removida", href: lesson ? `/aprender/${lesson.module.slug}/${lesson.slug}` : null };
    }),
  );
}

export async function resolveFlag(admin: Admin, flagId: string, decision: "ACTION_TAKEN" | "DISMISSED", note: string) {
  const flag = await db.contentFlag.findUnique({ where: { id: flagId } });
  if (!flag || flag.status !== "OPEN") throw new Error("Sinalização não encontrada ou já resolvida.");
  await db.$transaction([
    db.contentFlag.update({ where: { id: flagId }, data: { status: decision, resolutionNote: note, resolvedAt: new Date(), resolvedBy: admin.name } }),
    db.moderationAction.create({
      data: { actorId: admin.id, action: decision === "ACTION_TAKEN" ? "RESOLVE_FLAG" : "DISMISS_FLAG", targetType: flag.targetType, targetId: flag.targetId, reason: note },
    }),
  ]);
}

export async function recentModerationLog(take = 30) {
  return db.moderationAction.findMany({ orderBy: { createdAt: "desc" }, take });
}

/** AI calls in the last 24 hours grouped by outcome (no content or user data). */
export async function aiUsageLast24h() {
  return db.aiGeneration.groupBy({ by: ["status"], where: { createdAt: { gt: new Date(Date.now() - 86400000) } }, _count: { _all: true } });
}

export async function adminDashboardCounts() {
  const [openReports, openFlags, pendingSources, drafts, published, suspended, completedQuestionnaires] = await Promise.all([
    db.report.count({ where: { status: "OPEN" } }),
    db.contentFlag.count({ where: { status: "OPEN" } }),
    db.source.count({ where: { reviewStatus: "PENDING" } }),
    db.event.count({ where: { status: { in: ["DRAFT", "IN_REVIEW"] } } }),
    db.event.count({ where: { status: "PUBLISHED" } }),
    db.user.count({ where: { suspendedUntil: { gt: new Date() } } }),
    // People, not attempts: completed results are kept as a history.
    db.user.count({ where: { attempts: { some: { status: "COMPLETED" } } } }),
  ]);
  return { openReports, openFlags, pendingSources, drafts, published, suspended, completedQuestionnaires };
}
