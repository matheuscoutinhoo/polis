import { DIMENSIONS, type DimensionKey } from "./dimensions";
import { QUESTIONS, QUESTION_BANK_VERSION, type Question } from "./question-bank";
import { REFERENCE_PROFILES, PROFILES_VERSION, type CurrentKey, type ReferenceProfile } from "./profiles";
import { CHOICE_VALUE, type AnswerChoice } from "./scale";

// Cálculo determinístico e versionado. A IA não participa da classificação.
//
// 1. Cada resposta vale −2..+2 ("Não sei" é excluída, não é neutra).
// 2. Valor direcionado = valor × direção do item × peso.
// 3. Escore da dimensão = soma dos valores direcionados ÷ (2 × soma dos pesos
//    válidos), em −1..+1, arredondado a duas casas.
// 4. Dimensão com menos de MIN_VALID_PER_DIMENSION respostas válidas é
//    considerada insuficiente e não entra nas afinidades.
// 5. Afinidade com um perfil = 1 − (distância média até as faixas do perfil ÷ 2),
//    considerando só dimensões válidas e definidas no perfil (mínimo de
//    MIN_OVERLAP_FOR_PROFILE). Não é probabilidade nem precisão científica.
// 6. Empates (mesmo índice arredondado) são exibidos como empate; para ordenar a
//    trilha, usa-se a ordem editorial fixa dos perfis.
// 7. Resultados guardados mantêm os escores calculados; quando os perfis de
//    referência mudam de versão, as afinidades são recalculadas a partir desses
//    escores (withCurrentProfiles), sem alterar respostas nem escores.

export const SCORING_VERSION = "2026.11-v1";
export const MIN_VALID_PER_DIMENSION = 6;
export const MIN_VALID_DIMENSIONS_FOR_AFFINITY = 2;
export const MIN_OVERLAP_FOR_PROFILE = 2;
export const FULL_COMPARISON_OVERLAP = 3;
export const INTERMEDIATE_THRESHOLD = 0.2;
export const CLOSEST_MARGIN = 0.03;
export const BAND_HIGH = 0.9;
export const BAND_MODERATE = 0.75;

export type AnswerMap = Partial<Record<string, AnswerChoice>>;

export type QuestionContribution = {
  questionId: string;
  choice: AnswerChoice | null;
  /** −2..+2 já orientado pela direção do item (null quando não há posição). */
  directed: number | null;
};

export type DimensionPattern = "NEGATIVE" | "POSITIVE" | "INTERMEDIATE" | "MIXED";

export type DimensionResult = {
  key: DimensionKey;
  total: number;
  validCount: number;
  unknownCount: number;
  missingCount: number;
  status: "OK" | "INSUFFICIENT";
  score: number | null;
  pattern: DimensionPattern | null;
  tension: { towardPositive: string[]; towardNegative: string[] } | null;
  contributions: QuestionContribution[];
};

export type AffinityBand = "HIGH" | "MODERATE" | "LOW";

export type AffinityResult = {
  key: CurrentKey;
  comparable: boolean;
  limited: boolean;
  index: number | null;
  band: AffinityBand | null;
  rank: number | null;
  tiedWith: CurrentKey[];
  dimensions: Array<{ key: DimensionKey; userScore: number; min: number; max: number; distance: number }>;
};

export type QuestionnaireResult = {
  bankVersion: string;
  scoringVersion: string;
  profilesVersion: string;
  computedAt: string;
  answeredCount: number;
  unknownCount: number;
  dimensions: DimensionResult[];
  validDimensionCount: number;
  affinityStatus: "OK" | "INSUFFICIENT";
  affinities: AffinityResult[];
  closest: CurrentKey[];
  tensionDimensions: DimensionKey[];
  /** Set when the affinities were recomputed: profiles version used when the result was saved. */
  computedWithProfilesVersion?: string;
};

export function round2(value: number): number {
  // "+ 0" turns -0 into 0 so stored (JSON) and computed results are identical.
  return Math.round((value + Number.EPSILON) * 100) / 100 + 0;
}

function directedValue(question: Question, choice: AnswerChoice | undefined): number | null {
  if (!choice) return null;
  const value = CHOICE_VALUE[choice];
  if (value === null) return null;
  return value * question.direction + 0;
}

export function scoreDimension(key: DimensionKey, answers: AnswerMap, questions: Question[] = QUESTIONS): DimensionResult {
  const items = questions.filter((q) => q.dimension === key);
  let weighted = 0;
  let weightSum = 0;
  let validCount = 0;
  let unknownCount = 0;
  let missingCount = 0;
  const contributions: QuestionContribution[] = [];

  for (const question of items) {
    const choice = answers[question.id];
    if (!choice) missingCount += 1;
    else if (choice === "UNKNOWN") unknownCount += 1;
    const directed = directedValue(question, choice);
    if (directed !== null) {
      validCount += 1;
      weighted += directed * question.weight;
      weightSum += question.weight;
    }
    contributions.push({ questionId: question.id, choice: choice ?? null, directed });
  }

  const sufficient = validCount >= MIN_VALID_PER_DIMENSION;
  const score = sufficient && weightSum > 0 ? round2(weighted / (2 * weightSum)) : null;

  const towardPositive = contributions.filter((c) => c.directed !== null && c.directed >= 1).map((c) => c.questionId);
  const towardNegative = contributions.filter((c) => c.directed !== null && c.directed <= -1).map((c) => c.questionId);
  const tension = sufficient && towardPositive.length >= 2 && towardNegative.length >= 2 ? { towardPositive, towardNegative } : null;

  let pattern: DimensionPattern | null = null;
  if (score !== null) {
    if (Math.abs(score) < INTERMEDIATE_THRESHOLD) pattern = tension ? "MIXED" : "INTERMEDIATE";
    else pattern = score > 0 ? "POSITIVE" : "NEGATIVE";
  }

  contributions.sort((a, b) => Math.abs(b.directed ?? 0) - Math.abs(a.directed ?? 0));

  return {
    key,
    total: items.length,
    validCount,
    unknownCount,
    missingCount,
    status: sufficient ? "OK" : "INSUFFICIENT",
    score,
    pattern,
    tension,
    contributions,
  };
}

