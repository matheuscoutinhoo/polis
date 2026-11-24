import type { Metadata } from "next";
import Link from "next/link";
import { DeleteAccountForm } from "@/components/account/account-forms";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { deleteQuestionnaireDataAction, revokeQuestionnaireConsentAction } from "@/modules/diagnostic/actions";
import { getActiveConsent } from "@/modules/diagnostic/service";

export const metadata: Metadata = { title: "Privacidade e dados" };

const NOTICES: Record<string, { tone: "success" | "info"; text: string }> = {
  "questionario-apagado": { tone: "success", text: "Respostas e resultado do questionário apagados. Sua trilha voltou à ordem geral." },
  "consentimento-revogado": {
    tone: "success",
    text: "Autorização revogada. Respostas e resultado foram apagados e a trilha voltou à ordem geral. Você pode autorizar de novo quando quiser.",
  },
};

const CONSENT_KIND_LABEL: Record<string, string> = {
  TERMS: "Termos de uso e política de privacidade",
  QUESTIONNAIRE: "Tratamento das respostas do questionário",
};

export default async function PrivacyPage({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const user = await requireUser("/conta/privacidade");
  const { aviso } = await searchParams;
  const [consents, activeQuestionnaireConsent, attempts, contentCounts] = await Promise.all([
    db.consentRecord.findMany({ where: { userId: user.id }, orderBy: { grantedAt: "desc" } }),
    getActiveConsent(user.id),
    db.questionnaireAttempt.findMany({ where: { userId: user.id }, select: { status: true, _count: { select: { answers: true } } } }),
    Promise.all([db.topic.count({ where: { authorId: user.id, status: { not: "DELETED" } } }), db.comment.count({ where: { authorId: user.id, status: { not: "DELETED" } } })]),
  ]);
  const notice = aviso ? NOTICES[aviso] : undefined;
  const hasQuestionnaireData = attempts.length > 0;
  const [topicCount, commentCount] = contentCounts;

  return (
    <div className="page-frame py-8 md:py-12">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/conta" className="text-link">
          Sua conta
        </Link>{" "}
        / Privacidade e dados
      </nav>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">Privacidade e dados</h1>
      <p className="mt-2 max-w-3xl text-lead text-ink-soft">
        Veja o que a Polis guarda sobre você, exporte uma cópia, revogue autorizações e exclua dados. A política completa está em{" "}
        <Link href="/privacidade" className="text-link">
          Política de privacidade
        </Link>
        .
      </p>

      {notice ? (
        <Notice tone={notice.tone} className="mt-6" role="status">
          {notice.text}
        </Notice>
      ) : null}

      <div className="mt-8 flex flex-col gap-6">
        <section aria-labelledby="questionario" className="surface-card p-5 md:p-6">
          <h2 id="questionario" className="text-h3 font-semibold">
            Questionário de afinidades
          </h2>
          <p className="mt-1 text-meta text-ink-soft">
            Respostas e resultado são dados sensíveis: ficam privados, não são enviados a serviços de IA e servem apenas para ordenar sua trilha.
          </p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-meta text-ink-soft">Autorização</dt>
              <dd className="mt-1 text-body">
                {activeQuestionnaireConsent ? (
                  <>
                    <Badge tone="mint">Ativa</Badge> desde {formatDateTime(activeQuestionnaireConsent.grantedAt)} · versão {activeQuestionnaireConsent.version}
                  </>
                ) : (
                  <Badge tone="neutral">Não autorizada</Badge>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-meta text-ink-soft">Dados guardados</dt>
              <dd className="mt-1 text-body">
                {hasQuestionnaireData
                  ? attempts
                      .map((a) => (a.status === "COMPLETED" ? `resultado concluído (${a._count.answers} respostas)` : `tentativa em andamento (${a._count.answers} respostas)`))
                      .join("; ")
                  : "Nenhuma resposta guardada."}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hasQuestionnaireData ? (
              <ConfirmDialog
                triggerLabel="Apagar respostas e resultado"
                triggerVariant="secondary"
                triggerIcon="trash"
                title="Apagar respostas e resultado?"
                description="As respostas, o resultado e a tentativa em andamento serão apagados. A autorização continua ativa, então você pode responder de novo quando quiser. A trilha volta à ordem geral."
                confirmLabel="Apagar dados do questionário"
                pendingLabel="Apagando..."
                action={deleteQuestionnaireDataAction}
              />
            ) : null}
            {activeQuestionnaireConsent ? (
              <ConfirmDialog
                triggerLabel="Revogar autorização"
                triggerVariant="secondary"
                title="Revogar a autorização do questionário?"
                description="O tratamento é interrompido: respostas e resultado são apagados imediatamente e a trilha volta à ordem geral. O registro da autorização e da revogação, com data e versão, é mantido como comprovação."
                confirmLabel="Revogar e apagar"
                pendingLabel="Revogando..."
                action={revokeQuestionnaireConsentAction}
              />
            ) : (
              <Link href="/questionario" className="text-link inline-flex min-h-[44px] items-center gap-1.5">
                Conhecer o questionário <Icon name="arrowRight" size={16} />
              </Link>
            )}
          </div>
        </section>

        <section aria-labelledby="autorizacoes" className="surface-card p-5 md:p-6">
          <h2 id="autorizacoes" className="text-h3 font-semibold">
            Registro de autorizações
          </h2>
          <p className="mt-1 text-meta text-ink-soft">Finalidade, versão e data de cada aceite. O aceite dos termos é separado da autorização do questionário.</p>
          {consents.length ? (
            <ul className="mt-4 flex flex-col divide-y divide-line-soft border-y border-line-soft">
              {consents.map((c) => (
                <li key={c.id} className="py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{CONSENT_KIND_LABEL[c.kind] ?? c.kind}</p>
                    {c.revokedAt ? <Badge tone="neutral">Revogada em {formatDateTime(c.revokedAt)}</Badge> : <Badge tone="mint">Ativa</Badge>}
                  </div>
                  <p className="mt-1 text-meta text-ink-soft">
                    Versão {c.version} · registrada em {formatDateTime(c.grantedAt)}
                  </p>
                  <p className="mt-1 text-meta">{c.purpose}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-body text-ink-soft">Nenhum registro.</p>
          )}
        </section>

        <section aria-labelledby="exportar" className="surface-card p-5 md:p-6">
          <h2 id="exportar" className="text-h3 font-semibold">
            Exportar meus dados
          </h2>
          <p className="mt-1 text-body text-ink-soft">
            Arquivo JSON com conta, autorizações, respostas e resultado do questionário, progresso, XP, conquistas, fóruns seguidos, publicações e denúncias feitas por você. Guarde o
            arquivo com cuidado: ele contém dados sensíveis.
          </p>
          <a href="/api/conta/exportar" className="btn btn-secondary mt-4" download>
            <Icon name="download" size={18} /> Baixar meus dados
          </a>
        </section>

        <section aria-labelledby="excluir" className="rounded-panel border border-danger-bg bg-surface p-5 md:p-6">
          <h2 id="excluir" className="text-h3 font-semibold">
            Excluir conta
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-body">
            <li>Apagamos respostas e resultado do questionário, autorizações, progresso, XP, conquistas, fóruns seguidos e sessões.</li>
            <li>
              Você tem {topicCount} {topicCount === 1 ? "tópico publicado" : "tópicos publicados"} e {commentCount} {commentCount === 1 ? "comentário" : "comentários"}. Você escolhe se
              os textos ficam nas discussões sem vínculo com você (autor exibido como “Participante removido”) ou se são apagados.
            </li>
            <li>Denúncias que você fez continuam no histórico de moderação, sem identificar você.</li>
            <li>Registros técnicos (logs) não guardam respostas do questionário e são descartados conforme a política de privacidade.</li>
          </ul>
          <div className="mt-5">
            <DeleteAccountForm />
          </div>
        </section>
      </div>
    </div>
  );
}
