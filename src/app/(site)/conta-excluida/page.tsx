import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = { title: "Conta excluída" };

export default function AccountDeletedPage() {
  return (
    <AuthShell eyebrow="Conta" title="Conta excluída">
      <p className="text-body">
        Sua conta, suas respostas ao questionário, o resultado, o progresso e os consentimentos foram apagados. Publicações mantidas nos fóruns não têm mais vínculo com você e
        aparecem como “Participante removido”.
      </p>
      <div className="mt-6">
        <Link href="/" className="btn btn-secondary">
          Voltar ao início
        </Link>
      </div>
    </AuthShell>
  );
}
