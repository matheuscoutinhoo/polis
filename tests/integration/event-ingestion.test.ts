import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { AiFailureError, setAiProviderForTesting, type AiProvider, type StructuredRequest } from "@/modules/ai/provider";
import type { EventDraftOutput } from "@/modules/ai/schemas";
import { NEWS_FEEDS } from "@/modules/events/ingest/feeds";
import { runEventIngestion, runScheduledIngestionIfDue, startIngestionRun } from "@/modules/events/ingest/service";
import { listPublishedEvents } from "@/modules/events/service";
import { resetDatabase } from "../support/fixtures";

const NOW = new Date("2026-11-27T20:00:00Z");
const [SENADO_FEED, CAMARA_FEED] = NEWS_FEEDS;

const senadoFeed = (items: string) => `<?xml version="1.0" encoding="utf-8" ?><rss version="2.0"><channel><title>Senado Federal</title>${items}</channel></rss>`;
const camaraFeed = (items: string) =>
  `<?xml version="1.0" encoding="utf-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel>${items}</channel></rss>`;

const SANCTION = `<item>
  <title>Sancionada lei que garante educação básica obrigatória dos 4 aos 17 anos</title>
  <link>https://www12.senado.leg.br/noticias/materias/2026/11/27/sancionada-lei-que-garante-educacao-basica</link>
  <description>A Lei 15.555, publicada no Diário Oficial da União desta sexta-feira (27), torna obrigatória e gratuita a educação básica dos 4 aos 17 anos no Estatuto da Criança e do Adolescente.
Até então, o estatuto previa a obrigatoriedade apenas para o ensino fundamental. A mudança inclui a pré-escola e o ensino médio, que fazem parte da educação básica.
Tramitação
A lei tem origem no projeto de lei (PL) 2.234/2024, aprovado pelo Senado em 4 de novembro, com pareceres favoráveis nas comissões de Educação e de Direitos Humanos.</description>
  <author>Da Agência Senado</author>
  <pubDate>2026-11-27T14:43:00Z</pubDate>
</item>`;

const AUDIO = `<item>
  <title>Áudio: Comissão analisa projeto sobre veículos abandonados</title>
  <link>https://www12.senado.leg.br/noticias/audios/2026/11/comissao-analisa-projeto-sobre-veiculos</link>
  <description>Resumo do áudio sobre o projeto em análise na comissão.</description>
  <pubDate>2026-11-27T16:16:31Z</pubDate>
</item>`;

const DEEPFAKE = `<item>
  <title><![CDATA[Comissão aprova punição para divulgação de deepfakes em campanha eleitoral]]></title>
  <link>https://www.camara.leg.br/noticias/1323330-comissao-aprova-punicao-para-divulgacao-de-deepfakes</link>
  <pubDate>Thu, 26 Nov 2026 19:17:00 GMT</pubDate>
  <content:encoded><![CDATA[<div class="image-container"><div class="midia-creditos"><em>Foto / Câmara dos Deputados</em></div></div>
<p>A Comissão de Comunicação da Câmara dos Deputados aprovou proposta que torna crime divulgar, durante a campanha eleitoral, conteúdo adulterado por inteligência artificial (deepfake) para atribuir a candidatos falas que eles não disseram.</p>
<p>Foi aprovado o <span class="termoGlossario" title="Texto do relator que substitui a proposta original">substitutivo</span> do relator ao Projeto de Lei 212/26.</p>
<p>Pelo texto, o juiz eleitoral poderá determinar a remoção do conteúdo das plataformas digitais, além da pena de detenção prevista para quem divulgar o material.</p>
<p><strong>Próximos passos</strong><br />A proposta segue para a Comissão de Constituição e Justiça e de Cidadania e depois para o Plenário.</p>]]></content:encoded>
</item>`;

const AGENDA = `<item>
  <title><![CDATA[Comissão debate financiamento da infraestrutura escolar; participe]]></title>
  <link>https://www.camara.leg.br/noticias/1323188-comissao-debate-financiamento-da-infraestrutura-escolar</link>
  <pubDate>Fri, 27 Nov 2026 15:53:00 GMT</pubDate>
  <content:encoded><![CDATA[<p>A Comissão de Educação realiza audiência pública nesta semana para debater o financiamento do programa nacional de infraestrutura escolar, com a presença de gestores e especialistas.</p>
<p>O debate foi pedido por deputados que querem conhecer o andamento das obras e a previsão de recursos para os próximos anos nas redes estaduais e municipais.</p>
<p>A população pode enviar perguntas pela internet durante a reunião, que será transmitida ao vivo pelo portal da Câmara dos Deputados.</p>]]></content:encoded>
</item>`;

