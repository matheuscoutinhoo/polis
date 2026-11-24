import type { Metadata } from "next";
import Link from "next/link";
import { TERMS_VERSION } from "@/modules/account/consent-texts";

export const metadata: Metadata = { title: "Termos de uso" };

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-8">
      <h2 id={id} className="text-h3 font-semibold">
        {title}
      </h2>
      <div className="mt-2 flex flex-col gap-2 text-body">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="page-frame py-8 md:py-12">
      <article className="reading-measure">
        <p className="eyebrow">Documentos</p>
        <h1 className="mt-2 text-display-sm font-semibold md:text-display">Termos de uso</h1>
        <p className="mt-2 text-meta text-ink-soft">Versão {TERMS_VERSION}. O aceite é registrado com data e versão na criação da conta.</p>

        <Section id="finalidade" title="1. O que é a Polis">
          <p>
            A Polis é uma plataforma de educação política. Ela explica instituições, ideias e acontecimentos brasileiros com fontes oficiais aprovadas e apresenta diferentes
            perspectivas com os mesmos critérios. A Polis não recomenda voto, partido, candidato, movimento ou corrente.
          </p>
        </Section>

        <Section id="conta" title="2. Conta">
          <ul className="flex list-disc flex-col gap-1.5 pl-5">
            <li>Para criar uma conta, informe um nome de exibição, um e-mail válido e uma senha com pelo menos 10 caracteres.</li>
            <li>Você é responsável por manter a senha em sigilo. Se suspeitar de acesso indevido, altere a senha; as outras sessões serão encerradas.</li>
            <li>Publicar nos fóruns exige e-mail confirmado.</li>
            <li>Você pode exportar seus dados e excluir a conta a qualquer momento em “Privacidade e dados”.</li>
          </ul>
        </Section>

        <Section id="conteudo" title="3. Conteúdo educativo">
          <ul className="flex list-disc flex-col gap-1.5 pl-5">
            <li>Lições e acontecimentos são revisados por pessoas e indicam fontes, datas e limites. Mesmo assim, podem conter erros: use “Sinalizar problema”.</li>
            <li>Uma fonte oficial informa o que o órgão publicou; isso não significa endosso nem neutralidade garantida.</li>
            <li>O questionário de afinidades é uma modelagem editorial, não um teste científico validado nem um diagnóstico de identidade política.</li>
            <li>
              Respostas geradas por inteligência artificial são identificadas, usam apenas fontes aprovadas e podem conter falhas. Elas não substituem a leitura das fontes.
            </li>
          </ul>
        </Section>

        <Section id="participacao" title="4. Participação nos fóruns">
          <ul className="flex list-disc flex-col gap-1.5 pl-5">
            <li>
              Você continua responsável pelo que publica. Publicações de participantes são identificadas como tal e não são verificadas pela Polis.
            </li>
            <li>
              É proibido publicar ameaças, assédio, discurso de ódio, dados pessoais de terceiros, spam, propaganda ou pedidos de voto. Veja as{" "}
              <Link href="/comunidade/regras" className="text-link">
                regras da comunidade
              </Link>
              .
            </li>
            <li>
              A moderação pode remover conteúdo, encerrar tópicos e suspender temporariamente a publicação de uma conta, sempre com motivo registrado. Opiniões políticas não são
              motivo de remoção.
            </li>
            <li>Ao publicar, você autoriza a exibição do conteúdo na Polis enquanto ele não for excluído por você ou pela moderação.</li>
          </ul>
        </Section>

        <Section id="limites" title="5. Limites de uso">
          <p>
            Para proteger o serviço, há limites de frequência para login, cadastro, recuperação de senha, perguntas à IA, publicações e denúncias. Tentativas de burlar
            limites, automatizar acessos abusivos ou explorar falhas podem levar à suspensão da conta.
          </p>
        </Section>

        <Section id="privacidade" title="6. Privacidade">
          <p>
            O tratamento de dados pessoais está descrito na{" "}
            <Link href="/privacidade" className="text-link">
              Política de privacidade
            </Link>
            . A autorização para tratar as respostas do questionário é separada destes termos e pode ser revogada a qualquer momento.
          </p>
        </Section>

        <Section id="alteracoes" title="7. Alterações">
          <p>
            Mudanças relevantes nestes termos geram uma nova versão. Quando a finalidade de um tratamento mudar, pediremos uma nova autorização em vez de presumir o aceite
            anterior.
          </p>
        </Section>
      </article>
    </div>
  );
}
