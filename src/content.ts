export const contactUrl = 'https://wa.me/5562982005986?text=' + encodeURIComponent('Olá! Quero conhecer os programas da 3ADS EDU para desenvolver a equipe da minha empresa.');

export const navigation = [
  { label: 'Programas', href: '#programas' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Experiências', href: '#experiencias' },
  { label: 'Mentores', href: '#mentores' },
] as const;

export const programs = [
  { title: 'IA para Negócios', category: 'Inteligência artificial', description: 'Leve a inteligência artificial para a rotina: automatize tarefas, explore ferramentas e use dados para apoiar decisões.', slug: 'ia-para-negocios', tags: ['Automação', 'Produtividade', 'Decisão'] },
  { title: 'Growth Marketing e IA', category: 'Crescimento', description: 'Conecte experimentação, dados e inteligência artificial para identificar oportunidades e melhorar a conversão.', slug: 'growth-e-sales' },
  { title: 'Técnicas de Vendas e CRM', category: 'Vendas', description: 'Desenvolva a abordagem comercial e organize o acompanhamento das oportunidades, da prospecção ao fechamento.', slug: 'tecnicas-de-vendas-e-crm' },
  { title: 'Atendimento e Customer Experience', category: 'Experiência do cliente', description: 'Entenda a jornada do cliente e prepare sua equipe para atender melhor, resolver problemas e fortalecer relacionamentos.', slug: 'atendimento-cx' },
  { title: 'Performance: do básico ao avançado', category: 'Resultados', description: 'Aprenda a testar, analisar e otimizar campanhas, com decisões orientadas pelos indicadores de desempenho.', slug: 'performance' },
  { title: 'Tráfego Pago', category: 'Mídia', description: 'Desenvolva habilidades para criar anúncios, segmentar públicos e gerenciar campanhas nas plataformas de mídia.', slug: 'trafego-pago' },
  { title: 'Personal Branding e Apresentações de Alto Impacto', category: 'Comunicação', description: 'Fortaleça seu posicionamento e aprenda a comunicar ideias com clareza, presença e confiança.', slug: 'personal-branding' },
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
  { question: 'O conteúdo é adaptado à minha empresa?', answer: 'Sim. Consideramos os objetivos do negócio e o nível da equipe para conectar o conteúdo aos desafios da sua empresa.' },
  { question: 'Os encontros são presenciais ou online?', answer: 'As duas opções estão disponíveis. O formato é definido conforme as necessidades da sua equipe.' },
  { question: 'Minha equipe precisa ter conhecimento prévio?', answer: 'Não necessariamente. O conteúdo pode atender diferentes níveis de experiência, de quem está começando a quem quer aprofundar a prática.' },
] as const;

// Clientes da 3ADS em diferentes frentes. Não representa uma lista de clientes EDU.
export const clients = ['Unimed Cerrado', 'Alata', 'IPOG Vitória', 'Grupo Saga', 'CBCO Hospital de Olhos', 'Terral', 'Alexfarma', 'MyBroker'] as const;
