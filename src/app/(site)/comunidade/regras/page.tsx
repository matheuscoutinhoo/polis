import type { Metadata } from "next";
import Link from "next/link";
import { IconChip } from "@/components/ui/topic";
import { REPORT_REASONS } from "@/modules/community/rules";

export const metadata: Metadata = { title: "Regras da comunidade" };

export default function CommunityRulesPage() {
  return (
    <div className="page-frame py-8 md:py-12">
      <nav aria-label="Trilha de navegação" className="text-meta text-ink-soft">
        <Link href="/comunidade" className="text-link">
          Comunidade
        </Link>{" "}
        / Regras
      </nav>
      <h1 className="mt-2 text-display-sm font-semibold md:text-display">Regras da comunidade</h1>
      <p className="reading-measure mt-3 text-lead text-ink-soft">
        Os fóruns existem para discutir ideias com respeito. As regras valem para todas as posições políticas, com os mesmos critérios.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="participar" className="surface-card p-5 md:p-6">
          <IconChip icon="community" size={44} />
          <h2 id="participar" className="mt-3 text-h3 font-semibold">
            Para participar
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-body">
            <li>Ler é aberto a todos. Para publicar, é preciso ter conta e e-mail confirmado.</li>
            <li>Outras pessoas veem apenas seu nome de exibição e o que você publica. Respostas do questionário e afinidades nunca aparecem nos fóruns.</li>
            <li>Você pode editar ou excluir o próprio conteúdo. Conteúdo excluído deixa um aviso para que as respostas continuem compreensíveis.</li>
            <li>Seguir um fórum mostra as discussões recentes dele na sua página inicial. Não há notificações por e-mail nem push.</li>
            <li>Há limites de frequência para criar fóruns, tópicos, comentários e denúncias, para reduzir spam.</li>
          </ul>
        </section>

        <section aria-labelledby="conduta" className="surface-card p-5 md:p-6">
          <IconChip icon="scale" tone="sand" size={44} />
          <h2 id="conduta" className="mt-3 text-h3 font-semibold">
            Conduta esperada
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-body">
            <li>Discorde de ideias, não de pessoas: critique argumentos sem ataques pessoais.</li>
            <li>Indique de onde vêm dados e citações. Publicações de participantes não são verificadas pela Polis.</li>
            <li>Não faça propaganda eleitoral, pedidos de voto, spam ou divulgação comercial.</li>
            <li>Não publique dados pessoais de ninguém (endereço, telefone, documentos, e-mail).</li>
          </ul>
        </section>

        <section aria-labelledby="moderacao" className="surface-card p-5 md:p-6 lg:col-span-2">
          <IconChip icon="shield" tone="lilac" size={44} />
          <h2 id="moderacao" className="mt-3 text-h3 font-semibold">
            Como funciona a moderação
          </h2>
          <p className="mt-3 text-body">
            A moderação analisa condutas, não opiniões. Nenhuma publicação é removida por defender ou criticar uma corrente, partido ou governo. Os motivos de denúncia são:
          </p>
          <ul className="mt-3 grid gap-2 text-body sm:grid-cols-2">
            {REPORT_REASONS.map((r) => (
              <li key={r.key} className="rounded-card bg-paper px-4 py-3">
                {r.label}
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-body">
            <li>Denúncias chegam à equipe de administração, que pode arquivar a denúncia, remover o conteúdo, encerrar um tópico para novos comentários ou suspender temporariamente a publicação de uma conta.</li>
            <li>Toda decisão fica registrada com motivo. Conteúdo removido é substituído por um aviso “Removido pela moderação”, com o motivo.</li>
            <li>Uma conta suspensa continua com acesso às lições, aos acontecimentos e aos próprios dados; apenas a publicação fica bloqueada até a data informada.</li>
            <li>
              Em caso de ameaça grave ou risco imediato a alguém, procure também as autoridades competentes. A Polis não substitui canais oficiais de denúncia.
            </li>
          </ul>
        </section>
      </div>
      <p className="mt-6 text-meta text-ink-soft">
        Veja também os{" "}
        <Link href="/termos" className="text-link">
          Termos de uso
        </Link>{" "}
        e a{" "}
        <Link href="/privacidade" className="text-link">
          Política de privacidade
        </Link>
        .
      </p>
    </div>
  );
}
