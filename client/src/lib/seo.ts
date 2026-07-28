export const SITE_URL = "https://www.batistaealvesadvocacia.com.br";

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export const SEO_HOME: SeoConfig = {
  title: "Batista & Alves Advocacia | Especialistas em Direito Trabalhista e Família",
  description:
    "Escritório de advocacia especialista em Direito Trabalhista e Direito de Família. Atendimento presencial e online com atuação estratégica para garantir seus direitos.",
  path: "/",
  ogTitle: "Batista & Alves Advocacia | Direito Trabalhista e Família",
  ogDescription:
    "Escritório especialista em Direito Trabalhista e Direito de Família. Atuação estratégica para garantir a proteção dos seus direitos e da sua família.",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Batista & Alves Advocacia",
    areaServed: { "@type": "City", name: "Salvador" },
    legalName: "Batista & Alves Advocacia",
    description: "Escritório especializado em Direito Trabalhista com atuação em Salvador.",
    telephone: "+55-74-99133-3391",
    url: `${SITE_URL}/`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salvador",
      addressRegion: "BA",
      addressCountry: "BR",
    },
  },
};

export const SEO_TRABALHISTA_MIGUEL_CALMON: SeoConfig = {
  title:
    "Advogado Trabalhista em Jacobina e Miguel Calmon | Rescisão, Horas Extras | Batista & Alves",
  description:
    "Advogado trabalhista em Jacobina e Miguel Calmon. Especialista em ações trabalhistas, rescisão, horas extras e reconhecimento de vínculo. Atendimento presencial em Miguel Calmon e remoto.",
  path: "/direito-trabalhista-jacobina-miguel-calmon",
  ogTitle: "Advogado Trabalhista em Jacobina e Miguel Calmon | Batista & Alves Advocacia",
  ogDescription:
    "Especialista em Direito do Trabalho em Jacobina e Miguel Calmon. Ações trabalhistas, rescisão, horas extras. Atendimento presencial e online.",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Batista & Alves Advocacia - Direito Trabalhista",
    areaServed: [
      { "@type": "City", name: "Jacobina" },
      { "@type": "City", name: "Miguel Calmon" },
    ],
    legalName: "Batista & Alves Advocacia",
    description:
      "Advogado trabalhista em Jacobina e Miguel Calmon. Especialista em ações trabalhistas, rescisão, horas extras e reconhecimento de vínculo. Atendimento presencial em Miguel Calmon e remoto.",
    telephone: "+55-74-99133-3391",
    url: `${SITE_URL}/direito-trabalhista-jacobina-miguel-calmon`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miguel Calmon",
      addressRegion: "BA",
      addressCountry: "BR",
    },
  },
};

export const SEO_FAMILIA_MIGUEL_CALMON: SeoConfig = {
  title:
    "Advogado de Família em Jacobina e Miguel Calmon | Divórcio, Guarda, Pensão | Batista & Alves",
  description:
    "Advogado de família em Jacobina e Miguel Calmon. Especialista em divórcio, guarda de filhos, pensão alimentícia, união estável e inventário. Atendimento presencial em Miguel Calmon e online para toda a região.",
  path: "/direito-de-familia-jacobina-miguel-calmon",
  ogTitle: "Advogado de Família em Jacobina e Miguel Calmon | Batista & Alves Advocacia",
  ogDescription:
    "Especialista em Direito de Família em Jacobina e Miguel Calmon. Divórcio, guarda, pensão, inventário. Atendimento presencial e online.",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: "Batista & Alves Advocacia - Direito de Família",
      areaServed: [
        { "@type": "City", name: "Jacobina" },
        { "@type": "City", name: "Miguel Calmon" },
      ],
      legalName: "Batista & Alves Advocacia",
      description:
        "Advogado de família em Jacobina e Miguel Calmon. Especialista em divórcio, guarda de filhos, pensão alimentícia, união estável e inventário. Atendimento presencial em Miguel Calmon e remoto para toda a região.",
      telephone: "+55-74-99133-3391",
      url: `${SITE_URL}/direito-de-familia-jacobina-miguel-calmon`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miguel Calmon",
        addressRegion: "BA",
        addressCountry: "BR",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de Direito de Família",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Divórcio consensual e litigioso" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pensão alimentícia" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Guarda de filhos" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inventário e partilha de bens" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "União estável" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reconhecimento de paternidade" } },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quanto custa um advogado de família em Jacobina ou Miguel Calmon?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Os honorários variam conforme a complexidade do caso. O Batista & Alves Advocacia oferece uma primeira consulta para avaliação do caso, com valores acessíveis e possibilidade de parcelamento. Entre em contato pelo WhatsApp para saber mais.",
          },
        },
        {
          "@type": "Question",
          name: "Preciso ir presencialmente ao escritório?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O escritório possui atendimento presencial em Miguel Calmon. Para quem está em Jacobina ou outras cidades da região, também realizamos atendimento por videochamada com total segurança jurídica.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto tempo demora um divórcio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O divórcio consensual em cartório pode ser concluído em poucos dias. Já o litigioso depende da complexidade, podendo levar de alguns meses a mais de um ano.",
          },
        },
        {
          "@type": "Question",
          name: "Como funciona a pensão alimentícia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A pensão alimentícia é fixada com base nas necessidades de quem recebe e nas possibilidades de quem paga. Pode ser definida por acordo ou por decisão judicial.",
          },
        },
      ],
    },
  ],
};

export const SEO_GUIA: SeoConfig = {
  title: "Direitos Trabalhistas em Salvador: Guia Completo | Batista & Alves",
  description:
    "Guia completo sobre direitos trabalhistas em Salvador. Saiba o que você pode cobrar em casos de horas extras, insalubridade, trabalho sem carteira e mais.",
  path: "/guia",
};
