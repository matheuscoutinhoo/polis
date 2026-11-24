import Image from "next/image";
import Link from "next/link";
import { AiAssistedNote } from "@/components/polis/events";
import { LinkButton } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { ProgressBar } from "@/components/ui/progress";
import { TopicCard, IconChip, SectionHeading } from "@/components/ui/topic";
import { cn, formatDate } from "@/lib/format";
import { getCurrentUser, type CurrentUser } from "@/lib/session";
import { getActiveResult } from "@/modules/diagnostic/service";
import { eventContentSchema } from "@/modules/events/content";
import { listPublishedEvents } from "@/modules/events/service";
import { recentFromFollowed } from "@/modules/community/service";
import { getLearningPath } from "@/modules/learning/catalog";
import { ACHIEVEMENTS, getLearnerSummary } from "@/modules/learning/progress";

function Illustration({ className }: { className?: string }) {
  return (
    <Image
      src="/illustrations/polis-learning.webp"
      alt="Ilustração: quatro pessoas conversam ao redor de uma mesa com livros, diante de um quadro com formas geométricas ligadas entre si."
      width={1200}
      height={900}
      priority
      sizes="(min-width: 1024px) 520px, 90vw"
      className={className}
    />
  );
}

const HOW_IT_WORKS = [
  { title: "Conta", text: "Crie uma conta com nome de exibição, e-mail e senha.", icon: "user", tone: "bg-mint text-mint-ink" },
  { title: "Questionário opcional", text: "50 situações do cotidiano. O resultado é privado e só ordena seus estudos.", icon: "layers", tone: "bg-blue text-blue-ink", optional: true },
  { title: "Trilha de lições", text: "Lições de 3 a 7 minutos, com exemplos, fontes e verificação de compreensão.", icon: "book", tone: "bg-lilac text-lilac-ink" },
  { title: "Acontecimentos e fóruns", text: "Relacione conceitos a fatos documentados e participe das discussões.", icon: "event", tone: "bg-sand text-sand-ink" },
] as const satisfies ReadonlyArray<{ title: string; text: string; icon: IconName; tone: string; optional?: boolean }>;

