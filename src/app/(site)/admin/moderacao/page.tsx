import type { Metadata } from "next";
import Link from "next/link";
import { ResolveFlagForm, ResolveReportForm } from "@/components/admin/admin-forms";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import { db } from "@/lib/db";
import { formatDate, formatDateTime } from "@/lib/format";
import { liftSuspensionAction } from "@/modules/admin/actions";
import { ACTION_LABEL, FLAG_REASON_LABEL } from "@/modules/admin/labels";
import { listOpenFlags, listOpenReports, listSuspendedUsers, recentModerationLog } from "@/modules/admin/moderation";
import { REPORT_REASON_LABEL } from "@/modules/community/rules";

export const metadata: Metadata = { title: "Moderação" };

const TARGET_LABEL: Record<string, string> = { FORUM: "Fórum", TOPIC: "Tópico", COMMENT: "Comentário" };
const STATUS_LABEL: Record<string, string> = { VISIBLE: "Visível", REMOVED: "Removido", DELETED: "Excluído pela pessoa autora" };
const NOTICES: Record<string, string> = {
  "denuncia-resolvida": "Denúncia resolvida e decisão registrada.",
  "sinalizacao-resolvida": "Sinalização resolvida e registrada.",
  "suspensao-encerrada": "Suspensão encerrada e decisão registrada.",
};

export default async function ModerationPage({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const { aviso } = await searchParams;
  const [reports, flags, suspended, log] = await Promise.all([listOpenReports(), listOpenFlags(), listSuspendedUsers(), recentModerationLog(40)]);
  const authorIds = [...new Set(reports.map((r) => r.target?.authorId).filter((v): v is string => Boolean(v)))];
  const actorIds = [...new Set(log.map((l) => l.actorId).filter((v): v is string => Boolean(v)))];
  const people = await db.user.findMany({ where: { id: { in: [...authorIds, ...actorIds] } }, select: { id: true, name: true, suspendedUntil: true } });
  const person = new Map(people.map((p) => [p.id, p]));

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-display-sm font-semibold">Moderação</h1>
        <p className="mt-1 text-body text-ink-soft">
          Analise condutas, não opiniões. Toda decisão exige motivo e fica registrada. A IA não participa das decisões.
        </p>
        {aviso && NOTICES[aviso] ? (
          <Notice tone="success" className="mt-4" role="status">
            {NOTICES[aviso]}
          </Notice>
        ) : null}
      </div>

      <section aria-labelledby="denuncias" className="scroll-mt-24">
        <h2 id="denuncias" className="text-h2 font-semibold">
          Denúncias abertas ({reports.length})
        </h2>
        {reports.length === 0 ? (
          <p className="mt-2 text-body text-ink-soft">Nenhuma denúncia aberta.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-4">
            {reports.map(({ report, target }) => {
              const author = target?.authorId ? person.get(target.authorId) : null;
              return (
                <li key={report.id} className="surface-card grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="warning">{REPORT_REASON_LABEL[report.reason] ?? report.reason}</Badge>
                      <span className="text-meta text-ink-soft">
                        {TARGET_LABEL[report.targetType]} · denunciado em {formatDateTime(report.createdAt)}
                      </span>
                    </div>
                    {report.details ? <p className="mt-2 text-meta">Detalhes da denúncia: {report.details}</p> : null}
                    {target ? (
                      <div className="mt-3 rounded-card bg-paper p-4">
                        <p className="text-meta text-ink-soft">
                          {STATUS_LABEL[target.status]} · autoria: {author ? author.name : "conta removida"}
                          {author?.suspendedUntil && author.suspendedUntil > new Date() ? ` (suspensa até ${formatDate(author.suspendedUntil)})` : ""}
                        </p>
                        <p className="mt-1 font-semibold">{target.title}</p>
                        <p className="mt-1 whitespace-pre-line break-words text-meta">{target.text.slice(0, 1500)}</p>
                        <Link href={target.href} className="text-link mt-2 inline-flex text-meta" target="_blank">
                          Abrir no contexto
                        </Link>
                      </div>
                    ) : (
                      <p className="mt-3 text-meta text-ink-soft">O conteúdo não existe mais.</p>
                    )}
                  </div>
                  <ResolveReportForm reportId={report.id} canCloseTopic={target?.kind === "TOPIC" || target?.kind === "COMMENT"} hasAuthor={Boolean(target?.authorId)} />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="sinalizacoes" className="scroll-mt-24">
        <h2 id="sinalizacoes" className="text-h2 font-semibold">
          Sinalizações em lições e acontecimentos ({flags.length})
        </h2>
        {flags.length === 0 ? (
          <p className="mt-2 text-body text-ink-soft">Nenhuma sinalização aberta.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-4">
            {flags.map(({ flag, title, href }) => (
              <li key={flag.id} className="surface-card grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="sand">{FLAG_REASON_LABEL[flag.reason] ?? flag.reason}</Badge>
                    <span className="text-meta text-ink-soft">
                      {flag.targetType === "EVENT" ? "Acontecimento" : "Lição"} · {formatDateTime(flag.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold">
                    {href ? (
                      <Link href={href} className="text-link" target="_blank">
                        {title}
                      </Link>
                    ) : (
                      title
                    )}
                  </p>
                  {flag.details ? <p className="mt-1 whitespace-pre-line text-meta">{flag.details}</p> : null}
                </div>
                <ResolveFlagForm flagId={flag.id} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="suspensoes" className="scroll-mt-24">
        <h2 id="suspensoes" className="text-h2 font-semibold">
          Contas com publicação suspensa ({suspended.length})
        </h2>
        {suspended.length === 0 ? (
          <p className="mt-2 text-body text-ink-soft">Nenhuma suspensão ativa.</p>
        ) : (
          <ul className="surface-card mt-4 divide-y divide-line-soft">
            {suspended.map((user) => (
              <li key={user.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                <div className="text-meta">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-ink-soft">
                    Até {user.suspendedUntil ? formatDate(user.suspendedUntil) : "—"} · {user.suspensionReason}
                  </p>
                </div>
                <form action={liftSuspensionAction} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input type="hidden" name="userId" value={user.id} />
                  <label htmlFor={`lift-${user.id}`} className="sr-only">
                    Motivo para encerrar a suspensão
                  </label>
                  <input id={`lift-${user.id}`} name="reason" className="field-input" defaultValue="Suspensão encerrada após revisão." maxLength={300} />
                  <SubmitButton variant="secondary" size="sm" pendingLabel="Encerrando...">
                    Encerrar suspensão
                  </SubmitButton>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="registro">
        <h2 id="registro" className="text-h2 font-semibold">
          Registro de decisões
        </h2>
        {log.length === 0 ? (
          <p className="mt-2 text-body text-ink-soft">Nenhuma decisão registrada.</p>
        ) : (
          <ul className="surface-card mt-4 divide-y divide-line-soft">
            {log.map((entry) => (
              <li key={entry.id} className="p-4 text-meta">
                <p>
                  <span className="font-semibold">{ACTION_LABEL[entry.action] ?? entry.action}</span> · {entry.targetType} · {formatDateTime(entry.createdAt)} ·{" "}
                  {entry.actorId ? (person.get(entry.actorId)?.name ?? "administrador removido") : "sistema"}
                </p>
                <p className="mt-1 text-ink-soft">Motivo: {entry.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
