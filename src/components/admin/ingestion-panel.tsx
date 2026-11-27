import Link from "next/link";
import { RunIngestionForm } from "@/components/admin/admin-forms";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { formatDateTime, plural } from "@/lib/format";
import { INGESTION_DECISION_LABEL, INGESTION_STATUS_LABEL, INGESTION_TRIGGER_LABEL } from "@/modules/admin/labels";
import { NEWS_FEEDS } from "@/modules/events/ingest/feeds";
import { nextSlot, type IngestionSettings } from "@/modules/events/ingest/schedule";
import { ingestionDetails, type ItemReport } from "@/modules/events/ingest/service";

type Tone = "success" | "warning" | "danger" | "sand" | "blue" | "neutral";

const STATUS_TONE: Record<string, Tone> = { RUNNING: "blue", SUCCESS: "success", PARTIAL: "warning", FAILED: "danger", SKIPPED: "sand" };
const DECISION_TONE: Record<string, Tone> = { published: "success", draft: "warning", error: "danger", found: "blue", limit: "neutral", duplicate: "neutral", ignored: "neutral" };

type Run = {
  id: string;
  trigger: string;
  status: string;
  startedAt: Date;
  checked: number;
  published: number;
  drafts: number;
  summary: string | null;
  details: unknown;
};

const list = new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" });

function ItemRow({ item }: { item: ItemReport }) {
  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
      <Badge tone={DECISION_TONE[item.decision] ?? "neutral"} className="w-fit flex-none">
        {INGESTION_DECISION_LABEL[item.decision] ?? item.decision}
      </Badge>
      <span className="min-w-0">
        {item.eventId ? (
          <Link href={`/admin/acontecimentos/${item.eventId}`} className="text-link font-semibold">
            {item.title}
          </Link>
        ) : (
          <span className="font-semibold text-ink">{item.title}</span>
        )}
        <span className="block text-ink-soft">
          {item.feed}
          {item.url.startsWith("https://") ? (
            <>
              {" · "}
              <a href={item.url} className="text-link" target="_blank" rel="noreferrer">
                notícia original
              </a>
            </>
          ) : null}
          {item.reason ? ` · ${item.reason}` : null}
        </span>
      </span>
    </li>
  );
}

function RunRow({ run }: { run: Run }) {
  const details = ingestionDetails(run.details);
  const relevant = details.items.filter((item) => item.decision !== "ignored");
  const ignored = details.items.filter((item) => item.decision === "ignored");
  return (
    <li className="py-2">
      <details>
        <summary className="details-summary flex min-h-[44px] flex-wrap items-center gap-x-3 gap-y-1 text-meta">
          <span className="font-semibold text-ink">{formatDateTime(run.startedAt)}</span>
          <Badge tone={STATUS_TONE[run.status] ?? "neutral"}>{INGESTION_STATUS_LABEL[run.status] ?? run.status}</Badge>
          <span className="text-ink-soft">{INGESTION_TRIGGER_LABEL[run.trigger] ?? run.trigger}</span>
          <span className="text-ink-soft">
            {run.status === "RUNNING"
              ? "lendo as notícias…"
              : `${plural(run.published, "publicado", "publicados")} · ${plural(run.drafts, "rascunho", "rascunhos")} · ${plural(run.checked, "notícia lida", "notícias lidas")}`}
          </span>
          <Icon name="chevronDown" size={16} className="details-chevron ml-auto flex-none" />
        </summary>
        <div className="mt-2 flex flex-col gap-3 pb-2 text-meta">
          {run.summary ? <p>{run.summary}</p> : null}
          {details.feedErrors.map((error) => (
            <p key={error.feed} className="flex items-start gap-2 text-danger">
              <Icon name="alert" size={16} className="mt-0.5 flex-none" /> {error.feed}: {error.error}
            </p>
          ))}
          {relevant.length ? (
            <ul className="flex flex-col gap-3">
              {relevant.map((item) => (
                <ItemRow key={`${item.decision}-${item.url}`} item={item} />
              ))}
            </ul>
          ) : null}
          {ignored.length ? (
            <details>
              <summary className="details-summary min-h-[44px] py-2 font-semibold text-action">
                {plural(ignored.length, "notícia ignorada", "notícias ignoradas")} (agendas, debates, declarações, áudios ou fora do período)
              </summary>
              <ul className="mt-2 flex flex-col gap-3">
                {ignored.map((item) => (
                  <ItemRow key={`ignored-${item.url}`} item={item} />
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      </details>
    </li>
  );
}

/** Status, schedule and recent searches of the automatic search of official news. */
export function IngestionPanel({ runs, settings, aiReady, now }: { runs: Run[]; settings: IngestionSettings; aiReady: boolean; now: Date }) {
  const running = runs.some((run) => run.status === "RUNNING");
  const hours = list.format(settings.hours.map((hour) => `${String(hour).padStart(2, "0")}:00`));
  const zone = settings.timeZone === "America/Sao_Paulo" ? "horário de Brasília" : settings.timeZone;
  return (
    <section aria-labelledby="busca-automatica" className="surface-card p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <h2 id="busca-automatica" className="flex items-center gap-2 text-lead font-semibold">
            <Icon name="clock" size={20} className="flex-none text-action" /> Busca automática de notícias oficiais
          </h2>
          <p className="mt-1 text-meta text-ink-soft">
            {settings.enabled
              ? `Às ${hours} (${zone}), lê as notícias ${list.format(NEWS_FEEDS.map((feed) => `da ${feed.label}`))} e transforma decisões (aprovações, sanções, vetos) em acontecimentos: até ${plural(settings.maxPublished, "publicação", "publicações")} por busca, só depois do portão de evidências e de verificações extras; o que não passa fica como rascunho para revisão. Próxima busca: ${formatDateTime(nextSlot(now, settings.hours, settings.timeZone))}.`
              : "Agendamento desativado neste servidor (EVENTS_AUTO_FETCH=off ou ambiente de desenvolvimento). “Buscar agora” e npm run events:fetch continuam disponíveis."}
          </p>
          {!aiReady ? (
            <p className="mt-2 flex items-start gap-2 text-meta text-warning">
              <Icon name="alert" size={16} className="mt-0.5 flex-none" /> IA não configurada (OPENAI_API_KEY): as buscas listam as notícias relevantes, mas não criam nem publicam
              acontecimentos.
            </p>
          ) : null}
        </div>
        <RunIngestionForm running={running} />
      </div>
      {runs.length === 0 ? (
        <p className="mt-4 text-meta text-ink-soft">Nenhuma busca registrada ainda.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line-soft border-t border-line-soft">
          {runs.map((run) => (
            <RunRow key={run.id} run={run} />
          ))}
        </ul>
      )}
    </section>
  );
}
