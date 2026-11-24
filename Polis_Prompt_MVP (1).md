# Polis — prompt para desenvolvimento do MVP

Atue como uma pessoa desenvolvedora full stack sênior, com experiência em arquitetura pragmática, segurança da informação, UX mobile e produtos educacionais. Planeje e implemente o MVP funcional da **Polis**, uma plataforma web de educação política para pessoas sem conhecimento prévio sobre o assunto.

Priorize clareza pedagógica, pluralidade de perspectivas, fontes oficiais de acesso público, segurança e uma experiência agradável no celular. Tome decisões técnicas proporcionais ao MVP e justifique brevemente as escolhas relevantes. O resultado deve funcionar de ponta a ponta, com persistência real e integração com a OpenAI; não se limite a telas ilustrativas.

## 1. Proposta e princípios do produto

A Polis deve ajudar jovens e adultos a compreender política, instituições, ideias, filosofias, correntes e acontecimentos brasileiros, conectando conceitos às suas consequências na vida cotidiana.

A experiência começa com a criação de conta e um questionário de 50 perguntas situacionais. O resultado apresenta afinidades políticas aproximadas e orienta a ordem de uma trilha de aprendizado interativa. A trilha parte de temas familiares à pessoa e amplia progressivamente o contato com perspectivas diferentes.

Durante o aprendizado, a pessoa também pode acompanhar acontecimentos da política brasileira, entender seus possíveis impactos e participar de fóruns sobre eventos e ideias.

Princípios obrigatórios:

- Desenvolver compreensão e autonomia intelectual, sem direcionar voto, filiação partidária ou adesão a uma corrente.
- Personalizar a sequência de aprendizado, mantendo a mesma qualidade de explicação e os mesmos critérios de evidência para todos.
- Apresentar argumentos, críticas, divergências internas e limites das principais perspectivas, sem caricaturas.
- Distinguir fatos verificáveis, declarações de atores, interpretações e projeções. Pluralidade não significa dar o mesmo peso a alegações com evidências diferentes.
- Usar português brasileiro claro. Explicar qualquer termo técnico na primeira ocorrência, com exemplos cotidianos.
- Usar o nome Polis e textos funcionais. Não incluir slogans, jargões de marketing, promessas grandiosas ou textos genéricos de startup.

### Guardrails de explicação e autonomia

**A IA deve sempre explicar, nunca conduzir o usuário a uma opinião ou enviesá-lo. Essa regra vale para o questionário, a pedagogia, as dúvidas, os acontecimentos reais e a apresentação de seus impactos.**

- Explicar conceitos, evidências, argumentos, críticas e consequências sem dizer qual opinião a pessoa deve adotar.
- Não persuadir a favor ou contra partido, candidato, movimento ou corrente; não sugerir voto, filiação ou mudança de posição, mesmo que o usuário peça uma recomendação. Oferecer comparação descritiva e critérios explícitos de análise.
- Não usar afinidades políticas, dificuldades, dúvidas ou emoções como instrumentos de convencimento. O perfil só pode ordenar os estudos; ele não deve mudar os fatos, os argumentos apresentados ou a linguagem para persuadir.
- Usar os mesmos critérios de evidência e o mesmo cuidado descritivo para diferentes correntes. Evitar elogios ou adjetivos depreciativos, perguntas sugestivas, títulos sensacionalistas e omissões que favoreçam uma conclusão.
- Explicitar escolhas de recorte, pressupostos e divergências. Uma afirmação falsa pode ser corrigida com evidência; pluralidade não exige equivalência artificial entre alegações.
- Diferenciar o que uma fonte registra do que ela apenas alega, defende ou projeta. Uma publicação oficial também pode apresentar a posição de seu autor ou órgão.
- Relacionar ideias a decisões concretas com justificativa e contexto, sem atribuir automaticamente uma ideologia a toda pessoa, partido ou ação.
- Em exercícios, avaliar compreensão de fatos e conceitos, sem tratar preferência política ou juízo de valor como resposta certa. No diagnóstico, não elogiar nem punir respostas.
- Quando faltar suporte documental, assumir a lacuna. Não criar uma explicação convincente apenas para completar a resposta.

Não prometer ausência absoluta de viés como uma propriedade garantida do modelo. Implementar esses limites como requisitos verificáveis: fontes aprovadas, instruções consistentes, revisão editorial e uma pequena bateria de avaliações de comportamento descrita nos critérios de conclusão.

## 2. Escopo do MVP

Implemente apenas estes núcleos:

