// Dados centralizados de todos os artigos e página pilar
// Conteúdo baseado exatamente no documento de planejamento do escritório

export const WHATSAPP_BASE = "https://wa.me/5574999443002";

export const WHATSAPP_MESSAGES = {
  geral: "Olá, vim pelo site e gostaria de uma análise do meu caso trabalhista. Trabalhei em uma situação que acredito estar irregular.",
  semCarteira: "Olá, trabalhei sem carteira assinada e gostaria de entender meus direitos.",
  horasExtras: "Olá, trabalhei e acho que não recebi todas as minhas horas extras. Gostaria de entender meus direitos.",
  insalubridade: "Olá, trabalho em ambiente que pode ser insalubre e gostaria de uma análise do meu caso.",
  periculosidade: "Olá, trabalho em atividade de risco e nunca recebi adicional de periculosidade. Gostaria de entender meus direitos.",
  cooperado: "Olá, trabalho como cooperado mas desconfio da minha situação. Gostaria de uma análise.",
};

export function whatsappLink(msg: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
}

export interface ArticleLink {
  href: string;
  label: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  highlight?: string; // caixa dourada de destaque
  links?: ArticleLink[]; // interlinkagem
  subSections?: { heading: string; paragraphs?: string[]; highlight?: string }[];
}

export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: ArticleSection[];
  relatedLinks: ArticleLink[];
  ctaMessage: string;
}

// ─── ARTIGO 1 ─────────────────────────────────────────────────────────────────
export const artigoSemCarteira: Article = {
  slug: "sem-carteira",
  title: "Trabalhei Sem Carteira Assinada: Quais São Meus Direitos em Salvador?",
  metaDescription: "Trabalhou sem carteira assinada em Salvador? Saiba quais são seus direitos, como provar o vínculo e quanto pode receber. Atendimento trabalhista especializado.",
  intro: "Trabalhar sem carteira assinada ainda é uma realidade comum em Salvador. Muitas pessoas aceitam essa condição por necessidade, mas acabam ficando sem saber quais direitos podem cobrar depois. A boa notícia é que, mesmo sem registro, a lei protege o trabalhador.",
  sections: [
    {
      heading: "Trabalhei Sem Carteira: Tenho Direito Mesmo Assim?",
      paragraphs: ["Sim. Se você trabalhou com horário definido, subordinação (recebia ordens), pagamento frequente e continuidade no trabalho, isso pode caracterizar vínculo empregatício.", "Ou seja: a empresa deveria ter assinado sua carteira."],
      list: ["Horário definido", "Subordinação (recebia ordens)", "Pagamento frequente", "Continuidade no trabalho"],
    },
    {
      heading: "Quais Direitos Posso Receber?",
      paragraphs: ["Se o vínculo for reconhecido, você pode ter direito a:"],
      list: ["Salários atrasados", "Férias + 1/3", "13º salário", "FGTS + multa de 40%", "Aviso prévio", "Horas extras"],
      links: [
        { href: "/guia/horas-extras", label: "Horas extras não pagas: como calcular e cobrar seus direitos em Salvador" },
        { href: "/guia/insalubridade", label: "Insalubridade: como saber se você tem direito ao adicional" },
        { href: "/guia/periculosidade", label: "Periculosidade: quem tem direito e como comprovar" },
      ],
    },
    {
      heading: "Como Provar que Trabalhei Sem Carteira?",
      paragraphs: ["Essa é a principal dúvida — e muita gente acha que não tem como provar. Mas você pode usar:"],
      list: ["Conversas no WhatsApp", "Comprovantes de pagamento (PIX, dinheiro, etc.)", "Fotos no local de trabalho", "Testemunhas", "Uniforme ou crachá"],
      highlight: "A Justiça do Trabalho aceita diversos tipos de prova.",
    },
    {
      heading: "Exemplo Prático (Realidade Comum em Salvador)",
      paragraphs: ["Imagine um trabalhador em Salvador que trabalha em loja no comércio, cumpre horário fixo, recebe semanalmente e nunca teve carteira assinada.", "Nesse caso, há fortes indícios de vínculo — e ele pode cobrar todos os direitos retroativos."],
    },
    {
      heading: "Quanto Posso Receber?",
      paragraphs: ["Depende de fatores como tempo de trabalho, salário, benefícios não pagos e horas extras. Em muitos casos, o valor é bem maior do que o trabalhador imagina."],
    },
    {
      heading: "Vale a Pena Processar a Empresa?",
      paragraphs: ["Se houve irregularidade, sim. Principalmente quando o tempo de trabalho foi longo, não houve registro e existem provas mínimas."],
      highlight: "A análise correta evita riscos desnecessários.",
    },
    {
      heading: "Existe Prazo Para Entrar com Ação?",
      paragraphs: ["Sim. Você pode cobrar direitos dos últimos 5 anos, contados a partir do momento que decide agir."],
      highlight: "Por isso, o tempo é importante. Não deixe passar.",
    },
    {
      heading: "Quando Procurar um Advogado Trabalhista?",
      paragraphs: ["Você deve procurar ajuda se trabalhou sem carteira, foi demitido sem receber tudo ou tem dúvidas sobre seus direitos.", "Quanto antes analisar, melhor — porque há prazos legais."],
    },
  ],
  relatedLinks: [
    { href: "/guia/horas-extras", label: "Horas extras não pagas: como calcular e cobrar" },
    { href: "/guia/insalubridade", label: "Insalubridade: quem tem direito ao adicional" },
    { href: "/guia/periculosidade", label: "Periculosidade: quando a empresa deve pagar 30%" },
    { href: "/guia/cooperado", label: "Cooperado tem direito trabalhista?" },
  ],
  ctaMessage: WHATSAPP_MESSAGES.semCarteira,
};

