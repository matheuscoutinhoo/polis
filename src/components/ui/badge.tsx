import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Tone = "mint" | "blue" | "lilac" | "sand" | "neutral" | "success" | "warning" | "danger";

const toneClass: Record<Tone, string> = {
  mint: "bg-mint text-mint-ink",
  blue: "bg-blue text-blue-ink",
  lilac: "bg-lilac text-lilac-ink",
  sand: "bg-sand text-sand-ink",
  neutral: "bg-line-soft text-ink-soft",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
};

export function Badge({ tone = "mint", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-[6px] px-2 py-1 text-label font-semibold leading-none", toneClass[tone], className)}>
      {children}
    </span>
  );
}
