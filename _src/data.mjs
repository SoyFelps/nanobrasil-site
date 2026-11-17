// Conteúdo institucional — extraído integralmente de nanobrasil.net

export const contact = {
  address: 'Rua Professor José Vieira de Mendonça, 770, Engenho Nogueira, Sala 411',
  cep: 'CEP 31.310-260',
  city: 'Belo Horizonte - MG',
  park: 'Parque Tecnológico de Belo Horizonte (BH-TEC)',
  phone: '+55 (31) 99934-6556',
  whatsapp: 'https://wa.me/5531999346556',
  email: 'comercial@nanobrasil.net',
  linkedin: 'https://br.linkedin.com/company/nano-brasil',
  youtube: 'https://www.youtube.com/@NanoBrasilNanotec',
  instagram: 'https://www.instagram.com/nano.brasil/',
  instagramReel: 'https://www.instagram.com/reel/DYXKNY4A2hI/',
};

export const nav = [
  { href: 'sobre.html', label: 'Quem somos', key: 'sobre' },
  { href: 'areas.html', label: 'Áreas', key: 'areas' },
  { href: 'nanoparticulas.html', label: 'Nanopartículas', key: 'nanoparticulas' },
  { href: 'nanotecnologia.html', label: 'Nanotecnologia', key: 'nanotecnologia' },
  { href: 'equipe.html', label: 'Equipe', key: 'equipe' },
  { href: 'noticias.html', label: 'Notícias', key: 'noticias' },
];

export const stats = [
  { pre: 'Impacto econômico', prefix: 'US$', to: 1, suffix: 'trilhão', label: 'em impacto econômico nos EUA nas últimas duas décadas', src: 'Nano Gov/USA', href: 'https://nanobrasil.net/wp-content/uploads/2026/04/NNI-FY25-Budget-Supplement.pdf' },
  { pre: 'Produtos comerciais', prefix: '+ de', to: 11000, suffix: '', label: 'produtos comerciais em cerca de 70 países', src: 'StatNano', href: 'https://product.statnano.com/' },
  { pre: 'Mercado global', prefix: 'US$', to: 115, suffix: 'bilhões', label: 'é a projeção do mercado global de nanotecnologia para 2034', src: 'Precedence Research', href: 'https://www.precedenceresearch.com/' },
];

// Serviços e produtos (seção "Como funciona a NanoBrasil")
export const howItWorks = 'A NanoBrasil atua em duas frentes principais: serviços e produtos. Em serviços, oferece pesquisa, desenvolvimento e consultoria especializada; em produtos, trabalha com a incorporação de nanopartículas e o desenvolvimento de soluções personalizadas.';
export const services = {
  produtos: { title: 'Produtos', text: 'Testes de incorporação dentro de uma gama de produtos nanotecnológicos já estabilizados e padronizados, com objetivo de melhorar propriedades específicas de produtos acabados.' },
  pdi: { title: 'Pesquisa, Desenvolvimento e Inovação', text: 'Plano de trabalho focado na demanda do cliente, com indicadores de progresso (KPI’s) determinados e cronograma, para desenvolvimento de novo produto, percorrendo todas as fases da maturação de novas tecnologias.' },
  consultoria: { title: 'Assessoria e Consultoria em Nanotecnologia', text: 'Prospecção tecnológica e investigação de demandas específicas de clientes com foco em nanotecnologia, para melhoramento de processos e operação. Consultoria em desenvolvimentos nanotecnológicos e terceirização em P&D.' },
};

