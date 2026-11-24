import Image from "next/image";
import { cn, initials } from "@/lib/format";

type LogoProps = {
  variant?: "grafite" | "branco" | "petroleo";
  width?: number;
  className?: string;
  priority?: boolean;
};

/** Original Polis signature (unmodified SVG); minimum recommended lockup width: 120 px. */
export function Logo({ variant = "grafite", width = 128, className, priority }: LogoProps) {
  const height = Math.round((width * 790) / 2080);
  return (
    <Image
      src={`/brand/polis-horizontal-${variant}.svg`}
      alt="Polis"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={cn("block h-auto", className)}
    />
  );
}

export function Avatar({ name, size = 40, className }: { name: string; size?: number; className?: string }) {
  return (
    <span
      className={cn("inline-flex flex-none items-center justify-center rounded-full bg-mint font-semibold text-action", className)}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
