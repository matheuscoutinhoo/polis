import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn, formatDecimal } from "@/lib/format";
import { DIMENSION_BY_KEY, type Dimension } from "@/modules/diagnostic/dimensions";
import { PROFILE_BY_KEY } from "@/modules/diagnostic/profiles";
import { QUESTION_BY_ID } from "@/modules/diagnostic/question-bank";
import { ANSWER_LABEL } from "@/modules/diagnostic/scale";
import {
  INTERMEDIATE_THRESHOLD,
  LEAN_MODERATE,
  LEAN_STRONG,
  MIN_VALID_PER_DIMENSION,
  PROXIMITY_ZERO_DISTANCE,
  answerBreakdown,
  leanOf,
  type AffinityBand,
  type AffinityResult,
  type AnswerBreakdown,
  type DimensionResult,
  type LeanLevel,
} from "@/modules/diagnostic/scoring";

/** Position of a −1..+1 value on a horizontal scale. */
export function scalePosition(value: number) {
  return `${Math.round(((Math.max(-1, Math.min(1, value)) + 1) / 2) * 1000) / 10}%`;
}

/** Number with its sign and a true minus sign; scores use two decimals, e.g. "+0,45" or "−0,20" (null: as is). */
export function signedScore(value: number, digits: number | null = 2) {
  if (value === 0) return "0";
  return `${value > 0 ? "+" : "−"}${formatDecimal(Math.abs(value), digits ?? undefined)}`;
}

/** Proximity on a 0 to 100 scale (it is computed from 0 to 1). */
export function proximityPoints(index: number) {
  return Math.round(index * 100);
}

