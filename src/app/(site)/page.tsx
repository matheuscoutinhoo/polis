import Image from "next/image";
import Link from "next/link";
import { AiAssistedNote } from "@/components/polis/events";
import { LinkButton } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { ProgressBar } from "@/components/ui/progress";
import { TopicTile, IconChip, SectionHeading, areaMeta, type Area } from "@/components/ui/topic";
import { cn, formatDate } from "@/lib/format";
import { getContentUser, type CurrentUser } from "@/lib/session";
import { getActiveResult } from "@/modules/diagnostic/service";
import { eventContentSchema } from "@/modules/events/content";
import { listPublishedEvents } from "@/modules/events/service";
import { recentFromFollowed } from "@/modules/community/service";
import { getCatalog, getLearningPath } from "@/modules/learning/catalog";
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
  { title: "Questionário", text: "50 situações do cotidiano, logo após o cadastro. O resultado é privado e ordena seus estudos.", icon: "layers", tone: "bg-blue text-blue-ink" },
  { title: "Trilha de lições", text: "Lições de 3 a 7 minutos, com exemplos, fontes e verificação de compreensão.", icon: "book", tone: "bg-lilac text-lilac-ink" },
  { title: "Acontecimentos e fóruns", text: "Relacione conceitos a fatos documentados e participe das discussões.", icon: "event", tone: "bg-sand text-sand-ink" },
] as const satisfies ReadonlyArray<{ title: string; text: string; icon: IconName; tone: string }>;

/**
 * Drawn flow, centered on each step: vertical on small screens, horizontal from lg.
 * Connectors and step numbers are decorative; the ordered list gives the order.
 */
function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona" className="mt-12">
      <SectionHeading id="como-funciona" title="Como funciona" />
      <ol className="surface-card mt-5 flex flex-col items-center px-5 py-8 md:px-8 md:py-10 lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-6">
        {HOW_IT_WORKS.map((step, index) => (
          <li key={step.title} className="relative flex w-full max-w-sm flex-col items-center text-center lg:max-w-none">
            <span aria-hidden="true" className="relative">
              <span className={cn("inline-flex h-16 w-16 items-center justify-center rounded-full", step.tone)}>
                <Icon name={step.icon} size={28} />
              </span>
              <span className="absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-action text-label font-semibold text-white ring-2 ring-surface">
                {index + 1}
              </span>
            </span>
            <h3 className="mt-4 text-lead font-semibold">{step.title}</h3>
            <p className="mt-1 text-body text-ink-soft">{step.text}</p>
            {index < HOW_IT_WORKS.length - 1 ? (
              <>
                <span aria-hidden="true" className="my-4 flex h-10 flex-col items-center lg:hidden">
                  <span className="w-0.5 flex-1 rounded-full bg-action/40" />
                  <Icon name="chevronDown" size={18} className="-mt-2 text-action" />
                </span>
                {/* From 44 px right of this icon's center to 44 px left of the next one (columns are 1.5rem apart). */}
                <span aria-hidden="true" className="absolute top-8 right-[calc(-50%_+_1.25rem)] left-[calc(50%_+_2.75rem)] hidden -translate-y-1/2 items-center lg:flex">
                  <span className="h-0.5 flex-1 rounded-full bg-action/40" />
                  <Icon name="chevronRight" size={18} className="-ml-2 text-action" />
                </span>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

const PRINCIPLES = [
  { icon: "scale", title: "Explicar, não conduzir", text: "Argumentos, críticas e limites de cada perspectiva, com os mesmos critérios de evidência." },
  { icon: "document", title: "Fontes oficiais", text: "Cada explicação indica órgão, documento, data e alcance da fonte usada." },
  { icon: "lock", title: "Dados sob seu controle", text: "Respostas do questionário são privadas; você pode exportar ou apagar seus dados." },
] as const satisfies ReadonlyArray<{ icon: IconName; title: string; text: string }>;

/** Editorial commitments in one calm, non-interactive panel, so they never read as clickable topic tiles. */
function Principles() {
  return (
    <section aria-labelledby="principios" className="mt-12 overflow-hidden rounded-panel border border-line bg-surface xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
      <div className="bg-mint p-6 md:p-8">
        <p className="eyebrow">Princípios</p>
        <h2 id="principios" className="mt-2 text-h2 font-semibold">
          O que orienta cada explicação
        </h2>
        <p className="mt-2 text-body text-ink-soft">Compromissos que valem para todas as lições, acontecimentos e perspectivas.</p>
      </div>
      <ul className="divide-y divide-line-soft md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
        {PRINCIPLES.map((item) => (
          <li key={item.title} className="p-6 md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-selected text-action" aria-hidden="true">
              <Icon name={item.icon} size={22} />
            </span>
            <h3 className="mt-4 text-lead font-semibold">{item.title}</h3>
            <p className="mt-1 text-body text-ink-soft">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function ExploreByTopic() {
  const catalog = await getCatalog();
  // A single-module area lists its lessons, so the tile never just repeats the topic name.
  const tileProps = (area: Area) => {
    const modules = catalog.filter((mod) => mod.area === area && mod.status === "PUBLISHED" && mod.lessons.length > 0);
    return {
      area,
      href: `/aprender?tema=${areaMeta[area].slug}`,
      highlights: modules.length === 1 ? modules[0].lessons.map((lesson) => lesson.title) : modules.map((mod) => mod.title),
      moduleCount: modules.length,
      lessonCount: modules.reduce((sum, mod) => sum + mod.lessons.length, 0),
    };
  };
  return (
    <section aria-labelledby="explorar" className="mt-12">
      <SectionHeading id="explorar" title="Explore por tema" description="Escolha um ponto de partida e amplie sua compreensão." />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TopicTile {...tileProps("FUNDAMENTOS")} featured className="sm:col-span-2 lg:col-span-3" />
        <TopicTile {...tileProps("INSTITUICOES")} />
        <TopicTile {...tileProps("IDEIAS")} />
        <TopicTile {...tileProps("LEITURA_CRITICA")} className="sm:col-span-2 lg:col-span-1" />
      </div>
    </section>
  );
}

async function RecentEvents() {
  const events = await listPublishedEvents({ take: 3 });
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
            <Icon name="book" size={18} className="mt-0.5 flex-none" /> Fundamentos em comum. Com uma conta, você acessa as lições completas, os acontecimentos e os fóruns.
          </p>
        </div>
        <Illustration className="mx-auto h-auto w-full max-w-[520px]" />
      </section>

      <HowItWorks />

      <ExploreByTopic />

      <Principles />

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
  const user = await getContentUser();
  return user ? <Dashboard user={user} /> : <Landing />;
}
