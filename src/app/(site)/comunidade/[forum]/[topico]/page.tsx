import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CommentForm, EditCommentForm, EditTopicForm, ReportForm } from "@/components/community/community-forms";
import { AuthorLine, ParticipantLabel, PublishGate, UserText } from "@/components/community/community-ui";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { Pagination } from "@/components/ui/pagination";
import { formatDate, plural } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";
import { deleteCommentAction, deleteTopicAction } from "@/modules/community/actions";
import { getTopicPage } from "@/modules/community/service";

type Params = Promise<{ forum: string; topico: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { topico } = await params;
  const data = await getTopicPage(topico.slice(0, 40), 1);
  return { title: data && data.topic.status === "VISIBLE" ? data.topic.title : "Tópico" };
}

function RemovedNotice({ reason, kind }: { reason: string | null; kind: "tópico" | "comentário" }) {
  return (
    <p className="rounded-card bg-line-soft px-4 py-3 text-meta text-ink-soft">
      {kind === "tópico" ? "Tópico removido" : "Comentário removido"} pela moderação. Motivo: {reason ?? "não informado"}.
    </p>
  );
}

export default async function TopicPage({ params, searchParams }: { params: Params; searchParams: Promise<{ pagina?: string }> }) {
  const [{ forum: forumSlug, topico }, { pagina }] = await Promise.all([params, searchParams]);
  const page = Math.max(1, Number.parseInt(pagina ?? "1", 10) || 1);
  const data = await getTopicPage(topico.slice(0, 40), page);
  if (!data) notFound();
  const { topic, lesson, comments, totalPages } = data;
  if (topic.forum.slug !== forumSlug) redirect(`/comunidade/${topic.forum.slug}/${topic.id}`);
  const user = await getCurrentUser();
  const path = `/comunidade/${topic.forum.slug}/${topic.id}`;
  const isAuthor = Boolean(user && topic.author?.id === user.id);
  const visible = topic.status === "VISIBLE";

  return (
    <div className="page-frame py-8 md:py-12">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/comunidade" className="text-link">
          Comunidade
        </Link>{" "}
        /{" "}
        <Link href={`/comunidade/${topic.forum.slug}`} className="text-link">
          {topic.forum.title}
        </Link>
      </nav>

      <div className="mt-3 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <article aria-labelledby="topic-title">
            <ParticipantLabel />
            <h1 id="topic-title" className="mt-3 text-h1 font-semibold md:text-display-sm">
              {topic.title}
            </h1>
            <div className="mt-2">
              <AuthorLine name={topic.status === "DELETED" ? null : topic.author?.name} createdAt={topic.createdAt} editedAt={topic.editedAt} />
            </div>
            <div className="mt-5">
              {topic.status === "REMOVED" ? (
                <RemovedNotice reason={topic.removedReason} kind="tópico" />
              ) : topic.status === "DELETED" ? (
                <p className="rounded-card bg-line-soft px-4 py-3 text-meta text-ink-soft">O texto deste tópico foi excluído pela pessoa autora.</p>
              ) : (
                <UserText>{topic.body}</UserText>
              )}
            </div>
            {visible && (lesson || topic.event) ? (
              <ul className="mt-5 flex flex-col gap-2 text-meta">
                {lesson ? (
                  <li className="flex items-center gap-2">
                    <Icon name="book" size={16} className="text-action" /> Lição relacionada:{" "}
                    <Link href={`/aprender/${lesson.module.slug}/${lesson.slug}`} className="text-link">
                      {lesson.title}
                    </Link>
                  </li>
                ) : null}
                {topic.event ? (
                  <li className="flex items-center gap-2">
                    <Icon name="event" size={16} className="text-action" /> Acontecimento relacionado:{" "}
                    {topic.event.status === "PUBLISHED" ? (
                      <Link href={`/acontecimentos/${topic.event.slug}`} className="text-link">
                        {topic.event.title}
                      </Link>
                    ) : (
                      <span>{topic.event.title}</span>
                    )}
                  </li>
                ) : null}
              </ul>
            ) : null}
            {visible && user ? (
              <div className="mt-4 flex flex-wrap items-start gap-3 border-t border-line-soft pt-3">
                {isAuthor ? (
                  <>
                    <EditTopicForm topic={{ id: topic.id, title: topic.title, body: topic.body }} path={path} />
                    <ConfirmDialog
                      triggerLabel="Excluir tópico"
                      triggerVariant="text"
                      triggerIcon="trash"
                      triggerSize="sm"
                      title="Excluir este tópico?"
                      description="O título e o texto serão apagados. Os comentários de outras pessoas continuam visíveis para manter o contexto da conversa."
                      confirmLabel="Excluir tópico"
                      pendingLabel="Excluindo..."
                      action={deleteTopicAction}
                    >
                      <input type="hidden" name="topicId" value={topic.id} />
                      <input type="hidden" name="path" value={path} />
                    </ConfirmDialog>
                  </>
                ) : (
                  <ReportForm targetType="TOPIC" targetId={topic.id} path={path} />
                )}
              </div>
            ) : null}
          </article>

          <section aria-labelledby="comentarios" className="mt-10">
            <h2 id="comentarios" className="text-h2 font-semibold">
              {plural(topic.commentCount, "comentário", "comentários")}
            </h2>
            {comments.length === 0 ? (
              <p className="mt-3 text-body text-ink-soft">Ainda não há comentários.</p>
            ) : (
              <ol className="mt-4 flex flex-col gap-3">
                {comments.map((comment) => {
                  const own = Boolean(user && comment.author?.id === user.id);
                  return (
                    <li key={comment.id} id={`comentario-${comment.id}`} className="surface-card p-4 md:p-5">
                      <AuthorLine name={comment.status === "DELETED" ? null : comment.author?.name} createdAt={comment.createdAt} editedAt={comment.editedAt} />
                      <div className="mt-2">
                        {comment.status === "REMOVED" ? (
                          <RemovedNotice reason={comment.removedReason} kind="comentário" />
                        ) : comment.status === "DELETED" ? (
                          <p className="text-meta text-ink-soft">Comentário excluído pela pessoa autora.</p>
                        ) : (
                          <UserText>{comment.body}</UserText>
                        )}
                      </div>
                      {comment.status === "VISIBLE" && user && visible ? (
                        <div className="mt-2 flex flex-wrap items-start gap-2">
                          {own ? (
                            <>
                              <EditCommentForm comment={{ id: comment.id, body: comment.body }} path={path} />
                              <ConfirmDialog
                                triggerLabel="Excluir"
                                triggerVariant="text"
                                triggerIcon="trash"
                                triggerSize="sm"
                                title="Excluir este comentário?"
                                description="O texto será apagado e um aviso ficará no lugar."
                                confirmLabel="Excluir comentário"
                                pendingLabel="Excluindo..."
                                action={deleteCommentAction}
                              >
                                <input type="hidden" name="commentId" value={comment.id} />
                                <input type="hidden" name="path" value={path} />
                              </ConfirmDialog>
                            </>
                          ) : (
                            <ReportForm targetType="COMMENT" targetId={comment.id} path={path} />
                          )}
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            )}
            <Pagination page={data.page} totalPages={totalPages} hrefFor={(p) => (p > 1 ? `${path}?pagina=${p}` : path)} label="Páginas de comentários" />
          </section>

          {visible ? (
            <section aria-labelledby="comentar" className="mt-8">
              <h2 id="comentar" className="text-h3 font-semibold">
                Comentar
              </h2>
              <div className="mt-3">
                {topic.closedAt ? (
                  <Notice tone="neutral" icon="lock">
                    Tópico encerrado para novos comentários em {formatDate(topic.closedAt)}. Motivo: {topic.closedReason ?? "não informado"}.
                  </Notice>
                ) : (
                  <PublishGate user={user} nextPath={path}>
                    <CommentForm topicId={topic.id} path={path} />
                  </PublishGate>
                )}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="flex h-fit flex-col gap-4">
          <section className="surface-card p-5">
            <h2 className="text-lead font-semibold">Regras deste fórum</h2>
            <div className="mt-2 text-meta">
              <UserText>{topic.forum.rules}</UserText>
            </div>
            <Link href="/comunidade/regras" className="text-link mt-3 inline-flex text-meta">
              Regras gerais da comunidade
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
