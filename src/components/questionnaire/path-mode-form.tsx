"use client";

import { useActionState, useState } from "react";
import { ChoiceRow } from "@/components/polis/choice-row";
import { Icon } from "@/components/ui/icon";
import { SubmitButton } from "@/components/ui/submit-button";
import { setPathModeAction, type PathModeState } from "@/modules/diagnostic/actions";

const MODE_LABEL = { GENERAL: "Trilha geral", AFFINITY: "Trilha por afinidade" } as const;

/**
 * Path order choice. The save button appears only when the selection differs
 * from the saved one; after saving, a status line confirms it. The radios are
 * uncontrolled and remounted (key) whenever the saved choice must be shown again,
 * so the automatic form reset after the action never shows a stale option.
 */
export function PathModeForm({
  current,
  affinityAvailable,
  unavailableReason = "Indisponível: respostas válidas insuficientes.",
}: {
  current: "GENERAL" | "AFFINITY";
  affinityAvailable: boolean;
  unavailableReason?: string;
}) {
  const [state, formAction] = useActionState<PathModeState, FormData>(setPathModeAction, { mode: current, saved: false });
  const [mode, setMode] = useState<string>(current);
  const [radiosKey, setRadiosKey] = useState(0);
  const restoreSaved = () => {
    setMode(state.mode);
    setRadiosKey((key) => key + 1);
  };
  // After a save, follow the mode the server kept (affinity may be unavailable).
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    setMode(state.mode);
    setRadiosKey((key) => key + 1);
  }
  const changed = mode !== state.mode;

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <fieldset key={radiosKey} className="flex flex-col gap-2.5">
        <legend className="sr-only">Escolha da trilha</legend>
        <ChoiceRow
          name="mode"
          value="GENERAL"
          label={MODE_LABEL.GENERAL}
          description="Ordem editorial, igual para todas as pessoas."
          defaultChecked={state.mode === "GENERAL"}
          onChange={setMode}
        />
        <ChoiceRow
          name="mode"
          value="AFFINITY"
          label={MODE_LABEL.AFFINITY}
          description={affinityAvailable ? "Depois dos fundamentos, começa pelas perspectivas mais próximas das suas respostas." : unavailableReason}
          defaultChecked={state.mode === "AFFINITY"}
          disabled={!affinityAvailable}
          onChange={setMode}
        />
      </fieldset>
      <div className="flex min-h-[44px] flex-wrap items-center gap-3" aria-live="polite">
        {changed ? (
          <>
            <SubmitButton pendingLabel="Salvando..." icon="check" iconPosition="start">
              Salvar escolha
            </SubmitButton>
            <button type="button" className="btn btn-text" onClick={restoreSaved}>
              Manter {MODE_LABEL[state.mode].toLowerCase()}
            </button>
          </>
        ) : (
          <p className="flex items-center gap-2 text-meta text-ink-soft">
            <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-mint text-action" aria-hidden="true">
              <Icon name="check" size={14} />
            </span>
            {state.saved ? `Escolha salva: ${MODE_LABEL[state.mode].toLowerCase()}.` : `Em uso: ${MODE_LABEL[state.mode].toLowerCase()}.`}
          </p>
        )}
      </div>
    </form>
  );
}