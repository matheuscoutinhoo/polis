import Link from "next/link";
import { AffinityList, DimensionScale, LEVEL_LABEL, joinList, proximityPoints } from "@/components/questionnaire/result-components";
import { Icon, type IconName } from "@/components/ui/icon";
import { formatDecimal } from "@/lib/format";
import { DIMENSION_BY_KEY } from "@/modules/diagnostic/dimensions";
import { PROFILE_BY_KEY, PROFILES_VERSION } from "@/modules/diagnostic/profiles";
import { BAND_MODERATE, MEANINGFUL_CHANGE, MIN_VALID_PER_DIMENSION, SCORING_VERSION, leanOf, type QuestionnaireResult } from "@/modules/diagnostic/scoring";

export function joinNames(keys: string[]) {
  return joinList(keys.map((k) => PROFILE_BY_KEY[k as keyof typeof PROFILE_BY_KEY]?.name ?? k));
}

/** The result in a few sentences: closest currents, marked inclinations, divided and insufficient dimensions. */
function ResultSummary({ result }: { result: QuestionnaireResult }) {
  const comparable = result.affinities.filter((a) => a.comparable && a.index !== null);
  const closest = comparable.filter((a) => result.closest.includes(a.key));
  const points = (index: number | null) => (index === null ? "—" : `${proximityPoints(index)}`);
  const marked = result.dimensions.flatMap((d) => {
    if (d.score === null || d.pattern === "MIXED") return [];
    const lean = leanOf(d.score);
    if (!lean.side || (lean.level !== "MODERATE" && lean.level !== "STRONG")) return [];
    const dimension = DIMENSION_BY_KEY[d.key];
    const pole = lean.side === "POSITIVE" ? dimension.positiveShort : dimension.negativeShort;
    return [`${LEVEL_LABEL[lean.level].replace("Inclinação ", "")} para “${pole}” (${dimension.shortTitle})`];
  });
  const divided = result.dimensions.filter((d) => d.pattern === "MIXED").map((d) => DIMENSION_BY_KEY[d.key].shortTitle);
  const insufficient = result.dimensions.filter((d) => d.status !== "OK").map((d) => DIMENSION_BY_KEY[d.key].shortTitle);

  return (
    <div className="mt-3 flex flex-col gap-3 text-reading">
      {result.affinityStatus !== "OK" ? (
        <p>
          Há respostas válidas suficientes em menos de duas dimensões, por isso não calculamos afinidades. A trilha segue a ordem geral; você pode refazer o questionário quando
          quiser.
        </p>
      ) : closest.length === 1 ? (
        <p>
          Suas respostas ficam mais próximas de <strong>{joinNames([closest[0].key])}</strong>: proximidade {points(closest[0].index)} de 100, dentro da faixa da corrente em{" "}
          {closest[0].dimensions.filter((d) => d.distance === 0).length} de {closest[0].dimensions.length} dimensões comparadas.
        </p>
      ) : closest.length > 1 ? (
        <p>
          Suas respostas ficam mais próximas de <strong>{joinNames(closest.map((a) => a.key))}</strong>, com proximidades muito parecidas (
          {joinList(closest.map((a) => points(a.index)))} de 100).
        </p>
      ) : comparable.length === 0 ? (
        <p>
          Nenhuma corrente de referência pôde ser comparada: as dimensões com respostas válidas suficientes não são as dimensões em que as correntes têm faixa definida. A trilha
          segue a ordem geral.
        </p>
      ) : (
        <p>
          Nenhuma corrente de referência ficou próxima das suas respostas: todas ficaram abaixo de {Math.round(BAND_MODERATE * 100)} de 100. As menos distantes foram{" "}
          {joinNames(comparable.slice(0, 2).map((a) => a.key))} ({joinList(comparable.slice(0, 2).map((a) => points(a.index)))} de 100).
        </p>
      )}
      <p>
        {marked.length
          ? `Inclinações mais marcadas: ${joinList(marked)}.`
          : "Nenhuma dimensão teve inclinação moderada ou forte: suas respostas ficaram mais perto do equilíbrio entre os polos."}
      </p>
      {divided.length ? <p>Posições divididas em {joinList(divided)}: respostas firmes nas duas direções, que se compensam.</p> : null}
      {insufficient.length ? (
        <p>
          Sem respostas válidas suficientes em {joinList(insufficient)}, {insufficient.length > 1 ? "que ficam" : "que fica"} fora das afinidades.
        </p>
      ) : null}
    </div>
  );
}

