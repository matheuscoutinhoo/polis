"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectField, TextArea, TextField } from "@/components/ui/field";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  addExcerptAction,
  createEventAction,
  createSourceAction,
  publishEventAction,
  resolveFlagAction,
  resolveReportAction,
  reviewSourceAction,
  runIngestionNowAction,
  type AdminState,
} from "@/modules/admin/actions";
import { EVENT_THEMES } from "@/modules/events/themes";

const INITIAL: AdminState = { ok: false };

function Result({ state }: { state: AdminState }) {
  if (state.error) {
    return (
      <Notice tone="error" role="alert">
        <p>{state.error}</p>
        {state.details?.length ? (
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-meta">
            {state.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        ) : null}
      </Notice>
    );
  }
  if (state.ok && state.message) {
    return (
      <Notice tone="success" role="status">
        {state.message}
      </Notice>
    );
  }
  return null;
}

const MATERIAL_OPTIONS = [
  { value: "ATO_REGISTRO", label: "Ato ou registro (lei, decreto, decisão, votação, publicação oficial)" },
  { value: "DADO_ESTATISTICO", label: "Dado estatístico" },
  { value: "DECLARACAO", label: "Declaração (nota, discurso, posicionamento, texto programático)" },
  { value: "ESTUDO", label: "Estudo (pesquisa, avaliação, artigo)" },
  { value: "CONTEUDO_DIDATICO", label: "Conteúdo didático" },
];

const REUSE_OPTIONS = [
  { value: "OFFICIAL_ACT", label: "Ato oficial (texto normativo ou decisão)" },
  { value: "OPEN_LICENSE", label: "Licença aberta informada" },
  { value: "PUBLIC_DOMAIN", label: "Domínio público informado" },
  { value: "REFERENCE_ONLY", label: "Sem condição informada: apenas referência e trechos curtos" },
];

export function CreateSourceForm({ publishers }: { publishers: Array<{ id: string; name: string; hostnames: string[]; pathPrefixes: string[] }> }) {
  const [state, action] = useActionState(createSourceAction, INITIAL);
  return (
    <form action={action} className="flex flex-col gap-5">
      <Result state={state} />
      <SelectField id="source-publisher" name="publisherId" label="Órgão ou editor aprovado" required defaultValue="">
        <option value="" disabled>
          Escolha
        </option>
        {publishers.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} — {p.hostnames.join(", ")}
            {p.pathPrefixes.length ? ` (${p.pathPrefixes.join(", ")})` : ""}
          </option>
        ))}
      </SelectField>
      <TextField id="source-title" name="title" label="Título do documento" required maxLength={300} />
      <TextField
        id="source-url"
        name="url"
        label="Endereço canônico (HTTPS)"
        type="url"
        required
        maxLength={2000}
        hint="Precisa pertencer exatamente a um domínio do editor escolhido (e ao caminho, quando houver restrição)."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <TextField id="source-author" name="author" label="Autoria" optional maxLength={300} />
        <TextField id="source-locator" name="locator" label="Localizador (artigo, seção, página)" optional maxLength={300} />
        <TextField id="source-published" name="publishedOn" label="Data de publicação" optional placeholder="AAAA-MM-DD" maxLength={10} />
        <TextField id="source-updated" name="sourceUpdatedOn" label="Data de atualização" optional placeholder="AAAA-MM-DD" maxLength={10} />
      </div>
      <SelectField id="source-material" name="materialType" label="Tipo de material" required defaultValue="">
        <option value="" disabled>
          Escolha
        </option>
        {MATERIAL_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </SelectField>
      <SelectField id="source-reuse" name="reuseKind" label="Condição de reutilização" required defaultValue="">
        <option value="" disabled>
          Escolha
        </option>
        {REUSE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </SelectField>
      <TextArea id="source-reuse-text" name="reuseCondition" label="Descrição da condição de reutilização" rows={2} required maxLength={600} />
      <TextArea id="source-scope" name="scopeNote" label="O que a fonte sustenta e seus limites" rows={3} required maxLength={800} />
      <fieldset className="flex flex-col gap-4 rounded-card border border-line p-4">
        <legend className="px-1 font-semibold">Primeiro trecho (opcional)</legend>
        <TextField id="excerpt-locator" name="excerptLocator" label="Localização do trecho" optional maxLength={200} />
        <TextArea id="excerpt-text" name="excerptText" label="Trecho literal" optional rows={4} maxLength={2000} hint="Copie o texto exatamente como aparece na fonte." />
      </fieldset>
      <p className="text-meta text-ink-soft">A fonte entra como “aguardando revisão” e só pode ser usada depois de aprovada, com motivo registrado.</p>
      <div>
        <SubmitButton pendingLabel="Cadastrando...">Cadastrar fonte</SubmitButton>
      </div>
    </form>
  );
}

