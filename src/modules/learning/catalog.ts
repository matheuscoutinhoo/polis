import { db } from "@/lib/db";
import { affinityIndexByCurrent, type QuestionnaireResult } from "@/modules/diagnostic/scoring";
import { lessonContentSchema, type LessonContent } from "./content";
import { buildLearningPath, type LearningPath, type PathLessonInput } from "./path";

export async function getCatalog() {
  return db.module.findMany({
    where: { status: { in: ["PUBLISHED", "DOCUMENTARY_GAP"] } },
    orderBy: { number: "asc" },
    include: {
      lessons: {
        where: { status: "PUBLISHED" },
        orderBy: { number: "asc" },
        select: { id: true, slug: true, number: true, title: true, minutes: true, objective: true, currentKeys: true },
      },
    },
  });
}

export async function getPublishedPathLessons(): Promise<PathLessonInput[]> {
  const lessons = await db.lesson.findMany({
    where: { status: "PUBLISHED", module: { status: "PUBLISHED" } },
    select: {
      id: true,
      slug: true,
      title: true,
      minutes: true,
      number: true,
      currentKeys: true,
      module: { select: { slug: true, title: true, number: true, stage: true, area: true } },
    },
  });
  return lessons.map((lesson) => ({
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    minutes: lesson.minutes,
    moduleSlug: lesson.module.slug,
    moduleTitle: lesson.module.title,
    moduleNumber: lesson.module.number,
    moduleArea: lesson.module.area,
    lessonNumber: lesson.number,
    stage: lesson.module.stage,
    currentKeys: lesson.currentKeys,
  }));
}

export async function getLearningPath(user: { pathMode: "GENERAL" | "AFFINITY" } | null, result: QuestionnaireResult | null): Promise<LearningPath> {
  const lessons = await getPublishedPathLessons();
  const mode = user?.pathMode === "AFFINITY" && result?.affinityStatus === "OK" ? "AFFINITY" : "GENERAL";
  return buildLearningPath(lessons, { mode, affinity: affinityIndexByCurrent(result), closest: result?.closest ?? [] });
}

export async function getModuleBySlug(slug: string) {
  return db.module.findUnique({
    where: { slug },
    include: {
      lessons: {
        where: { status: "PUBLISHED" },
        orderBy: { number: "asc" },
        select: { id: true, slug: true, number: true, title: true, minutes: true, objective: true },
      },
    },
  });
}

export async function getLesson(moduleSlug: string, lessonSlug: string) {
  const lesson = await db.lesson.findFirst({
    where: { slug: lessonSlug, status: "PUBLISHED", module: { slug: moduleSlug, status: "PUBLISHED" } },
    include: {
      module: { include: { lessons: { where: { status: "PUBLISHED" }, orderBy: { number: "asc" }, select: { id: true, slug: true, number: true, title: true } } } },
      sources: {
        where: { source: { reviewStatus: "APPROVED" } },
        orderBy: { position: "asc" },
        include: { source: { include: { publisher: true } } },
      },
      events: {
        where: { event: { status: "PUBLISHED", isDemo: false } },
        include: { event: { select: { slug: true, title: true, eventDate: true, statusLabel: true } } },
      },
    },
  });
  if (!lesson) return null;
  const content = lessonContentSchema.parse(lesson.content) as LessonContent;
  return { ...lesson, content };
}

export async function getLessonTopics(lessonId: string) {
  return db.topic.findMany({
    where: { lessonId, status: "VISIBLE", forum: { status: "VISIBLE" } },
    orderBy: { lastActivityAt: "desc" },
    take: 5,
    select: { id: true, title: true, commentCount: true, forum: { select: { slug: true, title: true } } },
  });
}
