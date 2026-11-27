// Runs one search of official news now, like the scheduled one (twice a day).
// Usage: npm run events:fetch [-- --simulado]
// --simulado reads the feeds and shows what would be imported, without writing.
// Without OPENAI_API_KEY nothing is created: the search only lists the news found.
import "dotenv/config";
import { disconnectDb } from "../src/lib/db";
import { runEventIngestion } from "../src/modules/events/ingest/service";

const DECISION: Record<string, string> = {
  published: "publicado",
  draft: "rascunho",
  error: "erro",
  found: "encontrada",
  limit: "fora do limite",
  duplicate: "já coberta",
  ignored: "ignorada",
};

async function main() {
  const dryRun = process.argv.includes("--simulado");
  const result = await runEventIngestion({ trigger: "CLI", dryRun });
  console.log(`Polis · busca de notícias oficiais${dryRun ? " (simulação)" : ""}: ${result.status}`);
  console.log(result.summary);
  for (const error of result.details.feedErrors) console.log(`  ✗ ${error.feed}: ${error.error}`);
  for (const item of result.details.items.filter((i) => i.decision !== "ignored")) {
    console.log(`  · [${DECISION[item.decision] ?? item.decision}] ${item.title}${item.reason ? ` — ${item.reason}` : ""}`);
  }
  const ignored = result.details.items.filter((i) => i.decision === "ignored").length;
  if (ignored) console.log(`  (${ignored} notícias ignoradas: agenda, debates, declarações, áudios ou fora do período)`);
  if (result.status === "FAILED" || result.status === "BUSY") process.exitCode = 1;
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => disconnectDb());
