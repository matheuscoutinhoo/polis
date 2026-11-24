import type { ReactNode } from "react";

type ComparisonItem = { label: string; heading: string; body: ReactNode; footer?: ReactNode };

/**
 * Argument comparison with equal visual weight: same card, color, size and
 * structure for every position. On mobile the items stack in the disclosed
 * editorial order.
 */
export function ArgumentComparison({ title, intro, orderNote, items, headingLevel: Heading = "h3" }: { title: string; intro?: ReactNode; orderNote: string; items: ComparisonItem[]; headingLevel?: "h2" | "h3" }) {
  return (
    <section className="my-8" aria-label={title}>
      <Heading className="text-h3 font-semibold">{title}</Heading>
      {intro ? <div className="mt-2 text-body text-ink-soft">{intro}</div> : null}
      <div className={`mt-4 grid gap-4 ${items.length > 2 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"}`}>
        {items.map((item) => (
          <article key={item.label + item.heading} className="surface-card flex flex-col p-5 md:p-6">
            <p className="eyebrow">{item.label}</p>
            <p className="mt-3 text-h3 font-semibold">{item.heading}</p>
            <div className="mt-3 flex-1 text-body">{item.body}</div>
            {item.footer ? <div className="mt-4 border-t border-line-soft pt-3 text-meta text-ink-soft">{item.footer}</div> : null}
          </article>
        ))}
      </div>
      <p className="mt-3 text-meta text-ink-soft">
        <span className="font-semibold">Ordem de apresentação:</span> {orderNote} A mesma estrutura visual não significa que as posições tenham o mesmo grau de evidência.
      </p>
    </section>
  );
}
