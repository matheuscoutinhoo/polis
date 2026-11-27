import { describe, expect, it } from "vitest";
import type { DraftReport } from "@/modules/ai/reference-check";
import { EMPTY_EVENT_CONTENT, type EventContent } from "@/modules/events/content";
import { autoPublishProblems } from "@/modules/events/ingest/audit";
import { itemParagraphs, parseRss } from "@/modules/events/ingest/rss";
import { isRunDue, latestSlot, localDate, nextSlot, readIngestionSettings } from "@/modules/events/ingest/schedule";
import { classifyThemes, extractIdentifiers, relevance, titleSimilarity } from "@/modules/events/ingest/select";

const SENADO = `<?xml version="1.0" encoding="utf-8" ?>
<rss version="2.0"><channel><title>Senado Federal</title>
  <item>
    <title>Áudio: Comissão analisa projeto sobre resíduos</title>
    <link>https://www12.senado.leg.br/noticias/audios/2026/11/comissao-analisa-projeto</link>
    <description>Resumo do áudio.</description>
    <pubDate>2026-11-27T16:16:31Z</pubDate>
  </item>
  <item>
    <title>Sancionada lei que garante educação básica dos 4 aos 17 anos</title>
    <link>https://www12.senado.leg.br/noticias/materias/2026/11/27/sancionada-lei-educacao-basica</link>
    <description>A Lei 15.555, publicada no Diário Oficial desta sexta-feira (27), torna obrigatória a educação básica dos 4 aos 17 anos &amp; amplia programas.
Tramitação
A lei tem origem no projeto de lei (PL) 2.234/2024, que altera a Lei 8.069/1990 e foi aprovado pelo Senado em 4 de novembro.</description>
    <author>Da Agência Senado</author>
    <pubDate>2026-11-27T14:43:00Z</pubDate>
  </item>
</channel></rss>`;

const CAMARA = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel>
  <item>
    <title><![CDATA[Comissão aprova diretriz para telefonia móvel na área rural]]></title>
    <link>https://www.camara.leg.br/noticias/1323328-comissao-aprova-diretriz</link>
    <pubDate>Fri, 27 Nov 2026 14:19:00 GMT</pubDate>
    <content:encoded><![CDATA[<div class="image-container"><div class="midia-creditos"><em>Foto / Câmara dos Deputados</em></div><img src="x.jpg" alt="Deputado fala" /></div>
<p>A comissão aprovou o <span class="termoGlossario" title="Texto que altera a proposta > versão do relator">substitutivo</span> ao <a href="https://www.camara.leg.br/x">Projeto de Lei 9039/17</a>, sobre telefonia&nbsp;rural.</p>
<p><strong>Próximos passos</strong><br />
O projeto segue para a Comissão de Constituição e Justiça e de Cidadania.</p>
<p><a href="https://www.camara.leg.br/y">Saiba mais sobre a tramitação de projetos de lei</a></p>]]></content:encoded>
  </item>
