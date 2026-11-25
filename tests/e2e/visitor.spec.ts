import { expect, test } from "@playwright/test";
import { MODULES } from "../../prisma/seed-data/lessons";
import { PASSWORD, completeQuestionnaire, query, signOut, signUp, uniqueEmail } from "./helpers";

const mod = MODULES.find((m) => m.stage === "FOUNDATIONS")!;
const lesson = mod.lessons[0];
const headings = lesson.content.blocks.flatMap((block) => (block.type === "heading" ? [block.text] : []));
const lessonPath = `/aprender/${mod.slug}/${lesson.slug}`;

test("sem conta: página inicial completa, listas trocadas por aviso e prévias nas páginas de conteúdo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Explore por tema" })).toBeVisible();
  await expect(page.locator("#acesso-com-conta")).toHaveCount(0);

  const [event] = await query<{ slug: string; title: string; context: string }>(
    `SELECT slug, title, content->'context'->>'text' AS context FROM events WHERE status = 'PUBLISHED' ORDER BY "eventDate" DESC LIMIT 1`,
  );
  expect(event, "o seed publica acontecimentos").toBeDefined();
  const [forum] = await query<{ slug: string; title: string }>(`SELECT slug, title FROM forums WHERE "isOfficial" = true AND status = 'VISIBLE' ORDER BY slug LIMIT 1`);

  // List pages show only their header and the notice; the items are not even sent to the browser.
  const lists = [
    { path: "/aprender", notice: "Crie uma conta para explorar os temas", hidden: mod.title },
    { path: `/aprender/${mod.slug}`, notice: "Crie uma conta para estudar este módulo", hidden: lesson.title },
    { path: "/acontecimentos", notice: "Crie uma conta para acompanhar os acontecimentos", hidden: event.title },
    { path: "/comunidade", notice: "Crie uma conta para participar da comunidade", hidden: forum.title },
  ];
  for (const { path, notice, hidden } of lists) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: notice }), path).toBeVisible();
    expect(await (await page.request.get(path)).text(), path).not.toContain(hidden);
  }

  // Lesson: only the opening.
  await page.goto(lessonPath);
  await expect(page.getByRole("heading", { level: 1, name: lesson.title })).toBeVisible();
  await expect(page.getByRole("heading", { name: headings[0] })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Continue esta lição com uma conta" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fontes desta lição" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Conferir respostas" })).toHaveCount(0);
  const lessonHtml = await (await page.request.get(lessonPath)).text();
  expect(lessonHtml).toContain(headings[0]);
  expect(lessonHtml).not.toContain(headings[1]);

  // Event: header and summary only.
  const eventPath = `/acontecimentos/${event.slug}`;
  await page.goto(eventPath);
  await expect(page.getByRole("heading", { level: 1, name: event.title })).toBeVisible();
  await expect(page.getByRole("heading", { name: "O que aconteceu" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Entenda este acontecimento por completo" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Situação atual" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Fontes", exact: true })).toHaveCount(0);
  expect(await (await page.request.get(eventPath)).text()).not.toContain(event.context.slice(0, 60));

  // Forum: presentation and rules, no topics.
  await page.goto(`/comunidade/${forum.slug}`);
  await expect(page.getByRole("heading", { level: 1, name: forum.title })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Crie uma conta para ler este fórum" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tópicos", exact: true })).toHaveCount(0);
});

test("questionário obrigatório: a conta nova responde antes de acessar o conteúdo e, ao entrar de novo, volta à página de origem", async ({ page }) => {
  const email = uniqueEmail("visitante");
  await signUp(page, "Pessoa Visitante", email);

  // Without a finished questionnaire, every content page leads back to it, with no way to skip.
  for (const path of ["/", "/aprender", lessonPath, "/acontecimentos", "/comunidade"]) {
    await page.goto(path);
    await expect(page, path).toHaveURL(/\/questionario\?pendente=1$/);
  }
  await expect(page.getByText("Responda ao questionário para continuar")).toBeVisible();
  await expect(page.getByRole("button", { name: "Responder depois" })).toHaveCount(0);

  await completeQuestionnaire(page);
  await page.goto(lessonPath);
  await expect(page.getByRole("heading", { name: "Fontes desta lição" })).toBeVisible();

  // "Já tenho conta" brings the person back to the same lesson, now complete.
  await signOut(page);
  await page.goto(lessonPath);
  await page.getByRole("link", { name: "Já tenho conta" }).click();
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(PASSWORD);
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL((url) => url.pathname === lessonPath);
  await expect(page.getByRole("heading", { name: headings[1] })).toBeVisible();
});