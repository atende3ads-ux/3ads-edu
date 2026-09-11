export const contactUrl = 'https://wa.me/5562982005986?text=' + encodeURIComponent('Olá! Quero conhecer os programas da 3ADS EDU para desenvolver a equipe da minha empresa.');

export const navigation = [
  { label: 'Programas', href: '#programas' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Experiências', href: '#experiencias' },
  { label: 'Mentores', href: '#mentores' },
] as const;

export const programs = [
  { title: 'IA para Negócios', category: 'Inteligência artificial', description: 'Leve a inteligência artificial para a rotina: automatize tarefas, explore ferramentas e use dados para apoiar decisões.', slug: 'ia-para-negocios', tags: ['Automação', 'Produtividade', 'Decisão'], image: 'programa-ia-negocios.webp', alt: 'Rede de inteligência artificial conectando automação, dados, pessoas e operações de negócio' },
  { title: 'Growth Marketing e IA', category: 'Crescimento', description: 'Conecte experimentação, dados e inteligência artificial para identificar oportunidades e melhorar a conversão.', slug: 'growth-e-sales', image: 'programa-growth-marketing-ia.webp', alt: 'Fluxos de dados e experimentos formando uma trajetória ascendente de crescimento' },
  { title: 'Técnicas de Vendas e CRM', category: 'Vendas', description: 'Desenvolva a abordagem comercial e organize o acompanhamento das oportunidades, da prospecção ao fechamento.', slug: 'tecnicas-de-vendas-e-crm', image: 'programa-vendas-crm.webp', alt: 'Relacionamentos e oportunidades avançando por um funil até uma conexão comercial' },
  { title: 'Atendimento e Customer Experience', category: 'Experiência do cliente', description: 'Entenda a jornada do cliente e prepare sua equipe para atender melhor, resolver problemas e fortalecer relacionamentos.', slug: 'atendimento-cx', image: 'programa-atendimento-cx.webp', alt: 'Jornada do cliente conectando escuta, diálogo, cuidado e resolução' },
  { title: 'Performance: do básico ao avançado', category: 'Resultados', description: 'Aprenda a testar, analisar e otimizar campanhas, com decisões orientadas pelos indicadores de desempenho.', slug: 'performance', image: 'programa-performance.webp', alt: 'Etapas de análise e otimização evoluindo em direção a uma meta de performance' },
  { title: 'Tráfego Pago', category: 'Mídia', description: 'Desenvolva habilidades para criar anúncios, segmentar públicos e gerenciar campanhas nas plataformas de mídia.', slug: 'trafego-pago', image: 'programa-trafego-pago.webp', alt: 'Feixe de mídia selecionando uma audiência e ampliando seu alcance' },
  { title: 'Personal Branding e Apresentações de Alto Impacto', category: 'Comunicação', description: 'Fortaleça seu posicionamento e aprenda a comunicar ideias com clareza, presença e confiança.', slug: 'personal-branding', image: 'programa-personal-branding.webp', alt: 'Pessoa apresentando uma ideia iluminada diante de uma audiência' },
] as const;

export const formats = [
  { name: 'Treinamentos', description: 'Para desenvolver habilidades que a equipe precisa aplicar.', image: 'formato-treinamentos.webp', alt: 'Participantes reunidos após um treinamento de inteligência artificial da 3ADS', position: 'center 56%' },
  { name: 'Workshops', description: 'Para explorar um tema e colocar o time em prática.', image: 'formato-workshops.webp', alt: 'Carlos Costa conduzindo um workshop diante de participantes', position: 'center 45%' },
  { name: 'Mentorias', description: 'Para apoiar líderes em decisões e desafios específicos.', image: 'formato-mentorias.webp', alt: 'Guilherme Medeiros apresentando uma aplicação de inteligência artificial', position: 'center 45%' },
  { name: 'Consultorias', description: 'Para analisar processos e orientar os próximos passos.', image: 'formato-consultorias.webp', alt: 'Equipe e participantes reunidos em uma experiência conduzida pela 3ADS', position: 'center' },
] as const;

export const steps = [
  { title: 'Entender', text: 'Conhecemos os objetivos, o contexto e o nível da equipe.' },
  { title: 'Desenhar', text: 'Selecionamos conteúdos conectados às prioridades do negócio.' },
  { title: 'Praticar', text: 'Trabalhamos o aprendizado com participação ativa do time.' },
  { title: 'Acompanhar', text: 'Avaliamos feedbacks e resultados para orientar a evolução.' },
] as const;

export const mentors = [
  { name: 'Nathália Machado', specialty: 'Marketing & experiência', image: 'nathalia-machado.webp', bio: 'Marketing, inteligência digital e UX aplicados à melhoria de processos e experiências.' },
  { name: 'Guilherme Medeiros', specialty: 'Growth & mídia', image: 'guilherme-medeiros.webp', bio: 'Growth e mídia paga, com atuação em planejamento, execução e otimização de campanhas.' },
  { name: 'Carlos Costa', specialty: 'Tecnologia & negócios', image: 'carlos-costa.webp', bio: 'Tecnologia, marketing e vendas, com experiência em consultoria e formação de profissionais.' },
] as const;

export const questions = [
  { question: 'O conteúdo é adaptado à minha empresa?', answer: 'Sim. Consideramos os objetivos do negócio, o contexto da empresa e o nível de conhecimento da equipe para conectar o conteúdo aos desafios reais dos participantes.' },
  { question: 'Os encontros são presenciais ou online?', answer: 'Os programas podem ser realizados presencialmente ou online. O formato mais adequado é definido de acordo com os objetivos, o perfil dos participantes e a dinâmica desejada para a experiência.' },
  { question: 'Minha equipe precisa ter conhecimento prévio?', answer: 'Não necessariamente. Antes do programa, entendemos o nível de conhecimento dos participantes para ajustar a linguagem, a profundidade e as atividades. Quando houver algum pré-requisito, ele será informado previamente.' },
  { question: 'Quais formatos de programa estão disponíveis?', answer: 'A 3ADS EDU desenvolve workshops, imersões, treinamentos, consultorias e mentorias. A recomendação do formato acontece depois de entendermos o desafio e o resultado que sua empresa deseja alcançar.' },
  { question: 'Como sei qual programa é ideal para a minha equipe?', answer: 'Começamos com uma conversa de diagnóstico. A partir dela, avaliamos o desafio, o público, o momento da empresa e os objetivos esperados para recomendar a solução mais adequada.' },
  { question: 'Os programas são apenas teóricos?', answer: 'Não. Os conteúdos são conectados à prática e podem incluir exercícios, discussões, ferramentas, produção de materiais e aplicação em desafios reais da empresa.' },
  { question: 'É possível criar uma trilha com vários encontros?', answer: 'Sim. Dependendo do objetivo, o programa pode ser estruturado como uma jornada com módulos, atividades entre os encontros e momentos de acompanhamento.' },
  { question: 'Qual é a duração de um programa?', answer: 'A duração varia conforme o formato, o tema, a quantidade de participantes e a profundidade necessária. Depois do diagnóstico, apresentamos uma proposta com carga horária e cronograma recomendados.' },
  { question: 'Quantas pessoas podem participar?', answer: 'O número ideal depende do formato escolhido. Algumas experiências funcionam melhor com grupos menores e mais interação; outras podem atender públicos maiores. Essa definição faz parte do desenho do programa.' },
  { question: 'Quem conduz os encontros?', answer: 'Os programas são conduzidos por trainers selecionados de acordo com o tema, os objetivos do projeto e o perfil dos participantes. Antes da realização, todo o conteúdo e a dinâmica são alinhados com a equipe da 3ADS EDU.' },
  { question: 'Como os resultados são acompanhados?', answer: 'Definimos critérios de sucesso de acordo com cada projeto. Podemos acompanhar indicadores como participação, aprendizagem, aplicação prática, satisfação e evolução dos compromissos assumidos.' },
  { question: 'O suporte termina depois do último encontro?', answer: 'O encerramento inclui a coleta de feedbacks, o registro de aprendizados e a avaliação dos próximos passos. Quando fizer sentido, também podemos recomendar uma nova etapa, mentoria ou ação de continuidade.' },
  { question: 'É possível contratar um programa que ainda não está no portfólio?', answer: 'Sim. Também desenvolvemos soluções personalizadas. Primeiro avaliamos a necessidade e a viabilidade do projeto; depois definimos formato, escopo, cronograma e entregáveis.' },
  { question: 'Como funciona o investimento?', answer: 'O investimento é definido conforme o formato, a carga horária, o nível de personalização, o número de participantes e a logística envolvida. Após a conversa inicial, você recebe uma proposta clara com o escopo completo.' },
  { question: 'Como faço para solicitar uma proposta?', answer: 'Fale com a nossa equipe e conte brevemente qual é o desafio da sua empresa, quem participará e qual resultado vocês buscam. A partir disso, marcamos uma conversa para entender o cenário e indicar o melhor caminho.' },
] as const;

// Clientes da 3ADS em diferentes frentes. Não representa uma lista de clientes EDU.
export const clients = ['Unimed Cerrado', 'Alata', 'IPOG Vitória', 'Grupo Saga', 'CBCO Hospital de Olhos', 'Terral', 'Alexfarma', 'MyBroker'] as const;
