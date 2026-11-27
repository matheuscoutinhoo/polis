import { beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { QUESTIONS, QUESTION_BANK_VERSION, attemptQuestionIds, attemptQuestions } from "@/modules/diagnostic/question-bank";
import type { AnswerChoice } from "@/modules/diagnostic/scale";
import { computeResult } from "@/modules/diagnostic/scoring";
import {
  completeAttempt,
  deleteResult,
  getActiveResult,
  getInProgressAttempt,
  getResult,
  grantQuestionnaireConsent,
  listResults,
  revokeQuestionnaireConsent,
  saveAnswer,
  startAttempt,
} from "@/modules/diagnostic/service";
import { createUser, resetDatabase } from "../support/fixtures";

const CHOICES: AnswerChoice[] = ["STRONGLY_AGREE", "AGREE", "NEUTRAL", "DISAGREE", "STRONGLY_DISAGREE", "UNKNOWN"];
const FIXED = new Date("2026-11-21T12:00:00Z");
const LATER = new Date("2026-11-25T12:00:00Z");

function choiceFor(index: number): AnswerChoice {
  return CHOICES[(index * 7) % CHOICES.length];
}

/** Opens an attempt, as the questionnaire page does, and answers every situation drawn for it. */
async function answerDrawn(userId: string, choice: AnswerChoice) {
  const attempt = await startAttempt(userId);
  for (const id of attempt.questionIds) await saveAnswer(userId, id, choice);
}

describe("Questionário persistido", () => {
  beforeEach(resetDatabase);

  it("não salva respostas sem a autorização específica", async () => {
    const user = await createUser();
    await expect(startAttempt(user.id)).rejects.toMatchObject({ code: "NO_CONSENT" });
    expect(await db.questionnaireAttempt.count()).toBe(0);
  });

  it("permite pausar e retomar com as mesmas situações sorteadas, e o resultado é o mesmo do cálculo determinístico", async () => {
    const user = await createUser();
    await grantQuestionnaireConsent(user.id);

    // Two tabs opening the questionnaire at once share one attempt and one draw.
    const [attempt, twin] = await Promise.all([startAttempt(user.id), startAttempt(user.id)]);
    expect(twin.id).toBe(attempt.id);
    expect(await db.questionnaireAttempt.count()).toBe(1);
    const ids = attempt.questionIds;
    expect(attemptQuestions(ids)).toHaveLength(50);

    await Promise.all(ids.slice(0, 5).map((id, i) => saveAnswer(user.id, id, choiceFor(i))));
    for (const [i, id] of ids.slice(5, 20).entries()) await saveAnswer(user.id, id, choiceFor(i + 5));
    await saveAnswer(user.id, ids[0], "UNKNOWN");

    // A situation of the bank that was not drawn for this attempt is refused.
    const notDrawn = QUESTIONS.find((q) => !ids.includes(q.id))!;
    await expect(saveAnswer(user.id, notDrawn.id, "AGREE")).rejects.toMatchObject({ code: "INVALID_QUESTION" });

    // Resuming shows the same situations, in the same order, with the answers given.
    const paused = await startAttempt(user.id);
    expect(paused.id).toBe(attempt.id);
    expect(paused.questionIds).toEqual(ids);
    expect(paused.answers).toHaveLength(20);
    expect(paused.answers.find((a) => a.questionId === ids[0])?.choice).toBe("UNKNOWN");
    await expect(completeAttempt(user.id)).rejects.toMatchObject({ code: "INCOMPLETE" });

    for (const [i, id] of ids.slice(20).entries()) await saveAnswer(user.id, id, choiceFor(i + 20));
    const result = await completeAttempt(user.id, FIXED);

    const expected = computeResult(Object.fromEntries(ids.map((id, i) => [id, i === 0 ? "UNKNOWN" : choiceFor(i)])), attemptQuestions(ids)!, FIXED);
    expect(result).toEqual(expected);
    expect(await getActiveResult(user.id)).toEqual(expected);
  });

  it("retoma tentativas anteriores ao sorteio com as 50 situações originais, sem perder respostas", async () => {
    const user = await createUser();
    await grantQuestionnaireConsent(user.id);
    // Saved by the previous release: older bank version and no stored draw.
    const legacy = await db.questionnaireAttempt.create({
      data: { userId: user.id, bankVersion: "2026.11-v1", status: "IN_PROGRESS", answers: { create: { questionId: "eco-01", choice: "AGREE" } } },
    });

    const resumed = await startAttempt(user.id);
    expect(resumed.id).toBe(legacy.id);
    expect(resumed.answers).toEqual([{ questionId: "eco-01", choice: "AGREE" }]);
    const original = attemptQuestionIds(resumed.questionIds);
    expect(original.slice(0, 2)).toEqual(["eco-01", "eco-02"]);

    await expect(saveAnswer(user.id, "eco-01b", "AGREE")).rejects.toMatchObject({ code: "INVALID_QUESTION" });
    for (const id of original.slice(1)) await saveAnswer(user.id, id, "DISAGREE");
    const result = await completeAttempt(user.id, FIXED);
    expect(result.answeredCount).toBe(50);
    expect(result.dimensions.flatMap((d) => d.contributions.map((c) => c.questionId)).sort()).toEqual([...original].sort());
  });

  it("mantém a tentativa em andamento coerente mesmo quando gravada pela versão anterior do código", async () => {
    const user = await createUser();
    // The previous release neither sets nor clears "inProgressFor"; the database trigger does.
    const attempt = await db.questionnaireAttempt.create({ data: { userId: user.id, bankVersion: QUESTION_BANK_VERSION, status: "IN_PROGRESS" } });
    expect((await getInProgressAttempt(user.id))?.id).toBe(attempt.id);
    await db.questionnaireAttempt.update({ where: { id: attempt.id }, data: { status: "COMPLETED", completedAt: FIXED } });
    expect(await getInProgressAttempt(user.id)).toBeNull();
  });

  it("exige a versão atual da autorização para responder de novo", async () => {
    const user = await createUser();
    await db.consentRecord.create({ data: { userId: user.id, kind: "QUESTIONNAIRE", version: "questionario-2026-11", purpose: "Versão anterior." } });
    await expect(startAttempt(user.id)).rejects.toMatchObject({ code: "OUTDATED_CONSENT" });
    await expect(saveAnswer(user.id, QUESTIONS[0].id, "AGREE")).rejects.toMatchObject({ code: "OUTDATED_CONSENT" });

    await grantQuestionnaireConsent(user.id);
    // Answers go only to the attempt opened by the questionnaire page, which holds the draw.
    await expect(saveAnswer(user.id, QUESTIONS[0].id, "AGREE")).rejects.toMatchObject({ code: "NO_ATTEMPT" });
    const attempt = await startAttempt(user.id);
    await saveAnswer(user.id, attempt.questionIds[0], "AGREE");
    expect((await getInProgressAttempt(user.id))?.answers).toHaveLength(1);
  });

  it("refazer guarda o histórico privado: o mais recente ordena a trilha, cada resultado pode ser apagado, e revogar apaga tudo", async () => {
    const user = await createUser();
    const other = await createUser();
    await grantQuestionnaireConsent(user.id);
    await answerDrawn(user.id, "AGREE");
    const first = await completeAttempt(user.id, FIXED);

    await answerDrawn(user.id, "DISAGREE");
    // While the new attempt is in progress, the previous result remains active.
    expect(await getActiveResult(user.id)).toEqual(first);
    const second = await completeAttempt(user.id, LATER);

    const history = await listResults(user.id);
    expect(history.map((r) => [r.result, r.active])).toEqual([
      [second, true],
      [first, false],
    ]);
    expect(await getActiveResult(user.id)).toEqual(second);
    const older = history[1];
    expect((await getResult(user.id, older.id))?.result).toEqual(first);

    // Results are private: other accounts can neither read nor delete them.
    expect(await getResult(other.id, older.id)).toBeNull();
    expect(await deleteResult(other.id, older.id)).toBe(false);
    expect(await listResults(user.id)).toHaveLength(2);

    // Deleting the latest result makes the previous one active again.
    expect(await deleteResult(user.id, history[0].id)).toBe(true);
    expect(await getActiveResult(user.id)).toEqual(first);

    await revokeQuestionnaireConsent(user.id);
    expect(await db.questionnaireAttempt.count({ where: { userId: user.id } })).toBe(0);
    expect(await db.questionnaireAnswer.count()).toBe(0);
    const after = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(after).toMatchObject({ pathMode: "GENERAL", questionnaireDecision: "DECLINED" });
    const consents = await db.consentRecord.findMany({ where: { userId: user.id, kind: "QUESTIONNAIRE" } });
    expect(consents.every((c) => c.revokedAt !== null)).toBe(true);
  });
});
