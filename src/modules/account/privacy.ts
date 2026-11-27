import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { attemptQuestionIds } from "@/modules/diagnostic/question-bank";
import { displayNameSchema } from "./validation";

// Account deletion policy (shown to the user before confirming):
// - Questionnaire answers and results, consents, learning progress, XP,
//   achievements, follows and sessions are deleted.
// - Published topics and comments stay in the discussions without any link to
//   the person (author shown as "Participante removido"), unless the person
//   chooses to delete their text as well, in which case the text is erased.
// - Reports keep their content for moderation history without the reporter.

export async function updateDisplayName(userId: string, raw: unknown) {
  const name = displayNameSchema.parse(raw);
  await db.user.update({ where: { id: userId }, data: { name } });
  return name;
}

export async function exportUserData(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      createdAt: true,
      pathMode: true,
      questionnaireDecision: true,
      suspendedUntil: true,
      suspensionReason: true,
      consents: { select: { kind: true, version: true, purpose: true, grantedAt: true, revokedAt: true } },
      attempts: {
        select: {
          status: true,
          bankVersion: true,
          questionIds: true,
          scoringVersion: true,
          startedAt: true,
          completedAt: true,
          result: true,
          answers: { select: { questionId: true, choice: true, updatedAt: true } },
        },
      },
      lessonProgress: { select: { lesson: { select: { slug: true, title: true } }, readAt: true, understoodAt: true, completedAt: true, attempts: true } },
      xpEvents: { select: { kind: true, refId: true, amount: true, createdAt: true } },
      achievements: { select: { key: true, awardedAt: true } },
      follows: { select: { forum: { select: { slug: true, title: true } }, createdAt: true } },
      forumsCreated: { select: { slug: true, title: true, createdAt: true } },
      topics: { select: { id: true, title: true, body: true, status: true, createdAt: true, editedAt: true } },
      comments: { select: { id: true, body: true, status: true, createdAt: true, editedAt: true } },
      reports: { select: { targetType: true, targetId: true, reason: true, details: true, status: true, createdAt: true } },
      sessions: { select: { createdAt: true, expiresAt: true, userAgent: true } },
    },
  });
  if (!user) return null;
  return {
    exportedAt: new Date().toISOString(),
    notice:
      "Exportação dos dados pessoais mantidos pela Polis. As respostas ao questionário e o mapa de afinidades são dados sensíveis: guarde este arquivo com cuidado.",
    ...user,
    // Situations shown in each attempt, in order (attempts saved before the draw used the first version of every theme).
    attempts: user.attempts.map((attempt) => ({ ...attempt, questionIds: attemptQuestionIds(attempt.questionIds) })),
  };
}

export async function deleteAccount(userId: string, options: { deleteContent: boolean }) {
  await db.$transaction(async (tx) => {
    if (options.deleteContent) {
      await tx.topic.updateMany({ where: { authorId: userId }, data: { status: "DELETED", body: "", title: "Tópico excluído pela pessoa autora" } });
      await tx.comment.updateMany({ where: { authorId: userId }, data: { status: "DELETED", body: "" } });
    }
    // Cascades remove sessions, accounts, consents, attempts, progress, XP,
    // achievements and follows; authorship on content becomes NULL.
    await tx.user.delete({ where: { id: userId } });
  });
  logger.info("account.deleted", { deletedContent: options.deleteContent });
}
