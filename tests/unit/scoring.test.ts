import { describe, expect, it } from "vitest";
import { DIMENSIONS, type DimensionKey } from "@/modules/diagnostic/dimensions";
import { QUESTIONS, QUESTION_BY_ID, QUESTION_SLOTS, attemptQuestionIds, attemptQuestions, drawQuestionIds, type Question } from "@/modules/diagnostic/question-bank";
import { REFERENCE_PROFILES, PROFILES_VERSION, type ReferenceProfile } from "@/modules/diagnostic/profiles";
import type { AnswerChoice } from "@/modules/diagnostic/scale";
import {
  MIN_VALID_PER_DIMENSION,
  SCORING_VERSION,
  answerBreakdown,
  computeAffinity,
  computeResult,
  leanOf,
  rankAffinities,
  scoreDimension,
  withCurrentMethod,
  type AnswerMap,
  type DimensionResult,
  type QuestionnaireResult,
} from "@/modules/diagnostic/scoring";

const FIXED_DATE = new Date("2026-11-21T12:00:00.000Z");

/** Deterministic random source (mulberry32), so that draws are reproducible. */
function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The situations of one drawn attempt: one version of every theme. */
const SET: Question[] = attemptQuestions(drawQuestionIds(seeded(7)))!;

/** Answers every item of a dimension so that its directed value is `directed` (−2..+2). */
function answersToward(dimension: DimensionKey, directed: -2 | -1 | 0 | 1 | 2): AnswerMap {
  const byValue: Record<number, AnswerChoice> = { [-2]: "STRONGLY_DISAGREE", [-1]: "DISAGREE", 0: "NEUTRAL", 1: "AGREE", 2: "STRONGLY_AGREE" };
  const answers: AnswerMap = {};
  for (const q of SET.filter((item) => item.dimension === dimension)) {
    answers[q.id] = byValue[directed * q.direction];
  }
  return answers;
}

/** A valid dimension with the given score, to test affinities directly. */
function dimensionWith(key: DimensionKey, score: number): DimensionResult {
  return { key, total: 10, validCount: 10, unknownCount: 0, missingCount: 0, status: "OK", score, pattern: null, tension: null, contributions: [] };
}

describe("question bank", () => {
  it("has 10 themes per dimension, balanced 5/5 by direction, each with at least two versions and unique ids", () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
    for (const dimension of DIMENSIONS) {
      const slots = QUESTION_SLOTS.filter((slot) => slot.dimension === dimension.key);
      expect(slots).toHaveLength(10);
      expect(slots.filter((slot) => slot.direction === 1)).toHaveLength(5);
      expect(slots.filter((slot) => slot.direction === -1)).toHaveLength(5);
    }
    for (const slot of QUESTION_SLOTS) {
      expect(slot.versions.length).toBeGreaterThanOrEqual(2);
      expect(new Set(slot.versions.map((version) => version.situation)).size).toBe(slot.versions.length);
    }
  });

  it("draws one version of every theme: 10 situations per block, in block order, five in each direction", () => {
    for (let seed = 1; seed <= 40; seed++) {
      const questions = attemptQuestions(drawQuestionIds(seeded(seed)))!;
      expect(questions).toHaveLength(50);
      expect(new Set(questions.map((q) => q.slot)).size).toBe(50);
      DIMENSIONS.forEach((dimension, block) => {
        const items = questions.slice(block * 10, block * 10 + 10);
        expect(items.every((q) => q.dimension === dimension.key)).toBe(true);
        expect(items.filter((q) => q.direction === 1)).toHaveLength(5);
      });
    }
  });

  it("varies situations and order between attempts and reaches every version of the bank", () => {
    const draws = Array.from({ length: 40 }, (_, i) => drawQuestionIds(seeded(i + 1)));
    expect(new Set(draws.map((ids) => ids.join())).size).toBe(draws.length);
    expect(new Set(draws.flat())).toEqual(new Set(QUESTIONS.map((q) => q.id)));
    expect(new Set(draws.map((ids) => QUESTION_BY_ID.get(ids[0])!.slot)).size).toBeGreaterThan(1);
  });

  it("reads attempts saved before the draw as the original 50 situations, and rejects ids missing from the bank", () => {
    const original = ["eco", "lib", "cos", "par", "soc"].flatMap((prefix) => Array.from({ length: 10 }, (_, i) => `${prefix}-${String(i + 1).padStart(2, "0")}`));
    expect(attemptQuestionIds([])).toEqual(original);
    expect(attemptQuestions([])?.map((q) => q.id)).toEqual(original);
    expect(attemptQuestions(["eco-01", "situacao-removida"])).toBeNull();
  });
});

