// Prepares the dedicated end-to-end database: recreates the public schema,
// applies migrations and runs the editorial seed. Refuses any database whose
// name does not contain "e2e".
import { execSync } from "node:child_process";
import { rmSync } from "node:fs";
import { Client } from "pg";

async function main() {
  const url = process.env.E2E_DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/polis_e2e";
  const target = new URL(url);
  const name = target.pathname.replace(/^\//, "");
  if (!/e2e/i.test(name)) throw new Error(`Banco de e2e precisa conter "e2e" no nome (recebido: ${name}).`);

  const admin = new URL(url);
  admin.pathname = "/postgres";
  const server = new Client({ connectionString: admin.toString() });
  await server.connect();
  const exists = await server.query("SELECT 1 FROM pg_database WHERE datname = $1", [name]);
  if (!exists.rowCount) await server.query(`CREATE DATABASE "${name.replace(/"/g, "")}" WITH ENCODING 'UTF8' TEMPLATE template0 LC_COLLATE 'C' LC_CTYPE 'C'`);
  await server.end();

  const client = new Client({ connectionString: url });
  await client.connect();
  await client.query("DROP SCHEMA IF EXISTS public CASCADE");
  await client.query("CREATE SCHEMA public");
  await client.end();

  const env = { ...process.env, DATABASE_URL: url };
  execSync("npx prisma migrate deploy", { stdio: "inherit", env });
  execSync("npx tsx prisma/seed.ts", { stdio: "inherit", env });
  rmSync(process.env.DEV_MAIL_DIR ?? ".e2e-mail", { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
