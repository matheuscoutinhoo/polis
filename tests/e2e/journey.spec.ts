import { expect, test } from "@playwright/test";
import { MODULES } from "../../prisma/seed-data/lessons";
import { ANSWER_OPTIONS as OPTIONS, query, signUp, uniqueEmail, verifyEmail } from "./helpers";

test("cadastro, questionário completo, resultado e primeira lição com XP sem duplicação", async ({ page }) => {
  const email = uniqueEmail("jornada");
  await signUp(page, "Pessoa Jornada", email);
  await expect(page.getByText("Conta criada")).toBeVisible();
  await verifyEmail(page, email);
  await expect(page.getByRole("heading", { name: "E-mail confirmado" })).toBeVisible();

  // Separate, explicit consent for the questionnaire.
  await page.goto("/questionario");
  await page.getByRole("checkbox", { name: /Autorizo/ }).check();
  await page.getByRole("button", { name: "Autorizar e começar" }).click();
  await page.waitForURL(/\/questionario\/responder/);

  for (let i = 0; i < 50; i++) {
    await expect(page.getByText(`Pergunta ${i + 1} de 50`)).toBeVisible();
    await page.getByRole("radio", { name: OPTIONS[i % OPTIONS.length] }).check();
    await expect(page.getByText("Resposta salva")).toBeVisible();
    const isBlockEnd = (i + 1) % 10 === 0;
    await page.getByRole("button", { name: isBlockEnd ? "Revisar bloco" : "Próxima" }).click();
    if (isBlockEnd && i < 49) {
      await expect(page.getByRole("heading", { name: `Revise o bloco ${(i + 1) / 10}` })).toBeVisible();
      await page.getByRole("button", { name: `Continuar para o bloco ${(i + 1) / 10 + 1}` }).click();
    }
    if (i === 24) {
      // Pause and resume: answers are kept on the server.
      await page.getByRole("link", { name: "Pausar" }).click();
      await page.waitForURL(/pausado=1/);
      await page.getByRole("link", { name: "Continuar de onde parou" }).click();
      await expect(page.getByText("Pergunta 26 de 50")).toBeVisible();
    }
  }
  await page.getByRole("button", { name: "Ver resultado" }).click();
  await page.waitForURL(/\/questionario\/resultado/);
  await expect(page.getByRole("heading", { name: "O que suas respostas indicam" })).toBeVisible();
  await expect(page.getByText(/Suas respostas (se aproximam|não se aproximam)/)).toBeVisible();

  // First lesson of the path (common foundations for everyone).
  const first = MODULES.find((m) => m.stage === "FOUNDATIONS")!;
  const lesson = first.lessons[0];
  await page.goto(`/aprender/${first.slug}/${lesson.slug}`);
  await expect(page.getByRole("heading", { level: 1, name: lesson.title })).toBeVisible();
  await page.getByRole("button", { name: "Concluí a leitura" }).click();
  await expect(page.getByText("+10 XP de aprendizado.")).toBeVisible();

  for (const [index, question] of lesson.quiz.questions.entries()) {
    const correct = question.options.find((o) => o.id === question.correctOptionId)!;
    await page.getByRole("group", { name: `${index + 1}. ${question.prompt}` }).getByRole("radio", { name: correct.text, exact: true }).check();
  }
  await page.getByRole("button", { name: "Conferir respostas" }).click();
  await expect(page.getByText("Lição concluída. Você pode revisar o conteúdo quando quiser.")).toBeVisible();

  // Repeating the check does not award XP again.
  await page.reload();
  for (const [index, question] of lesson.quiz.questions.entries()) {
    const correct = question.options.find((o) => o.id === question.correctOptionId)!;
    await page.getByRole("group", { name: `${index + 1}. ${question.prompt}` }).getByRole("radio", { name: correct.text, exact: true }).check();
  }
  await page.getByRole("button", { name: "Conferir respostas" }).click();
  await expect(page.getByText("Resposta correta.").first()).toBeVisible();
  const [{ total }] = await query<{ total: string }>(
    `SELECT COALESCE(SUM(x.amount), 0)::text AS total FROM xp_events x JOIN users u ON u.id = x."userId" WHERE u.email = $1`,
    [email],
  );
  expect(Number(total)).toBe(25);

  // Privacy: answers can be deleted on demand.
  await page.goto("/conta/privacidade");
  await page.getByRole("button", { name: "Apagar respostas e resultado" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Apagar dados do questionário" }).click();
  await expect(page.getByText("Respostas e resultado do questionário apagados.")).toBeVisible();
  const [{ count }] = await query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM questionnaire_attempts a JOIN users u ON u.id = a."userId" WHERE u.email = $1`,
    [email],
  );
  expect(Number(count)).toBe(0);
});
