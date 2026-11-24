import Link from "next/link";
import { Icon } from "./icon";

type PaginationProps = {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
  label?: string;
};

export function Pagination({ page, totalPages, hrefFor, label = "Paginação" }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label={label} className="mt-6 flex items-center justify-between gap-3">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="btn btn-secondary btn-sm" rel="prev">
          <Icon name="chevronLeft" size={16} />
          <span>Anterior</span>
        </Link>
      ) : (
        <span />
      )}
      <p className="text-meta text-ink-soft" aria-live="polite">
        Página {page} de {totalPages}
      </p>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className="btn btn-secondary btn-sm" rel="next">
          <span>Próxima</span>
          <Icon name="chevronRight" size={16} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
