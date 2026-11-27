import type { Metadata } from "next";
import Link from "next/link";
import { SignupGate } from "@/components/auth/signup-gate";
import { EventTimeline } from "@/components/polis/events";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/topic";
import { getContentUser } from "@/lib/session";
import { aiConfigured } from "@/modules/ai/provider";
import { eventContentSchema } from "@/modules/events/content";
import { readIngestionSettings } from "@/modules/events/ingest/schedule";
import { countPublishedEvents, listPublishedEvents } from "@/modules/events/service";
import { EVENT_THEMES, isEventTheme } from "@/modules/events/themes";

export const metadata: Metadata = { title: "Acontecimentos" };

const PAGE_SIZE = 20;

function Intro({ timesPerDay }: { timesPerDay: number }) {
  const frequency = timesPerDay === 1 ? "uma vez por dia" : timesPerDay === 2 ? "duas vezes por dia" : `${timesPerDay} vezes por dia`;
  return (
    <>
      <p className="eyebrow eyebrow-neutral">Acontecimentos</p>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">Acontecimentos da política brasileira</h1>
      <p className="mt-3 max-w-3xl text-lead text-ink-soft">
        Fatos documentados em fontes oficiais, com contexto, situação atual, impactos e argumentos atribuídos a quem os defende.{" "}
        {timesPerDay
          ? `A lista recebe novas decisões ${frequency}, a partir das notícias oficiais do Senado e da Câmara; a seleção não é personalizada.`
          : "A seleção não é personalizada nem é uma cobertura em tempo real."}
      </p>
    </>
  );
}

function buildHref(theme: string | null, page: number) {
  const search = new URLSearchParams();
  if (theme) search.set("tema", theme);
  if (page > 1) search.set("pagina", String(page));
  const query = search.toString();
  return query ? `/acontecimentos?${query}` : "/acontecimentos";
}

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ tema?: string; pagina?: string }> }) {
  const { tema, pagina } = await searchParams;
  const theme = isEventTheme(tema) ? tema : null;
  const requestedPage = Math.max(1, Number.parseInt(pagina ?? "1", 10) || 1);
  const user = await getContentUser();
  const settings = readIngestionSettings();
  // The automatic search only adds events when the AI is configured.
  const timesPerDay = settings.enabled && aiConfigured() ? settings.hours.length : 0;

  if (!user) {
    return (
      <div className="page-frame py-8 md:py-12">
        <Intro timesPerDay={timesPerDay} />
        <SignupGate
          path={theme ? `/acontecimentos?tema=${theme}` : "/acontecimentos"}
          eyebrow="Acesso com conta"
          title="Crie uma conta para acompanhar os acontecimentos"
          perks={["Todos os acontecimentos explicados", "Situação atual e etapas", "Impactos e argumentos atribuídos", "Fontes oficiais e discussões"]}
          className="mt-8"
        >
          A lista de acontecimentos fica disponível para quem tem conta. Com ela, você acompanha o que aconteceu, por que importa e de onde vem cada informação.
        </SignupGate>
      </div>
    );
  }

  const total = await countPublishedEvents(theme);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const events = await listPublishedEvents({ theme, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE });

  return (
    <div className="page-frame py-8 md:py-12">
      <Intro timesPerDay={timesPerDay} />

      <nav aria-label="Filtrar por tema" className="mt-8 flex flex-wrap gap-2">
        <Link href="/acontecimentos" className="chip" aria-current={!theme ? "true" : undefined}>
          Todos os temas
        </Link>
        {EVENT_THEMES.map((t) => (
          <Link key={t.key} href={`/acontecimentos?tema=${t.key}`} className="chip" aria-current={theme === t.key ? "true" : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10 max-w-5xl">
        {events.length ? (
          <>
            <EventTimeline
              events={events.map((event) => {
                const content = eventContentSchema.safeParse(event.content);
                return {
                  slug: event.slug,
                  title: event.title,
                  eventDate: event.eventDate,
                  themes: event.themes,
                  statusLabel: event.statusLabel,
                  summary: content.success ? content.data.summary.text : "",
                  updatedAt: event.lastReviewedAt ?? event.updatedAt,
                  aiAssisted: event.aiAssisted,
                };
              })}
            />
            <Pagination page={page} totalPages={totalPages} hrefFor={(p) => buildHref(theme, p)} label="Páginas de acontecimentos" />
          </>
        ) : (
          <EmptyState icon="event" title="Nenhum acontecimento publicado neste tema">
            <p>
              Veja{" "}
              <Link href="/acontecimentos" className="text-link">
                todos os temas
              </Link>{" "}
              ou explore as lições do catálogo.
            </p>
          </EmptyState>
        )}
      </div>
    </div>
  );
}
