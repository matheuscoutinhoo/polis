"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IconChip } from "@/components/ui/topic";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-frame py-12 md:py-20">
      <div className="reading-measure" role="alert">
        <IconChip icon="alert" tone="sand" size={56} />
        <h1 className="mt-6 text-display-sm font-semibold">Algo não funcionou como esperado.</h1>
        <p className="mt-3 text-lead text-ink-soft">
          Seus dados e seu progresso não foram afetados. Tente novamente; se o problema continuar, volte em alguns minutos.
        </p>
        {error.digest ? <p className="mt-2 text-meta text-ink-soft">Código para suporte: {error.digest}</p> : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} icon="arrowRight">
            Tentar novamente
          </Button>
          <Link href="/" className="btn btn-secondary">
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
