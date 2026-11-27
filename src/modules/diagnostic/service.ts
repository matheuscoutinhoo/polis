import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { QUESTIONNAIRE_CONSENT_PURPOSE, QUESTIONNAIRE_CONSENT_VERSION } from "@/modules/account/consent-texts";
import { QUESTION_BANK_VERSION, QUESTION_BY_ID, attemptQuestionIds, attemptQuestions, drawQuestionIds } from "./question-bank";
import { isAnswerChoice, type AnswerChoice } from "./scale";
import { computeResult, withCurrentProfiles, type AnswerMap, type QuestionnaireResult } from "./scoring";

export class QuestionnaireError extends Error {
  constructor(
    message: string,
    readonly code: "NO_CONSENT" | "OUTDATED_CONSENT" | "INVALID_QUESTION" | "INVALID_CHOICE" | "NO_ATTEMPT" | "INCOMPLETE",
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

/** New answers need the current consent version (earlier versions did not cover keeping a history). */
export function isCurrentConsent(consent: { version: string } | null): boolean {
  return consent?.version === QUESTIONNAIRE_CONSENT_VERSION;
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
    where: { inProgressFor: userId },
    include: { answers: { select: { questionId: true, choice: true } } },
  });
}

/** The most recent completed attempt: its result is the active one, used to order the path. */
export async function getCompletedAttempt(userId: string) {
  return db.questionnaireAttempt.findFirst({ where: { userId, status: "COMPLETED" }, orderBy: [{ completedAt: "desc" }, { id: "desc" }] });
}

function readResult(stored: unknown): QuestionnaireResult | null {
  return stored ? withCurrentProfiles(stored as QuestionnaireResult) : null;
}

export async function getActiveResult(userId: string): Promise<QuestionnaireResult | null> {
  const attempt = await getCompletedAttempt(userId);
  return readResult(attempt?.result);
}

export type StoredResult = { id: string; completedAt: Date; result: QuestionnaireResult; active: boolean };

/** Completed results of this person, most recent (active) first. */
export async function listResults(userId: string): Promise<StoredResult[]> {
  const attempts = await db.questionnaireAttempt.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: [{ completedAt: "desc" }, { id: "desc" }],
    select: { id: true, completedAt: true, result: true },
  });
  return attempts.flatMap((attempt, index) => {
    const result = readResult(attempt.result);
    return result && attempt.completedAt ? [{ id: attempt.id, completedAt: attempt.completedAt, result, active: index === 0 }] : [];
  });
}

/** One completed result, only if it belongs to this person. */
export async function getResult(userId: string, attemptId: string): Promise<StoredResult | null> {
  const [attempt, latest] = await Promise.all([
    db.questionnaireAttempt.findFirst({ where: { id: attemptId, userId, status: "COMPLETED" }, select: { id: true, completedAt: true, result: true } }),
    getCompletedAttempt(userId),
  ]);
  const result = readResult(attempt?.result);
  if (!attempt?.completedAt || !result) return null;
  return { id: attempt.id, completedAt: attempt.completedAt, result, active: latest?.id === attempt.id };
}

/** Deletes one completed result of this person; the next most recent one becomes active. */
export async function deleteResult(userId: string, attemptId: string): Promise<boolean> {
  const { count } = await db.questionnaireAttempt.deleteMany({ where: { id: attemptId, userId, status: "COMPLETED" } });
  if (count === 0) return false;
  const active = await getActiveResult(userId);
  if (!active || active.affinityStatus !== "OK") await db.user.update({ where: { id: userId }, data: { pathMode: "GENERAL" } });
  logger.info("questionnaire.result_deleted");
  return true;
}

async function requireConsent(userId: string) {
  const consent = await getActiveConsent(userId);
  if (!consent) throw new QuestionnaireError("Autorize o tratamento das respostas para usar o questionário.", "NO_CONSENT");
  if (!isCurrentConsent(consent)) {
    throw new QuestionnaireError("A autorização do questionário foi atualizada. Confirme a nova versão para continuar.", "OUTDATED_CONSENT");
  }
}

/**
 * The in-progress attempt, or a new one with its own draw of situations. An open
 * attempt is kept while all of its situations are still in the bank, so a new
 * bank version does not discard answers already given.
 */
export async function startAttempt(userId: string) {
  await requireConsent(userId);
  const existing = await getInProgressAttempt(userId);
  if (existing && attemptQuestions(existing.questionIds)) return existing;
  if (existing) await db.questionnaireAttempt.delete({ where: { id: existing.id } });
  try {
    return await db.questionnaireAttempt.create({
      data: { userId, inProgressFor: userId, bankVersion: QUESTION_BANK_VERSION, questionIds: drawQuestionIds(), status: "IN_PROGRESS" },
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

/** Saves an answer to a situation drawn for the in-progress attempt (the questionnaire page starts the attempt). */
export async function saveAnswer(userId: string, questionId: string, choice: unknown) {
  if (!QUESTION_BY_ID.has(questionId)) throw new QuestionnaireError("Pergunta inexistente.", "INVALID_QUESTION");
  if (!isAnswerChoice(choice)) throw new QuestionnaireError("Opção de resposta inválida.", "INVALID_CHOICE");
  await requireConsent(userId);
  const attempt = await getInProgressAttempt(userId);
  if (!attempt) {
    throw new QuestionnaireError("Este questionário não está mais em andamento. Recarregue a página para continuar.", "NO_ATTEMPT");
  }
  if (!attemptQuestionIds(attempt.questionIds).includes(questionId)) {
    throw new QuestionnaireError("Esta situação não faz parte da sua tentativa atual. Recarregue a página para continuar.", "INVALID_QUESTION");
  }
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
 * Completes the in-progress attempt. Earlier results stay in the private history
 * (the person can compare and delete them); the new one becomes active.
 */
export async function completeAttempt(userId: string, now = new Date()): Promise<QuestionnaireResult> {
  await requireConsent(userId);
  const attempt = await getInProgressAttempt(userId);
  if (!attempt) throw new QuestionnaireError("Não há questionário em andamento.", "NO_ATTEMPT");
  const questions = attemptQuestions(attempt.questionIds);
  if (!questions) throw new QuestionnaireError("O questionário foi atualizado. Recarregue a página para começar de novo.", "NO_ATTEMPT");
  const answers = answersToMap(attempt.answers as Array<{ questionId: string; choice: AnswerChoice }>);
  const pending = questions.filter((q) => !answers[q.id]);
  if (pending.length > 0) {
    throw new QuestionnaireError(`Ainda faltam ${pending.length} situações. Você pode escolher "Não sei" quando precisar.`, "INCOMPLETE");
  }
  const result = computeResult(answers, questions, now);
  await db.$transaction([
    db.questionnaireAttempt.update({
      where: { id: attempt.id },
      data: { status: "COMPLETED", inProgressFor: null, completedAt: now, scoringVersion: result.scoringVersion, result: result as unknown as object },
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