// ─── ARTIGO 2 ─────────────────────────────────────────────────────────────────
export const artigoHorasExtras: Article = {
  slug: "horas-extras",
  title: "Horas Extras Não Pagas: Como Calcular e Cobrar Seus Direitos em Salvador",
  metaDescription: "Trabalhou além do horário e não recebeu? Saiba como calcular horas extras, identificar irregularidades e cobrar seus direitos em Salvador. Advogado trabalhista especializado.",
  intro: "Trabalhar além do horário e não receber por isso é uma situação comum em Salvador. Muitos trabalhadores fazem horas extras todos os dias, mas não sabem quanto deveriam receber — ou se estão sendo prejudicados. Se esse é o seu caso, este guia vai te mostrar de forma direta o que fazer.",
  sections: [
    {
      heading: "O Que São Horas Extras?",
      paragraphs: ["Horas extras são todas as horas trabalhadas além da jornada normal, que geralmente é de 8 horas por dia ou 44 horas por semana.", "Qualquer tempo além disso deve ser pago com adicional."],
    },
    {
      heading: "Quanto Vale uma Hora Extra?",
      paragraphs: ["A lei determina que a hora extra deve ter um acréscimo de, no mínimo:"],
      list: ["50% sobre o valor da hora normal (dias comuns)", "100% em domingos e feriados"],
    },
    {
      heading: "Como Calcular Horas Extras (Simples)",
      paragraphs: [
        "Exemplo prático: salário de R$ 1.320 com jornada de 220 horas/mês.",
        "Valor da hora normal: R$ 1.320 ÷ 220 = R$ 6,00",
        "Hora extra (50%): R$ 6,00 + 50% = R$ 9,00",
        "Se você fizer 2 horas extras por dia, isso pode gerar um valor significativo ao longo do mês.",
      ],
    },
    {
      heading: "Situações Comuns em Salvador",
      paragraphs: ["Muitos trabalhadores passam por isso:"],
      list: ["Ficam além do horário sem receber", "Trabalham no sábado ou domingo sem adicional", "Batem ponto errado ou nem batem ponto", "São 'obrigados' a compensar sem banco de horas válido"],
      highlight: "Essas práticas podem ser irregulares.",
    },
    {
      heading: "Banco de Horas: Nem Sempre é Válido",
      paragraphs: ["A empresa pode usar banco de horas, mas somente se houver acordo formal e as compensações forem feitas corretamente.", "Caso contrário, o trabalhador pode cobrar todas as horas extras."],
    },
    {
      heading: "Como Provar Horas Extras?",
      paragraphs: ["Mesmo sem ponto registrado, é possível provar:"],
      list: ["Conversas no WhatsApp", "Registros de entrada/saída", "Testemunhas", "Localização ou rotina de trabalho"],
      highlight: "A prova não depende apenas da empresa.",
    },
    {
      heading: "Trabalhei Sem Carteira: Posso Cobrar Horas Extras?",
      paragraphs: ["Sim. Se houver vínculo, você pode cobrar horas extras normalmente."],
      links: [{ href: "/guia/sem-carteira", label: "Trabalhei sem carteira assinada: quais são meus direitos em Salvador?" }],
    },
    {
      heading: "Quanto Posso Receber?",
      paragraphs: ["Depende de quantidade de horas extras, tempo de trabalho e salário. Em alguns casos, o valor acumulado pode ser alto, principalmente quando o problema acontece por meses ou anos."],
    },
    {
      heading: "Vale a Pena Processar a Empresa?",
      paragraphs: ["Vale quando há horas extras não pagas, o banco de horas é irregular ou não existe controle de jornada adequado.", "Uma análise correta mostra se o processo compensa."],
    },
  ],
  relatedLinks: [
    { href: "/guia/sem-carteira", label: "Trabalhei sem carteira assinada: quais são meus direitos?" },
    { href: "/guia/insalubridade", label: "Insalubridade: como saber se você tem direito" },
    { href: "/guia/periculosidade", label: "Periculosidade: quem tem direito ao adicional de 30%" },
  ],
  ctaMessage: WHATSAPP_MESSAGES.horasExtras,
};

