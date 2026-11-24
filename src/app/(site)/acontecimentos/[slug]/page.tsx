import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AskPanel } from "@/components/learning/ask-panel";
import { FlagContent } from "@/components/learning/flag-content";
import { ArgumentComparison } from "@/components/polis/argument-comparison";
import { CitationLinks, EvidenceBlock } from "@/components/polis/evidence-block";
import { ImpactMechanism, ProcessStages } from "@/components/polis/events";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { formatDate, formatPartialDate } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";
import { aiConfigured } from "@/modules/ai/provider";
import { getPublishedEvent } from "@/modules/events/service";
import { THEME_LABEL } from "@/modules/events/themes";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const event = await getPublishedEvent((await params).slug);
  return { title: event?.title ?? "Acontecimento", description: event?.content.summary.text.slice(0, 160) };
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <p className="text-label font-semibold uppercase tracking-wider text-action">{number}</p>
      <h2 id={id} className="mt-1 text-h2 font-semibold">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function EventPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [event, user] = await Promise.all([getPublishedEvent(slug), getCurrentUser()]);
  if (!event) notFound();
  const c = event.content;
  const sources = event.sources.map((s) => s.source);
  const numbers = new Map(sources.map((s, i) => [s.key, i + 1]));
  const cite = (keys: string[]) => <CitationLinks keys={keys} numbers={numbers} />;
  const documented = c.impacts.filter((i) => i.kind === "DOCUMENTED");
  const possible = c.impacts.filter((i) => i.kind === "POSSIBLE");
  const path = `/acontecimentos/${slug}`;

  return (
    <article className="page-frame py-8 md:py-12">
      <div className="mx-auto max-w-[880px]">
        <Link href="/acontecimentos" className="text-link inline-flex items-center gap-1.5 text-meta">
          <Icon name="arrowLeft" size={16} /> Acontecimentos
        </Link>
        <div className="mt-6 flex flex-wrap gap-2">
          {event.themes.map((theme) => (
            <Badge key={theme} tone="blue">
              {THEME_LABEL[theme] ?? theme}
            </Badge>
          ))}
          <Badge tone="neutral">{event.statusLabel}</Badge>
        </div>
        <h1 className="mt-3 font-serif text-[2rem] font-semibold leading-tight md:text-[2.5rem] md:leading-[3rem]">{event.title}</h1>
        <dl className="mt-4 grid gap-x-6 gap-y-1 text-meta text-ink-soft sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-ink">Data do acontecimento</dt>
            <dd>{formatDate(event.eventDate)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Publicação na Polis</dt>
            <dd>{event.publishedAt ? formatDate(event.publishedAt) : "—"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Última revisão</dt>
            <dd>{event.lastReviewedAt ? formatDate(event.lastReviewedAt) : formatDate(event.updatedAt)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-meta text-ink-soft">
          {event.aiAssisted ? "Análise redigida com apoio de IA a partir das fontes cadastradas e revisada pela equipe editorial." : "Análise redigida e revisada pela equipe editorial."}{" "}
          Origem: fontes oficiais listadas ao final.
        </p>

        <Section id="o-que-aconteceu" number="01" title="O que aconteceu">
          <p className="text-reading">
            {c.summary.text}
            {cite(c.summary.sources)}
          </p>
        </Section>

        <Section id="situacao" number="02" title="Situação atual">
          <div className="rounded-card bg-blue p-5">
            <p className="text-lead font-semibold">
              {c.status.label}
              <span className="font-normal text-ink-soft"> · em {formatPartialDate(c.status.asOf)}</span>
            </p>
            <p className="mt-1 text-body">
              {c.status.description}
              {cite(c.status.sources)}
            </p>
          </div>
          {c.timeline.length ? (
            <div className="mt-6">
              <h3 className="mb-4 text-lead font-semibold">Etapas documentadas</h3>
              <ProcessStages
                stages={c.timeline.map((t) => ({ date: t.date, label: t.label, citations: cite(t.sources) }))}
                footer="Dependem do processo real. Uma proposta não vira automaticamente regra em vigor, e decisões provisórias podem mudar."
              />
            </div>
          ) : null}
        </Section>

        <Section id="contexto" number="03" title="Contexto e atores envolvidos">
          <p className="text-reading">
            {c.context.text}
            {cite(c.context.sources)}
          </p>
          {c.actors.length ? (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {c.actors.map((actor) => (
                <li key={actor.name} className="surface-card p-4">
                  <p className="font-semibold">{actor.name}</p>
                  <p className="text-meta text-ink-soft">
                    {actor.role}
                    {cite(actor.sources)}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </Section>

        {c.institutions.length ? (
          <Section id="instituicoes" number="04" title="Instituições responsáveis e limites de atuação">
            <ul className="flex flex-col gap-3">
              {c.institutions.map((institution) => (
                <li key={institution.name} className="surface-card p-4 md:p-5">
                  <p className="text-lead font-semibold">{institution.name}</p>
                  <p className="mt-1 text-body">
                    {institution.role}
                    {cite(institution.sources)}
                  </p>
                  <p className="mt-2 text-meta text-ink-soft">
                    <span className="font-semibold text-ink">Limites:</span> {institution.limits}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {c.concepts.length || event.lessons.length ? (
          <Section id="conceitos" number="05" title="Conceitos e correntes relacionados">
            <ul className="grid gap-3 sm:grid-cols-2">
              {c.concepts.map((concept) => {
                const [moduleSlug, lessonSlug] = concept.lessonRef?.split("/") ?? [];
                return (
                  <li key={concept.term} className="rounded-card bg-lilac p-4">
                    <p className="font-semibold text-lilac-ink">{concept.term}</p>
                    <p className="mt-1 text-meta">
                      {concept.relation}
                      {cite(concept.sources)}
                    </p>
                    {moduleSlug && lessonSlug ? (
                      <Link href={`/aprender/${moduleSlug}/${lessonSlug}`} className="text-link mt-2 inline-flex items-center gap-1 text-meta">
                        Estudar este conceito <Icon name="arrowRight" size={14} />
                      </Link>
                    ) : null}
                  </li>
                );
              })}
              {event.lessons
                .filter(({ lesson }) => !c.concepts.some((concept) => concept.lessonRef === `${lesson.module.slug}/${lesson.slug}`))
                .map(({ lesson, relation }) => (
                  <li key={lesson.slug} className="rounded-card bg-lilac p-4">
                    <p className="font-semibold text-lilac-ink">{lesson.title}</p>
                    <p className="mt-1 text-meta">{relation}</p>
                    <Link href={`/aprender/${lesson.module.slug}/${lesson.slug}`} className="text-link mt-2 inline-flex items-center gap-1 text-meta">
                      Estudar este conceito <Icon name="arrowRight" size={14} />
                    </Link>
                  </li>
                ))}
            </ul>
          </Section>
        ) : null}

        <Section id="impactos" number="06" title="Impactos">
          <p className="max-w-3xl text-body text-ink-soft">
            Cada impacto segue o mecanismo decisão → mudança prática → grupo afetado → condições e limites. Consequências documentadas aparecem separadas de cenários possíveis.
            Nem todo acontecimento afeta todos os setores.
          </p>
          {documented.length ? (
            <>
              <h3 className="mt-6 text-lead font-semibold">Consequências documentadas</h3>
              <div className="mt-3 flex flex-col gap-3">
                {documented.map((impact, i) => (
                  <ImpactMechanism key={`d-${i}`} {...impact} citations={cite(impact.sources)} />
                ))}
              </div>
            </>
          ) : null}
          {possible.length ? (
            <>
              <h3 className="mt-8 text-lead font-semibold">Cenários possíveis (dependem de condições)</h3>
              <div className="mt-3 flex flex-col gap-3">
                {possible.map((impact, i) => (
                  <ImpactMechanism key={`p-${i}`} {...impact} citations={cite(impact.sources)} />
                ))}
              </div>
            </>
          ) : null}
          {!documented.length && !possible.length ? <p className="mt-4 text-body">As fontes aprovadas ainda não documentam impactos deste acontecimento.</p> : null}
        </Section>

        {c.arguments.length ? (
          <Section id="argumentos" number="07" title="Argumentos e interpretações">
            <ArgumentComparison
              title="Posições registradas nas fontes"
              intro="Cada argumento é atribuído a quem o apresentou. Uma declaração comprova que a posição foi defendida, não que seja verdadeira ou que o resultado prometido vá ocorrer."
              orderNote="Ordem em que os argumentos aparecem nas fontes consultadas."
              headingLevel="h3"
              items={c.arguments.map((argument) => ({
                label: argument.kind === "DECLARATION" ? "Declaração" : "Interpretação",
                heading: argument.attribution,
                body: (
                  <>
                    {argument.text}
                    {cite(argument.sources)}
                  </>
                ),
              }))}
            />
          </Section>
        ) : null}

        {c.uncertainties.length || c.limitations.length ? (
          <Section id="incertezas" number="08" title="Incertezas e pontos em disputa">
            <ul className="flex flex-col gap-3">
              {c.uncertainties.map((u, i) => (
                <li key={i} className="flex gap-3 rounded-card bg-sand p-4 text-body">
                  <Icon name="alert" className="mt-0.5 flex-none text-sand-ink" />
                  <span>
                    {u.text}
                    {cite(u.sources)}
                  </span>
                </li>
              ))}
            </ul>
            {c.limitations.length ? (
              <Notice tone="warning" title="Limites desta análise" className="mt-4">
                <ul className="list-disc pl-5">
                  {c.limitations.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </Notice>
            ) : null}
          </Section>
        ) : null}

        <Section id="fontes" number="09" title="Fontes">
          <p className="text-meta text-ink-soft">Todas as fontes são oficiais e de acesso público. Os números no texto levam à fonte correspondente.</p>
          <ol className="mt-4 flex flex-col gap-3">
            {sources.map((source, index) => (
              <li key={source.key}>
                <EvidenceBlock source={source} eyebrow={`Fonte ${index + 1}`} />
              </li>
            ))}
          </ol>
        </Section>

        <Section id="discussoes" number="10" title="Lições e discussões relacionadas">
          {event.forums.length || event.topics.length ? (
            <ul className="flex flex-col divide-y divide-line-soft border-y border-line-soft">
              {event.forums.map((forum) => (
                <li key={forum.slug} className="py-3">
                  <Link href={`/comunidade/${forum.slug}`} className="font-semibold hover:text-action-hover">
                    Fórum: {forum.title}
                  </Link>
                </li>
              ))}
              {event.topics.map((topic) => (
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
            <p className="text-body text-ink-soft">Ainda não há discussões ligadas a este acontecimento.</p>
          )}
          <p className="mt-4">
            <Link href={`/comunidade/novo?acontecimento=${event.id}`} className="btn btn-secondary btn-sm">
              Criar fórum sobre este acontecimento
            </Link>
          </p>
        </Section>

        <AskPanel kind="event" targetId={event.id} path={path} signedIn={Boolean(user)} available={aiConfigured()} />

        <div className="mt-10 border-t border-line pt-6">
          <FlagContent targetType="EVENT" targetId={event.id} path={path} signedIn={Boolean(user)} />
        </div>
      </div>
    </article>
  );
}
