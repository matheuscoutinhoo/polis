import { DIMENSIONS, type DimensionKey } from "./dimensions";

// Banco versionado de situações, em cinco blocos (um por dimensão). Cada bloco
// tem 10 temas; cada tema tem versões em contextos diferentes, com a mesma
// dimensão, direção e peso. Cada tentativa sorteia uma versão de cada tema
// (10 situações por bloco) e embaralha a ordem dentro do bloco.
// direction = +1: concordar aproxima do polo positivo da dimensão;
// direction = −1: concordar aproxima do polo negativo. Em cada dimensão há
// 5 temas em cada direção, para reduzir respostas automáticas de concordância;
// assim, toda tentativa tem cinco situações em cada direção por bloco.
// Qualquer alteração de texto, direção ou peso exige uma nova versão do banco.
// Uma situação nunca muda de sentido sob o mesmo id: as tentativas guardam os
// ids sorteados, e as respostas, os ids respondidos.

export const QUESTION_BANK_VERSION = "2026.11-v2";

export type QuestionText = { id: string; title: string; situation: string; statement: string };

export type QuestionSlot = {
  /** Theme id, equal to the id of its first version. */
  slot: string;
  dimension: DimensionKey;
  direction: 1 | -1;
  weight: number;
  /** The first version is the situation used before the draw existed. */
  versions: QuestionText[];
};

export type Question = QuestionText & Omit<QuestionSlot, "versions">;

