// Runs once when a Next.js server starts (see node_modules/next/dist/docs, "instrumentation").
export async function register() {
  // The scheduled search of official news lives in the Node.js server; never during `next build`.
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;
  const { readIngestionSettings } = await import("./modules/events/ingest/schedule");
  if (!readIngestionSettings().enabled) return;
  const { startEventScheduler } = await import("./modules/events/ingest/scheduler");
  startEventScheduler();
}