/** Summary, the five dimensions and the reference currents of one result. */
export function ResultReport({ result }: { result: QuestionnaireResult }) {
  const savedWith = [
    result.computedWithScoringVersion ? `a versão ${result.computedWithScoringVersion} do método` : "",
    result.computedWithProfilesVersion ? `a versão ${result.computedWithProfilesVersion} dos perfis` : "",
  ].filter(Boolean);
  return (
    <>
      <section aria-labelledby="sintese" className="mt-10 max-w-3xl">
        <h2 id="sintese" className="text-h2 font-semibold">
          Síntese
        </h2>
        <ResultSummary result={result} />
      </section>

      <section aria-labelledby="dimensoes" className="mt-10">
        <h2 id="dimensoes" className="text-h2 font-semibold">
          Cinco dimensões independentes
        </h2>
        <p className="mt-2 max-w-3xl text-body text-ink-soft">
          Cada dimensão é calculada separadamente. Os dois polos não são “certo” e “errado”, nem esquerda e direita: são ênfases diferentes diante de dilemas reais. Na escala, a
          faixa destacada mostra o nível da inclinação (intermediária, leve, moderada ou forte); abaixo dela, veja como suas respostas se dividiram.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {result.dimensions.map((dimension) => (
            <DimensionScale key={dimension.key} result={dimension} />
          ))}
        </div>
      </section>

      {result.affinityStatus === "OK" ? (
        <section aria-labelledby="correntes" className="mt-10 max-w-4xl">
          <h2 id="correntes" className="text-h2 font-semibold">
            Correntes de referência
          </h2>
          <p className="mt-2 text-body text-ink-soft">
            Cada corrente tem faixas de referência por dimensão, documentadas com fontes em{" "}
            <Link href="/fontes-e-metodo#perfis" className="text-link">
              Fontes e método
            </Link>
            . A ordem vai da mais próxima à mais distante das suas respostas. Todas as correntes continuam disponíveis no catálogo.
          </p>
          {savedWith.length ? (
            <p className="mt-3 flex items-start gap-2 rounded-card bg-blue px-4 py-3 text-meta text-ink">
              <Icon name="info" size={18} className="mt-0.5 flex-none text-blue-ink" />
              <span>
                Proximidades recalculadas com a versão atual do método ({SCORING_VERSION}) e dos perfis de referência ({PROFILES_VERSION}); este resultado foi salvo com{" "}
                {joinList(savedWith)}. Suas respostas e os escores das dimensões não mudam.
              </span>
            </p>
          ) : null}
          <div className="mt-5">
            <AffinityList affinities={result.affinities} />
          </div>
        </section>
      ) : null}
    </>
  );
}

const LIMITS: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "document", title: "Modelagem editorial", text: "As dimensões e as faixas das correntes são uma escolha documentada da Polis, não um teste validado." },
  {
    icon: "scale",
    title: "Resultado aproximado",
    text: `Com 10 situações por dimensão, diferenças menores que ${formatDecimal(MEANINGFUL_CHANGE, 1)} no escore não indicam uma mudança real de posição.`,
  },
  { icon: "info", title: "“Não sei” fica de fora", text: `Não conta como posição. Dimensões com menos de ${MIN_VALID_PER_DIMENSION} respostas válidas não entram nas afinidades.` },
  { icon: "layers", title: "Empate é empate", text: "Proximidades iguais aparecem empatadas; para ordenar a trilha, vale a ordem editorial fixa." },
  { icon: "lock", title: "Só suas respostas contam", text: "Leituras, cliques, exercícios e fóruns nunca alteram este resultado." },
];

/** What the result can and cannot say, as a panel of short, scannable limits. */
export function ResultLimits() {
  return (
    <section aria-labelledby="limites" className="rounded-panel bg-sand p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface text-sand-ink" aria-hidden="true">
          <Icon name="alert" size={20} />
        </span>
        <h3 id="limites" className="text-lead font-semibold">
          Limites deste resultado
        </h3>
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {LIMITS.map((item) => (
          <li key={item.title} className="flex items-start gap-3 rounded-card bg-surface p-3">
            <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-sand text-sand-ink" aria-hidden="true">
              <Icon name={item.icon} size={16} />
            </span>
            <span className="min-w-0">
              <span className="block text-meta font-semibold text-ink">{item.title}</span>
              <span className="block text-meta text-ink-soft">{item.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
