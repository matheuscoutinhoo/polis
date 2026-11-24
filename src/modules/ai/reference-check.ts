import type { EventContent, ListSection } from "@/modules/events/content";
import type { EvidenceItem } from "./evidence";
import type { EventDraftOutput, QuestionAnswer } from "./schemas";

// Server-side checks on model output. Valid JSON does not prove truth: every
// reference must exist in the evidence pack, numbers must appear in the cited
// evidence, and unsupported or recommending content is blocked.

const STOPWORDS = new Set(
  "para pela pelo pelos pelas como mais menos sobre entre desde ainda quando onde qual quais que isso esta este esse essa estes essas aquele aquela seus suas dele dela deles delas uma umas uns sendo sido foram ser sera serao pode podem deve devem havia haver tambem muito muita apenas cada todo toda todos todas outra outro outros outras mesmo mesma ao aos das dos nas nos com sem por the and".split(
    " ",
  ),
);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function contentWords(value: string): Set<string> {
  return new Set(
    normalize(value)
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length >= 4 && !STOPWORDS.has(word)),
  );
}

function numbersIn(value: string): string[] {
  return (value.match(/\d+(?:[.,]\d+)*/g) ?? [])
    .map((raw) => {
      // Brazilian format: "." thousands, "," decimals ("5.000,00" → 5000).
      const normalized = raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : /^\d{1,3}(\.\d{3})+$/.test(raw) ? raw.replace(/\./g, "") : raw;
      const parsed = Number.parseFloat(normalized);
      return Number.isFinite(parsed) ? String(parsed) : raw;
    })
    .filter((n) => Number.parseFloat(n) >= 10);
}

/**
 * Lexical relation between a claim and its cited evidence: at least one shared
 * content word, and every number in the claim (10 or more) must appear in the
 * evidence or in the editorial context shown on the page.
 * A failed check is reported for editorial review.
 */
export function relationProblem(claim: string, evidence: EvidenceItem[], extraContext = ""): string | null {
  if (evidence.length === 0) return "sem evidência";
  const evidenceText = evidence.map((e) => `${e.title} ${e.text}`).join(" ");
  const knownNumbers = new Set(numbersIn(`${evidenceText} ${extraContext}`));
  const missingNumbers = numbersIn(claim).filter((n) => !knownNumbers.has(n));
  if (missingNumbers.length) return `número não encontrado na evidência citada (${missingNumbers.join(", ")})`;
  const claimWords = contentWords(claim);
  const evidenceWords = contentWords(evidenceText);
  const shared = [...claimWords].filter((w) => evidenceWords.has(w));
  if (claimWords.size > 0 && shared.length === 0) return "a afirmação não compartilha termos com a evidência citada";
  return null;
}

export function resolveRefs(refs: string[], byRef: Map<string, EvidenceItem>) {
  const valid: EvidenceItem[] = [];
  const invalid: string[] = [];
  for (const ref of new Set(refs.map((r) => r.trim()))) {
    const item = byRef.get(ref);
    if (item) valid.push(item);
    else invalid.push(ref);
  }
  return { valid, invalid };
}

const RECOMMENDATION_PATTERNS = [
  /\bvote (em|no|na|nos|nas|pelo|pela)\b/,
  /\b(recomendo|recomendamos|sugiro|sugerimos) (que )?(voce )?(vote|apoie|escolha|defenda|adote|filie)/,
  /\bvoce (deve|deveria|precisa) (votar|apoiar|escolher|defender|adotar|se filiar)/,
  /\b(a|o) melhor (corrente|ideologia|partido|candidat[oa]|opcao politica|lado)\b/,
  /\bo (certo|correto) e (votar|apoiar|defender|ser)\b/,
];

/** Heuristic safety net: flags text that recommends a vote, party, current or side. */
export function containsRecommendation(text: string): boolean {
  const normalized = normalize(text);
  return RECOMMENDATION_PATTERNS.some((pattern) => {
    const match = pattern.exec(normalized);
    if (!match) return false;
    const clauseStart = Math.max(normalized.lastIndexOf(".", match.index), normalized.lastIndexOf(";", match.index), normalized.lastIndexOf("!", match.index), normalized.lastIndexOf("?", match.index));
    const clause = normalized.slice(clauseStart + 1, match.index + match[0].length + 20);
    return !/\b(nao|nunca|nem|ninguem|nenhum|nenhuma)\b/.test(clause);
  });
}

export type DraftReport = {
  model: string;
  generatedAt: string;
  centralFactSupported: boolean;
  unsupportedPoints: string[];
  invalidReferences: string[];
  removedItems: Array<{ section: string; text: string; reason: string }>;
  relationWarnings: Array<{ section: string; text: string; problem: string }>;
  recommendationFlags: string[];
};

type CatalogLesson = { id: string; ref: string };

