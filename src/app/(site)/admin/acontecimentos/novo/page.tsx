import type { Metadata } from "next";
import Link from "next/link";
import { CreateEventForm } from "@/components/admin/admin-forms";

export const metadata: Metadata = { title: "Novo acontecimento" };

export default function NewEventPage() {
  return (
    <div className="max-w-2xl">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/admin/acontecimentos" className="text-link">
          Acontecimentos
        </Link>{" "}
        / Novo
      </nav>
      <h1 className="mt-2 text-display-sm font-semibold">Novo acontecimento</h1>
      <p className="mt-2 text-body text-ink-soft">
        Comece pelo título e pela data do fato central. Depois, na página de edição, vincule fontes aprovadas e redija a análise estruturada.
      </p>
      <div className="mt-6">
        <CreateEventForm />
      </div>
    </div>
  );
}
