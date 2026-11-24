import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = `http://localhost:${PORT}`;
const E2E_DATABASE_URL = process.env.E2E_DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/polis_e2e";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  expect: { timeout: 15_000 },
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] }, testIgnore: /mobile\.spec\.ts/ },
    { name: "mobile-360", use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 780 }, isMobile: false, hasTouch: true }, testMatch: /mobile\.spec\.ts/ },
  ],
  // Production build (run `npm run build` first; `npm run test:e2e` does it).
  // The command prepares a dedicated database before the server starts.
  webServer: {
    command: `npx tsx tests/e2e/prepare.ts && npx next start -p ${PORT}`,
    url: `${BASE_URL}/api/health`,
    timeout: 240_000,
    reuseExistingServer: false,
    stdout: "pipe",
    env: {
      DATABASE_URL: E2E_DATABASE_URL,
      E2E_DATABASE_URL,
      BETTER_AUTH_URL: BASE_URL,
      BETTER_AUTH_SECRET: "e2e-only-secret-0123456789abcdef0123456789abcdef",
      POLIS_ALLOW_DEV_MAIL: "true",
      DEV_MAIL_DIR: ".e2e-mail",
      OPENAI_API_KEY: "",
      SMTP_HOST: "",
    },
  },
});
