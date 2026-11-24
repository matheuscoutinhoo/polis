import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { Logo } from "@/components/ui/logo";
import { AccountMenu } from "./account-menu";
import { BottomNav, MethodLink, PrimaryNav } from "./nav";

export async function SiteHeader() {
  const user = await getCurrentUser();
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-surface">
        <div className="page-frame flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link href="/" className="flex min-h-[44px] items-center rounded-control focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-action)]" aria-label="Polis — página inicial">
            <Logo width={124} priority />
          </Link>
          <PrimaryNav />
          <div className="flex items-center gap-3">
            <MethodLink />
            <span aria-hidden="true" className="hidden h-6 w-px bg-line lg:block" />
            {user ? (
              <AccountMenu name={user.name} email={user.email} isAdmin={user.role === "ADMIN"} />
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/entrar" className="btn btn-text btn-sm">
                  Entrar
                </Link>
                <Link href="/criar-conta" className="btn btn-primary btn-sm">
                  Criar conta
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <BottomNav />
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-surface pb-24 lg:pb-0">
      <div className="page-frame grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo width={120} />
          <p className="mt-3 max-w-sm text-meta text-ink-soft">
            Educação política com fontes oficiais e diferentes perspectivas. A Polis explica; não recomenda voto, partido ou corrente.
          </p>
        </div>
        <nav aria-label="Informações" className="text-meta">
          <p className="eyebrow eyebrow-neutral">Informações</p>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              <Link className="text-link font-normal" href="/fontes-e-metodo">
                Fontes e método
              </Link>
            </li>
            <li>
              <Link className="text-link font-normal" href="/fontes-e-metodo#questionario">
                Metodologia do questionário
              </Link>
            </li>
            <li>
              <Link className="text-link font-normal" href="/comunidade/regras">
                Regras da comunidade
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Documentos" className="text-meta">
          <p className="eyebrow eyebrow-neutral">Documentos</p>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              <Link className="text-link font-normal" href="/termos">
                Termos de uso
              </Link>
            </li>
            <li>
              <Link className="text-link font-normal" href="/privacidade">
                Política de privacidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
