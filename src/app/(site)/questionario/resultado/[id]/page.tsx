import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ResultLimits, ResultReport } from "@/components/questionnaire/result-report";
import { DeleteResultButton, HistoryLink, ResultHeader } from "@/components/questionnaire/result-shell";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { getResult, listResults } from "@/modules/diagnostic/service";

export const metadata: Metadata = { title: "Resultado anterior do questionário", robots: { index: false } };

export default async function PastResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser(`/questionario/resultado/${id}`);
  const stored = await getResult(user.id, id);
  if (!stored) notFound();
  if (stored.active) redirect("/questionario/resultado");
  const results = await listResults(user.id);
  const latest = results[0];

  return (
    <div className="page-frame py-8 md:py-12">
      <nav aria-label="Trilha de navegação" className="mb-4 text-meta text-ink-soft">
        <Link href="/conta" className="text-link">
          Sua conta
        </Link>{" "}
        /{" "}
        <Link href="/conta/resultados" className="text-link">
          Resultados do questionário
        </Link>{" "}
        / {formatDate(stored.completedAt)}
      </nav>
      <ResultHeader result={stored.result} completedAt={stored.completedAt} eyebrow="Resultado privado · anterior">
        <Notice tone="neutral" className="mt-6 max-w-3xl">
          Este é um resultado anterior, guardado só para você comparar. A trilha segue o resultado mais recente
          {latest ? `, de ${formatDate(latest.completedAt)}` : ""}.{" "}
          <Link href="/questionario/resultado" className="font-semibold underline underline-offset-2">
            Ver o resultado mais recente
          </Link>
        </Notice>
      </ResultHeader>

      <ResultReport result={stored.result} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <ResultLimits />
        <div className="surface-card flex flex-col gap-3 self-start p-5">
          <h3 className="text-lead font-semibold">Este resultado</h3>
          <Link href={`/conta/resultados?a=${latest?.id ?? ""}&b=${stored.id}`} className="text-link inline-flex min-h-[44px] items-center gap-1.5 font-semibold">
            <Icon name="scale" size={18} /> Comparar com o mais recente
          </Link>
          <HistoryLink count={results.length} />
          <DeleteResultButton resultId={stored.id} isOnly={results.length === 1} />
        </div>
      </div>
    </div>
  );
}