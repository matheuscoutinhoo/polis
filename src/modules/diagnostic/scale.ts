export type AnswerChoice = "STRONGLY_DISAGREE" | "DISAGREE" | "NEUTRAL" | "AGREE" | "STRONGLY_AGREE" | "UNKNOWN";

export const ANSWER_OPTIONS: Array<{ value: AnswerChoice; label: string }> = [
  { value: "STRONGLY_DISAGREE", label: "Discordo totalmente" },
  { value: "DISAGREE", label: "Discordo em parte" },
  { value: "NEUTRAL", label: "Nem concordo nem discordo" },
  { value: "AGREE", label: "Concordo em parte" },
  { value: "STRONGLY_AGREE", label: "Concordo totalmente" },
  { value: "UNKNOWN", label: "Não sei / preciso entender melhor" },
];

export const ANSWER_LABEL: Record<AnswerChoice, string> = Object.fromEntries(ANSWER_OPTIONS.map((o) => [o.value, o.label])) as Record<AnswerChoice, string>;

/**
 * Agreement value of each option. "Não sei" is not a neutral position: it is
 * excluded from the calculation (null) and only affects coverage.
 */
export const CHOICE_VALUE: Record<AnswerChoice, number | null> = {
  STRONGLY_DISAGREE: -2,
  DISAGREE: -1,
  NEUTRAL: 0,
  AGREE: 1,
  STRONGLY_AGREE: 2,
  UNKNOWN: null,
};

export function isAnswerChoice(value: unknown): value is AnswerChoice {
  return typeof value === "string" && value in CHOICE_VALUE;
}
