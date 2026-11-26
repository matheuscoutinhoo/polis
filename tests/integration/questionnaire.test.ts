import { beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { QUESTIONS, QUESTION_BANK_VERSION } from "@/modules/diagnostic/question-bank";
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

describe("Questionário persistido", () => {
  beforeEach(resetDatabase);

  it("não salva respostas sem a autorização específica", async () => {
    const user = await createUser();
    await expect(startAttempt(user.id)).rejects.toMatchObject({ code: "NO_CONSENT" });
    expect(await db.questionnaireAttempt.count()).toBe(0);
  });

  it("permite pausar e retomar, e o resultado é o mesmo do cálculo determinístico", async () => {
    const user = await createUser();
    await grantQuestionnaireConsent(user.id);

    // Concurrent first saves must not create two attempts.
    await Promise.all(QUESTIONS.slice(0, 5).map((q, i) => saveAnswer(user.id, q.id, choiceFor(i))));
    for (const [i, q] of QUESTIONS.slice(5, 20).entries()) await saveAnswer(user.id, q.id, choiceFor(i + 5));
    await saveAnswer(user.id, QUESTIONS[0].id, "UNKNOWN");

    const paused = await getInProgressAttempt(user.id);
    expect(paused?.answers).toHaveLength(20);
    expect(paused?.answers.find((a) => a.questionId === QUESTIONS[0].id)?.choice).toBe("UNKNOWN");
    await expect(completeAttempt(user.id)).rejects.toMatchObject({ code: "INCOMPLETE" });

    for (const [i, q] of QUESTIONS.slice(20).entries()) await saveAnswer(user.id, q.id, choiceFor(i + 20));
    const result = await completeAttempt(user.id, FIXED);

    const expected = computeResult(Object.fromEntries(QUESTIONS.map((q, i) => [q.id, i === 0 ? "UNKNOWN" : choiceFor(i)])), FIXED);
    expect(result).toEqual(expected);
    expect(await getActiveResult(user.id)).toEqual(expected);
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
    await expect(saveAnswer(user.id, QUESTIONS[0].id, "AGREE")).rejects.toMatchObject({ code: "OUTDATED_CONSENT" });

    await grantQuestionnaireConsent(user.id);
    await saveAnswer(user.id, QUESTIONS[0].id, "AGREE");
    expect((await getInProgressAttempt(user.id))?.answers).toHaveLength(1);
  });

  it("refazer guarda o histórico privado: o mais recente ordena a trilha, cada resultado pode ser apagado, e revogar apaga tudo", async () => {
    const user = await createUser();
    const other = await createUser();
    await grantQuestionnaireConsent(user.id);
    for (const q of QUESTIONS) await saveAnswer(user.id, q.id, "AGREE");
    const first = await completeAttempt(user.id, FIXED);

    for (const q of QUESTIONS) await saveAnswer(user.id, q.id, "DISAGREE");
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
