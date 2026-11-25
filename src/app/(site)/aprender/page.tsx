import type { Metadata } from "next";
import Link from "next/link";
import { SignupBanner } from "@/components/auth/signup-gate";
import { LearningPathView } from "@/components/polis/learning-path";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { ProgressBar } from "@/components/ui/progress";
import { EmptyState, TopicIcon, areaFromSlug, areaMeta, type Area } from "@/components/ui/topic";
import { cn, plural } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";
import { getActiveResult } from "@/modules/diagnostic/service";
import { getCatalog, getLearningPath } from "@/modules/learning/catalog";
import { getLearnerSummary } from "@/modules/learning/progress";

export const metadata: Metadata = { title: "Aprender" };

const NOTICES: Record<string, string> = {
  "questionario-adiado": "Tudo bem. O questionário continua disponível quando você quiser; por enquanto, sua trilha segue a ordem geral.",
  "trilha-geral": "Você está usando a trilha geral. Todo o catálogo continua aberto, e você pode responder ao questionário depois, se mudar de ideia.",
};

function FilterCount({ value, active }: { value: number; active: boolean }) {
  return (
    <span className={cn("min-w-6 rounded-full px-1.5 text-center text-meta font-semibold text-ink-soft", active ? "bg-surface" : "bg-line-soft")}>
      <span className="sr-only">(</span>
      {value}
      <span className="sr-only"> {value === 1 ? "módulo" : "módulos"})</span>
    </span>
  );
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ tema?: string; aviso?: string }> }) {
  const params = await searchParams;
  const area = areaFromSlug(params.tema);
  const user = await getCurrentUser();
  const [modules, result, summary] = await Promise.all([getCatalog(), user ? getActiveResult(user.id) : null, user ? getLearnerSummary(user.id) : null]);
  const path = await getLearningPath(user, result);
  const progress = summary?.progressByLesson ?? new Map();
  const next = path.ordered.find((l) => !progress.get(l.id)?.completedAt) ?? null;
  const visible = area ? modules.filter((m) => m.area === area) : modules;
  const areas = Object.keys(areaMeta) as Area[];

  return (
    <div className="page-frame py-8 md:py-12">
      {params.aviso && NOTICES[params.aviso] ? (
        <Notice tone="info" className="mb-6" role="status">
          {NOTICES[params.aviso]}
        </Notice>
      ) : null}
      <p className="eyebrow eyebrow-neutral">Aprender / Catálogo</p>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">Qual tema você quer explorar?</h1>
      <p className="mt-3 max-w-2xl text-lead text-ink-soft">Comece pelos fundamentos ou navegue livremente pelos assuntos.</p>
      {user ? null : (
        <SignupBanner path={area ? `/aprender?tema=${areaMeta[area].slug}` : "/aprender"} title="Crie uma conta para ler as lições completas" className="mt-6">
          Sem conta, você navega pelo catálogo e lê a abertura de cada lição.
        </SignupBanner>
      )}

      {/* `relative` keeps the absolutely positioned sr-only counts inside the scroller's clip. */}
      <nav aria-label="Filtrar por tema" className="relative -mx-4 mt-8 overflow-x-auto px-4 pb-1 min-[400px]:-mx-5 min-[400px]:px-5 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          <Link href="/aprender" className="chip gap-2 pl-2" aria-current={!area ? "true" : undefined}>
            <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full", !area ? "bg-surface text-action" : "bg-line-soft text-ink-soft")} aria-hidden="true">
              <Icon name="grid" size={16} />
            </span>
            Todos os temas
            <FilterCount value={modules.length} active={!area} />
          </Link>
          {areas.map((key) => {
            const meta = areaMeta[key];
            const active = area === key;
            return (
              <Link
                key={key}
                href={`/aprender?tema=${meta.slug}`}
                aria-current={active ? "true" : undefined}
                className={cn("chip gap-2 pl-2", active && `${meta.bg} ${meta.border} font-semibold text-ink`)}
              >
                <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full", active ? "bg-surface" : meta.bg, meta.ink)} aria-hidden="true">
                  <Icon name={meta.icon} size={16} />
                </span>
                {meta.label}
                <FilterCount value={modules.filter((m) => m.area === key).length} active={active} />
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          {visible.length === 0 ? (
            <EmptyState icon="book" title={area ? `Nenhum módulo publicado em ${areaMeta[area].label} ainda` : "O catálogo está sendo preparado"}>
              {area ? (
                <p>
                  Veja{" "}
                  <Link href="/aprender" className="text-link">
                    todos os temas
                  </Link>
                  .
                </p>
              ) : (
                <p>Os módulos aparecem aqui assim que o conteúdo editorial for publicado.</p>
              )}
            </EmptyState>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {visible.map((module) => {
                const done = module.lessons.filter((l) => progress.get(l.id)?.completedAt).length;
                const gap = module.status === "DOCUMENTARY_GAP";
                return (
                  <li key={module.id} className={cn("topic-card surface-card relative flex flex-col p-5", gap && "bg-paper")}>
                    <div className="flex items-start justify-between gap-3">
                      <TopicIcon area={module.area as Area} size={44} />
                      <span className="text-label font-semibold uppercase tracking-wider text-ink-soft">Módulo {String(module.number).padStart(2, "0")}</span>
                    </div>
                    <h2 className="mt-4 text-h3 font-semibold">
                      {gap ? (
                        module.title
                      ) : (
                        <Link href={`/aprender/${module.slug}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
                          {module.title}
                        </Link>
                      )}
                    </h2>
                    <p className="mt-2 flex-1 text-body text-ink-soft">{module.summary}</p>
                    {gap ? (
                      <p className="mt-3 rounded-control bg-sand p-3 text-meta text-sand-ink">
                        <span className="font-semibold">Em preparação: lacuna documental.</span> {module.gapNote}
                      </p>
                    ) : (
                      <div className="mt-4">
                        <p className="text-meta text-ink-soft">
                          {plural(module.lessons.length, "lição", "lições")} · {areaMeta[module.area as Area].label}
                          {user ? ` · ${done} concluída(s)` : ""}
                        </p>
                        {user ? <ProgressBar className="mt-2" value={done} max={module.lessons.length} label={`Progresso no módulo ${module.title}`} /> : null}
                        <p className="mt-3 flex items-center justify-between text-meta font-semibold text-action">
                          <span>{done === module.lessons.length && done > 0 ? "Revisar módulo" : done > 0 ? "Continuar módulo" : "Explorar módulo"}</span>
                          <Icon name="arrowRight" size={18} />
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-panel bg-mint p-5 md:p-6">
            <p className="eyebrow">Sua trilha</p>
            <h2 className="mt-1 text-h3 font-semibold">{path.mode === "AFFINITY" ? "Sua trilha por afinidade" : "Trilha geral"}</h2>
            <p className="mt-1 text-meta text-ink-soft">
              {path.mode === "AFFINITY" ? "Ordem definida a partir do seu questionário. " : "Ordem editorial, igual para todas as pessoas. "}
              {user ? (
                <Link href={result ? "/questionario/resultado" : "/questionario"} className="text-link">
                  {result ? "Mudar escolha da trilha" : "Conhecer o questionário"}
                </Link>
              ) : (
                <Link href="/criar-conta" className="text-link">
                  Crie uma conta para salvar o progresso
                </Link>
              )}
            </p>
            <p className="mt-4 flex gap-2 border-t border-action/15 pt-4 text-meta text-action-press">
              <Icon name="book" size={18} className="mt-0.5 flex-none" />
              A introdução é comum. O questionário pode ordenar os estudos e continua opcional; nenhuma corrente fica escondida.
            </p>
          </div>
          <div className="mt-4">
            {path.ordered.length ? (
              <LearningPathView path={path} progress={progress} nextLessonId={next?.id ?? null} />
            ) : (
              <p className="text-meta text-ink-soft">As etapas da trilha aparecem aqui quando houver lições publicadas.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
