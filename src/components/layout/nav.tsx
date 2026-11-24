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

export function PrimaryNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav aria-label="Navegação principal" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {mainNavItems.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-[44px] items-center text-body transition-colors duration-150 focus-visible:outline-none focus-visible:after:h-[3px]",
                  "after:absolute after:inset-x-0 after:bottom-1 after:h-[2px] after:rounded-full after:transition-colors",
                  active ? "font-semibold text-action after:bg-action" : "text-ink-soft hover:text-ink after:bg-transparent hover:after:bg-line focus-visible:after:bg-action",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
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
                  "flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-control px-0.5 text-[0.75rem] leading-4 transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)] sm:px-1 sm:text-[0.8125rem]",
                  active ? "bg-selected font-semibold text-action" : "text-ink-soft hover:text-ink",
                )}
              >
                <Icon name={item.icon} size={22} />
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
