import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, type Page } from "@playwright/test";
import { Client } from "pg";

const MAIL_DIR = path.resolve(".e2e-mail");
const DATABASE_URL = process.env.E2E_DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/polis_e2e";

export const PASSWORD = "senha-de-teste-123";

export function uniqueEmail(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@exemplo.test`;
}

function readOutbox(): Array<{ to: string; subject: string; text: string }> {
  try {
    return readFileSync(path.join(MAIL_DIR, "outbox.jsonl"), "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

export async function linkFromMail(to: string, subject: RegExp): Promise<string> {
  let link: string | undefined;
  await expect
    .poll(
      () => {
        const mail = readOutbox().filter((m) => m.to === to && subject.test(m.subject)).at(-1);
        link = mail?.text.match(/https?:\/\/\S+/)?.[0];
        return Boolean(link);
      },
      { timeout: 15_000 },
    )
    .toBe(true);
  return link!;
}

export async function signUp(page: Page, name: string, email: string) {
  await page.goto("/criar-conta");
  await page.getByLabel("Nome de exibição").fill(name);
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(PASSWORD);
  await page.getByRole("checkbox", { name: /Li e aceito/ }).check();
  await page.getByRole("button", { name: "Criar conta" }).click();
  await page.waitForURL(/\/questionario/);
}

export async function verifyEmail(page: Page, email: string) {
  const link = await linkFromMail(email, /Confirme seu e-mail/);
  await page.goto(link);
  await page.waitForURL(/verificar-email/);
}

export async function signIn(page: Page, email: string) {
  await page.goto("/entrar");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(PASSWORD);
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL((url) => !url.pathname.startsWith("/entrar"));
}

export async function signOut(page: Page) {
  await page.context().clearCookies();
}

export const ANSWER_OPTIONS = [/^Concordo totalmente/, /^Concordo em parte/, /^Nem concordo nem discordo/, /^Discordo em parte/, /^Discordo totalmente/, /^Não sei/];

/** Authorizes and answers all 50 situations: accounts must finish the questionnaire before using the content. */
export async function completeQuestionnaire(page: Page) {
  await page.goto("/questionario");
  await page.getByRole("checkbox", { name: /Autorizo/ }).check();
  await page.getByRole("button", { name: "Autorizar e começar" }).click();
  await page.waitForURL(/\/questionario\/responder/);
  for (let i = 0; i < 50; i++) {
    await expect(page.getByText(`Pergunta ${i + 1} de 50`)).toBeVisible();
    await page.getByRole("radio", { name: ANSWER_OPTIONS[i % ANSWER_OPTIONS.length] }).check();
    await expect(page.getByText("Resposta salva")).toBeVisible();
    const isBlockEnd = (i + 1) % 10 === 0;
    await page.getByRole("button", { name: isBlockEnd ? "Revisar bloco" : "Próxima" }).click();
    if (isBlockEnd && i < 49) await page.getByRole("button", { name: `Continuar para o bloco ${(i + 1) / 10 + 1}` }).click();
  }
  await page.getByRole("button", { name: "Ver resultado" }).click();
  await page.waitForURL(/\/questionario\/resultado/);
}

export async function query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows as T[];
  } finally {
    await client.end();
  }
}