export const QUESTION_SLOTS: QuestionSlot[] = [
  // Bloco 1 — Economia, mercado e redistribuição
  {
    slot: "eco-01",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-01",
        title: "Imposto sobre imóveis de maior valor para creches",
        situation:
          "Uma cidade precisa de recursos para abrir mais vagas em creches públicas. Uma proposta aumenta o imposto apenas sobre imóveis de maior valor; os demais continuariam pagando o mesmo.",
        statement: "Eu apoiaria aumentar o imposto só sobre os imóveis de maior valor para financiar as creches.",
      },
      {
        id: "eco-01b",
        title: "Imposto maior sobre heranças de alto valor",
        situation:
          "Um estado precisa de recursos para ampliar as escolas de ensino em tempo integral. Uma proposta aumenta o imposto apenas sobre heranças de valor elevado; as demais continuariam pagando o mesmo.",
        statement: "Eu apoiaria aumentar o imposto só sobre as heranças de valor elevado para ampliar as escolas em tempo integral.",
      },
    ],
  },
  {
    slot: "eco-02",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-02",
        title: "Transporte por aplicativo com regras mínimas",
        situation:
          "Uma cidade limita o número de táxis por meio de licenças. Um aplicativo de transporte quer operar ali. A prefeitura pode liberar o serviço com regras mínimas de segurança ou limitar a quantidade de motoristas.",
        statement: "A prefeitura deveria liberar o serviço com regras mínimas de segurança e deixar a concorrência definir preços e número de motoristas.",
      },
      {
        id: "eco-02b",
        title: "Aluguel por temporada sem limite de imóveis",
        situation:
          "Em uma cidade turística, muitos apartamentos passaram a ser alugados por temporada em aplicativos. Hotéis e parte dos moradores pedem um limite para o número de imóveis, alegando concorrência desigual e aluguéis mais caros; os proprietários querem apenas regras de cadastro e segurança.",
        statement: "A prefeitura deveria exigir apenas cadastro e regras de segurança e deixar o mercado definir quantos imóveis são alugados por temporada.",
      },
    ],
  },
  {
    slot: "eco-03",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-03",
        title: "Renda mensal para famílias de baixa renda",
        situation:
          "Um governo estadual avalia criar um programa que paga uma quantia mensal a famílias de baixa renda. Para isso, teria de reduzir outros gastos ou aumentar tributos.",
        statement: "Eu apoiaria criar o programa, mesmo com a necessidade de reduzir outros gastos ou aumentar tributos.",
      },
      {
        id: "eco-03b",
        title: "Desconto na conta de luz para famílias de baixa renda",
        situation: "Um governo estadual avalia pagar parte da conta de luz de famílias de baixa renda. Para isso, teria de adiar algumas obras ou aumentar tributos.",
        statement: "Eu apoiaria o desconto na conta de luz, mesmo com o adiamento de obras ou o aumento de tributos.",
      },
    ],
  },
  {
    slot: "eco-04",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-04",
        title: "Concessão do serviço de água a empresa privada",
        situation:
          "A empresa pública de água de uma cidade tem dívidas e atende mal alguns bairros. Uma proposta concede o serviço a uma empresa privada por 30 anos, com metas de cobertura fiscalizadas por uma agência pública.",
        statement: "Eu apoiaria conceder o serviço à empresa privada com essas metas e essa fiscalização.",
      },
      {
        id: "eco-04b",
        title: "Concessão de parques municipais a uma empresa",
        situation:
          "Uma cidade não consegue manter bem os seus parques. Uma proposta concede a gestão de dois deles a uma empresa privada por 20 anos: a entrada continuaria gratuita, e a empresa ganharia dinheiro com restaurantes, estacionamento e eventos, sob fiscalização da prefeitura.",
        statement: "Eu apoiaria conceder a gestão dos parques à empresa nessas condições.",
      },
    ],
  },
  {
    slot: "eco-05",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-05",
        title: "Aumento do salário mínimo acima da inflação",
        situation:
          "O governo federal discute o valor do salário mínimo do próximo ano. Uma proposta prevê aumento acima da inflação. Parte dos pequenos negócios afirma que teria mais dificuldade para contratar.",
        statement: "Eu apoiaria o aumento acima da inflação, mesmo com essa dificuldade para alguns pequenos negócios.",
      },
      {
        id: "eco-05b",
        title: "Jornada menor sem redução de salário",
        situation:
          "Uma proposta reduz a jornada máxima de trabalho de 44 para 40 horas por semana, sem redução de salário. Parte das empresas afirma que os custos aumentariam e que contrataria menos.",
        statement: "Eu apoiaria reduzir a jornada sem redução de salário, mesmo com o aumento de custos para as empresas.",
      },
    ],
  },
  {
    slot: "eco-06",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-06",
        title: "Menos exigências para abrir pequenos negócios",
        situation:
          "Para abrir uma padaria, uma pessoa precisa de várias licenças e cadastros, e o processo leva meses. Uma proposta elimina parte dessas exigências e deixa a fiscalização para depois da abertura.",
        statement: "Eu apoiaria eliminar parte das exigências, mesmo com menos fiscalização antes da abertura dos negócios.",
      },
      {
        id: "eco-06b",
        title: "Comércio livre para escolher dias e horários",
        situation:
          "Uma cidade exige autorização especial para que lojas abram aos domingos e feriados. Uma proposta deixa cada comerciante decidir seus dias e horários; sindicatos de trabalhadores do comércio temem jornadas mais longas.",
        statement: "Cada comerciante deveria poder decidir livremente seus dias e horários de funcionamento.",
      },
    ],
  },
  {
    slot: "eco-07",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-07",
        title: "Mais profissionais nos postos de saúde públicos",
        situation:
          "Para reduzir a espera por consultas, um município pode contratar mais profissionais para os postos de saúde públicos ou distribuir vales para consultas em clínicas privadas. O custo das duas opções é parecido.",
        statement: "O município deveria priorizar a contratação de profissionais para os postos de saúde públicos.",
      },
      {
        id: "eco-07b",
        title: "Creches públicas ou bolsas em creches particulares",
        situation:
          "Faltam vagas em creches em uma cidade. Com o mesmo orçamento, a prefeitura pode construir e manter creches públicas, que levariam mais tempo para abrir, ou pagar bolsas para crianças em creches particulares credenciadas, que atenderiam as famílias mais rápido.",
        statement: "A prefeitura deveria priorizar a construção e a manutenção de creches públicas.",
      },
    ],
  },
  {
    slot: "eco-08",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-08",
        title: "Tarifas baixas para produtos importados",
        situation:
          "Uma indústria nacional pede que o governo aumente os impostos sobre produtos importados para proteger empregos no país. A medida tende a encarecer alguns produtos para os consumidores.",
        statement: "O governo deveria manter os impostos de importação baixos e deixar os produtos importados concorrerem livremente.",
      },
      {
        id: "eco-08b",
        title: "Compras públicas sem exigência de fabricação nacional",
        situation:
          "Um governo vai comprar ônibus e equipamentos para hospitais. Uma proposta exige que parte das peças seja fabricada no país, para gerar empregos; com isso, alguns fornecedores estrangeiros mais baratos ficariam de fora.",
        statement: "O governo deveria comprar dos fornecedores com melhor preço e qualidade, sem exigir fabricação nacional.",
      },
    ],
  },
  {
    slot: "eco-09",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-09",
        title: "Previdência para entregadores de aplicativo",
        situation:
          "Entregadores que trabalham por aplicativo não têm os mesmos direitos de quem tem carteira assinada. Uma proposta obriga as empresas de aplicativo a contribuir para a previdência desses trabalhadores.",
        statement: "Eu apoiaria a contribuição obrigatória das empresas, mesmo que o preço das entregas aumente.",
      },
      {
        id: "eco-09b",
        title: "Previdência para profissionais de faxina por aplicativo",
        situation:
          "Plataformas digitais que intermediam faxinas e pequenos reparos em residências não contribuem para a previdência dos profissionais cadastrados. Uma proposta obriga essas empresas a pagar seguro contra acidentes e contribuição previdenciária para esses trabalhadores.",
        statement: "Eu apoiaria a obrigação, mesmo que o preço dos serviços aumente.",
      },
    ],
  },
  {
    slot: "eco-10",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-10",
        title: "Cortar despesas em vez de aumentar tributos",
        situation: "Um governo gasta mais do que arrecada e precisa equilibrar as contas. As alternativas principais são cortar despesas ou aumentar tributos.",
        statement: "O governo deveria priorizar o corte de despesas em vez do aumento de tributos.",
      },
      {
        id: "eco-10b",
        title: "Limite para o crescimento dos gastos públicos",
        situation:
          "Uma proposta limita, por dez anos, o crescimento dos gastos de um estado à inflação do ano anterior. Áreas como saúde e educação teriam de disputar recursos dentro desse limite.",
        statement: "Eu apoiaria o limite de gastos, mesmo que saúde e educação tenham de disputar recursos dentro dele.",
      },
    ],
  },

  // Bloco 2 — Liberdades civis e exercício da autoridade
  {
    slot: "lib-01",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-01",
        title: "Câmeras em espaços públicos",
        situation: "Uma cidade avalia usar câmeras em espaços públicos para ajudar a prevenir crimes. As gravações teriam regras de acesso e prazo de exclusão.",
        statement: "Eu apoiaria a medida com essas condições.",
      },
      {
        id: "lib-01b",
        title: "Reconhecimento facial nas estações de metrô",
        situation:
          "Uma cidade quer usar câmeras com reconhecimento facial nas estações de metrô para localizar pessoas com mandado de prisão. Há registros de erros de identificação, e as imagens ficariam guardadas por 30 dias.",
        statement: "Eu apoiaria o reconhecimento facial nas estações com essas condições.",
      },
    ],
  },
  {
    slot: "lib-02",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-02",
        title: "Críticas ofensivas a uma autoridade",
        situation: "Uma pessoa publica nas redes sociais críticas duras e ofensivas ao prefeito da cidade, sem ameaças e sem acusações falsas.",
        statement: "Esse tipo de publicação deve continuar permitido, mesmo sendo ofensivo.",
      },
      {
        id: "lib-02b",
        title: "Vídeos de humor que ridicularizam um juiz",
        situation:
          "Um humorista publica vídeos que ridicularizam um juiz conhecido, com imitações e piadas pesadas, sem ameaças e sem acusações falsas. O juiz pede à Justiça que os vídeos sejam retirados do ar.",
        statement: "Os vídeos devem continuar no ar, mesmo sendo ofensivos ao juiz.",
      },
    ],
  },
  {
    slot: "lib-03",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-03",
        title: "Revistas policiais mais frequentes em um bairro",
        situation:
          "Depois de uma série de assaltos em um bairro, a polícia propõe fazer, durante três meses, abordagens e revistas mais frequentes em pessoas que circulam à noite.",
        statement: "Eu apoiaria as revistas mais frequentes no bairro durante esse período.",
      },
      {
        id: "lib-03b",
        title: "Toque de recolher para adolescentes",
        situation:
          "Depois de casos de violência envolvendo jovens à noite, uma cidade propõe que menores de 16 anos não possam circular desacompanhados nas ruas depois das 23h, durante seis meses.",
        statement: "Eu apoiaria o toque de recolher durante esse período.",
      },
    ],
  },
  {
    slot: "lib-04",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-04",
        title: "Acesso a mensagens só com autorização judicial",
        situation: "Uma proposta permitiria que a polícia acessasse mensagens de celular de pessoas investigadas, em casos urgentes, sem autorização prévia de um juiz.",
        statement: "O acesso a mensagens deveria sempre depender de autorização prévia de um juiz.",
      },
      {
        id: "lib-04b",
        title: "Entrada da polícia em casas a partir de denúncia anônima",
        situation: "Uma proposta permitiria que a polícia entrasse em uma casa sem mandado judicial com base apenas em uma denúncia anônima de que ali há drogas.",
        statement: "Nesses casos, a entrada da polícia em uma casa deveria depender de mandado judicial.",
      },
    ],
  },
  {
    slot: "lib-05",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-05",
        title: "Detectores de metal e revista de mochilas na escola",
        situation:
          "Uma escola pública tem enfrentado brigas frequentes, algumas com objetos cortantes. A direção quer instalar detectores de metal e revistar mochilas na entrada.",
        statement: "Eu apoiaria os detectores e as revistas de mochilas na escola.",
      },
      {
        id: "lib-05b",
        title: "Cadastro biométrico de torcedores nos estádios",
        situation:
          "Depois de brigas entre torcidas, um estado passa a exigir cadastro com foto e impressão digital de todos os torcedores para entrar nos estádios. Quem for identificado em brigas ficaria proibido de entrar por um tempo.",
        statement: "Eu apoiaria o cadastro obrigatório e a proibição de entrada nessas condições.",
      },
    ],
  },
  {
    slot: "lib-06",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-06",
        title: "Manifestação pacífica que interrompe o trânsito",
        situation: "Um grupo avisa com antecedência que fará uma manifestação pacífica em uma avenida movimentada. O ato deve interromper o trânsito por algumas horas.",
        statement: "A manifestação deve ser permitida, mesmo atrapalhando o trânsito.",
      },
      {
        id: "lib-06b",
        title: "Acampamento de protesto em uma praça",
        situation:
          "Um grupo monta barracas em uma praça central para protestar contra uma decisão do governo e anuncia que ficará ali por duas semanas, sem violência. Comerciantes vizinhos reclamam da perda de clientes.",
        statement: "O acampamento deve ser permitido durante o protesto, mesmo com os transtornos para o comércio.",
      },
    ],
  },
  {
    slot: "lib-07",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-07",
        title: "Remoção rápida de informação falsa em emergência",
        situation: "Durante uma emergência de saúde, o governo propõe que as plataformas digitais removam rapidamente publicações que um órgão público classificar como falsas.",
        statement: "Eu apoiaria a remoção rápida dessas publicações durante a emergência.",
      },
      {
        id: "lib-07b",
        title: "Suspensão de perfis que espalham boatos em um desastre",
        situation:
          "Durante uma enchente, circulam mensagens falsas sobre o rompimento de uma barragem, causando pânico. A Defesa Civil propõe que as plataformas suspendam, por alguns dias, os perfis que mais compartilharem esse conteúdo.",
        statement: "Eu apoiaria a suspensão temporária desses perfis durante a emergência.",
      },
    ],
  },
  {
    slot: "lib-08",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-08",
        title: "Recusa de tratamento médico por adulto",
        situation: "Uma pessoa adulta e consciente quer recusar um tratamento médico por motivos pessoais. Ela foi informada dos riscos para a própria saúde.",
        statement: "A decisão dessa pessoa deve ser respeitada, mesmo que a equipe médica discorde.",
      },
      {
        id: "lib-08b",
        title: "Saltos em cachoeira proibidos após acidentes",
        situation:
          "Uma cidade proíbe os saltos de uma pedra em uma cachoeira, comuns entre os visitantes, depois de acidentes graves. Moradores adultos dizem que conhecem os riscos e querem continuar saltando.",
        statement: "Adultos informados dos riscos deveriam poder continuar saltando, mesmo depois dos acidentes.",
      },
    ],
  },
  {
    slot: "lib-09",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-09",
        title: "Penas maiores para furtos repetidos",
        situation: "Uma proposta aumenta as penas de prisão para pessoas que cometem furtos repetidas vezes.",
        statement: "Eu apoiaria penas maiores para quem comete furtos repetidamente.",
      },
      {
        id: "lib-09b",
        title: "Mais tempo em regime fechado para condenados por roubo",
        situation:
          "Condenados por roubo podem passar do regime fechado para o semiaberto depois de cumprir uma parte da pena. Uma proposta aumenta essa parte, para que fiquem mais tempo no regime fechado.",
        statement: "Eu apoiaria aumentar o tempo em regime fechado para esses condenados.",
      },
    ],
  },
  {
    slot: "lib-10",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-10",
        title: "Dados de localização compartilhados com a polícia",
        situation:
          "O aplicativo do transporte público de uma cidade registra a localização dos passageiros. A prefeitura quer usar esses dados para planejar linhas e também entregá-los à polícia quando ela pedir.",
        statement: "A entrega desses dados à polícia deveria exigir uma ordem judicial em cada caso.",
      },
      {
        id: "lib-10b",
        title: "Dados de pacientes acessados pela polícia",
        situation: "Uma secretaria estadual de saúde quer dar à polícia acesso direto ao cadastro de pacientes da rede pública, para ajudar a localizar pessoas procuradas.",
        statement: "O acesso da polícia a esses dados deveria depender de ordem judicial em cada caso.",
      },
    ],
  },

  // Bloco 3 — Costumes, tradição e mudança social
  {
    slot: "cos-01",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-01",
        title: "Diferentes formatos de família nas aulas",
        situation:
          "Uma escola pública propõe incluir, nas aulas sobre convivência, conteúdos sobre diferentes formatos de família, como famílias com avós responsáveis, com um só responsável ou com dois pais ou duas mães.",
        statement: "Eu apoiaria incluir esse conteúdo nas aulas.",
      },
      {
        id: "cos-01b",
        title: "Diferentes tipos de família em campanha de adoção",
        situation:
          "Uma prefeitura prepara uma campanha para incentivar a adoção de crianças e quer mostrar diferentes tipos de família, incluindo pessoas solteiras e casais do mesmo sexo.",
        statement: "Eu apoiaria mostrar esses diferentes tipos de família na campanha.",
      },
    ],
  },
  {
    slot: "cos-02",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-02",
        title: "Símbolos religiosos em prédios públicos",
        situation:
          "Em um município, alguns prédios públicos exibem há décadas símbolos de uma religião, como crucifixos. Um grupo pede a retirada; outro defende que fazem parte da tradição local.",
        statement: "Os símbolos deveriam permanecer, por fazerem parte da tradição local.",
      },
      {
        id: "cos-02b",
        title: "Oração no início das sessões da Câmara",
        situation:
          "Há décadas, as sessões da Câmara Municipal de uma cidade começam com uma oração cristã. Alguns vereadores propõem trocá-la por um minuto de silêncio; outros defendem manter a tradição.",
        statement: "A oração deveria ser mantida, por fazer parte da tradição da Câmara.",
      },
    ],
  },
  {
    slot: "cos-03",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-03",
        title: "Dispensa de aulas por motivos religiosos",
        situation:
          "Uma família pede que a escola dispense o filho de algumas aulas cujos temas contrariam os valores religiosos da família. A escola considera esses conteúdos parte do currículo.",
        statement: "A escola deveria permitir essa dispensa.",
      },
      {
        id: "cos-03b",
        title: "Educação dos filhos em casa",
        situation:
          "Uma família quer educar os filhos em casa, em vez de matriculá-los em uma escola, para transmitir seus próprios valores. Uma proposta permitiria essa opção, com provas anuais para acompanhar o aprendizado.",
        statement: "As famílias deveriam poder educar os filhos em casa, com essas provas anuais.",
      },
    ],
  },
  {
    slot: "cos-04",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-04",
        title: "Licença igual para pais e mães",
        situation:
          "Uma empresa pública propõe que pais tenham licença de quatro meses após o nascimento ou a adoção de um filho, igual à das mães, para incentivar a divisão dos cuidados.",
        statement: "Eu apoiaria a licença igual para pais e mães.",
      },
      {
        id: "cos-04b",
        title: "Mulheres na direção de empresas públicas",
        situation:
          "Nas empresas públicas de um estado, poucas mulheres ocupam cargos de direção. Uma proposta exige que pelo menos um terço desses cargos seja ocupado por mulheres.",
        statement: "Eu apoiaria essa exigência.",
      },
    ],
  },
  {
    slot: "cos-05",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-05",
        title: "Apoio público a uma festa religiosa tradicional",
        situation:
          "Uma festa religiosa tradicional recebe recursos da prefeitura há décadas. Uma proposta corta esse apoio por se tratar de evento ligado a uma religião específica.",
        statement: "A prefeitura deveria continuar apoiando a festa, por fazer parte da tradição local.",
      },
      {
        id: "cos-05b",
        title: "Feriado do padroeiro da cidade",
        situation:
          "Uma cidade tem um feriado em homenagem ao santo padroeiro. Uma proposta troca o feriado por uma data comemorativa sem folga, argumentando que o Estado é laico e que o comércio perde vendas.",
        statement: "O feriado do padroeiro deveria ser mantido, por fazer parte da tradição da cidade.",
      },
    ],
  },
  {
    slot: "cos-06",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-06",
        title: "Nome social na lista de chamada",
        situation: "Um estudante pede à escola para ser chamado pelo nome social — o nome com que se identifica — nas listas de chamada, com autorização dos responsáveis.",
        statement: "A escola deveria atender ao pedido.",
      },
      {
        id: "cos-06b",
        title: "Nome social no crachá do trabalho",
        situation: "Uma funcionária de uma empresa pública pede para usar o nome social — o nome com que se identifica — no crachá e no e-mail de trabalho.",
        statement: "A empresa deveria atender ao pedido.",
      },
    ],
  },
  {
    slot: "cos-07",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-07",
        title: "Prioridade à família formada por pai, mãe e filhos",
        situation: "Uma proposta de lei estabelece como prioridade das políticas sociais o fortalecimento do casamento e da família formada por pai, mãe e filhos.",
        statement: "Eu apoiaria essa prioridade nas políticas sociais.",
      },
      {
        id: "cos-07b",
        title: "Programa público para fortalecer casamentos",
        situation: "Uma prefeitura quer criar cursos e atendimento para casais, com o objetivo de reduzir os divórcios e fortalecer o casamento.",
        statement: "Eu apoiaria usar recursos públicos nesse programa.",
      },
    ],
  },
  {
    slot: "cos-08",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-08",
        title: "Revisão de textos sobre figuras históricas",
        situation:
          "Um museu da cidade quer revisar placas que apresentam algumas figuras históricas apenas como heróis, acrescentando informações sobre a participação delas na escravidão e em episódios de violência.",
        statement: "Eu apoiaria a revisão dos textos do museu.",
      },
      {
        id: "cos-08b",
        title: "Troca do nome de uma rua ligada à escravidão",
        situation:
          "Uma rua central tem o nome de um político do século XIX que comercializava pessoas escravizadas. Moradores propõem dar à rua o nome de uma educadora negra da cidade; outros dizem que o nome atual faz parte da história local.",
        statement: "Eu apoiaria trocar o nome da rua.",
      },
    ],
  },
  {
    slot: "cos-09",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-09",
        title: "Educação sexual só no ensino médio e com autorização",
        situation:
          "Pais e professores discutem quando tratar de educação sexual na escola. Uma proposta deixa o tema apenas para o ensino médio e somente para estudantes com autorização dos responsáveis.",
        statement: "Eu apoiaria essa regra.",
      },
      {
        id: "cos-09b",
        title: "Cenas de nudez na TV aberta só depois das 23h",
        situation:
          "Uma proposta proíbe que a TV aberta exiba cenas de nudez e de uso de drogas antes das 23h, para proteger crianças e adolescentes. As emissoras dizem que já informam a classificação indicativa de cada programa.",
        statement: "Eu apoiaria essa proibição.",
      },
    ],
  },
  {
    slot: "cos-10",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-10",
        title: "Uniforme escolar à escolha de cada estudante",
        situation:
          "Uma escola tem uniformes diferentes por gênero: saia para meninas e calça para meninos. A direção propõe que cada estudante escolha entre as peças disponíveis.",
        statement: "Eu apoiaria deixar a escolha do uniforme para cada estudante.",
      },
      {
        id: "cos-10b",
        title: "Brinquedos sem divisão entre meninos e meninas",
        situation:
          "Uma escola de educação infantil decide não separar brinquedos e atividades em “de menino” e “de menina”. Parte das famílias concorda; outra parte prefere a separação.",
        statement: "Eu apoiaria essa decisão da escola.",
      },
    ],
  },

  // Bloco 4 — Participação política e organização do poder
  {
    slot: "par-01",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-01",
        title: "Moradores decidem parte do orçamento",
        situation: "Uma prefeitura propõe que os moradores decidam diretamente, em assembleias por bairro, como usar uma parte do orçamento de obras.",
        statement: "Eu apoiaria que os moradores decidissem diretamente essa parte do orçamento.",
      },
      {
        id: "par-01b",
        title: "Votação pela internet para escolher obras",
        situation: "Um governo estadual propõe que os moradores de cada região escolham, em votação pela internet, quais obras serão feitas com uma parte do orçamento.",
        statement: "Eu apoiaria que os moradores escolhessem essas obras por votação direta.",
      },
    ],
  },
  {
    slot: "par-02",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-02",
        title: "Decisões técnicas protegidas de pressões políticas",
        situation:
          "Algumas decisões, como a definição da taxa básica de juros, ficam com uma equipe técnica que tem mandato fixo e não pode ser demitida a qualquer momento pelo governo.",
        statement: "Eu prefiro que decisões desse tipo fiquem com equipes técnicas protegidas de pressões políticas.",
      },
      {
        id: "par-02b",
        title: "Diretores de escola escolhidos por seleção técnica",
        situation:
          "Os diretores das escolas estaduais podem ser escolhidos por uma seleção técnica, com prova e análise de currículo, ou por eleição entre professores, funcionários, estudantes e famílias.",
        statement: "Os diretores deveriam ser escolhidos pela seleção técnica, e não por eleição na comunidade escolar.",
      },
    ],
  },
  {
    slot: "par-03",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-03",
        title: "Votação para retirar um prefeito do cargo",
        situation: "Uma proposta permite que eleitores convoquem, com assinaturas, uma nova votação para decidir se um prefeito deve deixar o cargo antes do fim do mandato.",
        statement: "Eu apoiaria criar essa possibilidade.",
      },
      {
        id: "par-03b",
        title: "Votação para revogar uma lei municipal",
        situation: "Uma proposta permite que eleitores convoquem, com assinaturas, uma votação para decidir se uma lei aprovada pela Câmara Municipal deve ser revogada.",
        statement: "Eu apoiaria que os eleitores pudessem convocar essa votação para revogar leis municipais.",
      },
    ],
  },
  {
    slot: "par-04",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-04",
        title: "Reforma complexa decidida pelo Congresso",
        situation: "O governo quer mudar as regras da aposentadoria. Uma opção é deixar a decisão para o Congresso; outra é convocar um plebiscito para que os eleitores decidam.",
        statement: "Mudanças complexas como essa devem ser decididas pelos representantes eleitos, e não por plebiscito.",
      },
      {
        id: "par-04b",
        title: "Plano diretor decidido pela Câmara",
        situation:
          "O plano diretor, que define onde e como a cidade pode crescer, tem centenas de regras. Uma opção é aprová-lo na Câmara Municipal, depois de audiências públicas; outra é submeter os pontos principais a uma consulta popular.",
        statement: "O plano diretor deve ser decidido pela Câmara, depois das audiências, sem consulta popular.",
      },
    ],
  },
  {
    slot: "par-05",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-05",
        title: "Gestão de escolas e postos de saúde pelos municípios",
        situation: "Um estado propõe transferir aos municípios a gestão de escolas e postos de saúde que hoje administra, junto com os recursos correspondentes.",
        statement: "Eu apoiaria transferir essa gestão para os municípios.",
      },
      {
        id: "par-05b",
        title: "Subprefeituras com orçamento próprio",
        situation:
          "Em uma cidade grande, as decisões sobre limpeza, praças e pequenas obras ficam concentradas na sede da prefeitura. Uma proposta cria subprefeituras regionais com orçamento próprio para cuidar desses serviços.",
        statement: "Eu apoiaria criar as subprefeituras com orçamento próprio.",
      },
    ],
  },
  {
    slot: "par-06",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-06",
        title: "Desempenho mínimo para partidos",
        situation:
          "Partidos precisam de um desempenho mínimo nas eleições para ter acesso a recursos públicos e a tempo de propaganda. Essa exigência reduz o número de partidos, mas dificulta a vida dos menores.",
        statement: "Eu concordo com essa exigência, mesmo que ela dificulte a continuidade de partidos pequenos.",
      },
      {
        id: "par-06b",
        title: "Mais assinaturas para criar partidos",
        situation:
          "Para criar um partido, é preciso reunir assinaturas de eleitores em vários estados. Uma proposta aumenta esse número mínimo, para reduzir a quantidade de partidos.",
        statement: "Eu apoiaria aumentar a exigência, mesmo que fique mais difícil criar partidos novos.",
      },
    ],
  },
  {
    slot: "par-07",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-07",
        title: "Poder de veto para conselho de saúde",
        situation: "Um conselho municipal de saúde, formado por usuários, trabalhadores e gestores, quer ter poder de veto sobre algumas decisões da secretaria de saúde.",
        statement: "Eu apoiaria dar esse poder de veto ao conselho.",
      },
      {
        id: "par-07b",
        title: "Conselhos escolares decidem a verba de manutenção",
        situation:
          "Uma rede estadual de ensino propõe que os conselhos escolares, formados por famílias, estudantes, professores e funcionários, decidam como gastar a verba de manutenção de cada escola, hoje definida pela secretaria.",
        statement: "Eu apoiaria dar essa decisão aos conselhos escolares.",
      },
    ],
  },
  {
    slot: "par-08",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-08",
        title: "Tribunais podem anular leis",
        situation: "Um tribunal pode anular uma lei aprovada pelo Legislativo quando considera que ela contraria a Constituição.",
        statement: "É importante que os tribunais tenham esse poder, mesmo quando a maioria dos parlamentares discorda.",
      },
      {
        id: "par-08b",
        title: "Tribunal de contas pode suspender obras",
        situation: "Um tribunal de contas suspende uma obra aprovada pelo governo e pela Assembleia Legislativa, por indícios de superfaturamento, até que a análise termine.",
        statement: "É importante que o tribunal de contas possa suspender a obra, mesmo contra a decisão do governo e dos deputados.",
      },
    ],
  },
  {
    slot: "par-09",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-09",
        title: "Prazo para votar projetos de iniciativa popular",
        situation: "Cidadãos podem apresentar projetos de lei com assinaturas, mas o Legislativo não tem prazo para votá-los. Uma proposta obriga a votação em até seis meses.",
        statement: "Eu apoiaria esse prazo obrigatório.",
      },
      {
        id: "par-09b",
        title: "Debate obrigatório das petições dos moradores",
        situation:
          "Uma Câmara Municipal recebe petições dos moradores pela internet, mas não é obrigada a analisá-las. Uma proposta obriga os vereadores a debater em plenário toda petição que reunir 5 mil assinaturas.",
        statement: "Eu apoiaria essa obrigação.",
      },
    ],
  },
  {
    slot: "par-10",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-10",
        title: "Linhas de ônibus decididas por órgãos técnicos e Câmara",
        situation:
          "Em uma cidade, mudanças nas linhas de ônibus são decididas pela Câmara Municipal e por órgãos técnicos, a partir de estudos. Um grupo pede consulta popular a cada mudança.",
        statement: "As mudanças devem continuar sendo decididas pela Câmara e pelos órgãos técnicos, sem consulta popular a cada caso.",
      },
      {
        id: "par-10b",
        title: "Local de hospital escolhido por técnicos",
        situation:
          "Um estado vai construir um hospital regional. A secretaria de saúde escolheu o local com base em estudos de acesso e de demanda; um grupo de moradores quer que a escolha seja feita por votação nas cidades da região.",
        statement: "A escolha deve ficar com a secretaria, a partir dos estudos, sem votação.",
      },
    ],
  },

  // Bloco 5 — Desenvolvimento e prioridades socioambientais
  {
    slot: "soc-01",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-01",
        title: "Mina com controles de contaminação",
        situation:
          "Uma mineradora quer abrir uma mina perto de uma pequena cidade, com promessa de empregos e arrecadação. Estudos indicam risco de contaminação de um rio, que pode ser reduzido com controles.",
        statement: "Eu apoiaria a abertura da mina com os controles propostos.",
      },
      {
        id: "soc-01b",
        title: "Fábrica de celulose que usa a água de um rio",
        situation:
          "Uma empresa quer instalar uma fábrica de papel e celulose em uma cidade pequena, com centenas de empregos. A fábrica usaria muita água de um rio que também abastece agricultores da região; a empresa promete tratar a água e devolvê-la ao rio.",
        statement: "Eu apoiaria a instalação da fábrica com essas condições.",
      },
    ],
  },
  {
    slot: "soc-02",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-02",
        title: "Ampliação de área de proteção ambiental",
        situation: "Um município pode ampliar uma área de proteção ambiental. A medida limitaria a expansão de lavouras e de novos loteamentos na região.",
        statement: "Eu apoiaria ampliar a área de proteção.",
      },
      {
        id: "soc-02b",
        title: "Proibição de construções em área de manguezal",
        situation:
          "Uma cidade litorânea pode proibir novas construções em uma área de manguezal. A medida impediria a instalação de uma marina e de um hotel que gerariam empregos.",
        statement: "Eu apoiaria proibir as novas construções no manguezal.",
      },
    ],
  },
  {
    slot: "soc-03",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-03",
        title: "Licenciamento mais rápido para obras estratégicas",
        situation: "O licenciamento ambiental de obras como estradas e portos pode levar anos. Uma proposta reduz prazos e etapas de análise para obras consideradas estratégicas.",
        statement: "Eu apoiaria simplificar o licenciamento dessas obras, mesmo com menos etapas de análise.",
      },
      {
        id: "soc-03b",
        title: "Licença ambiental por autodeclaração",
        situation:
          "Uma proposta permite que empreendimentos de médio porte, como granjas e pequenas indústrias, obtenham licença ambiental com uma declaração do próprio empresário, sem análise prévia do órgão ambiental. A fiscalização seria feita depois.",
        statement: "Eu apoiaria a licença por autodeclaração, mesmo sem a análise prévia.",
      },
    ],
  },
  {
    slot: "soc-04",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-04",
        title: "Demarcação de terra indígena com indenização",
        situation:
          "Estudos oficiais reconhecem que uma área hoje ocupada por fazendas produtivas é de ocupação tradicional de uma comunidade indígena. A demarcação exigiria a saída dos fazendeiros, com indenização.",
        statement: "Eu apoiaria a demarcação da área, com indenização aos fazendeiros.",
      },
      {
        id: "soc-04b",
        title: "Titulação de território quilombola com indenização",
        situation:
          "Estudos oficiais reconhecem que uma comunidade quilombola vive há gerações em uma área hoje usada em parte por uma empresa de reflorestamento. A titulação do território exigiria a saída da empresa, com indenização.",
        statement: "Eu apoiaria a titulação do território para a comunidade, com indenização à empresa.",
      },
    ],
  },
  {
    slot: "soc-05",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-05",
        title: "Exploração de petróleo perto de região sensível",
        situation: "Foi encontrado petróleo no mar perto de uma região ambientalmente sensível. A exploração pode gerar receitas públicas e empregos, mas há risco de vazamentos.",
        statement: "Eu apoiaria a exploração com regras de segurança, por causa das receitas e dos empregos.",
      },
      {
        id: "soc-05b",
        title: "Ampliação de porto perto de recifes de coral",
        situation:
          "Um estado quer ampliar um porto para exportar mais grãos, o que geraria empregos e arrecadação. A obra exigiria dragar uma área próxima a recifes de coral usados pela pesca artesanal.",
        statement: "Eu apoiaria a ampliação do porto, com medidas de compensação ambiental.",
      },
    ],
  },
  {
    slot: "soc-06",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-06",
        title: "Tributo sobre combustíveis fósseis",
        situation: "Uma proposta cria um tributo sobre combustíveis fósseis para financiar transporte público e energia de fontes renováveis. O preço da gasolina aumentaria.",
        statement: "Eu apoiaria o tributo, mesmo com o aumento do preço da gasolina.",
      },
      {
        id: "soc-06b",
        title: "Taxa para carros no centro nos horários de pico",
        situation:
          "Uma cidade grande propõe cobrar uma taxa diária dos carros que entram no centro nos horários de pico, para reduzir a poluição e financiar ônibus. Quem depende do carro para trabalhar teria um gasto extra.",
        statement: "Eu apoiaria a taxa, mesmo com o gasto extra para quem usa carro.",
      },
    ],
  },
  {
    slot: "soc-07",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-07",
        title: "Hidrelétrica que alaga área de floresta",
        situation:
          "Para baratear a energia, o governo pode construir uma hidrelétrica que alagaria uma área de floresta e exigiria a mudança de famílias ribeirinhas para outro local.",
        statement: "Eu apoiaria a construção da hidrelétrica, com indenização às famílias.",
      },
      {
        id: "soc-07b",
        title: "Parque eólico em dunas usadas por pescadores",
        situation:
          "Uma empresa quer instalar um parque de energia eólica em dunas onde vivem comunidades de pescadores. A energia é renovável e geraria arrecadação, mas as comunidades perderiam o acesso a parte do território.",
        statement: "Eu apoiaria a instalação do parque, com compensações às comunidades.",
      },
    ],
  },
  {
    slot: "soc-08",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-08",
        title: "Proibição de sacolas plásticas descartáveis",
        situation: "Uma cidade quer proibir sacolas plásticas descartáveis nos supermercados. Comerciantes e consumidores teriam custos com alternativas.",
        statement: "Eu apoiaria a proibição.",
      },
      {
        id: "soc-08b",
        title: "Separação obrigatória do lixo reciclável",
        situation: "Uma cidade quer obrigar os moradores a separar o lixo reciclável, com multa para quem continuar sem separar depois de receber avisos.",
        statement: "Eu apoiaria a obrigação, com multa depois dos avisos.",
      },
    ],
  },
  {
    slot: "soc-09",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-09",
        title: "Prazo máximo para análise de novos agrotóxicos",
        situation: "Produtores rurais pedem prazos máximos para que os órgãos responsáveis analisem pedidos de autorização de novos agrotóxicos, hoje sem prazo definido.",
        statement: "Eu apoiaria prazos máximos para essa análise, para que os produtores tenham acesso mais rápido a novos produtos.",
      },
      {
        id: "soc-09b",
        title: "Pulverização aérea de agrotóxicos perto de comunidades",
        situation:
          "Um estado proíbe a pulverização de agrotóxicos por aviões perto de comunidades e de rios. Produtores pedem que a aplicação seja liberada com distâncias mínimas menores, por ser mais barata e rápida.",
        statement: "Eu apoiaria liberar a pulverização aérea com distâncias menores, para reduzir os custos da produção.",
      },
    ],
  },
  {
    slot: "soc-10",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-10",
        title: "Reaproveitamento de água e áreas verdes em prédios novos",
        situation: "Um município pode exigir que novos prédios tenham sistemas de reaproveitamento de água da chuva e áreas verdes. A exigência encarece a construção.",
        statement: "Eu apoiaria a exigência, mesmo encarecendo os imóveis novos.",
      },
      {
        id: "soc-10b",
        title: "Mais áreas verdes em novos loteamentos",
        situation:
          "Um município pode exigir que novos loteamentos reservem mais espaço para árvores e para solo que absorve a água da chuva, o que reduz enchentes. A exigência diminui o número de lotes à venda e encarece cada um.",
        statement: "Eu apoiaria a exigência, mesmo encarecendo os lotes.",
      },
    ],
  },
];

