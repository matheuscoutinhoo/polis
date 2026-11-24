import { beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { markLessonRead, submitQuiz, XP_VALUES } from "@/modules/learning/progress";
import { CORRECT_ANSWERS, createLearningFixture, createUser, resetDatabase, WRONG_ANSWERS } from "../support/fixtures";

describe("XP idempotente", () => {
  beforeEach(resetDatabase);

  it("concede o XP de leitura uma única vez mesmo com requisições simultâneas", async () => {
    const user = await createUser();
    const { lessons } = await createLearningFixture();

    const results = await Promise.all(Array.from({ length: 8 }, () => markLessonRead(user.id, lessons[0].id)));

    expect(results.reduce((sum, r) => sum + r.xpGained, 0)).toBe(XP_VALUES.LESSON_READ);
    expect(await db.xpEvent.count({ where: { userId: user.id } })).toBe(1);
    expect(await db.lessonProgress.count({ where: { userId: user.id } })).toBe(1);
  });

  it("conclui lições e módulo uma vez; repetir exercícios não gera XP extra", async () => {
    const user = await createUser();
    const { lessons } = await createLearningFixture();

    for (const lesson of lessons) {
      await markLessonRead(user.id, lesson.id);
      await submitQuiz(user.id, lesson.id, CORRECT_ANSWERS);
    }
    const repeated = await Promise.all([
      ...lessons.map((lesson) => submitQuiz(user.id, lesson.id, CORRECT_ANSWERS)),
      ...lessons.map((lesson) => markLessonRead(user.id, lesson.id)),
      submitQuiz(user.id, lessons[1].id, CORRECT_ANSWERS),
    ]);

    const total = await db.xpEvent.aggregate({ where: { userId: user.id }, _sum: { amount: true } });
    expect(total._sum.amount).toBe(2 * (XP_VALUES.LESSON_READ + XP_VALUES.LESSON_UNDERSTOOD) + XP_VALUES.MODULE_COMPLETED);
    expect(repeated.every((r) => ("progress" in r ? r.progress.xpGained : r.xpGained) === 0)).toBe(true);
    expect(await db.xpEvent.count({ where: { userId: user.id, kind: "MODULE_COMPLETED" } })).toBe(1);
    expect(await db.userAchievement.count({ where: { userId: user.id, key: "primeira-licao" } })).toBe(1);
  });

  it("erros no exercício não tiram pontos nem marcam compreensão, e a pessoa pode tentar de novo", async () => {
    const user = await createUser();
    const { lessons } = await createLearningFixture();

    const wrong = await submitQuiz(user.id, lessons[0].id, WRONG_ANSWERS);
    expect(wrong.allCorrect).toBe(false);
    expect(wrong.results.find((r) => r.questionId === "q1")?.correct).toBe(false);
    expect(wrong.progress.xpGained).toBe(0);

    const right = await submitQuiz(user.id, lessons[0].id, CORRECT_ANSWERS);
    expect(right.allCorrect).toBe(true);
    expect(right.progress.xpGained).toBe(XP_VALUES.LESSON_UNDERSTOOD);
    const progress = await db.lessonProgress.findUnique({ where: { userId_lessonId: { userId: user.id, lessonId: lessons[0].id } } });
    expect(progress?.attempts).toBe(2);
    expect(progress?.understoodAt).not.toBeNull();
    expect(progress?.completedAt).toBeNull();
  });

  it("o progresso de uma pessoa não afeta o de outra", async () => {
    const [a, b] = [await createUser(), await createUser()];
    const { lessons } = await createLearningFixture();

    await Promise.all([markLessonRead(a.id, lessons[0].id), markLessonRead(b.id, lessons[0].id)]);

    expect(await db.xpEvent.count({ where: { userId: a.id } })).toBe(1);
    expect(await db.xpEvent.count({ where: { userId: b.id } })).toBe(1);
  });
});
