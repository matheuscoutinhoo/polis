import { describe, expect, it } from "vitest";
import { buildLearningPath, pathModules, type PathLessonInput } from "@/modules/learning/path";

function lesson(moduleNumber: number, lessonNumber: number, stage: PathLessonInput["stage"], currentKeys: string[] = []): PathLessonInput {
  return {
    id: `m${moduleNumber}-l${lessonNumber}`,
    slug: `licao-${lessonNumber}`,
    title: `Lição ${lessonNumber} do módulo ${moduleNumber}`,
    minutes: 5,
    moduleSlug: `modulo-${moduleNumber}`,
    moduleTitle: `Módulo ${moduleNumber}`,
    moduleNumber,
    lessonNumber,
    stage,
    currentKeys,
  };
}

const LESSONS = [
  lesson(14, 1, "CONTEXT"),
  lesson(9, 2, "PERSPECTIVES", ["comunismo"]),
  lesson(1, 1, "FOUNDATIONS"),
  lesson(8, 1, "PERSPECTIVES", ["socialismos"]),
  lesson(9, 1, "PERSPECTIVES", ["comunismo"]),
  lesson(1, 2, "FOUNDATIONS"),
  lesson(8, 2, "PERSPECTIVES", ["socialismos"]),
];

describe("trilha em fluxo de módulos", () => {
  it("ordena cada corrente pelo próprio índice e agrupa as lições do mesmo módulo em uma estação", () => {
    const path = buildLearningPath(LESSONS, { mode: "AFFINITY", affinity: { comunismo: 0.9, socialismos: 0.7 }, closest: ["comunismo"] });
    expect(path.steps.map((step) => [step.stage, pathModules(step.lessons).map((m) => [m.slug, m.lessons.map((l) => l.lessonNumber)])])).toEqual([
      ["FOUNDATIONS", [["modulo-1", [1, 2]]]],
      ["FAMILIAR", [["modulo-9", [1, 2]]]],
      ["OTHER_PERSPECTIVES", [["modulo-8", [1, 2]]]],
      ["CONTEXT", [["modulo-14", [1]]]],
    ]);
  });

  it("sem corrente claramente mais próxima, começa pelo módulo inteiro da primeira corrente", () => {
    const path = buildLearningPath(LESSONS, { mode: "AFFINITY", affinity: { comunismo: 0.7, socialismos: 0.6 }, closest: [] });
    const familiar = path.steps.find((step) => step.stage === "FAMILIAR")!;
    expect(familiar.lessons.map((l) => l.id)).toEqual(["m9-l1", "m9-l2"]);
  });

  it("na trilha geral, segue a ordem editorial dos módulos", () => {
    const path = buildLearningPath(LESSONS, { mode: "GENERAL" });
    expect(pathModules(path.ordered).map((m) => m.slug)).toEqual(["modulo-1", "modulo-8", "modulo-9", "modulo-14"]);
  });
});