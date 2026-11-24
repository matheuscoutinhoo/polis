import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = { title: { template: "%s · Administração · Polis", default: "Administração" }, robots: { index: false, follow: false } };

const ADMIN_NAV = [
  { href: "/admin", label: "Painel" },
  { href: "/admin/acontecimentos", label: "Acontecimentos" },
  { href: "/admin/fontes", label: "Fontes" },
  { href: "/admin/moderacao", label: "Moderação" },
];

/** Every admin route is guarded here and again inside each server action. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="page-frame py-6 md:py-8">
      <div className="flex flex-col gap-3 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 font-semibold text-action">
          <Icon name="shield" size={20} /> Área administrativa
        </p>
        <nav aria-label="Administração" className="flex flex-wrap gap-2">
          {ADMIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="chip">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mt-3 text-meta text-ink-soft">
        Decisões editoriais e de moderação são registradas com motivo. Respostas do questionário e afinidades individuais não são acessíveis nesta área.
      </p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