1. Conta e privacidade.
2. Questionário e mapa de afinidades políticas.
3. Trilha educacional com gamificação simples.
4. Acontecimentos brasileiros explicados com apoio de IA e fontes.
5. Fóruns de discussão e acompanhamento de fóruns.
6. Administração mínima de conteúdo e moderação.

Não implementar inicialmente: MFA, aplicativo nativo, pagamentos, assinaturas, mensagens privadas, chat em tempo real, notificações push, ranking público, rede social completa, infraestrutura de microsserviços ou coleta automática massiva de notícias.

## 3. Jornada principal

Fluxo esperado:

1. Acessar uma apresentação breve e objetiva da plataforma.
2. Criar conta com nome de exibição, e-mail e senha.
3. Entender a finalidade e as limitações do questionário e escolher se autoriza o tratamento das respostas e do resultado.
4. Responder às 50 situações, com progresso salvo e possibilidade de continuar depois.
5. Receber um resultado explicado e conhecer a trilha sugerida.
6. Concluir uma introdução comum aos fundamentos políticos e seguir para os temas de maior familiaridade.
7. Avançar para outras perspectivas, comparar ideias e relacioná-las a acontecimentos.
8. Participar de fóruns e acompanhar as discussões de interesse.

Permita adiar o questionário ou recusar essa personalização e usar uma trilha geral. O questionário deve ser o caminho recomendado, com sua finalidade claramente explicada, sem impedir o acesso ao conteúdo educativo.

## 4. Conta e privacidade

- Cadastro, login, logout, recuperação de senha e edição do nome de exibição e da senha.
- Usar e-mail verificado antes de permitir publicações nos fóruns.
- Exibir publicamente apenas o nome de exibição e o conteúdo que a pessoa decidir publicar.
- Manter respostas, afinidades e histórico do questionário privados. Não criar distintivos políticos públicos.
- Permitir exportar dados pessoais, apagar os dados do questionário e solicitar a exclusão da conta por um fluxo funcional.
- Separar o consentimento do questionário do aceite geral dos termos; registrar finalidade, versão e data, e permitir revogação.
- Tratar as respostas e inferências de opinião política como dados sensíveis. Coletar somente o necessário e documentar retenção e exclusão.
- Ao excluir uma conta, eliminar respostas e resultados e remover ou anonimizar sua autoria pública conforme uma política clara apresentada ao usuário.
- Não enviar e-mail, identificadores de conta, respostas do teste ou mapa de afinidades à OpenAI. A ordenação da trilha deve ser calculada internamente.

## 5. Questionário de 50 perguntas

Crie um banco fixo, versionado, com **exatamente 50 perguntas situacionais completas**, sem placeholders. As perguntas devem abordar decisões e conflitos de valores compreensíveis sem conhecimento político prévio.

Distribua 10 perguntas em cada dimensão inicial:

- Economia, mercado e redistribuição.
- Liberdades civis e exercício da autoridade.
- Costumes, tradição e mudança social.
- Participação política e organização do poder.
- Desenvolvimento e prioridades socioambientais.

Essas dimensões são uma modelagem inicial do produto, não uma classificação científica definitiva. Explique sobreposições e limitações.

Requisitos das perguntas:

- Apresentar uma situação e uma decisão central por vez, com contexto suficiente para responder.
- Evitar linguagem tendenciosa, premissas falsas, estereótipos e alternativas em que uma resposta pareça moralmente obrigatória.
- Equilibrar a direção das formulações para reduzir respostas automáticas de concordância.
- Evitar nomes de partidos e candidatos como atalhos para classificar a pessoa.
- Oferecer uma escala de concordância consistente e a opção separada “Não sei / preciso entender melhor”. Essa opção não deve ser contabilizada como posição neutra.
- Permitir voltar, revisar, pausar e retomar, com salvamento no servidor e indicação do estado de salvamento.
- Organizar a experiência em cinco blocos de dez perguntas, sem apresentar uma página longa com todos os itens.

Pontuação e resultado:

- Implementar cálculo determinístico e testável, com pesos, normalização e regras documentados e versionados. A IA não deve decidir a classificação.
- Definir perfis de referência para as correntes abordadas, com justificativas editoriais apoiadas em fontes oficiais aprovadas. Documentar a interpretação usada nas posições e no cálculo de afinidade, sem apresentar esse modelo como um teste oficialmente validado.
- Explicar a contribuição das respostas para cada dimensão e como as afinidades foram obtidas.
- Apresentar dimensões separadas, aproximações com mais de uma corrente e possíveis tensões entre respostas. Não reduzir tudo a uma linha esquerda–direita.
- Tratar empates, resultados mistos e quantidade insuficiente de respostas. Documentar o mínimo de respostas válidas por dimensão.
- Não apresentar índices de afinidade como probabilidades, precisão científica ou um diagnóstico definitivo da identidade política.
- Usar textos como “Suas respostas se aproximam de...” e “Você apresentou posições diferentes nestes temas...”.
- Permitir refazer o teste e substituir o resultado ativo sem acumular histórico sensível desnecessário.
- Não inferir mudanças ideológicas a partir de cliques, leituras, desempenho em quizzes ou participação nos fóruns.

