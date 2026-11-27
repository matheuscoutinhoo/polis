import type { EvidenceItem } from "@/modules/ai/evidence";
import { relationProblem, type DraftReport } from "@/modules/ai/reference-check";
import { normalize } from "./select";
import type { EventContent } from "../content";

export type NewsEvidence = { title: string; paragraphs: string[]; publishedOn: string };

/** Lexical warnings tolerated before a draft is left for human review. */
const MAX_UNRELATED_ITEMS = 2;

function claimsOf(content: EventContent): string[] {
  return [
    content.summary.text,
    content.context.text,
    `${content.status.label} ${content.status.description}`,
    ...content.actors.map((a) => `${a.name} ${a.role}`),
    ...content.timeline.map((t) => t.label),
    ...content.institutions.map((i) => `${i.name} ${i.role} ${i.limits}`),
    ...content.concepts.map((c) => `${c.term} ${c.relation}`),
    ...content.impacts.map((i) => `${i.decision} ${i.change} ${i.group} ${i.conditions}`),
    ...content.arguments.map((a) => `${a.attribution} ${a.text}`),
    ...content.uncertainties.map((u) => u.text),
  ].filter(Boolean);
}

/**
 * A timeline date must be traceable to the news: the publication date itself,
 * or a year (other than the publication year) and a day of 10 or more that
 * appear in the text. Months are written out in news, so they are not checked.
 */
function dateSupported(date: string, evidence: NewsEvidence, text: string): boolean {
  if (!date || date === evidence.publishedOn) return true;
  const [year, , day] = date.split("-");
  const yearOk = year === evidence.publishedOn.slice(0, 4) || new RegExp(`(?<!\\d)${year}(?!\\d)`).test(text);
  const dayNumber = Number(day ?? 0);
  const dayOk = dayNumber < 10 || new RegExp(`(?<![\\d.,])0?${dayNumber}(?![\\d.,]\\d|\\d)`).test(text);
  return yearOk && dayOk;
}

/**
 * Extra checks before the automatic search publishes a draft, on top of the
 * publication gate. Everything comes from a single news item, so every number
 * in the analysis must appear in it, timeline dates must be traceable to it,
 * the AI must confirm the central fact, and no recommendation or invented
 * reference is accepted. Anything flagged stays as a draft for human review.
 */
export function autoPublishProblems(content: EventContent, report: DraftReport, evidence: NewsEvidence): string[] {
  const problems: string[] = [];
  if (!report.centralFactSupported) problems.push("A IA não confirmou o fato central nas evidências.");
  if (report.recommendationFlags.length) problems.push("Há trechos com linguagem de recomendação.");
  if (report.invalidReferences.length) problems.push(`O rascunho citou evidências inexistentes (${report.invalidReferences.slice(0, 5).join(", ")}).`);

  const text = `${evidence.title}\n${evidence.paragraphs.join("\n")}`;
  const item: EvidenceItem = { ref: "F1", sourceKey: "noticia", title: evidence.title, publisherName: "", locator: "", text: evidence.paragraphs.join(" ") };
  const publication = evidence.publishedOn.replace(/-/g, " ");
  const unsupportedNumbers = claimsOf(content).filter((claim) => relationProblem(claim, [item], publication)?.startsWith("número"));
  if (unsupportedNumbers.length) {
    problems.push(`Números ausentes da notícia de origem em: “${unsupportedNumbers[0].slice(0, 100)}”${unsupportedNumbers.length > 1 ? ` e mais ${unsupportedNumbers.length - 1}` : ""}.`);
  }

  const normalizedText = normalize(text);
  const unsupportedDates = content.timeline.filter((t) => !dateSupported(t.date, evidence, normalizedText)).map((t) => t.date);
  if (unsupportedDates.length) problems.push(`Datas sem respaldo na notícia: ${unsupportedDates.join(", ")}.`);

  const unrelated = report.relationWarnings.filter((w) => !w.problem.startsWith("número"));
  if (unrelated.length > MAX_UNRELATED_ITEMS) problems.push(`${unrelated.length} itens sem relação clara com os trechos citados.`);
  return problems;
}