const SAME_LAW = `<item>
  <title><![CDATA[Lei 15.555 amplia a educação obrigatória para a pré-escola e o ensino médio]]></title>
  <link>https://www.camara.leg.br/noticias/1323999-lei-15555-amplia-a-educacao-obrigatoria</link>
  <pubDate>Fri, 27 Nov 2026 18:00:00 GMT</pubDate>
  <content:encoded><![CDATA[<p>Foi publicada nesta sexta-feira a Lei 15.555, que inclui no Estatuto da Criança e do Adolescente a oferta obrigatória e gratuita da educação básica dos 4 aos 17 anos de idade.</p>
<p>A norma tem origem em proposta da Câmara dos Deputados aprovada pelo Senado no início de novembro e já está em vigor, segundo a publicação no Diário Oficial da União.</p>
<p>Com a mudança, a pré-escola e o ensino médio passam a ter a mesma garantia que já valia para o ensino fundamental em todo o país.</p>]]></content:encoded>
</item>`;

function stubFetch(feeds: { senado: string; camara: string }): typeof fetch {
  return (async (input: string | URL | Request) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url === SENADO_FEED.url) return new Response(feeds.senado, { status: 200 });
    if (url === CAMARA_FEED.url) return new Response(feeds.camara, { status: 200 });
    return new Response("not found", { status: 404 });
  }) as typeof fetch;
}

/** Drafts only from the evidence it receives; mentions a number absent from the deepfake news to exercise the checks. */
function fakeProvider(options: { fail?: boolean } = {}): AiProvider {
  return {
    model: "teste",
    async generate<T>(request: StructuredRequest<T>) {
      if (options.fail) throw new AiFailureError("falha simulada", "PROVIDER_ERROR");
      const refs = [...new Set(request.input.match(/\[F\d+\]/g) ?? [])].map((ref) => ref.slice(1, -1));
      const title = /Título provisório: (.*)/.exec(request.input)?.[1]?.trim() ?? "";
      const date = /Data do fato central informada pela equipe: (\d{4}-\d{2}-\d{2})/.exec(request.input)?.[1] ?? "";
      const output: EventDraftOutput = {
        centralFactSupported: true,
        summary: { text: title, refs },
        context: {
          text: request.input.includes("deepfake") ? "A proposta alcança 47 milhões de eleitores nas plataformas digitais." : "A mudança inclui a pré-escola e o ensino médio na educação básica.",
          refs,
        },
        actors: [],
        status: { label: "Registrado", description: title, refs },
        timeline: [{ date, label: title, refs }],
        institutions: [],
        concepts: [],
        impacts: [],
        arguments: [],
        uncertainties: [],
        unsupportedPoints: [],
      };
      return { data: output as T, model: "teste", usage: { inputTokens: 10, outputTokens: 10 } };
    },
  };
}

async function createPublishers() {
  await db.publisher.createMany({
    data: [
      { key: "senado", name: "Senado Federal", category: "Teste", hostnames: ["www12.senado.leg.br"], approved: true },
      { key: "camara", name: "Câmara dos Deputados", category: "Teste", hostnames: ["www.camara.leg.br"], approved: true },
    ],
  });
}

const FEEDS = { senado: senadoFeed(AUDIO + SANCTION), camara: camaraFeed(AGENDA + DEEPFAKE) };

