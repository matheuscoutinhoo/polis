"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import { deleteAccountAction, updateDisplayNameAction, type AccountFormState } from "@/modules/account/actions";

const INITIAL: AccountFormState = { ok: false };

export function DisplayNameForm({ currentName }: { currentName: string }) {
  const [state, action] = useActionState(updateDisplayNameAction, INITIAL);
  return (
    <form action={action} className="flex flex-col gap-4">
      {state.error ? (
        <Notice tone="error" role="alert">
          {state.error}
        </Notice>
      ) : null}
      {state.ok && state.message ? (
        <Notice tone="success" role="status">
          {state.message}
        </Notice>
      ) : null}
      <TextField
        id="display-name"
        name="name"
        label="Nome de exibição"
        hint="Aparece nos fóruns. Use de 2 a 40 caracteres; não precisa ser seu nome completo."
        defaultValue={currentName}
        minLength={2}
        maxLength={40}
        required
        autoComplete="nickname"
      />
      <div>
        <SubmitButton variant="secondary" pendingLabel="Salvando...">
          Salvar nome
        </SubmitButton>
      </div>
    </form>
  );
}

/**
 * Account deletion requires the current password. The dialog explains what is
 * deleted and lets the person choose whether published texts are erased too.
 */
export function DeleteAccountForm() {
  const [state, action] = useActionState(deleteAccountAction, INITIAL);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      passwordRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <Button ref={triggerRef} variant="danger" icon="trash" iconPosition="start" onClick={() => setOpen(true)}>
        Excluir minha conta
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        className="m-auto w-[min(600px,calc(100vw-2rem))] rounded-panel border border-line bg-surface p-0 text-ink backdrop:bg-ink/40"
      >
        <form action={action} className="flex flex-col gap-5 p-6 md:p-8">
          <div>
            <h2 id={titleId} className="text-h3 font-semibold md:text-h2">
              Excluir conta definitivamente?
            </h2>
            <p className="mt-2 text-body text-ink-soft">
              Serão apagados: respostas e resultado do questionário, autorizações, progresso, XP, conquistas, fóruns seguidos e sessões. Esta ação não pode ser desfeita.
            </p>
          </div>
          {state.error ? (
            <Notice tone="error" role="alert">
              {state.error}
            </Notice>
          ) : null}
          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-body font-semibold">Tópicos e comentários que você publicou</legend>
            <label className="flex cursor-pointer items-start gap-3 rounded-control border border-control p-4 text-body has-[:checked]:border-action has-[:checked]:bg-selected">
              <input type="radio" name="contentChoice" value="keep" defaultChecked className="mt-1 h-5 w-5 flex-none accent-[var(--color-action)]" />
              <span>
                Manter os textos nas discussões, sem vínculo com você
                <span className="mt-1 block text-meta text-ink-soft">O autor passa a aparecer como “Participante removido”, preservando o contexto das conversas.</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-control border border-control p-4 text-body has-[:checked]:border-action has-[:checked]:bg-selected">
              <input type="radio" name="contentChoice" value="delete" className="mt-1 h-5 w-5 flex-none accent-[var(--color-action)]" />
              <span>
                Apagar também o texto dos meus tópicos e comentários
                <span className="mt-1 block text-meta text-ink-soft">As respostas de outras pessoas continuam visíveis.</span>
              </span>
            </label>
          </fieldset>
          <TextField ref={passwordRef} id="delete-password" name="password" type="password" label="Confirme com sua senha" autoComplete="current-password" required />
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <SubmitButton variant="danger" pendingLabel="Excluindo...">
              Excluir conta
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </>
  );
}
