import { expect, test } from "@playwright/test";
import { MODULES } from "../../prisma/seed-data/lessons";
import { PASSWORD, query, signOut, signUp, uniqueEmail } from "./helpers";

test("sem conta: página inicial completa, prévias com aviso nas demais páginas e volta à página depois de entrar", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Explore por tema" })).toBeVisible();
  await expect(page.getByText("Prévia sem conta")).toHaveCount(0);
  await expect(page.getByRole("complementary", { name: "Acesso com conta" })).toHaveCount(0);

  // Lesson: only the opening, and the rest is not even sent to the browser.
  const mod = MODULES.find((m) => m.stage === "FOUNDATIONS")!;
  const lesson = mod.lessons[0];
  const headings = lesson.content.blocks.flatMap((block) => (block.type === "heading" ? [block.text] : []));
  const lessonPath = `/aprender/${mod.slug}/${lesson.slug}`;
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
  const [event] = await query<{ slug: string; title: string; context: string }>(
    `SELECT slug, title, content->'context'->>'text' AS context FROM events WHERE status = 'PUBLISHED' ORDER BY "eventDate" DESC LIMIT 1`,
  );
  expect(event, "o seed publica acontecimentos").toBeDefined();
  const eventPath = `/acontecimentos/${event.slug}`;
  await page.goto(eventPath);
  await expect(page.getByRole("heading", { level: 1, name: event.title })).toBeVisible();
  await expect(page.getByRole("heading", { name: "O que aconteceu" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Entenda este acontecimento por completo" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Situação atual" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Fontes", exact: true })).toHaveCount(0);
  expect(await (await page.request.get(eventPath)).text()).not.toContain(event.context.slice(0, 60));

  // List pages remain browsable, with the notice.
  for (const path of ["/aprender", "/acontecimentos", "/comunidade"]) {
    await page.goto(path);
    await expect(page.getByRole("complementary", { name: "Acesso com conta" }), path).toBeVisible();
  }

  // Forum: presentation and rules, no topics.
  const [forum] = await query<{ slug: string; title: string }>(`SELECT slug, title FROM forums WHERE "isOfficial" = true AND status = 'VISIBLE' ORDER BY slug LIMIT 1`);
  await page.goto(`/comunidade/${forum.slug}`);
  await expect(page.getByRole("heading", { level: 1, name: forum.title })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Crie uma conta para ler este fórum" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tópicos", exact: true })).toHaveCount(0);

  // "Já tenho conta" brings the person back to the same lesson, now complete.
  const email = uniqueEmail("visitante");
  await signUp(page, "Pessoa Visitante", email);
  await signOut(page);
  await page.goto(lessonPath);
  await page.getByRole("link", { name: "Já tenho conta" }).click();
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(PASSWORD);
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL((url) => url.pathname === lessonPath);
  await expect(page.getByRole("heading", { name: headings[1] })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fontes desta lição" })).toBeVisible();
});