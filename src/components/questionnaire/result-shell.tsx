import type { ReactNode } from "react";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Icon } from "@/components/ui/icon";
import { formatDate } from "@/lib/format";
import { deleteResultAction } from "@/modules/diagnostic/actions";
import type { QuestionnaireResult } from "@/modules/diagnostic/scoring";

/** Title block shared by the current result and earlier ones. */
export function ResultHeader({ result, completedAt, eyebrow, children }: { result: QuestionnaireResult; completedAt: Date; eyebrow: string; children?: ReactNode }) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">O que suas respostas indicam</h1>
      <p className="mt-3 max-w-3xl text-lead text-ink-soft">
        Concluído em {formatDate(completedAt)}, com a versão {result.scoringVersion} do método. {result.answeredCount} situações respondidas, {result.unknownCount} com “Não
        sei”.
      </p>
      {children}
    </>
  );
}

/** Deletes one result after confirmation; warns when it is the only one left. */
export function DeleteResultButton({ resultId, isOnly, label = "Apagar este resultado" }: { resultId: string; isOnly: boolean; label?: string }) {
  return (
    <div className="flex">
      <ConfirmDialog
        triggerLabel={label}
        triggerVariant="text"
        triggerIcon="trash"
        title="Apagar este resultado?"
        description={
          isOnly
            ? "É o seu único resultado: as respostas e o mapa serão apagados e, para voltar a usar lições, acontecimentos e fóruns, será preciso responder ao questionário de novo."
            : "As respostas e o mapa deste resultado serão apagados. Os outros resultados continuam no seu histórico; se este for o mais recente, o anterior passa a ordenar a trilha."
        }
        confirmLabel="Apagar resultado"
        pendingLabel="Apagando..."
        action={deleteResultAction}
      >
        <input type="hidden" name="resultId" value={resultId} />
      </ConfirmDialog>
    </div>
  );
}
export function HistoryLink({ count }: { count: number }) {
  return (
    <Link href="/conta/resultados" className="text-link inline-flex min-h-[44px] items-center gap-1.5 font-semibold">
      <Icon name="layers" size={18} />
      {count > 1 ? `Comparar seus ${count} resultados` : "Histórico de resultados"}
    </Link>
  );
}
