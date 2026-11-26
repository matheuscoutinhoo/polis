// Generates docs/catalogo-de-fontes.md from the seed catalog (no database needed).
// Usage: npm run docs:catalog
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { EVENTS } from "../prisma/seed-data/events";
import { MODULES } from "../prisma/seed-data/lessons";
import { ACCESSED_ON, PUBLISHERS } from "../prisma/seed-data/publishers";
import { ALL_SOURCES } from "../prisma/seed-data/sources";

const MATERIAL: Record<string, string> = {
  ATO_REGISTRO: "Ato ou registro",
  DADO_ESTATISTICO: "Dado estatístico",
  DECLARACAO: "Declaração",
  ESTUDO: "Estudo",
  CONTEUDO_DIDATICO: "Conteúdo didático",
};
const REUSE: Record<string, string> = { OFFICIAL_ACT: "Ato oficial", OPEN_LICENSE: "Licença aberta", PUBLIC_DOMAIN: "Domínio público", REFERENCE_ONLY: "Apenas referência" };

const escape = (value: string) => value.replace(/\|/g, "\\|").replace(/\n/g, " ");

const usedBy = new Map<string, string[]>();
for (const mod of MODULES) {
  for (const lesson of mod.lessons) {
    for (const s of lesson.sources) usedBy.set(s.key, [...(usedBy.get(s.key) ?? []), `lição ${mod.number}.${lesson.number}`]);
  }
}
for (const event of EVENTS) for (const key of event.sourceKeys) usedBy.set(key, [...(usedBy.get(key) ?? []), `acontecimento ${event.slug}`]);

const lines: string[] = [
  "# Catálogo de fontes aprovadas",
  "",
  `Gerado por \`npm run docs:catalog\` a partir de \`prisma/seed-data\`. Consulta das fontes: ${ACCESSED_ON} (trechos das fontes de acontecimentos reconferidos em 2026-11-23; fontes com data própria indicada na tabela). ${PUBLISHERS.length} editores aprovados e ${ALL_SOURCES.length} fontes.`,
  "",
  "Uma fonte só é aceita quando o endereço pertence exatamente a um domínio (e, quando indicado, a um caminho) de um editor aprovado, com HTTPS. A origem oficial não equivale a endosso nem a neutralidade garantida: cada fonte registra o que sustenta e seus limites. A mesma lista aparece na aplicação em `/fontes-e-metodo`.",
  "",
  "## Editores aprovados",
  "",
  "| Editor | Domínios aceitos | Categoria |",
  "| --- | --- | --- |",
  ...PUBLISHERS.map((p) => `| ${escape(p.name)} | ${p.hostnames.map((h) => `\`${h}\``).join(", ")}${p.pathPrefixes?.length ? ` (caminhos ${p.pathPrefixes.map((x) => `\`${x}\``).join(", ")})` : ""} | ${escape(p.category)} |`),
  "",
  "## Fontes por editor",
  "",
];

for (const publisher of PUBLISHERS) {
  const sources = ALL_SOURCES.filter((s) => s.publisher === publisher.key).sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  if (sources.length === 0) continue;
  lines.push(`### ${publisher.name}`, "", "| Fonte | Tipo | Reutilização | O que sustenta e limites | Uso |", "| --- | --- | --- | --- | --- |");
  for (const s of sources) {
    const use = usedBy.get(s.key);
    lines.push(
      `| [${escape(s.title)}](${s.url})${s.locator ? `<br>${escape(s.locator)}` : ""}${s.accessedOn ? `<br>Trechos conferidos em ${s.accessedOn}` : ""} | ${MATERIAL[s.materialType]} | ${REUSE[s.reuseKind]} | ${escape(s.scopeNote)} | ${use ? [...new Set(use)].join("; ") : "perfis de referência"} |`,
    );
  }
  lines.push("");
}

const target = path.resolve("docs/catalogo-de-fontes.md");
mkdirSync(path.dirname(target), { recursive: true });
writeFileSync(target, lines.join("\n"), "utf8");
console.log(`Catálogo gerado em ${path.relative(process.cwd(), target)} (${ALL_SOURCES.length} fontes).`);