function bandFor(index: number): AffinityBand {
  if (index >= BAND_HIGH) return "HIGH";
  if (index >= BAND_MODERATE) return "MODERATE";
  return "LOW";
}

export function computeAffinity(profile: ReferenceProfile, dimensions: DimensionResult[]): AffinityResult {
  const compared: AffinityResult["dimensions"] = [];
  for (const dimension of dimensions) {
    const range = profile.ranges[dimension.key];
    if (!range || dimension.status !== "OK" || dimension.score === null) continue;
    const score = dimension.score;
    const distance = score < range.min ? range.min - score : score > range.max ? score - range.max : 0;
    compared.push({ key: dimension.key, userScore: score, min: range.min, max: range.max, distance: round2(distance) });
  }
  if (compared.length < MIN_OVERLAP_FOR_PROFILE) {
    return { key: profile.key, comparable: false, limited: false, index: null, band: null, rank: null, tiedWith: [], dimensions: compared };
  }
  const meanDistance = compared.reduce((sum, d) => sum + d.distance, 0) / compared.length;
  const index = round2(1 - meanDistance / 2);
  return {
    key: profile.key,
    comparable: true,
    limited: compared.length < FULL_COMPARISON_OVERLAP,
    index,
    band: bandFor(index),
    rank: null,
    tiedWith: [],
    dimensions: compared,
  };
}

export function rankAffinities(results: AffinityResult[], profiles: ReferenceProfile[] = REFERENCE_PROFILES): AffinityResult[] {
  const order = new Map(profiles.map((p) => [p.key, p.editorialOrder]));
  const sorted = [...results].sort((a, b) => {
    if (a.comparable !== b.comparable) return a.comparable ? -1 : 1;
    if (a.comparable && b.comparable && a.index !== b.index) return (b.index ?? 0) - (a.index ?? 0);
    return (order.get(a.key) ?? 99) - (order.get(b.key) ?? 99);
  });
  let rank = 0;
  let previous: number | null = null;
  for (const result of sorted) {
    if (!result.comparable || result.index === null) continue;
    if (previous === null || result.index !== previous) rank += 1;
    result.rank = rank;
    previous = result.index;
  }
  for (const result of sorted) {
    if (!result.comparable) continue;
    result.tiedWith = sorted.filter((other) => other.key !== result.key && other.comparable && other.index === result.index).map((other) => other.key);
  }
  return sorted;
}

function affinitiesFor(dimensions: DimensionResult[]) {
  const validDimensionCount = dimensions.filter((d) => d.status === "OK").length;
  const affinityStatus: QuestionnaireResult["affinityStatus"] = validDimensionCount >= MIN_VALID_DIMENSIONS_FOR_AFFINITY ? "OK" : "INSUFFICIENT";
  const affinities =
    affinityStatus === "OK" ? rankAffinities(REFERENCE_PROFILES.map((profile) => computeAffinity(profile, dimensions))) : [];
  const comparable = affinities.filter((a) => a.comparable && a.index !== null);
  const top = comparable[0]?.index ?? null;
  const closest =
    top !== null && top >= BAND_MODERATE ? comparable.filter((a) => (a.index ?? 0) >= round2(top - CLOSEST_MARGIN)).map((a) => a.key) : [];
  return { validDimensionCount, affinityStatus, affinities, closest };
}

export function computeResult(answers: AnswerMap, now: Date = new Date(), questions: Question[] = QUESTIONS): QuestionnaireResult {
  const dimensions = DIMENSIONS.map((d) => scoreDimension(d.key, answers, questions));
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const unknownCount = questions.filter((q) => answers[q.id] === "UNKNOWN").length;

  return {
    bankVersion: QUESTION_BANK_VERSION,
    scoringVersion: SCORING_VERSION,
    profilesVersion: PROFILES_VERSION,
    computedAt: now.toISOString(),
    answeredCount,
    unknownCount,
    dimensions,
    ...affinitiesFor(dimensions),
    tensionDimensions: dimensions.filter((d) => d.tension).map((d) => d.key),
  };
}

/**
 * A stored result as it reads today: when the reference profiles changed after it
 * was saved, the affinities are recomputed from its dimension scores, so names,
 * comparisons and the path always use the current profiles.
 */
export function withCurrentProfiles(result: QuestionnaireResult): QuestionnaireResult {
  if (result.profilesVersion === PROFILES_VERSION) return result;
  return {
    ...result,
    ...affinitiesFor(result.dimensions),
    profilesVersion: PROFILES_VERSION,
    computedWithProfilesVersion: result.computedWithProfilesVersion ?? result.profilesVersion,
  };
}

/** Affinity index per current, used only to order perspective lessons. */
export function affinityIndexByCurrent(result: QuestionnaireResult | null): Partial<Record<CurrentKey, number>> {
  const map: Partial<Record<CurrentKey, number>> = {};
  if (!result || result.affinityStatus !== "OK") return map;
  for (const affinity of result.affinities) {
    if (affinity.comparable && affinity.index !== null) map[affinity.key] = affinity.index;
  }
  return map;
}
