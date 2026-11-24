import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { mailConfigured } from "@/lib/mailer";
import { aiConfigured } from "@/modules/ai/provider";

export const dynamic = "force-dynamic";

/** Names of missing or invalid auth settings (never their values). */
function authProblems() {
  const problems: string[] = [];
  let hostname = "";
  try {
    hostname = new URL(process.env.BETTER_AUTH_URL ?? "").hostname;
  } catch {}
  // On Railway, "https://${{RAILWAY_PUBLIC_DOMAIN}}" becomes "https://" until a public domain exists.
  if (!hostname) problems.push("BETTER_AUTH_URL");
  if ((process.env.BETTER_AUTH_SECRET ?? "").length < 32) problems.push("BETTER_AUTH_SECRET");
  return problems;
}

/** Health check for Railway. Reports dependency status without sensitive details. */
export async function GET() {
  const started = Date.now();
  let database: "ok" | "error" = "ok";
  try {
    await db.$queryRaw`SELECT 1`;
  } catch (error) {
    database = "error";
    logger.error("health.database_unavailable", { error: error instanceof Error ? error : undefined });
  }
  const invalidAuthSettings = authProblems();
  if (invalidAuthSettings.length) logger.error("health.auth_misconfigured", { invalid: invalidAuthSettings });
  const healthy = database === "ok" && invalidAuthSettings.length === 0;
  const body = {
    status: healthy ? "ok" : "degraded",
    database,
    auth: invalidAuthSettings.length ? "misconfigured" : "configured",
    ai: aiConfigured() ? "configured" : "not_configured",
    mail: mailConfigured() ? "configured" : "not_configured",
    responseTimeMs: Date.now() - started,
    time: new Date().toISOString(),
  };
  return NextResponse.json(body, { status: healthy ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