describe("dimension scoring", () => {
  it("does not reward automatic agreement: agreeing with everything yields a mixed, near-zero result", () => {
    const answers: AnswerMap = Object.fromEntries(SET.map((q) => [q.id, "STRONGLY_AGREE" as const]));
    const result = scoreDimension("economia", answers, SET);
    expect(result.score).toBe(0);
    expect(result.pattern).toBe("MIXED");
    expect(result.tension?.towardPositive).toHaveLength(5);
    expect(result.tension?.towardNegative).toHaveLength(5);
  });

  it("maps fully consistent answers to the poles", () => {
    expect(scoreDimension("economia", answersToward("economia", 2), SET).score).toBe(1);
    expect(scoreDimension("economia", answersToward("economia", -2), SET).score).toBe(-1);
    expect(scoreDimension("economia", answersToward("economia", 1), SET).score).toBe(0.5);
    expect(scoreDimension("economia", answersToward("economia", 0), SET).pattern).toBe("INTERMEDIATE");
  });

  it("excludes 'Não sei' instead of treating it as a neutral position", () => {
    const answers = answersToward("liberdades", 2);
    const items = SET.filter((q) => q.dimension === "liberdades");
    for (const q of items.slice(0, 4)) answers[q.id] = "UNKNOWN";
    const result = scoreDimension("liberdades", answers, SET);
    expect(result.validCount).toBe(6);
    expect(result.unknownCount).toBe(4);
    // If "Não sei" counted as neutral the score would be 0.6.
    expect(result.score).toBe(1);
  });

  it(`marks a dimension as insufficient below ${MIN_VALID_PER_DIMENSION} valid answers`, () => {
    const answers = answersToward("costumes", 2);
    const items = SET.filter((q) => q.dimension === "costumes");
    for (const q of items.slice(0, 3)) answers[q.id] = "UNKNOWN";
    for (const q of items.slice(3, 5)) delete answers[q.id];
    const result = scoreDimension("costumes", answers, SET);
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
    expect(computeResult(answers, SET, FIXED_DATE)).toEqual(computeResult({ ...answers }, SET, FIXED_DATE));
  });

  it("does not compute affinities with fewer than two valid dimensions", () => {
    const result = computeResult(answersToward("economia", 2), SET, FIXED_DATE);
    expect(result.validDimensionCount).toBe(1);
    expect(result.affinityStatus).toBe("INSUFFICIENT");
    expect(result.affinities).toEqual([]);
    expect(result.closest).toEqual([]);
  });

  it("handles an empty questionnaire without failing", () => {
    const result = computeResult({}, SET, FIXED_DATE);
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
    const result = computeResult(answers, SET, FIXED_DATE);
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

  it("re-reads a result saved with older profiles: same scores, affinities recomputed with the current currents", () => {
    const current = computeResult({ ...answersToward("economia", 2), ...answersToward("liberdades", 1), ...answersToward("costumes", 2) }, SET, FIXED_DATE);
    // Before v3, socialisms and communism shared a single profile.
    const stored = { ...current, profilesVersion: "2026.11-v2", affinities: current.affinities.filter((a) => a.key !== "comunismo"), closest: [] };

    const reread = withCurrentMethod(stored);
    expect(reread.dimensions).toEqual(current.dimensions);
    expect(reread.affinities).toEqual(current.affinities);
    expect(reread.affinities.find((a) => a.key === "comunismo")?.comparable).toBe(true);
    expect(reread.closest).toEqual(current.closest);
    expect(reread.computedWithProfilesVersion).toBe("2026.11-v2");
    expect(reread.computedWithScoringVersion).toBeUndefined();
    expect(withCurrentMethod(current)).toBe(current);
  });

  it("measures proximity per dimension: 100 inside the range, 10 points less per 0.1 outside it, never below zero", () => {
    const socialDemocracy = REFERENCE_PROFILES.find((p) => p.key === "social-democracia")!;
    const affinity = computeAffinity(socialDemocracy, [dimensionWith("economia", 0.1), dimensionWith("liberdades", 0.3), dimensionWith("participacao", -0.1)]);
    // Ranges: economia 0.2..0.8, liberdades −0.8..0, participação −0.6..0.4.
    expect(affinity.dimensions.map((d) => [d.distance, d.proximity])).toEqual([
      [0.1, 0.9],
      [0.3, 0.7],
      [0, 1],
    ]);
    expect(affinity.index).toBe(0.87);
    expect(affinity.band).toBe("MODERATE");
    const far = computeAffinity(socialDemocracy, [dimensionWith("economia", -0.9), dimensionWith("liberdades", 0.3)]);
    expect(far.dimensions[0]).toMatchObject({ distance: 1.1, proximity: 0 });
    expect(far.index).toBe(0.35);
  });

  it("re-reads a result saved with the previous method: answers and scores kept, proximities recomputed", () => {
    const dimensions = [
      dimensionWith("economia", 0.1),
      dimensionWith("liberdades", 0.3),
      dimensionWith("costumes", 0.2),
      dimensionWith("participacao", -0.1),
      dimensionWith("socioambiental", 0.4),
    ];
    const stored: QuestionnaireResult = {
      bankVersion: "2026.11-v2",
      scoringVersion: "2026.11-v1",
      profilesVersion: PROFILES_VERSION,
      computedAt: FIXED_DATE.toISOString(),
      answeredCount: 50,
      unknownCount: 0,
      dimensions,
      validDimensionCount: 5,
      affinityStatus: "OK",
      affinities: [],
      closest: ["social-democracia", "conservadorismos"],
      tensionDimensions: [],
    };

    const reread = withCurrentMethod(stored);
    expect(reread.dimensions).toEqual(dimensions);
    expect(reread.scoringVersion).toBe(SCORING_VERSION);
    expect(reread.computedWithScoringVersion).toBe("2026.11-v1");
    expect(reread.computedWithProfilesVersion).toBeUndefined();
    expect(reread.affinities.map((a) => [a.key, a.index])).toEqual([
      ["social-democracia", 0.87],
      ["conservadorismos", 0.77],
      ["comunismo", 0.77],
      ["socialismos", 0.75],
      ["liberalismos", 0.67],
      ["anarquismos", 0.25],
      ["libertarianismos", 0.25],
    ]);
    // Only currents within 5 points of the closest one are named as the closest.
    expect(reread.closest).toEqual(["social-democracia"]);
    expect(withCurrentMethod(reread)).toBe(reread);
  });

  it("reads scores in levels, the same way toward both poles", () => {
    expect([0, 0.19, -0.19].map((score) => leanOf(score))).toEqual(Array(3).fill({ level: "INTERMEDIATE", side: null }));
    expect(leanOf(0.2)).toEqual({ level: "LIGHT", side: "POSITIVE" });
    expect(leanOf(-0.2)).toEqual({ level: "LIGHT", side: "NEGATIVE" });
    expect(leanOf(0.45)).toEqual({ level: "MODERATE", side: "POSITIVE" });
    expect(leanOf(-0.69)).toEqual({ level: "MODERATE", side: "NEGATIVE" });
    expect(leanOf(-0.7)).toEqual({ level: "STRONG", side: "NEGATIVE" });
    expect(leanOf(1)).toEqual({ level: "STRONG", side: "POSITIVE" });
  });

  it("counts the answers of a dimension toward each pole, neutral and outside the calculation", () => {
    const items = SET.filter((q) => q.dimension === "economia");
    const answers = answersToward("economia", 1);
    answers[items[0].id] = "UNKNOWN";
    answers[items[1].id] = "UNKNOWN";
    answers[items[2].id] = "NEUTRAL";
    for (const q of items.slice(3, 5)) answers[q.id] = q.direction === 1 ? "DISAGREE" : "AGREE";
    expect(answerBreakdown(scoreDimension("economia", answers, SET))).toEqual({ towardNegative: 2, neutral: 1, towardPositive: 5, unknown: 2, missing: 0 });
  });

  it("marks a profile as not comparable when too few of its dimensions are valid", () => {
    const answers = { ...answersToward("costumes", 2), ...answersToward("participacao", 2) };
    const result = computeResult(answers, SET, FIXED_DATE);
    const libertarian = result.affinities.find((a) => a.key === "libertarianismos");
    expect(libertarian?.comparable).toBe(false);
    expect(libertarian?.index).toBeNull();
    expect(result.affinities.at(-1)?.comparable).toBe(false);
  });
});
