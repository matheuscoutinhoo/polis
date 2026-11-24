// Local development only: starts a real PostgreSQL server (embedded-postgres)
// for machines without Docker or a system PostgreSQL. Production uses the
// Railway PostgreSQL service through DATABASE_URL.
//
// Databases are always created with UTF-8 encoding (the cluster default on
// Windows would otherwise follow the system code page). Use
// `npm run db:local -- --fix-encoding` to recreate existing non-UTF-8
// databases (their data is lost).
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";
import path from "node:path";

const port = Number(process.env.LOCAL_PG_PORT ?? 5432);
const databaseDir = path.resolve(process.env.LOCAL_PG_DIR ?? ".postgres-data");
const fixEncoding = process.argv.includes("--fix-encoding");
const databases = (process.env.LOCAL_PG_DATABASES ?? "polis,polis_test")
  .split(",")
  .map((name) => name.trim())
  .filter((name) => /^[a-z0-9_]+$/i.test(name));

const pg = new EmbeddedPostgres({
  databaseDir,
  user: "postgres",
  password: "postgres",
  port,
  persistent: true,
  autoRehydrateSymlinks: true,
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
  onLog: () => {},
});

const isNew = !existsSync(path.join(databaseDir, "PG_VERSION"));
if (isNew) {
  await pg.initialise();
}
await pg.start();

const client = pg.getPgClient("postgres");
await client.connect();
for (const name of databases) {
  const { rows } = await client.query("SELECT pg_encoding_to_char(encoding) AS encoding FROM pg_database WHERE datname = $1", [name]);
  if (rows.length && rows[0].encoding !== "UTF8") {
    if (!fixEncoding) {
      console.warn(`Aviso: o banco ${name} usa ${rows[0].encoding}. Rode "npm run db:local -- --fix-encoding" para recriá-lo em UTF-8 (os dados serão apagados).`);
      continue;
    }
    await client.query(`DROP DATABASE "${name}" WITH (FORCE)`);
    rows.length = 0;
    console.log(`Banco ${name} removido para recriação em UTF-8.`);
  }
  if (!rows.length) {
    await client.query(`CREATE DATABASE "${name}" WITH ENCODING 'UTF8' TEMPLATE template0 LC_COLLATE 'C' LC_CTYPE 'C'`);
    console.log(`Banco criado: ${name} (UTF-8)`);
  }
}
await client.end();

console.log(`PostgreSQL local em postgresql://postgres:postgres@localhost:${port}/${databases[0]}`);
console.log("Pressione Ctrl+C para encerrar.");

let stopping = false;
async function shutdown() {
  if (stopping) return;
  stopping = true;
  await pg.stop();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
setInterval(() => {}, 1 << 30);