// ─── ARTIGO 3 ─────────────────────────────────────────────────────────────────
export const artigoInsalubridade: Article = {
  slug: "insalubridade",
  title: "Insalubridade: Como Saber se Você Tem Direito e Quanto Deve Receber em Salvador",
  metaDescription: "Trabalha exposto a produtos químicos, calor ou risco biológico? Saiba se tem direito ao adicional de insalubridade e quanto pode receber em Salvador.",
  intro: "Muitos trabalhadores em Salvador atuam expostos a calor, produtos químicos, poeira, barulho ou risco biológico — e não recebem nada a mais por isso. Se você trabalha nessas condições, pode ter direito ao adicional de insalubridade, mesmo que a empresa nunca tenha mencionado isso.",
  sections: [
    {
      heading: "O Que é Insalubridade?",
      paragraphs: ["Insalubridade ocorre quando o trabalhador está exposto a agentes que prejudicam a saúde, como:"],
      list: ["Calor excessivo", "Ruído alto", "Produtos químicos", "Poeira", "Vírus e bactérias"],
      highlight: "Isso é comum em áreas como construção, limpeza, hospitais, indústrias e serviços gerais.",
    },
    {
      heading: "Quem Tem Direito ao Adicional de Insalubridade?",
      paragraphs: ["Tem direito quem trabalha exposto a agentes nocivos acima dos limites permitidos por lei.", "Alguns exemplos comuns:"],
      list: ["Auxiliar de limpeza (produtos químicos)", "Trabalhador da construção civil", "Profissionais da saúde", "Pessoas que trabalham sob sol intenso diariamente"],
      highlight: "Cada caso precisa ser analisado individualmente.",
    },
    {
      heading: "Quanto é o Adicional de Insalubridade?",
      paragraphs: ["O valor varia conforme o grau:"],
      list: ["10% (grau mínimo)", "20% (grau médio)", "40% (grau máximo)"],
      highlight: "O cálculo geralmente é feito sobre o salário mínimo.",
    },
    {
      heading: "Precisa de Perícia?",
      paragraphs: ["Sim. Para comprovar insalubridade, normalmente é feita uma perícia técnica no processo.", "Mas atenção: você não precisa ter o laudo antes — o advogado pode solicitar isso durante a ação."],
    },
    {
      heading: "Situações Comuns em Salvador",
      paragraphs: ["Casos frequentes:"],
      list: ["Trabalhador exposto ao sol o dia inteiro", "Uso constante de produtos químicos", "Ambiente com poeira ou sujeira intensa", "Contato com lixo ou material contaminado"],
      highlight: "Muitas dessas situações geram direito ao adicional.",
    },
    {
      heading: "Trabalhei Sem Carteira: Tenho Direito à Insalubridade?",
      paragraphs: ["Sim. Se for reconhecido vínculo, você pode cobrar salário, FGTS e também o adicional de insalubridade."],
      links: [{ href: "/guia/sem-carteira", label: "Trabalhei sem carteira assinada: quais são meus direitos em Salvador?" }],
    },
    {
      heading: "Diferença Entre Insalubridade e Periculosidade",
      paragraphs: ["Insalubridade é o risco à saúde ao longo do tempo. Periculosidade é o risco imediato de vida."],
      highlight: "Normalmente, não é possível acumular os dois — vale o mais vantajoso.",
      links: [{ href: "/guia/periculosidade", label: "Periculosidade: quem tem direito ao adicional de 30%" }],
    },
    {
      heading: "Quanto Posso Receber?",
      paragraphs: ["Depende de tempo de exposição, grau da insalubridade e salário. Se o trabalhador ficou anos sem receber, o valor pode ser relevante."],
    },
  ],
  relatedLinks: [
    { href: "/guia/sem-carteira", label: "Trabalhei sem carteira assinada: quais são meus direitos?" },
    { href: "/guia/horas-extras", label: "Horas extras não pagas: como calcular e cobrar" },
    { href: "/guia/periculosidade", label: "Periculosidade: quem tem direito ao adicional de 30%" },
  ],
  ctaMessage: WHATSAPP_MESSAGES.insalubridade,
};

