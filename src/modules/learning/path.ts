import type { CurrentKey } from "@/modules/diagnostic/profiles";

// Ordering strategies for the learning path. The questionnaire may only change
// the ORDER of perspective lessons; it never hides lessons or changes content.

export type PathLessonInput = {
  id: string;
  slug: string;
  title: string;
  minutes: number;
  moduleSlug: string;
  moduleTitle: string;
  moduleNumber: number;
  moduleArea?: "FUNDAMENTOS" | "INSTITUICOES" | "IDEIAS" | "LEITURA_CRITICA";
  lessonNumber: number;
  stage: "FOUNDATIONS" | "PERSPECTIVES" | "CONTEXT";
  currentKeys: string[];
};

export type PathStageKey = "FOUNDATIONS" | "FAMILIAR" | "OTHER_PERSPECTIVES" | "PERSPECTIVES" | "CONTEXT";

export type PathStep = { stage: PathStageKey; lessons: PathLessonInput[] };

export type LearningPath = { mode: "GENERAL" | "AFFINITY"; steps: PathStep[]; ordered: PathLessonInput[] };

type AffinityMap = Partial<Record<CurrentKey, number>>;

function editorialOrder(a: PathLessonInput, b: PathLessonInput) {
  return a.moduleNumber - b.moduleNumber || a.lessonNumber - b.lessonNumber;
}

function lessonAffinity(lesson: PathLessonInput, affinity: AffinityMap): number | null {
  const values = lesson.currentKeys.map((key) => affinity[key as CurrentKey]).filter((v): v is number => typeof v === "number");
  return values.length ? Math.max(...values) : null;
}

interface PerspectiveOrderingStrategy {
  mode: "GENERAL" | "AFFINITY";
  arrange(lessons: PathLessonInput[], affinity: AffinityMap, closest: string[]): PathStep[];
}

const generalStrategy: PerspectiveOrderingStrategy = {
  mode: "GENERAL",
  arrange(lessons) {
    return [{ stage: "PERSPECTIVES", lessons: [...lessons].sort(editorialOrder) }];
  },
};

const affinityStrategy: PerspectiveOrderingStrategy = {
  mode: "AFFINITY",
  arrange(lessons, affinity, closest) {
    const sorted = [...lessons].sort((a, b) => {
      const scoreA = lessonAffinity(a, affinity);
      const scoreB = lessonAffinity(b, affinity);
      if (scoreA !== null && scoreB !== null && scoreA !== scoreB) return scoreB - scoreA;
      if ((scoreA === null) !== (scoreB === null)) return scoreA === null ? 1 : -1;
      return editorialOrder(a, b);
    });
    const familiar = sorted.filter((lesson) => lesson.currentKeys.some((key) => closest.includes(key)));
    // Without a clearly closest current, start with the whole module of the top lesson.
    const fallback = sorted.length ? sorted.filter((l) => l.moduleSlug === sorted[0].moduleSlug) : [];
    const familiarIds = new Set((familiar.length ? familiar : fallback).map((l) => l.id));
    return [
      { stage: "FAMILIAR", lessons: sorted.filter((l) => familiarIds.has(l.id)) },
      { stage: "OTHER_PERSPECTIVES", lessons: sorted.filter((l) => !familiarIds.has(l.id)) },
    ];
  },
};

/**
 * Builds the path: common foundations first, then perspective lessons (in
 * editorial order or ordered by affinity, from closest to more distant), then
 * comparison and context. Ties fall back to the fixed editorial order.
 */
export function buildLearningPath(
  lessons: PathLessonInput[],
  options: { mode: "GENERAL" | "AFFINITY"; affinity?: AffinityMap; closest?: string[] },
): LearningPath {
  const affinity = options.affinity ?? {};
  const hasAffinity = Object.keys(affinity).length > 0;
  const strategy = options.mode === "AFFINITY" && hasAffinity ? affinityStrategy : generalStrategy;

  const foundations = lessons.filter((l) => l.stage === "FOUNDATIONS").sort(editorialOrder);
  const perspectives = lessons.filter((l) => l.stage === "PERSPECTIVES");
  const context = lessons.filter((l) => l.stage === "CONTEXT").sort(editorialOrder);

  const steps = ([
    { stage: "FOUNDATIONS", lessons: foundations },
    ...strategy.arrange(perspectives, affinity, options.closest ?? []),
    { stage: "CONTEXT", lessons: context },
  ] satisfies PathStep[]).filter((step) => step.lessons.length > 0);

  return { mode: strategy.mode, steps, ordered: steps.flatMap((s) => s.lessons) };
}

/** A module as a station of the trail flow: its lessons that sit together in the path order. */
export type PathModuleNode = { slug: string; title: string; number: number; area?: PathLessonInput["moduleArea"]; lessons: PathLessonInput[] };

/** Groups consecutive lessons of the same module, keeping the path order. */
export function pathModules(lessons: PathLessonInput[]): PathModuleNode[] {
  const nodes: PathModuleNode[] = [];
  for (const lesson of lessons) {
    const last = nodes.at(-1);
    if (last?.slug === lesson.moduleSlug) last.lessons.push(lesson);
    else nodes.push({ slug: lesson.moduleSlug, title: lesson.moduleTitle, number: lesson.moduleNumber, area: lesson.moduleArea, lessons: [lesson] });
  }
  return nodes;
}

export const STAGE_LABEL: Record<PathStageKey, { title: string; description: string }> = {
  FOUNDATIONS: { title: "Fundamentos em comum", description: "O ponto de partida compartilhado por todas as pessoas." },
  FAMILIAR: { title: "Temas próximos", description: "Perspectivas mais próximas das suas respostas, para começar por algo familiar." },
  OTHER_PERSPECTIVES: { title: "Outras perspectivas", description: "As demais correntes, das mais próximas às mais distantes. O catálogo continua aberto." },
  PERSPECTIVES: { title: "Perspectivas", description: "As principais correntes, em ordem editorial." },
  CONTEXT: { title: "Comparação e contexto", description: "Temas transversais, história e leitura crítica para relacionar conceitos e acontecimentos." },
};
