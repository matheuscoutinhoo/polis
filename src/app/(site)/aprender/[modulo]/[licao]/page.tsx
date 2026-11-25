import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PreviewContinuation, SignupGate } from "@/components/auth/signup-gate";
import { AskPanel } from "@/components/learning/ask-panel";
import { FlagContent } from "@/components/learning/flag-content";
import { LessonBlocks } from "@/components/learning/lesson-blocks";
import { LessonQuiz, MarkReadButton } from "@/components/learning/lesson-interactions";
import { EvidenceBlock } from "@/components/polis/evidence-block";
import { Icon } from "@/components/ui/icon";
import { areaMeta, type Area } from "@/components/ui/topic";
import { formatDate, formatPartialDate } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";
import { aiConfigured } from "@/modules/ai/provider";
import { getLesson, getLessonTopics } from "@/modules/learning/catalog";
import { previewBlocks, publicQuiz, quizSchema } from "@/modules/learning/content";
import { getLearnerSummary } from "@/modules/learning/progress";

type Params = Promise<{ modulo: string; licao: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { modulo, licao } = await params;
  const lesson = await getLesson(modulo, licao);
  return { title: lesson?.title ?? "Lição", description: lesson?.objective };
}

export default async function LessonPage({ params }: { params: Params }) {
  const { modulo, licao } = await params;
  const [lesson, user] = await Promise.all([getLesson(modulo, licao), getCurrentUser()]);
  if (!lesson) notFound();
  const path = `/aprender/${modulo}/${licao}`;
  const siblings = lesson.module.lessons;
  const position = siblings.findIndex((l) => l.id === lesson.id);
  const area = lesson.module.area as Area;

  const header = (
    <>
      <Link href={`/aprender/${lesson.module.slug}`} className="text-link inline-flex items-center gap-1.5 text-meta">
        <Icon name="arrowLeft" size={16} /> {lesson.module.title}
      </Link>
      <p className="eyebrow eyebrow-neutral mt-8">
        {areaMeta[area].label} / Lição {position + 1} de {siblings.length}
      </p>
      <h1 className="mt-2 font-serif text-[2rem] font-semibold leading-tight md:text-[2.5rem] md:leading-[3rem]">{lesson.title}</h1>
      <p className="mt-3 text-meta text-ink-soft">
        {lesson.minutes} min · objetivo: {lesson.objective.charAt(0).toLowerCase() + lesson.objective.slice(1)}
      </p>
      <p className="mt-1 text-meta text-ink-soft">Revisão editorial: {formatPartialDate(lesson.reviewedOn)} · {lesson.sources.length} fontes oficiais</p>

      <p className="mt-8 text-reading font-semibold">{lesson.content.intro}</p>
    </>
  );

  if (!user) {
    // Citation numbers point to the sources list, which is not part of the preview.
    return (
      <article className="page-frame py-8 md:py-12">
        <div className="mx-auto max-w-[720px]">
          {header}
          <LessonBlocks blocks={previewBlocks(lesson.content.blocks)} numbers={new Map()} />
          <PreviewContinuation />
          <SignupGate
            path={path}
            title="Continue esta lição com uma conta"
            perks={["A lição completa, com as fontes", "Verificação de compreensão", "Progresso salvo na sua trilha", "Discussões relacionadas"]}
            className="mt-4"
          >
            Sem conta, você vê a abertura de cada lição. Com uma conta, lê o conteúdo inteiro e acompanha o que já estudou.
          </SignupGate>
        </div>
      </article>
    );
  }

  const [summary, topics] = await Promise.all([getLearnerSummary(user.id), getLessonTopics(lesson.id)]);
  const state = summary.progressByLesson.get(lesson.id);
  const numbers = new Map(lesson.sources.map((s, i) => [s.source.key, i + 1]));
  const previous = position > 0 ? siblings[position - 1] : null;
  const next = position < siblings.length - 1 ? siblings[position + 1] : null;

  return (
    <article className="page-frame py-8 md:py-12">
      <div className="mx-auto max-w-[720px]">
        {header}
        <LessonBlocks blocks={lesson.content.blocks} numbers={numbers} />

        <section aria-labelledby="conceitos" className="mt-10">
          <h2 id="conceitos" className="text-h3 font-semibold">
            Conceitos relacionados
          </h2>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {lesson.content.relatedConcepts.map((concept) => (
              <div key={concept.term} className="rounded-card bg-lilac p-4">
                <dt className="font-semibold text-lilac-ink">{concept.term}</dt>
                <dd className="mt-1 text-meta">{concept.explanation}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="fontes" className="mt-10">
          <h2 id="fontes" className="text-h3 font-semibold">
            Fontes desta lição
          </h2>
          <p className="mt-1 text-meta text-ink-soft">Os números no texto levam à fonte correspondente. Cada fonte indica o que sustenta e seus limites.</p>
          <ol className="mt-4 flex flex-col gap-3">
            {lesson.sources.map((item, index) => (
              <li key={item.sourceId}>
                <EvidenceBlock source={item.source} supports={item.supports} eyebrow={`Fonte ${index + 1}`} />
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-card border border-line bg-surface p-5">
          <h2 className="text-lead font-semibold">Terminou a leitura?</h2>
          <p className="mt-1 text-meta text-ink-soft">Registrar a leitura e acertar a verificação concluem a lição. Os pontos são dados uma única vez por atividade.</p>
          <div className="mt-4">
            <MarkReadButton lessonId={lesson.id} path={path} alreadyRead={Boolean(state?.readAt)} />
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-[820px]">
        <LessonQuiz lessonId={lesson.id} path={path} questions={publicQuiz(quizSchema.parse(lesson.quiz))} alreadyUnderstood={Boolean(state?.understoodAt)} />
      </div>

      <div className="mx-auto max-w-[720px]">
        <AskPanel kind="lesson" targetId={lesson.id} path={path} signedIn available={aiConfigured()} />

        {lesson.events.length ? (
          <section aria-labelledby="acontecimentos-relacionados" className="mt-10">
            <h2 id="acontecimentos-relacionados" className="text-h3 font-semibold">
              Acontecimentos relacionados
            </h2>
            <ul className="mt-3 flex flex-col divide-y divide-line-soft border-y border-line-soft">
              {lesson.events.map(({ event, relation }) => (
                <li key={event.slug} className="py-3">
                  <Link href={`/acontecimentos/${event.slug}`} className="font-semibold hover:text-action-hover">
                    {event.title}
                  </Link>
                  <p className="text-meta text-ink-soft">
                    {formatDate(event.eventDate)} · {relation}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="discussoes" className="mt-10">
          <h2 id="discussoes" className="text-h3 font-semibold">
            Discussões relacionadas
          </h2>
          {topics.length ? (
            <ul className="mt-3 flex flex-col divide-y divide-line-soft border-y border-line-soft">
              {topics.map((topic) => (
                <li key={topic.id} className="py-3">
                  <Link href={`/comunidade/${topic.forum.slug}/${topic.id}`} className="font-semibold hover:text-action-hover">
                    {topic.title}
                  </Link>
                  <p className="text-meta text-ink-soft">
                    {topic.forum.title} · {topic.commentCount} comentários · conteúdo de participantes
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-body text-ink-soft">
              Ainda não há discussões ligadas a esta lição.{" "}
              <Link href="/comunidade" className="text-link">
                Ir para a comunidade
              </Link>
            </p>
          )}
        </section>

        <div className="mt-10 border-t border-line pt-6">
          <FlagContent targetType="LESSON" targetId={lesson.id} path={path} signedIn />
        </div>

        <nav aria-label="Navegação entre lições" className="mt-8 grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link href={`/aprender/${lesson.module.slug}/${previous.slug}`} className="surface-card flex items-center gap-3 p-4 hover:border-action">
              <Icon name="arrowLeft" className="text-action" />
              <span>
                <span className="block text-label uppercase tracking-wider text-ink-soft">Anterior</span>
                <span className="font-semibold">{previous.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/aprender/${lesson.module.slug}/${next.slug}`} className="surface-card flex items-center justify-end gap-3 p-4 text-right hover:border-action">
              <span>
                <span className="block text-label uppercase tracking-wider text-ink-soft">Próxima</span>
                <span className="font-semibold">{next.title}</span>
              </span>
              <Icon name="arrowRight" className="text-action" />
            </Link>
          ) : (
            <Link href="/aprender" className="surface-card flex items-center justify-end gap-3 p-4 text-right hover:border-action">
              <span>
                <span className="block text-label uppercase tracking-wider text-ink-soft">Fim do módulo</span>
                <span className="font-semibold">Voltar ao catálogo</span>
              </span>
              <Icon name="arrowRight" className="text-action" />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
