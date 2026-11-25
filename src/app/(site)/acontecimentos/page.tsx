import type { Metadata } from "next";
import Link from "next/link";
import { SignupBanner } from "@/components/auth/signup-gate";
import { EventTimeline } from "@/components/polis/events";
import { EmptyState } from "@/components/ui/topic";
import { getCurrentUser } from "@/lib/session";
import { eventContentSchema } from "@/modules/events/content";
import { listPublishedEvents } from "@/modules/events/service";
import { EVENT_THEMES, isEventTheme } from "@/modules/events/themes";

export const metadata: Metadata = { title: "Acontecimentos" };

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ tema?: string }> }) {
  const { tema } = await searchParams;
  const theme = isEventTheme(tema) ? tema : null;
  const [events, user] = await Promise.all([listPublishedEvents(theme), getCurrentUser()]);

  return (
    <div className="page-frame py-8 md:py-12">
      <p className="eyebrow eyebrow-neutral">Acontecimentos</p>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">Acontecimentos da política brasileira</h1>
      <p className="mt-3 max-w-3xl text-lead text-ink-soft">
        Fatos documentados em fontes oficiais, com contexto, situação atual, impactos e argumentos atribuídos a quem os defende. A seleção não é personalizada nem é uma cobertura
        em tempo real.
      </p>
      {user ? null : (
        <SignupBanner path={theme ? `/acontecimentos?tema=${theme}` : "/acontecimentos"} title="Crie uma conta para ler os acontecimentos completos" className="mt-6">
          Sem conta, você vê o resumo de cada acontecimento. Com uma conta, acessa a situação atual, o contexto, os impactos e as fontes.
        </SignupBanner>
      )}

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