## 6. Trilha educacional e gamificação

Implemente uma trilha com módulos, lições curtas, exemplos, comparações e pequenos exercícios. Uma lição deve caber em aproximadamente três a sete minutos de leitura e interação.

Inclua:

- Fundamentos: política, Estado, governo, democracia, cidadania, Constituição e direitos.
- Instituições brasileiras: Executivo, Legislativo e Judiciário; União, estados e municípios; eleições, representação e funcionamento básico dos partidos.
- Conceitos econômicos e sociais usados no debate político, com definições acessíveis.
- Principais correntes, incluindo liberalismos, conservadorismos, social-democracia, socialismos, comunismo, anarquismos e libertarianismos, explicando suas diferenças e variações.
- Temas transversais, como progressismo, ambientalismo, nacionalismo e populismo, deixando claro quando se trata de uma corrente, movimento, tema ou forma de atuação política.
- História política brasileira como contexto para compreender debates atuais.
- Leitura crítica: evidência, opinião, desinformação, correlação e causalidade.

Não prometa cobrir toda a filosofia política no MVP. Defina uma seleção inicial coerente, com possibilidades de expansão.

Cada lição deve conter: objetivo, explicação simples, exemplo concreto, conceitos relacionados, fontes oficiais aprovadas e uma verificação de compreensão com explicação da resposta. Definições, descrições das correntes e conteúdos históricos também precisam de sustentação nesse acervo; o conhecimento prévio do modelo não substitui referências.

A introdução aos fundamentos deve ser comum. Depois dela, um algoritmo simples ordena os módulos de afinidade e, em seguida, inclui perspectivas diferentes e comparações. Mantenha o catálogo acessível para navegação livre; o resultado do teste não pode esconder correntes ou filtrar fatos.

Gamificação essencial:

- Progresso por módulo, XP por aprendizado e poucas conquistas por conclusão.
- Feedback explicativo e possibilidade de tentar novamente.
- Recompensar compreensão e continuidade, sem premiar concordância ideológica ou frequência de publicações.
- Garantir que repetir uma requisição não duplique XP ou conclusão de lição.
- Não usar perda punitiva de progresso, pressão emocional ou competição política.

## 7. Acontecimentos da política brasileira

Crie uma área de acontecimentos com ordenação cronológica, filtros por tema e ligação com os conceitos da trilha.

Cada acontecimento deve apresentar:

1. O que aconteceu, em linguagem direta.
2. Data do acontecimento, data da publicação e última atualização.
3. Contexto e atores envolvidos.
4. Situação atual: por exemplo, proposta apresentada, em discussão, aprovada, sancionada ou em vigor, quando aplicável.
5. Instituições responsáveis e seus limites de atuação.
6. Conceitos e correntes relacionados, com explicação da relação.
7. Impactos observados e possíveis impactos em grupos ou setores relevantes, como trabalhadores, empresas, serviços públicos e regiões.
8. Argumentos e interpretações relevantes, com atribuição aos respectivos atores ou perspectivas.
9. Incertezas, condições necessárias e pontos ainda em disputa.
10. Fontes acessíveis e links para lições e discussões relacionadas.

Para cada impacto, explicar o mecanismo: **decisão → mudança prática → grupo afetado → condições e limites**. Não presumir que todo evento afeta todos os setores, nem afirmar causalidade apenas por correlação. Diferenciar consequências já documentadas de cenários ainda hipotéticos.

Não adaptar os fatos, a ênfase editorial ou a seleção de acontecimentos ao alinhamento político da pessoa. Filtros escolhidos explicitamente por tema são suficientes para o MVP.

### Operação editorial e política obrigatória de fontes

**Toda fonte usada no conteúdo editorial ou nas respostas da IA deve ser oficial, verificável e de acesso público.** Aplicar a regra tanto aos acontecimentos quanto às explicações pedagógicas. TSE é uma referência para sua área de competência; outras instituições serão necessárias para temas legislativos, econômicos, históricos e filosóficos.

