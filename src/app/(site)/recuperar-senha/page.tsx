import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/auth-forms";

export const metadata: Metadata = { title: "Recuperar acesso" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Conta"
      title="Recuperar acesso"
      description="Informe o e-mail da conta. Por segurança, a mensagem de confirmação é a mesma para qualquer endereço."
    >
      <ForgotPasswordForm />
      <p className="mt-6 text-meta text-ink-soft">
        Lembrou a senha?{" "}
        <Link href="/entrar" className="text-link">
          Entrar
        </Link>
      </p>
    </AuthShell>
  );
}
