import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn, formatDate, formatPartialDate } from "@/lib/format";

export const MATERIAL_LABEL: Record<string, string> = {
  ATO_REGISTRO: "Ato ou registro",
  DADO_ESTATISTICO: "Dado estatístico",
  DECLARACAO: "Declaração",
  ESTUDO: "Estudo",
  CONTEUDO_DIDATICO: "Conteúdo didático",
};

export type EvidenceSource = {
  key: string;
  title: string;
  url: string;
  author: string | null;
  publishedOn: string | null;
  sourceUpdatedOn: string | null;
  accessedAt: Date | string;
  locator: string | null;
  materialType: string;
  reuseCondition: string;
  scopeNote: string;
  reviewedAt?: Date | string | null;
  publisher: { name: string; acronym?: string | null };
};

type EvidenceBlockProps = {
  source: EvidenceSource;
  supports?: string;
  eyebrow?: string;
  className?: string;
  headingLevel?: "h3" | "h4";
};

/**
 * Evidence block: issuer, document, type, scope and limitation visible by
 * default; canonical link, locator, authorship, dates, reuse and review in an
 * accessible disclosure. Official origin is not presented as endorsement.
 */
export function EvidenceBlock({ source, supports, eyebrow = "Fonte", className, headingLevel: Heading = "h3" }: EvidenceBlockProps) {
  return (
    <article id={`fonte-${source.key}`} className={cn("surface-card scroll-mt-24 p-5 md:p-6", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="eyebrow">{eyebrow}</p>
        <Badge tone="mint">{MATERIAL_LABEL[source.materialType] ?? source.materialType}</Badge>
      </div>
      <Heading className="mt-3 text-lead font-semibold leading-snug md:text-h3">{source.title}</Heading>
      <p className="mt-1 text-meta text-ink-soft">
        {source.publisher.name}
        {source.locator ? ` · ${source.locator}` : ""}
      </p>
      {supports ? <p className="mt-3 text-body">{supports}</p> : null}
      <p className="mt-3 text-body text-ink-soft">{source.scopeNote}</p>
      <details className="mt-4 border-t border-line-soft pt-3">
        <summary className="details-summary flex min-h-[44px] items-center justify-between gap-3 rounded-control font-semibold text-action focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)]">
          <span>Ver fonte e metadados</span>
          <Icon name="chevronDown" size={18} className="details-chevron" />
        </summary>
        <dl className="mt-2 grid gap-x-4 gap-y-1.5 text-meta text-ink-soft sm:grid-cols-[auto_1fr]">
          {source.locator ? (
            <>
              <dt className="font-semibold text-ink">Localizador</dt>
              <dd>{source.locator}</dd>
            </>
          ) : null}
          {source.author ? (
            <>
              <dt className="font-semibold text-ink">Autoria</dt>
              <dd>{source.author}</dd>
            </>
          ) : null}
          {source.publishedOn ? (
            <>
              <dt className="font-semibold text-ink">Publicação</dt>
              <dd>{formatPartialDate(source.publishedOn)}</dd>
            </>
          ) : null}
          {source.sourceUpdatedOn ? (
            <>
              <dt className="font-semibold text-ink">Atualização na origem</dt>
              <dd>{formatPartialDate(source.sourceUpdatedOn)}</dd>
            </>
          ) : null}
          <dt className="font-semibold text-ink">Consulta</dt>
          <dd>{formatDate(source.accessedAt)}</dd>
          {source.reviewedAt ? (
            <>
              <dt className="font-semibold text-ink">Revisão editorial</dt>
              <dd>{formatDate(source.reviewedAt)}</dd>
            </>
          ) : null}
          <dt className="font-semibold text-ink">Reutilização</dt>
          <dd>{source.reuseCondition}</dd>
        </dl>
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-link mt-3 inline-flex items-center gap-1.5 text-meta">
          Abrir documento na origem <Icon name="external" size={16} />
          <span className="sr-only">(abre em nova aba)</span>
        </a>
        <p className="mt-2 text-label text-ink-soft">Origem oficial não equivale a certeza factual, a aprovação editorial nem a endosso da Polis.</p>
      </details>
    </article>
  );
}

/** Inline citation marker linking to the evidence block on the same page. */
export function CitationLinks({ keys, numbers }: { keys: string[]; numbers: Map<string, number> }) {
  const valid = keys.filter((k) => numbers.has(k));
  if (valid.length === 0) return null;
  return (
    <span className="ml-1 inline-flex gap-1 align-baseline">
      {valid.map((key) => (
        <a
          key={key}
          href={`#fonte-${key}`}
          className="inline-flex min-w-[1.5rem] items-center justify-center rounded-[6px] bg-sand px-1.5 text-label font-semibold text-sand-ink no-underline hover:underline focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-sand-ink)]"
          aria-label={`Ver fonte ${numbers.get(key)}`}
        >
          {numbers.get(key)}
        </a>
      ))}
    </span>
  );
}
