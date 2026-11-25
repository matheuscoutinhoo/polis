import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/auth-forms";
import { Icon } from "@/components/ui/icon";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "Criar conta" };

export default async function SignUpPage() {
  if (await getCurrentUser()) redirect("/");
  return (
    <AuthShell
      eyebrow="Conta"
      title="Criar conta"
      description={
        <>
          Já tem conta?{" "}
          <Link href="/entrar" className="text-link">
            Entrar
          </Link>
        </>
      }
      aside={
        <div className="rounded-panel bg-mint p-8">
          <h2 className="text-h3 font-semibold">O que acontece com seus dados</h2>
          <ul className="mt-4 flex flex-col gap-4 text-body">
            <li className="flex gap-3">
              <Icon name="user" className="mt-0.5 flex-none text-action" />
              <span>Só o nome de exibição e o que você publicar nos fóruns ficam visíveis para outras pessoas.</span>
            </li>
            <li className="flex gap-3">
              <Icon name="lock" className="mt-0.5 flex-none text-action" />
              <span>
                Depois do cadastro, você responde ao questionário de afinidades, condição para usar lições, acontecimentos e fóruns. Ele tem autorização separada; respostas e
                resultado são privados e podem ser apagados.
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="download" className="mt-0.5 flex-none text-action" />
              <span>Você pode exportar seus dados ou excluir a conta a qualquer momento.</span>
            </li>
          </ul>
        </div>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}
