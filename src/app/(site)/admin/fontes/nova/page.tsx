import type { Metadata } from "next";
import Link from "next/link";
import { CreateSourceForm } from "@/components/admin/admin-forms";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Nova fonte" };

export default async function NewSourcePage() {
  const publishers = await db.publisher.findMany({
    where: { approved: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, hostnames: true, pathPrefixes: true },
  });
  return (
    <div className="max-w-3xl">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/admin/fontes" className="text-link">
          Fontes
        </Link>{" "}
        / Nova fonte
      </nav>
      <h1 className="mt-2 text-display-sm font-semibold">Nova fonte</h1>
      <p className="mt-2 text-body text-ink-soft">
        Use apenas documentos de órgãos e instituições da lista de editores aprovados. Registre o que a fonte sustenta, seus limites e a condição de reutilização informada.
      </p>
      <div className="mt-6">
        <CreateSourceForm publishers={publishers} />
      </div>
    </div>
  );
}
