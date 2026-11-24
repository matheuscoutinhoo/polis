import { db } from "@/lib/db";

export type RateLimitResult = {
  allowed: boolean;
  count: number;
  limit: number;
  resetAt: Date;
};

/**
 * Fixed-window counter persisted in PostgreSQL (no extra service). The upsert is
 * atomic, so concurrent requests cannot bypass the limit.
 */
export async function consumeRateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const rows = await db.$queryRaw<Array<{ count: number; windowStart: Date }>>`
    INSERT INTO rate_limit_buckets ("key", "count", "windowStart")
    VALUES (${key}, 1, now())
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN rate_limit_buckets."windowStart" < now() - make_interval(secs => ${windowSeconds}::int) THEN 1
        ELSE rate_limit_buckets."count" + 1
      END,
      "windowStart" = CASE
        WHEN rate_limit_buckets."windowStart" < now() - make_interval(secs => ${windowSeconds}::int) THEN now()
        ELSE rate_limit_buckets."windowStart"
      END
    RETURNING "count", "windowStart"`;
  const row = rows[0];
  const resetAt = new Date(row.windowStart.getTime() + windowSeconds * 1000);
  if (Math.random() < 0.01) {
    void db.rateLimitBucket.deleteMany({ where: { windowStart: { lt: new Date(Date.now() - 3 * 24 * 3600 * 1000) } } }).catch(() => {});
  }
  return { allowed: row.count <= limit, count: row.count, limit, resetAt };
}

export class RateLimitError extends Error {
  constructor(message = "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.") {
    super(message);
    this.name = "RateLimitError";
  }
}

export async function enforceRateLimit(key: string, limit: number, windowSeconds: number, message?: string) {
  const result = await consumeRateLimit(key, limit, windowSeconds);
  if (!result.allowed) throw new RateLimitError(message);
  return result;
}
