import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { quizSchema } from "./content";

import { ACHIEVEMENTS, type AchievementKey } from "./progress-labels";

export { ACHIEVEMENTS, type AchievementKey };

// XP rewards understanding and continuity, once per activity. The unique index
// (userId, kind, refId) makes every award idempotent, even under concurrent or
// repeated requests. Nothing here depends on political answers or agreement.

export const XP_VALUES = { LESSON_READ: 10, LESSON_UNDERSTOOD: 15, MODULE_COMPLETED: 25 } as const;

async function awardXp(userId: string, kind: keyof typeof XP_VALUES, refId: string): Promise<number> {
  const created = await db.xpEvent.createMany({
    data: [{ userId, kind, refId, amount: XP_VALUES[kind] }],
    skipDuplicates: true,
  });
  return created.count > 0 ? XP_VALUES[kind] : 0;
}

async function awardAchievements(userId: string, keys: AchievementKey[]): Promise<AchievementKey[]> {
  if (keys.length === 0) return [];
  const existing = await db.userAchievement.findMany({ where: { userId, key: { in: keys } }, select: { key: true } });
  const fresh = keys.filter((key) => !existing.some((e) => e.key === key));
  if (fresh.length) {
    await db.userAchievement.createMany({ data: fresh.map((key) => ({ userId, key })), skipDuplicates: true });
  }
  return fresh;
}

export type ProgressUpdate = {
  xpGained: number;
  lessonCompleted: boolean;
  moduleCompleted: boolean;
  newAchievements: AchievementKey[];
};

/** Inserts the progress row if absent (INSERT ... ON CONFLICT DO NOTHING), safe under concurrent requests. */
async function ensureProgressRow(userId: string, lessonId: string) {
  await db.lessonProgress.createMany({ data: [{ userId, lessonId }], skipDuplicates: true });
}

async function publishedLessonOrThrow(lessonId: string) {
  const lesson = await db.lesson.findFirst({
    where: { id: lessonId, status: "PUBLISHED", module: { status: "PUBLISHED" } },
    select: { id: true, moduleId: true, quiz: true, currentKeys: true, module: { select: { slug: true, stage: true } } },
  });
  if (!lesson) throw new Error("Lição não encontrada.");
  return lesson;
}

async function finalizeIfComplete(userId: string, lesson: Awaited<ReturnType<typeof publishedLessonOrThrow>>): Promise<Omit<ProgressUpdate, "xpGained"> & { xp: number }> {
  const progress = await db.lessonProgress.findUnique({ where: { userId_lessonId: { userId, lessonId: lesson.id } } });
  if (!progress?.readAt || !progress.understoodAt) {
    return { lessonCompleted: false, moduleCompleted: false, newAchievements: [], xp: 0 };
  }
  if (!progress.completedAt) {
    await db.lessonProgress.updateMany({ where: { userId, lessonId: lesson.id, completedAt: null }, data: { completedAt: new Date() } });
  }

  let xp = 0;
  const moduleLessons = await db.lesson.findMany({ where: { moduleId: lesson.moduleId, status: "PUBLISHED" }, select: { id: true } });
  const completedInModule = await db.lessonProgress.count({
    where: { userId, lessonId: { in: moduleLessons.map((l) => l.id) }, completedAt: { not: null } },
  });
  const moduleCompleted = moduleLessons.length > 0 && completedInModule === moduleLessons.length;
  if (moduleCompleted) xp += await awardXp(userId, "MODULE_COMPLETED", lesson.moduleId);

  const candidates: AchievementKey[] = ["primeira-licao"];
  const completedLessons = await db.lessonProgress.findMany({
    where: { userId, completedAt: { not: null } },
    select: { lesson: { select: { currentKeys: true, module: { select: { slug: true, stage: true } } } } },
  });
  const foundationLessons = await db.lesson.count({ where: { status: "PUBLISHED", module: { stage: "FOUNDATIONS", status: "PUBLISHED" } } });
  const completedFoundations = completedLessons.filter((p) => p.lesson.module.stage === "FOUNDATIONS").length;
  if (foundationLessons > 0 && completedFoundations >= foundationLessons) candidates.push("fundamentos-em-comum");
  const currents = new Set(completedLessons.flatMap((p) => p.lesson.currentKeys));
  if (currents.size >= 3) candidates.push("outras-perspectivas");
  if (moduleCompleted && lesson.module.slug === "leitura-critica") candidates.push("leitura-critica");

  const newAchievements = await awardAchievements(userId, candidates);
  return { lessonCompleted: true, moduleCompleted, newAchievements, xp };
}

export async function markLessonRead(userId: string, lessonId: string): Promise<ProgressUpdate> {
  const lesson = await publishedLessonOrThrow(lessonId);
  await ensureProgressRow(userId, lessonId);
  await db.lessonProgress.updateMany({ where: { userId, lessonId, readAt: null }, data: { readAt: new Date() } });
  let xpGained = await awardXp(userId, "LESSON_READ", lessonId);
  const final = await finalizeIfComplete(userId, lesson);
  xpGained += final.xp;
  return { xpGained, lessonCompleted: final.lessonCompleted, moduleCompleted: final.moduleCompleted, newAchievements: final.newAchievements };
}

export type QuizFeedback = {
  allCorrect: boolean;
  results: Array<{ questionId: string; correct: boolean; explanation: string }>;
  progress: ProgressUpdate;
};

/** Evaluates comprehension of facts and concepts. Retries are unlimited and never penalized. */
export async function submitQuiz(userId: string, lessonId: string, answers: Record<string, string>): Promise<QuizFeedback> {
  const lesson = await publishedLessonOrThrow(lessonId);
  const quiz = quizSchema.parse(lesson.quiz);
  const results = quiz.questions.map((question) => ({
    questionId: question.id,
    correct: answers[question.id] === question.correctOptionId,
    explanation: question.explanation,
  }));
  const allCorrect = results.every((r) => r.correct);

  await ensureProgressRow(userId, lessonId);
  await db.lessonProgress.updateMany({ where: { userId, lessonId }, data: { attempts: { increment: 1 } } });

  let progress: ProgressUpdate = { xpGained: 0, lessonCompleted: false, moduleCompleted: false, newAchievements: [] };
  if (allCorrect) {
    await db.lessonProgress.updateMany({ where: { userId, lessonId, understoodAt: null }, data: { understoodAt: new Date() } });
    let xpGained = await awardXp(userId, "LESSON_UNDERSTOOD", lessonId);
    const final = await finalizeIfComplete(userId, lesson);
    xpGained += final.xp;
    progress = { xpGained, lessonCompleted: final.lessonCompleted, moduleCompleted: final.moduleCompleted, newAchievements: final.newAchievements };
    logger.info("learning.quiz_understood", { xpGained });
  }
  return { allCorrect, results, progress };
}

export async function getLearnerSummary(userId: string) {
  const [xp, completedCount, achievements, progressRows] = await Promise.all([
    db.xpEvent.aggregate({ where: { userId }, _sum: { amount: true } }),
    db.lessonProgress.count({ where: { userId, completedAt: { not: null } } }),
    db.userAchievement.findMany({ where: { userId }, orderBy: { awardedAt: "asc" } }),
    db.lessonProgress.findMany({ where: { userId }, select: { lessonId: true, readAt: true, understoodAt: true, completedAt: true } }),
  ]);
  return {
    xp: xp._sum.amount ?? 0,
    completedCount,
    achievements: achievements.map((a) => ({ key: a.key as AchievementKey, awardedAt: a.awardedAt })),
    progressByLesson: new Map(progressRows.map((p) => [p.lessonId, p])),
  };
}
