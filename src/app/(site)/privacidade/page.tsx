import type { Metadata } from "next";
import Link from "next/link";
import { QUESTIONNAIRE_CONSENT_VERSION, TERMS_VERSION } from "@/modules/account/consent-texts";

export const metadata: Metadata = { title: "Política de privacidade" };

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-8">
      <h2 id={id} className="scroll-mt-24 text-h3 font-semibold">
        {title}
      </h2>
      <div className="mt-2 flex flex-col gap-2 text-body">{children}</div>
    </section>
  );
}

const DATA_TABLE = [
  {
    data: "Nome de exibição, e-mail e senha (guardada apenas como hash)",
    purpose: "Criar e manter a conta, entrar, confirmar o e-mail e recuperar a senha",
    basis: "Execução do serviço solicitado (LGPD, art. 7º, V)",
    retention: "Enquanto a conta existir",
  },
  {
    data: "Registro de aceite dos termos e de autorizações (finalidade, versão, data, revogação)",
    purpose: "Comprovar o que foi aceito e quando",
    basis: "Execução do serviço (art. 7º, V)",
    retention: "Enquanto a conta existir",
  },
  {
    data: "Respostas ao questionário e mapa de afinidades",
    purpose: "Ordenar a sua trilha de estudos, e nada além disso",
    basis: "Consentimento específico e destacado para dado sensível (art. 11, I)",
    retention: "Até você apagar, revogar a autorização, refazer o questionário (o resultado anterior é substituído) ou excluir a conta",
  },
  {
    data: "Progresso nas lições, XP e conquistas",
    purpose: "Mostrar seu avanço e evitar pontuação duplicada",
    basis: "Execução do serviço (art. 7º, V)",
    retention: "Enquanto a conta existir",
  },
  {
    data: "Fóruns seguidos, tópicos, comentários e denúncias",
    purpose: "Participação na comunidade e moderação",
    basis: "Execução do serviço (art. 7º, V)",
    retention: "Até exclusão pela pessoa, remoção pela moderação ou exclusão da conta (veja abaixo)",
  },
  {
    data: "Sessões (data, navegador informado) e contadores de limite de frequência",
    purpose: "Manter o login e proteger contra abuso",
    basis: "Legítimo interesse em segurança (art. 7º, IX)",
    retention: "Sessões expiram após 14 dias sem renovação; contadores são temporários",
  },
];

