import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LearningPathView } from "@/components/polis/learning-path";
import { PathModeForm } from "@/components/questionnaire/path-mode-form";
import { AffinityList, DimensionScale } from "@/components/questionnaire/result-components";
import { LinkButton } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { deleteQuestionnaireDataAction, startRetakeAction } from "@/modules/diagnostic/actions";
import { PROFILE_BY_KEY } from "@/modules/diagnostic/profiles";
import { getActiveResult } from "@/modules/diagnostic/service";
import { getLearningPath } from "@/modules/learning/catalog";
import { getLearnerSummary } from "@/modules/learning/progress";

export const metadata: Metadata = { title: "Resultado do questionário", robots: { index: false } };

function joinNames(keys: string[]) {
  const names = keys.map((k) => PROFILE_BY_KEY[k as keyof typeof PROFILE_BY_KEY]?.name ?? k);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} e ${names.at(-1)}`;
}

export default async function ResultPage() {
  const user = await requireUser("/questionario/resultado");
  const result = await getActiveResult(user.id);
  if (!result) redirect("/questionario");
  const [path, summary] = await Promise.all([getLearningPath(user, result), getLearnerSummary(user.id)]);
  const next = path.ordered.find((l) => !summary.progressByLesson.get(l.id)?.completedAt) ?? null;
  const comparable = result.affinities.filter((a) => a.comparable);

  return (
    <div className="page-frame py-8 md:py-12">
      <p className="eyebrow">Resultado privado</p>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">O que suas respostas indicam</h1>
      <p className="mt-3 max-w-3xl text-lead text-ink-soft">
        Calculado em {formatDate(result.computedAt)} com a versão {result.scoringVersion} do método. {result.answeredCount} situações respondidas, {result.unknownCount} com “Não sei”.
      </p>
      <Notice tone="info" className="mt-6 max-w-3xl">
        Este resultado é visível só para você e serve apenas para ordenar seus estudos. Não é um diagnóstico da sua identidade política, não tem precisão científica e não muda o
        conteúdo das lições.
      </Notice>

      <section aria-labelledby="sintese" className="mt-10 max-w-3xl">
        <h2 id="sintese" className="text-h2 font-semibold">
          Síntese
        </h2>
        {result.affinityStatus === "OK" ? (
          <div className="mt-3 flex flex-col gap-3 text-reading">
            {result.closest.length ? (
              <p>
                Suas respostas se aproximam de <strong>{joinNames(result.closest)}</strong>
                {result.closest.length > 1 ? ", com índices de proximidade muito parecidos" : ""}. Essa aproximação considera apenas as dimensões em que cada corrente tem
                posição de referência.
              </p>
            ) : (
              <p>
                Suas respostas não se aproximam fortemente de nenhuma das correntes de referência. As mais próximas foram {joinNames(comparable.slice(0, 2).map((a) => a.key))}.
              </p>
            )}
            {result.tensionDimensions.length ? (
              <p>Você apresentou posições diferentes em alguns temas; os detalhes estão em cada dimensão abaixo.</p>
            ) : null}
          </div>
        ) : (
          <p className="mt-3 text-reading">
            Há respostas válidas suficientes em menos de duas dimensões, por isso não calculamos afinidades. Sua trilha segue a ordem geral; você pode refazer o questionário
            quando quiser.
          </p>
        )}
      </section>

      <section aria-labelledby="dimensoes" className="mt-10">
        <h2 id="dimensoes" className="text-h2 font-semibold">
          Cinco dimensões independentes
        </h2>
        <p className="mt-2 max-w-3xl text-body text-ink-soft">
          Cada dimensão é calculada separadamente. Os dois polos não são “certo” e “errado”, nem esquerda e direita: são ênfases diferentes diante de dilemas reais.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {result.dimensions.map((dimension) => (
            <DimensionScale key={dimension.key} result={dimension} />
          ))}
        </div>
      </section>

      {result.affinityStatus === "OK" ? (
        <section aria-labelledby="correntes" className="mt-10 max-w-4xl">
          <h2 id="correntes" className="text-h2 font-semibold">
            Correntes de referência
          </h2>
          <p className="mt-2 text-body text-ink-soft">
            Cada corrente tem faixas de referência por dimensão, documentadas com fontes em{" "}
            <Link href="/fontes-e-metodo#perfis" className="text-link">
              Fontes e método
            </Link>
            . Todas as correntes continuam disponíveis no catálogo.
          </p>
          <div className="mt-5">
            <AffinityList affinities={result.affinities} />
          </div>
        </section>
      ) : null}

      <section aria-labelledby="trilha" className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <h2 id="trilha" className="text-h2 font-semibold">
            Sua trilha
          </h2>
          <p className="mt-2 text-body text-ink-soft">A introdução é comum. Depois, a ordem das perspectivas segue a trilha escolhida ao lado.</p>
          <div className="mt-5">
            <LearningPathView path={path} progress={summary.progressByLesson} nextLessonId={next?.id ?? null} compact />
          </div>
          {next ? (
            <div className="mt-5">
              <LinkButton href={`/aprender/${next.moduleSlug}/${next.slug}`} icon="arrowRight">
                Continuar aprendendo
              </LinkButton>
            </div>
          ) : null}
        </div>
        <aside className="flex flex-col gap-6">
          <div className="surface-card p-5">
            <h3 className="text-lead font-semibold">Escolha da trilha</h3>
            <div className="mt-3">
              <PathModeForm current={user.pathMode} affinityAvailable={result.affinityStatus === "OK"} />
            </div>
          </div>
          <div className="surface-card p-5">
            <h3 className="text-lead font-semibold">Limites deste resultado</h3>
            <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-meta text-ink-soft">
              <li>As dimensões e as faixas das correntes são uma modelagem editorial, não um teste validado.</li>
              <li>“Não sei” não conta como posição; dimensões com menos de 6 respostas válidas ficam fora.</li>
              <li>Empates são exibidos como empate; a trilha usa uma ordem editorial fixa para desempatar.</li>
              <li>Leituras, cliques, exercícios e fóruns nunca alteram este resultado.</li>
            </ul>
          </div>
          <div className="surface-card flex flex-col gap-3 p-5">
            <h3 className="text-lead font-semibold">Seus dados</h3>
            <form action={startRetakeAction}>
              <SubmitButton variant="secondary" block pendingLabel="Preparando...">
                Refazer questionário
              </SubmitButton>
            </form>
            <ConfirmDialog
              triggerLabel="Apagar respostas e resultado"
              triggerVariant="text"
              title="Apagar respostas e resultado?"
              description="Remove respostas e mapa. O progresso das lições é gerenciado separadamente e continua salvo."
              confirmLabel="Apagar dados"
              pendingLabel="Apagando..."
              action={deleteQuestionnaireDataAction}
            />
          </div>
        </aside>
      </section>
    </div>
  );
}
