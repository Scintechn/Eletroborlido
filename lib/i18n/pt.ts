import type { Dictionary } from "./types";

/**
 * European Portuguese (pt-PT) translation. Must match the `Dictionary` shape
 * derived from `en.ts` exactly — the TypeScript compiler enforces full parity.
 */
export const pt: Dictionary = {
  meta: {
    locale: "pt",
    ogLocale: "pt_PT",
    siteName: "Eletroborlido",
    titleTemplate: "%s | Eletroborlido",
    defaultTitle:
      "Eletroborlido — Instalações Elétricas e Domótica em Viana do Castelo",
    defaultDescription:
      "Instalações elétricas profissionais, sistemas de segurança e automatismos de portões, instalação de carregadores para veículos elétricos, domótica, e venda e reparação de eletrodomésticos em Viana do Castelo (Santa Marta de Portuzelo). Serviço local fiável desde 2018.",
    servicesTitle: "Serviços",
    contactTitle: "Contacto",
  },

  nav: {
    home: "Início",
    services: "Serviços",
    contact: "Contacto",
    requestQuote: "Pedir Orçamento Grátis",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    primaryLabel: "Navegação principal",
    mobileLabel: "Navegação móvel",
    skipToContent: "Saltar para o conteúdo",
    languageSwitcherLabel: "Escolher idioma",
  },

  whatsapp: {
    label: "WhatsApp",
    ariaLabel: "Falar connosco no WhatsApp (abre numa nova aba)",
    prefill: "Olá! Gostaria de pedir um orçamento gratuito.",
  },

  home: {
    hero: {
      eyebrow: "Viana do Castelo · Desde 2018",
      title:
        "Instalações Elétricas, Segurança e Carregamento de EV com Rigor Profissional",
      subtitle:
        "Instalações elétricas, sistemas de segurança e carregadores para veículos elétricos — executados por técnicos certificados, com a fiabilidade que a sua casa ou empresa merece.",
      primaryCta: "Pedir Orçamento Grátis",
      secondaryCta: "Ver Serviços",
      trustNote: "Empresa certificada. Orçamentos sem compromisso.",
      badge: "Empresa certificada desde 2018",
      panel: {
        title: "Controlo de Casa Inteligente",
        status: "Ligado",
        rows: {
          lighting: "Iluminação",
          climate: "Climatização",
          security: "Segurança",
          gate: "Portão",
        },
      },
    },
    stats: {
      heading: "A confiança de famílias e empresas em todo o Minho",
      items: [
        { value: "8+", label: "Anos de experiência", dynamic: "yearsExperience" },
        { value: "500+", label: "Projetos concluídos" },
        { value: "24h", label: "Tempo de resposta" },
        { value: "100%", label: "Foco na satisfação" },
      ],
    },
    about: {
      eyebrow: "Sobre Nós",
      title: "Rigor profissional desde 2018 em Santa Marta de Portuzelo",
      paragraphs: [
        "A Eletroborlido foi fundada em 2018 como uma empresa local e de espírito familiar, ao serviço de Viana do Castelo e de toda a região do Minho. Aliamos trabalho técnico certificado a um aconselhamento honesto e transparente.",
        "Combinamos duas atividades complementares: o comércio de material elétrico profissional e eletrodomésticos, e a prestação de serviços técnicos especializados — instalação elétrica, reparações, sistemas de segurança e automatismos.",
        "Todos os trabalhos são acompanhados por técnicos qualificados, orçamento por escrito e apoio pós-venda dedicado. Para nós, fiabilidade não é uma palavra de ordem — é o que nos permite manter os nossos clientes ao longo dos anos.",
      ],
      features: [
        "Empresa certificada e registada",
        "Técnicos qualificados e experientes",
        "Garantia em todas as instalações",
        "Apoio pós-venda dedicado",
      ],
      foundedIn: "Fundada em",
      cta: "Falar connosco",
    },
    servicesSection: {
      eyebrow: "Os Nossos Serviços",
      title: "Soluções completas para o seu imóvel",
      subtitle:
        "Seja uma nova instalação, uma casa mais inteligente ou uma reparação fiável — cobrimos todo o ciclo de vida.",
      viewAll: "Ver todos os serviços",
      cardCta: "Saber mais",
    },
    ctaBand: {
      title: "Pronto para começar o seu projeto?",
      subtitle:
        "Entre em contacto hoje e receba um orçamento gratuito e sem compromisso, à medida das suas necessidades.",
      button: "Pedir Orçamento Grátis",
      phonePrefix: "Ou ligue-nos:",
    },
  },

  services: {
    hero: {
      eyebrow: "Os Nossos Serviços",
      title:
        "Eletricidade, automação e eletrodomésticos — tudo num só lugar",
      subtitle:
        "A Eletroborlido atua em duas áreas oficiais: o comércio por grosso e a retalho de material elétrico e eletrodomésticos, e a prestação de serviços técnicos especializados.",
    },
    items: [
      {
        id: "electrical-installations",
        icon: "zap",
        title: "Instalações Elétricas",
        short: "Quadros, cablagem, monofásico e trifásico, certificações.",
        description:
          "Instalações elétricas completas para habitação, comércio e indústria — projetadas, executadas e certificadas de acordo com as normas em vigor.",
        features: [
          "Novas instalações e remodelações totais",
          "Quadros e circuitos monofásicos e trifásicos",
          "Reparações na rede elétrica e diagnóstico de avarias",
          "Inspeções, atualizações e certificações",
        ],
      },
      {
        id: "security-gate-automation",
        icon: "shield",
        title: "Sistemas de Segurança e Automatismos de Portões",
        short: "Portões automáticos, videoporteiros, alarmes e CCTV.",
        description:
          "Proteja o que mais importa com equipamento de segurança instalado por profissionais e automatismos de portões fiáveis.",
        features: [
          "Portões automáticos e motores de garagem",
          "Videoporteiros e controlo de acessos",
          "Sistemas de alarme e CCTV",
          "Manutenção e reparações rápidas",
        ],
      },
      {
        id: "ev-charging",
        icon: "plug-zap",
        title: "Carregamento de Veículos Elétricos",
        short:
          "Instalação de wallbox para qualquer veículo elétrico — todas as marcas.",
        description:
          "Instalação certificada de pontos de carregamento para veículos elétricos em habitação, empresas e condomínios — todas as marcas e conectores standard.",
        features: [
          "Compatível com qualquer veículo elétrico",
          "Conector Tipo 2 (norma europeia)",
          "Carregamento inteligente e controlo por aplicação",
          "Estudo de consumos e certificação",
        ],
      },
      {
        id: "home-automation",
        icon: "home",
        title: "Domótica e Casa Inteligente",
        short:
          "Iluminação, climatização, estores e cenários — controlados de forma inteligente.",
        description:
          "Torne a sua casa ou escritório mais inteligentes e eficientes com automação integrada de iluminação, climatização, estores, energia e acessos.",
        features: [
          "Iluminação inteligente e cenários",
          "Estores automatizados, climatização e gestão de energia",
          "Controlo por voz e por aplicação",
          "Integração com instalações existentes",
        ],
      },
      {
        id: "appliance-sales-repair",
        icon: "wrench",
        title: "Venda e Reparação de Eletrodomésticos",
        short:
          "Venda de eletrodomésticos e reparações ao domicílio ou em oficina.",
        description:
          "Desde a escolha do eletrodoméstico certo até à sua manutenção — vendemos e reparamos eletrodomésticos com peças originais.",
        features: [
          "Venda de eletrodomésticos",
          "Reparações ao domicílio e em oficina",
          "Peças originais e acessórios",
          "Diagnóstico e aconselhamento honestos",
        ],
      },
    ],
    spotlight: {
      eyebrow: "Novo Serviço",
      badge: "NOVIDADE",
      title: "Instalação de Carregadores para Veículos Elétricos",
      subtitle:
        "Carregue o seu veículo elétrico em casa ou na empresa — instalamos e certificamos a wallbox certa para si.",
      description:
        "Instale um ponto de carregamento preparado para o futuro, executado por eletricistas certificados. Trabalhamos com todas as marcas e conectores standard de wallbox, configuramos funcionalidades de carregamento inteligente e tratamos da instalação completa — do estudo de consumos à certificação final.",
      features: [
        "Todas as marcas e modelos de wallbox standard",
        "Conector Tipo 2 — a norma europeia para EV",
        "Carregamento inteligente, controlo por aplicação e gestão de cargas",
        "Instalação com proteção IP65 para exterior, quando necessário",
        "Estudo de consumos, certificação e apoio pós-venda",
      ],
      connectorsLabel: "Compatível com",
      connectors: [
        "Qualquer marca de EV",
        "Tipo 2",
        "Monofásico e trifásico",
        "Interior / exterior",
      ],
      panel: {
        status: "A carregar",
        chargingLabel: "Sessão de carregamento",
        powerLabel: "Potência",
        progressLabel: "Bateria",
      },
      whatsappCta: "Falar no WhatsApp",
      whatsappPrefill:
        "Olá! Gostaria de saber mais sobre a instalação de um carregador para o meu veículo elétrico.",
      footnote: "Orçamento gratuito · Instalação certificada · Apoio pós-venda",
    },

    scope: {
      eyebrow: "O Nosso Âmbito de Atividade",
      title: "Comércio e contratação técnica, lado a lado",
      subtitle:
        "As nossas áreas oficiais de atividade permitem-nos fornecer o material certo e executar o trabalho.",
      areas: [
        {
          icon: "store",
          title: "Comércio por Grosso e a Retalho",
          description:
            "Distribuição e venda de componentes elétricos profissionais, ferragens especializadas, ferramentas, acessórios para canalização e aquecimento, e eletrodomésticos.",
          tags: [
            "Componentes elétricos",
            "Ferragens e ferramentas especializadas",
            "Acessórios de canalização e aquecimento",
            "Eletrodomésticos",
          ],
        },
        {
          icon: "hard-hat",
          title: "Contratação Técnica",
          description:
            "Serviços locais especializados em instalação elétrica técnica, reparações na rede elétrica, sistemas de segurança e automatismos.",
          tags: [
            "Instalação elétrica técnica",
            "Reparações na rede elétrica",
            "Sistemas de segurança",
            "Automatismos",
          ],
        },
      ],
    },
    cta: {
      title: "Não sabe de que serviço precisa?",
      subtitle:
        "Conte-nos o seu projeto e indicamos a melhor abordagem — com orçamento gratuito.",
      button: "Pedir Orçamento Grátis",
    },
  },

  contact: {
    hero: {
      eyebrow: "Contacto",
      title: "Vamos falar sobre o seu projeto",
      subtitle:
        "Contacte-nos para pedir orçamento, esclarecer uma dúvida técnica ou visitar o nosso showroom em Santa Marta de Portuzelo.",
    },
    form: {
      heading: "Envie-nos uma mensagem",
      name: { label: "Nome completo", placeholder: "O seu nome" },
      email: { label: "Email", placeholder: "voce@exemplo.com" },
      phone: { label: "Telefone", placeholder: "Opcional", optional: "Opcional" },
      subject: {
        label: "Assunto",
        placeholder: "Escolha um tópico",
        options: [
          { value: "electrical", label: "Instalação Elétrica" },
          { value: "automation", label: "Domótica" },
          { value: "security", label: "Segurança e Automatismos de Portões" },
          { value: "appliances", label: "Eletrodomésticos: venda e reparação" },
          { value: "other", label: "Outro" },
        ],
      },
      message: {
        label: "Mensagem",
        placeholder: "Conte-nos um pouco sobre o que precisa…",
      },
      consent: {
        before: "Aceito a ",
        link: "Política de Privacidade",
        after: ".",
      },
      submit: "Enviar pedido",
      submitting: "A enviar…",
      success: {
        title: "Mensagem enviada!",
        body: "Obrigado pelo contacto. Responderemos em breve.",
        again: "Enviar outra mensagem",
      },
      errors: {
        name: "Por favor, indique o seu nome.",
        email: "Por favor, indique um email válido.",
        message:
          "Por favor, escreva uma mensagem (com pelo menos 10 caracteres).",
        consent:
          "Por favor, aceite a Política de Privacidade para continuar.",
        submit:
          "Ocorreu um problema ao enviar. Tente novamente ou contacte-nos por telefone.",
      },
    },
    info: {
      heading: "Dados de contacto",
      phoneLabel: "Telefone",
      landlineLabel: "Telefone fixo",
      mobileLabel: "Telemóvel",
      emailLabel: "Email",
      showroomLabel: "Showroom e Loja",
      officeLabel: "Sede social",
      directions: "Como chegar",
    },
    hours: {
      heading: "Horário de funcionamento",
      weekdays: "Segunda – Sexta",
      morning: "Manhã",
      afternoon: "Tarde",
      saturday: "Sábado",
      sunday: "Domingo",
      closed: "Encerrado",
      note: "Encerrado em feriados.",
    },
    map: {
      heading: "Onde estamos",
      caption: "Showroom — Santa Marta de Portuzelo",
      title: "Mapa com a localização do showroom Eletroborlido",
    },
  },

  footer: {
    tagline:
      "Instalações elétricas, sistemas de segurança e carregamento de veículos elétricos em Viana do Castelo.",
    legalHeading: "Dados da empresa",
    legalNameLabel: "Denominação",
    nifLabel: "NIF / NIPC",
    showroomLabel: "Showroom",
    quickLinksHeading: "Navegar",
    legalLinksHeading: "Legal",
    privacy: "Política de Privacidade",
    terms: "Termos e Condições",
    disputeResolution: "Resolução de Litígios Online",
    disputeResolutionAria: "Resolução de Litígios Online (abre numa nova aba)",
    contactHeading: "Contacto",
    livroReclamacoes: "Livro de Reclamações Eletrónico",
    livroReclamacoesAria:
      "Livro de Reclamações Eletrónico (abre numa nova aba)",
    hoursSummary: "Seg–Sex: 09:00–12:30 · 14:30–19:00",
    rights: "Todos os direitos reservados.",
  },

  legal: {
    privacy: {
      title: "Política de Privacidade",
      updated: "Última atualização",
      placeholderDate: "[data]",
      intro:
        "Esta Política de Privacidade explica como a Eletroborlido, Unipessoal Lda. recolhe, utiliza e protege os seus dados pessoais. Este é um texto de exemplo, a rever por assessoria jurídica antes da publicação.",
      sections: [
        {
          heading: "1. Responsável pelo tratamento",
          body: "A Eletroborlido, Unipessoal Lda. é a entidade responsável pelo tratamento dos dados pessoais recolhidos através deste website.",
        },
        {
          heading: "2. Dados que recolhemos",
          body: "Recolhemos as informações que nos fornece através do formulário de contacto (nome, email, telefone e mensagem) com o único propósito de responder ao seu pedido.",
        },
        {
          heading: "3. Base legal e finalidade",
          body: "Os dados são tratados com base no seu consentimento e no nosso interesse legítimo em responder a contactos. Não vendemos os seus dados a terceiros.",
        },
        {
          heading: "4. Conservação dos dados",
          body: "Conservamos os dados de contacto apenas durante o período necessário para tratar o seu pedido e cumprir obrigações legais.",
        },
        {
          heading: "5. Os seus direitos",
          body: "Ao abrigo do RGPD, pode solicitar o acesso, retificação, apagamento, limitação ou portabilidade dos seus dados. Contacte-nos através dos dados disponíveis abaixo.",
        },
        {
          heading: "6. Contacto",
          body: "Para qualquer pedido relacionado com privacidade, contacte-nos através do email ou da morada indicados no rodapé.",
        },
      ],
    },
    terms: {
      title: "Termos e Condições",
      updated: "Última atualização",
      placeholderDate: "[data]",
      intro:
        "Estes Termos e Condições regulam a utilização deste website e dos serviços prestados pela Eletroborlido, Unipessoal Lda. Este é um texto de exemplo, a rever por assessoria jurídica antes da publicação.",
      sections: [
        {
          heading: "1. Disposições gerais",
          body: "Ao aceder a este website concorda com estes termos. O conteúdo é fornecido apenas para fins informativos e pode ser atualizado a qualquer momento.",
        },
        {
          heading: "2. Serviços e orçamentos",
          body: "Os orçamentos fornecidos são gratuitos e não vinculativos até serem aceites formalmente, por escrito, por ambas as partes. Âmbito, preço e prazos são confirmados por projeto.",
        },
        {
          heading: "3. Garantias",
          body: "Os trabalhos de instalação estão cobertos por garantia, em conformidade com a legislação portuguesa de defesa do consumidor.",
        },
        {
          heading: "4. Responsabilidade",
          body: "Não nos responsabilizamos por danos indiretos decorrentes do uso indevido das informações constantes neste website.",
        },
        {
          heading: "5. Litígios de consumo",
          body: "Os consumidores podem recorrer ao Livro de Reclamações Eletrónico e às entidades de resolução de litígios indicadas no rodapé.",
        },
        {
          heading: "6. Lei aplicável",
          body: "Estes termos são regulados pela lei portuguesa, sendo competentes os tribunais da comarca de Viana do Castelo.",
        },
      ],
    },
  },
};
