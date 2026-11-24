import type { Metadata } from "next";
import Link from "next/link";
import { AddExcerptForm, ReviewSourceForm } from "@/components/admin/admin-forms";
import { MATERIAL_LABEL } from "@/components/polis/evidence-block";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { db } from "@/lib/db";
import { formatDate, formatPartialDate } from "@/lib/format";
import { REVIEW_STATUS_LABEL } from "@/modules/admin/labels";

export const metadata: Metadata = { title: "Fontes" };

const STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;
type Status = (typeof STATUSES)[number];
const NOTICES: Record<string, string> = {
  "fonte-cadastrada": "Fonte cadastrada e aguardando revisão.",
  "fonte-aprovada": "Fonte aprovada; a decisão foi registrada. Ela já pode ser vinculada a lições e acontecimentos.",
  "fonte-rejeitada": "Fonte rejeitada; a decisão foi registrada.",
};

export default async function AdminSourcesPage({ searchParams }: { searchParams: Promise<{ status?: string; aviso?: string }> }) {
  const params = await searchParams;
  const status: Status = STATUSES.includes(params.status as Status) ? (params.status as Status) : "PENDING";
  const [sources, counts] = await Promise.all([
    db.source.findMany({
      where: { reviewStatus: status },
      orderBy: [{ updatedAt: "desc" }],
      take: 200,
      include: {
        publisher: { select: { name: true, approved: true } },
        excerpts: { select: { id: true, locator: true, text: true }, orderBy: { createdAt: "asc" } },
        _count: { select: { lessonSources: true, eventSources: true } },
      },
    }),
    db.source.groupBy({ by: ["reviewStatus"], _count: { _all: true } }),
  ]);
  const countOf = (s: Status) => counts.find((c) => c.reviewStatus === s)?._count._all ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-display-sm font-semibold">Fontes</h1>
          <p className="mt-1 text-body text-ink-soft">Cadastre, revise e complemente fontes oficiais. Só fontes aprovadas sustentam lições, acontecimentos e respostas da IA.</p>
        </div>
        <LinkButton href="/admin/fontes/nova" icon="plus" iconPosition="start">
          Nova fonte
        </LinkButton>
      </div>
      {params.aviso && NOTICES[params.aviso] ? (
        <Notice tone="success" role="status">
          {NOTICES[params.aviso]}
        </Notice>
      ) : null}
      <nav aria-label="Filtrar por situação" className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <Link key={s} href={`/admin/fontes?status=${s}`} className="chip" aria-current={status === s ? "page" : undefined}>
            {REVIEW_STATUS_LABEL[s]} ({countOf(s)})
          </Link>
        ))}
      </nav>
      {sources.length === 0 ? (
        <p className="text-body text-ink-soft">Nenhuma fonte nesta situação.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {sources.map((source) => (
            <li key={source.id} className="surface-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={source.reviewStatus === "APPROVED" ? "mint" : source.reviewStatus === "PENDING" ? "warning" : "neutral"}>{REVIEW_STATUS_LABEL[source.reviewStatus]}</Badge>
                <span className="text-meta text-ink-soft">
                  {source.publisher.name} · {MATERIAL_LABEL[source.materialType]} · chave {source.key}
                </span>
              </div>
              <h2 className="mt-2 text-lead font-semibold">
                <a href={source.url} className="text-link" target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
              </h2>
              <p className="mt-1 break-all text-meta text-ink-soft">{source.url}</p>
              <p className="mt-2 text-meta">
                {source.author ? `${source.author} · ` : ""}
                {source.publishedOn ? `Publicação ${formatPartialDate(source.publishedOn)} · ` : ""}
                Consulta {formatDate(source.accessedAt)}
                {source.reviewedAt ? ` · Revisada em ${formatDate(source.reviewedAt)} por ${source.reviewedBy ?? "—"}` : ""}
              </p>
              <p className="mt-2 text-body">{source.scopeNote}</p>
              <p className="mt-1 text-meta text-ink-soft">Reutilização: {source.reuseCondition}</p>
              <p className="mt-1 text-meta text-ink-soft">
                Usada em {source._count.lessonSources} lições e {source._count.eventSources} acontecimentos.
              </p>
              <details className="mt-3">
                <summary className="details-summary min-h-[44px] py-2 font-semibold text-action">Trechos ({source.excerpts.length})</summary>
                <ul className="mt-2 flex flex-col gap-2">
                  {source.excerpts.map((e) => (
                    <li key={e.id} className="rounded-card bg-paper p-3 text-meta">
                      <p className="font-semibold">{e.locator}</p>
                      <p className="mt-1">“{e.text}”</p>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="mt-3 flex flex-col gap-4 border-t border-line-soft pt-3">
                <AddExcerptForm sourceId={source.id} />
                {source.reviewStatus === "PENDING" ? <ReviewSourceForm sourceId={source.id} /> : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
