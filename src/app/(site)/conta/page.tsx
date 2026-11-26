import type { Metadata } from "next";
import Link from "next/link";
import { DisplayNameForm } from "@/components/account/account-forms";
import { ChangePasswordForm, ResendVerificationButton } from "@/components/auth/auth-forms";
import { PathModeForm } from "@/components/questionnaire/path-mode-form";
import { joinNames } from "@/components/questionnaire/result-report";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate, plural } from "@/lib/format";
import { isSuspended, requireUser } from "@/lib/session";
import { startRetakeAction } from "@/modules/diagnostic/actions";
import { listResults } from "@/modules/diagnostic/service";
import { ACHIEVEMENTS, getLearnerSummary } from "@/modules/learning/progress";

export const metadata: Metadata = { title: "Sua conta" };

function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="surface-card p-5 md:p-6">
      <h2 id={id} className="text-h3 font-semibold">
        {title}
      </h2>
      {description ? <p className="mt-1 text-meta text-ink-soft">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function AccountPage() {
  const user = await requireUser("/conta");
  const [summary, results] = await Promise.all([getLearnerSummary(user.id), listResults(user.id)]);
  const latest = results[0] ?? null;
  const result = latest?.result ?? null;
  const suspended = isSuspended(user);
  const affinityAvailable = Boolean(result && result.affinityStatus === "OK");

  return (
    <div className="page-frame py-8 md:py-12">
      <p className="eyebrow">Conta</p>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">Sua conta</h1>
      <p className="mt-2 text-lead text-ink-soft">Conta criada em {formatDate(user.createdAt)}.</p>

      <div className="mt-6 flex flex-col gap-4">
        {suspended ? (
          <Notice tone="warning" title="Participação nos fóruns suspensa" role="status">
            Até {user.suspendedUntil ? formatDate(user.suspendedUntil) : "—"}. Motivo informado pela moderação: {user.suspensionReason ?? "não informado"}. Você continua com acesso às
            lições, aos acontecimentos e aos seus dados.
          </Notice>
        ) : null}
        {!user.emailVerified ? (
          <Notice tone="info" title="Confirme seu e-mail para publicar nos fóruns" role="status">
            <p>Enviamos um link para {user.email}. Lições, questionário e acontecimentos funcionam sem a confirmação.</p>
            <div className="mt-3">
              <ResendVerificationButton email={user.email} />
            </div>
          </Notice>
        ) : null}
      </div>

      <section aria-labelledby="questionario" className="surface-card mt-6 grid gap-5 p-5 md:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[10px] bg-blue text-blue-ink" aria-hidden="true">
            <Icon name="layers" size={24} />
          </span>
          <div className="min-w-0">
            <h2 id="questionario" className="text-h3 font-semibold">
              Questionário de afinidades
            </h2>
            {latest ? (
              <>
                <p className="mt-1 text-body">
                  Último resultado em {formatDate(latest.completedAt)}
                  {latest.result.closest.length ? `: mais próximo de ${joinNames(latest.result.closest)}` : ""}.
                </p>
                <p className="mt-1 text-meta text-ink-soft">
                  {plural(results.length, "resultado guardado", "resultados guardados")}, visíveis só para você. Refaça quando quiser e compare as respostas ao longo do tempo.
                </p>
              </>
            ) : (
              <p className="mt-1 text-body text-ink-soft">Você ainda não concluiu o questionário. Ele ordena a sua trilha e é condição para usar lições, acontecimentos e fóruns.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          {latest ? (
            <>
              <Link href="/questionario/resultado" className="btn btn-secondary">
                Ver resultado
              </Link>
              <Link href="/conta/resultados" className="btn btn-secondary">
                <Icon name="scale" size={18} /> {results.length > 1 ? "Comparar resultados" : "Histórico"}
              </Link>
              <form action={startRetakeAction}>
                <SubmitButton block pendingLabel="Preparando...">
                  Refazer questionário
                </SubmitButton>
              </form>
            </>
          ) : (
            <Link href="/questionario" className="btn btn-primary">
              Responder ao questionário <Icon name="arrowRight" size={18} />
            </Link>
          )}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Section id="perfil" title="Perfil público" description="Nos fóruns, outras pessoas veem apenas o nome de exibição e o que você publica.">
          <DisplayNameForm currentName={user.name} />
        </Section>

        <Section id="acesso" title="Acesso" description="O e-mail é usado para entrar, confirmar a conta e recuperar a senha. Ele não é exibido publicamente.">
          <p className="flex flex-wrap items-center gap-2 text-body">
            <span className="font-semibold">{user.email}</span>
            <Badge tone={user.emailVerified ? "mint" : "warning"}>{user.emailVerified ? "Confirmado" : "Não confirmado"}</Badge>
          </p>
          <div className="mt-5 border-t border-line-soft pt-5">
            <h3 className="text-body font-semibold">Alterar senha</h3>
            <div className="mt-3">
              <ChangePasswordForm />
            </div>
          </div>
        </Section>

        <Section id="trilha" title="Ordem da trilha" description="A escolha muda apenas a ordem das lições de perspectivas. O catálogo continua completo.">
          <PathModeForm
            current={user.pathMode}
            affinityAvailable={affinityAvailable}
            unavailableReason={result ? undefined : "Disponível depois de responder ao questionário."}
          />
          {!result ? (
            <p className="mt-3 text-meta text-ink-soft">
              A trilha por afinidade depende do{" "}
              <Link href="/questionario" className="text-link">
                questionário de afinidades
              </Link>
              .
            </p>
          ) : null}
        </Section>

        <Section id="progresso" title="Progresso" description="XP e conquistas registram compreensão e continuidade. Não são públicos.">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-meta text-ink-soft">Pontos de aprendizado</dt>
              <dd className="text-h2 font-semibold">{summary.xp} XP</dd>
            </div>
            <div>
              <dt className="text-meta text-ink-soft">Lições concluídas</dt>
              <dd className="text-h2 font-semibold">{summary.completedCount}</dd>
            </div>
          </dl>
          {summary.achievements.length ? (
            <ul className="mt-4 flex flex-col gap-2">
              {summary.achievements.map((a) => (
                <li key={a.key} className="flex items-start gap-2 text-body">
                  <Icon name="check" size={18} className="mt-0.5 flex-none text-action" />
                  <span>
                    <span className="font-semibold">{ACHIEVEMENTS[a.key]?.title ?? a.key}</span>{" "}
                    <span className="text-meta text-ink-soft">
                      · {ACHIEVEMENTS[a.key]?.description} Em {formatDate(a.awardedAt)}.
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-meta text-ink-soft">Nenhuma conquista ainda.</p>
          )}
        </Section>
      </div>

      <section className="mt-6 flex flex-col gap-4 rounded-panel bg-lilac p-5 md:flex-row md:items-center md:p-6">
        <Icon name="lock" size={28} className="flex-none text-lilac-ink" />
        <div className="flex-1">
          <h2 className="text-lead font-semibold">Privacidade e dados</h2>
          <p className="text-body text-ink-soft">Autorizações, exportação dos seus dados, exclusão das respostas do questionário e exclusão da conta.</p>
        </div>
        <Link href="/conta/privacidade" className="text-link inline-flex min-h-[44px] items-center gap-1.5 font-semibold">
          Gerenciar privacidade <Icon name="arrowRight" size={16} />
        </Link>
      </section>
    </div>
  );
}