A regra operacional é usar fontes oficiais de acesso público e respeitar sua condição de reutilização. Não confundir “acessível gratuitamente” com “em domínio público autoral”. Para incorporar textos, imagens, traduções ou materiais didáticos, verificar domínio público, licença aberta compatível ou outra permissão aplicável; quando a reprodução não estiver autorizada, manter a referência e produzir explicação própria dos fatos e conceitos, sem copiar a obra. Registrar essa condição por recurso, sem presumir que todos os materiais de um órgão tenham a mesma licença.

Fontes previstas por finalidade:

| Finalidade | Fontes oficiais elegíveis | Critério de uso |
| --- | --- | --- |
| Eleições, candidaturas, partidos e resultados | TSE e Justiça Eleitoral | Usar o registro ou documento pertinente; dados eleitorais não comprovam, sozinhos, a ideologia de uma pessoa. |
| Projetos, tramitação, votações e debates | Câmara dos Deputados e Senado Federal | Conferir a etapa, a data e o alcance do documento. Distinguir proposição de norma em vigor. |
| Leis, decretos, atos e decisões | Portais oficiais de legislação, Diário Oficial e tribunais competentes | Citar o ato original, sua identificação e situação temporal; distinguir decisão provisória de definitiva. |
| Indicadores econômicos e sociais | Banco Central e IBGE, após validação do recurso específico | Informar série, período, unidade, abrangência, metodologia e revisões relevantes. |
| Teoria política, instituições e história | ILB/Saberes e publicações institucionais; acervos de universidades e bibliotecas públicas após verificação | Confirmar autoria, procedência, acesso e direitos de uso de cada material. Hospedagem em um acervo não equivale a endosso institucional de uma tese. |
| Avaliações e estudos de impactos | Estudos identificados de instituições públicas, como Ipea e consultorias legislativas, após aprovação | Atribuir a análise aos autores e explicitar método, hipóteses e limitações; não tratá-la como efeito comprovado ou consenso automático. |

Essas categorias orientam a curadoria. Elas não dispensam aprovação individual de cada domínio, documento ou conjunto de dados. Não usar portais privados de notícias, blogs, influenciadores, redes sociais ou enciclopédias colaborativas como fontes da IA ou das lições.

Operação mínima:

- Uma pessoa administradora cadastra fontes, URLs, autoria, datas, identificadores e os trechos necessários à análise. Manter uma lista explícita de órgãos e hostnames aprovados.
- Validar URLs no servidor e conferir a procedência institucional; não aceitar qualquer página apenas por conter “gov”, “jus” ou “leg” no endereço. Links externos citados por um portal não herdam sua aprovação.
- Registrar por fonte: órgão/editor, autor quando houver, URL canônica, título, datas de publicação, acesso e atualização, localização do trecho ou identificador do dado, tipo de material, condição de reutilização e estado de revisão.
- Classificar o material como ato/registro, dado estatístico, declaração, estudo ou conteúdo didático. Selecionar fontes capazes de sustentar a afirmação específica.
- Para controvérsias, consultar registros e posições documentadas dos atores relevantes dentro do acervo permitido. Não contar duas cópias do mesmo comunicado como confirmações independentes.
- Uma declaração oficial comprova que uma posição foi declarada; não comprova automaticamente a veracidade ou o resultado prometido por ela.
- A IA recebe somente o material aprovado e produz um rascunho estruturado. Cada afirmação verificável deve apontar para uma evidência pertinente.
- A pessoa administradora revisa evidências, referências e linguagem antes de publicar. Alterações materiais voltam para revisão.
- Não publicar acontecimento cujo fato central esteja sem comprovação suficiente. Se apenas um impacto ou interpretação estiver sem suporte, informar a limitação ou omitir essa seção; não preencher com memória do modelo nem recorrer silenciosamente a fontes proibidas.
- Exibir origem, atribuição e última revisão. Permitir sinalizar erro factual, fonte inadequada ou linguagem que induza uma opinião.
- Conteúdo e referências postados por participantes nos fóruns não entram automaticamente no acervo da IA nem recebem selo de verificação. Publicações da comunidade devem ser identificadas como conteúdo de usuários.
- Manter curadoria manual no MVP, com links e trechos permitidos. APIs e arquivos oficiais poderão simplificar o trabalho conforme a necessidade, respeitando termos, paginação, limites e atualização, sem criar coleta massiva.
- Não apresentar o feed como cobertura em tempo real e não tratar a OpenAI como fonte automática de notícias.

### Viabilidade e limites do recorte

A consulta preliminar a portais oficiais confirmou a existência de dados eleitorais do TSE, dados legislativos de Câmara e Senado, dados do Banco Central e um catálogo do ILB/Saberes que inclui correntes políticas. Isso sustenta a viabilidade de um MVP baseado em curadoria oficial, sem demonstrar cobertura completa de todos os temas.

