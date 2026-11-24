import "dotenv/config";
import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll } from "vitest";

// Every integration test file talks to the separate test database only.
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.BETTER_AUTH_URL = "http://localhost:3000";
process.env.BETTER_AUTH_SECRET = "integration-tests-secret-0123456789abcdef0123456789";
process.env.DEV_MAIL_DIR = mkdtempSync(path.join(os.tmpdir(), "polis-mail-"));
delete process.env.OPENAI_API_KEY;
delete process.env.SMTP_HOST;
delete process.env.RESEND_API_KEY;
delete process.env.AUTH_RATE_LIMIT;

afterAll(async () => {
  const { disconnectDb } = await import("@/lib/db");
  await disconnectDb();
});
