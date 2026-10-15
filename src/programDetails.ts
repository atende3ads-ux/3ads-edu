export type ProgramDetail = {
  slug: string;
  type: string;
  title: string;
  headline: string;
  duration: string;
  learning: readonly string[];
  overview: string;
  audience: string;
};

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
  },
};
