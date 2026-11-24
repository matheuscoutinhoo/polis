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
