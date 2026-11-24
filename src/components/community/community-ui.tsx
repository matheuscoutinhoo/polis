import Link from "next/link";
import type { ReactNode } from "react";
import { ResendVerificationButton } from "@/components/auth/auth-forms";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { formatDate, formatDateTime } from "@/lib/format";
import type { CurrentUser } from "@/lib/session";
import { isSuspended } from "@/lib/session-utils";

export const REMOVED_AUTHOR = "Participante removido";

/** Distinguishes participant posts from Polis editorial content. */
export function ParticipantLabel({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-[6px] bg-blue px-2 py-1 text-label font-semibold leading-none text-blue-ink ${className ?? ""}`}>
      <Icon name="community" size={14} /> Conteúdo de participantes · não verificado pela Polis
    </span>
  );
}

export function AuthorLine({ name, createdAt, editedAt }: { name: string | null | undefined; createdAt: Date; editedAt?: Date | null }) {
  return (
    <p className="text-meta text-ink-soft">
      <span className="font-semibold text-ink">{name ?? REMOVED_AUTHOR}</span> · <time dateTime={createdAt.toISOString()}>{formatDateTime(createdAt)}</time>
      {editedAt ? <span> · editado em {formatDate(editedAt)}</span> : null}
    </p>
  );
}

/** User text is rendered as escaped plain text; line breaks are preserved. */
export function UserText({ children }: { children: string }) {
  return <div className="whitespace-pre-line break-words text-body">{children}</div>;
}

/**
 * Explains why the person cannot publish yet (no session, unverified e-mail or
 * suspension). Returns the children when publishing is allowed.
 */
export function PublishGate({ user, nextPath, children }: { user: CurrentUser | null; nextPath: string; children: ReactNode }) {
  if (!user) {
    return (
      <Notice tone="neutral" title="Entre para participar">
        <p>Leitura aberta a todos. Para publicar, entre ou crie uma conta e confirme seu e-mail.</p>
        <p className="mt-2 flex flex-wrap gap-4">
          <Link href={`/entrar?proximo=${encodeURIComponent(nextPath)}`} className="text-link">
            Entrar
          </Link>
          <Link href="/criar-conta" className="text-link">
            Criar conta
          </Link>
        </p>
      </Notice>
    );
  }
  if (!user.emailVerified) {
    return (
      <Notice tone="info" title="Confirme seu e-mail para publicar">
        <p>A confirmação reduz contas falsas e spam. Enviamos o link para {user.email}.</p>
        <div className="mt-3">
          <ResendVerificationButton email={user.email} />
        </div>
      </Notice>
    );
  }
  if (isSuspended(user)) {
    return (
      <Notice tone="warning" title="Publicação suspensa temporariamente">
        Até {user.suspendedUntil ? formatDate(user.suspendedUntil) : "—"}. Motivo: {user.suspensionReason ?? "não informado"}. Leitura, lições e seus dados continuam disponíveis.
      </Notice>
    );
  }
  return <>{children}</>;
}
