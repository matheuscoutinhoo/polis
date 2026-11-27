import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PathModeForm } from "@/components/questionnaire/path-mode-form";
import { ContinueFromPreview, PathPreviewProvider, TrailPreview, type NextLesson, type PathMode } from "@/components/questionnaire/path-preview";
import { ResultLimits, ResultReport } from "@/components/questionnaire/result-report";
import { DeleteResultButton, HistoryLink, ResultHeader } from "@/components/questionnaire/result-shell";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import { requireUser } from "@/lib/session";
import { startRetakeAction } from "@/modules/diagnostic/actions";
import { listResults } from "@/modules/diagnostic/service";
import { getLearningPathOptions } from "@/modules/learning/catalog";
import type { LearningPath } from "@/modules/learning/path";
import { getLearnerSummary } from "@/modules/learning/progress";

export const metadata: Metadata = { title: "Resultado do questionário", robots: { index: false } };

export default async function ResultPage() {
  const user = await requireUser("/questionario/resultado");
  const results = await listResults(user.id);
  const active = results[0];
  if (!active) redirect("/questionario");
  const { result } = active;
  const [paths, summary] = await Promise.all([getLearningPathOptions(result), getLearnerSummary(user.id)]);
  const completed = [...summary.progressByLesson].filter(([, progress]) => progress.completedAt).map(([lessonId]) => lessonId);
  const nextOf = (path: LearningPath | null): NextLesson | null => {
    const lesson = path?.ordered.find((l) => !summary.progressByLesson.get(l.id)?.completedAt);
    return lesson ? { id: lesson.id, href: `/aprender/${lesson.moduleSlug}/${lesson.slug}` } : null;
  };
  const next = { GENERAL: nextOf(paths.GENERAL), AFFINITY: nextOf(paths.AFFINITY) };
  const savedMode: PathMode = user.pathMode === "AFFINITY" && paths.AFFINITY ? "AFFINITY" : "GENERAL";

  return (
    <div className="page-frame py-8 md:py-12">
      <ResultHeader result={result} completedAt={active.completedAt} eyebrow={results.length > 1 ? "Resultado privado · o mais recente" : "Resultado privado"}>
        <Notice tone="info" className="mt-6 max-w-3xl">
          Este resultado é visível só para você e serve apenas para ordenar seus estudos. Não é um diagnóstico da sua identidade política, não tem precisão científica e não muda o
          conteúdo das lições.
        </Notice>
        {results.length > 1 ? (
          <div className="mt-3">
            <HistoryLink count={results.length} />
          </div>
        ) : null}
      </ResultHeader>

      <ResultReport result={result} />

      <PathPreviewProvider saved={savedMode}>
        <section aria-labelledby="trilha" className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <h2 id="trilha" className="text-h2 font-semibold">
              Sua trilha
            </h2>
            <p className="mt-2 text-body text-ink-soft">
              Os módulos na ordem em que você vai estudá-los. Os fundamentos são comuns a todas as pessoas; depois, as perspectivas seguem a ordem escolhida. Ao trocar a opção,
              a trilha mostra a nova ordem antes de você salvar.
            </p>
            <div className="surface-card mt-5 p-3 md:p-5">
              <h3 className="px-1 text-lead font-semibold">Escolha da trilha</h3>
              <div className="mt-3">
                <PathModeForm current={savedMode} affinityAvailable={paths.AFFINITY !== null} layout="row" />
              </div>
              <div className="mt-4 border-t border-line-soft pt-3">
                <TrailPreview paths={paths} completed={completed} next={next} />
              </div>
            </div>
            <ContinueFromPreview next={next} />
          </div>
          <aside className="flex flex-col gap-6">
            <ResultLimits />
            <div className="surface-card flex flex-col gap-3 p-5">
              <h3 className="text-lead font-semibold">Seus dados</h3>
              <p className="text-meta text-ink-soft">Refaça quando quiser: cada resultado fica guardado, só para você, para comparar depois.</p>
              <form action={startRetakeAction}>
                <SubmitButton variant="secondary" block pendingLabel="Preparando...">
                  Refazer questionário
                </SubmitButton>
              </form>
              <HistoryLink count={results.length} />
              <DeleteResultButton resultId={active.id} isOnly={results.length === 1} />
            </div>
          </aside>
        </section>
      </PathPreviewProvider>
    </div>
  );
}