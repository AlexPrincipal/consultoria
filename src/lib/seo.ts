import type { Metadata } from 'next';

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const NORMALISED_SITE_URL = RAW_SITE_URL ? RAW_SITE_URL.replace(/\/+$/, '') : null;
export const SITE_URL = NORMALISED_SITE_URL && NORMALISED_SITE_URL.length > 0
  ? (NORMALISED_SITE_URL.startsWith('http') ? NORMALISED_SITE_URL : `https://${NORMALISED_SITE_URL}`)
  : 'https://cplus-consultoria.com';

export const SITE_NAME = 'C+ Consultoría Legal';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;
const DEFAULT_LAST_MODIFIED = new Date();

type PageSeoConfig = {
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
};

type ServiceSeoConfig = PageSeoConfig & {
  schemaName?: string;
  serviceType?: string;
};

export const seoConfig = {
  pages: {
    home: {
      path: '/',
      title: 'Consultoría Legal Empresarial y Comercial',
      description: 'Diseñamos estrategias jurídicas que protegen y potencian a las empresas mexicanas. Asesoría integral, defensa y cumplimiento normativo con enfoque estratégico.',
      priority: 1,
      changeFrequency: 'weekly' as const,
    },
    services: {
      path: '/servicios',
      title: 'Servicios Jurídicos Corporativos',
      description: 'Conozca las áreas de práctica de C+ Consultoría Legal: asesoría, representación, compliance, comercio internacional, MASC y más soluciones empresariales.',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    contact: {
      path: '/contacto',
      title: 'Contacto y Agenda de Consultas',
      description: 'Solicite una evaluación legal estratégica con nuestro equipo. Atendemos empresas en Ciudad de México y toda la República Mexicana.',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    about: {
      path: '/quienes-somos',
      title: 'Quiénes Somos | Socios Estratégicos',
      description: 'Conozca al equipo directivo de C+ Consultoría Legal, su filosofía y la experiencia que respalda cada estrategia legal empresarial.',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    whyUs: {
      path: '/por-que-escogernos',
      title: '¿Por Qué Escogernos?',
      description: 'Razones por las que las empresas confían en C+ Consultoría Legal: acompañamiento estratégico, soluciones a medida y resultados medibles.',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    offices: {
      path: '/nuestras-oficinas',
      title: 'Nuestras Oficinas',
      description: 'Visite las instalaciones de C+ Consultoría Legal en Ciudad de México. Espacios diseñados para la confidencialidad y colaboración con clientes.',
      priority: 0.5,
      changeFrequency: 'yearly' as const,
    },
    faq: {
      path: '/faq',
      title: 'Preguntas Frecuentes',
      description: 'Respuestas claras sobre nuestros servicios jurídicos empresariales, procesos de trabajo, alcance y honorarios.',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
  } satisfies Record<string, PageSeoConfig>,
  services: {
    'asesoria-consultoria-legal': {
      path: '/servicios/asesoria-consultoria-legal',
      title: 'Asesoría y Consultoría Legal Empresarial',
      description: 'Diseñamos estrategias legales personalizadas, alineadas a la visión de negocio para fusiones, reestructuras y proyectos de alto impacto.',
      priority: 0.85,
      changeFrequency: 'monthly' as const,
      schemaName: 'Asesoría y Consultoría Legal para Empresas',
      serviceType: 'BusinessLegalConsulting',
    },
    'representacion-defensa': {
      path: '/servicios/representacion-defensa',
      title: 'Representación y Defensa Jurídica Empresarial',
      description: 'Defensa experta en litigios mercantiles, laborales y administrativos. Contingencias legales atendidas con estrategia y precisión.',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      schemaName: 'Representación y Defensa Legal Corporativa',
      serviceType: 'LegalDefenseService',
    },
    'comercio-internacional': {
      path: '/servicios/comercio-internacional',
      title: 'Comercio Internacional y Aduanas',
      description: 'Cumplimiento normativo y estructuración legal para importaciones, exportaciones y operaciones internacionales seguras.',
      priority: 0.75,
      changeFrequency: 'monthly' as const,
      schemaName: 'Servicios Legales de Comercio Internacional',
      serviceType: 'InternationalTradeConsulting',
    },
    compliance: {
      path: '/servicios/compliance',
      title: 'Programas de Compliance Corporativo',
      description: 'Diseño e implementación de programas de cumplimiento que mitigan riesgos y protegen la reputación empresarial.',
      priority: 0.75,
      changeFrequency: 'monthly' as const,
      schemaName: 'Programas de Cumplimiento Normativo',
      serviceType: 'ComplianceProgram',
    },
    masc: {
      path: '/servicios/masc',
      title: 'Métodos Alternativos de Solución de Controversias (MASC)',
      description: 'Mediación y arbitraje para resolver disputas empresariales de forma ágil, confidencial y costo-eficiente.',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      schemaName: 'Métodos Alternativos de Solución de Controversias',
      serviceType: 'AlternativeDisputeResolution',
    },
    'gestion-tramites': {
      path: '/servicios/gestion-tramites',
      title: 'Gestión de Trámites y Contratos Empresariales',
      description: 'Redacción de contratos, constitución de sociedades y regularización documental para empresas en crecimiento.',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      schemaName: 'Gestión de Trámites Corporativos',
      serviceType: 'BusinessAdministrativeServices',
    },
    'area-empresarial-especifica': {
      path: '/servicios/area-empresarial-especifica',
      title: 'Área Empresarial Específica',
      description: 'Cobertura legal 360° que integra derecho corporativo, mercantil, laboral y fiscal para empresas con operaciones complejas.',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      schemaName: 'Cobertura Legal Empresarial Integral',
      serviceType: 'CorporateLegalAdvisory',
    },
    'consultoria-creacion-empresas': {
      path: '/servicios/consultoria-creacion-empresas',
      title: 'Consultoría para Creación de Empresas',
      description: 'Acompañamos el nacimiento de nuevas compañías con estructuras legales sólidas y visión estratégica.',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      schemaName: 'Consultoría Legal para Startups y Nuevas Empresas',
      serviceType: 'CompanyFormationConsulting',
    },
    'representacion-legal': {
      path: '/servicios/representacion-legal',
      title: 'Representación Legal Corporativa',
      description: 'Acompañamiento profesional en asambleas, negociaciones y gobierno corporativo para proteger la toma de decisiones.',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      schemaName: 'Representación Legal Corporativa',
      serviceType: 'CorporateLegalRepresentation',
    },
  } satisfies Record<string, ServiceSeoConfig>,
  faqItems: [
    {
      question: '¿Cuál es el primer paso para una consulta?',
      answer: 'El primer paso es agendar una evaluación inicial a través de nuestro formulario de contacto o llamando directamente a nuestras oficinas. En esta sesión, escucharemos su caso y explicaremos cómo podemos ayudarle.',
    },
    {
      question: '¿Qué tipo de empresas asesoran?',
      answer: 'Asesoramos a startups, PyMEs y corporativos en industrias como tecnología, construcción, manufactura y servicios, adaptando la estrategia legal a cada modelo de negocio.',
    },
    {
      question: '¿Cómo se estructuran sus honorarios?',
      answer: 'Ofrecemos igualas mensuales, tarifas por hora y honorarios fijos por proyecto. El esquema se acuerda con transparencia desde el inicio para ajustarse a las necesidades de cada empresa.',
    },
    {
      question: '¿Manejan casos fuera de la Ciudad de México?',
      answer: 'Sí. Aunque la firma está basada en Ciudad de México, contamos con corresponsales y plataformas colaborativas para representar clientes en toda la República Mexicana.',
    },
    {
      question: '¿Qué es un programa de Compliance y por qué lo necesito?',
      answer: 'El compliance es un sistema de políticas y procedimientos que asegura el cumplimiento normativo. Previene multas, sanciones y daños reputacionales, fortaleciendo la cultura ética de la empresa.',
    },
  ],
};

export type PageKey = keyof typeof seoConfig.pages;
export type ServiceKey = keyof typeof seoConfig.services;

export const staticRoutesForSitemap = Object.values(seoConfig.pages).map((page) => ({
  url: buildCanonical(page.path),
  lastModified: DEFAULT_LAST_MODIFIED,
  priority: page.priority,
  changeFrequency: page.changeFrequency ?? 'monthly',
}));

export const serviceRoutesForSitemap = Object.values(seoConfig.services).map((service) => ({
  url: buildCanonical(service.path),
  lastModified: DEFAULT_LAST_MODIFIED,
  priority: service.priority,
  changeFrequency: service.changeFrequency ?? 'monthly',
}));

export function buildCanonical(path: string): string {
  if (!path.startsWith('/')) {
    return `${SITE_URL}/${path}`;
  }
  return `${SITE_URL}${path}`;
}

const baseOpenGraph = {
  type: 'website' as const,
  siteName: SITE_NAME,
  locale: 'es_MX',
  images: [
    {
      url: DEFAULT_OG_IMAGE,
      width: 512,
      height: 512,
      alt: `${SITE_NAME} logotipo`,
    },
  ],
};

export function getPageMetadata(key: PageKey): Metadata {
  const page = seoConfig.pages[key];
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: buildCanonical(page.path),
    },
    openGraph: {
      ...baseOpenGraph,
      url: buildCanonical(page.path),
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
    },
  } satisfies Metadata;
}

export function getServiceMetadata(slug: ServiceKey): Metadata {
  const service = seoConfig.services[slug];
  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: buildCanonical(service.path),
    },
    openGraph: {
      ...baseOpenGraph,
      url: buildCanonical(service.path),
      title: `${service.title} | ${SITE_NAME}`,
      description: service.description,
    },
  } satisfies Metadata;
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Ciudad de México',
    },
    sameAs: [
      'https://www.linkedin.com',
      'https://www.facebook.com',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+52-55-0000-0000',
      areaServed: 'MX',
      availableLanguage: ['es'],
    },
  };
}

export function getServicesItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: Object.entries(seoConfig.services).map(([slug, service], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: buildCanonical(service.path),
    })),
  };
}

export function getFaqSchema(items = seoConfig.faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getServiceSchema(slug: ServiceKey) {
  const service = seoConfig.services[slug];
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: service.schemaName ?? service.title,
    serviceType: service.serviceType ?? 'LegalService',
    description: service.description,
    url: buildCanonical(service.path),
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: DEFAULT_OG_IMAGE,
    },
    areaServed: 'México',
  };
}

export const faqItems = seoConfig.faqItems;
