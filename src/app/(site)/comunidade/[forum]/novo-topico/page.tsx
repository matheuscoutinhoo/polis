import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreateTopicForm } from "@/components/community/community-forms";
import { PublishGate } from "@/components/community/community-ui";
import { db } from "@/lib/db";
import { getContentUser } from "@/lib/session";

export const metadata: Metadata = { title: "Novo tópico" };

type Params = Promise<{ forum: string }>;

export default async function NewTopicPage({ params, searchParams }: { params: Params; searchParams: Promise<{ licao?: string; acontecimento?: string }> }) {
  const [{ forum: slug }, query] = await Promise.all([params, searchParams]);
  const forum = await db.forum.findFirst({ where: { slug, status: "VISIBLE" }, select: { id: true, slug: true, title: true, eventId: true } });
  if (!forum) notFound();
  const user = await getContentUser();
  const defaultEventId = query.acontecimento ?? forum.eventId ?? undefined;
  // The automatic search adds events every day: the list offers the most recent ones plus the event the page was opened from.
  const eventWhere = { status: "PUBLISHED" as const, isDemo: false };
  const [lessons, events] = await Promise.all([
    db.lesson.findMany({
      where: { status: "PUBLISHED", module: { status: "PUBLISHED" } },
      orderBy: [{ module: { number: "asc" } }, { number: "asc" }],
      select: { id: true, title: true, module: { select: { title: true } } },
    }),
    db.event.findMany({ where: eventWhere, orderBy: { eventDate: "desc" }, take: 60, select: { id: true, title: true } }),
  ]);
  if (defaultEventId && !events.some((e) => e.id === defaultEventId)) {
    const opened = await db.event.findFirst({ where: { ...eventWhere, id: defaultEventId }, select: { id: true, title: true } });
    if (opened) events.unshift(opened);
  }
  const path = `/comunidade/${forum.slug}/novo-topico`;

  return (
    <div className="page-frame py-8 md:py-12">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/comunidade" className="text-link">
          Comunidade
        </Link>{" "}
        /{" "}
        <Link href={`/comunidade/${forum.slug}`} className="text-link">
          {forum.title}
        </Link>{" "}
        / Novo tópico
      </nav>
      <div className="mt-2 max-w-2xl">
        <h1 className="text-display-sm font-semibold md:text-display">Novo tópico</h1>
        <p className="mt-2 text-lead text-ink-soft">Apresente uma pergunta ou um argumento. Relacionar uma lição ou um acontecimento ajuda outras pessoas a acompanhar o contexto.</p>
        <div className="mt-6">
          <PublishGate user={user} nextPath={path}>
            <CreateTopicForm
              forum={{ id: forum.id, slug: forum.slug }}
              lessons={lessons.map((l) => ({ id: l.id, label: `${l.module.title} · ${l.title}` }))}
              events={events.map((e) => ({ id: e.id, label: e.title }))}
              defaultLessonId={lessons.some((l) => l.id === query.licao) ? query.licao : undefined}
              defaultEventId={events.some((e) => e.id === defaultEventId) ? defaultEventId : undefined}
            />
          </PublishGate>
        </div>
      </div>
    </div>
  );
}