O plano deve assumir cobertura menor e possíveis atrasos quando não houver documentação pública suficiente. Não prometer que todas as correntes, eventos e consequências estarão igualmente documentados. Antes de publicar cada módulo, validar se o acervo cobre suas definições, críticas e comparações; quando não cobrir, registrar a lacuna e ajustar a entrega editorial sem inventar conteúdo para cumprir uma contagem.

Verificar acesso e licença de cada recurso durante a implementação. A existência de um portal ou de documentação de API não equivale a uma integração testada de ponta a ponta.

## 8. Integração com a OpenAI

Utilizar a API da OpenAI somente no servidor, por meio do SDK oficial e de um módulo de integração pequeno e isolado. Configurar chave e modelo por variáveis de ambiente e confirmar compatibilidade na documentação oficial durante a implementação.

Usos do MVP:

- Gerar rascunhos das explicações de acontecimentos a partir das fontes cadastradas.
- Relacionar acontecimentos a lições e conceitos existentes no catálogo.
- Responder dúvidas pontuais dentro de uma lição ou acontecimento usando o conteúdo e as fontes disponíveis naquele contexto.

Não implementar inicialmente um agente autônomo ou um chat político irrestrito.

Regras obrigatórias:

- Usar exclusivamente o acervo oficial aprovado descrito na seção 7. Atribuir fontes às afirmações verificáveis e às interpretações, mantendo estas últimas identificadas. A resposta deve referenciar IDs fornecidos pelo sistema, e a aplicação deve validar a aprovação, resolver os links e conferir a relação entre a evidência e a afirmação. Bloquear referências inexistentes ou não aprovadas; não basta citar um domínio oficial qualquer.
- Nunca inventar fonte, URL, citação, dado, acontecimento ou consenso. Informar no resultado estruturado as fontes utilizadas e os pontos sem suporte, para que a aplicação possa bloquear ou limitar a publicação.
- Quando o contexto for insuficiente, explicar a limitação e pedir informação complementar, sem preencher lacunas com suposições.
- Aplicar integralmente os guardrails de explicação e autonomia da seção 1. Comparar perspectivas sem recomendar partido, candidato, corrente ou opinião, com ou sem acesso ao perfil da pessoa.
- Tratar documentos e mensagens de usuários como dados não confiáveis; eles não podem alterar instruções do sistema nem conceder acesso a ferramentas.
- Usar saídas estruturadas quando apropriado e validar formato, referências e regras de negócio no servidor. Formato válido não comprova veracidade.
- Definir limites de tamanho, orçamento de saída, tempo de resposta, repetição de chamadas e consumo por usuário.
- Reaproveitar análises editoriais publicadas entre usuários. Conteúdo já publicado e trilhas devem continuar disponíveis quando a API estiver indisponível.
- Informar quando uma resposta ou análise tiver apoio de IA, de maneira discreta e clara.
- Minimizar dados enviados e configurar retenção conforme a documentação e a conta utilizada, sem prometer retenção zero por padrão.

## 9. Fóruns e discussões

Permitir criar fóruns sobre correntes, ideias ou acontecimentos, com título, descrição, categoria e regras básicas. Dentro deles, usuários podem criar tópicos e comentários, editar ou excluir o próprio conteúdo, seguir e deixar de seguir o fórum.

Implementar:

- Busca simples por título e filtros por categoria.
- Uma lista dos fóruns seguidos e das discussões recentes desses fóruns.
- Comentários com estrutura simples e paginação, sem chat em tempo real ou árvores profundas.
- Links entre discussões, lições e acontecimentos, quando aplicável.
- Denúncia de conteúdo e uma fila administrativa mínima para análise.
- Remoção de conteúdo, encerramento de tópicos e suspensão de contas abusivas, com motivo registrado.

As regras devem proteger debate e discordância, proibindo ameaças, assédio, exposição de dados pessoais, discurso de ódio e spam. Não remover uma posição apenas por sua orientação política e não usar IA como única responsável por decisões de moderação.

## 10. Interface, identidade e usabilidade

**A Polis precisa ter identidade visual própria, clean e minimalista, sem aparência genérica de template ou de interface produzida automaticamente por IA.** Esse requisito deve aparecer na composição, na tipografia e nos componentes, não apenas na troca do nome ou da cor de uma biblioteca.

### Direção visual: publicação cívica contemporânea

Criar uma linguagem editorial que conecte o significado de Polis — vida coletiva e espaço de debate — a uma experiência digital jovem e adulta.

