import { EVENT_THEMES, type EventThemeKey } from "../themes";

// Which news items become events. Only decisions are kept (approvals,
// sanctions, vetoes, court rulings); agendas, debates and statements are not
// events. Rules are lexical on purpose, so every decision can be explained.

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

type Rule = { pattern: RegExp; points: number; reason: string };

const TITLE_RULES: Rule[] = [
  { pattern: /\b(sancion\w*|promulg\w*)/, points: 6, reason: "sanção ou promulgação" },
  { pattern: /(^lei\b|\bnova lei\b|\bpublicad[ao]s?\b|\bentra em vigor\b|\bpassa a valer\b)/, points: 5, reason: "lei publicada ou em vigor" },
  { pattern: /\b(vetos?|vetad[ao]s?|veta)\b/, points: 5, reason: "veto" },
  {
    pattern: /\b(senado|camara|plenario|congresso|deputados|senadores)\b.{0,40}\b(aprova|aprovam|rejeita|rejeitam|derruba|derrubam|mantem|conclui|concluem)\b/,
    points: 5,
    reason: "votação em plenário",
  },
  {
    pattern: /\b(stf|supremo|tse|tribunal)\b.{0,40}\b(decide|decidem|julga|julgam|derruba|valida|suspende|condena|absolve|mantem|forma maioria)\b/,
    points: 5,
    reason: "decisão judicial",
  },
  { pattern: /\b(aprova|aprovam|aprovad[ao]s?|rejeita|rejeitam|rejeitad[ao]s?)\b/, points: 3, reason: "aprovação ou rejeição" },
  { pattern: /\b(medida provisoria|mp|pec|proposta de emenda|reforma)\b/, points: 2, reason: "proposta de grande alcance" },
  { pattern: /\b(orcamento|ldo|loa)\b/, points: 1, reason: "orçamento" },
];

const AGENDA = /\b(participe|debate|debatem|discute|discutem|audiencia|seminario|sessao solene|homenage\w*|lanca|lancamento|celebra|comemora|palestra|webinar|inscricoes|ao vivo|assista|ouca|agenda)\b/;
const STATEMENT = /\b(elogia|elogiam|critica|criticam|defende|defendem|cobra|cobram|pede|pedem|afirma|diz|dizem|avalia|alerta|lamenta|parabeniza|deseja|recebe)\b/;
const MEDIA_TITLE = /^(audio|video|podcast|galeria|infografico|ao vivo)\b/;

export const MIN_RELEVANCE = 3;

export type Relevance = { score: number; reasons: string[]; excluded: string | null };

/** Relevance of a news item: decisions score; agendas, media and bare statements are excluded. */
export function relevance(title: string, paragraphs: string[]): Relevance {
  const t = normalize(title);
  if (MEDIA_TITLE.test(t)) return { score: 0, reasons: [], excluded: "áudio, vídeo ou galeria" };
  const reasons: string[] = [];
  let score = 0;
  for (const rule of TITLE_RULES) {
    if (rule.pattern.test(t)) {
      score += rule.points;
      reasons.push(rule.reason);
    }
  }
  const lead = normalize(paragraphs.slice(0, 2).join(" "));
  if (/\b(sancao|promulgacao)\b/.test(lead)) {
    score += 1;
    reasons.push("segue para sanção ou promulgação");
  }
  if (STATEMENT.test(t)) score -= 2;
  if (AGENDA.test(t) && score < 5) return { score, reasons, excluded: "agenda, debate ou evento, sem decisão" };
  if (score < MIN_RELEVANCE) return { score, reasons, excluded: STATEMENT.test(t) ? "declaração, sem decisão registrada" : "sem decisão registrada" };
  return { score, reasons, excluded: null };
}

const THEME_PATTERNS: Record<EventThemeKey, RegExp> = {
  economia:
    /\b(imposto|impostos|tribut\w*|orcament\w*|ldo|loa|fiscal|fiscais|juros|inflacao|renda|salari\w*|credito|creditos|divida|dividas|gasto|gastos|despesas?|receitas?|economi\w*|pib|cbs|ibs|previdenc\w*|emprego|empregos|fazenda|banco central|empresas?|comercio|exportac\w*|importac\w*)\b/g,
  educacao: /\b(educac\w*|escola|escolas|escolar|escolares|ensino|estudantes?|alunos?|professor\w*|universidad\w*|merenda|creches?|enem|curricul\w*)\b/g,
  "meio-ambiente":
    /\b(ambient\w*|climatic\w*|clima|desmatamento|licenciamento|florest\w*|residuos|saneamento|biodiversidade|amazonia|queimadas|poluicao|carbono|renovave\w*|hidric\w*|aquicultura|pesca)\b/g,
  "direitos-digitais":
    /\b(digita\w*|internet|dados pessoais|lgpd|plataformas?|redes sociais|inteligencia artificial|deepfakes?|cibern\w*|telecomunicac\w*|telefonia|conectividade|algoritm\w*)\b/g,
  instituicoes:
    /\b(eleic\w*|eleitora\w*|partid\w*|tse|stf|supremo|constituic\w*|constitucional|pec|mandatos?|votos?|cpi|impeachment|ministros?|tribunais|judiciario|federativ\w*|municipios|prefeitos?|governadores?)\b/g,
  seguranca:
    /\b(seguranca publica|polici\w*|crimes?|criminal\w*|penal|penais|prisao|prisoes|presidi\w*|violencia|feminicidio|armas?|trafico|faccoes|homicidios?|medidas protetivas|pf|exercito)\b/g,
  saude: /\b(saude|sus|hospita\w*|medicament\w*|remedios?|doencas?|vacina\w*|medicos?|anvisa|obesidade|diabetes|cancer|enfermag\w*)\b/g,
};

