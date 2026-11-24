import { ArgumentComparison } from "@/components/polis/argument-comparison";
import { CitationLinks } from "@/components/polis/evidence-block";
import { Icon } from "@/components/ui/icon";
import type { LessonBlock } from "@/modules/learning/content";

/** Renders structured lesson blocks (no HTML from the database). */
export function LessonBlocks({ blocks, numbers }: { blocks: LessonBlock[]; numbers: Map<string, number> }) {
  return (
    <div className="reading">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={index} className="mt-10 mb-3 font-serif text-h2 font-semibold">
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={index} className="mt-5">
                {block.text}
                <CitationLinks keys={block.sources} numbers={numbers} />
              </p>
            );
          case "definition":
            return (
              <div key={index} className="mt-6 border-l-[3px] border-action pl-4">
                <p className="text-label font-semibold uppercase tracking-wider text-action">Definição</p>
                <p className="mt-1">
                  <strong className="font-semibold">{block.term}:</strong> {block.text}
                  <CitationLinks keys={block.sources} numbers={numbers} />
                </p>
              </div>
            );
          case "example":
            return (
              <aside key={index} className="mt-7 rounded-card bg-mint p-5 md:p-6" aria-label={`Exemplo: ${block.title}`}>
                <p className="text-label font-semibold uppercase tracking-wider text-action">Exemplo</p>
                <p className="mt-1 text-lead font-semibold">{block.title}</p>
                <p className="mt-2 text-body md:text-reading">
                  {block.text}
                  <CitationLinks keys={block.sources} numbers={numbers} />
                </p>
              </aside>
            );
          case "comparison":
            return (
              <div key={index} className="text-body">
                <ArgumentComparison
                  title={block.title}
                  intro={block.intro}
                  orderNote={block.orderNote}
                  items={block.items.map((item) => ({
                    label: item.label,
                    heading: item.heading,
                    body: (
                      <>
                        {item.text}
                        <CitationLinks keys={item.sources} numbers={numbers} />
                      </>
                    ),
                  }))}
                />
              </div>
            );
          case "limit":
            return (
              <aside key={index} className="mt-7 flex gap-3 rounded-card bg-sand p-5 text-body" aria-label={block.title}>
                <Icon name="alert" className="mt-1 flex-none text-sand-ink" />
                <div>
                  <p className="font-semibold text-sand-ink">{block.title}</p>
                  <p className="mt-1">{block.text}</p>
                </div>
              </aside>
            );
          case "quote":
            return (
              <figure key={index} className="mt-7 border-l-[3px] border-control pl-4">
                <blockquote className="font-serif text-lead italic">“{block.text}”</blockquote>
                <figcaption className="mt-2 text-meta text-ink-soft">
                  {block.locator}
                  <CitationLinks keys={[block.sourceKey]} numbers={numbers} />
                </figcaption>
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
