import type { Metadata } from "next";
import Link from "next/link";
import { SignupBanner } from "@/components/auth/signup-gate";
import { LinkButton } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";
import { QUESTIONNAIRE_CONSENT_PURPOSE, QUESTIONNAIRE_CONSENT_VERSION } from "@/modules/account/consent-texts";
import {
  acceptQuestionnaireConsentAction,
  discardRetakeAction,
  startRetakeAction,
} from "@/modules/diagnostic/actions";
import { DIMENSIONS } from "@/modules/diagnostic/dimensions";
import { getActiveConsent, getCompletedAttempt, getInProgressAttempt } from "@/modules/diagnostic/service";

export const metadata: Metadata = { title: "Questionário de afinidades" };

function Explanation() {
  return (
    <section className="reading-measure">
      <h2 className="text-h3 font-semibold">Para que serve</h2>
      <p className="mt-2 text-body">
        São 50 situações do cotidiano, em cinco blocos de dez. Suas respostas mostram como você pondera valores em cinco dimensões e ordenam sua trilha: depois dos fundamentos
        em comum, as lições começam pelas perspectivas mais próximas das suas respostas e seguem para as demais.
      </p>
      <h2 className="mt-6 text-h3 font-semibold">O que ele não faz</h2>
      <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-body">
        <li>Não é um teste científico validado nem define sua identidade política.</li>
        <li>Não muda o conteúdo das lições, os fatos apresentados nem esconde correntes do catálogo.</li>
        <li>Não é usado para recomendar voto, partido ou corrente, e não é enviado a serviços de IA.</li>
        <li>Não gera distintivos públicos: respostas e resultado ficam visíveis só para você.</li>
      </ul>
      <h2 className="mt-6 text-h3 font-semibold">Dimensões</h2>
      <ul className="mt-2 flex flex-col divide-y divide-line-soft border-y border-line-soft">
        {DIMENSIONS.map((d) => (
          <li key={d.key} className="py-3">
            <p className="font-semibold">
              Bloco {d.block} · {d.title}
            </p>
            <p className="text-meta text-ink-soft">{d.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-meta text-ink-soft">
        As dimensões são uma modelagem inicial da Polis e se sobrepõem em vários temas.{" "}
        <Link href="/fontes-e-metodo#questionario" className="text-link">
          Ver metodologia completa
        </Link>
      </p>
    </section>
  );
}

export default async function QuestionnairePage({
  searchParams,
}: {
  searchParams: Promise<{ bemvindo?: string; erro?: string; pausado?: string; pendente?: string }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="page-frame py-8 md:py-12">
        <p className="eyebrow">Questionário de afinidades</p>
        <h1 className="mt-2 text-display-sm font-semibold md:text-display">Como você vê estas situações?</h1>
        <p className="mt-3 max-w-2xl text-lead text-ink-soft">É o primeiro passo depois de criar a conta e leva cerca de 15 minutos.</p>
        <SignupBanner path="/questionario" title="Crie uma conta para responder" className="mt-6">
          As respostas ficam salvas na sua conta, para você pausar e continuar depois.
        </SignupBanner>
        <div className="mt-10">
          <Explanation />
        </div>
      </div>
    );
  }

  const [consent, inProgress, completed] = await Promise.all([getActiveConsent(user.id), getInProgressAttempt(user.id), getCompletedAttempt(user.id)]);

  return (
    <div className="page-frame py-8 md:py-12">
      {params.bemvindo ? (
        <Notice tone="success" title="Conta criada" className="mb-6" role="status">
          Agora, responda ao questionário: é o primeiro passo para usar a Polis. Também enviamos um link de confirmação para o seu e-mail, necessário só para publicar nos
          fóruns.
        </Notice>
      ) : params.pendente && !completed ? (
        <Notice tone="info" title="Responda ao questionário para continuar" className="mb-6" role="status">
          Lições, acontecimentos e fóruns ficam disponíveis assim que você concluir as 50 situações.
        </Notice>
      ) : null}
      {params.pausado ? (
        <Notice tone="info" className="mb-6" role="status">
          Suas respostas foram salvas. Continue quando quiser; lições, acontecimentos e fóruns ficam disponíveis assim que você concluir.
        </Notice>
      ) : null}
      {/* Small screens: title, then the next action, then the explanation. */}
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:grid-rows-[auto_1fr]">
        <div>
          <p className="eyebrow">Questionário de afinidades · primeiro passo</p>
          <h1 className="mt-2 text-display-sm font-semibold md:text-display">Como você vê estas situações?</h1>
          <p className="mt-3 max-w-2xl text-lead text-ink-soft">
            Leva cerca de 15 minutos e é obrigatório para usar a Polis. Você pode pausar, voltar e revisar respostas; tudo é salvo automaticamente.
          </p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          {consent ? (
            <div className="surface-card p-6">
              <p className="eyebrow">Sua situação</p>
              {inProgress ? (
                <>
                  <h2 className="mt-2 text-h3 font-semibold">{completed ? "Nova tentativa em andamento" : "Questionário em andamento"}</h2>
                  <p className="mt-2 text-body text-ink-soft">
                    {inProgress.answers.length} de 50 situações respondidas.
                    {completed ? " Seu resultado anterior continua valendo até você concluir esta tentativa." : ""}
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <LinkButton href="/questionario/responder" icon="arrowRight">
                      Continuar de onde parou
                    </LinkButton>
                    {completed ? (
                      <form action={discardRetakeAction}>
                        <SubmitButton variant="text" pendingLabel="Descartando...">
                          Descartar nova tentativa
                        </SubmitButton>
                      </form>
                    ) : null}
                  </div>
                </>
              ) : completed ? (
                <>
                  <h2 className="mt-2 text-h3 font-semibold">Resultado disponível</h2>
                  <p className="mt-2 text-body text-ink-soft">Concluído em {completed.completedAt ? formatDate(completed.completedAt) : "—"}. Ao refazer, o novo resultado substitui o anterior.</p>
                  <div className="mt-5 flex flex-col gap-3">
                    <LinkButton href="/questionario/resultado" icon="arrowRight">
                      Ver resultado
                    </LinkButton>
                    <form action={startRetakeAction}>
                      <SubmitButton variant="secondary" block pendingLabel="Preparando...">
                        Refazer questionário
                      </SubmitButton>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mt-2 text-h3 font-semibold">Pronto para começar</h2>
                  <div className="mt-5">
                    <LinkButton href="/questionario/responder" icon="arrowRight" block>
                      Começar
                    </LinkButton>
                  </div>
                </>
              )}
              <p className="mt-5 flex items-start gap-2 text-meta text-ink-soft">
                <Icon name="lock" size={16} className="mt-0.5 flex-none" />
                <span>
                  Autorização registrada em {formatDate(consent.grantedAt)} (versão {consent.version}). Você pode revogá-la em{" "}
                  <Link href="/conta/privacidade" className="text-link">
                    Privacidade e dados
                  </Link>
                  .
                </span>
              </p>
            </div>
          ) : (
            <form action={acceptQuestionnaireConsentAction} className="surface-card p-6">
              <p className="eyebrow">Autorização específica</p>
              <h2 className="mt-2 text-h3 font-semibold">Tratamento das respostas</h2>
              <p className="mt-2 text-meta text-ink-soft">
                Respostas a temas políticos são dados sensíveis. Esta autorização é separada dos termos de uso e pode ser revogada a qualquer momento, o que apaga respostas e
                resultado.
              </p>
              <p className="mt-4 flex gap-3 rounded-control bg-sand p-3 text-meta text-sand-ink">
                <Icon name="alert" size={18} className="mt-0.5 flex-none" />
                <span>
                  <strong>Responder é condição para usar lições, acontecimentos e fóruns.</strong> Sem a autorização, você continua com acesso à sua conta e pode exportar seus
                  dados ou excluir a conta em{" "}
                  <Link href="/conta/privacidade" className="font-semibold underline underline-offset-2">
                    Privacidade e dados
                  </Link>
                  .
                </span>
              </p>
              {params.erro === "consentimento" ? (
                <Notice tone="error" className="mt-4" role="alert">
                  Marque a autorização para começar.
                </Notice>
              ) : null}
              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-control border border-control p-4 text-body has-[:checked]:border-action has-[:checked]:bg-selected">
                <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 flex-none accent-[var(--color-action)]" />
                <span>
                  Autorizo: {QUESTIONNAIRE_CONSENT_PURPOSE}
                  <span className="mt-1 block text-meta text-ink-soft">Versão {QUESTIONNAIRE_CONSENT_VERSION}</span>
                </span>
              </label>
              <div className="mt-5 flex flex-col gap-3">
                <SubmitButton icon="arrowRight" block pendingLabel="Registrando...">
                  Autorizar e começar
                </SubmitButton>
              </div>
            </form>
          )}
        </aside>

        <div className="lg:col-start-1">
          <Explanation />
        </div>
      </div>
    </div>
  );
}
