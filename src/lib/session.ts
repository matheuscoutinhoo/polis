import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  suspendedUntil: Date | null;
  suspensionReason: string | null;
  pathMode: "GENERAL" | "AFFINITY";
  questionnaireDecision: "UNDECIDED" | "DEFERRED" | "DECLINED" | "ACCEPTED";
  createdAt: Date;
};

/** Data access layer: the only place where the session is resolved. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      role: true,
      suspendedUntil: true,
      suspensionReason: true,
      pathMode: true,
      questionnaireDecision: true,
      createdAt: true,
    },
  });
});

export async function requireUser(nextPath?: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect(nextPath ? `/entrar?proximo=${encodeURIComponent(nextPath)}` : "/entrar");
  }
  return user;
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") notFound();
  return user;
}

export { isSuspended } from "./session-utils";