export default function PrivacyPolicyPage() {
  const contact = process.env.CONTACT_EMAIL;
  return (
    <div className="page-frame py-8 md:py-12">
      <article className="reading-measure">
        <p className="eyebrow">Documentos</p>
        <h1 className="mt-2 text-display-sm font-semibold md:text-display">Política de privacidade</h1>
        <p className="mt-2 text-meta text-ink-soft">
          Versão vinculada aos termos {TERMS_VERSION} e à autorização do questionário {QUESTIONNAIRE_CONSENT_VERSION}.
        </p>
        <p className="mt-4 text-lead text-ink-soft">
          A Polis coleta somente o necessário para funcionar. Respostas sobre temas políticos podem revelar opinião política, que a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018, art. 5º, II) classifica como dado pessoal sensível. Por isso, elas têm uma autorização própria, ficam privadas e nunca são enviadas a serviços de IA.
        </p>

        <Section id="dados" title="Que dados tratamos e por quê">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-meta">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Dado
                  </th>
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Finalidade
                  </th>
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Base legal
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Retenção
                  </th>
                </tr>
              </thead>
              <tbody>
                {DATA_TABLE.map((row) => (
                  <tr key={row.data} className="border-b border-line-soft align-top">
                    <td className="py-2 pr-3">{row.data}</td>
                    <td className="py-2 pr-3">{row.purpose}</td>
                    <td className="py-2 pr-3">{row.basis}</td>
                    <td className="py-2">{row.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="o-que-nao-fazemos" title="O que não fazemos">
          <ul className="flex list-disc flex-col gap-1.5 pl-5">
            <li>Não exibimos respostas, afinidades ou distintivos políticos publicamente. Nos fóruns aparecem apenas o nome de exibição e o que você publica.</li>
            <li>Não inferimos mudanças de posição a partir de cliques, leituras, quizzes ou participação nos fóruns.</li>
            <li>Não vendemos dados nem usamos dados para publicidade.</li>
            <li>Não enviamos à OpenAI nome, e-mail, identificadores de conta, respostas do questionário ou afinidades.</li>
          </ul>
        </Section>

        <Section id="compartilhamento" title="Com quem os dados podem ser compartilhados">
          <ul className="flex list-disc flex-col gap-1.5 pl-5">
            <li>
              <strong>OpenAI (inteligência artificial):</strong> quando você faz uma pergunta sobre uma lição ou um acontecimento, enviamos o texto da pergunta, o conteúdo
              publicado da página e trechos de fontes aprovadas, sem identificar você e com armazenamento desativado na requisição. Não escreva dados pessoais nas perguntas.
            </li>
            <li>
              <strong>Envio de e-mails:</strong> o provedor de e-mail configurado pela operação recebe seu endereço e o conteúdo das mensagens de confirmação e de recuperação de
              senha.
            </li>
            <li>
              <strong>Hospedagem:</strong> aplicação e banco de dados ficam no provedor de infraestrutura configurado pela operação, que processa os dados apenas para manter o
              serviço.
            </li>
          </ul>
        </Section>

        <Section id="exclusao" title="Exclusão da conta e anonimização">
          <ul className="flex list-disc flex-col gap-1.5 pl-5">
            <li>Ao excluir a conta, apagamos imediatamente respostas e resultado do questionário, autorizações, progresso, XP, conquistas, fóruns seguidos e sessões.</li>
            <li>
              Você escolhe o destino dos textos publicados: mantê-los sem vínculo com você (o autor aparece como “Participante removido”) ou apagar o texto de tópicos e
              comentários.
            </li>
            <li>Denúncias e decisões de moderação continuam no histórico, sem o vínculo com a sua conta.</li>
            <li>
              Registros técnicos (logs) não contêm respostas do questionário e ocultam campos como e-mail, senha e textos digitados. Eles seguem a retenção do provedor de
              hospedagem.
            </li>
            <li>Dados excluídos podem permanecer em cópias de segurança do banco até que essas cópias expirem, conforme o ciclo de backup da operação.</li>
          </ul>
        </Section>

        <Section id="direitos" title="Seus direitos">
          <p>
            A LGPD (art. 18) garante, entre outros, confirmação e acesso aos dados, correção, eliminação dos dados tratados com consentimento, portabilidade e revogação do
            consentimento. Na Polis, você exerce esses direitos diretamente em{" "}
            <Link href="/conta/privacidade" className="text-link">
              Privacidade e dados
            </Link>
            : exportar tudo em JSON, apagar as respostas do questionário, revogar a autorização e excluir a conta. O nome de exibição e a senha podem ser alterados em{" "}
            <Link href="/conta" className="text-link">
              Sua conta
            </Link>
            .
          </p>
          <p>
            A revogação da autorização do questionário é gratuita e imediata (art. 8º, § 5º): o tratamento para, e respostas e resultado são apagados. O registro de que a
            autorização existiu e foi revogada é mantido como comprovação.
          </p>
          {contact ? (
            <p>
              Para outras solicitações, escreva para{" "}
              <a className="text-link" href={`mailto:${contact}`}>
                {contact}
              </a>
              .
            </p>
          ) : null}
        </Section>

        <Section id="seguranca" title="Segurança">
          <ul className="flex list-disc flex-col gap-1.5 pl-5">
            <li>Senhas são guardadas apenas como hash. Cookies de sessão são protegidos contra acesso por scripts.</li>
            <li>Respostas do questionário e resultados só são acessíveis pela própria pessoa; nem a área administrativa as exibe.</li>
            <li>Há limites de frequência para login, cadastro, recuperação de senha, perguntas à IA e publicações.</li>
          </ul>
        </Section>
      </article>
    </div>
  );
}
