import { describe, expect, it } from "vitest";
import { checkSourceUrl, type PublisherPolicy } from "@/modules/sources/url-policy";

const publishers: PublisherPolicy[] = [
  { key: "camara", approved: true, hostnames: ["www.camara.leg.br", "www2.camara.leg.br"], pathPrefixes: [] },
  { key: "mec", approved: true, hostnames: ["www.gov.br"], pathPrefixes: ["/mec/"] },
  { key: "tse", approved: true, hostnames: ["www.tse.jus.br"], pathPrefixes: [] },
  { key: "pending", approved: false, hostnames: ["www.exemplo.gov.br"], pathPrefixes: [] },
];

describe("source URL policy", () => {
  it("accepts approved hostnames over https", () => {
    const result = checkSourceUrl("https://www.camara.leg.br/noticias/1206672-noticia", publishers);
    expect(result).toMatchObject({ ok: true, publisherKey: "camara" });
  });

  it("requires the path prefix on shared hosts", () => {
    expect(checkSourceUrl("https://www.gov.br/mec/pt-br/assuntos/noticias", publishers)).toMatchObject({ ok: true, publisherKey: "mec" });
    expect(checkSourceUrl("https://www.gov.br/outro-orgao/pt-br/noticia", publishers).ok).toBe(false);
  });

  it.each([
    ["look-alike suffix", "https://www.camara.leg.br.exemplo.com/noticia"],
    ["look-alike prefix", "https://falsacamara.leg.br/noticia"],
    ["unlisted subdomain", "https://especial.camara.leg.br/eleicoes"],
    ["any gov-looking domain", "https://www.prefeitura-exemplo.gov.br/pagina"],
    ["plain http", "http://www.camara.leg.br/noticia"],
    ["credentials in URL", "https://user:pass@www.camara.leg.br/noticia"],
    ["unapproved publisher", "https://www.exemplo.gov.br/pagina"],
    ["IP address", "https://200.1.2.3/pagina"],
    ["not a URL", "camara.leg.br/noticia"],
    ["non-standard port", "https://www.camara.leg.br:8443/noticia"],
  ])("rejects %s", (_label, url) => {
    expect(checkSourceUrl(url, publishers).ok).toBe(false);
  });

  it("checks that the URL belongs to the selected publisher", () => {
    expect(checkSourceUrl("https://www.camara.leg.br/x", publishers, "tse").ok).toBe(false);
    expect(checkSourceUrl("https://www.tse.jus.br/x", publishers, "tse").ok).toBe(true);
  });
});