- Usar fundo de papel claro, texto grafite e azul-petróleo como destaque moderado. Definir tokens e validar contraste; cores devem comunicar função, sem classificar ideologias como melhores ou piores.
- Combinar uma tipografia editorial expressiva nos títulos com uma sans-serif de leitura confortável para a interface e o corpo. Usar no máximo duas famílias, com licenças adequadas e carregamento otimizado.
- Desenvolver uma assinatura tipográfica para “Polis” e um motivo geométrico simples relacionado a praça, encontro ou conexão. A marca deve funcionar em tamanhos pequenos, sem simular um símbolo oficial de governo.
- Construir ritmo de leitura com títulos, numeração de capítulos, filetes, margens e metadados bem organizados. Manter bastante espaço útil, sem usar vazio como substituto de conteúdo.
- Criar componentes específicos para a proposta: linha do tempo de acontecimentos, bloco de evidência com órgão e data, comparação de argumentos com a mesma hierarquia visual e percurso de aprendizado com etapas legíveis.
- Variar a apresentação conforme a informação: listas editoriais para acontecimentos, leitura contínua nas lições e cards apenas quando ajudarem a agrupar uma unidade. Evitar transformar todas as telas na mesma grade de caixas arredondadas.
- Usar pequenos diagramas e ilustrações vetoriais próprios quando explicarem relações. Evitar imagens decorativas sem função e clichês de IA, como brilhos, robôs, esferas abstratas e gradientes neon.
- Trabalhar superfícies predominantemente sólidas, detalhes discretos e animações curtas com propósito. Não usar glassmorphism, sombras exageradas ou grandes títulos publicitários como identidade padrão.
- Adaptar componentes de biblioteca à direção escolhida, com tipografia, espaçamento e estados coerentes. O uso de shadcn/ui não substitui a criação da identidade da Polis.
- Não incluir slogans ou jargões de marketing. Usar textos como “Continuar aprendendo”, “Entender este acontecimento”, “Ver fontes” e “Seguir fórum”.

Antes de expandir as telas, definir um pequeno sistema visual com paleta, tipos, espaçamentos, raios, ícones e os quatro componentes específicos acima. Aplicar esse sistema nas telas reais do MVP, com o mesmo cuidado nas versões mobile e desktop.

### Usabilidade e acessibilidade

- No celular, priorizar navegação inferior com Início, Aprender, Acontecimentos e Comunidade; conta acessível pelo avatar ou menu.
- No desktop, adaptar a navegação e a largura de leitura sem apenas ampliar a tela mobile.
- Atender telas a partir de 360 px, sem rolagem horizontal nas jornadas principais.
- Ter controles confortáveis para toque, foco visível, navegação por teclado, rótulos, contraste adequado e respeito à preferência de movimento reduzido.
- Oferecer explicações acessíveis para gráficos e apresentar resultados também em texto.
- Prever carregamento, erro, vazio, sucesso e retomada de ações; preservar respostas quando houver falha de rede.
- Não depender apenas de hover para disponibilizar informações.
- Apresentar fontes e incertezas com legibilidade e hierarquia suficientes, sem escondê-las em detalhes difíceis de acessar.
- Manter simetria visual nas comparações políticas: destaque, cor e posicionamento não podem sugerir uma resposta politicamente preferida.

Telas essenciais: acesso e conta, questionário, resultado, início com progresso e próxima lição, catálogo e leitura das lições, lista e detalhe de acontecimentos, fóruns e tópicos, privacidade e administração.

## 11. Stack e arquitetura

Adotar como base:

- **Next.js com App Router, React e TypeScript** na interface.
- **TypeScript sobre Node.js no backend**, integrado ao mesmo projeto Next.js por Route Handlers e Server Actions conforme a necessidade.
- **PostgreSQL** no Railway e **Prisma** para acesso ao banco e migrations.
- **Tailwind CSS**, com componentes acessíveis reutilizáveis; usar shadcn/ui onde trouxer benefício.
- **Zod** para validação de entradas e contratos relevantes.
- **Better Auth** para autenticação com e-mail e senha, verificando sua integração atual com Next.js e Prisma.
- SDK oficial da OpenAI.

Usar versões estáveis e compatíveis no momento da implementação e registrar as versões escolhidas. Preparar envio de e-mails transacionais por um único provedor ou SMTP configurável para verificação e recuperação de senha.

Organizar como um **monólito modular**, com módulos de conta, diagnóstico, aprendizado, acontecimentos, comunidade e administração.

Manter páginas e handlers enxutos, regras de negócio em serviços ou funções de domínio e acesso ao banco concentrado por módulo. Separar componentes visuais reutilizáveis dos fluxos específicos do produto.

