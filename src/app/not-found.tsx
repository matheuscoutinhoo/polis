import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout/site-header";
import { LinkButton } from "@/components/ui/button";
import { IconChip } from "@/components/ui/topic";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="min-h-[60vh] pb-28 lg:pb-0">
        <div className="page-frame py-12 md:py-20">
          <div className="reading-measure">
            <IconChip icon="search" size={56} />
            <p className="eyebrow mt-6">Página não encontrada</p>
            <h1 className="mt-2 text-display-sm font-semibold md:text-display">Não encontramos este endereço.</h1>
            <p className="mt-3 text-lead text-ink-soft">
              O link pode estar incorreto, ou o conteúdo foi removido ou retirado para revisão editorial.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/" icon="arrowRight">
                Ir para o início
              </LinkButton>
              <LinkButton href="/aprender" variant="secondary">
                Explorar catálogo
              </LinkButton>
            </div>
            <p className="mt-6 text-meta text-ink-soft">
              Procurando um acontecimento? Veja a{" "}
              <Link href="/acontecimentos" className="text-link">
                lista completa
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
