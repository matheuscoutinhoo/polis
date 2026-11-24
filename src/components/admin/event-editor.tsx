"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { generateDraftAction, saveEventAction, type AdminState } from "@/modules/admin/actions";
import { LIST_SECTIONS, SECTION_LABEL, type EventContent, type ListSection } from "@/modules/events/content";
import { EVENT_THEMES } from "@/modules/events/themes";

type SourceOption = { key: string; title: string };
type LessonOption = { ref: string; title: string };

export type EditableEvent = {
  id: string;
  title: string;
  eventDate: string;
  themes: string[];
  editorNotes: string;
  status: string;
  content: EventContent;
};

type Field = { name: string; label: string; kind: "text" | "textarea" | "select"; options?: Array<{ value: string; label: string }>; hint?: string };
type Item = Record<string, unknown> & { sources: string[] };

function fieldsFor(section: ListSection, lessons: LessonOption[]): Field[] {
  switch (section) {
    case "actors":
      return [
        { name: "name", label: "Ator", kind: "text" },
        { name: "role", label: "Papel no acontecimento", kind: "textarea" },
      ];
    case "timeline":
      return [
        { name: "date", label: "Data", kind: "text", hint: "AAAA, AAAA-MM ou AAAA-MM-DD. Não invente precisão." },
        { name: "label", label: "Etapa documentada", kind: "textarea" },
      ];
    case "institutions":
      return [
        { name: "name", label: "Instituição", kind: "text" },
        { name: "role", label: "Responsabilidade neste caso", kind: "textarea" },
        { name: "limits", label: "Limites de atuação", kind: "textarea" },
      ];
    case "concepts":
      return [
        { name: "term", label: "Conceito", kind: "text" },
        { name: "relation", label: "Relação com o acontecimento", kind: "textarea" },
        { name: "lessonRef", label: "Lição relacionada", kind: "select", options: [{ value: "", label: "Nenhuma" }, ...lessons.map((l) => ({ value: l.ref, label: l.title }))] },
      ];
    case "impacts":
      return [
        {
          name: "kind",
          label: "Tipo de impacto",
          kind: "select",
          options: [
            { value: "DOCUMENTED", label: "Documentado (sustentado por fonte)" },
            { value: "POSSIBLE", label: "Possível (mecanismo, não comprovado)" },
          ],
        },
        { name: "decision", label: "Decisão", kind: "textarea" },
        { name: "change", label: "O que muda", kind: "textarea" },
        { name: "group", label: "Grupo afetado", kind: "text" },
        { name: "conditions", label: "Condições e limites", kind: "textarea" },
      ];
    case "arguments":
      return [
        { name: "attribution", label: "Atribuição (quem sustenta)", kind: "text" },
        {
          name: "kind",
          label: "Natureza",
          kind: "select",
          options: [
            { value: "DECLARATION", label: "Declaração de ator" },
            { value: "INTERPRETATION", label: "Interpretação" },
          ],
        },
        { name: "text", label: "Argumento", kind: "textarea" },
      ];
    case "uncertainties":
      return [{ name: "text", label: "Incerteza ou ponto em disputa", kind: "textarea" }];
  }
}

const EMPTY_ITEM: Record<ListSection, () => Item> = {
  actors: () => ({ name: "", role: "", sources: [] }),
  timeline: () => ({ date: "", label: "", sources: [] }),
  institutions: () => ({ name: "", role: "", limits: "", sources: [] }),
  concepts: () => ({ term: "", relation: "", lessonRef: null, sources: [] }),
  impacts: () => ({ kind: "POSSIBLE", decision: "", change: "", group: "", conditions: "", sources: [] }),
  arguments: () => ({ attribution: "", kind: "INTERPRETATION", text: "", sources: [] }),
  uncertainties: () => ({ text: "", sources: [] }),
};

function SourcePicker({ options, value, onChange, label }: { options: SourceOption[]; value: string[]; onChange: (next: string[]) => void; label: string }) {
  const unknown = value.filter((k) => !options.some((o) => o.key === k));
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-meta font-semibold">{label}</legend>
      {options.length === 0 ? <p className="text-meta text-ink-soft">Vincule fontes aprovadas ao acontecimento para poder citá-las.</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = value.includes(o.key);
          return (
            <button
              key={o.key}
              type="button"
              className="chip text-meta"
              aria-pressed={selected}
              title={o.title}
              onClick={() => onChange(selected ? value.filter((k) => k !== o.key) : [...value, o.key])}
            >
              {selected ? <Icon name="check" size={14} /> : null}
              <span className="max-w-[260px] truncate">{o.title}</span>
            </button>
          );
        })}
      </div>
      {unknown.length ? (
        <p className="text-meta text-danger">
          Referências não vinculadas ou não aprovadas: {unknown.join(", ")}.{" "}
          <button type="button" className="text-link" onClick={() => onChange(value.filter((k) => !unknown.includes(k)))}>
            Remover
          </button>
        </p>
      ) : null}
    </fieldset>
  );
}

