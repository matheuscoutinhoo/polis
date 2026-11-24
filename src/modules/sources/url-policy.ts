// Server-side validation of source URLs against the explicit list of approved
// publishers. Approval is by exact hostname (and path prefix for shared hosts);
// a URL is never accepted just because it contains "gov", "jus" or "leg".

export type PublisherPolicy = {
  key: string;
  approved: boolean;
  hostnames: string[];
  pathPrefixes: string[];
};

export type UrlCheck =
  | { ok: true; publisherKey: string; canonicalUrl: string }
  | { ok: false; reason: string };

const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

export function canonicalizeUrl(raw: string): URL | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  url.hash = url.hash; // keep fragments (article anchors) but normalize below
  url.hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  return url;
}

export function checkSourceUrl(raw: string, publishers: PublisherPolicy[], expectedPublisherKey?: string): UrlCheck {
  if (typeof raw !== "string" || raw.length > 2000) return { ok: false, reason: "Endereço inválido." };
  const url = canonicalizeUrl(raw);
  if (!url) return { ok: false, reason: "Endereço inválido." };
  if (url.protocol !== "https:") return { ok: false, reason: "Use apenas endereços com https." };
  if (url.username || url.password) return { ok: false, reason: "Endereços com credenciais não são aceitos." };
  if (url.port && url.port !== "443") return { ok: false, reason: "Portas não padronizadas não são aceitas." };
  if (IPV4.test(url.hostname) || url.hostname.includes(":")) return { ok: false, reason: "Endereços IP não são aceitos." };

  const candidates = publishers.filter((p) => p.approved && p.hostnames.map((h) => h.toLowerCase()).includes(url.hostname));
  const matching = candidates.filter((p) => p.pathPrefixes.length === 0 || p.pathPrefixes.some((prefix) => url.pathname.startsWith(prefix)));
  if (matching.length === 0) {
    return { ok: false, reason: `O endereço não pertence a um órgão ou editor aprovado (${url.hostname}${url.pathname.slice(0, 40)}).` };
  }
  const publisher = expectedPublisherKey ? matching.find((p) => p.key === expectedPublisherKey) : matching[0];
  if (!publisher) return { ok: false, reason: "O endereço não corresponde ao órgão selecionado." };
  return { ok: true, publisherKey: publisher.key, canonicalUrl: url.toString() };
}