// Catálogo de nanopartículas (derivado das áreas de atuação)
export const elements = [
  { n: 29, sym: 'Cu', name: 'Cobre', form: 'Nanocobre 99,97% metálico', desc: 'Defensivo agrícola com ação 700x superior contra patógenos, biocida em produtos domésticos, antimicrobiano em tintas, tecidos, produtos pet e curativos. Na dermocosmética, estimula colágeno e elastina.', apps: ['Agro', 'Tintas', 'Home care', 'Têxtil', 'Pet', 'Saúde'] },
  { n: 30, sym: 'Zn', name: 'Zinco', form: 'Nanopartículas de óxido de zinco', desc: 'Nutriente nanoestruturado para plantas, agente antimicrobiano em tintas e tecidos, proteção solar segura em cosméticos e reforço em compostos cimentícios.', apps: ['Agro', 'Tintas', 'Home care', 'Construção', 'Têxtil', 'Pet', 'Saúde'] },
  { n: 22, sym: 'Ti', name: 'Titânio', form: 'Nanopartículas de dióxido de titânio', desc: 'Melhora revestimentos e pode substituir a prata em diferentes aplicações, garante proteção solar em cosméticos e atua como aditivo com potencial antichamas.', apps: ['Tintas', 'Home care', 'Polímeros', 'Construção'] },
  { n: 14, sym: 'Si', name: 'Silício', form: 'Nanopartículas de silício / dióxido de silício', desc: 'Nutriente nanoestruturado no agro, aditivo antichamas em polímeros e reforço de resistência em concreto e cimento.', apps: ['Agro', 'Polímeros', 'Construção'] },
  { n: 20, sym: 'Ca', name: 'Cálcio', form: 'Carbonato de cálcio ecológico', desc: 'Aumenta a resistência mecânica de embalagens com menos matéria-prima, melhora tintas e eleva propriedades mecânicas e durabilidade de cimento e concreto.', apps: ['Agro', 'Tintas', 'Polímeros', 'Construção'] },
  { n: 13, sym: 'Al', name: 'Alumínio', form: 'Nanopartículas de dióxido de alumínio', desc: 'Aplicadas ao aumento da resistência de concreto e cimento.', apps: ['Construção'] },
  { n: 34, sym: 'Se', name: 'Selênio', form: 'Nutriente nanoestruturado', desc: 'Integra a linha de nutrientes nanoestruturados que otimizam a absorção pelas plantas.', apps: ['Agro'] },
  { n: 5, sym: 'B', name: 'Boro', form: 'Ácido bórico em escala nanométrica', desc: 'Nutrição vegetal eficiente, com absorção otimizada pelo tamanho reduzido das partículas.', apps: ['Agro'] },
  { n: 15, sym: 'P', name: 'Fósforo', form: 'Fosfatos em escala nanométrica', desc: 'Nutrição vegetal eficiente, com absorção otimizada pelo tamanho reduzido das partículas.', apps: ['Agro'] },
];