function Input({ id, label, value, onChange, kind = "text", hint, options }: { id: string; label: string; value: string; onChange: (v: string) => void; kind?: Field["kind"]; hint?: string; options?: Field["options"] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-meta font-semibold">
        {label}
      </label>
      {kind === "textarea" ? (
        <textarea id={id} className="field-input min-h-[88px]" value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : kind === "select" ? (
        <select id={id} className="field-input" value={value} onChange={(e) => onChange(e.target.value)}>
          {options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} className="field-input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint ? <p className="text-meta text-ink-soft">{hint}</p> : null}
    </div>
  );
}

function Panel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="surface-card p-5">
      <h3 className="text-lead font-semibold">{title}</h3>
      {description ? <p className="mt-1 text-meta text-ink-soft">{description}</p> : null}
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}

export function EventEditor({ event, sources, lessons, aiAvailable }: { event: EditableEvent; sources: SourceOption[]; lessons: LessonOption[]; aiAvailable: boolean }) {
  const router = useRouter();
  const [title, setTitle] = useState(event.title);
  const [eventDate, setEventDate] = useState(event.eventDate);
  const [themes, setThemes] = useState<string[]>(event.themes);
  const [editorNotes, setEditorNotes] = useState(event.editorNotes);
  const [content, setContent] = useState<EventContent>(event.content);
  const [result, setResult] = useState<AdminState | null>(null);
  const [aiMessage, setAiMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, startSaving] = useTransition();
  const [generating, startGenerating] = useTransition();

  function update<K extends keyof EventContent>(key: K, value: EventContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  function updateItem(section: ListSection, index: number, patch: Partial<Item>) {
    const list = [...(content[section] as unknown as Item[])];
    list[index] = { ...list[index], ...patch };
    update(section, list as never);
  }

  function moveItem(section: ListSection, index: number, delta: -1 | 1) {
    const list = [...(content[section] as unknown as Item[])];
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    update(section, list as never);
  }

  function save() {
    setResult(null);
    startSaving(async () => {
      const response = await saveEventAction({ id: event.id, title, eventDate, themes, editorNotes: editorNotes || null, content });
      setResult(response);
      if (response.ok) {
        setDirty(false);
        router.refresh();
      }
    });
  }

  function generate() {
    const warning =
      event.status === "PUBLISHED"
        ? "O rascunho de IA substitui o conteúdo atual e retira o acontecimento do ar até nova revisão. Continuar?"
        : "O rascunho de IA substitui o conteúdo atual do editor. Alterações não salvas serão perdidas. Continuar?";
    if (!window.confirm(warning)) return;
    setAiMessage(null);
    startGenerating(async () => {
      const response = await generateDraftAction(event.id);
      if (response.ok) {
        setAiMessage({ tone: "success", text: "Rascunho gerado. Revise cada item, as referências e o relatório abaixo antes de publicar." });
        router.refresh();
      } else {
        setAiMessage({ tone: "error", text: response.error });
      }
    });
  }

  const lessonsOptions = lessons;

  return (
    <div className="flex flex-col gap-5">
      <div className="sticky top-16 z-20 flex flex-col gap-3 rounded-card border border-line bg-surface/95 p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-meta text-ink-soft" role="status" aria-live="polite">
          {saving ? "Salvando..." : dirty ? "Alterações não salvas." : "Tudo salvo."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" icon="layers" iconPosition="start" onClick={generate} busy={generating} busyLabel="Gerando rascunho..." disabled={!aiAvailable}>
            Gerar rascunho com IA
          </Button>
          <Button size="sm" onClick={save} busy={saving} busyLabel="Salvando...">
            Salvar rascunho
          </Button>
        </div>
      </div>
      {!aiAvailable ? <p className="text-meta text-ink-soft">IA não configurada neste ambiente (OPENAI_API_KEY ausente). A análise pode ser redigida manualmente.</p> : null}
      {aiMessage ? (
        <Notice tone={aiMessage.tone} role={aiMessage.tone === "error" ? "alert" : "status"}>
          {aiMessage.text}
        </Notice>
      ) : null}
      {result ? (
        <Notice tone={result.ok ? "success" : "error"} role={result.ok ? "status" : "alert"}>
          <p>{result.ok ? result.message : result.error}</p>
          {result.details?.length ? (
            <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-meta">
              {result.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          ) : null}
        </Notice>
      ) : null}

      <Panel title="Identificação">
        <Input id="ev-title" label="Título descritivo" value={title} onChange={(v) => (setTitle(v), setDirty(true))} />
        <Input id="ev-date" label="Data do fato central (AAAA-MM-DD)" value={eventDate} onChange={(v) => (setEventDate(v), setDirty(true))} />
        <fieldset>
          <legend className="text-meta font-semibold">Temas</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {EVENT_THEMES.map((t) => {
              const selected = themes.includes(t.key);
              return (
                <button
                  key={t.key}
                  type="button"
                  className="chip text-meta"
                  aria-pressed={selected}
                  onClick={() => (setThemes(selected ? themes.filter((k) => k !== t.key) : [...themes, t.key]), setDirty(true))}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <Input id="ev-notes" label="Notas editoriais internas" kind="textarea" value={editorNotes} onChange={(v) => (setEditorNotes(v), setDirty(true))} />
      </Panel>

      <Panel title={SECTION_LABEL.summary} description="Fato central, em linguagem simples. Sem fonte aprovada, a publicação fica bloqueada.">
        <Input id="ev-summary" label="Texto" kind="textarea" value={content.summary.text} onChange={(v) => update("summary", { ...content.summary, text: v })} />
        <SourcePicker label="Fontes" options={sources} value={content.summary.sources} onChange={(s) => update("summary", { ...content.summary, sources: s })} />
      </Panel>

      <Panel title={SECTION_LABEL.context}>
        <Input id="ev-context" label="Texto" kind="textarea" value={content.context.text} onChange={(v) => update("context", { ...content.context, text: v })} />
        <SourcePicker label="Fontes" options={sources} value={content.context.sources} onChange={(s) => update("context", { ...content.context, sources: s })} />
      </Panel>

      <Panel title={SECTION_LABEL.status} description="Situação na data de referência. Promessas e anúncios não são resultados.">
        <div className="grid gap-4 md:grid-cols-2">
          <Input id="ev-status-label" label="Rótulo curto" value={content.status.label} onChange={(v) => update("status", { ...content.status, label: v })} />
          <Input id="ev-status-asof" label="Data de referência (AAAA-MM-DD)" value={content.status.asOf} onChange={(v) => update("status", { ...content.status, asOf: v })} />
        </div>
        <Input id="ev-status-desc" label="Descrição" kind="textarea" value={content.status.description} onChange={(v) => update("status", { ...content.status, description: v })} />
        <SourcePicker label="Fontes" options={sources} value={content.status.sources} onChange={(s) => update("status", { ...content.status, sources: s })} />
      </Panel>

      {LIST_SECTIONS.map((section) => {
        const items = content[section] as unknown as Item[];
        const fields = fieldsFor(section, lessonsOptions);
        return (
          <Panel key={section} title={SECTION_LABEL[section]} description="Itens incompletos ou sem fonte aprovada são omitidos da versão publicada.">
            {items.length === 0 ? <p className="text-meta text-ink-soft">Nenhum item.</p> : null}
            {items.map((item, index) => (
              <div key={index} className="rounded-card border border-line p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-meta font-semibold">Item {index + 1}</p>
                  <div className="flex gap-1">
                    <Button variant="text" size="sm" onClick={() => moveItem(section, index, -1)} disabled={index === 0} aria-label={`Mover item ${index + 1} para cima`}>
                      ↑
                    </Button>
                    <Button variant="text" size="sm" onClick={() => moveItem(section, index, 1)} disabled={index === items.length - 1} aria-label={`Mover item ${index + 1} para baixo`}>
                      ↓
                    </Button>
                    <Button
                      variant="text"
                      size="sm"
                      icon="trash"
                      iconPosition="start"
                      onClick={() => update(section, items.filter((_, i) => i !== index) as never)}
                      aria-label={`Remover item ${index + 1}`}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  {fields.map((field) => (
                    <Input
                      key={field.name}
                      id={`ev-${section}-${index}-${field.name}`}
                      label={field.label}
                      kind={field.kind}
                      hint={field.hint}
                      options={field.options}
                      value={String(item[field.name] ?? "")}
                      onChange={(v) => updateItem(section, index, { [field.name]: field.name === "lessonRef" ? v || null : v })}
                    />
                  ))}
                  <SourcePicker label="Fontes" options={sources} value={item.sources} onChange={(s) => updateItem(section, index, { sources: s })} />
                </div>
              </div>
            ))}
            <div>
              <Button variant="secondary" size="sm" icon="plus" iconPosition="start" onClick={() => update(section, [...items, EMPTY_ITEM[section]()] as never)}>
                Adicionar item
              </Button>
            </div>
          </Panel>
        );
      })}

      <Panel title="Limitações da análise" description="Exibidas publicamente. Registre o que não pôde ser verificado.">
        {content.limitations.map((limitation, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex-1">
              <Input
                id={`ev-limitation-${index}`}
                label={`Limitação ${index + 1}`}
                kind="textarea"
                value={limitation}
                onChange={(v) => update("limitations", content.limitations.map((l, i) => (i === index ? v : l)))}
              />
            </div>
            <Button variant="text" size="sm" icon="trash" onClick={() => update("limitations", content.limitations.filter((_, i) => i !== index))} aria-label={`Remover limitação ${index + 1}`} />
          </div>
        ))}
        <div>
          <Button variant="secondary" size="sm" icon="plus" iconPosition="start" onClick={() => update("limitations", [...content.limitations, ""])}>
            Adicionar limitação
          </Button>
        </div>
      </Panel>

      <div className="flex justify-end">
        <Button onClick={save} busy={saving} busyLabel="Salvando...">
          Salvar rascunho
        </Button>
      </div>
    </div>
  );
}
