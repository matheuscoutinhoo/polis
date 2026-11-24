import { beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { QUESTIONS } from "@/modules/diagnostic/question-bank";
import type { AnswerChoice } from "@/modules/diagnostic/scale";
import { computeResult } from "@/modules/diagnostic/scoring";
import { completeAttempt, getActiveResult, getInProgressAttempt, grantQuestionnaireConsent, revokeQuestionnaireConsent, saveAnswer, startAttempt } from "@/modules/diagnostic/service";
import { createUser, resetDatabase } from "../support/fixtures";

const CHOICES: AnswerChoice[] = ["STRONGLY_AGREE", "AGREE", "NEUTRAL", "DISAGREE", "STRONGLY_DISAGREE", "UNKNOWN"];
const FIXED = new Date("2026-11-21T12:00:00Z");

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

  it("refazer substitui o resultado ativo sem acumular histórico, e revogar apaga tudo", async () => {
    const user = await createUser();
    await grantQuestionnaireConsent(user.id);
    for (const q of QUESTIONS) await saveAnswer(user.id, q.id, "AGREE");
    await completeAttempt(user.id, FIXED);

    for (const q of QUESTIONS) await saveAnswer(user.id, q.id, "DISAGREE");
    // While the new attempt is in progress, the previous result remains active.
    expect(await db.questionnaireAttempt.count({ where: { userId: user.id } })).toBe(2);
    const second = await completeAttempt(user.id, FIXED);

    expect(await db.questionnaireAttempt.count({ where: { userId: user.id } })).toBe(1);
    expect(await getActiveResult(user.id)).toEqual(second);

    await revokeQuestionnaireConsent(user.id);
    expect(await db.questionnaireAttempt.count({ where: { userId: user.id } })).toBe(0);
    expect(await db.questionnaireAnswer.count()).toBe(0);
    const after = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(after).toMatchObject({ pathMode: "GENERAL", questionnaireDecision: "DECLINED" });
    const consents = await db.consentRecord.findMany({ where: { userId: user.id, kind: "QUESTIONNAIRE" } });
    expect(consents.every((c) => c.revokedAt !== null)).toBe(true);
  });
});
