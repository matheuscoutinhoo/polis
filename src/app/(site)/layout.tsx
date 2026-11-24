import { SiteFooter, SiteHeader } from "@/components/layout/site-header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="min-h-[60vh] pb-28 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
