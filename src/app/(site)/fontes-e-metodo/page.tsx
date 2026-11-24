import type { Metadata } from "next";
import Link from "next/link";
import { MATERIAL_LABEL } from "@/components/polis/evidence-block";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { db } from "@/lib/db";
import { formatDate, formatDecimal, formatPartialDate } from "@/lib/format";
import { DIMENSIONS, DIMENSION_BY_KEY, type DimensionKey } from "@/modules/diagnostic/dimensions";
import { PROFILES_VERSION, RANGE_SUPPORT_LABEL, REFERENCE_PROFILES } from "@/modules/diagnostic/profiles";
import { QUESTIONS, QUESTION_BANK_VERSION } from "@/modules/diagnostic/question-bank";
import { ANSWER_OPTIONS, CHOICE_VALUE } from "@/modules/diagnostic/scale";
import {
  BAND_HIGH,
  BAND_MODERATE,
  CLOSEST_MARGIN,
  FULL_COMPARISON_OVERLAP,
  INTERMEDIATE_THRESHOLD,
  MIN_OVERLAP_FOR_PROFILE,
  MIN_VALID_DIMENSIONS_FOR_AFFINITY,
  MIN_VALID_PER_DIMENSION,
  SCORING_VERSION,
} from "@/modules/diagnostic/scoring";
import { listPublicCatalog } from "@/modules/sources/service";

export const metadata: Metadata = { title: "Fontes e método" };

const REUSE_LABEL: Record<string, string> = {
  OFFICIAL_ACT: "Ato oficial",
  OPEN_LICENSE: "Licença aberta",
  PUBLIC_DOMAIN: "Domínio público",
  REFERENCE_ONLY: "Apenas referência",
};

const SECTIONS = [
  { id: "politica-editorial", label: "Política editorial" },
  { id: "fontes", label: "Catálogo de fontes" },
  { id: "questionario", label: "Método do questionário" },
  { id: "perfis", label: "Perfis de referência" },
  { id: "trilha", label: "Ordem da trilha" },
  { id: "ia", label: "Uso de IA" },
  { id: "lacunas", label: "Lacunas documentais" },
];

const n = (value: number) => formatDecimal(value);

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-h2 font-semibold">
      {children}
    </h2>
  );
}