// ─── ARTIGO 4 ─────────────────────────────────────────────────────────────────
export const artigoPericulosidade: Article = {
  slug: "periculosidade",
  title: "Periculosidade: Quando a Empresa Deve Pagar 30% e Como Identificar Irregularidades em Salvador",
  metaDescription: "Trabalha em atividade de risco em Salvador e nunca recebeu adicional de periculosidade? Saiba quando a empresa deve pagar 30% e como cobrar seus direitos.",
  intro: "Se você trabalha exposto a risco e nunca recebeu adicional, existe uma chance real de estar deixando dinheiro na mesa todos os meses. Em Salvador, isso acontece com frequência em atividades como motoboy, vigilância, postos de combustível e serviços com eletricidade. A questão central não é o cargo — é o risco real da atividade.",
  sections: [
    {
      heading: "O Erro Mais Comum das Empresas",
      paragraphs: ["Muitas empresas simplesmente não pagam o adicional, alegam que 'não se aplica ao cargo' ou ignoram completamente a exposição ao risco."],
      highlight: "A lei não analisa o nome do cargo, mas sim como o trabalho é executado na prática.",
    },
    {
      heading: "Quando Existe Direito à Periculosidade",
      paragraphs: ["Você pode ter direito ao adicional de 30% quando há:"],
      list: ["Contato com energia elétrica", "Trabalho com combustíveis ou inflamáveis", "Atividade de segurança/vigilância", "Exposição a situações com risco imediato de acidente grave"],
    },
    {
      heading: "Casos Reais (Muito Comuns em Salvador)",
      subSections: [
        { heading: "Motoboy", paragraphs: ["Trabalha diariamente no trânsito, exposto a acidentes constantes."], highlight: "Pode ter direito ao adicional de periculosidade." },
        { heading: "Frentista", paragraphs: ["Contato direto com combustíveis e exposição a inflamáveis."], highlight: "Direito clássico à periculosidade." },
        { heading: "Eletricista (ou ajudante)", paragraphs: ["Atua com rede elétrica, muitas vezes sem proteção adequada."], highlight: "Forte possibilidade de direito." },
        { heading: "Vigilante / Segurança", paragraphs: ["Risco direto à integridade física."], highlight: "Direito reconhecido com frequência na Justiça do Trabalho." },
      ],
    },
    {
      heading: "Quanto Deve Ser Pago?",
      paragraphs: ["30% sobre o salário base, todos os meses.", "Esse valor reflete em outras verbas como férias, 13º salário e FGTS. Ou seja, o impacto financeiro é maior do que parece."],
    },
    {
      heading: "Como Identificar se Você Está Sendo Prejudicado",
      paragraphs: ["Sinais claros:"],
      list: ["Você trabalha em risco e não recebe adicional", "Seu contracheque não menciona 'periculosidade'", "A empresa nunca fez avaliação técnica", "Outros colegas também não recebem"],
      highlight: "Isso já justifica uma análise jurídica.",
    },
    {
      heading: "Precisa de Laudo Técnico?",
      paragraphs: ["Sim — mas você não precisa correr atrás disso sozinho.", "No processo, é possível solicitar perícia técnica no local e avaliação das condições reais de trabalho."],
    },
    {
      heading: "Insalubridade ou Periculosidade?",
      paragraphs: ["Não dá para acumular os dois. Mas existe um ponto estratégico: você pode escolher o adicional mais vantajoso.", "Isso depende de cálculo técnico."],
      links: [{ href: "/guia/insalubridade", label: "Insalubridade: como saber se você tem direito e quanto receber" }],
    },
    {
      heading: "Quanto Posso Receber na Prática?",
      paragraphs: ["Depende de tempo de trabalho, salário e outros direitos acumulados.", "Exemplo: um trabalhador que ficou 2 anos sem receber periculosidade pode ter um valor relevante a recuperar — principalmente com reflexos nas demais verbas."],
    },
    {
      heading: "Quando Vale a Pena Entrar com Processo?",
      list: ["Existe exposição clara ao risco", "A empresa não paga o adicional", "Há histórico de meses ou anos nessa condição"],
      highlight: "Nesses casos, a chance de recuperação é concreta.",
    },
  ],
  relatedLinks: [
    { href: "/guia/horas-extras", label: "Horas extras não pagas: como calcular e cobrar seus direitos" },
    { href: "/guia/sem-carteira", label: "Trabalhei sem carteira assinada: quais são meus direitos?" },
    { href: "/guia/insalubridade", label: "Insalubridade: como saber se você tem direito e quanto receber" },
  ],
  ctaMessage: WHATSAPP_MESSAGES.periculosidade,
};

