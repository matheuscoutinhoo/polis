import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icon";
import { formatDateTime } from "@/lib/format";
import { db } from "@/lib/db";
import { ACTION_LABEL } from "@/modules/admin/labels";
import { adminDashboardCounts, aiUsageLast24h, recentModerationLog } from "@/modules/admin/moderation";
import { aiConfigured } from "@/modules/ai/provider";
import { mailConfigured } from "@/lib/mailer";

export const metadata: Metadata = { title: "Painel" };

function Stat({ href, icon, label, value, hint }: { href: string; icon: IconName; label: string; value: number; hint?: string }) {
  return (
    <Link href={href} className="topic-card surface-card flex items-start gap-3 p-5">
      <Icon name={icon} size={24} className="mt-1 flex-none text-action" />
      <span>
        <span className="block text-meta text-ink-soft">{label}</span>
        <span className="block text-h2 font-semibold">{value}</span>
        {hint ? <span className="block text-meta text-ink-soft">{hint}</span> : null}
      </span>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const [counts, log, aiLast24h] = await Promise.all([adminDashboardCounts(), recentModerationLog(15), aiUsageLast24h()]);
  const actors = await db.user.findMany({ where: { id: { in: log.map((l) => l.actorId).filter((v): v is string => Boolean(v)) } }, select: { id: true, name: true } });
  const actorName = new Map(actors.map((a) => [a.id, a.name]));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-display-sm font-semibold">Painel</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat href="/admin/moderacao#denuncias" icon="flag" label="Denúncias abertas" value={counts.openReports} />
        <Stat href="/admin/moderacao#sinalizacoes" icon="alert" label="Sinalizações de conteúdo editorial" value={counts.openFlags} />
        <Stat href="/admin/fontes?status=PENDING" icon="document" label="Fontes aguardando revisão" value={counts.pendingSources} />
        <Stat href="/admin/acontecimentos" icon="event" label="Acontecimentos em rascunho ou revisão" value={counts.drafts} hint={`${counts.published} publicados`} />
        <Stat href="/admin/moderacao#suspensoes" icon="lock" label="Contas com publicação suspensa" value={counts.suspended} />
        <div className="surface-card flex items-start gap-3 p-5">
          <Icon name="layers" size={24} className="mt-1 flex-none text-action" />
          <span>
            <span className="block text-meta text-ink-soft">Questionários concluídos</span>
            <span className="block text-h2 font-semibold">{counts.completedQuestionnaires}</span>
            <span className="block text-meta text-ink-soft">Apenas a contagem total; resultados individuais não são exibidos.</span>
          </span>
        </div>
      </div>

      <section aria-labelledby="servicos" className="surface-card p-5">
        <h2 id="servicos" className="text-h3 font-semibold">
          Serviços externos
        </h2>
        <ul className="mt-3 flex flex-col gap-2 text-body">
          <li>
            <span className="font-semibold">IA (OpenAI):</span> {aiConfigured() ? `configurada (modelo ${process.env.OPENAI_MODEL || "gpt-6.2-sol"})` : "não configurada — perguntas e rascunhos ficam indisponíveis; o restante funciona."}
            {aiLast24h.length ? (
              <span className="text-ink-soft"> Últimas 24 h: {aiLast24h.map((g) => `${g.status} ${g._count._all}`).join(", ")}.</span>
            ) : null}
          </li>
          <li>
            <span className="font-semibold">E-mail:</span>{" "}
            {mailConfigured()
              ? "configurado (SMTP)."
              : "não configurado — em desenvolvimento, as mensagens vão para .dev-mail/outbox.jsonl; em produção, confirmação de e-mail e recuperação de senha não são enviadas."}
          </li>
        </ul>
      </section>

      <section aria-labelledby="registro">
        <h2 id="registro" className="text-h3 font-semibold">
          Registro recente de decisões
        </h2>
        {log.length === 0 ? (
          <p className="mt-2 text-body text-ink-soft">Nenhuma decisão registrada.</p>
        ) : (
          <ul className="surface-card mt-3 divide-y divide-line-soft">
            {log.map((entry) => (
              <li key={entry.id} className="p-4 text-meta">
                <p>
                  <span className="font-semibold">{ACTION_LABEL[entry.action] ?? entry.action}</span> · {entry.targetType} · {formatDateTime(entry.createdAt)} ·{" "}
                  {entry.actorId ? (actorName.get(entry.actorId) ?? "administrador removido") : "sistema"}
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
