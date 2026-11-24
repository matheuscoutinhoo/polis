import type { SeedModule } from "./types";

export const moduloLeisEleicoes: SeedModule = {
  slug: "leis-eleicoes-e-partidos",
  number: 3,
  title: "Leis, eleições e partidos",
  summary: "Como uma lei é feita, como votamos e como funcionam os partidos.",
  area: "INSTITUICOES",
  stage: "FOUNDATIONS",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "como-uma-lei-e-feita",
      number: 1,
      title: "Como uma lei é feita",
      objective: "Acompanhar o caminho de um projeto de lei, da apresentação à sanção ou ao veto.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "Notícias falam em projetos apresentados, aprovados, sancionados ou vetados. Cada palavra indica uma etapa diferente do mesmo caminho. Nesta lição, você acompanha esse caminho no Congresso Nacional e aprende a diferenciar uma proposta em discussão de uma lei em vigor.",
        blocks: [
          {
            type: "definition",
            term: "Processo legislativo",
            text: "Segundo o Senado, é o conjunto de ações que têm por objetivo a elaboração de normas legais, como leis e decretos. A Constituição lista sete tipos de norma elaborados nesse processo, entre eles emendas à Constituição, leis e medidas provisórias (art. 59).",
            sources: ["senado-faq-o-que-e-processo-legislativo", "cf88-art59"],
          },
          {
            type: "definition",
            term: "Projeto de lei",
            text: "É uma proposição, isto é, uma proposta formal apresentada ao Legislativo. Segundo o Glossário Legislativo do Congresso Nacional, trata de assuntos sobre os quais a União pode legislar. Um projeto não é uma lei em vigor: mesmo depois de aprovado, ainda depende da sanção ou do veto do Presidente da República.",
            sources: ["congresso-glossario-projeto-de-lei"],
          },
          { type: "heading", text: "Quem pode propor" },
          {
            type: "paragraph",
            text: "Pela Constituição, podem propor leis deputados, senadores e comissões da Câmara, do Senado ou do Congresso, o Presidente da República, o Supremo Tribunal Federal, os Tribunais Superiores, o Procurador-Geral da República e os cidadãos, nos casos previstos na própria Constituição (art. 61). Na iniciativa popular, o projeto é apresentado à Câmara com a assinatura de pelo menos 1% do eleitorado nacional, distribuído por no mínimo cinco estados, com pelo menos 0,3% dos eleitores de cada um.",
            sources: ["cf88-art61"],
          },
          {
            type: "paragraph",
            text: "A Lei nº 9.709/1998 repete essa exigência e define o plebiscito, consulta ao povo convocada antes de um ato legislativo ou administrativo, e o referendo, convocado depois do ato, para que o povo o confirme ou rejeite.",
            sources: ["lei-9709-1998"],
          },
          { type: "heading", text: "O caminho no Congresso" },
          {
            type: "paragraph",
            text: "O percurso de uma proposta no Legislativo se chama tramitação. Segundo a Câmara, o projeto passa primeiro por comissões temáticas, grupos menores de deputados que analisam o conteúdo. Depois vem a análise de admissibilidade: a Comissão de Finanças e Tributação (CFT) examina propostas que criam gastos ou tratam de finanças públicas, e a Comissão de Constituição e Justiça e de Cidadania (CCJC) verifica se o texto respeita a Constituição.",
            sources: ["camara-entenda-processo-legislativo"],
          },
          {
            type: "paragraph",
            text: "A maioria dos projetos tem tramitação conclusiva: a decisão das comissões basta, e o Plenário, que reúne todos os deputados, vota apenas em casos específicos. Aprovado na Câmara, o projeto segue para o Senado, ou para a sanção, se já tiver passado por lá. No Senado, as comissões podem decidir alguns projetos de forma terminativa, sem votação no Plenário. Se uma Casa (Câmara ou Senado) mudar o texto aprovado pela outra, ele volta à Casa de origem.",
            sources: ["camara-entenda-processo-legislativo", "senado-funcionamento"],
          },
          { type: "heading", text: "Sanção ou veto" },
          {
            type: "paragraph",
            text: "A Casa em que a votação terminou envia o projeto ao Presidente da República, que tem 15 dias úteis para sancioná-lo ou vetá-lo. O veto ocorre quando o Presidente considera o projeto, no todo ou em parte, inconstitucional ou contrário ao interesse público; os motivos devem ser comunicados ao Presidente do Senado em 48 horas (art. 66).",
            sources: ["cf88-art66", "congresso-glossario-veto"],
          },
          {
            type: "quote",
            text: "Se o presidente sancionar (ratificar) o projeto, ele se torna lei e é publicado no Diário Oficial da União. Mas o presidente pode vetar uma parte do projeto ou todo ele.",
            sourceKey: "camara-entenda-processo-legislativo",
            locator: "Passo a passo — sanção e veto",
          },
          {
            type: "paragraph",
            text: "O veto volta ao Congresso, que o analisa em sessão conjunta de deputados e senadores, em até 30 dias, e pode mantê-lo ou derrubá-lo. Para derrubá-lo, é preciso o voto da maioria absoluta dos deputados e senadores (art. 66, § 4º). Segundo a Câmara, se o veto for derrubado, os trechos vetados passam a integrar a lei.",
            sources: ["cf88-art66", "camara-entenda-processo-legislativo"],
          },
          {
            type: "example",
            title: "Exemplo fictício: um projeto sobre transporte escolar",
            text: "O caso é inventado. 1) Uma deputada apresenta na Câmara um projeto com regras de segurança para o transporte escolar. 2) Uma comissão temática aprova o conteúdo, e a CCJC conclui que o texto respeita a Constituição. Em tramitação conclusiva, o projeto segue para o Senado sem passar pelo Plenário. 3) No Senado, uma comissão aprova o texto de forma terminativa, sem mudanças, e ele vai ao Presidente da República. 4) Em 15 dias úteis, o Presidente sanciona o projeto, mas veta um artigo por considerá-lo contrário ao interesse público. A parte sancionada se torna lei e é publicada no Diário Oficial da União. 5) O Congresso decide se mantém ou derruba o veto. Até a sanção, o texto era só um projeto, e não uma lei em vigor.",
            sources: ["camara-entenda-processo-legislativo", "senado-funcionamento", "cf88-art66"],
          },
          {
            type: "paragraph",
            text: "A medida provisória segue outro caminho. Segundo a Câmara, ela é editada pelo Presidente da República e tem força de lei desde a edição, antes de qualquer votação. Vale por até 120 dias e precisa passar por uma comissão mista, de deputados e senadores, e pelos Plenários da Câmara e do Senado.",
            sources: ["camara-entenda-processo-legislativo", "cf88-art59"],
          },
          {
            type: "limit",
            title: "O que esta lição não detalha",
            text: "A lição descreve o caminho geral de um projeto de lei. Emendas à Constituição, leis complementares e medidas provisórias têm regras próprias, não detalhadas aqui. Casos específicos dependem da Constituição e dos regimentos internos da Câmara, do Senado e do Congresso.",
          },
        ],
        relatedConcepts: [
          { term: "Sanção", explanation: "Concordância do Presidente da República com um projeto aprovado pelo Congresso, que assim se torna lei." },
          {
            term: "Tramitação conclusiva",
            explanation: "Na Câmara, forma de tramitação em que as comissões decidem sobre o projeto sem que ele precise ser votado no Plenário.",
          },
          {
            term: "Plenário",
            explanation: "Reunião de todos os membros de uma Casa legislativa; o Senado descreve o seu Plenário como a instância máxima de deliberação.",
          },
          {
            term: "Maioria absoluta",
            explanation: "Mais da metade do total de membros de um grupo, e não apenas dos presentes; é a exigência da Constituição para derrubar um veto.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Um projeto de lei foi aprovado pela Câmara e pelo Senado, e o Presidente da República ainda não se manifestou. Qual é a situação do texto?",
            options: [
              { id: "a", text: "Já é uma lei em vigor, porque foi aprovado pelas duas Casas." },
              { id: "b", text: "Ainda é um projeto: depende da sanção ou do veto do Presidente." },
              { id: "c", text: "Perdeu a validade, porque não foi sancionado no mesmo dia." },
              { id: "d", text: "Tornou-se uma medida provisória." },
            ],
            correctOptionId: "b",
            explanation:
              "Segundo o Glossário Legislativo do Congresso, o projeto aprovado ainda se sujeita à sanção ou ao veto presidencial. A aprovação nas duas Casas não basta para transformá-lo em lei. A Constituição dá ao Presidente 15 dias úteis, contados do recebimento, para decidir. A medida provisória é outro tipo de norma, editada pelo próprio Presidente.",
          },
          {
            id: "q2",
            prompt: "Segundo a Constituição, o que acontece com um veto presidencial?",
            options: [
              { id: "a", text: "É a decisão final, e o Congresso não pode revê-lo." },
              { id: "b", text: "É analisado pelo Congresso em sessão conjunta e pode ser mantido ou derrubado." },
              { id: "c", text: "É enviado automaticamente ao Supremo Tribunal Federal para julgamento." },
              { id: "d", text: "É submetido obrigatoriamente a um referendo." },
            ],
            correctOptionId: "b",
            explanation:
              "Pelo art. 66, § 4º, o veto é apreciado em sessão conjunta de deputados e senadores, em até 30 dias, e pode ser derrubado pelo voto da maioria absoluta dos deputados e senadores. Por isso, o veto não é necessariamente a palavra final. O procedimento descrito no art. 66 não inclui envio ao STF nem referendo.",
          },
          {
            id: "q3",
            prompt: "Na Câmara dos Deputados, o que significa dizer que um projeto tem tramitação conclusiva?",
            options: [
              { id: "a", text: "Que ele já foi sancionado e virou lei." },
              { id: "b", text: "Que as comissões podem decidir sobre ele sem votação no Plenário." },
              { id: "c", text: "Que ele só pode ser apresentado por cidadãos." },
              { id: "d", text: "Que ele vai direto ao Presidente, sem passar pelo Senado." },
            ],
            correctOptionId: "b",
            explanation:
              "Segundo a Câmara, a maioria dos projetos só precisa passar pelas comissões: é a tramitação conclusiva. O Plenário vota apenas em casos específicos. “Conclusiva” se refere à decisão nas comissões da Câmara, e não ao fim do processo: aprovado, o projeto ainda segue para o Senado ou, se já tiver passado por lá, para a sanção.",
          },
        ],
      },
      sources: [
        { key: "cf88-art59", supports: "Lista os tipos de norma elaborados no processo legislativo, entre eles leis e medidas provisórias." },
        { key: "cf88-art61", supports: "Define quem pode propor leis e o número mínimo de assinaturas da iniciativa popular." },
        {
          key: "cf88-art66",
          supports:
            "Sustenta o envio do projeto ao Presidente, o prazo de 15 dias úteis, os motivos e a comunicação do veto em 48 horas e a apreciação do veto em sessão conjunta, com exigência de maioria absoluta para derrubá-lo.",
        },
        {
          key: "camara-entenda-processo-legislativo",
          supports:
            "Sustenta as etapas na Câmara (comissões temáticas, admissibilidade na CFT e na CCJC, tramitação conclusiva), o envio ao Senado ou à sanção, o retorno do texto alterado à Casa de origem, os efeitos da sanção e do veto e as regras básicas da medida provisória.",
        },
        { key: "senado-faq-o-que-e-processo-legislativo", supports: "Define processo legislativo." },
        { key: "congresso-glossario-projeto-de-lei", supports: "Define projeto de lei e mostra que, depois de aprovado, ele ainda depende de sanção ou veto." },
        { key: "congresso-glossario-veto", supports: "Define o veto e suas justificativas: inconstitucionalidade ou contrariedade ao interesse público." },
        { key: "senado-funcionamento", supports: "Sustenta que comissões do Senado podem decidir alguns projetos de forma terminativa, sem votação no Plenário." },
        { key: "lei-9709-1998", supports: "Sustenta a exigência de assinaturas da iniciativa popular e as definições de plebiscito e referendo." },
      ],
    },
    {
      slug: "eleicoes-e-partidos",
      number: 2,
      title: "Eleições e partidos",
      objective: "Diferenciar os sistemas majoritário e proporcional e entender o papel dos partidos.",
      minutes: 7,
      currentKeys: [],
      content: {
        intro:
          "No Brasil, cargos diferentes são preenchidos por regras diferentes. Nesta lição, você compara o sistema majoritário e o proporcional, acompanha uma conta com números inventados e vê o que a lei diz sobre os partidos.",
        blocks: [
          {
            type: "paragraph",
            text: "Pela Constituição, a soberania popular, o poder que pertence ao povo, é exercida pelo voto direto (sem intermediários) e secreto, com valor igual para todos (art. 14). Alistar-se como eleitor e votar são obrigatórios para maiores de 18 anos e facultativos para analfabetos, maiores de 70 anos e jovens de 16 e 17 anos.",
            sources: ["cf88-art14"],
          },
          {
            type: "comparison",
            title: "Dois sistemas eleitorais",
            orderNote: "Ordem alfabética.",
            items: [
              {
                label: "Majoritário",
                heading: "Vence quem tem mais votos",
                text: "Mecanismo: é eleito quem recebe mais votos. Cargos, segundo a Câmara: presidente da República, governadores, senadores e prefeitos. Base na Constituição: o Senado é eleito pelo princípio majoritário; cada estado e o Distrito Federal elegem três senadores, com mandato de oito anos (art. 46).",
                sources: ["camara-eleicoes-2026-glossario-eleitor", "agencia-camara-sistema-proporcional", "cf88-art46"],
              },
              {
                label: "Proporcional",
                heading: "Vagas divididas conforme os votos",
                text: "Mecanismo: as vagas pertencem aos partidos ou federações, são divididas conforme os votos de cada um e ocupadas pelos seus candidatos mais votados. Cargos, segundo a Câmara: deputados e vereadores. Base na Constituição: a Câmara é eleita pelo sistema proporcional em cada estado, território e no Distrito Federal (art. 45).",
                sources: ["camara-eleicoes-2026-glossario-eleitor", "agencia-camara-sistema-proporcional", "cf88-art45", "lei-4737-1965-arts-106-108"],
              },
            ],
          },
          { type: "heading", text: "A conta do sistema proporcional" },
          {
            type: "definition",
            term: "Quociente eleitoral",
            text: "É o resultado da divisão do número de votos válidos pelo número de vagas a preencher. A fração é desprezada se for igual ou inferior a meio; se for superior, arredonda-se para cima (Código Eleitoral, Lei nº 4.737/1965, art. 106).",
            sources: ["lei-4737-1965-arts-106-108"],
          },
          {
            type: "definition",
            term: "Quociente partidário",
            text: "Indica quantas vagas cada partido obtém nessa etapa: divide-se o total de votos válidos do partido pelo quociente eleitoral, sempre desprezada a fração (art. 107). As vagas ficam com os candidatos do partido que tiveram pelo menos 10% do quociente eleitoral em votos, na ordem da votação de cada um (art. 108).",
            sources: ["lei-4737-1965-arts-106-108"],
          },
          {
            type: "example",
            title: "Exemplo fictício: 10 vagas e 100.000 votos válidos",
            text: "Os números são inventados. 1) Quociente eleitoral: 100.000 ÷ 10 = 10.000. Se a conta desse 10.000,4, o quociente seria 10.000; se desse 10.000,6, seria 10.001. 2) Quociente partidário: o Partido A teve 48.000 votos (4,8: 4 vagas); o B, 31.000 (3,1: 3 vagas); o C, 15.500 (1,55: 1 vaga); o D, 5.500 (0,55: nenhuma vaga nesta etapa). Aqui a fração é desprezada mesmo quando passa de meio. 3) Votação mínima: 10% de 10.000 são 1.000 votos. No Partido B, os três mais votados tiveram 9.000, 4.000 e 1.100 votos e ficam com as 3 vagas. Quem tivesse menos de 1.000 votos não poderia ser eleito por essa regra. 4) Os quocientes partidários preencheram 8 das 10 vagas; as 2 restantes são as sobras.",
            sources: ["lei-4737-1965-arts-106-108"],
          },
          {
            type: "paragraph",
            text: "Segundo o Supremo Tribunal Federal (STF), uma decisão do tribunal mudou quem participa da distribuição das sobras: todos os partidos passaram a poder participar do rateio, isto é, da divisão dessas vagas.",
            sources: ["stf-noticia-sobras-eleitorais-2025", "lei-4737-1965-arts-106-108"],
          },
          {
            type: "limit",
            title: "Sobras e outras regras: confira as normas vigentes",
            text: "Esta lição não explica o cálculo das sobras, cuja distribuição mudou após decisões do STF e deve ser conferida nas regras em vigor. Regras específicas de cada cargo, como as de segundo turno, também não são detalhadas.",
          },
          { type: "heading", text: "O papel dos partidos" },
          {
            type: "paragraph",
            text: "O Glossário Legislativo do Congresso define partido político como uma organização de pessoas com interesses ou ideologia comuns, que se associam para assumir o poder e implantar um programa de governo. Pela Lei nº 9.096/1995, o partido é uma pessoa jurídica de direito privado, ou seja, uma entidade privada, e não um órgão do Estado. Destina-se a assegurar a autenticidade do sistema representativo, em que o povo elege representantes, e a defender os direitos fundamentais.",
            sources: ["congresso-glossario-partido-politico", "lei-9096-1995"],
          },
          {
            type: "paragraph",
            text: "A Constituição garante a liberdade de criar, fundir, incorporar e extinguir partidos, respeitados a soberania nacional, o regime democrático, o pluripartidarismo (a existência de vários partidos) e os direitos fundamentais. Os partidos devem ter caráter nacional, não podem receber recursos de entidades ou governos estrangeiros e devem prestar contas à Justiça Eleitoral (art. 17). Para obter o registro no Tribunal Superior Eleitoral, o partido precisa comprovar o apoio de eleitores não filiados a partidos equivalente a pelo menos 0,5% dos votos da última eleição geral para a Câmara, sem contar brancos e nulos, distribuídos por pelo menos um terço dos estados (Lei nº 9.096/1995, art. 7º).",
            sources: ["cf88-art17", "lei-9096-1995"],
          },
          {
            type: "paragraph",
            text: "Segundo o glossário da Câmara para as eleições de 2026, a federação ocorre quando dois ou mais partidos se unem para atuar como se fossem um só, por pelo menos quatro anos. Diferentemente das coligações, uniões temporárias para disputar eleições majoritárias, as federações valem também nas eleições proporcionais. O glossário também define a cláusula de barreira: regra que limita o acesso ao dinheiro do Fundo Partidário e ao tempo gratuito de rádio e TV dos partidos que não alcançam um número mínimo de votos ou de deputados eleitos.",
            sources: ["camara-eleicoes-2026-glossario-eleitor"],
          },
        ],
        relatedConcepts: [
          {
            term: "Federação partidária",
            explanation: "União de dois ou mais partidos que atuam como um só por pelo menos quatro anos, inclusive nas eleições proporcionais.",
          },
          { term: "Coligação", explanation: "União temporária de partidos para disputar eleições majoritárias, segundo o glossário da Câmara para 2026." },
          {
            term: "Sobras",
            explanation: "Vagas que restam depois da distribuição pelos quocientes partidários; sua divisão segue regras alteradas por decisões do STF.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo a Constituição, por qual sistema são eleitos os deputados federais?",
            options: [
              { id: "a", text: "Pelo princípio majoritário, com três eleitos por estado." },
              { id: "b", text: "Pelo sistema proporcional, com vagas divididas conforme os votos de partidos ou federações." },
              { id: "c", text: "Por escolha dos governadores de cada estado." },
            ],
            correctOptionId: "b",
            explanation:
              "O art. 45 da Constituição determina que a Câmara dos Deputados seja eleita pelo sistema proporcional. A regra majoritária, com três eleitos por estado, vale para o Senado (art. 46), e não para a Câmara. A Constituição descreve os deputados como representantes do povo eleitos, e não escolhidos por governadores.",
          },
          {
            id: "q2",
            prompt:
              "Numa eleição fictícia, o quociente eleitoral é 10.000 e um partido recebe 26.000 votos válidos. Pela regra do quociente partidário (art. 107 do Código Eleitoral), quantas vagas esse partido obtém nessa etapa?",
            options: [
              { id: "a", text: "2" },
              { id: "b", text: "3" },
              { id: "c", text: "26" },
            ],
            correctOptionId: "a",
            explanation:
              "26.000 ÷ 10.000 = 2,6. No quociente partidário, a fração é sempre desprezada (art. 107), então o partido obtém 2 vagas nessa etapa. O arredondamento para cima quando a fração passa de meio vale para o quociente eleitoral (art. 106), e não para o partidário.",
          },
          {
            id: "q3",
            prompt: "Segundo o glossário da Câmara para as eleições de 2026, o que diferencia a federação partidária da coligação?",
            options: [
              { id: "a", text: "Não há diferença: os dois termos significam a mesma coisa." },
              { id: "b", text: "A federação é um órgão da Justiça Eleitoral, e a coligação é um partido político." },
              {
                id: "c",
                text: "A federação dura pelo menos quatro anos e vale também nas eleições proporcionais; a coligação é temporária e serve para eleições majoritárias.",
              },
            ],
            correctOptionId: "c",
            explanation:
              "Segundo o glossário, na federação dois ou mais partidos atuam como se fossem um só por, no mínimo, quatro anos, e ela vale também nas eleições proporcionais. A coligação é uma união temporária para disputar eleições majoritárias. Nos dois casos, trata-se de uniões de partidos, e não de órgãos da Justiça Eleitoral.",
          },
        ],
      },
      sources: [
        { key: "cf88-art14", supports: "Sustenta as características do voto e quem é obrigado a votar ou pode votar facultativamente." },
        {
          key: "cf88-art17",
          supports: "Sustenta a liberdade de criação de partidos, seus limites e preceitos, como caráter nacional, vedação de recursos estrangeiros e prestação de contas à Justiça Eleitoral.",
        },
        { key: "cf88-art45", supports: "Sustenta que os deputados federais são eleitos pelo sistema proporcional." },
        { key: "cf88-art46", supports: "Sustenta que os senadores são eleitos pelo princípio majoritário, três por estado e pelo Distrito Federal, com mandato de oito anos." },
        {
          key: "lei-4737-1965-arts-106-108",
          supports: "Sustenta as regras do quociente eleitoral (com a regra da fração), do quociente partidário e da votação mínima de 10%, aplicadas no exemplo fictício.",
        },
        { key: "lei-9096-1995", supports: "Sustenta a natureza jurídica e a finalidade dos partidos e o apoio mínimo de eleitores exigido para o registro do estatuto." },
        { key: "congresso-glossario-partido-politico", supports: "Sustenta a definição geral de partido político." },
        {
          key: "agencia-camara-sistema-proporcional",
          supports: "Sustenta apenas a distinção básica entre o sistema majoritário, em que vence quem tem mais votos, e o sistema proporcional.",
        },
        {
          key: "camara-eleicoes-2026-glossario-eleitor",
          supports:
            "Sustenta as definições de sistema majoritário e proporcional (com os cargos de cada um), a pertença das vagas a partidos ou federações e as definições de federação, coligação e cláusula de barreira.",
        },
        { key: "stf-noticia-sobras-eleitorais-2025", supports: "Sustenta que decisão do STF alterou a regra sobre quem participa da distribuição das sobras." },
      ],
    },
  ],
};
