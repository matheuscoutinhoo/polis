import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/auth-forms";
import { Notice } from "@/components/ui/notice";

export const metadata: Metadata = { title: "Criar nova senha" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string; error?: string }> }) {
  const { token, error } = await searchParams;
  const valid = typeof token === "string" && token.length > 10 && !error;
  return (
    <AuthShell eyebrow="Conta" title="Criar nova senha">
      {valid ? (
        <ResetPasswordForm token={token} />
      ) : (
        <Notice tone="error" title="Link inválido ou expirado" role="alert">
          O link de recuperação vale por 1 hora e só pode ser usado uma vez.{" "}
          <Link href="/recuperar-senha" className="text-link">
            Pedir um novo link
          </Link>
        </Notice>
      )}
    </AuthShell>
  );
}