// Áreas de atuação (página Áreas + destaques da home)
export const areas = [
  {
    id: 'avicultura', featured: true,
    focus: 'Um dos principais focos da NanoBrasil no Brasil: levar nanopartículas antimicrobianas ao setor avícola.',
    gallery: [['areas/avicultura-2.webp', 'Manejo sanitário em instalações avícolas', 'photo'], ['areas/avicultura-colagem.webp', 'Nanocobre, do campo ao aviário', 'collage']],
    parts: [
      ['Nanocobre', 'Ação antimicrobiana sobre as bactérias e os fungos do ambiente de criação'],
      ['Óxido de zinco nanométrico', 'Atua junto ao cobre na inibição de bactérias e fungos'],
    ], tile: ['29', 'Cu', 'Cobre'], title: 'Avicultura', sub: 'Sanidade e controle microbiano', img: 'areas/avicultura.webp', els: ['Cu', 'Zn'],
    particles: 'Nanocobre e nanopartículas de óxido de zinco',
    text: 'A cama aviária reúne umidade, matéria orgânica e microrganismos ao longo de todo o ciclo de criação, e é um dos principais focos de contaminação do lote. As nanopartículas de cobre atuam como agentes antimicrobianos: em contato com bactérias e fungos, danificam suas estruturas e reduzem a carga microbiana do ambiente. Por serem muito menores, têm mais área de contato e podem agir com menor quantidade de ativo.',
    more: 'A pesquisa científica também aponta as nanopartículas metálicas como uma alternativa promissora para a produção de aves, em um cenário de busca por menor uso de antibióticos e de preocupação com a resistência microbiana. A NanoBrasil desenvolve e fornece essas nanopartículas estabilizadas e padronizadas, prontas para serem incorporadas em produtos para o setor.',
    how: [
      ['Nanopartícula estabilizada', 'Nanocobre e óxido de zinco em formulações padronizadas, prontas para o uso'],
      ['Ação por contato', 'Atuam sobre bactérias e fungos presentes no ambiente de criação'],
      ['Ambiente mais seguro', 'Menor carga microbiana, melhores condições sanitárias e menos riscos na produção'],
    ],
    highlights: [
      ['Controle de microrganismos na cama aviária', 'Ação antimicrobiana que melhora as condições sanitárias e reduz riscos na produção'],
      ['Apoio à sanidade do lote', 'Ambiente de criação com menor carga microbiana contribui para a saúde das aves'],
      ['Alternativa em um cenário de menos antibióticos', 'Agentes antimicrobianos de base metálica ampliam as opções de manejo sanitário'],
    ],
  },
  {
    id: 'tintas', featured: true,
    focus: 'Um dos principais focos da NanoBrasil no Brasil: nanopartículas para tintas e revestimentos de maior desempenho.',
    gallery: [['areas/tintas-2.webp', 'Tintas e revestimentos com desempenho por mais tempo', 'photo'], ['areas/tintas-colagem.webp', 'Dióxido de titânio em tintas e revestimentos', 'collage']],
    parts: [
      ['Cobre e óxido de zinco', 'Agentes antimicrobianos que inibem bactérias e fungos na superfície'],
      ['Dióxido de titânio', 'Melhora os revestimentos, protege contra a radiação UV e pode substituir a prata, reduzindo custos'],
      ['Carbonato de cálcio', 'Carga funcional que melhora a resistência e o acabamento'],
    ], tile: ['22', 'Ti', 'Titânio'], title: 'Tintas', sub: 'Tintas e revestimentos', img: 'areas/imagem-3.webp', els: ['Ti', 'Ca'],
    particles: 'Nanopartículas de dióxido de titânio e nanopartículas de carbonato de cálcio',
    text: 'A nanotecnologia aplicada a tintas e revestimentos utiliza nanopartículas de cobre e de óxido de zinco como agentes antimicrobianos, promovendo a inibição de bactérias e fungos e garantindo superfícies mais seguras e duráveis. Além disso, as nanopartículas de dióxido de titânio auxiliam na melhoria dos revestimentos e podem substituir o uso da prata em diferentes aplicações, reduzindo custos e aumentando a durabilidade e o desempenho das tintas, especialmente em aplicações em pó.',
    more: 'Em tintas e revestimentos, o desempenho depende de como a partícula se distribui na formulação. Em escala nanométrica, as partículas têm muito mais área de contato com a resina, o que favorece a dispersão, o acabamento e a ação do ativo na superfície. O dióxido de titânio é conhecido pela proteção contra a radiação UV e, sob luz, pode ter ação fotocatalítica, que contribui para superfícies autolimpantes e para a inibição de microrganismos. O carbonato de cálcio nanométrico atua como carga funcional, melhorando propriedades como resistência e acabamento.',
    how: [
      ['Dispersão na formulação', 'Nanopartículas estabilizadas são incorporadas à tinta, ao verniz ou ao pó sem perder suas propriedades'],
      ['Ação na superfície', 'Cobre e óxido de zinco inibem bactérias e fungos, e o dióxido de titânio protege contra a radiação UV'],
      ['Desempenho por mais tempo', 'Menor degradação do revestimento e propriedades mantidas ao longo do uso'],
    ],
    highlights: [
      ['Proteção antimicrobiana ativa', 'Inibição de bactérias e fungos, garantindo superfícies mais seguras e duráveis'],
      ['Maior durabilidade e desempenho', 'Redução de degradação, com manutenção das propriedades por mais tempo'],
    ],
  },
  {
    id: 'agro', title: 'Agro', sub: 'Defensivos e nutrição', img: 'areas/imagem-2.webp', els: ['Cu', 'Zn'],
    particles: 'Nanocobre e nanopartículas de óxido de zinco',
    text: 'A nanotecnologia agroindustrial utiliza nanocobre (99,97% metálico) como defensivo eficaz, com ação 700x superior contra patógenos. A NanoBrasil integra nutrientes nanoestruturados: óxido de zinco, dióxido de silício, selênio e carbonato de cálcio ecológico, além de ácido bórico e fosfatos em escala nanométrica, que otimizam absorção pelas plantas. Essas soluções aumentam a produtividade e reduzem perdas, garantindo proteção rápida e nutrição eficiente, superando métodos convencionais pelo tamanho reduzido das partículas.',
    highlights: [
      ['Eficiência ampliada nos defensivos agrícolas', 'Liberação controlada dos ativos, reduzindo perdas e aumentando a eficácia no campo'],
      ['Nutrição mais eficiente para as plantas', 'Nutrientes em escala nanométrica que otimizam a absorção e reduzem perdas'],
    ],
  },
  {
    id: 'home-care', title: 'Home care', sub: 'Cuidados da casa, pessoais e farmacêutica', img: 'areas/imagem-4.webp', els: ['Cu', 'Zn', 'Ti'],
    particles: 'Nanocobre, nanozinco, nanotitânio',
    text: 'A nanotecnologia oferece soluções multifacetadas: as nanopartículas de cobre atuam como biocidas em produtos domésticos, promovendo desinfecção prolongada e esterilização, enquanto as nanopartículas de óxido de zinco e de dióxido de titânio garantem proteção solar segura em cosméticos. Na dermocosmética, as nanopartículas de cobre estimulam a produção de colágeno e elastina, potencializando produtos antirrugas e cicatrizantes. Na área farmacêutica, aditivos nanotecnológicos aumentam a absorção e reduzem perdas digestivas. Essas inovações combinam eficiência, segurança e ação prolongada, ampliando as possibilidades nos cuidados domiciliares, pessoais e terapêuticos com precisão nanométrica.',
    highlights: [
      ['Ação antimicrobiana avançada', 'Redução de microrganismos em superfícies e materiais de uso cotidiano'],
      ['Tecnologia aplicada à cicatrização', 'Filmes e adesivos que auxiliam na regeneração da pele com mais eficiência'],
    ],
  },
  {
    id: 'polimeros', title: 'Polímeros', sub: 'Plásticos resistentes e antichamas', img: 'areas/imagem-2-1.webp', els: ['Ca', 'Si', 'Ti'],
    particles: 'Nanopartículas de carbonato de cálcio, de silício e de dióxido de titânio',
    text: 'Na área de polímeros, as nanopartículas de carbonato de cálcio são utilizadas para aumentar a resistência mecânica de embalagens, possibilitando a redução da quantidade de matéria-prima necessária para atingir o mesmo desempenho. Além disso, as nanopartículas de silício e de dióxido de titânio atuam como aditivos com potencial antichamas, contribuindo para maior segurança e desempenho dos materiais.',
    highlights: [
      ['Embalagens mais resistentes e seguras', 'Melhoria nas propriedades mecânicas e maior proteção ao produto'],
      ['Propriedades antichamas', 'Redução da inflamabilidade, aumentando a segurança dos materiais'],
    ],
  },
  {
    id: 'construcao', title: 'Construção', sub: 'Resistência de concreto e cimento', img: 'areas/imagem-1-1.webp', els: ['Si', 'Al'],
    particles: 'Nanopartículas de dióxido de alumínio e silício',
    text: 'As nanopartículas ecológicas de carbonato de cálcio, de dióxido de titânio e de óxido de zinco aumentam as propriedades mecânicas, como resistência ao atrito, à compressão, ao impacto, à flexão e à tração – e a durabilidade dos materiais, sendo aplicadas na produção de compostos cimentícios e de concreto ativado por álcalis de alto desempenho.',
    highlights: [
      ['Maior resistência estrutural', 'Reforço em cimento e concreto, aumentando durabilidade e desempenho'],
      ['Redução de impacto ambiental', 'Otimização de materiais que contribui para menor emissão de CO₂'],
    ],
  },
  {
    id: 'textil', title: 'Têxtil', sub: 'Tecidos naturais ou sintéticos', img: 'areas/imagem-7.webp', els: ['Cu', 'Zn'],
    particles: 'Nanopartículas de cobre e de óxido de zinco',
    text: 'As nanopartículas de cobre e de óxido de zinco podem ser incorporadas em tecidos naturais ou sintéticos, conferindo propriedades antimicrobianas contra bactérias e fungos, e inseticidas contra ácaros e pequenos insetos, atuando por mecanismos de estresse oxidativo e dano às estruturas celulares desses organismos.',
    highlights: [
      ['Proteção inseticida em tecidos', 'Aplicação têxtil que afasta insetos sem comprometer o conforto'],
    ],
  },
  {
    id: 'pet', title: 'Pet', sub: 'Areia de gato e produtos animais', img: 'areas/imagem-8.webp', els: ['Cu', 'Zn'],
    particles: 'Nanopartículas de cobre e de óxido de zinco',
    text: 'A nanotecnologia aplicada ao segmento pet permite avanços significativos no controle de odores e na higiene de ambientes. Nanopartículas de cobre e óxido de zinco atuam diretamente na inibição de bactérias e fungos responsáveis pelo mau cheiro, prolongando a eficiência da areia de gato e reduzindo a necessidade de trocas frequentes. Além disso, essas tecnologias contribuem para ambientes mais seguros e saudáveis para os animais, com ação contínua e maior durabilidade dos produtos, elevando o padrão de qualidade no cuidado diário.',
    highlights: [
      ['Controle de odores em ambientes pet', 'Tecnologia que reduz odores indesejados, melhorando a experiência do usuário'],
    ],
  },
  {
    id: 'saude', title: 'Saúde', sub: 'Adesivos curativos e antissépticos', img: 'areas/imagem-9.webp', els: ['Cu', 'Zn'],
    particles: 'Nanopartículas de cobre e de óxido de zinco',
    text: 'Na área da saúde, a nanotecnologia potencializa o desempenho de adesivos curativos e soluções antissépticas por meio da ação antimicrobiana de nanopartículas de cobre e óxido de zinco. Esses materiais atuam no controle de microrganismos, auxiliando na prevenção de infecções e criando um ambiente mais favorável à cicatrização. A atuação em escala nanométrica permite maior contato com a superfície da pele e liberação eficiente dos ativos, resultando em produtos mais eficazes, seguros e alinhados às demandas de inovação em cuidados com a saúde.',
    highlights: [
      ['Inovação em saúde com o Poof', 'Nanotecnologia para viabilizar a evolução do álcool em gel: mata vírus (como Covid-19) sem ressecar a pele'],
    ],
  },
];

