import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/format";
import { Icon, type IconName } from "./icon";

export type Area = "FUNDAMENTOS" | "INSTITUICOES" | "IDEIAS" | "LEITURA_CRITICA";

export const areaMeta: Record<Area, { label: string; description: string; icon: IconName; bg: string; ink: string; slug: string }> = {
  FUNDAMENTOS: {
    label: "Fundamentos",
    description: "Política, Estado, cidadania e conceitos do debate.",
    icon: "book",
    bg: "bg-mint",
    ink: "text-mint-ink",
    slug: "fundamentos",
  },
  INSTITUICOES: {
    label: "Instituições",
    description: "Poderes, esferas, representação e história.",
    icon: "event",
    bg: "bg-blue",
    ink: "text-blue-ink",
    slug: "instituicoes",
  },
  IDEIAS: {
    label: "Ideias e correntes",
    description: "Perspectivas, argumentos e críticas.",
    icon: "community",
    bg: "bg-lilac",
    ink: "text-lilac-ink",
    slug: "ideias",
  },
  LEITURA_CRITICA: {
    label: "Leitura crítica",
    description: "Evidência, opinião e interpretação.",
    icon: "search",
    bg: "bg-sand",
    ink: "text-sand-ink",
    slug: "leitura-critica",
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

export function TopicCard({ area, href, title, description, cta = "Explorar tema" }: { area: Area; href: string; title?: string; description?: string; cta?: string }) {
  const meta = areaMeta[area];
  return (
    <article className="topic-card surface-card relative flex h-full flex-col p-5 md:p-6">
      <TopicIcon area={area} size={48} />
      <h3 className="mt-4 text-h3 font-semibold">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
          {title ?? meta.label}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-body text-ink-soft">{description ?? meta.description}</p>
      <p className="mt-4 flex items-center justify-between text-meta font-semibold text-action">
        <span>{cta}</span>
        <Icon name="arrowRight" size={18} />
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
