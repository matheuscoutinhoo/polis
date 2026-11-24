import { describe, expect, it } from "vitest";
import { DIMENSIONS, type DimensionKey } from "@/modules/diagnostic/dimensions";
import { QUESTIONS } from "@/modules/diagnostic/question-bank";
import { REFERENCE_PROFILES, type ReferenceProfile } from "@/modules/diagnostic/profiles";
import type { AnswerChoice } from "@/modules/diagnostic/scale";
import {
  MIN_VALID_PER_DIMENSION,
  computeAffinity,
  computeResult,
  rankAffinities,
  scoreDimension,
  type AnswerMap,
  type DimensionResult,
} from "@/modules/diagnostic/scoring";

const FIXED_DATE = new Date("2026-11-21T12:00:00.000Z");

/** Answers every item of a dimension so that its directed value is `directed` (−2..+2). */
function answersToward(dimension: DimensionKey, directed: -2 | -1 | 0 | 1 | 2): AnswerMap {
  const byValue: Record<number, AnswerChoice> = { [-2]: "STRONGLY_DISAGREE", [-1]: "DISAGREE", 0: "NEUTRAL", 1: "AGREE", 2: "STRONGLY_AGREE" };
  const answers: AnswerMap = {};
  for (const q of QUESTIONS.filter((item) => item.dimension === dimension)) {
    answers[q.id] = byValue[directed * q.direction];
  }
  return answers;
}

describe("question bank", () => {
  it("has 50 unique items, 10 per dimension, balanced 5/5 by direction", () => {
    expect(QUESTIONS).toHaveLength(50);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(50);
    for (const dimension of DIMENSIONS) {
      const items = QUESTIONS.filter((q) => q.dimension === dimension.key);
      expect(items).toHaveLength(10);
      expect(items.filter((q) => q.direction === 1)).toHaveLength(5);
      expect(items.filter((q) => q.direction === -1)).toHaveLength(5);
    }
  });
});

describe("dimension scoring", () => {
  it("does not reward automatic agreement: agreeing with everything yields a mixed, near-zero result", () => {
    const answers: AnswerMap = Object.fromEntries(QUESTIONS.map((q) => [q.id, "STRONGLY_AGREE" as const]));
    const result = scoreDimension("economia", answers);
    expect(result.score).toBe(0);
    expect(result.pattern).toBe("MIXED");
    expect(result.tension?.towardPositive).toHaveLength(5);
    expect(result.tension?.towardNegative).toHaveLength(5);
  });

  it("maps fully consistent answers to the poles", () => {
    expect(scoreDimension("economia", answersToward("economia", 2)).score).toBe(1);
    expect(scoreDimension("economia", answersToward("economia", -2)).score).toBe(-1);
    expect(scoreDimension("economia", answersToward("economia", 1)).score).toBe(0.5);
    expect(scoreDimension("economia", answersToward("economia", 0)).pattern).toBe("INTERMEDIATE");
  });

  it("excludes 'Não sei' instead of treating it as a neutral position", () => {
    const answers = answersToward("liberdades", 2);
    const items = QUESTIONS.filter((q) => q.dimension === "liberdades");
    for (const q of items.slice(0, 4)) answers[q.id] = "UNKNOWN";
    const result = scoreDimension("liberdades", answers);
    expect(result.validCount).toBe(6);
    expect(result.unknownCount).toBe(4);
    // If "Não sei" counted as neutral the score would be 0.6.
    expect(result.score).toBe(1);
  });

  it(`marks a dimension as insufficient below ${MIN_VALID_PER_DIMENSION} valid answers`, () => {
    const answers = answersToward("costumes", 2);
    const items = QUESTIONS.filter((q) => q.dimension === "costumes");
    for (const q of items.slice(0, 3)) answers[q.id] = "UNKNOWN";
    for (const q of items.slice(3, 5)) delete answers[q.id];
    const result = scoreDimension("costumes", answers);
    expect(result.validCount).toBe(5);
    expect(result.missingCount).toBe(2);
    expect(result.status).toBe("INSUFFICIENT");
    expect(result.score).toBeNull();
    expect(result.pattern).toBeNull();
  });
});

describe("result and affinities", () => {
  it("is reproducible: the same answers produce the same result", () => {
    const answers = { ...answersToward("economia", 1), ...answersToward("liberdades", -2), ...answersToward("costumes", 2) };
    expect(computeResult(answers, FIXED_DATE)).toEqual(computeResult({ ...answers }, FIXED_DATE));
  });

  it("does not compute affinities with fewer than two valid dimensions", () => {
    const result = computeResult(answersToward("economia", 2), FIXED_DATE);
    expect(result.validDimensionCount).toBe(1);
    expect(result.affinityStatus).toBe("INSUFFICIENT");
    expect(result.affinities).toEqual([]);
    expect(result.closest).toEqual([]);
  });

  it("handles an empty questionnaire without failing", () => {
    const result = computeResult({}, FIXED_DATE);
    expect(result.answeredCount).toBe(0);
    expect(result.dimensions.every((d) => d.status === "INSUFFICIENT")).toBe(true);
    expect(result.affinityStatus).toBe("INSUFFICIENT");
  });

  it("finds the profile whose ranges contain all the answers", () => {
    const answers = {
      ...answersToward("economia", -1),
      ...answersToward("liberdades", 1),
      ...answersToward("costumes", -2),
      ...answersToward("participacao", -1),
    };
    const result = computeResult(answers, FIXED_DATE);
    const conservative = result.affinities.find((a) => a.key === "conservadorismos");
    expect(conservative?.index).toBe(1);
    expect(conservative?.limited).toBe(false);
    expect(result.closest[0]).toBe("conservadorismos");
  });

  it("reports ties with the same rank and keeps a deterministic editorial order", () => {
    const profiles: ReferenceProfile[] = [
      { ...REFERENCE_PROFILES[1], key: "conservadorismos", editorialOrder: 2, ranges: { economia: { min: 0, max: 0.5, support: "DIRECT", justification: "" }, liberdades: { min: 0, max: 0.5, support: "DIRECT", justification: "" } } },
      { ...REFERENCE_PROFILES[0], key: "liberalismos", editorialOrder: 1, ranges: { economia: { min: -0.5, max: 0, support: "DIRECT", justification: "" }, liberdades: { min: -0.5, max: 0, support: "DIRECT", justification: "" } } },
    ];
    const dims: DimensionResult[] = (["economia", "liberdades"] as const).map((key) => ({
      key,
      total: 10,
      validCount: 10,
      unknownCount: 0,
      missingCount: 0,
      status: "OK",
      score: 0,
      pattern: "INTERMEDIATE",
      tension: null,
      contributions: [],
    }));
    const ranked = rankAffinities(profiles.map((p) => computeAffinity(p, dims)), profiles);
    expect(ranked.map((a) => a.key)).toEqual(["liberalismos", "conservadorismos"]);
    expect(ranked.map((a) => a.rank)).toEqual([1, 1]);
    expect(ranked[0].tiedWith).toEqual(["conservadorismos"]);
    expect(ranked[1].tiedWith).toEqual(["liberalismos"]);
  });

  it("marks a profile as not comparable when too few of its dimensions are valid", () => {
    const answers = { ...answersToward("costumes", 2), ...answersToward("participacao", 2) };
    const result = computeResult(answers, FIXED_DATE);
    const libertarian = result.affinities.find((a) => a.key === "libertarianismos");
    expect(libertarian?.comparable).toBe(false);
    expect(libertarian?.index).toBeNull();
    expect(result.affinities.at(-1)?.comparable).toBe(false);
  });
});
