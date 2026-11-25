import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/format";

// Visitors without an account get the home page in full and a preview of every
// other content page. Pages render only the preview for them, so gated content
// never reaches the browser, and close it with one of these notices.

type NoticeProps = {
  /** Page to return to after signing in. */
  path: string;
  title: string;
  children: ReactNode;
  className?: string;
};

function signInHref(path: string) {
  return `/entrar?proximo=${encodeURIComponent(path)}`;
}

/** Closes a preview: what an account unlocks and the two ways in. */
export function SignupGate({ path, title, perks = [], children, className }: NoticeProps & { perks?: string[] }) {
  return (
    <section aria-labelledby="acesso-com-conta" className={cn("relative isolate overflow-hidden rounded-panel bg-mint p-6 md:p-8", className)}>
      <Icon name="lock" size={200} strokeWidth={1.25} className="pointer-events-none absolute -right-10 -bottom-14 -z-10 hidden text-mint-ink opacity-[0.08] sm:block" />
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-surface text-action" aria-hidden="true">
          <Icon name="lock" size={20} />
        </span>
        <p className="eyebrow">Prévia sem conta</p>
      </div>
      <h2 id="acesso-com-conta" className="mt-4 text-h2 font-semibold">
        {title}
      </h2>
      <div className="mt-2 max-w-xl text-body text-ink-soft">{children}</div>
      {perks.length ? (
        <ul className="mt-5 grid max-w-2xl gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-3 text-body">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-surface text-action" aria-hidden="true">
                <Icon name="check" size={14} />
              </span>
              {perk}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/criar-conta" icon="arrowRight">
          Criar conta
        </LinkButton>
        <LinkButton href={signInHref(path)} variant="secondary">
          Já tenho conta
        </LinkButton>
      </div>
    </section>
  );
}

/** Compact notice for list pages, where the list itself is the preview. */
export function SignupBanner({ path, title, children, className }: NoticeProps) {
  return (
    <aside aria-label="Acesso com conta" className={cn("flex flex-col gap-4 rounded-panel bg-mint p-4 md:flex-row md:items-center md:px-5", className)}>
      <div className="flex min-w-0 flex-1 items-start gap-3 md:items-center">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface text-action" aria-hidden="true">
          <Icon name="lock" size={18} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold">{title}</p>
          <div className="mt-0.5 text-meta text-ink-soft">{children}</div>
        </div>
      </div>
      <div className="flex flex-none flex-wrap gap-2">
        <LinkButton href="/criar-conta" size="sm">
          Criar conta
        </LinkButton>
        <LinkButton href={signInHref(path)} size="sm" variant="secondary">
          Já tenho conta
        </LinkButton>
      </div>
    </aside>
  );
}

const CONTINUATION_LINES = ["w-full", "w-11/12", "w-full", "w-3/4"];

/** Decorative hint that the text goes on after a preview; it carries no real content. */
export function PreviewContinuation({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative mt-8 flex flex-col gap-3", className)}>
      {CONTINUATION_LINES.map((width, index) => (
        <span key={index} className={cn("block h-3 rounded-full bg-line-soft", width)} />
      ))}
      <span className="absolute inset-0 bg-linear-to-b from-transparent to-paper" />
    </div>
  );
}