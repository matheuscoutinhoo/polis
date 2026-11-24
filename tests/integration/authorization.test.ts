import { beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { exportUserData } from "@/modules/account/privacy";
import { CommunityError, createComment, createForum, createTopic, deleteOwnComment, deleteOwnTopic, editComment, editTopic } from "@/modules/community/service";
import { QUESTIONS } from "@/modules/diagnostic/question-bank";
import { completeAttempt, deleteQuestionnaireData, getActiveResult, grantQuestionnaireConsent, QuestionnaireError, saveAnswer } from "@/modules/diagnostic/service";
import { createUser, resetDatabase } from "../support/fixtures";

async function answerAll(userId: string) {
  await grantQuestionnaireConsent(userId);
  for (const question of QUESTIONS) await saveAnswer(userId, question.id, "AGREE");
  return completeAttempt(userId);
}

const forumInput = {
  title: "Fórum de teste sobre instituições",
  description: "Descrição do fórum de teste com detalhes suficientes.",
  category: "INSTITUICOES",
  rules: "Regras do fórum de teste: respeito e fontes.",
  eventId: null,
};

describe("Autorização entre contas", () => {
  beforeEach(resetDatabase);

  it("respostas e resultado do questionário ficam isolados por conta", async () => {
    const [a, b] = [await createUser(), await createUser()];
    await answerAll(a.id);

    expect(await getActiveResult(a.id)).not.toBeNull();
    expect(await getActiveResult(b.id)).toBeNull();

    const exported = await exportUserData(b.id);
    expect(exported?.attempts).toEqual([]);
    expect(JSON.stringify(exported)).not.toContain(a.id);

    // Without its own consent, B cannot write answers (and never into A's attempt).
    await expect(saveAnswer(b.id, QUESTIONS[0].id, "DISAGREE")).rejects.toMatchObject({ code: "NO_CONSENT" });
    await expect(saveAnswer(b.id, QUESTIONS[0].id, "DISAGREE")).rejects.toBeInstanceOf(QuestionnaireError);

    await deleteQuestionnaireData(b.id);
    expect(await db.questionnaireAttempt.count({ where: { userId: a.id } })).toBe(1);
    expect(await db.questionnaireAnswer.count()).toBe(QUESTIONS.length);
  });

  it("ninguém edita ou exclui tópicos e comentários de outra pessoa", async () => {
    const [author, other] = [await createUser({ name: "Autora" }), await createUser({ name: "Outra pessoa" })];
    const forum = await createForum(author, forumInput);
    const topic = await createTopic(author, forum.id, { title: "Tópico da autora", body: "Texto original do tópico.", lessonId: null, eventId: null });
    const comment = await createComment(author, topic.id, { body: "Comentário original." });

    await expect(editTopic(other, topic.id, { title: "Título alterado", body: "Texto alterado por outra conta." })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(deleteOwnTopic(other, topic.id)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(editComment(other, comment.id, { body: "Comentário alterado" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(deleteOwnComment(other, comment.id)).rejects.toBeInstanceOf(CommunityError);

    expect((await db.topic.findUnique({ where: { id: topic.id } }))?.body).toBe("Texto original do tópico.");
    expect((await db.comment.findUnique({ where: { id: comment.id } }))?.status).toBe("VISIBLE");

    await editComment(author, comment.id, { body: "Comentário revisado pela autora." });
    expect((await db.comment.findUnique({ where: { id: comment.id } }))?.editedAt).not.toBeNull();
  });

  it("publicar exige e-mail confirmado e conta sem suspensão", async () => {
    const author = await createUser();
    const forum = await createForum(author, forumInput);
    const unverified = await createUser({ emailVerified: false });
    const suspended = await createUser({ suspendedUntil: new Date(Date.now() + 86400000) });

    const topic = { title: "Tentativa de publicação", body: "Texto da tentativa de publicação.", lessonId: null, eventId: null };
    await expect(createTopic(unverified, forum.id, topic)).rejects.toMatchObject({ code: "UNVERIFIED" });
    await expect(createTopic(suspended, forum.id, topic)).rejects.toMatchObject({ code: "SUSPENDED" });
    expect(await db.topic.count()).toBe(0);
  });
});