export function joinList(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} e ${items.at(-1)}`;
}

export const LEVEL_LABEL: Record<LeanLevel, string> = {
  INTERMEDIATE: "Posição intermediária",
  LIGHT: "Inclinação leve",
  MODERATE: "Inclinação moderada",
  STRONG: "Inclinação forte",
};

/** The reading of a dimension in words: level and pole. */
export function leanText(result: DimensionResult, dimension: Dimension = DIMENSION_BY_KEY[result.key]): string {
  if (result.status !== "OK" || result.score === null) return "Respostas válidas insuficientes";
  if (result.pattern === "MIXED") return "Posições divididas";
  const lean = leanOf(result.score);
  if (!lean.side) return LEVEL_LABEL.INTERMEDIATE;
  const pole = lean.side === "POSITIVE" ? dimension.positivePole : dimension.negativePole;
  return `${LEVEL_LABEL[lean.level]} para “${pole.toLowerCase()}”`;
}

// Level limits on each side of the scale; the band of the current level is highlighted.
const LEVEL_LIMITS = [-LEAN_STRONG, -LEAN_MODERATE, -INTERMEDIATE_THRESHOLD, INTERMEDIATE_THRESHOLD, LEAN_MODERATE, LEAN_STRONG];
const LEVEL_SPAN: Record<LeanLevel, [number, number]> = {
  INTERMEDIATE: [-INTERMEDIATE_THRESHOLD, INTERMEDIATE_THRESHOLD],
  LIGHT: [INTERMEDIATE_THRESHOLD, LEAN_MODERATE],
  MODERATE: [LEAN_MODERATE, LEAN_STRONG],
  STRONG: [LEAN_STRONG, 1],
};

function levelBand(score: number): [number, number] {
  const lean = leanOf(score);
  const [from, to] = LEVEL_SPAN[lean.level];
  return lean.side === "NEGATIVE" ? [-to, -from] : [from, to];
}

function ScoreScale({ score, dimension }: { score: number; dimension: Dimension }) {
  const [from, to] = levelBand(score);
  return (
    <div>
      <div className="relative h-3 rounded-full bg-track" aria-hidden="true">
        <span className="absolute inset-y-0 rounded-full bg-action/25" style={{ left: scalePosition(from), width: `${((to - from) / 2) * 100}%` }} />
        {LEVEL_LIMITS.map((limit) => (
          <span key={limit} className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-surface" style={{ left: scalePosition(limit) }} />
        ))}
        <span
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-surface bg-ink shadow-[0_0_0_1px_var(--color-ink)]"
          style={{ left: scalePosition(score) }}
        />
      </div>
      <div className="mt-2 flex justify-between gap-4 text-meta text-ink-soft" aria-hidden="true">
        <span className="max-w-[45%]">{dimension.negativePole}</span>
        <span className="max-w-[45%] text-right">{dimension.positivePole}</span>
      </div>
      <p className="sr-only">
        Escore {signedScore(score)}, numa escala de −1 ({dimension.negativePole}) a +1 ({dimension.positivePole}).
      </p>
    </div>
  );
}

function AnswerSplit({ breakdown, dimension }: { breakdown: AnswerBreakdown; dimension: Dimension }) {
  const parts = [
    { key: "negative", count: breakdown.towardNegative, label: `para “${dimension.negativeShort}”`, bar: "bg-ink/70" },
    { key: "neutral", count: breakdown.neutral, label: breakdown.neutral === 1 ? "neutra" : "neutras", bar: "bg-control/45" },
    { key: "positive", count: breakdown.towardPositive, label: `para “${dimension.positiveShort}”`, bar: "bg-ink/70" },
  ];
  const outside = breakdown.unknown + breakdown.missing;
  return (
    <div>
      <p className="text-meta font-semibold text-ink">Como suas respostas se dividiram</p>
      <div className="mt-2 flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-track" aria-hidden="true">
        {parts
          .filter((part) => part.count > 0)
          .map((part) => (
            <span key={part.key} className={cn("h-full basis-0", part.bar)} style={{ flexGrow: part.count }} />
          ))}
      </div>
      <ul className="mt-2 grid grid-cols-3 gap-2 text-meta">
        {parts.map((part, index) => (
          <li key={part.key} className={cn(index === 1 && "text-center", index === 2 && "text-right")}>
            <span className="block text-lead font-semibold tabular-nums text-ink">{part.count}</span>
            <span className="block text-ink-soft">{part.label}</span>
          </li>
        ))}
      </ul>
      {outside ? (
        <p className="mt-1 text-meta text-ink-soft">
          {[breakdown.unknown ? `${breakdown.unknown} “Não sei”` : "", breakdown.missing ? `${breakdown.missing} sem resposta` : ""].filter(Boolean).join(" e ")}{" "}
          {outside === 1 ? "fica" : "ficam"} fora do cálculo.
        </p>
      ) : null}
    </div>
  );
}

function AnswerDetails({ result, dimension }: { result: DimensionResult; dimension: Dimension }) {
  const groups = [
    { title: `Para “${dimension.negativeShort}”`, items: result.contributions.filter((c) => c.directed !== null && c.directed < 0) },
    { title: "Neutras", items: result.contributions.filter((c) => c.directed === 0) },
    { title: `Para “${dimension.positiveShort}”`, items: result.contributions.filter((c) => c.directed !== null && c.directed > 0) },
    { title: "Fora do cálculo", items: result.contributions.filter((c) => c.directed === null) },
  ].filter((group) => group.items.length > 0);
  const valid = result.contributions.filter((c) => c.directed !== null);
  const weightOf = (id: string) => QUESTION_BY_ID.get(id)?.weight ?? 1;
  const sum = valid.reduce((total, c) => total + (c.directed ?? 0) * weightOf(c.questionId), 0);
  const max = valid.reduce((total, c) => total + 2 * weightOf(c.questionId), 0);
  return (
    <details className="border-t border-line-soft pt-3">
      <summary className="details-summary flex min-h-[44px] items-center justify-between font-semibold text-action">
        <span>Ver cada resposta e o cálculo</span>
        <Icon name="chevronDown" size={18} className="details-chevron" />
      </summary>
      <div className="mt-2 flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-label font-semibold uppercase tracking-wider text-ink-soft">
              {group.title} · {group.items.length}
            </p>
            <ul className="mt-1 flex flex-col divide-y divide-line-soft text-meta">
              {group.items.map((c) => (
                <li key={c.questionId} className="py-2">
                  <p className="font-semibold">{QUESTION_BY_ID.get(c.questionId)?.title ?? "Situação"}</p>
                  <p className="text-ink-soft">{c.choice ? ANSWER_LABEL[c.choice] : "Sem resposta"}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {result.score !== null && max > 0 ? (
          <p className="rounded-card bg-paper px-3 py-2 text-meta text-ink-soft">
            Cada resposta vale de −2 a +2 no sentido da situação. Soma das {valid.length} respostas válidas: <strong className="text-ink">{signedScore(sum, null)}</strong>, de um
            máximo de ±{formatDecimal(max)}. Escore: {signedScore(sum, null)} ÷ {formatDecimal(max)} = <strong className="text-ink">{signedScore(result.score)}</strong>, numa escala de −1 a +1.
          </p>
        ) : null}
      </div>
    </details>
  );
}

/**
 * One dimension: the level in words, the position on a neutral scale, how the answers split and each answer.
 * The card spans five rows of the parent grid (subgrid), so each part lines up with the card beside it.
 */
export function DimensionScale({ result }: { result: DimensionResult }) {
  const dimension = DIMENSION_BY_KEY[result.key];
  return (
    <article className="surface-card row-span-5 grid grid-rows-subgrid gap-y-4 p-5 md:p-6" aria-labelledby={`dim-${result.key}`}>
      <div>
        <h3 id={`dim-${result.key}`} className="text-h3 font-semibold">
          {dimension.title}
        </h3>
        <Badge tone={result.status === "OK" ? "mint" : "warning"} className="mt-2">
          {result.validCount} de {result.total} respostas válidas
        </Badge>
      </div>
      <p className="text-lead font-semibold text-ink">{leanText(result, dimension)}</p>
      {result.status === "OK" && result.score !== null ? (
        <ScoreScale score={result.score} dimension={dimension} />
      ) : (
        <p className="text-body">Com menos de {MIN_VALID_PER_DIMENSION} respostas válidas, esta dimensão não entra no cálculo das afinidades.</p>
      )}
      <div>
        <AnswerSplit breakdown={answerBreakdown(result)} dimension={dimension} />
        {result.tension ? (
          <p className="mt-4 rounded-card bg-sand px-4 py-3 text-meta">
            <span className="font-semibold text-sand-ink">Respostas firmes nas duas direções.</span> {result.tension.towardPositive.length} respostas moderadas ou
            fortes foram para “{dimension.positiveShort}” e {result.tension.towardNegative.length} para “{dimension.negativeShort}”. Combinar posições em temas diferentes é
            comum e não indica erro.
          </p>
        ) : null}
      </div>
      <AnswerDetails result={result} dimension={dimension} />
    </article>
  );
}

export const BAND_LABEL: Record<AffinityBand, string> = { HIGH: "Proximidade alta", MODERATE: "Proximidade moderada", LOW: "Proximidade baixa" };

function RangeRow({ compared, inference }: { compared: AffinityResult["dimensions"][number]; inference: boolean }) {
  const dimension = DIMENSION_BY_KEY[compared.key];
  return (
    <li>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-meta">
        <span className="font-semibold text-ink">{dimension.shortTitle}</span>
        <span className="text-ink-soft">
          {compared.distance === 0 ? "dentro da faixa" : `a ${formatDecimal(compared.distance, 2)} da faixa`} ·{" "}
          <span className="tabular-nums">{proximityPoints(compared.proximity)}</span>
        </span>
      </div>
      <div className="relative mt-2 h-2 rounded-full bg-track" aria-hidden="true">
        <span
          className="absolute inset-y-0 rounded-full bg-action/35"
          style={{ left: scalePosition(compared.min), width: `${Math.max(1, ((compared.max - compared.min) / 2) * 100)}%` }}
        />
        <span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-ink"
          style={{ left: scalePosition(compared.userScore) }}
        />
      </div>
      <div className="mt-1 flex justify-between gap-3 text-label text-ink-soft" aria-hidden="true">
        <span>{dimension.negativeShort}</span>
        <span>{dimension.positiveShort}</span>
      </div>
      <p className="sr-only">
        Seu escore {signedScore(compared.userScore)}; faixa da corrente de {signedScore(compared.min)} a {signedScore(compared.max)}.
      </p>
      {inference ? <p className="mt-1 text-label text-ink-soft">Faixa baseada em inferência editorial explicitada.</p> : null}
    </li>
  );
}

/** Reference currents, from the closest to the most distant, with the comparison in each dimension. */
export function AffinityList({ affinities }: { affinities: AffinityResult[] }) {
  const pointsPerTenth = Math.round(10 / PROXIMITY_ZERO_DISTANCE);
  return (
    <ol className="flex flex-col gap-3">
      {affinities.map((affinity) => {
        const profile = PROFILE_BY_KEY[affinity.key];
        if (!profile) return null;
        const points = affinity.comparable && affinity.index !== null ? proximityPoints(affinity.index) : null;
        const inside = affinity.dimensions.filter((d) => d.distance === 0).length;
        return (
          <li key={affinity.key} className="surface-card p-5" aria-labelledby={`corrente-${affinity.key}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 id={`corrente-${affinity.key}`} className="text-lead font-semibold">
                {profile.name}
              </h3>
              <p className="text-meta font-semibold text-ink">
                {points !== null && affinity.band ? (
                  <>
                    {BAND_LABEL[affinity.band]} · <span className="tabular-nums">{points} de 100</span>
                  </>
                ) : (
                  "Comparação indisponível"
                )}
                {affinity.tiedWith.length ? " · empate" : ""}
              </p>
            </div>
            {points !== null ? (
              <>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-track" aria-hidden="true">
                  <span className="block h-full rounded-full bg-action" style={{ width: `${points}%` }} />
                </div>
                <p className="mt-2 text-meta text-ink-soft">
                  Dentro da faixa da corrente em {inside} de {affinity.dimensions.length} dimensões comparadas
                  {affinity.limited ? " (comparação limitada: a corrente tem faixa definida em poucas dimensões)" : ""}.
                </p>
                <details className="mt-1">
                  <summary className="details-summary flex min-h-[44px] items-center justify-between font-semibold text-action">
                    <span>Ver a comparação por dimensão</span>
                    <Icon name="chevronDown" size={18} className="details-chevron" />
                  </summary>
                  <p className="mt-1 text-meta text-ink-soft">{profile.summary}</p>
                  <ul className="mt-4 flex flex-col gap-4">
                    {affinity.dimensions.map((compared) => (
                      <RangeRow key={compared.key} compared={compared} inference={profile.ranges[compared.key]?.support === "EDITORIAL_INFERENCE"} />
                    ))}
                  </ul>
                  <p className="mt-4 text-meta text-ink-soft">
                    Em cada dimensão, a proximidade é 100 quando o seu escore está dentro da faixa da corrente e cai {pointsPerTenth} pontos a cada 0,1 de distância. A
                    proximidade com a corrente é a média das dimensões comparadas. Não é probabilidade nem medida de precisão.
                  </p>
                  <p className="mt-2 text-meta">
                    <Link className="text-link" href={`/fontes-e-metodo#perfil-${affinity.key}`}>
                      Ver justificativas e fontes desta corrente
                    </Link>
                  </p>
                </details>
              </>
            ) : (
              <p className="mt-2 text-meta text-ink-soft">Há menos de duas dimensões válidas em que esta corrente tem posição de referência definida.</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
