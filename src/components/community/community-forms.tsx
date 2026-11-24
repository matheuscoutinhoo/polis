"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectField, TextArea, TextField } from "@/components/ui/field";
import { Notice } from "@/components/ui/notice";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  createCommentAction,
  createForumAction,
  createTopicAction,
  editCommentAction,
  editTopicAction,
  reportAction,
  type FormState,
} from "@/modules/community/actions";
import { DEFAULT_FORUM_RULES, FORUM_CATEGORIES, REPORT_REASONS } from "@/modules/community/rules";

const INITIAL: FormState = { ok: false };

function FormErrors({ state }: { state: FormState }) {
  if (!state.error) return null;
  return (
    <Notice tone="error" role="alert">
      {state.error}
    </Notice>
  );
}

export function CreateForumForm({ event }: { event: { id: string; title: string } | null }) {
  const [state, action] = useActionState(createForumAction, INITIAL);
  return (
    <form action={action} className="flex flex-col gap-5">
      <FormErrors state={state} />
      {event ? (
        <>
          <input type="hidden" name="eventId" value={event.id} />
          <Notice tone="neutral" icon="event">
            Fórum ligado ao acontecimento: <span className="font-semibold">{event.title}</span>
          </Notice>
        </>
      ) : null}
      <TextField id="forum-title" name="title" label="Título" required minLength={6} maxLength={90} error={state.fieldErrors?.title} hint="De 6 a 90 caracteres. Descreva o tema, sem slogans." />
      <TextArea
        id="forum-description"
        name="description"
        label="Descrição"
        rows={4}
        required
        minLength={20}
        maxLength={600}
        error={state.fieldErrors?.description}
        hint="Explique o que será discutido neste fórum."
      />
      <SelectField id="forum-category" name="category" label="Categoria" required defaultValue={event ? "ACONTECIMENTOS" : ""} error={state.fieldErrors?.category}>
        <option value="" disabled>
          Escolha uma categoria
        </option>
        {FORUM_CATEGORIES.map((c) => (
          <option key={c.key} value={c.key}>
            {c.label}
          </option>
        ))}
      </SelectField>
      <TextArea
        id="forum-rules"
        name="rules"
        label="Regras básicas"
        rows={7}
        required
        minLength={20}
        maxLength={1500}
        defaultValue={DEFAULT_FORUM_RULES}
        error={state.fieldErrors?.rules}
        hint="As regras gerais da comunidade valem em todos os fóruns. Você pode acrescentar regras específicas."
      />
      <div>
        <SubmitButton icon="arrowRight" pendingLabel="Criando fórum...">
          Criar fórum
        </SubmitButton>
      </div>
    </form>
  );
}

type Option = { id: string; label: string };

export function CreateTopicForm({
  forum,
  lessons,
  events,
  defaultLessonId,
  defaultEventId,
}: {
  forum: { id: string; slug: string };
  lessons: Option[];
  events: Option[];
  defaultLessonId?: string;
  defaultEventId?: string;
}) {
  const [state, action] = useActionState(createTopicAction, INITIAL);
  return (
    <form action={action} className="flex flex-col gap-5">
      <FormErrors state={state} />
      <input type="hidden" name="forumId" value={forum.id} />
      <input type="hidden" name="forumSlug" value={forum.slug} />
      <TextField id="topic-title" name="title" label="Título" required minLength={6} maxLength={140} error={state.fieldErrors?.title} />
      <TextArea
        id="topic-body"
        name="body"
        label="Texto"
        rows={8}
        required
        minLength={10}
        maxLength={5000}
        error={state.fieldErrors?.body}
        hint="Texto simples. Indique de onde vêm dados e citações."
      />
      <SelectField id="topic-lesson" name="lessonId" label="Relacionar a uma lição" optional defaultValue={defaultLessonId ?? ""}>
        <option value="">Nenhuma</option>
        {lessons.map((l) => (
          <option key={l.id} value={l.id}>
            {l.label}
          </option>
        ))}
      </SelectField>
      <SelectField id="topic-event" name="eventId" label="Relacionar a um acontecimento" optional defaultValue={defaultEventId ?? ""}>
        <option value="">Nenhum</option>
        {events.map((e) => (
          <option key={e.id} value={e.id}>
            {e.label}
          </option>
        ))}
      </SelectField>
      <div>
        <SubmitButton icon="arrowRight" pendingLabel="Publicando...">
          Publicar tópico
        </SubmitButton>
      </div>
    </form>
  );
}

