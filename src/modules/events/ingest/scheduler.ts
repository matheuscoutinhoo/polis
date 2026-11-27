import { logger } from "@/lib/logger";
import { readIngestionSettings } from "./schedule";
import { runScheduledIngestionIfDue } from "./service";

const FIRST_CHECK_MS = 90 * 1000;
const CHECK_EVERY_MS = 10 * 60 * 1000;

/**
 * In-process timer started by src/instrumentation.ts: every 10 minutes it
 * checks whether a scheduled search is due. Several instances are safe, since
 * the database lock allows one search at a time and each slot runs once.
 */
export function startEventScheduler() {
  const state = globalThis as typeof globalThis & { __polisEventScheduler?: boolean };
  if (state.__polisEventScheduler) return;
  state.__polisEventScheduler = true;

  let checking = false;
  const check = async () => {
    if (checking) return;
    checking = true;
    try {
      await runScheduledIngestionIfDue();
    } catch (error) {
      logger.error("events.ingest.check_failed", { error: error instanceof Error ? error : undefined });
    } finally {
      checking = false;
    }
  };
  setTimeout(check, FIRST_CHECK_MS).unref();
  setInterval(check, CHECK_EVERY_MS).unref();

  const settings = readIngestionSettings();
  logger.info("events.ingest.scheduler_started", { hours: settings.hours.join(","), timeZone: settings.timeZone, maxPublished: settings.maxPublished });
}
