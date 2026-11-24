import type { ReactNode } from "react";

export function AuthShell({ eyebrow, title, description, children, aside }: { eyebrow: string; title: string; description?: ReactNode; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="page-frame py-10 md:py-16">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,480px)_1fr] md:items-start">
        <section className="surface-card p-6 md:p-8">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-2 text-h2 font-semibold md:text-display-sm">{title}</h1>
          {description ? <div className="mt-3 text-body text-ink-soft">{description}</div> : null}
          <div className="mt-6">{children}</div>
        </section>
        {aside ? <aside className="hidden md:block">{aside}</aside> : null}
      </div>
    </div>
  );
}