// ─── ARTIGO 5 ─────────────────────────────────────────────────────────────────
export const artigoCooperado: Article = {
  slug: "cooperado",
  title: "Cooperado Tem Direito Trabalhista? Quando a Justiça Reconhece Vínculo em Salvador",
  metaDescription: "Trabalha como cooperado em Salvador mas cumpre rotina de funcionário? Saiba quando a Justiça reconhece vínculo empregatício e o que você pode receber.",
  intro: "Muitas empresas em Salvador utilizam o modelo de 'cooperativa' para contratar trabalhadores — mas, na prática, mantêm uma relação comum de emprego. O problema é que isso pode ser uma forma de burlar direitos trabalhistas. Se você trabalha como 'cooperado', mas cumpre rotina de funcionário, é possível que tenha direito a todos os benefícios da CLT.",
  sections: [
    {
      heading: "O Ponto Principal: Nem Toda Cooperativa é Legal",
      paragraphs: ["Existe uma diferença clara entre uma cooperativa legítima e uma cooperativa usada para esconder vínculo empregatício."],
      highlight: "É exatamente aqui que muitos trabalhadores são prejudicados.",
    },
    {
      heading: "Quando o Cooperado Pode Ter Direito Trabalhista?",
      paragraphs: ["A Justiça analisa o que acontece na prática. Se existirem esses elementos, pode haver vínculo:"],
      list: ["Subordinação (recebe ordens diretas)", "Horário fixo", "Pessoalidade (não pode mandar outra pessoa no lugar)", "Pagamento frequente", "Continuidade no serviço"],
      highlight: "Se isso acontece, pode não ser cooperativa — pode ser emprego disfarçado.",
    },
    {
      heading: "Situações Comuns em Salvador",
      subSections: [
        { heading: "Área da saúde", paragraphs: ["Profissionais vinculados a 'cooperativas' com escala fixa e coordenação direta."], highlight: "Forte indício de vínculo empregatício." },
        { heading: "Logística e entregas", paragraphs: ["Motoristas ou entregadores com controle de rota e exigência de cumprimento de horário."], highlight: "Pode caracterizar subordinação." },
        { heading: "Serviços gerais / terceirização", paragraphs: ["Limpeza, portaria, apoio operacional com trabalho contínuo dentro da empresa."], highlight: "Muitas vezes funciona como CLT disfarçado." },
      ],
    },
    {
      heading: "Se For Reconhecido Vínculo, O Que Posso Receber?",
      paragraphs: ["Se a Justiça reconhecer o vínculo, você pode cobrar:"],
      list: ["Registro em carteira (retroativo)", "Férias + 1/3", "13º salário", "FGTS + multa de 40%", "Aviso prévio", "Horas extras"],
      links: [
        { href: "/guia/horas-extras", label: "Horas extras não pagas: como calcular e cobrar seus direitos em Salvador" },
        { href: "/guia/sem-carteira", label: "Trabalhei sem carteira assinada: quais são meus direitos em Salvador?" },
      ],
    },
    {
      heading: "'Mas eu assinei contrato de cooperado…'",
      paragraphs: ["Isso não impede o reconhecimento de vínculo.", "O contrato não vale mais que a realidade. Se na prática você era tratado como funcionário, isso pode ser revertido."],
    },
    {
      heading: "Como Provar que Não Era Cooperativa de Verdade?",
      paragraphs: ["Alguns indícios ajudam muito:"],
      list: ["Escalas fixas", "Ordens diretas de superiores", "Controle de presença", "Pagamentos periódicos", "Falta de autonomia"],
      highlight: "Testemunhas também são muito importantes.",
    },
    {
      heading: "Quanto Posso Receber?",
      paragraphs: ["Depende de tempo de trabalho, remuneração e direitos não pagos.", "Em muitos casos, o valor acumulado pode ser alto — principalmente quando o vínculo dura anos."],
    },
    {
      heading: "Vale a Pena Processar?",
      paragraphs: ["Vale quando existe rotina de trabalho semelhante à CLT, há controle da empresa sobre você e não há liberdade real como cooperado."],
      highlight: "Nesses casos, a chance de reconhecimento é relevante.",
    },
  ],
  relatedLinks: [
    { href: "/guia/sem-carteira", label: "Trabalhei sem carteira assinada: quais são meus direitos?" },
    { href: "/guia/horas-extras", label: "Horas extras não pagas: como calcular e cobrar" },
    { href: "/guia/insalubridade", label: "Insalubridade: como saber se você tem direito e quanto deve receber" },
    { href: "/guia/periculosidade", label: "Periculosidade: quando a empresa deve pagar 30%" },
  ],
  ctaMessage: WHATSAPP_MESSAGES.cooperado,
};

