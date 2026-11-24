import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReportForm } from "@/components/community/community-forms";
import { ParticipantLabel, REMOVED_AUTHOR, UserText } from "@/components/community/community-ui";
import { LinkButton } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Pagination } from "@/components/ui/pagination";
import { SubmitButton } from "@/components/ui/submit-button";
import { EmptyState } from "@/components/ui/topic";
import { formatDate, plural } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";
import { followForumAction } from "@/modules/community/actions";
import { CATEGORY_LABEL } from "@/modules/community/rules";
import { getForumPage } from "@/modules/community/service";

type Params = Promise<{ forum: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { forum } = await params;
  const data = await getForumPage(forum, 1, null);
  return { title: data ? data.forum.title : "Fórum não encontrado" };
}

export default async function ForumPage({ params, searchParams }: { params: Params; searchParams: Promise<{ pagina?: string }> }) {
  const [{ forum: slug }, { pagina }] = await Promise.all([params, searchParams]);
  const user = await getCurrentUser();
  const page = Math.max(1, Number.parseInt(pagina ?? "1", 10) || 1);
  const data = await getForumPage(slug, page, user?.id ?? null);
  if (!data) notFound();
  const { forum, topics, totalPages, following } = data;
  const path = `/comunidade/${forum.slug}`;

  return (
    <div className="page-frame py-8 md:py-12">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/comunidade" className="text-link">
          Comunidade
        </Link>{" "}
        / {forum.title}
      </nav>

      <header className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <p className="flex flex-wrap items-center gap-2 text-meta">
            <span className="font-semibold text-action">{CATEGORY_LABEL[forum.category]}</span>
            {forum.isOfficial ? <span className="rounded-[6px] bg-mint px-2 py-0.5 text-label font-semibold text-mint-ink">Fórum oficial da Polis</span> : null}
          </p>
          <h1 className="mt-1 text-display-sm font-semibold md:text-display">{forum.title}</h1>
          <div className="mt-2 text-lead text-ink-soft">
            <UserText>{forum.description}</UserText>
          </div>
          <p className="mt-2 text-meta text-ink-soft">
            {forum.isOfficial ? "Criado pela equipe da Polis" : `Criado por ${forum.creator?.name ?? REMOVED_AUTHOR}`} em {formatDate(forum.createdAt)} ·{" "}
            {plural(forum._count.followers, "pessoa segue", "pessoas seguem")}
          </p>
          {forum.event ? (
            <p className="mt-2 flex items-center gap-2 text-meta">
              <Icon name="event" size={16} className="text-action" /> Acontecimento relacionado:{" "}
              {forum.event.status === "PUBLISHED" ? (
                <Link href={`/acontecimentos/${forum.event.slug}`} className="text-link">
                  {forum.event.title}
                </Link>
              ) : (
                <span>{forum.event.title} (página indisponível)</span>
              )}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <LinkButton href={`${path}/novo-topico`} icon="plus" iconPosition="start">
            Novo tópico
          </LinkButton>
          {user ? (
            <form action={followForumAction}>
              <input type="hidden" name="forumId" value={forum.id} />
              <input type="hidden" name="path" value={path} />
              <input type="hidden" name="follow" value={following ? "false" : "true"} />
              <SubmitButton variant="secondary" block pendingLabel={following ? "Deixando de seguir..." : "Seguindo..."} aria-pressed={following}>
                {following ? "Deixar de seguir" : "Seguir fórum"}
              </SubmitButton>
            </form>
          ) : (
            <LinkButton href={`/entrar?proximo=${encodeURIComponent(path)}`} variant="secondary">
              Entrar para seguir
            </LinkButton>
          )}
        </div>
      </header>

      <details className="surface-card mt-6 p-5">
        <summary className="details-summary flex min-h-[44px] items-center justify-between font-semibold">
          <span>Regras deste fórum</span>
          <Icon name="chevronDown" size={18} className="details-chevron" />
        </summary>
        <div className="mt-3">
          <UserText>{forum.rules}</UserText>
          <p className="mt-3 text-meta text-ink-soft">
            As{" "}
            <Link href="/comunidade/regras" className="text-link">
              regras gerais da comunidade
            </Link>{" "}
            também valem aqui.
          </p>
        </div>
      </details>

      <section aria-labelledby="topicos" className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="topicos" className="text-h2 font-semibold">
            Tópicos
          </h2>
          <ParticipantLabel />
        </div>
        {topics.length === 0 ? (
          <div className="mt-4">
            <EmptyState icon="community" title="Nenhum tópico ainda" action={<LinkButton href={`${path}/novo-topico`}>Abrir o primeiro tópico</LinkButton>}>
              Comece uma conversa sobre o tema deste fórum.
            </EmptyState>
          </div>
        ) : (
          <ul className="surface-card mt-4 divide-y divide-line-soft">
            {topics.map((topic) => (
              <li key={topic.id} className="p-4 md:p-5">
                <Link href={`${path}/${topic.id}`} className="text-lead font-semibold hover:text-action-hover">
                  {topic.title}
                </Link>
                <p className="mt-1 text-meta text-ink-soft">
                  {topic.status === "DELETED" ? "Excluído pela pessoa autora" : (topic.author?.name ?? REMOVED_AUTHOR)} · {plural(topic.commentCount, "comentário", "comentários")} ·
                  última atividade em {formatDate(topic.lastActivityAt)}
                  {topic.closedAt ? " · encerrado para novos comentários" : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
        <Pagination page={data.page} totalPages={totalPages} hrefFor={(p) => (p > 1 ? `${path}?pagina=${p}` : path)} label="Páginas de tópicos" />
      </section>

      {user && !forum.isOfficial ? (
        <div className="mt-8 border-t border-line-soft pt-4">
          <ReportForm targetType="FORUM" targetId={forum.id} path={path} />
        </div>
      ) : null}
    </div>
  );
}