/** Up to two themes by keyword frequency (title counts triple); institutions when nothing matches. */
export function classifyThemes(title: string, paragraphs: string[]): EventThemeKey[] {
  const t = normalize(title);
  const body = normalize(paragraphs.join(" "));
  const scored = EVENT_THEMES.map(({ key }) => {
    const pattern = THEME_PATTERNS[key];
    return { key, score: 3 * (t.match(pattern)?.length ?? 0) + (body.match(pattern)?.length ?? 0) };
  })
    .filter((s) => s.score >= 3)
    .sort((a, b) => b.score - a.score);
  return scored.length ? scored.slice(0, 2).map((s) => s.key) : ["instituicoes"];
}

const BILL_KIND: Array<[RegExp, string]> = [
  [/^(projeto de lei complementar|plp)$/, "PLP"],
  [/^(projeto de lei do congresso nacional|pln)$/, "PLN"],
  [/^(projeto de lei|pl)$/, "PL"],
  [/^(proposta de emenda a constituicao|pec)$/, "PEC"],
  [/^(projeto de decreto legislativo|pdl)$/, "PDL"],
  [/^(medida provisoria|mpv|mp)$/, "MP"],
];

const BILL =
  /\b(projeto de lei complementar|projeto de lei do congresso nacional|projeto de lei|proposta de emenda a constituicao|projeto de decreto legislativo|medida provisoria|plp|pln|pdl|pec|mpv|mp|pl)\b\s*(?:\([a-z]+\)\s*)?(?:n[o.º°]+\s*)?(\d{1,3}(?:\.\d{3})+|\d+)\s*\/\s*(\d{4}|\d{2})\b/g;
const LAW = /\blei\s*(?:complementar\s*)?(?:n[o.º°]+\s*)?(\d{1,2}\.\d{3}|\d{4,5})\b/;

function fullYear(raw: string, reference: number): number {
  if (raw.length === 4) return Number(raw);
  const short = Number(raw);
  return short <= (reference % 100) + 1 ? 2000 + short : 1900 + short;
}

/**
 * Identifiers of the matter in the news: bills (PL, PLP, PLN, PEC, PDL, MP) in the
 * title or opening paragraphs, and the new law number in news about a sanction
 * or publication. Laws only cited as context are ignored.
 */
export function extractIdentifiers(title: string, paragraphs: string[], referenceYear: number): string[] {
  const t = normalize(title);
  const lead = normalize(paragraphs.slice(0, 3).join(" "));
  const ids = new Set<string>();
  for (const match of `${t} ${lead}`.matchAll(BILL)) {
    const kind = BILL_KIND.find(([pattern]) => pattern.test(match[1]))?.[1];
    if (kind) ids.add(`${kind} ${Number(match[2].replace(/\./g, ""))}/${fullYear(match[3], referenceYear)}`);
  }
  const law = LAW.exec(t) ?? (/\b(sancion\w*|promulg\w*|publicad[ao]|nova lei)\b|^lei\b/.test(t) ? LAW.exec(normalize(paragraphs.slice(0, 2).join(" "))) : null);
  if (law) ids.add(`LEI ${Number(law[1].replace(/\./g, ""))}`);
  return [...ids];
}

// Generic words of legislative headlines are ignored so that similarity reflects the subject.
const STOPWORDS = new Set(
  "para pela pelo pelos pelas como mais menos sobre entre apos ante desde ainda quando onde qual quais isso esta este esse essa sera serao pode podem deve devem projeto proposta texto camara senado comissao deputados senadores aprova aprovam aprovado aprovada".split(
    " ",
  ),
);

function titleWords(title: string): Set<string> {
  return new Set(
    normalize(title)
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length >= 4 && !STOPWORDS.has(word)),
  );
}

/** Jaccard similarity of the content words of two titles (0 to 1). */
export function titleSimilarity(a: string, b: string): number {
  const wa = titleWords(a);
  const wb = titleWords(b);
  if (wa.size === 0 || wb.size === 0) return 0;
  const shared = [...wa].filter((w) => wb.has(w)).length;
  return shared / (wa.size + wb.size - shared);
}

export const SAME_STORY_SIMILARITY = 0.5;
