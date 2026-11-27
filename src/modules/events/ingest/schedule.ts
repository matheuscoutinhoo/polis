// When the automatic search runs. Pure functions (no database), so the
// instrumentation hook can read the settings without loading the server code.

export type IngestionSettings = {
  /** Scheduler on in this process: production by default, EVENTS_AUTO_FETCH=on|off overrides. */
  enabled: boolean;
  hours: number[];
  timeZone: string;
  /** Publications per search; drafts left for review do not count. */
  maxPublished: number;
  /** Only news published in this window (hours) are considered. */
  windowHours: number;
};

const DEFAULT_HOURS = [7, 19];
const DEFAULT_TIME_ZONE = "America/Sao_Paulo";

function boundedInt(raw: string | undefined, fallback: number, min: number, max: number): number {
  const value = Number.parseInt(raw ?? "", 10);
  return Number.isInteger(value) && value >= min && value <= max ? value : fallback;
}

export function parseHours(raw: string | undefined): number[] {
  const hours = (raw ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter((part) => /^\d{1,2}$/.test(part))
    .map(Number)
    .filter((hour) => hour >= 0 && hour <= 23);
  return hours.length ? [...new Set(hours)].sort((a, b) => a - b) : DEFAULT_HOURS;
}

function validTimeZone(raw: string | undefined): string {
  if (!raw) return DEFAULT_TIME_ZONE;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: raw });
    return raw;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
}

export function readIngestionSettings(env: Record<string, string | undefined> = process.env): IngestionSettings {
  const flag = (env.EVENTS_AUTO_FETCH ?? "").trim().toLowerCase();
  return {
    enabled: flag === "on" || (flag !== "off" && env.NODE_ENV === "production"),
    hours: parseHours(env.EVENTS_FETCH_HOURS),
    timeZone: validTimeZone(env.EVENTS_FETCH_TIMEZONE),
    maxPublished: boundedInt(env.EVENTS_FETCH_MAX, 3, 1, 10),
    windowHours: boundedInt(env.EVENTS_FETCH_WINDOW_HOURS, 36, 6, 168),
  };
}

/** Wall-clock fields of `date` in `timeZone`. */
function wallClock(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour"), minute: get("minute"), second: get("second") };
}

function offsetMs(date: Date, timeZone: string): number {
  const w = wallClock(date, timeZone);
  return Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute, w.second) - Math.floor(date.getTime() / 1000) * 1000;
}

/** Instant of a wall-clock time in `timeZone` (day may overflow; Date.UTC normalizes it). */
function zonedInstant(year: number, month: number, day: number, hour: number, timeZone: string): Date {
  const guess = Date.UTC(year, month - 1, day, hour);
  const first = guess - offsetMs(new Date(guess), timeZone);
  return new Date(guess - offsetMs(new Date(first), timeZone));
}

/** "AAAA-MM-DD" of `date` in `timeZone`. */
export function localDate(date: Date, timeZone = DEFAULT_TIME_ZONE): string {
  const w = wallClock(date, timeZone);
  return `${w.year}-${String(w.month).padStart(2, "0")}-${String(w.day).padStart(2, "0")}`;
}

function slotsAround(now: Date, hours: number[], timeZone: string): Date[] {
  const today = wallClock(now, timeZone);
  const slots: Date[] = [];
  for (const dayOffset of [-1, 0, 1]) {
    for (const hour of hours) slots.push(zonedInstant(today.year, today.month, today.day + dayOffset, hour, timeZone));
  }
  return slots.sort((a, b) => a.getTime() - b.getTime());
}

/** Most recent scheduled time at or before `now`. */
export function latestSlot(now: Date, hours: number[], timeZone = DEFAULT_TIME_ZONE): Date {
  return slotsAround(now, hours, timeZone).filter((slot) => slot.getTime() <= now.getTime()).at(-1)!;
}

/** Next scheduled time after `now`. */
export function nextSlot(now: Date, hours: number[], timeZone = DEFAULT_TIME_ZONE): Date {
  return slotsAround(now, hours, timeZone).find((slot) => slot.getTime() > now.getTime())!;
}

export const MAX_ATTEMPTS_PER_SLOT = 3;
export const RETRY_AFTER_MS = 30 * 60 * 1000;

/**
 * Whether the scheduled search is due, given the searches started since the
 * latest slot (any trigger). A completed or skipped search covers the slot;
 * failed ones are retried after 30 minutes, up to three attempts. This also
 * catches up on a slot missed while the server was down.
 */
export function isRunDue(now: Date, runsSinceSlot: Array<{ status: string; startedAt: Date }>): boolean {
  if (runsSinceSlot.some((run) => run.status !== "FAILED")) return false;
  if (runsSinceSlot.length >= MAX_ATTEMPTS_PER_SLOT) return false;
  const last = Math.max(0, ...runsSinceSlot.map((run) => run.startedAt.getTime()));
  return now.getTime() - last >= RETRY_AFTER_MS;
}
