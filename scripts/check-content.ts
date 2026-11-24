// Editorial check for lesson seed files.
// Usage: npx tsx scripts/check-content.ts [path/to/module.ts ...]
// Without arguments, checks every module registered in prisma/seed-data/lessons/index.ts.
import path from "node:path";
import { pathToFileURL } from "node:url";
import { unverifiedQuotes, validateLessonForPublication } from "../src/modules/learning/content";
import { ALL_SOURCES } from "../prisma/seed-data/sources";
import type { SeedModule } from "../prisma/seed-data/lessons/types";

async function loadModules(files: string[]): Promise<SeedModule[]> {
  if (files.length === 0) {
    const index = await import("../prisma/seed-data/lessons/index");
    return index.MODULES;
  }
  const modules: SeedModule[] = [];
  for (const file of files) {
    const mod = await import(pathToFileURL(path.resolve(file)).href);
    const found = Object.values(mod).filter((value): value is SeedModule => typeof value === "object" && value !== null && "lessons" in value);
    modules.push(...found);
  }
  return modules;
}

function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

async function main() {
  const modules = await loadModules(process.argv.slice(2));
  const approved = new Set(ALL_SOURCES.map((s) => s.key));
  const excerpts = new Map(ALL_SOURCES.map((s) => [s.key, s.excerpts]));
  let problems = 0;
  for (const mod of modules) {
    if (mod.status === "DOCUMENTARY_GAP" && !mod.gapNote) {
      console.log(`✗ ${mod.slug}: módulo com lacuna precisa de gapNote`);
      problems++;
    }
    if (mod.status === "PUBLISHED" && mod.lessons.length < 2) {
      console.log(`✗ ${mod.slug}: módulo publicado precisa de pelo menos duas lições`);
      problems++;
    }
    for (const lesson of mod.lessons) {
      const issues = validateLessonForPublication({
        content: lesson.content,
        quiz: lesson.quiz,
        attachedSourceKeys: lesson.sources.map((s) => s.key),
        approvedSourceKeys: approved,
      });
      issues.push(...unverifiedQuotes(lesson.content, excerpts));
      if (lesson.minutes < 3 || lesson.minutes > 7) issues.push(`Tempo estimado fora do intervalo 3–7 min (${lesson.minutes}).`);
      const words = [lesson.content.intro, ...lesson.content.blocks.map((b) => JSON.stringify(b))].map(wordCount).reduce((a, b) => a + b, 0);
      if (words < 300) issues.push(`Texto curto demais (${words} palavras).`);
      if (lesson.quiz.questions.length < 2) issues.push("A verificação precisa de pelo menos duas questões.");
      if (issues.length) {
        problems += issues.length;
        console.log(`✗ ${mod.slug}/${lesson.slug}`);
        for (const issue of issues) console.log(`   - ${issue}`);
      } else {
        console.log(`✓ ${mod.slug}/${lesson.slug} (${words} palavras, ${lesson.sources.length} fontes)`);
      }
    }
  }
  if (problems > 0) {
    console.log(`\n${problems} problema(s) encontrado(s).`);
    process.exit(1);
  }
  console.log("\nConteúdo válido.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
