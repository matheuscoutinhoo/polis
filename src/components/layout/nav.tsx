"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";
import { Icon, type IconName } from "@/components/ui/icon";

export const mainNavItems: Array<{ href: string; label: string; icon: IconName; match: (path: string) => boolean }> = [
  { href: "/", label: "Início", icon: "home", match: (p) => p === "/" || p.startsWith("/inicio") || p.startsWith("/questionario") },
  { href: "/aprender", label: "Aprender", icon: "book", match: (p) => p.startsWith("/aprender") },
  { href: "/acontecimentos", label: "Acontecimentos", icon: "event", match: (p) => p.startsWith("/acontecimentos") },
  { href: "/comunidade", label: "Comunidade", icon: "community", match: (p) => p.startsWith("/comunidade") },
];

/** Desktop navigation as one segmented group; icons join the labels where the header has room (xl). */
export function PrimaryNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav aria-label="Navegação principal" className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-[12px] border border-line-soft bg-paper p-1">
        {mainNavItems.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-[44px] items-center gap-2 rounded-control px-3.5 text-body transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)]",
                  active ? "bg-selected font-semibold text-action-press" : "text-ink-soft hover:bg-surface hover:text-ink",
                )}
              >
                <Icon name={item.icon} size={18} className="hidden xl:block" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Secondary header link to the editorial method, quieter than the main navigation. */
export function MethodLink() {
  const active = (usePathname() ?? "").startsWith("/fontes-e-metodo");
  return (
    <Link
      href="/fontes-e-metodo"
      aria-current={active ? "page" : undefined}
      className={cn(
        "hidden min-h-[44px] items-center gap-1.5 rounded-control px-2.5 text-meta font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)] lg:inline-flex",
        active ? "bg-selected text-action-press" : "text-ink-soft hover:text-ink",
      )}
    >
      <Icon name="document" size={18} />
      Fontes e método
    </Link>
  );
}

export function BottomNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm supports-[backdrop-filter]:bg-paper/90 lg:hidden"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-[1fr_1fr_1.35fr_1.2fr] gap-1 px-2 py-1.5 sm:grid-cols-4">
        {mainNavItems.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-control px-0.5 text-[0.75rem] leading-4 transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)] sm:px-1 sm:text-[0.8125rem]",
                  active ? "font-semibold text-action-press" : "text-ink-soft hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-150",
                    active ? "bg-selected text-action" : "group-hover:bg-line-soft",
                  )}
                >
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
