// Editorial check for the source catalog and the events seed.
// Usage: npx tsx scripts/check-catalog.ts
// - every source: known publisher, URL accepted by the publisher policy, unique key, excerpts present;
// - every event: references only attached cataloged sources, passes the publication gate,
//   valid themes and dates, and linked lessons exist.
import { readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { EVENTS } from "../prisma/seed-data/events";
import { PUBLISHERS } from "../prisma/seed-data/publishers";
import { ALL_SOURCES } from "../prisma/seed-data/sources";
import type { SeedModule } from "../prisma/seed-data/lessons/types";
import { checkEventPublication, LIST_SECTIONS } from "../src/modules/events/content";
import { isEventTheme } from "../src/modules/events/themes";
import { checkSourceUrl } from "../src/modules/sources/url-policy";

async function lessonRefs(): Promise<Set<string>> {
  const dir = path.resolve("prisma/seed-data/lessons");
  const refs = new Set<string>();
  for (const file of readdirSync(dir).filter((f) => /^m\d.*\.ts$/.test(f))) {
    let mod: Record<string, unknown>;
    try {
      mod = await import(pathToFileURL(path.join(dir, file)).href);
    } catch (error) {
      console.log(`  aviso: não foi possível ler ${file} (${(error as Error).message.split("\n")[0]})`);
      continue;
    }
    for (const value of Object.values(mod)) {
      if (value && typeof value === "object" && "lessons" in value && "slug" in value) {
        const seedModule = value as SeedModule;
        if (seedModule.slug.startsWith("tmp-")) continue;
        for (const lesson of seedModule.lessons) refs.add(`${seedModule.slug}/${lesson.slug}`);
      } else if (value && typeof value === "object" && "quiz" in value && "slug" in value && file.startsWith("m10")) {
        refs.add(`leitura-critica/${(value as { slug: string }).slug}`);
      }
    }
  }
  return refs;
}

async function main() {
  let problems = 0;
  const fail = (message: string) => {
    problems++;
    console.log(`✗ ${message}`);
  };

  const policies = PUBLISHERS.map((p) => ({ key: p.key, approved: true, hostnames: p.hostnames, pathPrefixes: p.pathPrefixes ?? [] }));
  const publisherKeys = new Set(PUBLISHERS.map((p) => p.key));
  const seen = new Set<string>();
  for (const source of ALL_SOURCES) {
    if (seen.has(source.key)) fail(`Fonte duplicada: ${source.key}`);
    seen.add(source.key);
    if (!publisherKeys.has(source.publisher)) fail(`${source.key}: editor desconhecido (${source.publisher})`);
    const check = checkSourceUrl(source.url, policies, source.publisher);
    if (!check.ok) fail(`${source.key}: ${check.reason}`);
    if (source.excerpts.length === 0) fail(`${source.key}: nenhum trecho cadastrado`);
    for (const excerpt of source.excerpts) {
      if (!excerpt.text.trim() || !excerpt.locator.trim()) fail(`${source.key}: trecho sem texto ou localização`);
    }
    if (!source.scopeNote.trim() || !source.reuseCondition.trim()) fail(`${source.key}: escopo ou condição de reutilização ausente`);
    for (const date of [source.publishedOn, source.sourceUpdatedOn]) {
      if (date && !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(date)) fail(`${source.key}: data fora do formato AAAA[-MM[-DD]] (${date})`);
    }
  }
  console.log(`Fontes verificadas: ${ALL_SOURCES.length}`);

  const refs = await lessonRefs();
  const slugs = new Set<string>();
  for (const event of EVENTS) {
    const label = `acontecimento ${event.slug}`;
    if (slugs.has(event.slug)) fail(`${label}: slug duplicado`);
    slugs.add(event.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(event.eventDate)) fail(`${label}: eventDate inválida`);
    if (event.themes.length === 0 || !event.themes.every(isEventTheme)) fail(`${label}: temas inválidos`);
    const missing = event.sourceKeys.filter((k) => !seen.has(k));
    if (missing.length) fail(`${label}: fontes não catalogadas ${missing.join(", ")}`);
    const valid = new Set(event.sourceKeys.filter((k) => seen.has(k)));
    const check = checkEventPublication(event.content, valid);
    for (const blocking of check.blocking) fail(`${label}: ${blocking}`);
    for (const omitted of check.omitted) fail(`${label}: ${omitted.section}[${omitted.index}] ${omitted.reason}`);
    const used = new Set<string>([...event.content.summary.sources, ...event.content.context.sources, ...event.content.status.sources]);
    for (const section of LIST_SECTIONS) for (const item of event.content[section]) item.sources.forEach((k) => used.add(k));
    const unused = event.sourceKeys.filter((k) => !used.has(k));
    if (unused.length) console.log(`  aviso ${label}: fontes vinculadas mas não citadas: ${unused.join(", ")}`);
    for (const lesson of event.lessons) {
      if (!refs.has(`${lesson.module}/${lesson.lesson}`)) fail(`${label}: lição inexistente ${lesson.module}/${lesson.lesson}`);
    }
    for (const concept of event.content.concepts) {
      if (concept.lessonRef && !refs.has(concept.lessonRef)) fail(`${label}: conceito aponta para lição inexistente ${concept.lessonRef}`);
    }
    if (!event.reviewNote || event.reviewNote.length < 10) fail(`${label}: registro de revisão ausente`);
    if (check.publishable) console.log(`✓ ${label} (${valid.size} fontes)`);
  }

  if (problems) {
    console.log(`\n${problems} problema(s) encontrado(s).`);
    process.exit(1);
  }
  console.log("\nCatálogo e acontecimentos válidos.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