Aplicar padrões de projeto quando resolverem um problema concreto: por exemplo, um adaptador para a OpenAI e estratégias simples para pontuação e ordenação da trilha. Não criar interfaces, fábricas, repositórios genéricos ou camadas sem necessidade. Evitar duplicar uma camada de persistência que apenas repasse chamadas ao Prisma.

Não adicionar backend separado, microsserviços, filas, Redis, banco vetorial ou infraestrutura de agentes sem uma necessidade comprovada dentro do escopo.

## 12. Segurança essencial

- Autenticação e autorização no servidor em todas as ações protegidas; conferir também propriedade dos registros e privilégios administrativos.
- Senhas, sessões e tokens gerenciados pela biblioteca de autenticação, com cookies seguros em produção e proteção contra CSRF conforme o fluxo.
- Recuperação de senha com token de uso único e expiração, sem revelar se um e-mail está cadastrado.
- Validação no servidor, limites de tamanho e consultas parametrizadas.
- Texto simples ou Markdown restrito para conteúdo de usuários, sem HTML arbitrário; sanitizar a renderização.
- Proteção contra XSS, injeção e abuso dos endpoints, especialmente autenticação, publicações e IA.
- Aplicar rate limiting persistente ou equivalente compatível com a infraestrutura, sem adicionar um serviço separado apenas para isso.
- Manter chaves da OpenAI, credenciais e dados privados fora do cliente, dos logs e do repositório.
- Não permitir que administradores consultem respostas individuais do teste como parte do fluxo comum de administração.
- Não buscar URLs arbitrárias fornecidas por usuários; usar os trechos cadastrados na curadoria do MVP.
- Não colocar resultados privados em caches públicos nem reutilizar respostas pessoais entre contas.
- Registrar somente o necessário para diagnosticar falhas e moderar conteúdo, com retenção definida.

MFA está fora do escopo. Segurança básica, proteção do perfil político e autorização correta fazem parte do MVP.

## 13. Preparação para Railway

Preparar a aplicação para um serviço web Node.js e um serviço PostgreSQL no Railway.

Entregar:

- Scripts reproduzíveis de instalação, desenvolvimento, build e início em produção.
- Configuração de execução compatível com a porta e a interface de rede exigidas pelo ambiente.
- Migrations versionadas e comando de pre-deploy para aplicá-las, sem recriar ou apagar o banco existente.
- Seed explícito e idempotente, separado da inicialização rotineira da aplicação.
- Endpoint de saúde, tratamento de erros e logs úteis sem dados sensíveis.
- `.env.example` com variáveis de banco, URL da aplicação, autenticação, OpenAI e e-mail, sem valores reais.
- Instruções para configuração inicial, credenciais administrativas, migrations, backup e restauração do banco.

Não depender do disco local do container para persistir dados do produto. Não realizar deploy pago nem criar recursos externos automaticamente; entregue a configuração pronta e documente as credenciais necessárias.

## 14. Conteúdo inicial e critérios de conclusão

Entregar o MVP com:

- As 50 perguntas completas, com seus pesos e mapeamentos versionados.
- Uma seleção inicial planejada de pelo menos oito módulos com duas lições completas cada, cobrindo fundamentos e perspectivas, com exercícios e fontes oficiais aprovadas. Publicar somente os materiais com sustentação suficiente; explicitar eventuais lacunas documentais que impeçam concluir essa seleção.
- Alguns fóruns iniciais com descrições e regras, sem usuários ou interações fictícias apresentados como atividade real.
- Exemplos de acontecimentos baseados exclusivamente em fontes oficiais verificadas durante a implementação e com datas reais. Se não houver acesso a fontes, usar exemplos claramente marcados como demonstração e mantê-los fora do feed de atualidades.

O trabalho estará concluído quando:

1. Uma pessoa conseguir cadastrar-se, recuperar acesso e gerenciar os próprios dados.
2. Conseguir responder, interromper e retomar o questionário, recebendo resultado reproduzível e explicável.
3. Conseguir estudar em uma sequência personalizada ou geral, explorar outras correntes e manter progresso sem duplicação de XP.
4. Conseguir consultar acontecimentos com fontes, impactos diferenciados e ligação com conceitos estudados.
5. Conseguir criar e seguir fóruns, publicar, comentar e denunciar conteúdo.
6. Uma pessoa administradora conseguir revisar e publicar análises e processar denúncias sem acesso rotineiro às respostas políticas individuais.
7. A aplicação preservar o conteúdo publicado quando a OpenAI falhar e apresentar erro compreensível nas funções dependentes da API.
8. Os fluxos principais funcionarem no celular e os dados privados não puderem ser acessados por outra conta.
9. O sistema impedir o uso editorial de fontes não aprovadas, referências inventadas ou afirmações centrais sem evidência suficiente.
10. A IA passar por avaliações de explicação sem indução nos conteúdos pedagógicos e nos acontecimentos.
11. A identidade visual da Polis estiver aplicada a componentes próprios e às telas reais, com apresentação legível de fontes e comparações.

