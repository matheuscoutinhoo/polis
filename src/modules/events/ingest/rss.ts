// Minimal RSS 2.0 reader for the official feeds in feeds.ts: items, CDATA,
// entities and article paragraphs. Feed text is untrusted data: it is only
// stored as source excerpts and sent to the AI as delimited evidence.

export type RssItem = {
  title: string;
  link: string;
  publishedAt: Date | null;
  author: string | null;
  description: string;
  contentHtml: string | null;
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ldquo: "“",
  rdquo: "”",
  lsquo: "‘",
  rsquo: "’",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  laquo: "«",
  raquo: "»",
  middot: "·",
  bull: "•",
  ordm: "º",
  ordf: "ª",
  deg: "°",
  sect: "§",
  euro: "€",
  aacute: "á",
  agrave: "à",
  acirc: "â",
  atilde: "ã",
  eacute: "é",
  ecirc: "ê",
  iacute: "í",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  uacute: "ú",
  uuml: "ü",
  ccedil: "ç",
  Aacute: "Á",
  Agrave: "À",
  Acirc: "Â",
  Atilde: "Ã",
  Eacute: "É",
  Ecirc: "Ê",
  Iacute: "Í",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Uacute: "Ú",
  Ccedil: "Ç",
};

export function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#")) {
      const code = /^#x/i.test(entity) ? Number.parseInt(entity.slice(2), 16) : Number.parseInt(entity.slice(1), 10);
      return Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity] ?? match;
  });
}

/** Text of an XML element: CDATA is kept as is, the rest has its entities decoded. */
function xmlText(raw: string): string {
  let result = "";
  let last = 0;
  for (const match of raw.matchAll(/<!\[CDATA\[([\s\S]*?)\]\]>/g)) {
    result += decodeEntities(raw.slice(last, match.index)) + match[1];
    last = match.index + match[0].length;
  }
  return (result + decodeEntities(raw.slice(last))).trim();
}

function field(block: string, tag: string): string | null {
  const match = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i").exec(block);
  return match ? xmlText(match[1]) : null;
}

// Quote-aware, so a ">" inside an attribute (tooltips, alt texts) does not leak text.
const TAG = /<(?:[^>"']|"[^"]*"|'[^']*')*>/g;

function stripTags(value: string): string {
  return value.replace(TAG, " ");
}

function collapse(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = [];
  for (const match of xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)) {
    const block = match[1];
    const title = collapse(decodeEntities(stripTags(field(block, "title") ?? "")));
    const link = (field(block, "link") || field(block, "guid") || "").trim();
    if (!title || !link) continue;
    const rawDate = field(block, "pubDate") ?? field(block, "dc:date");
    const date = rawDate ? new Date(rawDate) : null;
    items.push({
      title,
      link,
      publishedAt: date && !Number.isNaN(date.getTime()) ? date : null,
      author: field(block, "author") || field(block, "dc:creator") || null,
      description: field(block, "description") ?? "",
      contentHtml: field(block, "content:encoded"),
    });
  }
  return items;
}

const BOILERPLATE =
  /^(saiba mais|leia (tamb[eé]m|mais)|veja (tamb[eé]m|mais)|acompanhe|assista|ou[cç]a|reportagem\s*[-–—:]|edi[cç][aã]o\s*[-–—:]|da reda[cç][aã]o|da ag[eê]ncia|fonte:|foto:|com informa[cç][oõ]es)/i;

/** Short lines without final punctuation are section titles ("Tramitação", "Próximos passos"). */
function isHeading(line: string): boolean {
  return line.length < 60 && !/[.!?:;…"”’)\]]$/.test(line);
}

function keepParagraphs(lines: string[]): string[] {
  return lines.map(collapse).filter((line) => line.length >= 25 && !isHeading(line) && !BOILERPLATE.test(line));
}

/** Article paragraphs from HTML: only <p> blocks (images, captions and scripts are dropped). */
export function htmlToParagraphs(html: string): string[] {
  const cleaned = html.replace(/<(script|style|figure|figcaption|table)\b[\s\S]*?<\/\1>/gi, " ");
  const blocks = [...cleaned.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)].map((m) => m[1]);
  const paragraphs: string[] = [];
  for (const block of blocks.length ? blocks : [cleaned.replace(/<\/(div|li|h\d)>/gi, "\n")]) {
    paragraphs.push(...keepParagraphs(decodeEntities(block.replace(/<br\s*\/?>/gi, "\n").replace(TAG, "")).split("\n")));
  }
  return paragraphs;
}

/** Article paragraphs from plain text with one paragraph per line (Agência Senado). */
export function textToParagraphs(text: string): string[] {
  if (/<(p|br)[\s/>]/i.test(text)) return htmlToParagraphs(text);
  return keepParagraphs(text.split(/\r?\n/));
}

export function itemParagraphs(item: RssItem): string[] {
  const fromContent = item.contentHtml ? htmlToParagraphs(item.contentHtml) : [];
  return fromContent.length ? fromContent : textToParagraphs(item.description);
}