/** Maps a validated model draft to EventContent with source keys, plus a review report. */
export function validateEventDraft(
  output: EventDraftOutput,
  byRef: Map<string, EvidenceItem>,
  catalog: CatalogLesson[],
  meta: { model: string; asOf: string; now?: Date },
): { content: EventContent; report: DraftReport } {
  const invalidReferences = new Set<string>();
  const removedItems: DraftReport["removedItems"] = [];
  const relationWarnings: DraftReport["relationWarnings"] = [];
  const recommendationFlags: string[] = [];

  function keysFor(section: string, claim: string, refs: string[]): string[] {
    const { valid, invalid } = resolveRefs(refs, byRef);
    invalid.forEach((r) => invalidReferences.add(r));
    const problem = valid.length ? relationProblem(claim, valid) : null;
    if (problem) relationWarnings.push({ section, text: claim.slice(0, 160), problem });
    if (containsRecommendation(claim)) recommendationFlags.push(`${section}: ${claim.slice(0, 120)}`);
    return [...new Set(valid.map((v) => v.sourceKey))];
  }

  function keepSupported<T extends { refs: string[] }, R>(section: ListSection, items: T[], claimOf: (item: T) => string, map: (item: T, keys: string[]) => R): R[] {
    const result: R[] = [];
    for (const item of items) {
      const claim = claimOf(item);
      const keys = keysFor(section, claim, item.refs);
      if (keys.length === 0) {
        removedItems.push({ section, text: claim.slice(0, 160), reason: "sem referência válida" });
        continue;
      }
      result.push(map(item, keys));
    }
    return result;
  }

  const lessonByRef = new Map(catalog.map((l) => [l.ref, l.id]));
  const summaryKeys = keysFor("summary", output.summary.text, output.summary.refs);
  const content: EventContent = {
    summary: { text: output.summary.text.trim(), sources: summaryKeys },
    context: { text: output.context.text.trim(), sources: keysFor("context", output.context.text, output.context.refs) },
    actors: keepSupported("actors", output.actors, (a) => `${a.name} ${a.role}`, (a, sources) => ({ name: a.name, role: a.role, sources })),
    status: {
      label: output.status.label.trim(),
      description: output.status.description.trim(),
      asOf: meta.asOf,
      sources: keysFor("status", `${output.status.label} ${output.status.description}`, output.status.refs),
    },
    timeline: keepSupported("timeline", output.timeline, (t) => `${t.date} ${t.label}`, (t, sources) => ({ date: /^\d{4}(-\d{2}(-\d{2})?)?$/.test(t.date) ? t.date : "", label: t.label, sources })),
    institutions: keepSupported("institutions", output.institutions, (i) => `${i.name} ${i.role} ${i.limits}`, (i, sources) => ({ name: i.name, role: i.role, limits: i.limits, sources })),
    concepts: keepSupported("concepts", output.concepts, (c) => `${c.term} ${c.relation}`, (c, sources) => ({ term: c.term, relation: c.relation, lessonRef: lessonByRef.get(c.lessonId) ?? null, sources })),
    impacts: keepSupported(
      "impacts",
      output.impacts,
      (i) => `${i.decision} ${i.change} ${i.group} ${i.conditions}`,
      (i, sources) => ({ kind: i.kind, decision: i.decision, change: i.change, group: i.group, conditions: i.conditions, sources }),
    ),
    arguments: keepSupported("arguments", output.arguments, (a) => `${a.attribution} ${a.text}`, (a, sources) => ({ attribution: a.attribution, kind: a.kind, text: a.text, sources })),
    uncertainties: keepSupported("uncertainties", output.uncertainties, (u) => u.text, (u, sources) => ({ text: u.text, sources })),
    limitations: [],
  };

  const centralFactSupported = output.centralFactSupported && summaryKeys.length > 0;
  return {
    content,
    report: {
      model: meta.model,
      generatedAt: (meta.now ?? new Date()).toISOString(),
      centralFactSupported,
      unsupportedPoints: output.unsupportedPoints.slice(0, 20),
      invalidReferences: [...invalidReferences],
      removedItems,
      relationWarnings,
      recommendationFlags,
    },
  };
}

export type CheckedAnswer =
  | { kind: "answer"; status: QuestionAnswer["status"]; answer: string; citations: Array<{ item: EvidenceItem; supports: string }>; missingInformation: string; invalidReferences: string[] }
  | { kind: "blocked"; reason: string; invalidReferences: string[] };

/** Validates a contextual answer before it is shown. */
export function checkAnswer(output: QuestionAnswer, byRef: Map<string, EvidenceItem>, pageContext = ""): CheckedAnswer {
  const resolved = resolveRefs(output.citations.map((c) => c.ref), byRef);
  if (containsRecommendation(output.answer)) {
    return { kind: "blocked", reason: "A resposta gerada continha uma recomendação e foi bloqueada.", invalidReferences: resolved.invalid };
  }
  const citations = output.citations
    .map((c) => ({ item: byRef.get(c.ref.trim()), supports: c.supports }))
    .filter((c): c is { item: EvidenceItem; supports: string } => Boolean(c.item));
  if (output.status === "ANSWERED") {
    if (citations.length === 0) {
      return { kind: "blocked", reason: "A resposta não indicou evidências verificáveis desta página e não foi exibida.", invalidReferences: resolved.invalid };
    }
    const problem = relationProblem(output.answer, citations.map((c) => c.item), pageContext);
    if (problem?.startsWith("número")) {
      return { kind: "blocked", reason: `A resposta foi bloqueada: ${problem}.`, invalidReferences: resolved.invalid };
    }
  }
  return {
    kind: "answer",
    status: output.status,
    answer: output.answer.trim().slice(0, 2000),
    citations,
    missingInformation: output.missingInformation.trim().slice(0, 600),
    invalidReferences: resolved.invalid,
  };
}