/** Drawn flow: vertical on small screens, horizontal from lg. Connectors are decorative; the list gives the order. */
function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona" className="mt-12">
      <SectionHeading id="como-funciona" title="Como funciona" />
      <ol className="surface-card mt-5 grid gap-x-6 p-5 md:p-8 lg:grid-cols-4">
        {HOW_IT_WORKS.map((step, index) => (
          <li key={step.title} className="relative grid min-h-[7.5rem] grid-cols-[3.5rem_1fr] gap-x-4 pb-8 last:min-h-0 last:pb-0 lg:block lg:min-h-0 lg:pb-0">
            <span
              aria-hidden="true"
              className={cn(
                "relative inline-flex h-14 w-14 items-center justify-center rounded-full",
                step.tone,
                "optional" in step && "outline-2 outline-offset-4 outline-blue-ink/50 outline-dashed",
              )}
            >
              <Icon name={step.icon} size={26} />
            </span>
            {index < HOW_IT_WORKS.length - 1 ? (
              <>
                <span aria-hidden="true" className="absolute top-[4.25rem] bottom-1.5 left-7 flex -translate-x-1/2 flex-col items-center lg:hidden">
                  <span className="w-0.5 flex-1 rounded-full bg-action/40" />
                  <Icon name="chevronDown" size={18} className="-mt-2 text-action" />
                </span>
                <span aria-hidden="true" className="absolute top-7 -right-3 left-[4.75rem] hidden -translate-y-1/2 items-center lg:flex">
                  <span className="h-0.5 flex-1 rounded-full bg-action/40" />
                  <Icon name="chevronRight" size={18} className="-ml-2 text-action" />
                </span>
              </>
            ) : null}
            <div className="pt-3.5 lg:pt-5">
              <h3 className="text-lead font-semibold">{step.title}</h3>
              <p className="mt-1 text-body text-ink-soft">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ExploreByTopic() {
  return (
    <section aria-labelledby="explorar" className="mt-12">
      <SectionHeading id="explorar" title="Explore por tema" description="Escolha um ponto de partida e amplie sua compreensão." />
      <div className="mt-5 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
        <TopicCard area="FUNDAMENTOS" href="/aprender?tema=fundamentos" />
        <TopicCard area="INSTITUICOES" href="/aprender?tema=instituicoes" />
        <TopicCard area="IDEIAS" href="/aprender?tema=ideias" />
        <TopicCard area="LEITURA_CRITICA" href="/aprender?tema=leitura-critica" />
      </div>
    </section>
  );
}

async function RecentEvents() {
  const events = (await listPublishedEvents()).slice(0, 3);
  if (events.length === 0) return null;
  return (
    <section aria-labelledby="acontecimentos-recentes" className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeading id="acontecimentos-recentes" title="Acontecimentos explicados" description="Fatos documentados, contexto, impactos e fontes oficiais." />
        <Link href="/acontecimentos" className="text-link inline-flex items-center gap-1.5">
          Ver todos <Icon name="arrowRight" size={16} />
        </Link>
      </div>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {events.map((event) => {
          const content = eventContentSchema.safeParse(event.content);
          return (
            <li key={event.id} className="surface-card flex flex-col p-5">
              <p className="text-meta text-ink-soft">{formatDate(event.eventDate)}</p>
              <h3 className="mt-1 text-lead font-semibold leading-snug">
                <Link href={`/acontecimentos/${event.slug}`} className="hover:text-action-hover">
                  {event.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-meta text-ink-soft">{content.success ? content.data.summary.text : ""}</p>
              <Link href={`/acontecimentos/${event.slug}`} className="text-link mt-3 inline-flex items-center gap-1.5 text-meta">
                Entender este acontecimento <Icon name="arrowRight" size={16} />
              </Link>
              {event.aiAssisted ? (
                <p className="mt-3 border-t border-line-soft pt-3">
                  <AiAssistedNote />
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Landing() {
  return (
    <div className="page-frame py-6 md:py-10">
      <section className="grid items-center gap-8 overflow-hidden rounded-panel bg-mint px-5 py-8 md:px-12 md:py-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="eyebrow">Polis · educação política</p>
          <h1 className="mt-3 text-display-sm font-semibold tracking-tight md:text-display">Entenda instituições, ideias e acontecimentos.</h1>
          <p className="mt-4 max-w-xl text-lead text-ink-soft">
            A Polis explica a política brasileira para quem está começando, com fontes oficiais e diferentes perspectivas. As explicações não indicam em quem votar nem qual
            corrente seguir.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/criar-conta" icon="arrowRight">
              Criar conta
            </LinkButton>
            <LinkButton href="/aprender" variant="secondary">
              Explorar catálogo
            </LinkButton>
          </div>
          <p className="mt-5 flex items-start gap-2 text-meta text-action-press">
            <Icon name="book" size={18} className="mt-0.5 flex-none" /> Fundamentos em comum. Catálogo sempre acessível, com ou sem conta.
          </p>
        </div>
        <Illustration className="mx-auto h-auto w-full max-w-[520px]" />
      </section>

      <HowItWorks />

      <ExploreByTopic />

      <section aria-labelledby="principios" className="mt-12 grid gap-4 md:grid-cols-3">
        <h2 id="principios" className="sr-only">
          Princípios
        </h2>
        {[
          { tone: "mint" as const, icon: "scale" as const, title: "Explicar, não conduzir", text: "Argumentos, críticas e limites de cada perspectiva, com os mesmos critérios de evidência." },
          { tone: "sand" as const, icon: "document" as const, title: "Fontes oficiais", text: "Cada explicação indica órgão, documento, data e alcance da fonte usada." },
          { tone: "lilac" as const, icon: "lock" as const, title: "Dados sob seu controle", text: "Respostas do questionário são privadas; você pode exportar ou apagar seus dados." },
        ].map((item) => (
          <article key={item.title} className="surface-card p-5">
            <IconChip icon={item.icon} tone={item.tone} size={44} />
            <h3 className="mt-3 text-lead font-semibold">{item.title}</h3>
            <p className="mt-1 text-body text-ink-soft">{item.text}</p>
          </article>
        ))}
      </section>

      <RecentEvents />
    </div>
  );
}

async function Dashboard({ user }: { user: CurrentUser }) {
  const [result, summary] = await Promise.all([getActiveResult(user.id), getLearnerSummary(user.id)]);
  const path = await getLearningPath(user, result);
  const next = path.ordered.find((lesson) => !summary.progressByLesson.get(lesson.id)?.completedAt) ?? null;
  const completed = path.ordered.filter((lesson) => summary.progressByLesson.get(lesson.id)?.completedAt).length;
  const moduleLessons = next ? path.ordered.filter((l) => l.moduleSlug === next.moduleSlug) : [];
  const followed = await recentFromFollowed(user.id, 4);
  const showQuestionnaire = user.questionnaireDecision === "UNDECIDED" || user.questionnaireDecision === "DEFERRED";

  return (
    <div className="page-frame py-6 md:py-10">
      <section className="grid items-center gap-8 overflow-hidden rounded-panel bg-mint px-5 py-8 md:px-12 md:py-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="eyebrow">Seu aprendizado / {path.mode === "AFFINITY" ? "Trilha por afinidade" : "Trilha geral"}</p>
          <h1 className="mt-3 text-display-sm font-semibold tracking-tight md:text-display">Continuar aprendendo, no seu ritmo.</h1>
          <p className="mt-4 max-w-xl text-lead text-ink-soft">Explore instituições, ideias e acontecimentos com explicações claras e diferentes perspectivas.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {next ? (
              <LinkButton href={`/aprender/${next.moduleSlug}/${next.slug}`} icon="arrowRight">
                Continuar lição
              </LinkButton>
            ) : (
              <LinkButton href="/acontecimentos" icon="arrowRight">
                Ver acontecimentos
              </LinkButton>
            )}
            <LinkButton href="/aprender" variant="secondary">
              Explorar catálogo
            </LinkButton>
          </div>
          <p className="mt-5 flex items-start gap-2 text-meta text-action-press">
            <Icon name="book" size={18} className="mt-0.5 flex-none" /> Fundamentos em comum. Catálogo sempre acessível.
          </p>
        </div>
        <Illustration className="mx-auto h-auto w-full max-w-[520px]" />
      </section>

      {next ? (
        <section aria-labelledby="proximo-passo" className="surface-card mt-6 flex flex-col gap-4 p-5 md:flex-row md:items-center md:p-6">
          <IconChip icon="book" size={48} />
          <div className="min-w-0 flex-1">
            <p className="eyebrow eyebrow-neutral">Seu próximo passo</p>
            <h2 id="proximo-passo" className="mt-1 text-h3 font-semibold">
              {next.title}
            </h2>
            <p className="mt-1 text-meta text-ink-soft">
              {next.moduleTitle} · Lição {moduleLessons.findIndex((l) => l.id === next.id) + 1} de {moduleLessons.length} · aproximadamente {next.minutes} min
            </p>
            <ProgressBar className="mt-3 max-w-md" value={completed} max={path.ordered.length} label="Lições concluídas na trilha" />
            <p className="mt-1.5 text-meta text-ink-soft">
              {completed} de {path.ordered.length} lições concluídas
            </p>
          </div>
          <LinkButton href={`/aprender/${next.moduleSlug}/${next.slug}`} variant="secondary" icon="arrowRight">
            Ver lição
          </LinkButton>
        </section>
      ) : (
        <section className="surface-card mt-6 p-5 md:p-6">
          <p className="eyebrow eyebrow-neutral">Trilha concluída</p>
          <p className="mt-1 text-body">Você concluiu todas as lições publicadas. Novos módulos aparecerão no catálogo quando estiverem prontos.</p>
        </section>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="surface-card p-5">
          <p className="eyebrow eyebrow-neutral">Pontos de aprendizado</p>
          <p className="mt-1 text-h2 font-semibold">{summary.xp} XP</p>
          <p className="text-meta text-ink-soft">Por leitura, compreensão e conclusão de módulos, uma vez por atividade.</p>
        </div>
        <div className="surface-card p-5">
          <p className="eyebrow eyebrow-neutral">Lições concluídas</p>
          <p className="mt-1 text-h2 font-semibold">{summary.completedCount}</p>
          <p className="text-meta text-ink-soft">Você pode revisar qualquer lição quando quiser.</p>
        </div>
        <div className="surface-card p-5">
          <p className="eyebrow eyebrow-neutral">Conquistas</p>
          {summary.achievements.length ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {summary.achievements.map((a) => (
                <li key={a.key} className="inline-flex items-center gap-1.5 rounded-[6px] bg-mint px-2 py-1 text-meta font-semibold text-action">
                  <Icon name="check" size={14} /> {ACHIEVEMENTS[a.key]?.title ?? a.key}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-body text-ink-soft">Conclua a primeira lição para registrar sua primeira conquista.</p>
          )}
        </div>
      </div>

      {showQuestionnaire ? (
        <section className="mt-6 flex flex-col gap-4 rounded-panel bg-blue p-5 md:flex-row md:items-center md:p-6">
          <IconChip icon="layers" tone="blue" size={48} />
          <div className="flex-1">
            <h2 className="text-lead font-semibold">Questionário de afinidades (opcional)</h2>
            <p className="text-body text-ink-soft">50 situações para ordenar sua trilha a partir de temas mais familiares. O resultado é privado e não muda o conteúdo das lições.</p>
          </div>
          <LinkButton href="/questionario" variant="secondary">
            Conhecer o questionário
          </LinkButton>
        </section>
      ) : null}

      <ExploreByTopic />

      {followed.length ? (
        <section aria-labelledby="discussoes" className="mt-12">
          <SectionHeading id="discussoes" title="Discussões nos fóruns que você segue" />
          <ul className="surface-card mt-5 divide-y divide-line-soft">
            {followed.map((topic) => (
              <li key={topic.id} className="p-4">
                <Link href={`/comunidade/${topic.forum.slug}/${topic.id}`} className="font-semibold hover:text-action-hover">
                  {topic.title}
                </Link>
                <p className="text-meta text-ink-soft">
                  {topic.forum.title} · {topic.commentCount} comentários · atividade em {formatDate(topic.lastActivityAt)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <RecentEvents />
    </div>
  );
}

export default async function HomePage() {
  const user = await getCurrentUser();
  return user ? <Dashboard user={user} /> : <Landing />;
}
