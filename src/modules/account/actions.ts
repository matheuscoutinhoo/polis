"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit";
import { requireUser } from "@/lib/session";
import { deleteAccount, updateDisplayName } from "./privacy";

export type AccountFormState = { ok: boolean; error?: string; message?: string };

export async function updateDisplayNameAction(_prev: AccountFormState, formData: FormData): Promise<AccountFormState> {
  const user = await requireUser("/conta");
  try {
    await enforceRateLimit(`name-change:${user.id}`, 10, 3600);
    await updateDisplayName(user.id, formData.get("name"));
  } catch (error) {
    if (error instanceof ZodError) return { ok: false, error: error.issues[0]?.message ?? "Nome inválido." };
    if (error instanceof RateLimitError) return { ok: false, error: error.message };
    throw error;
  }
  revalidatePath("/", "layout");
  return { ok: true, message: "Nome de exibição atualizado." };
}

async function verifyPassword(userId: string, password: string): Promise<boolean> {
  const account = await db.account.findFirst({ where: { userId, providerId: "credential" }, select: { password: true } });
  if (!account?.password) return false;
  const context = await auth.$context;
  return context.password.verify({ password, hash: account.password });
}

export async function deleteAccountAction(_prev: AccountFormState, formData: FormData): Promise<AccountFormState> {
  const user = await requireUser("/conta/privacidade");
  const password = String(formData.get("password") ?? "");
  try {
    await enforceRateLimit(`delete-account:${user.id}`, 5, 3600);
  } catch (error) {
    if (error instanceof RateLimitError) return { ok: false, error: error.message };
    throw error;
  }
  if (!password || !(await verifyPassword(user.id, password))) {
    return { ok: false, error: "Senha incorreta. A conta não foi excluída." };
  }
  await deleteAccount(user.id, { deleteContent: formData.get("contentChoice") === "delete" });
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch {
    // The session no longer exists after deletion; clear cookies below.
  }
  const store = await cookies();
  for (const cookie of store.getAll()) {
    if (cookie.name.includes("polis.session")) store.delete(cookie.name);
  }
  redirect("/conta-excluida");
}
