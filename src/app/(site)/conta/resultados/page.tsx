import type { Metadata } from "next";
import Link from "next/link";
import { AffinityCompare, CompareLegend, DimensionCompare } from "@/components/questionnaire/result-compare";
import { joinNames } from "@/components/questionnaire/result-report";
import { DeleteResultButton } from "@/components/questionnaire/result-shell";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import { EmptyState } from "@/components/ui/topic";
import { formatDateTime } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { startRetakeAction } from "@/modules/diagnostic/actions";
import { listResults, type StoredResult } from "@/modules/diagnostic/service";

export const metadata: Metadata = { title: "Resultados do questionário", robots: { index: false } };

function closestText(item: StoredResult) {
  const { result } = item;
  if (result.affinityStatus !== "OK") return "Sem afinidades calculadas (poucas respostas válidas).";
  if (result.closest.length) return `Mais próximas: ${joinNames(result.closest)}.`;
  return "Sem aproximação forte com as correntes de referência.";
}

export default async function ResultsHistoryPage({ searchParams }: { searchParams: Promise<{ a?: string; b?: string; aviso?: string }> }) {
  const user = await requireUser("/conta/resultados");
  const params = await searchParams;
  const results = await listResults(user.id);

  const first = results.find((r) => r.id === params.a) ?? results[0];
  const second = results.find((r) => r.id === params.b && r.id !== first?.id) ?? results.find((r) => r.id !== first?.id);
  // Changes always read from the earlier result to the later one.
  const pair = first && second ? [first, second].sort((x, y) => x.completedAt.getTime() - y.completedAt.getTime()) : null;

  return (
    <div className="page-frame py-8 md:py-12">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/conta" className="text-link">
          Sua conta
        </Link>{" "}
        / Resultados do questionário
      </nav>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">Seus resultados</h1>
      <p className="mt-2 max-w-3xl text-lead text-ink-soft">
        Cada vez que você refaz o questionário, o resultado fica guardado aqui, visível só para você. O mais recente ordena a trilha; os anteriores servem para comparar.
      </p>

      {params.aviso === "resultado-apagado" ? (
        <Notice tone="success" className="mt-6" role="status">
          Resultado apagado.{results.length ? "" : " Para voltar a usar lições, acontecimentos e fóruns, responda ao questionário de novo."}
        </Notice>
      ) : null}

      {results.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon="layers"
            title="Nenhum resultado guardado"
            action={
              <Link href="/questionario" className="btn btn-primary">
                Responder ao questionário <Icon name="arrowRight" size={18} />
              </Link>
            }
          >
            Responda ao questionário para ordenar sua trilha. Os próximos resultados aparecem aqui para comparação.
          </EmptyState>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <section aria-labelledby="historico" className="flex flex-col gap-4 self-start">
            <h2 id="historico" className="text-h3 font-semibold">
              Histórico
            </h2>
            <ol className="flex flex-col gap-3">
              {results.map((item) => (
                <li key={item.id} className="surface-card p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{formatDateTime(item.completedAt)}</p>
                    {item.active ? <Badge tone="mint">Ordena a trilha</Badge> : <Badge tone="neutral">Anterior</Badge>}
                  </div>
                  <p className="mt-1 text-meta text-ink-soft">{closestText(item)}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4">
                    <Link
                      href={item.active ? "/questionario/resultado" : `/questionario/resultado/${item.id}`}
                      className="text-link inline-flex min-h-[44px] items-center gap-1.5 font-semibold"
                    >
                      Ver detalhes <Icon name="arrowRight" size={16} />
                    </Link>
                    <DeleteResultButton resultId={item.id} isOnly={results.length === 1} label="Apagar" />
                  </div>
                </li>
              ))}
            </ol>
            <form action={startRetakeAction}>
              <SubmitButton variant="secondary" block pendingLabel="Preparando...">
                Refazer questionário
              </SubmitButton>
            </form>
          </section>

          <section aria-labelledby="comparar" className="min-w-0">
            <h2 id="comparar" className="text-h3 font-semibold">
              Comparar dois resultados
            </h2>
            {pair ? (
              <>
                <form method="get" className="surface-card mt-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
                  <label className="flex min-w-0 flex-1 flex-col gap-1 text-meta font-semibold">
                    Resultado
                    <select name="a" defaultValue={first?.id} className="field-input">
                      {results.map((item) => (
                        <option key={item.id} value={item.id}>
                          {formatDateTime(item.completedAt)}
                          {item.active ? " (mais recente)" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-0 flex-1 flex-col gap-1 text-meta font-semibold">
                    Comparar com
                    <select name="b" defaultValue={second?.id} className="field-input">
                      {results.map((item) => (
                        <option key={item.id} value={item.id}>
                          {formatDateTime(item.completedAt)}
                          {item.active ? " (mais recente)" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="submit" className="btn btn-secondary">
                    Comparar
                  </button>
                </form>
                {params.a && params.a === params.b ? (
                  <Notice tone="info" className="mt-4" role="status">
                    Escolha dois resultados diferentes. Mostramos a comparação com outro resultado do histórico.
                  </Notice>
                ) : null}
                <div className="mt-6">
                  <CompareLegend earlier={pair[0]} later={pair[1]} />
                </div>
                <h3 className="mt-6 text-lead font-semibold">Dimensões</h3>
                <p className="mt-1 text-meta text-ink-soft">Os escores vão de −1 a +1. Mudanças pequenas são comuns quando as mesmas situações são respondidas de novo.</p>
                <div className="mt-4">
                  <DimensionCompare earlier={pair[0]} later={pair[1]} />
                </div>
                <h3 className="mt-8 text-lead font-semibold">Correntes de referência</h3>
                <div className="mt-4">
                  <AffinityCompare earlier={pair[0]} later={pair[1]} />
                </div>
              </>
            ) : (
              <div className="mt-4">
                <EmptyState icon="scale" title="Ainda não há o que comparar">
                  A comparação aparece quando houver pelo menos dois resultados. Refaça o questionário quando quiser: o resultado atual continua guardado.
                </EmptyState>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
