import type { Metadata } from "next";
import Link from "next/link";
import { SignupBanner } from "@/components/auth/signup-gate";
import { ParticipantLabel } from "@/components/community/community-ui";
import { LinkButton } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState, IconChip } from "@/components/ui/topic";
import { formatDate, plural } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";
import { CATEGORY_LABEL, FORUM_CATEGORIES } from "@/modules/community/rules";
import { listFollowedForums, listForums, recentFromFollowed } from "@/modules/community/service";

export const metadata: Metadata = { title: "Comunidade" };

type SearchParams = Promise<{ q?: string; categoria?: string; pagina?: string }>;

function buildHref(params: { q?: string; categoria?: string; pagina?: number }) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.categoria) search.set("categoria", params.categoria);
  if (params.pagina && params.pagina > 1) search.set("pagina", String(params.pagina));
  const query = search.toString();
  return query ? `/comunidade?${query}` : "/comunidade";
}

export default async function CommunityPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().slice(0, 80);
  const category = FORUM_CATEGORIES.some((c) => c.key === params.categoria) ? params.categoria : undefined;
  const page = Math.max(1, Number.parseInt(params.pagina ?? "1", 10) || 1);
  const user = await getCurrentUser();
  const [{ forums, totalPages }, followed, recent] = await Promise.all([
    listForums({ q: q || undefined, category, page }),
    user ? listFollowedForums(user.id) : Promise.resolve([]),
    user ? recentFromFollowed(user.id, 6) : Promise.resolve([]),
  ]);

  return (
    <div className="page-frame py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Comunidade</p>
          <h1 className="mt-2 text-display-sm font-semibold md:text-display">Fóruns de discussão</h1>
          <p className="mt-2 max-w-2xl text-lead text-ink-soft">
            Converse sobre correntes, ideias e acontecimentos. As publicações são de participantes e não passam por verificação editorial.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/comunidade/novo" icon="plus" iconPosition="start">
            Criar fórum
          </LinkButton>
          <LinkButton href="/comunidade/regras" variant="secondary">
            Regras da comunidade
          </LinkButton>
        </div>
      </div>
      {user ? null : (
        <SignupBanner path={buildHref({ q, categoria: category, pagina: page })} title="Crie uma conta para ler e participar dos fóruns" className="mt-6">
          Sem conta, você vê a lista de fóruns. Os tópicos e comentários ficam disponíveis para quem tem conta.
        </SignupBanner>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <form role="search" action="/comunidade" className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="forum-search" className="sr-only">
              Buscar fóruns pelo título
            </label>
            <input id="forum-search" name="q" type="search" defaultValue={q} placeholder="Buscar fóruns pelo título" className="field-input flex-1" maxLength={80} />
            {category ? <input type="hidden" name="categoria" value={category} /> : null}
            <button type="submit" className="btn btn-secondary">
              <Icon name="search" size={18} /> <span>Buscar</span>
            </button>
          </form>

          <nav aria-label="Filtrar por categoria" className="mt-4 flex flex-wrap gap-2">
            <Link href={buildHref({ q })} className="chip" aria-current={!category ? "page" : undefined}>
              Todas
            </Link>
            {FORUM_CATEGORIES.map((c) => (
              <Link key={c.key} href={buildHref({ q, categoria: c.key })} className="chip" aria-current={category === c.key ? "page" : undefined}>
                {c.label}
              </Link>
            ))}
          </nav>

          {forums.length === 0 ? (
            <div className="mt-6">
              <EmptyState icon="community" title={q || category ? "Nenhum fórum encontrado" : "Nenhum fórum ainda"}>
                {q || category ? "Tente outro termo ou remova o filtro de categoria." : "Crie o primeiro fórum sobre um tema que você queira discutir."}
              </EmptyState>
            </div>
          ) : (
            <ul className="mt-6 flex flex-col gap-3">
              {forums.map((forum) => (
                <li key={forum.id} className="surface-card p-5">
                  <div className="flex flex-wrap items-center gap-2 text-meta">
                    <span className="font-semibold text-action">{CATEGORY_LABEL[forum.category]}</span>
                    {forum.isOfficial ? (
                      <span className="rounded-[6px] bg-mint px-2 py-0.5 text-label font-semibold text-mint-ink">Fórum oficial da Polis</span>
                    ) : null}
                  </div>
                  <h2 className="mt-1 text-lead font-semibold">
                    <Link href={`/comunidade/${forum.slug}`} className="hover:text-action-hover">
                      {forum.title}
                    </Link>
                  </h2>
                  <p className="mt-1 line-clamp-2 text-body text-ink-soft">{forum.description}</p>
                  <p className="mt-2 text-meta text-ink-soft">
                    {plural(forum._count.topics, "tópico", "tópicos")} · {plural(forum._count.followers, "pessoa segue", "pessoas seguem")}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <Pagination page={page} totalPages={totalPages} hrefFor={(p) => buildHref({ q, categoria: category, pagina: p })} label="Páginas de fóruns" />
        </div>

        <aside className="flex flex-col gap-4">
          <section aria-labelledby="seguidos" className="surface-card p-5">
            <h2 id="seguidos" className="text-lead font-semibold">
              Fóruns que você segue
            </h2>
            {!user ? (
              <p className="mt-2 text-meta text-ink-soft">
                <Link href="/entrar?proximo=/comunidade" className="text-link">
                  Entre
                </Link>{" "}
                para seguir fóruns e ver as discussões recentes aqui.
              </p>
            ) : followed.length === 0 ? (
              <p className="mt-2 text-meta text-ink-soft">Você ainda não segue nenhum fórum. Use o botão “Seguir” na página de um fórum.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {followed.map(({ forum }) => (
                  <li key={forum.id}>
                    <Link href={`/comunidade/${forum.slug}`} className="text-link">
                      {forum.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          {recent.length ? (
            <section aria-labelledby="recentes" className="surface-card p-5">
              <h2 id="recentes" className="text-lead font-semibold">
                Atividade recente nos seus fóruns
              </h2>
              <ParticipantLabel className="mt-2" />
              <ul className="mt-3 flex flex-col divide-y divide-line-soft">
                {recent.map((topic) => (
                  <li key={topic.id} className="py-3">
                    <Link href={`/comunidade/${topic.forum.slug}/${topic.id}`} className="font-semibold hover:text-action-hover">
                      {topic.title}
                    </Link>
                    <p className="text-meta text-ink-soft">
                      {topic.forum.title} · {plural(topic.commentCount, "comentário", "comentários")} · {formatDate(topic.lastActivityAt)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="flex gap-3 rounded-panel bg-sand p-5">
            <IconChip icon="shield" tone="sand" size={40} />
            <p className="text-meta">
              A moderação analisa condutas (ameaças, assédio, exposição de dados, discurso de ódio, spam), não opiniões. Cada decisão tem motivo registrado.{" "}
              <Link href="/comunidade/regras" className="text-link">
                Ver regras
              </Link>
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
