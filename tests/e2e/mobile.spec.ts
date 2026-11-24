import { expect, test, type Page } from "@playwright/test";
import { query } from "./helpers";

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, "a página não deve ter rolagem horizontal em 360 px").toBeLessThanOrEqual(1);
}

test("principais telas funcionam em 360 px sem rolagem horizontal", async ({ page }) => {
  const [lesson] = await query<{ module: string; lesson: string }>(
    `SELECT m.slug AS module, l.slug AS lesson FROM lessons l JOIN modules m ON m.id = l."moduleId" WHERE l.status = 'PUBLISHED' ORDER BY m.number, l.number LIMIT 1`,
  );
  const [event] = await query<{ slug: string }>(`SELECT slug FROM events WHERE status = 'PUBLISHED' ORDER BY "eventDate" DESC LIMIT 1`);
  const paths = [
    "/",
    "/criar-conta",
    "/entrar",
    "/questionario",
    "/aprender",
    `/aprender/${lesson.module}`,
    `/aprender/${lesson.module}/${lesson.lesson}`,
    "/acontecimentos",
    ...(event ? [`/acontecimentos/${event.slug}`] : []),
    "/comunidade",
    "/comunidade/regras",
    "/fontes-e-metodo",
    "/privacidade",
  ];
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBeLessThan(400);
    await expect(page.locator("main")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }

  // Bottom navigation is available on small screens.
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: /principal/i }).last()).toBeVisible();
});
