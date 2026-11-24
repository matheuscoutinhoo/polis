import { z } from "zod";

// Structured event analysis. Every item references approved source keys; items
// without evidence are omitted from the public view, and a central fact without
// evidence blocks publication.

const sources = z.array(z.string().min(1).max(120)).max(12);
// Drafts may be saved incomplete; completeness is enforced by checkEventPublication.
const text = (max: number) => z.string().trim().max(max);
const isoDate = z.string().regex(/^(\d{4}(-\d{2}(-\d{2})?)?)?$/, "Use AAAA, AAAA-MM ou AAAA-MM-DD.");

export const eventContentSchema = z.object({
  summary: z.object({ text: text(1200), sources }),
  context: z.object({ text: text(2000), sources }),
  actors: z.array(z.object({ name: text(160), role: text(400), sources })).max(20),
  status: z.object({ label: text(80), description: text(800), asOf: isoDate, sources }),
  timeline: z.array(z.object({ date: isoDate, label: text(300), sources })).max(30),
  institutions: z.array(z.object({ name: text(160), role: text(600), limits: text(600), sources })).max(15),
  concepts: z
    .array(z.object({ term: text(120), relation: text(600), lessonRef: z.string().max(160).nullable(), sources }))
    .max(12),
  impacts: z
    .array(
      z.object({
        kind: z.enum(["DOCUMENTED", "POSSIBLE"]),
        decision: text(400),
        change: text(600),
        group: text(300),
        conditions: text(600),
        sources,
      }),
    )
    .max(15),
  arguments: z
    .array(z.object({ attribution: text(200), kind: z.enum(["DECLARATION", "INTERPRETATION"]), text: text(800), sources }))
    .max(20),
  uncertainties: z.array(z.object({ text: text(800), sources })).max(15),
  limitations: z.array(text(500)).max(10),
});

export type EventContent = z.infer<typeof eventContentSchema>;

export const EMPTY_EVENT_CONTENT: EventContent = {
  summary: { text: "", sources: [] },
  context: { text: "", sources: [] },
  actors: [],
  status: { label: "", description: "", asOf: "", sources: [] },
  timeline: [],
  institutions: [],
  concepts: [],
  impacts: [],
  arguments: [],
  uncertainties: [],
  limitations: [],
};

export const LIST_SECTIONS = ["actors", "timeline", "institutions", "concepts", "impacts", "arguments", "uncertainties"] as const;
export type ListSection = (typeof LIST_SECTIONS)[number];

export const SECTION_LABEL: Record<ListSection | "summary" | "context" | "status", string> = {
  summary: "O que aconteceu",
  context: "Contexto",
  actors: "Atores envolvidos",
  status: "Situação atual",
  timeline: "Etapas documentadas",
  institutions: "Instituições responsáveis e limites",
  concepts: "Conceitos relacionados",
  impacts: "Impactos",
  arguments: "Argumentos e interpretações",
  uncertainties: "Incertezas e pontos em disputa",
};

export type PublicationCheck = {
  publishable: boolean;
  blocking: string[];
  omitted: Array<{ section: ListSection; index: number; reason: string }>;
  invalidReferences: string[];
};

/**
 * Evidence gate used before publishing. `validKeys` are the approved sources
 * attached to the event. Central facts (summary and status) must be supported;
 * any reference outside the approved set blocks publication; secondary items
 * without evidence are omitted from the public view and reported.
 */
export function checkEventPublication(raw: unknown, validKeys: Set<string>): PublicationCheck {
  const parsed = eventContentSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      publishable: false,
      blocking: [`Estrutura inválida em ${issue?.path.join(".") || "conteúdo"}: ${issue?.message}`],
      omitted: [],
      invalidReferences: [],
    };
  }
  const content = parsed.data;
  const blocking: string[] = [];
  const invalid = new Set<string>();
  const collect = (keys: string[]) => keys.filter((k) => !validKeys.has(k)).forEach((k) => invalid.add(k));

  collect(content.summary.sources);
  collect(content.context.sources);
  collect(content.status.sources);
  for (const section of LIST_SECTIONS) {
    for (const item of content[section]) collect(item.sources);
  }
  if (invalid.size > 0) {
    blocking.push(`Referências inexistentes, não aprovadas ou não vinculadas ao acontecimento: ${[...invalid].join(", ")}.`);
  }
  if (!content.summary.text || content.summary.sources.filter((k) => validKeys.has(k)).length === 0) {
    blocking.push("O fato central (O que aconteceu) não tem evidência aprovada. A publicação fica bloqueada.");
  }
  if (!content.status.label || content.status.sources.filter((k) => validKeys.has(k)).length === 0) {
    blocking.push("A situação atual não tem evidência aprovada.");
  }
  if (!content.status.asOf) blocking.push("Informe a data de referência da situação atual.");
  if (!content.context.text) blocking.push("Descreva o contexto do acontecimento.");
  if (content.timeline.filter((t) => t.date && t.label && t.sources.some((k) => validKeys.has(k))).length === 0) {
    blocking.push("Inclua pelo menos uma etapa documentada com data e fonte.");
  }
  content.arguments.forEach((argument, index) => {
    if (argument.text && !argument.attribution) blocking.push(`O argumento ${index + 1} precisa de atribuição a um ator ou perspectiva.`);
  });

  const omitted: PublicationCheck["omitted"] = [];
  for (const section of LIST_SECTIONS) {
    content[section].forEach((item, index) => {
      if (!isComplete(section, item)) {
        omitted.push({ section, index, reason: "Item incompleto: será omitido da versão publicada." });
      } else if (!item.sources.some((k) => validKeys.has(k))) {
        omitted.push({ section, index, reason: "Sem evidência aprovada: será omitido da versão publicada." });
      }
    });
  }

  return { publishable: blocking.length === 0, blocking, omitted, invalidReferences: [...invalid] };
}

function isComplete(section: ListSection, item: Record<string, unknown>): boolean {
  const required: Record<ListSection, string[]> = {
    actors: ["name", "role"],
    timeline: ["date", "label"],
    institutions: ["name", "role", "limits"],
    concepts: ["term", "relation"],
    impacts: ["decision", "change", "group", "conditions"],
    arguments: ["attribution", "text"],
    uncertainties: ["text"],
  };
  return required[section].every((field) => typeof item[field] === "string" && (item[field] as string).length > 0);
}

/** Public view: removes unsupported secondary items and records the limitation. */
export function publicEventContent(content: EventContent, validKeys: Set<string>): EventContent {
  const result: EventContent = { ...content, limitations: [...content.limitations] };
  let removed = 0;
  for (const section of LIST_SECTIONS) {
    const kept = (content[section] as Array<Record<string, unknown> & { sources: string[] }>).filter(
      (item) => isComplete(section, item) && item.sources.some((k) => validKeys.has(k)),
    );
    removed += content[section].length - kept.length;
    (result as Record<ListSection, unknown[]>)[section] = kept.map((item) => ({ ...item, sources: item.sources.filter((k) => validKeys.has(k)) }));
  }
  if (removed > 0) {
    result.limitations.push("Alguns pontos foram omitidos desta análise por não terem evidência suficiente nas fontes aprovadas.");
  }
  return result;
}
