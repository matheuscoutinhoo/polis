import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/format";
import { STAGE_LABEL, type LearningPath } from "@/modules/learning/path";

type Progress = Map<string, { completedAt: Date | null; readAt: Date | null }>;

/** Learning path with readable stages; the next lesson stays easy to see. */
export function LearningPathView({ path, progress, nextLessonId, compact }: { path: LearningPath; progress: Progress; nextLessonId: string | null; compact?: boolean }) {
  return (
    <ol className="flex flex-col gap-2">
      {path.steps.map((step, stepIndex) => {
        const done = step.lessons.every((l) => progress.get(l.id)?.completedAt);
        const label = STAGE_LABEL[step.stage];
        return (
          <li key={step.stage} className="surface-card p-4 md:p-5">
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "flex h-10 w-10 flex-none items-center justify-center rounded-[10px] text-meta font-semibold",
                  done ? "bg-selected text-action" : step.lessons.some((l) => l.id === nextLessonId) ? "bg-action text-white" : "bg-mint text-action",
                )}
                aria-hidden="true"
              >
                {done ? <Icon name="check" size={20} /> : String(stepIndex + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lead font-semibold">
                  {label.title}
                  {done ? <span className="sr-only"> (concluído)</span> : null}
                </h3>
                <p className="text-meta text-ink-soft">{label.description}</p>
                {!compact ? (
                  <ul className="mt-3 flex flex-col divide-y divide-line-soft">
                    {step.lessons.map((lesson) => {
                      const state = progress.get(lesson.id);
                      const isNext = lesson.id === nextLessonId;
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/aprender/${lesson.moduleSlug}/${lesson.slug}`}
                            className="group flex min-h-[48px] items-center gap-3 rounded-control py-2 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)]"
                          >
                            <span className={cn("flex h-6 w-6 flex-none items-center justify-center rounded-full border", state?.completedAt ? "border-action bg-action text-white" : "border-control text-transparent")} aria-hidden="true">
                              <Icon name="check" size={14} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold group-hover:text-action-hover">{lesson.title}</span>
                              <span className="block text-meta text-ink-soft">
                                {lesson.moduleTitle} · {lesson.minutes} min
                                {state?.completedAt ? " · concluída" : state?.readAt ? " · leitura concluída" : ""}
                              </span>
                            </span>
                            {isNext ? <span className="rounded-[6px] bg-mint px-2 py-1 text-label font-semibold text-action">Próxima</span> : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