export function ReviewSourceForm({ sourceId }: { sourceId: string }) {
  const [state, action] = useActionState(reviewSourceAction, INITIAL);
  return (
    <form action={action} className="flex flex-col gap-3">
      <Result state={state} />
      <input type="hidden" name="sourceId" value={sourceId} />
      <TextArea id={`review-reason-${sourceId}`} name="reason" label="Motivo da decisão" rows={2} required minLength={5} maxLength={500} />
      <div className="flex flex-wrap gap-3">
        <SubmitButton size="sm" name="decision" value="APPROVED" pendingLabel="Registrando...">
          Aprovar
        </SubmitButton>
        <SubmitButton size="sm" variant="secondary" name="decision" value="REJECTED" pendingLabel="Registrando...">
          Rejeitar
        </SubmitButton>
      </div>
    </form>
  );
}

export function AddExcerptForm({ sourceId }: { sourceId: string }) {
  const [state, action] = useActionState(addExcerptAction, INITIAL);
  const [open, setOpen] = useState(false);
  const [handled, setHandled] = useState<AdminState | null>(null);
  if (state.ok && open && handled !== state) {
    setHandled(state);
    setOpen(false);
  }
  if (!open) {
    return (
      <div className="flex flex-col gap-2">
        {state.ok ? <Result state={state} /> : null}
        <div>
          <Button variant="text" size="sm" icon="plus" iconPosition="start" onClick={() => setOpen(true)}>
            Adicionar trecho
          </Button>
        </div>
      </div>
    );
  }
  return (
    <form action={action} className="flex flex-col gap-3 rounded-card border border-line p-4">
      <Result state={state} />
      <input type="hidden" name="sourceId" value={sourceId} />
      <TextField id={`excerpt-locator-${sourceId}`} name="locator" label="Localização" required maxLength={200} />
      <TextArea id={`excerpt-text-${sourceId}`} name="text" label="Trecho literal" rows={4} required maxLength={2000} />
      <div className="flex flex-wrap gap-3">
        <SubmitButton size="sm" pendingLabel="Salvando...">
          Salvar trecho
        </SubmitButton>
        <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export function CreateEventForm() {
  const [state, action] = useActionState(createEventAction, INITIAL);
  return (
    <form action={action} className="flex flex-col gap-5">
      <Result state={state} />
      <TextField id="event-title" name="title" label="Título descritivo" required minLength={8} maxLength={200} hint="Sem adjetivos ou termos sensacionalistas." />
      <TextField id="event-date" name="eventDate" label="Data do fato central" type="date" required />
      <fieldset className="flex flex-col gap-2">
        <legend className="text-body font-semibold">Temas</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {EVENT_THEMES.map((t) => (
            <label key={t.key} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-body">
              <input type="checkbox" name="themes" value={t.key} className="h-5 w-5 accent-[var(--color-action)]" />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>
      <TextArea id="event-notes" name="editorNotes" label="Notas editoriais (internas)" optional rows={3} maxLength={1500} hint="Orientações para a revisão e para o rascunho de IA. Não aparecem publicamente." />
      <label className="flex cursor-pointer items-start gap-3 text-body">
        <input type="checkbox" name="isDemo" className="mt-1 h-5 w-5 accent-[var(--color-action)]" />
        <span>
          Exemplo de demonstração
          <span className="block text-meta text-ink-soft">Demonstrações nunca entram no feed público de acontecimentos.</span>
        </span>
      </label>
      <div>
        <SubmitButton pendingLabel="Criando...">Criar rascunho</SubmitButton>
      </div>
    </form>
  );
}

export function PublishEventForm({ eventId, publishable, autoPublished = false }: { eventId: string; publishable: boolean; autoPublished?: boolean }) {
  const [state, action] = useActionState(publishEventAction, INITIAL);
  return (
    <form action={action} className="flex flex-col gap-3">
      <Result state={state} />
      {autoPublished ? (
        <p className="text-meta text-warning">Publicado pela busca automática, sem revisão humana. Depois de revisar, registre abaixo para confirmar a publicação.</p>
      ) : null}
      <input type="hidden" name="eventId" value={eventId} />
      <TextArea
        id="publish-reason"
        name="reason"
        label="Registro da revisão humana"
        rows={3}
        required
        minLength={10}
        maxLength={1000}
        hint="Descreva o que foi conferido: fatos centrais, datas, fontes, linguagem e impactos."
      />
      <div>
        <SubmitButton pendingLabel="Publicando..." disabled={!publishable}>
          {autoPublished ? "Confirmar revisão" : "Publicar"}
        </SubmitButton>
      </div>
      {!publishable ? <p className="text-meta text-ink-soft">Resolva os bloqueios da verificação para publicar.</p> : null}
    </form>
  );
}

export function RunIngestionForm({ running }: { running: boolean }) {
  const [state, action] = useActionState(runIngestionNowAction, INITIAL);
  return (
    <form action={action} className="flex flex-col items-start gap-3 md:items-end">
      <SubmitButton variant="secondary" icon="search" iconPosition="start" pendingLabel="Iniciando..." disabled={running}>
        {running ? "Busca em andamento" : "Buscar agora"}
      </SubmitButton>
      <Result state={state} />
    </form>
  );
}

export function ResolveReportForm({ reportId, canCloseTopic, hasAuthor }: { reportId: string; canCloseTopic: boolean; hasAuthor: boolean }) {
  const [state, action] = useActionState(resolveReportAction, INITIAL);
  const [decision, setDecision] = useState("DISMISS");
  const options = [
    { value: "DISMISS", label: "Arquivar denúncia (sem violação)" },
    { value: "REMOVE_CONTENT", label: "Remover o conteúdo" },
    ...(canCloseTopic ? [{ value: "CLOSE_TOPIC", label: "Encerrar o tópico para novos comentários" }] : []),
    ...(hasAuthor ? [{ value: "SUSPEND_AUTHOR", label: "Suspender a publicação da conta autora" }] : []),
  ];
  return (
    <form action={action} className="flex flex-col gap-3">
      <Result state={state} />
      <input type="hidden" name="reportId" value={reportId} />
      <fieldset className="flex flex-col gap-1">
        <legend className="text-body font-semibold">Decisão</legend>
        {options.map((o) => (
          <label key={o.value} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-body">
            <input
              type="radio"
              name="decision"
              value={o.value}
              checked={decision === o.value}
              onChange={() => setDecision(o.value)}
              className="h-5 w-5 accent-[var(--color-action)]"
            />
            {o.label}
          </label>
        ))}
      </fieldset>
      {decision === "SUSPEND_AUTHOR" ? (
        <TextField id={`days-${reportId}`} name="suspensionDays" label="Duração da suspensão (dias)" type="number" min={1} max={365} defaultValue={7} required />
      ) : null}
      <TextArea
        id={`reason-${reportId}`}
        name="reason"
        label="Motivo registrado"
        rows={2}
        required
        minLength={10}
        maxLength={1000}
        hint="Descreva a conduta avaliada. Opiniões políticas não são motivo de remoção."
      />
      <div>
        <SubmitButton size="sm" variant={decision === "DISMISS" ? "secondary" : "danger"} pendingLabel="Registrando...">
          Registrar decisão
        </SubmitButton>
      </div>
    </form>
  );
}

export function ResolveFlagForm({ flagId }: { flagId: string }) {
  const [state, action] = useActionState(resolveFlagAction, INITIAL);
  return (
    <form action={action} className="flex flex-col gap-3">
      <Result state={state} />
      <input type="hidden" name="flagId" value={flagId} />
      <TextArea id={`flag-note-${flagId}`} name="note" label="Resolução" rows={2} required minLength={5} maxLength={1000} hint="Ex.: trecho corrigido e data revisada; ou motivo para manter o conteúdo." />
      <div className="flex flex-wrap gap-3">
        <SubmitButton size="sm" name="decision" value="ACTION_TAKEN" pendingLabel="Registrando...">
          Corrigido
        </SubmitButton>
        <SubmitButton size="sm" variant="secondary" name="decision" value="DISMISSED" pendingLabel="Registrando...">
          Manter conteúdo
        </SubmitButton>
      </div>
    </form>
  );
}
