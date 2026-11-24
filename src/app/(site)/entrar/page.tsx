import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/auth-forms";
import { getCurrentUser } from "@/lib/session";
import { safeNextPath } from "@/modules/account/validation";

export const metadata: Metadata = { title: "Entrar" };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ proximo?: string }> }) {
  const params = await searchParams;
  const next = safeNextPath(params.proximo, "/");
  if (await getCurrentUser()) redirect(next);
  return (
    <AuthShell
      eyebrow="Conta"
      title="Entrar na Polis"
      description={
        <>
          Ainda não tem conta?{" "}
          <Link href="/criar-conta" className="text-link">
            Criar conta
          </Link>
        </>
      }
    >
      <SignInForm next={next} />
    </AuthShell>
  );
}
