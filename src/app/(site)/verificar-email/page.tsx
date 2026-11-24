import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResendVerificationButton } from "@/components/auth/auth-forms";
import { Notice } from "@/components/ui/notice";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "Confirmação de e-mail" };

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const user = await getCurrentUser();
  if (!error && user?.emailVerified) {
    return (
      <AuthShell eyebrow="Conta" title="E-mail confirmado">
        <Notice tone="success" role="status">
          Seu e-mail foi confirmado. Agora você pode publicar e comentar nos fóruns.
        </Notice>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/aprender" className="btn btn-primary">
            Continuar aprendendo
          </Link>
          <Link href="/comunidade" className="btn btn-secondary">
            Ir para a comunidade
          </Link>
        </div>
      </AuthShell>
    );
  }
  return (
    <AuthShell eyebrow="Conta" title="Confirmação de e-mail">
      <Notice tone={error ? "error" : "info"} role={error ? "alert" : "status"}>
        {error
          ? "O link de confirmação expirou ou já foi usado."
          : "Abra o link enviado para o seu e-mail para confirmar o endereço. A confirmação é necessária apenas para publicar nos fóruns."}
      </Notice>
      <div className="mt-6">
        {user && !user.emailVerified ? (
          <ResendVerificationButton email={user.email} />
        ) : (
          <Link href="/entrar?proximo=/conta" className="btn btn-secondary">
            Entrar para pedir um novo link
          </Link>
        )}
      </div>
    </AuthShell>
  );
}
