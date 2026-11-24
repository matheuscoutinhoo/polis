import type { Metadata } from "next";
import Link from "next/link";
import { CreateForumForm } from "@/components/community/community-forms";
import { PublishGate } from "@/components/community/community-ui";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "Criar fórum" };

export default async function NewForumPage({ searchParams }: { searchParams: Promise<{ acontecimento?: string }> }) {
  const { acontecimento } = await searchParams;
  const user = await getCurrentUser();
  const event = acontecimento
    ? await db.event.findFirst({ where: { id: acontecimento.slice(0, 40), status: "PUBLISHED", isDemo: false }, select: { id: true, title: true } })
    : null;
  const nextPath = acontecimento ? `/comunidade/novo?acontecimento=${encodeURIComponent(acontecimento)}` : "/comunidade/novo";

  return (
    <div className="page-frame py-8 md:py-12">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/comunidade" className="text-link">
          Comunidade
        </Link>{" "}
        / Criar fórum
      </nav>
      <div className="mt-2 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="max-w-2xl">
          <h1 className="text-display-sm font-semibold md:text-display">Criar fórum</h1>
          <p className="mt-2 text-lead text-ink-soft">Um fórum reúne tópicos sobre uma corrente, uma ideia ou um acontecimento.</p>
          <div className="mt-6">
            <PublishGate user={user} nextPath={nextPath}>
              <CreateForumForm event={event} />
            </PublishGate>
          </div>
        </div>
        <aside className="surface-card h-fit p-5">
          <h2 className="text-lead font-semibold">Antes de criar</h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-meta">
            <li>Procure se já existe um fórum sobre o tema.</li>
            <li>Use um título descritivo, sem adjetivos que antecipem uma conclusão.</li>
            <li>Você pode criar até 3 fóruns por dia.</li>
            <li>
              As{" "}
              <Link href="/comunidade/regras" className="text-link">
                regras da comunidade
              </Link>{" "}
              valem em todos os fóruns.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
