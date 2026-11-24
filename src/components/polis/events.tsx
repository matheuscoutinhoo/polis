import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn, formatDate, formatPartialDate } from "@/lib/format";
import { THEME_LABEL } from "@/modules/events/themes";

type TimelineEvent = { slug: string; title: string; eventDate: Date; themes: string[]; statusLabel: string; summary: string; updatedAt: Date; aiAssisted: boolean };

/** Discreet disclosure for analyses drafted with AI support, shown at the end of the content. */
export function AiAssistedNote({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-meta text-ink-soft", className)}>
      <Icon name="info" size={16} className="flex-none" />
      Gerado com apoio de Inteligência Artificial
    </span>
  );
}

/** Editorial chronological list: dates on the rail, one entry per event. */
export function EventTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative">
      {events.map((event, index) => (
        <li key={event.slug} className="grid grid-cols-[1.25rem_1fr] gap-x-4 md:grid-cols-[8.5rem_1.25rem_1fr]">
          <p className="hidden pt-1 text-meta text-ink-soft md:block">
            <time dateTime={event.eventDate.toISOString().slice(0, 10)}>{formatDate(event.eventDate)}</time>
          </p>
          <div className="relative flex justify-center" aria-hidden="true">
            <span className="absolute top-2.5 h-3 w-3 rounded-full bg-action" />
            {index < events.length - 1 ? <span className="absolute top-6 bottom-0 w-px bg-line" /> : null}
          </div>
          <article className="pb-10">
            <p className="text-meta text-ink-soft md:hidden">
              <time dateTime={event.eventDate.toISOString().slice(0, 10)}>{formatDate(event.eventDate)}</time>
            </p>
            <div className="mt-1 flex flex-wrap gap-2 md:mt-0">
              {event.themes.map((theme) => (
                <Badge key={theme} tone="blue">
                  {THEME_LABEL[theme] ?? theme}
                </Badge>
              ))}
              <Badge tone="neutral">{event.statusLabel}</Badge>
            </div>
            <h2 className="mt-2 text-h3 font-semibold">
              <Link href={`/acontecimentos/${event.slug}`} className="hover:text-action-hover focus-visible:outline-none focus-visible:underline">
                {event.title}
              </Link>
            </h2>
            <p className="mt-2 max-w-3xl text-body text-ink-soft">{event.summary}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-meta">
              <Link href={`/acontecimentos/${event.slug}`} className="text-link inline-flex items-center gap-1.5">
                Entender este acontecimento <Icon name="arrowRight" size={16} />
              </Link>
              <span className="text-ink-soft">Última atualização: {formatDate(event.updatedAt)}</span>
              {event.aiAssisted ? <AiAssistedNote /> : null}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}

/** Documented process stages; next steps depend on the real process. */
export function ProcessStages({ stages, footer }: { stages: Array<{ date: string; label: string; citations?: ReactNode }>; footer?: ReactNode }) {
  return (
    <ol className="relative">
      {stages.map((stage, index) => (
        <li key={`${stage.date}-${index}`} className="grid grid-cols-[6.5rem_1.25rem_1fr] gap-x-3 sm:grid-cols-[8rem_1.25rem_1fr]">
          <p className="pt-0.5 text-meta text-ink-soft">{stage.date ? formatPartialDate(stage.date) : "Sem data"}</p>
          <div className="relative flex justify-center" aria-hidden="true">
            <span className="absolute top-1.5 h-2.5 w-2.5 rounded-full bg-action" />
            {index < stages.length - 1 || footer ? <span className="absolute top-5 bottom-0 w-px bg-line" /> : null}
          </div>
          <div className="pb-6">
            <p className="font-semibold">
              {stage.label}
              {stage.citations}
            </p>
          </div>
        </li>
      ))}
      {footer ? (
        <li className="grid grid-cols-[6.5rem_1.25rem_1fr] gap-x-3 sm:grid-cols-[8rem_1.25rem_1fr]">
          <p className="pt-0.5 text-meta text-ink-soft">Próximos passos</p>
          <div className="relative flex justify-center" aria-hidden="true">
            <span className="absolute top-1.5 h-2.5 w-2.5 rounded-full border-2 border-action bg-surface" />
          </div>
          <div className="pb-2 text-body text-ink-soft">{footer}</div>
        </li>
      ) : null}
    </ol>
  );
}

/** Impact mechanism: decision → practical change → affected group → conditions. */
export function ImpactMechanism({ kind, decision, change, group, conditions, citations }: { kind: "DOCUMENTED" | "POSSIBLE"; decision: string; change: string; group: string; conditions: string; citations?: ReactNode }) {
  const steps = [
    { n: "01", title: "Decisão", text: decision, bg: "bg-mint" },
    { n: "02", title: "Mudança prática", text: change, bg: "bg-blue" },
    { n: "03", title: "Grupo afetado", text: group, bg: "bg-lilac" },
    { n: "04", title: "Condições e limites", text: conditions, bg: "bg-sand" },
  ];
  return (
    <article className="surface-card p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={kind === "DOCUMENTED" ? "success" : "warning"}>{kind === "DOCUMENTED" ? "Consequência documentada" : "Cenário possível (condicional)"}</Badge>
        {citations}
      </div>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step) => (
          <li key={step.n} className={`${step.bg} rounded-card p-4`}>
            <p className="text-label font-semibold text-action">
              {step.n} <span className="sr-only">—</span>
            </p>
            <p className="mt-1 font-semibold">{step.title}</p>
            <p className="mt-1 text-meta">{step.text}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}
