import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { QUESTIONNAIRE_CONSENT_PURPOSE, QUESTIONNAIRE_CONSENT_VERSION } from "@/modules/account/consent-texts";
import { QUESTIONS, QUESTION_BANK_VERSION, QUESTION_BY_ID } from "./question-bank";
import { isAnswerChoice, type AnswerChoice } from "./scale";
import { computeResult, type AnswerMap, type QuestionnaireResult } from "./scoring";

export class QuestionnaireError extends Error {
  constructor(
    message: string,
    readonly code: "NO_CONSENT" | "INVALID_QUESTION" | "INVALID_CHOICE" | "NO_ATTEMPT" | "INCOMPLETE",
  ) {
    super(message);
    this.name = "QuestionnaireError";
  }
}

export async function getActiveConsent(userId: string) {
  return db.consentRecord.findFirst({
    where: { userId, kind: "QUESTIONNAIRE", revokedAt: null },
    orderBy: { grantedAt: "desc" },
  });
}

export async function grantQuestionnaireConsent(userId: string) {
  const active = await getActiveConsent(userId);
  if (!active || active.version !== QUESTIONNAIRE_CONSENT_VERSION) {
    await db.$transaction([
      db.consentRecord.updateMany({ where: { userId, kind: "QUESTIONNAIRE", revokedAt: null }, data: { revokedAt: new Date() } }),
      db.consentRecord.create({
        data: { userId, kind: "QUESTIONNAIRE", version: QUESTIONNAIRE_CONSENT_VERSION, purpose: QUESTIONNAIRE_CONSENT_PURPOSE },
      }),
    ]);
  }
  await db.user.update({ where: { id: userId }, data: { questionnaireDecision: "ACCEPTED" } });
}

/** Revoking consent stops processing: answers and result are deleted immediately. */
export async function revokeQuestionnaireConsent(userId: string) {
  await db.$transaction([
    db.consentRecord.updateMany({ where: { userId, kind: "QUESTIONNAIRE", revokedAt: null }, data: { revokedAt: new Date() } }),
    db.questionnaireAttempt.deleteMany({ where: { userId } }),
    db.user.update({ where: { id: userId }, data: { questionnaireDecision: "DECLINED", pathMode: "GENERAL" } }),
  ]);
  logger.info("questionnaire.consent_revoked");
}

export async function deleteQuestionnaireData(userId: string) {
  await db.$transaction([
    db.questionnaireAttempt.deleteMany({ where: { userId } }),
    db.user.update({ where: { id: userId }, data: { pathMode: "GENERAL" } }),
  ]);
  logger.info("questionnaire.data_deleted");
}

export async function getInProgressAttempt(userId: string) {
  return db.questionnaireAttempt.findUnique({
    where: { userId_status: { userId, status: "IN_PROGRESS" } },
    include: { answers: { select: { questionId: true, choice: true } } },
  });
}

export async function getCompletedAttempt(userId: string) {
  return db.questionnaireAttempt.findUnique({ where: { userId_status: { userId, status: "COMPLETED" } } });
}

export async function getActiveResult(userId: string): Promise<QuestionnaireResult | null> {
  const attempt = await getCompletedAttempt(userId);
  return (attempt?.result as QuestionnaireResult | null) ?? null;
}

async function requireConsent(userId: string) {
  const consent = await getActiveConsent(userId);
  if (!consent) throw new QuestionnaireError("Autorize o tratamento das respostas para usar o questionário.", "NO_CONSENT");
}

export async function startAttempt(userId: string) {
  await requireConsent(userId);
  const existing = await getInProgressAttempt(userId);
  if (existing && existing.bankVersion === QUESTION_BANK_VERSION) return existing;
  if (existing) await db.questionnaireAttempt.delete({ where: { id: existing.id } });
  try {
    return await db.questionnaireAttempt.create({
      data: { userId, bankVersion: QUESTION_BANK_VERSION, status: "IN_PROGRESS" },
      include: { answers: { select: { questionId: true, choice: true } } },
    });
  } catch (error) {
    // Two first answers saved at the same time: the other request created the attempt.
    if ((error as { code?: string }).code === "P2002") {
      const created = await getInProgressAttempt(userId);
      if (created) return created;
    }
    throw error;
  }
}

export async function discardInProgressAttempt(userId: string) {
  await db.questionnaireAttempt.deleteMany({ where: { userId, status: "IN_PROGRESS" } });
}

export async function saveAnswer(userId: string, questionId: string, choice: unknown) {
  if (!QUESTION_BY_ID.has(questionId)) throw new QuestionnaireError("Pergunta inexistente.", "INVALID_QUESTION");
  if (!isAnswerChoice(choice)) throw new QuestionnaireError("Opção de resposta inválida.", "INVALID_CHOICE");
  await requireConsent(userId);
  const attempt = await startAttempt(userId);
  await db.questionnaireAnswer.upsert({
    where: { attemptId_questionId: { attemptId: attempt.id, questionId } },
    create: { attemptId: attempt.id, questionId, choice },
    update: { choice },
  });
  await db.questionnaireAttempt.update({ where: { id: attempt.id }, data: { updatedAt: new Date() } });
  return { attemptId: attempt.id };
}

export function answersToMap(answers: Array<{ questionId: string; choice: AnswerChoice }>): AnswerMap {
  const map: AnswerMap = {};
  for (const answer of answers) map[answer.questionId] = answer.choice;
  return map;
}

/**
 * Completes the in-progress attempt. The previous result is replaced (not kept
 * as history) to avoid accumulating unnecessary sensitive data.
 */
export async function completeAttempt(userId: string, now = new Date()): Promise<QuestionnaireResult> {
  await requireConsent(userId);
  const attempt = await getInProgressAttempt(userId);
  if (!attempt) throw new QuestionnaireError("Não há questionário em andamento.", "NO_ATTEMPT");
  const answers = answersToMap(attempt.answers as Array<{ questionId: string; choice: AnswerChoice }>);
  const pending = QUESTIONS.filter((q) => !answers[q.id]);
  if (pending.length > 0) {
    throw new QuestionnaireError(`Ainda faltam ${pending.length} situações. Você pode escolher "Não sei" quando precisar.`, "INCOMPLETE");
  }
  const result = computeResult(answers, now);
  await db.$transaction([
    db.questionnaireAttempt.deleteMany({ where: { userId, status: "COMPLETED" } }),
    db.questionnaireAttempt.update({
      where: { id: attempt.id },
      data: { status: "COMPLETED", completedAt: now, scoringVersion: result.scoringVersion, result: result as unknown as object },
    }),
    db.user.update({
      where: { id: userId },
      data: { pathMode: result.affinityStatus === "OK" ? "AFFINITY" : "GENERAL", questionnaireDecision: "ACCEPTED" },
    }),
  ]);
  logger.info("questionnaire.completed", { affinityStatus: result.affinityStatus });
  return result;
}

export async function setPathMode(userId: string, mode: "GENERAL" | "AFFINITY") {
  if (mode === "AFFINITY") {
    const result = await getActiveResult(userId);
    if (!result || result.affinityStatus !== "OK") {
      await db.user.update({ where: { id: userId }, data: { pathMode: "GENERAL" } });
      return "GENERAL" as const;
    }
  }
  await db.user.update({ where: { id: userId }, data: { pathMode: mode } });
  return mode;
}
