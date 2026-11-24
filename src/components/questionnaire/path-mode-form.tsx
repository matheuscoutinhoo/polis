"use client";

import { useState } from "react";
import { ChoiceRow } from "@/components/polis/choice-row";
import { SubmitButton } from "@/components/ui/submit-button";
import { setPathModeAction } from "@/modules/diagnostic/actions";

export function PathModeForm({
  current,
  affinityAvailable,
  unavailableReason = "Indisponível: respostas válidas insuficientes.",
}: {
  current: "GENERAL" | "AFFINITY";
  affinityAvailable: boolean;
  unavailableReason?: string;
}) {
  const [mode, setMode] = useState<string>(current);
  return (
    <form action={setPathModeAction} className="flex flex-col gap-3">
      <fieldset className="flex flex-col gap-2.5">
        <legend className="sr-only">Escolha da trilha</legend>
        <ChoiceRow name="mode" value="GENERAL" label="Trilha geral" description="Ordem editorial, igual para todas as pessoas." checked={mode === "GENERAL"} onChange={setMode} />
        <ChoiceRow
          name="mode"
          value="AFFINITY"
          label="Trilha por afinidade"
          description={affinityAvailable ? "Depois dos fundamentos, começa pelas perspectivas mais próximas das suas respostas." : unavailableReason}
          checked={mode === "AFFINITY"}
          disabled={!affinityAvailable}
          onChange={setMode}
        />
      </fieldset>
      <div>
        <SubmitButton variant="secondary" pendingLabel="Salvando..." disabled={mode === current}>
          Salvar escolha
        </SubmitButton>
      </div>
    </form>
  );
}
