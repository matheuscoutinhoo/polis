export type EvidenceSourceInput = {
  key: string;
  title: string;
  publisherName: string;
  materialType: string;
  publishedOn: string | null;
  scopeNote: string;
  excerpts: Array<{ locator: string; text: string }>;
};

export type EvidenceItem = {
  ref: string;
  sourceKey: string;
  title: string;
  publisherName: string;
  locator: string;
  text: string;
};

const MATERIAL_LABEL: Record<string, string> = {
  ATO_REGISTRO: "ato ou registro",
  DADO_ESTATISTICO: "dado estatístico",
  DECLARACAO: "declaração",
  ESTUDO: "estudo",
  CONTEUDO_DIDATICO: "conteúdo didático",
};

/** Neutralizes text before it is embedded between delimiters in a prompt. */
export function sanitizeUntrusted(value: string, maxLength = 4000): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/</g, "‹")
    .replace(/>/g, "›")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Builds the evidence pack sent to the model. Only approved sources are passed
 * in; each curated excerpt receives a system-issued ID (F1, F2...). The model
 * can only reference these IDs, and the server maps them back to sources.
 */
export function buildEvidencePack(sources: EvidenceSourceInput[], maxItems = 40) {
  const items: EvidenceItem[] = [];
  for (const source of sources) {
    const excerpts = source.excerpts.length ? source.excerpts : [{ locator: "Descrição curada pela equipe", text: source.scopeNote }];
    for (const excerpt of excerpts) {
      if (items.length >= maxItems) break;
      items.push({
        ref: `F${items.length + 1}`,
        sourceKey: source.key,
        title: source.title,
        publisherName: source.publisherName,
        locator: excerpt.locator,
        text: excerpt.text,
      });
    }
  }
  const bySource = new Map(sources.map((s) => [s.key, s]));
  const text = items
    .map((item) => {
      const source = bySource.get(item.sourceKey)!;
      const kind = MATERIAL_LABEL[source.materialType] ?? source.materialType;
      return `[${item.ref}] ${sanitizeUntrusted(item.publisherName, 200)} · ${sanitizeUntrusted(item.title, 300)} · ${kind}${
        source.publishedOn ? ` · ${source.publishedOn}` : ""
      } · ${sanitizeUntrusted(item.locator, 200)}\n${sanitizeUntrusted(item.text, 1800)}\nAlcance: ${sanitizeUntrusted(source.scopeNote, 400)}`;
    })
    .join("\n\n");
  return { items, byRef: new Map(items.map((item) => [item.ref, item])), text: `<evidencias>\n${text}\n</evidencias>` };
}
