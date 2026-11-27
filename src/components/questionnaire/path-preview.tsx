"use client";

import { addTransitionType, createContext, startTransition, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { TRAIL_TRANSITION, TrailFlow } from "@/components/polis/trail-flow";
import { LinkButton } from "@/components/ui/button";
import type { LearningPath } from "@/modules/learning/path";

export type PathMode = "GENERAL" | "AFFINITY";

type PathPreview = { mode: PathMode; saved: PathMode; show: (mode: PathMode) => void };

const PathPreviewContext = createContext<PathPreview | null>(null);

/**
 * Shares the path order being previewed between the choice form and the trail
 * drawn below it. Changes run as transitions of type TRAIL_TRANSITION, so the
 * trail animates its stations to their new places.
 */
export function PathPreviewProvider({ saved, children }: { saved: PathMode; children: ReactNode }) {
  const [mode, setMode] = useState<PathMode>(saved);
  // After a save the page renders again with the saved order: show it.
  const [lastSaved, setLastSaved] = useState(saved);
  if (saved !== lastSaved) {
    setLastSaved(saved);
    setMode(saved);
  }
  const show = useCallback((next: PathMode) => {
    startTransition(() => {
      addTransitionType(TRAIL_TRANSITION);
      setMode(next);
    });
  }, []);
  const value = useMemo(() => ({ mode, saved, show }), [mode, saved, show]);
  return <PathPreviewContext value={value}>{children}</PathPreviewContext>;
}

/** The shared preview, or null outside a PathPreviewProvider. */
export function usePathPreview() {
  return useContext(PathPreviewContext);
}

const MODE_NAME: Record<PathMode, string> = { GENERAL: "trilha geral", AFFINITY: "trilha por afinidade" };

export type PathOptions = { GENERAL: LearningPath; AFFINITY: LearningPath | null };
export type NextLesson = { id: string; href: string };

/** The trail in the order being previewed; a note says when it is not saved yet. */
export function TrailPreview({ paths, completed, next }: { paths: PathOptions; completed: string[]; next: Record<PathMode, NextLesson | null> }) {
  const preview = usePathPreview();
  const mode: PathMode = preview?.mode === "AFFINITY" && paths.AFFINITY ? "AFFINITY" : "GENERAL";
  const previewing = preview !== null && mode !== preview.saved;
  return (
    <div>
      <p role="status" className={previewing ? "mb-3 rounded-card bg-mint px-3 py-2 text-meta text-ink" : "sr-only"}>
        {previewing ? `Pré-visualização da ${MODE_NAME[mode]}: salve a escolha para seguir esta ordem.` : `Mostrando a ${MODE_NAME[mode]}.`}
      </p>
      <TrailFlow path={(mode === "AFFINITY" ? paths.AFFINITY : null) ?? paths.GENERAL} completed={completed} nextLessonId={next[mode]?.id ?? null} />
    </div>
  );
}

/** Link to the next lesson of the saved order; hidden while another order is only previewed. */
export function ContinueFromPreview({ next }: { next: Record<PathMode, NextLesson | null> }) {
  const preview = usePathPreview();
  if (preview && preview.mode !== preview.saved) return null;
  const lesson = next[preview?.saved ?? "GENERAL"];
  if (!lesson) return null;
  return (
    <div className="mt-5">
      <LinkButton href={lesson.href} icon="arrowRight">
        Continuar aprendendo
      </LinkButton>
    </div>
  );
}
