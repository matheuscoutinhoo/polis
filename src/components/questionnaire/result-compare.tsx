import { DIMENSION_BY_KEY } from "@/modules/diagnostic/dimensions";
import { PROFILE_BY_KEY, REFERENCE_PROFILES } from "@/modules/diagnostic/profiles";
import type { QuestionnaireResult } from "@/modules/diagnostic/scoring";
import { cn, formatDateTime, formatDecimal } from "@/lib/format";

export type ComparedResult = { completedAt: Date; result: QuestionnaireResult };

function position(score: number) {
  return `${Math.round(((score + 1) / 2) * 100)}%`;
}

function signed(value: number) {
  if (value === 0) return "0";
  return `${value > 0 ? "+" : "−"}${formatDecimal(Math.abs(value), 2)}`;
}

/** Legend shared by the comparison views: hollow marker = earlier, filled = later. */
export function CompareLegend({ earlier, later }: { earlier: ComparedResult; later: ComparedResult }) {
  return (
    <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-meta text-ink-soft">
      <span className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border-2 border-control bg-surface" />
        Antes: {formatDateTime(earlier.completedAt)}
      </span>
      <span className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full bg-ink" />
        Depois: {formatDateTime(later.completedAt)}
      </span>
    </p>
  );
}

/** Both scores of each dimension on the same neutral scale, with the change between them. */
export function DimensionCompare({ earlier, later }: { earlier: ComparedResult; later: ComparedResult }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {later.result.dimensions.map((dimension) => {
        const meta = DIMENSION_BY_KEY[dimension.key];
        const before = earlier.result.dimensions.find((d) => d.key === dimension.key)?.score ?? null;
        const after = dimension.score;
        const change = before !== null && after !== null ? Math.round((after - before) * 100) / 100 : null;
        return (
          <article key={dimension.key} className="surface-card p-5" aria-labelledby={`cmp-${dimension.key}`}>
            <h3 id={`cmp-${dimension.key}`} className="text-lead font-semibold">
              {meta.title}
            </h3>
            <div className="mt-5" aria-hidden="true">
              <div className="relative h-2 rounded-full bg-track">
                <span className="absolute top-1/2 h-4 w-px -translate-y-1/2 bg-control" style={{ left: "50%" }} />
                {before !== null && after !== null && before !== after ? (
                  <span
                    className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-action/50"
                    style={{ left: position(Math.min(before, after)), width: `${Math.round((Math.abs(after - before) / 2) * 100)}%` }}
                  />
                ) : null}
                {before !== null ? (
                  <span className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-control bg-surface" style={{ left: position(before) }} />
                ) : null}
                {after !== null ? (
                  <span
                    className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-surface bg-ink shadow-[0_0_0_1px_var(--color-ink)]"
                    style={{ left: position(after) }}
                  />
                ) : null}
              </div>
              <div className="mt-2 flex justify-between gap-4 text-meta text-ink-soft">
                <span className="max-w-[45%]">{meta.negativePole}</span>
                <span className="max-w-[45%] text-right">{meta.positivePole}</span>
              </div>
            </div>
            <p className="mt-4 text-meta">
              Antes: {before !== null ? formatDecimal(before, 2) : "respostas válidas insuficientes"} · Depois: {after !== null ? formatDecimal(after, 2) : "respostas válidas insuficientes"}
            </p>
            <p className="mt-1 text-meta font-semibold">
              {change === null
                ? "Sem comparação nesta dimensão."
                : change === 0
                  ? "Sem mudança."
                  : `Mudança de ${signed(change)}, na direção de “${(change > 0 ? meta.positivePole : meta.negativePole).toLowerCase()}”.`}
            </p>
          </article>
        );
      })}
    </div>
  );
}

/** Proximity index of each reference current in both results (current profiles). */
export function AffinityCompare({ earlier, later }: { earlier: ComparedResult; later: ComparedResult }) {
  const indexOf = (item: ComparedResult, key: string) => item.result.affinities.find((a) => a.key === key && a.comparable)?.index ?? null;
  return (
    <div className="surface-card overflow-x-auto p-2 md:p-4">
      <table className="w-full text-left text-meta">
        <caption className="sr-only">Índice de proximidade de cada corrente, antes e depois</caption>
        <thead>
          <tr className="border-b border-line-soft text-ink-soft">
            <th scope="col" className="px-2 py-2 font-semibold sm:px-3">
              Corrente
            </th>
            <th scope="col" className="px-2 py-2 text-right font-semibold sm:px-3">
              Antes
            </th>
            <th scope="col" className="px-2 py-2 text-right font-semibold sm:px-3">
              Depois
            </th>
            <th scope="col" className="px-2 py-2 text-right font-semibold sm:px-3">
              Mudança
            </th>
          </tr>
        </thead>
        <tbody>
          {REFERENCE_PROFILES.map((profile) => {
            const before = indexOf(earlier, profile.key);
            const after = indexOf(later, profile.key);
            const change = before !== null && after !== null ? Math.round((after - before) * 100) / 100 : null;
            const closest = later.result.closest.includes(profile.key);
            return (
              <tr key={profile.key} className="border-b border-line-soft last:border-0">
                <th scope="row" className={cn("px-2 py-2.5 font-normal sm:px-3", closest && "font-semibold")}>
                  {PROFILE_BY_KEY[profile.key].name}
                  {closest ? <span className="mt-1 block w-fit rounded-[6px] bg-mint px-1.5 py-0.5 text-label font-semibold text-action">mais próxima depois</span> : null}
                </th>
                <td className="px-2 py-2.5 text-right tabular-nums sm:px-3">{before !== null ? formatDecimal(before, 2) : "—"}</td>
                <td className="px-2 py-2.5 text-right tabular-nums sm:px-3">{after !== null ? formatDecimal(after, 2) : "—"}</td>
                <td className={cn("px-2 py-2.5 text-right tabular-nums sm:px-3", change ? "font-semibold" : "text-ink-soft")}>{change !== null ? signed(change) : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="px-2 pt-2 pb-1 text-meta text-ink-soft sm:px-3">
        Índice de 0 a 1, calculado com a versão atual dos perfis de referência para os dois resultados. “—” indica comparação indisponível.
      </p>
    </div>
  );
}