</channel></rss>`;

describe("leitura dos feeds oficiais", () => {
  it("lê o feed do Senado: data ISO, entidades e um parágrafo por linha, sem intertítulos", () => {
    const [audio, article] = parseRss(SENADO);
    expect(audio.title).toBe("Áudio: Comissão analisa projeto sobre resíduos");
    expect(article.publishedAt?.toISOString()).toBe("2026-11-27T14:43:00.000Z");
    expect(article.author).toBe("Da Agência Senado");
    expect(itemParagraphs(article)).toEqual([
      "A Lei 15.555, publicada no Diário Oficial desta sexta-feira (27), torna obrigatória a educação básica dos 4 aos 17 anos & amplia programas.",
      "A lei tem origem no projeto de lei (PL) 2.234/2024, que altera a Lei 8.069/1990 e foi aprovado pelo Senado em 4 de novembro.",
    ]);
  });

  it("lê o feed da Câmara: CDATA, data RFC 822 e só os parágrafos do texto (sem foto, dicas do glossário, intertítulo ou “Saiba mais”)", () => {
    const [item] = parseRss(CAMARA);
    expect(item.title).toBe("Comissão aprova diretriz para telefonia móvel na área rural");
    expect(item.publishedAt?.toISOString()).toBe("2026-11-27T14:19:00.000Z");
    expect(itemParagraphs(item)).toEqual([
      "A comissão aprovou o substitutivo ao Projeto de Lei 9039/17, sobre telefonia rural.",
      "O projeto segue para a Comissão de Constituição e Justiça e de Cidadania.",
    ]);
  });
});

describe("seleção de notícias", () => {
  it("mantém decisões e ordena as de maior alcance primeiro", () => {
    const sanction = relevance("Sancionada lei que garante educação básica", []);
    const plenary = relevance("Deputados aprovam acordo de cooperação penal com a Guiana", []);
    const committee = relevance("Comissão aprova diretriz para telefonia móvel na área rural", []);
    expect([sanction.excluded, plenary.excluded, committee.excluded]).toEqual([null, null, null]);
    expect(plenary.score).toBeGreaterThan(committee.score);
    expect(sanction.score).toBeGreaterThan(committee.score);
  });

  it("deixa de fora agendas, debates, declarações, projetos apenas apresentados e áudios", () => {
    expect(relevance("Comissão debate financiamento da infraestrutura escolar; participe", []).excluded).toMatch(/agenda/);
    expect(relevance("Motta elogia escolha de novo ministro da Fazenda", []).excluded).toMatch(/declaração/);
    expect(relevance("Projeto estabelece normas de segurança para trabalhadores da saúde", []).excluded).toMatch(/sem decisão/);
    expect(relevance("Áudio: CRA aprova novas regras para aquicultura", []).excluded).toMatch(/áudio/);
    expect(relevance("Após debate, Senado aprova reforma do Código Eleitoral", []).excluded).toBeNull();
  });

  it("classifica temas pelo título e pelo texto, com instituições quando nada se aplica", () => {
    expect(classifyThemes("Comissão aprova carga horária para Filosofia no ensino médio", ["Os estudantes terão aulas obrigatórias nas escolas."])).toEqual(["educacao"]);
    expect(classifyThemes("Comissão aprova punição para deepfakes em campanha eleitoral", [])).toEqual(["direitos-digitais", "instituicoes"]);
    expect(classifyThemes("Comissão aprova comando manual em veículos adaptados", [])).toEqual(["instituicoes"]);
  });

  it("reconhece projetos e a lei nova, sem confundir PLN com PL nem usar leis citadas como contexto", () => {
    expect(extractIdentifiers("Comissão aprova diretriz para telefonia", ["A comissão aprovou o Projeto de Lei 9039/17."], 2026)).toEqual(["PL 9039/2017"]);
    expect(extractIdentifiers("Comissão mista aprova relatório do Orçamento", ["Foi aprovado o relatório preliminar (PLN 24/26)."], 2026)).toEqual(["PLN 24/2026"]);
    expect(extractIdentifiers("Sancionada lei que garante educação básica", ["A Lei 15.555, publicada nesta sexta, altera a Lei 8.069/1990."], 2026)).toEqual(["LEI 15555"]);
    expect(extractIdentifiers("Comissão aprova regra sobre resíduos", ["O texto altera a Lei 12.305/2010."], 2026)).toEqual([]);
  });

  it("reconhece a mesma notícia publicada pelas duas agências", () => {
    expect(titleSimilarity("Comissão mista aprova relatório preliminar do Orçamento de 2027", "CMO aprova relatório preliminar do Orçamento de 2027")).toBeGreaterThanOrEqual(0.5);
    expect(titleSimilarity("Comissão aprova punição para deepfakes em campanha eleitoral", "Comissão aprova carga horária mínima para Filosofia no ensino médio")).toBeLessThan(0.5);
  });
});

describe("agenda da busca", () => {
  const hours = [7, 19];

  it("calcula os horários no fuso de Brasília (UTC−3)", () => {
    const morning = new Date("2026-11-27T12:00:00Z"); // 09:00 em Brasília
    expect(latestSlot(morning, hours).toISOString()).toBe("2026-11-27T10:00:00.000Z");
    expect(nextSlot(morning, hours).toISOString()).toBe("2026-11-27T22:00:00.000Z");
    const beforeDawn = new Date("2026-11-27T09:30:00Z"); // 06:30 em Brasília
    expect(latestSlot(beforeDawn, hours).toISOString()).toBe("2026-11-26T22:00:00.000Z");
    expect(localDate(new Date("2026-11-28T01:30:00Z"))).toBe("2026-11-27");
  });

  it("roda uma vez por horário, recupera horário perdido e repete falhas com intervalo", () => {
    const now = new Date("2026-11-27T12:00:00Z");
    const minutesAgo = (m: number) => new Date(now.getTime() - m * 60_000);
    expect(isRunDue(now, [])).toBe(true);
    expect(isRunDue(now, [{ status: "SUCCESS", startedAt: minutesAgo(100) }])).toBe(false);
    expect(isRunDue(now, [{ status: "SKIPPED", startedAt: minutesAgo(100) }])).toBe(false);
    expect(isRunDue(now, [{ status: "RUNNING", startedAt: minutesAgo(5) }])).toBe(false);
    expect(isRunDue(now, [{ status: "FAILED", startedAt: minutesAgo(10) }])).toBe(false);
    expect(isRunDue(now, [{ status: "FAILED", startedAt: minutesAgo(40) }])).toBe(true);
    expect(isRunDue(now, [100, 70, 40].map((m) => ({ status: "FAILED", startedAt: minutesAgo(m) })))).toBe(false);
  });

  it("liga o agendamento em produção, desliga em desenvolvimento e aceita ajustes", () => {
    expect(readIngestionSettings({ NODE_ENV: "production" })).toMatchObject({ enabled: true, hours: [7, 19], timeZone: "America/Sao_Paulo", maxPublished: 3 });
    expect(readIngestionSettings({ NODE_ENV: "production", EVENTS_AUTO_FETCH: "off" }).enabled).toBe(false);
    expect(readIngestionSettings({ NODE_ENV: "development" }).enabled).toBe(false);
    expect(readIngestionSettings({ NODE_ENV: "development", EVENTS_AUTO_FETCH: "on" }).enabled).toBe(true);
    expect(readIngestionSettings({ EVENTS_FETCH_HOURS: "19, 6, 25, x", EVENTS_FETCH_MAX: "50", EVENTS_FETCH_TIMEZONE: "Lua/Base" })).toMatchObject({
      hours: [6, 19],
      maxPublished: 3,
      timeZone: "America/Sao_Paulo",
    });
  });
});

describe("verificações antes da publicação automática", () => {
  const evidence = {
    title: "Sancionada lei que garante educação básica dos 4 aos 17 anos",
    paragraphs: ["A Lei 15.555, publicada nesta sexta-feira (27), torna obrigatória a educação básica.", "O projeto foi aprovado pelo Senado em 4 de novembro de 2026."],
    publishedOn: "2026-11-27",
  };
  const report: DraftReport = {
    model: "teste",
    generatedAt: "2026-11-27T20:00:00Z",
    centralFactSupported: true,
    unsupportedPoints: [],
    invalidReferences: [],
    removedItems: [],
    relationWarnings: [],
    recommendationFlags: [],
  };
  function content(overrides: Partial<EventContent> = {}): EventContent {
    return {
      ...EMPTY_EVENT_CONTENT,
      summary: { text: "A Lei 15.555 torna obrigatória a educação básica dos 4 aos 17 anos.", sources: ["s"] },
      context: { text: "O projeto foi aprovado pelo Senado antes da sanção.", sources: ["s"] },
      status: { label: "Sancionada", description: "Publicada no Diário Oficial.", asOf: "2026-11-27", sources: ["s"] },
      timeline: [
        { date: "2026-11-04", label: "Aprovação no Senado", sources: ["s"] },
        { date: "2026-11-27", label: "Publicação da Lei 15.555", sources: ["s"] },
      ],
      ...overrides,
    };
  }

  it("aceita uma análise cujos números e datas estão na notícia", () => {
    expect(autoPublishProblems(content(), report, evidence)).toEqual([]);
  });

  it("segura números e datas que a notícia não traz, fato central não confirmado e recomendação", () => {
    const problems = autoPublishProblems(
      content({
        context: { text: "A mudança atinge 47 milhões de estudantes.", sources: ["s"] },
        timeline: [{ date: "2025-11-15", label: "Apresentação do projeto", sources: ["s"] }],
      }),
      { ...report, centralFactSupported: false, recommendationFlags: ["summary: vote em"] },
      evidence,
    );
    expect(problems).toHaveLength(4);
    expect(problems.join(" ")).toMatch(/fato central/);
    expect(problems.join(" ")).toMatch(/recomendação/);
    expect(problems.join(" ")).toMatch(/Números ausentes.*47 milhões/);
    expect(problems.join(" ")).toMatch(/Datas sem respaldo na notícia: 2025-11-15/);
  });
});