export const clients = [
  ['basf.webp', 'BASF'], ['ctnano.webp', 'CTNano'], ['henkel.webp', 'Henkel'], ['nitro.webp', 'Nitro'], ['MCassab-768x310.webp', 'MCassab'],
  ['tigre.webp', 'Tigre'], ['vale.webp', 'Vale'], ['vibra.webp', 'Vibra'], ['weg-tintas.webp', 'WEG Tintas'],
];

export const team = [
  {
    group: 'Gestão', people: [
      { name: 'Lucio Coelho', role: 'Co-fundador & CEO', img: 'Lucio.webp', bio: 'Bacharel em Administração de Empresas (BBA) pela UFMG. Mestre em Administração de Empresas (MBA), Contabilidade e Finanças pela Uninter. Mestre em Administração de Empresas (MBA), Administração/gestão de hospitalidade através do Instituto Europeu de Gestão Internacional.' },
      { name: 'Oscar Geigner', role: 'Co-fundador & CCO', img: 'Oscar-1.webp', bio: 'Bacharel em Economia e pós graduado em Macro Economia pela Universidade Mackenzie, e outros cursos como Marketing Corporativo na ADVB e Negociação Avançada e Estratégias comerciais na FGV. Realizou trabalhos em consultoria comercial em várias empresas de inovação tecnológica e varejo como Motorola, Elmo calçados, Lojas Paquetá entre outras.' },
      { name: 'Paulo Moraes', role: 'Sócio conselheiro', img: 'img-paulo.webp', bio: 'Empreendedor nas áreas de varejo, imobiliária, tecnologia e mídia, Advogado, Pós graduado em Direito Empresarial, Auditor e Consultor Fiscal (Arthur Andersen), Conselheiro Certificado pela Fundação Dom Cabral (FDC), cursou também o Programa de Gestão Avançada – PGA pelo Instituto Europeu de Administração de Empresas – INSEAD na França.' },
      { name: 'Ney Prado', role: 'Sócio conselheiro', img: 'image-19-7.webp', bio: 'Sócio-fundador da Gulf Capital Partners.' },
    ],
  },
  {
    group: 'Equipe técnica', people: [
      { name: 'Manuel Rodríguez', role: 'Coordenador de Inovação e Desenvolvimento', img: 'Manuel.webp', bio: 'Estudante de doutorado em Química da Universidade Federal de Minas Gerais e Mestre em Inovação Tecnológica e Biofarmaceutica pela mesma instituição. Formado em Química Industrial e Tecnológica, atua na área de Nanociência e Nanotecnologia, Propriedade Intelectual, Química Orgânica e Inorgânica, com experiência em atividades inerentes à nanotecnologia. Foi líder do grupo de pesquisa em Biotecnologia – Productos Naturales (GB-PN) entre 2018 e 2019.' },
      { name: 'Débora Ribeiro', role: 'Coordenadora de P&D', img: 'Debora.webp', bio: 'Estudante de Doutorado em Química pela UFMG, com ênfase no estudo e aplicação de nanomateriais voltados à melhoria da estabilidade de biocombustíveis. Mestre em Química pela mesma instituição, com atuação na aplicação de técnicas analíticas (GC-MS, UV-Vis, FTIR, ICP-OES, Raman, entre outras) aliadas à modelagem de dados por quimiometria na área de biocombustíveis. Possui sólida experiência em laboratório, abrangendo desde a pesquisa acadêmica até aplicações industriais. Graduada em Química (Bacharelado) pela UFMG, com quatro anos de iniciação científica em eletroquímica e nanomateriais, incluindo o desenvolvimento de eletrodos à base de nanomateriais de carbono e eletrólitos poliméricos em gel para supercapacitores.' },
      { name: 'Ana Gabriela Fernandes', role: 'Coordenadora de Projetos', img: 'Ana-Gabriela.webp', bio: 'Mestranda em Inovação Tecnológica pela UFMG, com ênfase em Nanotecnologia, Novos Materiais e Sustentabilidade. Cursa MBA em Gestão Empresarial pela FGV. Engenheira Química com experiência em pesquisa e desenvolvimento de novos materiais, adquirida por meio de projetos de iniciação científica e estágios. Detém ampla vivência na gestão de projetos em contextos de alta complexidade tecnológica (deep tech), com destaque para competências em planejamento estratégico, liderança de equipes multidisciplinares e desenvolvimento de soluções inovadoras voltadas à integração entre ciência, tecnologia e mercado.' },
      { name: 'Rochel Montero Lago', role: 'Consultor acadêmico na área de Inovação e Tecnologia', img: 'image-19.webp', bio: 'Professor titular e pesquisador da Universidade Federal de Minas Gerais (UFMG), com atuação em química e inovação, com foco no desenvolvimento de tecnologias e na interação universidade-indústria. Possui mais de 30 anos de experiência em áreas como catálise, meio ambiente, materiais, com cerca de 35 patentes e tecnologias escalonadas até a fase piloto. Com atuação em projetos de empreendedorismo, transferência de tecnologia e inovação, além de reconhecimento por prêmios nacionais e internacionais na área.' },
      { name: 'Yasmin Carvalho', role: 'Pesquisadora júnior', img: 'Yasmim.webp', bio: 'Graduanda em Química Tecnológica pela Universidade Federal de Minas Gerais (UFMG), com formação técnica em Química. Possui experiência em controle de qualidade em indústrias de alimentos e lubrificantes e atuação em áreas como catálise, mineração, óleos vegetais, suplementação alimentar e geopolímeros, com foco em pesquisa, desenvolvimento e escalonamento.' },
      { name: 'Henrique Alves', role: 'Técnico de laboratório', img: 'Henrique.webp', bio: 'Profissional da área de Laboratório, graduando em Química pela Universidade Federal de Minas Gerais (UFMG). Atua como Técnico de Laboratório na NanoBrasil, desenvolvendo atividades relacionadas à rotina laboratorial, preparo e análise de amostras, execução de procedimentos e controle experimental. Possui experiência em práticas de bancada, preparo de soluções, análises físico-químicas, registro e tratamento de dados, além de elaboração de relatórios técnicos. Sua formação acadêmica e experiência em pesquisa complementam sua atuação profissional, contribuindo para uma visão técnica, organizada e voltada à qualidade dos processos laboratoriais.' },
    ],
  },
  {
    group: 'Adm/Financeiro', people: [
      { name: 'André Jau', role: 'Coordenador administrativo', img: 'Base-equipe-NanoBrasil-1.webp', bio: 'Profissional com mais de 25 anos de experiência em gestão e administração de empresas dos ramos de produção industrial metalmecânica e mineração. Gestor em grandes corporações do ramo metalúrgico e siderúrgico. Como gestor de relações trabalhistas. Liderança em processo de grandes mobilizações de mão de obra para o ramo siderúrgico, cimenteiro, mineração e serviços portuários. Formação em administração e MBA em gestão de pessoas.' },
      { name: 'Ludimila Rosa', role: 'Coordenadora financeira', img: 'Ludimila.webp', bio: 'Formada em Gestão Financeira e Contábil pela PUC e com MBA em Finanças e Controladoria pelo Ibmec, atuando na gestão financeira e contábil, com foco em controladoria, planejamento orçamentário, fluxo de caixa, DRE e balancete mensal. Especialista na análise de informações e elaboração de relatórios estratégicos, apoiando decisões empresariais e garantindo precisão e eficiência nos processos financeiros da empresa. Acumula experiência em análise de indicadores, liderança, orientação de investimentos e implementação de práticas de governança, contribuindo para o fortalecimento sustentável e estratégico da organização.' },
    ],
  },
];