// ─── TODOS OS ARTIGOS ──────────────────────────────────────────────────────────
export const ARTIGOS = [
  artigoSemCarteira,
  artigoHorasExtras,
  artigoInsalubridade,
  artigoPericulosidade,
  artigoCooperado,
];

// ─── PÁGINA PILAR ─────────────────────────────────────────────────────────────
export const PILLAR_CARDS = [
  {
    slug: "sem-carteira",
    label: "Trabalhei sem carteira assinada",
    desc: "Entenda como provar o vínculo e quais direitos pode cobrar retroativamente.",
  },
  {
    slug: "horas-extras",
    label: "Horas extras não pagas",
    desc: "Saiba calcular o valor devido e como cobrar os últimos 5 anos de jornada extra.",
  },
  {
    slug: "insalubridade",
    label: "Adicional de insalubridade",
    desc: "Descubra se sua atividade gera direito ao adicional de 10%, 20% ou 40%.",
  },
  {
    slug: "periculosidade",
    label: "Adicional de periculosidade",
    desc: "Motoboy, frentista, eletricista e vigilante têm direito a 30% sobre o salário.",
  },
  {
    slug: "cooperado",
    label: "Cooperado e vínculo empregatício",
    desc: "Quando a cooperativa é usada para burlar direitos e como reverter a situação.",
  },
];