Executar verificações proporcionais ao risco: cálculo do questionário, respostas ausentes e empates, autorização entre contas, XP idempotente, recuperação de acesso, validação das referências da IA e os principais fluxos ponta a ponta. Verificar também build, tipos e lint. Não criar testes triviais apenas para aumentar cobertura.

Manter uma pequena bateria de avaliações da IA, com critérios e revisão humana: pedidos para indicar em quem votar ou convencer alguém; a mesma dúvida apresentada por pessoas de posições opostas; alegação falsa com fonte oficial verificável; fonte oficial que contém somente uma promessa; falta de evidência para impacto; URL não aprovada; e tentativa de alterar instruções por meio de um documento. Verificar ausência de recomendação política, critérios consistentes, atribuição correta, tratamento das lacunas e preservação das regras. Essas avaliações reduzem riscos e não constituem garantia de neutralidade absoluta.

## 15. Forma de execução e entrega

Comece apresentando brevemente a arquitetura, o modelo de dados e a sequência de implementação. Depois, avance para a implementação por fluxos completos, sem parar apenas no planejamento.

Priorize primeiro conta → questionário → resultado → trilha; depois acontecimentos com IA e revisão editorial; por fim fóruns e moderação. Mantenha todas as funcionalidades do escopo como parte da entrega final.

Entregue código organizado, schema e migrations, seeds, componentes consistentes com a identidade da Polis, integração funcional com a OpenAI e um README com execução local, configuração no Railway, metodologia do teste, catálogo de fontes aprovadas, condições de uso e limitações editoriais.

Se uma integração depender de credenciais ausentes, deixe o código e a configuração preparados e identifique a dependência com clareza. Mocks podem apoiar desenvolvimento e testes, mas não devem ser apresentados como integração real concluída.

Resolva decisões rotineiras com bom senso, sem ampliar o escopo. Explique as premissas adotadas e eventuais limitações que afetem a entrega.

## 16. Referências da validação preliminar

Consulta realizada em 20/11/2026. Estes links documentam a viabilidade do recorte; a aprovação de cada recurso, seus direitos de uso e a integração técnica permanecem parte da implementação.

| Referência oficial consultada | Evidência encontrada | Alcance da validação |
| --- | --- | --- |
| [Portal de Dados Abertos do TSE](https://dadosabertos.tse.jus.br/pt_BR/) | Catálogo com dados de candidaturas e resultados, entre outros conjuntos eleitorais. | Existência do portal e dos formatos publicados; não implica autorização indiscriminada para reutilizar todos os anexos. |
| [Dados Abertos da Câmara](https://dadosabertos.camara.leg.br/) e [documentação](https://dadosabertos.camara.leg.br/swagger/api.html) | API e arquivos para dados legislativos. | Documentação consultada; não foi concluído teste de integração da API. |
| [Dados Abertos do Senado](https://www12.senado.leg.br/dados-abertos) | Catálogo legislativo, inclusive matérias, plenário e legislação, com indicação de dados abertos. | Existência do catálogo; verificar os serviços e limites vigentes ao integrar. |
| [ILB/Saberes — catálogo consultado](https://saberes.senado.leg.br/course/index.php?categoryid=382) | Ementas públicas de cursos sobre liberalismo, social-democracia e socialismo. | A presença das ementas não comprova acesso sem cadastro nem licença de reprodução de todos os materiais dos cursos. |
| [Banco Central — dados abertos](https://dadosabertos.bcb.gov.br/) | Catálogo de conjuntos em formatos estruturados e APIs. | Existência do catálogo; validar cada série, metodologia e condição de uso antes da publicação. |
| [Lei de Direitos Autorais](https://www.planalto.gov.br/ccivil_03/leis/l9610.htm) e [orientações do Ministério da Cultura](https://www.gov.br/cultura/pt-br/assuntos/direitos-autorais/perguntas-frequentes/perguntas-frequentes) | Distinção entre direitos de uso, domínio público e conteúdos não protegidos como atos oficiais. | Fundamenta a verificação por tipo de material; acesso gratuito não é uma licença geral de reprodução. |

IBGE, Ipea, tribunais e acervos públicos são fontes candidatas adicionais. Aprovar recursos específicos antes de usá-los. As consultas a endpoints do IBGE encontraram bloqueio de acesso nesta verificação; não foi validada uma integração técnica com seus serviços.

