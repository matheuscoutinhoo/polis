import type { ReactNode } from "react";
import Link from "next/link";
import { cn, plural } from "@/lib/format";
import { Icon, type IconName } from "./icon";

export type Area = "FUNDAMENTOS" | "INSTITUICOES" | "IDEIAS" | "LEITURA_CRITICA";

// `motion` names how the tile's watermark glyph moves on hover (see `.topic-watermark` in globals.css).
export const areaMeta: Record<
  Area,
  { label: string; description: string; icon: IconName; bg: string; ink: string; border: string; slug: string; motion: "grow" | "rise" | "glow" | "scan" }
> = {
  FUNDAMENTOS: {
    label: "Fundamentos",
    description: "Política, Estado, cidadania e conceitos do debate.",
    icon: "sprout",
    bg: "bg-mint",
    ink: "text-mint-ink",
    border: "border-mint-ink",
    slug: "fundamentos",
    motion: "grow",
  },
  INSTITUICOES: {
    label: "Instituições",
    description: "Poderes, esferas, representação e história.",
    icon: "landmark",
    bg: "bg-blue",
    ink: "text-blue-ink",
    border: "border-blue-ink",
    slug: "instituicoes",
    motion: "rise",
  },
  IDEIAS: {
    label: "Ideias e correntes",
    description: "Perspectivas, argumentos e críticas.",
    icon: "lightbulb",
    bg: "bg-lilac",
    ink: "text-lilac-ink",
    border: "border-lilac-ink",
    slug: "ideias",
    motion: "glow",
  },
  LEITURA_CRITICA: {
    label: "Leitura crítica",
    description: "Evidência, opinião e interpretação.",
    icon: "search",
    bg: "bg-sand",
    ink: "text-sand-ink",
    border: "border-sand-ink",
    slug: "leitura-critica",
    motion: "scan",
  },
};

export function areaFromSlug(slug: string | undefined): Area | null {
  const entry = Object.entries(areaMeta).find(([, meta]) => meta.slug === slug);
  return entry ? (entry[0] as Area) : null;
}

export function TopicIcon({ area, size = 48, className }: { area: Area; size?: number; className?: string }) {
  const meta = areaMeta[area];
  return (
    <span
      className={cn("inline-flex flex-none items-center justify-center rounded-[10px]", meta.bg, meta.ink, className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Icon name={meta.icon} size={Math.round(size * 0.48)} />
    </span>
  );
}

export function IconChip({ icon, tone = "mint", size = 48 }: { icon: IconName; tone?: "mint" | "blue" | "lilac" | "sand"; size?: number }) {
  const bg = { mint: "bg-mint text-mint-ink", blue: "bg-blue text-blue-ink", lilac: "bg-lilac text-lilac-ink", sand: "bg-sand text-sand-ink" }[tone];
  return (
    <span className={cn("inline-flex flex-none items-center justify-center rounded-[10px]", bg)} style={{ width: size, height: size }} aria-hidden="true">
      <Icon name={icon} size={Math.round(size * 0.48)} />
    </span>
  );
}

/**
 * Topic entry point in the topic color: what the area covers (its published
 * modules, or the lessons when there is a single module), counts and one link
 * to the filtered catalog, stretched over the whole tile. `featured` marks the
 * common starting point (wide tile, contents listed beside the introduction).
 * Long lists (one module per reference current) become compact chips.
 */
export function TopicTile({
  area,
  href,
  highlights,
  moduleCount,
  lessonCount,
  featured,
  className,
}: {
  area: Area;
  href: string;
  highlights: string[];
  moduleCount: number;
  lessonCount: number;
  featured?: boolean;
  className?: string;
}) {
  const meta = areaMeta[area];
  return (
    <article
      className={cn(
        "topic-card relative isolate flex h-full flex-col overflow-hidden rounded-panel border border-transparent p-5 focus-within:shadow-[inset_0_0_0_2px_var(--color-action)] md:p-6",
        meta.bg,
        featured && "lg:grid lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:gap-x-10 lg:p-8",
        className,
      )}
    >
      <Icon
        name={meta.icon}
        size={featured ? 240 : 150}
        strokeWidth={1.25}
        data-motion={meta.motion}
        className={cn("topic-watermark pointer-events-none absolute -z-10", meta.ink, featured ? "-right-8 -bottom-12" : "-right-6 -bottom-8")}
      />
      <div>
        <div className="flex items-center gap-3">
          <span className={cn("inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-surface", meta.ink)} aria-hidden="true">
            <Icon name={meta.icon} size={24} />
          </span>
          {featured ? <span className="rounded-[6px] bg-surface px-2 py-1 text-label font-semibold uppercase tracking-wider text-action">Ponto de partida</span> : null}
        </div>
        <h3 className={cn("mt-5 font-semibold", featured ? "text-h2" : "text-h3")}>
          <Link href={href} className="after:absolute after:inset-0 after:rounded-panel focus-visible:outline-none">
            {meta.label}
          </Link>
        </h3>
        <p className="mt-2 max-w-md text-body text-ink-soft">{meta.description}</p>
      </div>
      {highlights.length > 4 ? (
        <ul className={cn("mt-5 flex flex-wrap content-start gap-2", featured ? "lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center" : "flex-1")}>
          {highlights.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5 rounded-full bg-surface py-1 pr-3 pl-1.5 text-meta text-ink">
              <span className={cn("inline-flex h-5 w-5 flex-none items-center justify-center rounded-full", meta.bg, meta.ink)} aria-hidden="true">
                <Icon name="book" size={11} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      ) : highlights.length ? (
        <ul className={cn("mt-5 flex flex-col gap-2.5", featured ? "lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center" : "flex-1")}>
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-3 text-meta text-ink">
              <span className={cn("inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-surface", meta.ink)} aria-hidden="true">
                <Icon name="book" size={14} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1" />
      )}
      <p className={cn("mt-5 text-meta font-semibold", meta.ink)}>
        {lessonCount ? `${plural(moduleCount, "módulo", "módulos")} · ${plural(lessonCount, "lição", "lições")}` : "Em preparação"}
      </p>
    </article>
  );
}

export function SectionHeading({ eyebrow, title, description, id, as: As = "h2", className }: { eyebrow?: string; title: string; description?: ReactNode; id?: string; as?: "h1" | "h2" | "h3"; className?: string }) {
  return (
    <div className={className}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <As id={id} className={cn("font-semibold", As === "h1" ? "mt-2 text-display-sm md:text-display" : "mt-1 text-h2", !eyebrow && "mt-0")}>
        {title}
      </As>
      {description ? <div className="mt-2 text-lead text-ink-soft">{description}</div> : null}
    </div>
  );
}

export function EmptyState({ icon = "info", title, children, action }: { icon?: IconName; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="surface-card flex flex-col items-start gap-3 p-6 md:p-8">
      <IconChip icon={icon} tone="blue" size={44} />
      <h3 className="text-h3 font-semibold">{title}</h3>
      {children ? <div className="text-body text-ink-soft">{children}</div> : null}
      {action}
    </div>
  );
}
