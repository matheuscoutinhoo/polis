import type { Metadata } from "next";
import Link from "next/link";
import { LearningPathView } from "@/components/polis/learning-path";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { ProgressBar } from "@/components/ui/progress";
import { TopicIcon, areaFromSlug, areaMeta, type Area } from "@/components/ui/topic";
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

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ tema?: string; aviso?: string }> }) {
  const params = await searchParams;
  const area = areaFromSlug(params.tema);
  const user = await getCurrentUser();
  const [modules, result, summary] = await Promise.all([getCatalog(), user ? getActiveResult(user.id) : null, user ? getLearnerSummary(user.id) : null]);
  const path = await getLearningPath(user, result);
  const progress = summary?.progressByLesson ?? new Map();
  const next = path.ordered.find((l) => !progress.get(l.id)?.completedAt) ?? null;
  const visible = area ? modules.filter((m) => m.area === area) : modules;
  const filters: Array<{ slug: string | null; label: string }> = [{ slug: null, label: "Todos os temas" }, ...(Object.keys(areaMeta) as Area[]).map((a) => ({ slug: areaMeta[a].slug, label: areaMeta[a].label }))];

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

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div>
          <Notice tone="info" icon="book" className="max-w-2xl">
            A introdução é comum. O questionário pode ordenar os estudos e continua opcional; nenhuma corrente fica escondida.
          </Notice>

          <nav aria-label="Filtrar por tema" className="mt-6 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const active = (filter.slug ?? null) === (area ? areaMeta[area].slug : null);
              return (
                <Link key={filter.label} href={filter.slug ? `/aprender?tema=${filter.slug}` : "/aprender"} className="chip" aria-current={active ? "true" : undefined}>
                  {filter.label}
                </Link>
              );
            })}
          </nav>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
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
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-h3 font-semibold">{path.mode === "AFFINITY" ? "Sua trilha por afinidade" : "Trilha geral"}</h2>
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
          <div className="mt-4">
            <LearningPathView path={path} progress={progress} nextLessonId={next?.id ?? null} />
          </div>
        </aside>
      </div>
    </div>
  );
}
