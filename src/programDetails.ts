export type ProgramDetail = {
  slug: string;
  type: string;
  title: string;
  headline: string;
  duration: string;
  learning: readonly string[];
  overview: string;
  audience: string;
  gallery: readonly {
    src: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  }[];
};

const programGallery: ProgramDetail['gallery'] = [
  {
    src: 'formato-treinamentos.webp',
    alt: 'Participantes reunidos após um treinamento de inteligência artificial da 3ADS',
    width: 1200,
    height: 1600,
    position: 'center 57%',
  },
  {
    src: 'formato-workshops.webp',
    alt: 'Carlos Costa conduzindo um workshop sobre inteligência artificial diante de participantes',
    width: 1066,
    height: 1600,
    position: 'center 46%',
  },
  {
    src: 'formato-mentorias.webp',
    alt: 'Guilherme Medeiros apresentando uma aplicação prática de inteligência artificial',
    width: 768,
    height: 1024,
    position: 'center 44%',
  },
];

export const programDetails: Record<string, ProgramDetail> = {
  'ia-para-negocios': {
    slug: 'ia-para-negocios',
    type: 'Treinamento',
    title: 'IA para Negócios',
    headline: 'Domine a Inteligência Artificial e transforme seu negócio em uma máquina de inovação, produtividade e lucro.',
    duration: '18 horas de imersão',
    learning: [
      'Dominar as principais ferramentas de IA para negócios.',
      'Automatizar processos e economizar tempo.',
      'Melhorar a eficiência de campanhas de marketing e vendas.',
      'Tomar decisões mais estratégicas com base em dados.',
      'AplicarIA para aumentar a competitividade no mercado.',
    ],
    overview: 'No curso IA Para Negócios, você aprenderá, de forma prática e aplicada, como usar a IA para aumentar a produtividade, melhorar o relacionamento com clientes, impulsionar campanhas de marketing e tornar sua empresa mais eficiente e competitiva.',
    audience: 'O curso é ideal para empreendedores que querem automatizar processos e escalar seus negócios com inteligência artificial, profissionais de marketing que desejam otimizar campanhas, personalizar conteúdos e aumentar a conversão, gestores e líderes que buscam tomar decisões mais estratégicas baseadas em dados, equipes de vendas que querem melhorar prospecção, segmentação e relacionamento com clientes e profissionais de inovação e tecnologia interessados em aplicar IA para aumentar a eficiência operacional. Também é indicado para qualquer pessoa que queira aprender a utilizar inteligência artificial de forma prática e acessível para transformar negócios.',
    gallery: programGallery,
  },
  'growth-e-sales': {
    slug: 'growth-e-sales',
    type: 'Mentoria',
    title: 'Growth Marketing e IA',
    headline: 'Maximize resultados com menos esforço. Aplique Growth Marketing e IA para crescer de forma inteligente e escalável!',
    duration: '18 horas de imersão',
    learning: [
      'Como implementar estratégias de Growth Marketing para crescer de forma acelerada.',
      'Usar IA para automatizar processos e otimizar campanhas.',
      'Identificar oportunidades de mercado e prever tendências.',
      'Criar funis de conversão mais eficientes.',
      'Segmentar clientes e personalizar experiências com IA.',
      'Medir e escalar resultados com metodologias ágeis.',
      'Automatizar atendimento e interações com chatbots e assistentes virtuais.',
      'Analisar dados de forma inteligente para decisões mais estratégicas.',
    ],
    overview: 'O marketing evoluiu, e quem deseja crescer precisa usar dados, automação e inteligência artificial para escalar resultados. No curso “Growth Marketing e IA”, você aprenderá estratégias de crescimento, como utilizar IA para otimizar processos e identificar oportunidades com menos esforço e mais impacto. Com uma abordagem prática, o curso ensina como testar, medir e acelerar resultados, integrando IA em campanhas e decisões estratégicas.',
    audience: 'Se você busca acelerar o crescimento do seu negócio de forma inteligente, utilizando estratégias de Growth Marketing e Inteligência Artificial, este curso é para você! Seja você um profissional de marketing, empreendedor ou analista de dados, aqui você aprenderá a otimizar campanhas, prever tendências e escalar seus resultados de maneira eficiente.',
    gallery: programGallery,
  },
  'tecnicas-de-vendas-e-crm': {
    slug: 'tecnicas-de-vendas-e-crm',
    type: 'Treinamento',
    title: 'Técnicas de Vendas e CRM',
    headline: 'Domine vendas consultivas com CRM e acelere seus resultados com inteligência!',
    duration: '3 módulos',
    learning: [
      'Entender o perfil do cliente e criar abordagens personalizadas.',
      'Estratégias de prospecção, negociação e fechamento de vendas.',
      'Superação de objeções e fidelização de clientes.',
      'Uso estratégico de um CRM para gerenciar contatos e acompanha oportunidades.',
      'Automação de tarefas e análise de métricas para melhorar a performance.',
    ],
    overview: 'Neste curso, dividido em três módulos principais, você aprenderá a entender as necessidades do cliente, construir relacionamentos e utilizar ferramentas estratégicas para otimizar os resultados. No mundo dos negócios, vender vai além de oferecer um produto ou serviço, portanto, combinaremos técnicas avançadas de vendas com a utilização eficaz de um CRM (Customer Relationship Management), permitindo que profissionais da área comercial aumentem suas taxas de conversão, fidelizem clientes e tornem seus processos mais organizados e produtivos.',
    audience: 'O curso é ideal para vendedores, representantes comerciais e consultores de vendas, empreendedores e gestores que desejam otimizar seus processos comerciais, profissionais de atendimento e relacionamento com clientes e qualquer pessoa interessada em aprimorar suas habilidades de venda e organização comercial.',
    gallery: programGallery,
  },
  'atendimento-cx': {
    slug: 'atendimento-cx',
    type: 'Treinamento',
    title: 'Atendimento e Customer Experience (CX)',
    headline: 'Saiba como transformar as interações em experiências memoráveis.',
    duration: '18 horas de imersão',
    learning: [
      'Transformar interações em experiências memoráveis e fidelizar clientes.',
      'Os fundamentos do Customer Experience (CX) e seu impacto nos negócios.',
      'Técnicas de comunicação eficaz para um atendimento empático e assertivo.',
      'Mapear a jornada do cliente e identificar melhorias no atendimento.',
      'Lidar com reclamações e resolver problemas de forma estratégica.',
      'Personalizar o atendimento para criar conexões genuínas.',
      'Implementar um atendimento omnichannel e oferecer uma experiência integrada.',
      'Métricas essenciais para medir e melhorar a experiência do cliente.',
    ],
    overview: 'Em um mercado cada vez mais competitivo, oferecer um atendimento excepcional não é mais um diferencial, e sim uma necessidade. O curso “Atendimento e Customer Experience (CX)” é um treinamento imersivo de 18 horas que ensinará como transformar cada interação com o cliente em uma experiência memorável, promovendo fidelização e satisfação.',
    audience: 'O curso é ideal para atendentes e representantes de suporte que querem melhorar suas interações com os clientes, empreendedores e empresários que desejam aumentar a satisfação e fidelizar seu público, líderes e gerentes de atendimento que buscam implementar estratégias eficazes de Customer Experience, profissionais de vendas e pós-vendas que querem fortalecer a conexão com seus clientes e equipes de marketing e customer success que desejam alinhar a experiência do cliente com a proposta da marca.',
    gallery: programGallery,
  },
  performance: {
    slug: 'performance',
    type: 'Treinamento',
    title: 'Performance: do básico ao avançado',
    headline: 'Planeje, otimize e escale campanhas que geram resultados com mais performance e menor custo!',
    duration: '18 horas de imersão',
    learning: [
      'Como planejar, estruturar e otimizar campanhas de anúncios pagos.',
      'Estratégias para melhorar a performance e reduzir o custo por conversão.',
      'Como testar, analisar e escalar campanhas de forma eficiente.',
      'Técnicas para segmentação e copywriting em anúncios.',
      'Ferramentas essenciais para otimização e automação de campanhas.',
    ],
    overview: 'Este curso, dividido em três módulos de 6 horas cada, é essencial para quem deseja dominar a performance de anúncios e campanhas pagas. Estruturado de modo a trabalhar questões de conhecimento que vão desde o básico ao avançado, você aprenderá a criar campanhas estratégicas que geram resultados reais, entenderá como realizar a otimização das suas campanhas e reduzir custos, além de dominar técnicas avançadas de segmentação, remarketing e análise de métricas. Com um método prático e baseado em dados, o curso ajudará você a transformar seus anúncios em máquinas de resultados.',
    audience: 'O curso é ideal para profissionais de marketing digital que desejam melhorar seus resultados, gestores de tráfego que buscam otimizar campanhas e aumentar o ROI, donos de negócios que querem atrair mais clientes por meio de anúncios pagos, freelancers e afiliados que trabalham com mídia paga e qualquer pessoa interessada em dominar a performance de campanhas.',
    gallery: programGallery,
  },
  'trafego-pago': {
    slug: 'trafego-pago',
    type: 'Treinamento',
    title: 'Tráfego Pago',
    headline: 'Aprenda a criar anúncios lucrativos. Domine o tráfego pago para transformar cliques em clientes.',
    duration: '18 horas de imersão',
    learning: [
      'Fundamentos do Tráfego Pago.',
      'Estratégias avançadas de segmentação.',
      'Criação de anúncios de alto desempenho.',
      'Otimização e escala de campanhas.',
      'Automação e Inteligência Artificial no Tráfego Pago.',
    ],
    overview: 'No mundo digital, a visibilidade e o alcance são fundamentais para o sucesso de qualquer negócio. No entanto, para atrair clientes e gerar vendas, é essencial dominar o tráfego pago, uma das estratégias mais poderosas do marketing digital. Neste curso você aprenderá a transformar investimentos em anúncios em resultados concretos, seja para o seu próprio negócio ou para clientes que buscam crescimento no ambiente online. Com uma carga horária de 18 horas, distribuídas em três módulos completos, o curso aborda desde os conceitos fundamentais até as estratégias mais avançadas.',
    audience: 'O curso é ideal para empreendedores que desejam aumentar as vendas e atrair mais clientes por meio de anúncios online, profissionais de marketing digital que buscam se especializar em tráfego pago e potencializar resultados, gestores de tráfego que querem aprimorar suas estratégias e dominar novas técnicas, freelancers e agências que desejam oferecer serviços de tráfego pago e escalar seus negócios e iniciantes no marketing digital que querem aprender do zero e construir uma carreira na área.',
    gallery: programGallery,
  },
  'personal-branding': {
    slug: 'personal-branding',
    type: 'Treinamento',
    title: 'Personal Branding e Apresentações de Alto Impacto',
    headline: 'Construa autoridade, comunique com impacto e torne-se referência no seu mercado!',
    duration: '18 horas de imersão',
    learning: [
      'A importância do Personal Branding no mercado atual.',
      'Como se tornar uma autoridade no seu nicho.',
      'Técnicas de comunicação e oratória para apresentações de alto impacto.',
      'Uso do storytelling para criar conexões reais.',
      'Como superar o medo de falar em público e transmitir confiança.',
    ],
    overview: 'Em um mercado cada vez mais competitivo, saber se posicionar de forma estratégica é essencial para se destacar, construir autoridade e gerar novas oportunidades. O curso “Personal Branding e Apresentações de Alto Impacto” é um treinamento intensivo de 18 horas de duração, desenvolvido para ajudar profissionais e empreendedores a fortalecerem sua marca pessoal e se comunicarem com confiança e persuasão.',
    audience: 'O curso é ideal para empreendedores e empresários que desejam construir autoridade e gerar novas oportunidades de negócio, consultores, coaches e palestrantes que buscam se posicionar como referência em seus nichos, profissionais de vendas e marketing que precisam se comunicar de forma persuasiva e impactante, profissionais em transição de carreira que querem fortalecer sua imagem e se destacar no mercado e executivos e líderes que desejam aprimorar sua presença, influência e habilidades de apresentação.',
    gallery: programGallery,
  },
};
