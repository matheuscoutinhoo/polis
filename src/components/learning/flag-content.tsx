"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { SelectField, TextArea } from "@/components/ui/field";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import { flagContentAction, type FlagState } from "@/modules/events/flag-actions";

/** Lets readers point out a factual error, an inadequate source or leading language. */
export function FlagContent({ targetType, targetId, path, signedIn }: { targetType: "EVENT" | "LESSON"; targetId: string; path: string; signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [state, action] = useActionState<FlagState, FormData>(flagContentAction, { ok: false });

  if (!signedIn) {
    return (
      <p className="text-meta text-ink-soft">
        Encontrou um problema?{" "}
        <Link href={`/entrar?proximo=${encodeURIComponent(path)}`} className="text-link">
          Entre para sinalizar
        </Link>
        .
      </p>
    );
  }
  if (state.ok) {
    return (
      <Notice tone="success" role="status">
        {state.message}
      </Notice>
    );
  }
  return (
    <div>
      <button type="button" className="btn btn-text btn-sm px-0" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Icon name="flag" size={16} />
        <span>Sinalizar problema neste conteúdo</span>
      </button>
      {open ? (
        <form action={action} className="surface-card mt-3 flex flex-col gap-4 p-4">
          <input type="hidden" name="targetType" value={targetType} />
          <input type="hidden" name="targetId" value={targetId} />
          <input type="hidden" name="path" value={path} />
          <SelectField id="flag-reason" name="reason" label="Motivo" defaultValue="">
            <option value="" disabled>
              Escolha um motivo
            </option>
            <option value="FACTUAL_ERROR">Erro factual</option>
            <option value="INADEQUATE_SOURCE">Fonte inadequada</option>
            <option value="LEADING_LANGUAGE">Linguagem que induz uma opinião</option>
            <option value="OTHER">Outro</option>
          </SelectField>
          <TextArea id="flag-details" name="details" label="Detalhes" optional maxLength={1000} rows={3} />
          {state.error ? (
            <Notice tone="error" role="alert">
              {state.error}
            </Notice>
          ) : null}
          <div>
            <SubmitButton variant="secondary" pendingLabel="Enviando...">
              Enviar sinalização
            </SubmitButton>
          </div>
        </form>
      ) : null}
    </div>
  );
}
