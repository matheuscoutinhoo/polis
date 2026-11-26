import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { DIMENSION_BY_KEY, type DimensionKey } from "@/modules/diagnostic/dimensions";
import { PROFILE_BY_KEY, type CurrentKey } from "@/modules/diagnostic/profiles";
import { QUESTION_BY_ID } from "@/modules/diagnostic/question-bank";
import { ANSWER_LABEL } from "@/modules/diagnostic/scale";
import type { AffinityResult, DimensionResult } from "@/modules/diagnostic/scoring";
import { formatDecimal } from "@/lib/format";

function position(score: number) {
  return `${Math.round(((score + 1) / 2) * 100)}%`;
}

const PATTERN_TEXT: Record<string, (d: { negativePole: string; positivePole: string }) => string> = {
  NEGATIVE: (d) => `Suas respostas se aproximam do polo “${d.negativePole.toLowerCase()}”.`,
  POSITIVE: (d) => `Suas respostas se aproximam do polo “${d.positivePole.toLowerCase()}”.`,
  INTERMEDIATE: () => "Suas respostas ficaram em uma posição intermediária, sem inclinação marcada.",
  MIXED: () => "Você apresentou posições diferentes nesta dimensão: algumas respostas apontam para um polo, outras para o outro.",
};

/** One dimension on a neutral scale. Both poles share the same visual treatment. */
export function DimensionScale({ result }: { result: DimensionResult }) {
  const dimension = DIMENSION_BY_KEY[result.key as DimensionKey];
  return (
    <article className="surface-card p-5 md:p-6" aria-labelledby={`dim-${result.key}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 id={`dim-${result.key}`} className="text-h3 font-semibold">
          {dimension.title}
        </h3>
        <Badge tone={result.status === "OK" ? "mint" : "warning"}>
          {result.validCount} de {result.total} respostas válidas
        </Badge>
      </div>
      {result.status === "OK" && result.score !== null ? (
        <>
          <div className="mt-5" aria-hidden="true">
            <div className="relative h-2 rounded-full bg-track">
              <span className="absolute top-1/2 h-4 w-px -translate-y-1/2 bg-control" style={{ left: "50%" }} />
              <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-surface bg-ink shadow-[0_0_0_1px_var(--color-ink)]" style={{ left: position(result.score) }} />
            </div>
            <div className="mt-2 flex justify-between gap-4 text-meta text-ink-soft">
              <span className="max-w-[45%]">{dimension.negativePole}</span>
              <span className="max-w-[45%] text-right">{dimension.positivePole}</span>
            </div>
          </div>
          <p className="mt-4 text-body">
            {PATTERN_TEXT[result.pattern ?? "INTERMEDIATE"](dimension)} <span className="text-ink-soft">(escore {formatDecimal(result.score, 2)} numa escala de −1 a +1)</span>
          </p>
        </>
      ) : (
        <p className="mt-4 text-body">
          Respostas válidas insuficientes nesta dimensão (mínimo de 6). Ela não entra no cálculo das afinidades. {result.unknownCount ? `Você marcou “Não sei” em ${result.unknownCount} situações.` : ""}
        </p>
      )}
      {result.tension ? (
        <div className="mt-4 rounded-card bg-sand p-4 text-meta">
          <p className="font-semibold text-sand-ink">Posições diferentes nestes temas</p>
          <p className="mt-1">
            Na direção de “{dimension.positivePole.toLowerCase()}”: {result.tension.towardPositive.map((id) => QUESTION_BY_ID.get(id)?.title).join("; ")}.
          </p>
          <p className="mt-1">
            Na direção de “{dimension.negativePole.toLowerCase()}”: {result.tension.towardNegative.map((id) => QUESTION_BY_ID.get(id)?.title).join("; ")}.
          </p>
          <p className="mt-1 text-ink-soft">Combinar posições em temas diferentes é comum e não indica erro.</p>
        </div>
      ) : null}
      <details className="mt-4 border-t border-line-soft pt-3">
        <summary className="details-summary flex min-h-[44px] items-center justify-between font-semibold text-action">
          <span>Ver como cada resposta contribuiu</span>
          <Icon name="chevronDown" size={18} className="details-chevron" />
        </summary>
        <ul className="mt-2 flex flex-col divide-y divide-line-soft text-meta">
          {result.contributions.map((c) => {
            const question = QUESTION_BY_ID.get(c.questionId);
            const direction = c.directed === null ? "fora do cálculo" : c.directed === 0 ? "neutra" : c.directed > 0 ? `→ ${dimension.positivePole.toLowerCase()} (${c.directed > 1 ? "forte" : "moderada"})` : `→ ${dimension.negativePole.toLowerCase()} (${c.directed < -1 ? "forte" : "moderada"})`;
            return (
              <li key={c.questionId} className="py-2">
                <p className="font-semibold">{question?.title}</p>
                <p className="text-ink-soft">
                  {c.choice ? ANSWER_LABEL[c.choice] : "Sem resposta"} · {direction}
                </p>
              </li>
            );
          })}
        </ul>
      </details>
    </article>
  );
}

const BAND_LABEL = { HIGH: "Proximidade alta", MODERATE: "Proximidade moderada", LOW: "Proximidade baixa" } as const;

export function AffinityList({ affinities }: { affinities: AffinityResult[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {affinities.map((affinity) => {
        const profile = PROFILE_BY_KEY[affinity.key as CurrentKey];
        if (!profile) return null;
        return (
          <li key={affinity.key} className="surface-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lead font-semibold">{profile.name}</h3>
              <span className="text-meta font-semibold text-ink">
                {affinity.comparable && affinity.band ? BAND_LABEL[affinity.band] : "Comparação indisponível"}
                {affinity.tiedWith.length ? " · empate" : ""}
              </span>
            </div>
            <p className="mt-1 text-meta text-ink-soft">{profile.summary}</p>
            {affinity.comparable ? (
              <details className="mt-3">
                <summary className="details-summary flex min-h-[44px] items-center justify-between font-semibold text-action">
                  <span>Como calculamos</span>
                  <Icon name="chevronDown" size={18} className="details-chevron" />
                </summary>
                <p className="mt-2 text-meta text-ink-soft">
                  Índice de proximidade {affinity.index !== null ? formatDecimal(affinity.index, 2) : "—"} (escala de 0 a 1), calculado pela distância entre seus escores e as faixas de referência
                  da corrente nas dimensões abaixo. Não é probabilidade nem medida de precisão.
                  {affinity.limited ? " Comparação limitada: a corrente tem posição de referência em poucas dimensões válidas." : ""}
                </p>
                <ul className="mt-2 flex flex-col gap-1 text-meta">
                  {affinity.dimensions.map((d) => (
                    <li key={d.key}>
                      <span className="font-semibold">{DIMENSION_BY_KEY[d.key].shortTitle}:</span> seu escore {formatDecimal(d.userScore, 2)}; faixa de referência de{" "}
                      {formatDecimal(d.min, 1)} a {formatDecimal(d.max, 1)}; {d.distance === 0 ? "dentro da faixa" : `distância ${formatDecimal(d.distance, 2)}`}
                      {profile.ranges[d.key]?.support === "EDITORIAL_INFERENCE" ? " (faixa baseada em inferência editorial)" : ""}.
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-meta">
                  <a className="text-link" href={`/fontes-e-metodo#perfil-${affinity.key}`}>
                    Ver justificativas e fontes desta corrente
                  </a>
                </p>
              </details>
            ) : (
              <p className="mt-2 text-meta text-ink-soft">Há menos de duas dimensões válidas em que esta corrente tem posição de referência definida.</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