export default async function SourcesAndMethodPage() {
  const [catalog, gapModules] = await Promise.all([
    listPublicCatalog(),
    db.module.findMany({ where: { status: "DOCUMENTARY_GAP" }, orderBy: { number: "asc" }, select: { title: true, gapNote: true } }),
  ]);
  const sourceTitle = new Map(catalog.flatMap((p) => p.sources.map((s) => [s.key, s.title] as const)));
  const totalSources = catalog.reduce((sum, p) => sum + p.sources.length, 0);

  return (
    <div className="page-frame py-8 md:py-12">
      <p className="eyebrow">Transparência</p>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">Fontes e método</h1>
      <p className="reading-measure mt-3 text-lead text-ink-soft">
        Como a Polis escolhe fontes, escreve explicações, calcula o resultado do questionário, ordena a trilha e usa inteligência artificial. Tudo o que está aqui pode ser
        contestado: use “Sinalizar problema” nas lições e acontecimentos.
      </p>

      <nav aria-label="Seções desta página" className="mt-6 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="chip">
            {s.label}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-14">
        <section aria-labelledby="politica-editorial" className="reading-measure">
          <H2 id="politica-editorial">Política editorial</H2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-body">
            <li>
              <strong>Explicar, nunca conduzir.</strong> As explicações não recomendam voto, partido, candidato, movimento ou corrente, mesmo quando alguém pede. Comparações usam os
              mesmos critérios, a mesma extensão e o mesmo peso visual para cada perspectiva, com a ordem de apresentação declarada.
            </li>
            <li>
              <strong>Somente fontes aprovadas.</strong> Toda afirmação verificável indica a fonte. Usamos órgãos públicos, instituições oficiais e publicações de instituições
              públicas cadastradas em uma lista de editores aprovados. Origem oficial não significa endosso nem garantia de neutralidade: cada fonte informa o que sustenta e seus
              limites.
            </li>
            <li>
              <strong>Categorias distintas.</strong> Separamos fato verificável, declaração de um ator, interpretação atribuída, projeção e efeito possível. Promessas e anúncios
              não são tratados como resultados.
            </li>
            <li>
              <strong>Impactos com mecanismo.</strong> Um impacto só é apresentado como documentado quando uma fonte aprovada o sustenta. Efeitos possíveis aparecem com o mecanismo,
              as condições e a indicação de que não foram comprovados.
            </li>
            <li>
              <strong>Lacunas declaradas.</strong> Quando o acervo não cobre um tema, a Polis registra a lacuna em vez de preencher com conhecimento não referenciado.
            </li>
            <li>
              <strong>Revisão humana.</strong> Lições e acontecimentos são revisados por administradores antes da publicação e mostram a data da última revisão. Sinalizações de
              erro entram na fila de revisão.
            </li>
          </ul>
        </section>

        <section aria-labelledby="fontes">
          <div className="reading-measure">
            <H2 id="fontes">Catálogo de fontes</H2>
            <p className="mt-3 text-body text-ink-soft">
              {catalog.length} editores aprovados e {totalSources} fontes aprovadas. Uma fonte só pode ser usada se o endereço pertencer exatamente a um domínio (e, quando
              necessário, a um caminho) do editor aprovado, com HTTPS. Para reutilização, seguimos a condição informada por cada fonte; quando ela não é informada, apenas
              referenciamos o material e citamos trechos curtos com atribuição.
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {catalog.map((publisher) => (
              <details key={publisher.id} className="surface-card p-4 md:p-5">
                <summary className="details-summary flex min-h-[44px] items-center justify-between gap-3">
                  <span>
                    <span className="font-semibold">{publisher.name}</span>
                    <span className="block text-meta text-ink-soft">
                      {publisher.category} · {publisher.sources.length} {publisher.sources.length === 1 ? "fonte" : "fontes"}
                    </span>
                  </span>
                  <Icon name="chevronDown" size={18} className="details-chevron flex-none" />
                </summary>
                <p className="mt-3 text-meta text-ink-soft">
                  Domínios aceitos: {publisher.hostnames.join(", ")}
                  {publisher.pathPrefixes.length ? ` (somente caminhos iniciados por ${publisher.pathPrefixes.join(", ")})` : ""}.
                  {publisher.notes ? ` ${publisher.notes}` : ""}
                </p>
                {publisher.sources.length ? (
                  <ul className="mt-3 flex flex-col divide-y divide-line-soft border-t border-line-soft">
                    {publisher.sources.map((source) => (
                      <li key={source.id} id={`fonte-${source.key}`} className="scroll-mt-24 py-3">
                        <a href={source.url} className="text-link font-semibold" rel="noopener noreferrer" target="_blank">
                          {source.title}
                          <span className="sr-only"> (abre em nova aba)</span>
                        </a>
                        <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-meta text-ink-soft">
                          <span>{MATERIAL_LABEL[source.materialType]}</span>
                          {source.author ? <span>{source.author}</span> : null}
                          {source.publishedOn ? <span>Publicação: {formatPartialDate(source.publishedOn)}</span> : null}
                          {source.sourceUpdatedOn ? <span>Atualização: {formatPartialDate(source.sourceUpdatedOn)}</span> : null}
                          <span>Consulta: {formatDate(source.accessedAt)}</span>
                        </p>
                        <p className="mt-1 text-meta">{source.scopeNote}</p>
                        <p className="mt-1 text-meta text-ink-soft">
                          <Badge tone="neutral">{REUSE_LABEL[source.reuseKind]}</Badge> {source.reuseCondition}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="questionario" className="reading-measure">
          <H2 id="questionario">Método do questionário</H2>
          <p className="mt-3 text-body">
            Versões em uso: banco de perguntas {QUESTION_BANK_VERSION}, cálculo {SCORING_VERSION}, perfis {PROFILES_VERSION}. O questionário é uma modelagem editorial da Polis,
            não um teste científico validado nem uma classificação oficial. A IA não participa do cálculo.
          </p>

          <h3 className="mt-6 text-h3 font-semibold">Dimensões e sobreposições</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {DIMENSIONS.map((d) => (
              <li key={d.key} className="surface-card p-4">
                <p className="font-semibold">
                  Bloco {d.block} · {d.title}
                </p>
                <p className="mt-1 text-meta">
                  Polo −1: {d.negativePole}. Polo +1: {d.positivePole}.
                </p>
                <p className="mt-1 text-meta text-ink-soft">Sobreposições: {d.overlaps}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-h3 font-semibold">Escala e cálculo</h3>
          <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-body">
            <li>
              Cada resposta tem um valor:{" "}
              {ANSWER_OPTIONS.filter((o) => CHOICE_VALUE[o.value] !== null)
                .map((o) => `${o.label} = ${CHOICE_VALUE[o.value]! > 0 ? "+" : ""}${n(CHOICE_VALUE[o.value]!)}`)
                .join("; ")}
              . “Não sei / preciso entender melhor” não é posição neutra: fica fora do cálculo.
            </li>
            <li>
              Cada situação tem uma direção (+1 quando concordar aproxima do polo +1; −1 no caso contrário) e um peso. Em cada dimensão há cinco situações em cada direção, para
              reduzir a tendência de concordar com tudo.
            </li>
            <li>Escore da dimensão = soma de (valor × direção × peso) ÷ (2 × soma dos pesos das respostas válidas). O resultado fica entre −1 e +1, com duas casas decimais.</li>
            <li>
              Uma dimensão precisa de pelo menos {MIN_VALID_PER_DIMENSION} respostas válidas (de 10). Com menos, ela aparece como insuficiente e não entra nas afinidades.
            </li>
            <li>
              Escores com valor absoluto menor que {n(INTERMEDIATE_THRESHOLD)} são descritos como intermediários. Quando há pelo menos duas respostas fortes ou moderadas em cada
              direção, mostramos “posições diferentes nestes temas”, sem tratar isso como erro.
            </li>
            <li>
              As afinidades só são calculadas com pelo menos {MIN_VALID_DIMENSIONS_FOR_AFFINITY} dimensões válidas. Para cada corrente, usamos apenas as dimensões em que ela tem
              faixa definida e você tem escore válido (mínimo de {MIN_OVERLAP_FOR_PROFILE}; abaixo de {FULL_COMPARISON_OVERLAP}, a comparação é marcada como limitada).
            </li>
            <li>
              Distância em cada dimensão = 0 se o seu escore está dentro da faixa da corrente; senão, a distância até a borda mais próxima. Índice de proximidade = 1 − (distância
              média ÷ 2), entre 0 e 1. Não é probabilidade, porcentagem de acerto nem diagnóstico.
            </li>
            <li>
              Faixas de leitura: proximidade alta a partir de {n(BAND_HIGH)}; moderada a partir de {n(BAND_MODERATE)}; baixa abaixo disso. As correntes mais próximas são as que
              ficam a até {n(CLOSEST_MARGIN)} do maior índice, se ele for pelo menos moderado. Índices iguais são exibidos como empate; para ordenar a trilha, vale a ordem editorial
              fixa dos perfis.
            </li>
            <li>Refazer o questionário substitui o resultado ativo. Não guardamos histórico de resultados anteriores.</li>
          </ol>

          <h3 className="mt-6 text-h3 font-semibold">As 50 situações</h3>
          <p className="mt-2 text-meta text-ink-soft">Direção e peso de cada item, para conferência.</p>
          <div className="mt-3 flex flex-col gap-2">
            {DIMENSIONS.map((d) => (
              <details key={d.key} className="surface-card p-4">
                <summary className="details-summary flex min-h-[44px] items-center justify-between font-semibold">
                  <span>{d.title}</span>
                  <Icon name="chevronDown" size={18} className="details-chevron" />
                </summary>
                <ol className="mt-3 flex flex-col divide-y divide-line-soft">
                  {QUESTIONS.filter((q) => q.dimension === d.key).map((q) => (
                    <li key={q.id} className="py-3 text-meta">
                      <p className="font-semibold text-ink">{q.title}</p>
                      <p className="mt-1">{q.statement}</p>
                      <p className="mt-1 text-ink-soft">
                        Concordar aproxima de “{(q.direction === 1 ? d.positivePole : d.negativePole).toLowerCase()}” · peso {n(q.weight)}
                      </p>
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="perfis">
          <div className="reading-measure">
            <H2 id="perfis">Perfis de referência</H2>
            <p className="mt-3 text-body">
              Cada corrente recebe uma faixa, e não um ponto, porque abriga variações. Uma dimensão fica sem faixa quando o acervo aprovado não sustenta uma posição
              característica. Indicamos se a faixa decorre diretamente da fonte ou de uma inferência editorial explicitada. Os perfis servem apenas para ordenar a trilha.
            </p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {REFERENCE_PROFILES.map((profile) => (
              <article key={profile.key} id={`perfil-${profile.key}`} className="surface-card scroll-mt-24 p-5 md:p-6">
                <h3 className="text-h3 font-semibold">{profile.name}</h3>
                <p className="mt-2 text-body">{profile.summary}</p>
                <p className="mt-2 text-meta text-ink-soft">
                  <strong className="text-ink">Interpretação adotada:</strong> {profile.interpretation}
                </p>
                <p className="mt-2 text-meta text-ink-soft">
                  <strong className="text-ink">Variações:</strong> {profile.variations}
                </p>
                <ul className="mt-4 flex flex-col gap-3 border-t border-line-soft pt-4">
                  {DIMENSIONS.map((d) => {
                    const range = profile.ranges[d.key as DimensionKey];
                    return (
                      <li key={d.key} className="text-meta">
                        <p className="font-semibold text-ink">
                          {DIMENSION_BY_KEY[d.key].shortTitle}:{" "}
                          {range ? `faixa de ${n(range.min)} a ${n(range.max)}` : <span className="font-normal text-ink-soft">sem faixa definida</span>}
                        </p>
                        {range ? (
                          <>
                            <p className="mt-0.5">
                              <Badge tone={range.support === "DIRECT" ? "mint" : "sand"}>{RANGE_SUPPORT_LABEL[range.support]}</Badge>
                            </p>
                            <p className="mt-1 text-ink-soft">{range.justification}</p>
                          </>
                        ) : (
                          <p className="mt-0.5 text-ink-soft">{profile.undefinedReasons[d.key as DimensionKey] ?? "Sem posição característica no acervo."}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 border-t border-line-soft pt-3 text-meta">
                  <span className="font-semibold">Fontes:</span>{" "}
                  {profile.sourceKeys.map((key, i) => (
                    <span key={key}>
                      {i > 0 ? "; " : ""}
                      <a href={`#fonte-${key}`} className="text-link">
                        {sourceTitle.get(key) ?? key}
                      </a>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="trilha" className="reading-measure">
          <H2 id="trilha">Ordem da trilha</H2>
          <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-body">
            <li>Todas as pessoas começam pelos mesmos fundamentos (política, Estado, Constituição, instituições, eleições e economia).</li>
            <li>
              Na trilha geral, as lições sobre correntes seguem a ordem editorial. Na trilha por afinidade, as lições das correntes mais próximas das suas respostas vêm primeiro
              (“Temas próximos”) e as demais seguem da mais próxima para a mais distante (“Outras perspectivas”).
            </li>
            <li>Depois vêm temas transversais, história e leitura crítica, iguais para todos.</li>
            <li>
              O resultado muda somente a ordem. Nenhuma lição, corrente ou fato é escondido, e o catálogo completo continua aberto. Cliques, leituras, quizzes e fóruns não alteram o
              resultado.
            </li>
            <li>XP é concedido uma única vez por atividade (leitura, compreensão e conclusão de módulo). Errar o exercício não tira pontos e você pode tentar de novo.</li>
          </ol>
        </section>

        <section aria-labelledby="ia" className="reading-measure">
          <H2 id="ia">Uso de inteligência artificial</H2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-body">
            <li>
              A IA (API da OpenAI, chamada apenas pelo servidor) é usada em dois pontos: responder dúvidas sobre uma lição ou um acontecimento, e preparar rascunhos de
              acontecimentos para revisão humana.
            </li>
            <li>
              Não enviamos nome, e-mail, identificadores de conta, respostas do questionário nem afinidades. A IA não decide o resultado do questionário nem a ordem da trilha.
            </li>
            <li>
              A IA recebe apenas o conteúdo publicado da página e trechos de fontes aprovadas, identificados por referências. Toda afirmação precisa apontar uma referência
              existente; referências inválidas, números ausentes das fontes e recomendações de voto ou de corrente bloqueiam ou removem a resposta.
            </li>
            <li>Textos de fontes e perguntas de usuários são tratados como dados, nunca como instruções. Respostas da IA são sempre identificadas como tal.</li>
            <li>Rascunhos de acontecimentos nunca são publicados automaticamente: uma pessoa administradora revisa fatos, fontes e linguagem antes de publicar.</li>
            <li>Há limite diário de perguntas por pessoa e limite geral. Se a IA estiver indisponível, lições, acontecimentos e trilhas continuam funcionando.</li>
            <li>
              A Polis mantém uma bateria de avaliação com pedidos de recomendação de voto, pessoas com posições opostas, alegações falsas, promessas sem resultado, ausência de
              evidência de impacto, fontes não aprovadas e documentos com instruções escondidas. Os resultados são revisados por pessoas antes de mudanças de modelo ou de instruções.
            </li>
          </ul>
        </section>

        <section aria-labelledby="lacunas" className="reading-measure">
          <H2 id="lacunas">Lacunas documentais conhecidas</H2>
          <p className="mt-3 text-body">
            O acervo oficial não cobre todos os temas com a mesma profundidade. Em vez de preencher lacunas com conteúdo sem referência, registramos o que falta:
          </p>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-body">
            {gapModules.map((m) => (
              <li key={m.title}>
                <strong>{m.title}:</strong> {m.gapNote}
              </li>
            ))}
            <li>Progressismo: nenhuma fonte aprovada define o termo; a lição de temas transversais registra essa ausência.</li>
            <li>Anarquismos: o acervo cobre a vertente apresentada por Bakunin e um estudo histórico brasileiro; outras vertentes não são descritas.</li>
            <li>Libertarianismos: o acervo não descreve a vertente que propõe eliminar o Estado.</li>
            <li>Ambientalismo e nacionalismo aparecem no acervo como temas de políticas públicas e de estudos históricos, não como correntes definidas.</li>
            <li>
              Documentos do Tribunal Superior Eleitoral só são cadastrados após conferência manual, porque o portal bloqueou a verificação automatizada durante a implementação.
            </li>
            <li>Vários livros e artigos do acervo não informam licença de reutilização; nesses casos apenas referenciamos e citamos trechos curtos.</li>
          </ul>
          <p className="mt-4 text-meta text-ink-soft">
            Encontrou um erro ou uma fonte inadequada? Use “Sinalizar problema” na página correspondente ou escreva nos{" "}
            <Link href="/comunidade" className="text-link">
              fóruns
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