export function CommentForm({ topicId, path }: { topicId: string; path: string }) {
  const [state, action] = useActionState(createCommentAction, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);
  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4">
      <FormErrors state={state} />
      {state.ok && state.message ? (
        <Notice tone="success" role="status">
          {state.message}
        </Notice>
      ) : null}
      <input type="hidden" name="topicId" value={topicId} />
      <input type="hidden" name="path" value={path} />
      <TextArea id="comment-body" name="body" label="Seu comentário" rows={4} required minLength={2} maxLength={3000} error={state.fieldErrors?.body} />
      <div>
        <SubmitButton pendingLabel="Publicando...">Comentar</SubmitButton>
      </div>
    </form>
  );
}

export function EditTopicForm({ topic, path }: { topic: { id: string; title: string; body: string }; path: string }) {
  const [state, action] = useActionState(editTopicAction, INITIAL);
  const [editing, setEditing] = useState(false);
  const [handled, setHandled] = useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state.ok) setEditing(false);
  }
  if (!editing) {
    return (
      <div className="flex flex-col gap-2">
        {state.ok && state.message ? (
          <p className="text-meta text-success" role="status">
            {state.message}
          </p>
        ) : null}
        <div>
          <Button variant="text" size="sm" icon="edit" iconPosition="start" onClick={() => setEditing(true)}>
            Editar tópico
          </Button>
        </div>
      </div>
    );
  }
  return (
    <form action={action} className="surface-card flex flex-col gap-4 p-4">
      <FormErrors state={state} />
      <input type="hidden" name="topicId" value={topic.id} />
      <input type="hidden" name="path" value={path} />
      <TextField id="edit-topic-title" name="title" label="Título" defaultValue={topic.title} required minLength={6} maxLength={140} error={state.fieldErrors?.title} />
      <TextArea id="edit-topic-body" name="body" label="Texto" rows={8} defaultValue={topic.body} required minLength={10} maxLength={5000} error={state.fieldErrors?.body} />
      <div className="flex flex-wrap gap-3">
        <SubmitButton size="sm" pendingLabel="Salvando...">
          Salvar alterações
        </SubmitButton>
        <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export function EditCommentForm({ comment, path }: { comment: { id: string; body: string }; path: string }) {
  const [state, action] = useActionState(editCommentAction, INITIAL);
  const [editing, setEditing] = useState(false);
  const [handled, setHandled] = useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state.ok) setEditing(false);
  }
  if (!editing) {
    return (
      <Button variant="text" size="sm" icon="edit" iconPosition="start" onClick={() => setEditing(true)}>
        Editar
      </Button>
    );
  }
  return (
    <form action={action} className="mt-2 flex w-full flex-col gap-3">
      <FormErrors state={state} />
      <input type="hidden" name="commentId" value={comment.id} />
      <input type="hidden" name="path" value={path} />
      <TextArea id={`edit-comment-${comment.id}`} name="body" label="Editar comentário" rows={4} defaultValue={comment.body} required minLength={2} maxLength={3000} error={state.fieldErrors?.body} />
      <div className="flex flex-wrap gap-3">
        <SubmitButton size="sm" pendingLabel="Salvando...">
          Salvar
        </SubmitButton>
        <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

const TARGET_LABEL = { FORUM: "fórum", TOPIC: "tópico", COMMENT: "comentário" } as const;

export function ReportForm({ targetType, targetId, path }: { targetType: "FORUM" | "TOPIC" | "COMMENT"; targetId: string; path: string }) {
  const [state, action] = useActionState(reportAction, INITIAL);
  const [open, setOpen] = useState(false);
  if (state.ok) {
    return (
      <p className="text-meta text-ink-soft" role="status">
        {state.message}
      </p>
    );
  }
  if (!open) {
    return (
      <Button variant="text" size="sm" icon="flag" iconPosition="start" onClick={() => setOpen(true)}>
        Denunciar
      </Button>
    );
  }
  return (
    <form action={action} className="surface-card mt-2 flex w-full flex-col gap-4 p-4">
      <FormErrors state={state} />
      <input type="hidden" name="targetType" value={targetType} />
      <input type="hidden" name="targetId" value={targetId} />
      <input type="hidden" name="path" value={path} />
      <fieldset className="flex flex-col gap-2">
        <legend className="text-body font-semibold">Por que denunciar este {TARGET_LABEL[targetType]}?</legend>
        <p className="text-meta text-ink-soft">Denúncias tratam de condutas. Discordar de uma opinião não é motivo de remoção.</p>
        {REPORT_REASONS.map((reason, index) => (
          <label key={reason.key} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-body">
            <input type="radio" name="reason" value={reason.key} required defaultChecked={index === 0} className="h-5 w-5 flex-none accent-[var(--color-action)]" />
            {reason.label}
          </label>
        ))}
      </fieldset>
      <TextArea id={`report-details-${targetId}`} name="details" label="Detalhes" optional rows={3} maxLength={1000} />
      <div className="flex flex-wrap gap-3">
        <SubmitButton size="sm" pendingLabel="Enviando...">
          Enviar denúncia
        </SubmitButton>
        <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
