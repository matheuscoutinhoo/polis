import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { areaMeta } from "@/components/ui/topic";
import { cn, plural } from "@/lib/format";
import { STAGE_LABEL, pathModules, type LearningPath } from "@/modules/learning/path";

type Progress = Map<string, { completedAt: Date | null; readAt: Date | null }>;

/**
 * The path drawn as a flow of its contents: one station per module, in the
 * order the person will study it, with lesson progress. Stages only label the
 * line; every station links to its module.
 */
export function TrailFlow({ path, progress, nextLessonId }: { path: LearningPath; progress: Progress; nextLessonId: string | null }) {
  return (
    <div className="relative">
      <span aria-hidden="true" className="absolute top-4 bottom-[30px] left-[21px] w-0.5 rounded-full bg-line" />
      <ol className="relative flex flex-col gap-1">
        {path.steps.map((step) => {
          const stage = STAGE_LABEL[step.stage];
          return (
            <li key={step.stage}>
              <p className="flex items-center gap-4 py-2 text-label font-semibold uppercase tracking-wider text-ink-soft">
                <span aria-hidden="true" className="ml-[15px] h-3.5 w-3.5 flex-none rotate-45 rounded-[3px] border-2 border-control bg-surface" />
                <span className="pl-1">{stage.title}</span>
              </p>
              <ol aria-label={stage.title} className="flex flex-col gap-1">
                {pathModules(step.lessons).map((node) => {
                  const meta = node.area ? areaMeta[node.area] : null;
                  const completed = node.lessons.filter((l) => progress.get(l.id)?.completedAt).length;
                  const done = completed === node.lessons.length;
                  const isNext = node.lessons.some((l) => l.id === nextLessonId);
                  const minutes = node.lessons.reduce((sum, l) => sum + l.minutes, 0);
                  return (
                    <li key={node.slug}>
                      <Link
                        href={`/aprender/${node.slug}`}
                        className="group flex min-h-[60px] items-center gap-4 rounded-card py-2 pr-3 transition-colors hover:bg-paper focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)]"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "relative flex h-11 w-11 flex-none items-center justify-center rounded-full border-[3px] border-surface",
                            done
                              ? "bg-action text-white"
                              : isNext
                                ? "bg-surface text-action shadow-[0_0_0_2px_var(--color-action),0_0_0_7px_var(--color-selected)]"
                                : cn(meta?.bg ?? "bg-mint", meta?.ink ?? "text-action"),
                          )}
                        >
                          <Icon name={done ? "check" : (meta?.icon ?? "book")} size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold group-hover:text-action-hover">
                            {node.title}
                            {isNext ? <span className="rounded-[6px] bg-mint px-2 py-0.5 text-label font-semibold text-action">Próxima</span> : null}
                          </span>
                          <span className="block text-meta text-ink-soft">
                            {plural(node.lessons.length, "lição", "lições")} · {minutes} min
                            {done ? " · concluído" : completed ? ` · ${completed} de ${node.lessons.length} concluídas` : ""}
                          </span>
                        </span>
                        <span className="hidden flex-none items-center gap-1.5 sm:flex" aria-hidden="true">
                          {node.lessons.map((lesson) => (
                            <span
                              key={lesson.id}
                              className={cn("h-2.5 w-2.5 rounded-full", progress.get(lesson.id)?.completedAt ? "bg-action" : "border-2 border-control")}
                            />
                          ))}
                        </span>
                        <Icon name="chevronRight" size={18} className="flex-none text-control transition-colors group-hover:text-action" />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