export const QUESTIONS: Question[] = QUESTION_SLOTS.flatMap(({ versions, ...slot }) => versions.map((version) => ({ ...version, ...slot })));

export const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

// Attempts saved before the draw existed have no ids: they used the first
// version of every theme, in this order.
const FIRST_VERSION_IDS = QUESTION_SLOTS.map((slot) => slot.versions[0].id);

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Situations of a new attempt: one version of every theme, drawn at random, with
 * the blocks in their fixed order and the situations of each block shuffled.
 */
export function drawQuestionIds(random: () => number = Math.random): string[] {
  return DIMENSIONS.flatMap((dimension) =>
    shuffle(
      QUESTION_SLOTS.filter((slot) => slot.dimension === dimension.key).map((slot) => slot.versions[Math.floor(random() * slot.versions.length)].id),
      random,
    ),
  );
}

/** Ids shown in an attempt, in order (attempts saved before the draw used the first versions). */
export function attemptQuestionIds(questionIds: string[]): string[] {
  return questionIds.length ? questionIds : FIRST_VERSION_IDS;
}

/** Questions of an attempt, in order; null when one of them is no longer in the bank. */
export function attemptQuestions(questionIds: string[]): Question[] | null {
  const questions = attemptQuestionIds(questionIds).map((id) => QUESTION_BY_ID.get(id));
  return questions.every((question): question is Question => question !== undefined) ? questions : null;
}
