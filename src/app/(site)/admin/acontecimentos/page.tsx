import type { Metadata } from "next";
import Link from "next/link";
import { IngestionPanel } from "@/components/admin/ingestion-panel";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { EVENT_STATUS_LABEL } from "@/modules/admin/labels";
import { aiConfigured } from "@/modules/ai/provider";
import { readIngestionSettings } from "@/modules/events/ingest/schedule";
import { listRecentIngestionRuns } from "@/modules/events/ingest/service";
import { ADMIN_EVENT_FILTERS, listEventsForAdmin, type AdminEventFilter } from "@/modules/events/service";

export const metadata: Metadata = { title: "Acontecimentos" };

const FILTER_LABEL: Record<AdminEventFilter, string> = {
  DRAFT: "Rascunhos",
  IN_REVIEW: "Em revisão",
  PUBLISHED: "Publicados",
  AUTOMATIC: "Da busca automática",
};

export default async function AdminEventsPage({ searchParams }: { searchParams: Promise<{ filtro?: string }> }) {
  const { filtro } = await searchParams;
  const filter = ADMIN_EVENT_FILTERS.find((f) => f === filtro) ?? null;
  const [events, runs] = await Promise.all([listEventsForAdmin(filter), listRecentIngestionRuns()]);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-display-sm font-semibold">Acontecimentos</h1>
          <p className="mt-1 text-body text-ink-soft">
            Fluxo editorial: criar rascunho → vincular fontes aprovadas → redigir ou gerar rascunho com IA → verificar → revisão humana → publicar. A busca automática segue o
            mesmo portão e marca o que publicou sem revisão.
          </p>
        </div>
        <LinkButton href="/admin/acontecimentos/novo" icon="plus" iconPosition="start" className="shrink-0">
          Novo acontecimento
        </LinkButton>
      </div>
      <IngestionPanel runs={runs} settings={readIngestionSettings()} aiReady={aiConfigured()} now={new Date()} />
      <nav aria-label="Filtrar acontecimentos" className="flex flex-wrap gap-2">
        <Link href="/admin/acontecimentos" className="chip" aria-current={!filter ? "true" : undefined}>
          Todos
        </Link>
        {ADMIN_EVENT_FILTERS.map((f) => (
          <Link key={f} href={`/admin/acontecimentos?filtro=${f}`} className="chip" aria-current={filter === f ? "true" : undefined}>
            {FILTER_LABEL[f]}
          </Link>
        ))}
      </nav>
      {events.length === 0 ? (
        <p className="text-body text-ink-soft">Nenhum acontecimento {filter ? "neste filtro" : "cadastrado"}.</p>
      ) : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-meta">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-3 font-semibold">
                  Título
                </th>
                <th scope="col" className="p-3 font-semibold">
                  Situação
                </th>
                <th scope="col" className="p-3 font-semibold">
                  Data do fato
                </th>
                <th scope="col" className="p-3 font-semibold">
                  Fontes
                </th>
                <th scope="col" className="p-3 font-semibold">
                  Atualização
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-line-soft align-top">
                  <td className="p-3">
                    <Link href={`/admin/acontecimentos/${event.id}`} className="text-link font-semibold">
                      {event.title}
                    </Link>
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {event.isDemo ? <Badge tone="sand">Demonstração</Badge> : null}
                      {event.origin === "AUTOMATIC" ? <Badge tone="blue">Busca automática</Badge> : null}
                      {event.autoPublished && event.status === "PUBLISHED" ? <Badge tone="warning">Publicado sem revisão humana</Badge> : null}
                      {event.aiAssisted ? <Badge tone="lilac">Rascunho com IA</Badge> : null}
                    </span>
                  </td>
                  <td className="p-3">
                    <Badge tone={event.status === "PUBLISHED" ? "mint" : event.status === "IN_REVIEW" ? "warning" : "neutral"}>{EVENT_STATUS_LABEL[event.status]}</Badge>
                  </td>
                  <td className="p-3">{formatDate(event.eventDate)}</td>
                  <td className="p-3">{event._count.sources}</td>
                  <td className="p-3">{formatDate(event.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
