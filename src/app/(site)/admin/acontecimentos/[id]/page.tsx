import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublishEventForm } from "@/components/admin/admin-forms";
import { EventEditor } from "@/components/admin/event-editor";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { SubmitButton } from "@/components/ui/submit-button";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format";
import { attachSourceAction, detachSourceAction, linkLessonAction, unlinkLessonAction, unpublishEventAction } from "@/modules/admin/actions";
import { EVENT_STATUS_LABEL } from "@/modules/admin/labels";
import { aiConfigured } from "@/modules/ai/provider";
import type { DraftReport } from "@/modules/ai/reference-check";
import { EMPTY_EVENT_CONTENT, SECTION_LABEL, eventContentSchema } from "@/modules/events/content";
import { evaluatePublication, getEventForAdmin } from "@/modules/events/service";

export const metadata: Metadata = { title: "Editar acontecimento" };

type Params = Promise<{ id: string }>;

export default async function AdminEventPage({ params }: { params: Params }) {
  const { id } = await params;
  const event = await getEventForAdmin(id.slice(0, 40));
  if (!event) notFound();
  const [{ check }, approvedSources, lessons] = await Promise.all([
    evaluatePublication(event.id),
    db.source.findMany({
      where: { reviewStatus: "APPROVED", eventSources: { none: { eventId: event.id } } },
      orderBy: { title: "asc" },
      select: { id: true, title: true, publisher: { select: { acronym: true, name: true } } },
    }),
    db.lesson.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ module: { number: "asc" } }, { number: "asc" }],
      select: { id: true, slug: true, title: true, module: { select: { slug: true, title: true } } },
    }),
  ]);
  const parsed = eventContentSchema.safeParse(event.content);
  const content = parsed.success ? parsed.data : EMPTY_EVENT_CONTENT;
  const attached = event.sources.filter((s) => s.source.reviewStatus === "APPROVED").map((s) => ({ key: s.source.key, title: s.source.title }));
  const report = event.aiReport as DraftReport | null;
  const linkedLessonIds = new Set(event.lessons.map((l) => l.lesson.id));

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/admin/acontecimentos" className="text-link">
          Acontecimentos
        </Link>{" "}
        / Editar
      </nav>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={event.status === "PUBLISHED" ? "mint" : event.status === "IN_REVIEW" ? "warning" : "neutral"}>{EVENT_STATUS_LABEL[event.status]}</Badge>
          {event.isDemo ? <Badge tone="sand">Demonstração — não entra no feed</Badge> : null}
          {event.aiAssisted ? <Badge tone="lilac">Conteúdo com apoio de IA</Badge> : null}
        </div>
        <h1 className="text-h1 font-semibold">{event.title}</h1>
        <p className="text-meta text-ink-soft">
          Atualizado em {formatDateTime(event.updatedAt)}
          {event.lastReviewedAt ? ` · última revisão em ${formatDateTime(event.lastReviewedAt)} por ${event.reviewedBy ?? "—"}` : ""}
          {event.status === "PUBLISHED" ? (
            <>
              {" · "}
              <Link href={`/acontecimentos/${event.slug}`} className="text-link">
                Ver página pública
              </Link>
            </>
          ) : null}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <EventEditor
          key={event.updatedAt.toISOString()}
          event={{
            id: event.id,
            title: event.title,
            eventDate: event.eventDate.toISOString().slice(0, 10),
            themes: event.themes,
            editorNotes: event.editorNotes ?? "",
            status: event.status,
            content,
          }}
          sources={attached}
          lessons={lessons.map((l) => ({ ref: `${l.module.slug}/${l.slug}`, title: `${l.module.title} · ${l.title}` }))}
          aiAvailable={aiConfigured()}
        />

        <aside className="flex flex-col gap-4">
          <section aria-labelledby="verificacao" className="surface-card p-5">
            <h2 id="verificacao" className="text-lead font-semibold">
              Verificação para publicação
            </h2>
            <p className="mt-1 text-meta text-ink-soft">Calculada a partir do conteúdo salvo e das fontes aprovadas vinculadas.</p>
            {check.blocking.length ? (
              <ul className="mt-3 flex flex-col gap-2 text-meta">
                {check.blocking.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-danger">
                    <Icon name="alert" size={16} className="mt-0.5 flex-none" /> {b}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 flex items-center gap-2 text-meta text-success">
                <Icon name="check" size={16} /> Nenhum bloqueio.
              </p>
            )}
            {check.omitted.length ? (
              <details className="mt-3">
                <summary className="details-summary min-h-[44px] py-2 text-meta font-semibold text-action">{check.omitted.length} item(ns) serão omitidos da versão pública</summary>
                <ul className="mt-2 flex flex-col gap-1 text-meta text-ink-soft">
                  {check.omitted.map((o) => (
                    <li key={`${o.section}-${o.index}`}>
                      {SECTION_LABEL[o.section]}, item {o.index + 1}: {o.reason}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
            <div className="mt-4 border-t border-line-soft pt-4">
              <PublishEventForm eventId={event.id} publishable={check.publishable && !event.isDemo} />
            </div>
            {event.status === "PUBLISHED" ? (
              <form action={unpublishEventAction} className="mt-4 flex flex-col gap-2 border-t border-line-soft pt-4">
                <input type="hidden" name="eventId" value={event.id} />
                <label htmlFor="unpublish-reason" className="text-meta font-semibold">
                  Motivo para retirar do ar
                </label>
                <input id="unpublish-reason" name="reason" className="field-input" defaultValue="Retirado para revisão editorial." maxLength={500} />
                <div>
                  <SubmitButton variant="secondary" size="sm" pendingLabel="Retirando...">
                    Retirar do ar para revisão
                  </SubmitButton>
                </div>
              </form>
            ) : null}
          </section>

          {report ? (
            <section aria-labelledby="relatorio-ia" className="surface-card p-5">
              <h2 id="relatorio-ia" className="text-lead font-semibold">
                Relatório do rascunho de IA
              </h2>
              <p className="mt-1 text-meta text-ink-soft">
                Modelo {report.model} · {formatDateTime(report.generatedAt)}
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-meta">
                <li className={report.centralFactSupported ? "text-success" : "text-danger"}>
                  {report.centralFactSupported ? "Fato central sustentado por fonte." : "Fato central SEM sustentação nas fontes: não publique sem corrigir."}
                </li>
                {report.invalidReferences.length ? <li className="text-danger">Referências inválidas descartadas: {report.invalidReferences.join(", ")}</li> : null}
                {report.recommendationFlags.length ? (
                  <li className="text-danger">
                    Possível linguagem de recomendação:
                    <ul className="mt-1 list-disc pl-5">
                      {report.recommendationFlags.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </li>
                ) : null}
                {report.relationWarnings.length ? (
                  <li>
                    Conferir relação entre afirmação e fonte:
                    <ul className="mt-1 list-disc pl-5 text-ink-soft">
                      {report.relationWarnings.map((w, i) => (
                        <li key={i}>
                          {SECTION_LABEL[w.section as keyof typeof SECTION_LABEL] ?? w.section}: “{w.text}” — {w.problem}
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null}
                {report.removedItems.length ? (
                  <li>
                    Itens removidos por falta de referência válida:
                    <ul className="mt-1 list-disc pl-5 text-ink-soft">
                      {report.removedItems.map((r, i) => (
                        <li key={i}>
                          {SECTION_LABEL[r.section as keyof typeof SECTION_LABEL] ?? r.section}: “{r.text}”
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null}
                {report.unsupportedPoints.length ? (
                  <li>
                    Pontos que a IA não conseguiu sustentar:
                    <ul className="mt-1 list-disc pl-5 text-ink-soft">
                      {report.unsupportedPoints.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </li>
                ) : null}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="fontes-vinculadas" className="surface-card p-5">
            <h2 id="fontes-vinculadas" className="text-lead font-semibold">
              Fontes vinculadas
            </h2>
            {event.sources.length === 0 ? (
              <p className="mt-2 text-meta text-ink-soft">Nenhuma fonte vinculada.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-3">
                {event.sources.map(({ source }) => (
                  <li key={source.id} className="text-meta">
                    <a href={source.url} className="text-link font-semibold" target="_blank" rel="noopener noreferrer">
                      {source.title}
                    </a>
                    <p className="text-ink-soft">
                      {source.publisher.acronym ?? source.publisher.name} · {source.excerpts.length} trecho(s)
                      {source.reviewStatus !== "APPROVED" ? " · NÃO APROVADA (ignorada)" : ""}
                    </p>
                    <form action={detachSourceAction}>
                      <input type="hidden" name="eventId" value={event.id} />
                      <input type="hidden" name="sourceId" value={source.id} />
                      <SubmitButton variant="text" size="sm" pendingLabel="Removendo...">
                        Desvincular
                      </SubmitButton>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <form action={attachSourceAction} className="mt-4 flex flex-col gap-2 border-t border-line-soft pt-4">
              <input type="hidden" name="eventId" value={event.id} />
              <label htmlFor="attach-source" className="text-meta font-semibold">
                Vincular fonte aprovada
              </label>
              <select id="attach-source" name="sourceId" className="field-input" required defaultValue="">
                <option value="" disabled>
                  Escolha
                </option>
                {approvedSources.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title.length > 100 ? `${s.title.slice(0, 99)}…` : s.title} · {s.publisher.acronym ?? s.publisher.name}
                  </option>
                ))}
              </select>
              <div>
                <SubmitButton variant="secondary" size="sm" pendingLabel="Vinculando...">
                  Vincular
                </SubmitButton>
              </div>
              <p className="text-meta text-ink-soft">
                Fonte nova?{" "}
                <Link href="/admin/fontes/nova" className="text-link">
                  Cadastre e aprove
                </Link>{" "}
                antes de vincular.
              </p>
            </form>
          </section>

          <section aria-labelledby="licoes-relacionadas" className="surface-card p-5">
            <h2 id="licoes-relacionadas" className="text-lead font-semibold">
              Lições relacionadas
            </h2>
            {event.lessons.length === 0 ? (
              <p className="mt-2 text-meta text-ink-soft">Nenhuma lição vinculada.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-3">
                {event.lessons.map(({ lesson, relation }) => (
                  <li key={lesson.id} className="text-meta">
                    <p className="font-semibold">{lesson.title}</p>
                    <p className="text-ink-soft">{relation}</p>
                    <form action={unlinkLessonAction}>
                      <input type="hidden" name="eventId" value={event.id} />
                      <input type="hidden" name="lessonId" value={lesson.id} />
                      <SubmitButton variant="text" size="sm" pendingLabel="Removendo...">
                        Desvincular
                      </SubmitButton>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <form action={linkLessonAction} className="mt-4 flex flex-col gap-2 border-t border-line-soft pt-4">
              <input type="hidden" name="eventId" value={event.id} />
              <label htmlFor="link-lesson" className="text-meta font-semibold">
                Vincular lição
              </label>
              <select id="link-lesson" name="lessonId" className="field-input" required defaultValue="">
                <option value="" disabled>
                  Escolha
                </option>
                {lessons
                  .filter((l) => !linkedLessonIds.has(l.id))
                  .map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.module.title} · {l.title}
                    </option>
                  ))}
              </select>
              <label htmlFor="link-relation" className="text-meta font-semibold">
                Relação com o acontecimento
              </label>
              <input id="link-relation" name="relation" className="field-input" maxLength={300} placeholder="Ex.: explica como uma lei é aprovada e sancionada." />
              <div>
                <SubmitButton variant="secondary" size="sm" pendingLabel="Vinculando...">
                  Vincular
                </SubmitButton>
              </div>
            </form>
          </section>
        </aside>
      </div>
    </div>
  );
}
