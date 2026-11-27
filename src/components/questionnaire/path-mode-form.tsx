"use client";

import { addTransitionType, startTransition, useActionState, useState } from "react";
import { ChoiceRow } from "@/components/polis/choice-row";
import { TRAIL_TRANSITION } from "@/components/polis/trail-flow";
import { usePathPreview, type PathMode } from "@/components/questionnaire/path-preview";
import { Icon } from "@/components/ui/icon";
import { SubmitButton } from "@/components/ui/submit-button";
import { cn } from "@/lib/format";
import { setPathModeAction, type PathModeState } from "@/modules/diagnostic/actions";

const MODE_LABEL = { GENERAL: "Trilha geral", AFFINITY: "Trilha por afinidade" } as const;

/**
 * Path order choice. The save button appears only when the selection differs
 * from the saved one; after saving, a status line confirms it. The radios are
 * uncontrolled and remounted (key) whenever the saved choice must be shown again,
 * so the automatic form reset after the action never shows a stale option.
 * Inside a PathPreviewProvider, choosing an option also shows the trail in that
 * order (as an animated transition) before it is saved.
 */
export function PathModeForm({
  current,
  affinityAvailable,
  unavailableReason = "Indisponível: respostas válidas insuficientes.",
  layout = "stack",
}: {
  current: "GENERAL" | "AFFINITY";
  affinityAvailable: boolean;
  unavailableReason?: string;
  layout?: "stack" | "row";
}) {
  const preview = usePathPreview();
  const [state, formAction] = useActionState<PathModeState, FormData>(setPathModeAction, { mode: current, saved: false });
  const [mode, setMode] = useState<string>(current);
  const [radiosKey, setRadiosKey] = useState(0);
  const select = (value: string, remount = false) => {
    const apply = () => {
      setMode(value);
      if (remount) setRadiosKey((key) => key + 1);
    };
    if (!preview) {
      apply();
      return;
    }
    startTransition(() => {
      addTransitionType(TRAIL_TRANSITION);
      apply();
    });
    preview.show(value as PathMode);
  };
  const restoreSaved = () => select(state.mode, true);
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
      <fieldset key={radiosKey} className={cn("gap-2.5", layout === "row" ? "grid sm:grid-cols-2" : "flex flex-col")}>
        <legend className="sr-only">Escolha da trilha</legend>
        <ChoiceRow
          name="mode"
          value="GENERAL"
          label={MODE_LABEL.GENERAL}
          description="Ordem editorial, igual para todas as pessoas."
          defaultChecked={state.mode === "GENERAL"}
          onChange={select}
        />
        <ChoiceRow
          name="mode"
          value="AFFINITY"
          label={MODE_LABEL.AFFINITY}
          description={affinityAvailable ? "Depois dos fundamentos, começa pelas perspectivas mais próximas das suas respostas." : unavailableReason}
          defaultChecked={state.mode === "AFFINITY"}
          disabled={!affinityAvailable}
          onChange={select}
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