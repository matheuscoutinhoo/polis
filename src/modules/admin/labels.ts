// Client-safe labels for the admin area.

export const ACTION_LABEL: Record<string, string> = {
  REMOVE_CONTENT: "Conteúdo removido",
  CLOSE_TOPIC: "Tópico encerrado",
  REOPEN_TOPIC: "Tópico reaberto",
  SUSPEND_USER: "Conta suspensa",
  LIFT_SUSPENSION: "Suspensão encerrada",
  DISMISS_REPORT: "Denúncia arquivada",
  RESOLVE_FLAG: "Sinalização resolvida",
  DISMISS_FLAG: "Sinalização arquivada",
  PUBLISH_EVENT: "Acontecimento publicado",
  UNPUBLISH_EVENT: "Acontecimento retirado",
  APPROVE_SOURCE: "Fonte aprovada",
  REJECT_SOURCE: "Fonte rejeitada",
};

export const EVENT_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Rascunho",
  IN_REVIEW: "Em revisão",
  PUBLISHED: "Publicado",
  ARCHIVED: "Arquivado",
};

export const INGESTION_STATUS_LABEL: Record<string, string> = {
  RUNNING: "Em andamento",
  SUCCESS: "Concluída",
  PARTIAL: "Concluída com falhas",
  FAILED: "Falhou",
  SKIPPED: "Sem IA: nada criado",
};

export const INGESTION_TRIGGER_LABEL: Record<string, string> = {
  SCHEDULE: "Agendada",
  MANUAL: "Manual",
  CLI: "Linha de comando",
};

export const INGESTION_DECISION_LABEL: Record<string, string> = {
  published: "Publicado",
  draft: "Rascunho para revisão",
  error: "Erro",
  found: "Encontrada",
  limit: "Fora do limite",
  duplicate: "Já coberta",
  ignored: "Ignorada",
};

export const FLAG_REASON_LABEL: Record<string, string> = {
  FACTUAL_ERROR: "Erro factual",
  INADEQUATE_SOURCE: "Fonte inadequada",
  LEADING_LANGUAGE: "Linguagem tendenciosa",
  OTHER: "Outro motivo",
};

export const REVIEW_STATUS_LABEL: Record<string, string> = {
  PENDING: "Aguardando revisão",
  APPROVED: "Aprovada",
  REJECTED: "Rejeitada",
};