describe("busca automática de acontecimentos", () => {
  beforeEach(async () => {
    await resetDatabase();
    await createPublishers();
  });
  afterEach(() => setAiProviderForTesting(undefined));

  it("publica o que passa nas verificações, deixa o resto como rascunho com o motivo e alimenta o site", async () => {
    setAiProviderForTesting(fakeProvider());
    const result = await runEventIngestion({ trigger: "CLI", now: NOW, fetchImpl: stubFetch(FEEDS) });

    expect(result).toMatchObject({ status: "SUCCESS", checked: 4, candidates: 2, created: 2, published: 1, drafts: 1 });
    const published = await db.event.findFirstOrThrow({
      where: { status: "PUBLISHED" },
      include: { sources: { include: { source: { include: { excerpts: { orderBy: { createdAt: "asc" } } } } } } },
    });
    expect(published).toMatchObject({ origin: "AUTOMATIC", autoPublished: true, aiAssisted: true, reviewedBy: null, themes: ["educacao"] });
    expect(published.eventDate.toISOString()).toBe("2026-11-27T12:00:00.000Z");
    const source = published.sources[0].source;
    expect(source).toMatchObject({ reviewStatus: "APPROVED", reviewedBy: "Busca automática", publishedOn: "2026-11-27", author: "Agência Senado" });
    expect(source.excerpts.map((e) => e.locator)).toEqual(["Parágrafo 1", "Parágrafo 2", "Parágrafo 3"]);
    expect(await db.moderationAction.findFirst({ where: { action: "PUBLISH_EVENT", targetId: published.id } })).toMatchObject({ actorId: null });

    const draft = await db.event.findFirstOrThrow({ where: { status: "DRAFT" } });
    expect(draft.origin).toBe("AUTOMATIC");
    expect(draft.editorNotes).toMatch(/Não publicado automaticamente: Números ausentes da notícia de origem/);

    expect((await listPublishedEvents()).map((e) => e.id)).toEqual([published.id]);
    const run = await db.eventIngestionRun.findFirstOrThrow();
    expect(run).toMatchObject({ trigger: "CLI", status: "SUCCESS", lockKey: null, published: 1, drafts: 1 });
    const decisions = Object.fromEntries((run.details as { items: Array<{ title: string; decision: string }> }).items.map((i) => [i.title, i.decision]));
    expect(decisions).toMatchObject({
      "Sancionada lei que garante educação básica obrigatória dos 4 aos 17 anos": "published",
      "Comissão aprova punição para divulgação de deepfakes em campanha eleitoral": "draft",
      "Comissão debate financiamento da infraestrutura escolar; participe": "ignored",
      "Áudio: Comissão analisa projeto sobre veículos abandonados": "ignored",
    });
  });

  it("não repete notícia já importada nem o mesmo assunto vindo da outra agência", async () => {
    setAiProviderForTesting(fakeProvider());
    await runEventIngestion({ trigger: "CLI", now: NOW, fetchImpl: stubFetch(FEEDS) });
    const second = await runEventIngestion({
      trigger: "CLI",
      now: new Date(NOW.getTime() + 60 * 60 * 1000),
      fetchImpl: stubFetch({ senado: FEEDS.senado, camara: camaraFeed(DEEPFAKE + SAME_LAW) }),
    });

    expect(second).toMatchObject({ status: "SUCCESS", created: 0 });
    expect(second.details.items.filter((i) => i.decision === "duplicate").map((i) => i.reason)).toEqual([
      expect.stringMatching(/^já importada em “Sancionada lei/),
      expect.stringMatching(/^mesmo assunto de “Sancionada lei/),
      expect.stringMatching(/^já importada em “Comissão aprova punição/),
    ]);
    expect(await db.event.count()).toBe(2);
    expect(await db.source.count()).toBe(2);
  });

  it("sem IA, registra as notícias encontradas e não cria nada", async () => {
    setAiProviderForTesting(null);
    const result = await runEventIngestion({ trigger: "MANUAL", now: NOW, fetchImpl: stubFetch(FEEDS) });

    expect(result).toMatchObject({ status: "SKIPPED", created: 0 });
    expect(result.summary).toMatch(/OPENAI_API_KEY/);
    expect(result.details.items.filter((i) => i.decision === "found")).toHaveLength(2);
    expect(await db.event.count()).toBe(0);
    expect(await db.source.count()).toBe(0);
  });

  it("desfaz a importação quando a IA falha, e a busca seguinte tenta de novo", async () => {
    setAiProviderForTesting(fakeProvider({ fail: true }));
    const failed = await runEventIngestion({ trigger: "CLI", now: NOW, fetchImpl: stubFetch(FEEDS) });
    expect(failed).toMatchObject({ status: "PARTIAL", created: 0 });
    expect(await db.event.count()).toBe(0);
    expect(await db.source.count()).toBe(0);

    setAiProviderForTesting(fakeProvider());
    const retried = await runEventIngestion({ trigger: "CLI", now: new Date(NOW.getTime() + 60_000), fetchImpl: stubFetch(FEEDS) });
    expect(retried).toMatchObject({ status: "SUCCESS", published: 1, drafts: 1 });
  });

  it("permite uma busca por vez e libera a trava de uma busca interrompida", async () => {
    setAiProviderForTesting(fakeProvider());
    const running = await startIngestionRun("MANUAL", NOW);
    expect(running).not.toBeNull();
    expect((await runEventIngestion({ trigger: "CLI", now: NOW, fetchImpl: stubFetch(FEEDS) })).status).toBe("BUSY");

    await db.eventIngestionRun.update({ where: { id: running!.id }, data: { startedAt: new Date(NOW.getTime() - 31 * 60 * 1000) } });
    expect(await startIngestionRun("CLI", NOW)).not.toBeNull();
    expect(await db.eventIngestionRun.findUniqueOrThrow({ where: { id: running!.id } })).toMatchObject({ status: "FAILED", lockKey: null });
  });

  it("a busca agendada roda uma vez por horário", async () => {
    setAiProviderForTesting(fakeProvider());
    const options = { fetchImpl: stubFetch(FEEDS) };
    const first = await runScheduledIngestionIfDue(NOW, options);
    expect(first).toMatchObject({ status: "SUCCESS", published: 1 });
    expect(await runScheduledIngestionIfDue(new Date(NOW.getTime() + 10 * 60 * 1000), options)).toBeNull();
    expect(await db.eventIngestionRun.findFirstOrThrow()).toMatchObject({ trigger: "SCHEDULE" });
  });
});
