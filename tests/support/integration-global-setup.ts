import { execSync } from "node:child_process";
import "dotenv/config";

/**
 * Applies the versioned migrations to the separate test database. Refuses to
 * run against the development database or a database without "test" in its name.
 */
export default async function setup() {
  const url = process.env.TEST_DATABASE_URL;
  if (!url) {
    throw new Error("Defina TEST_DATABASE_URL (banco separado, ex.: postgresql://postgres:postgres@localhost:5432/polis_test) para os testes de integração.");
  }
  if (url === process.env.DATABASE_URL) throw new Error("TEST_DATABASE_URL precisa ser diferente de DATABASE_URL.");
  const name = new URL(url).pathname.replace(/^\//, "");
  if (!/test/i.test(name)) throw new Error(`Por segurança, o nome do banco de testes precisa conter "test" (recebido: ${name}).`);
  execSync("npx prisma migrate deploy", { stdio: "inherit", env: { ...process.env, DATABASE_URL: url } });
}
