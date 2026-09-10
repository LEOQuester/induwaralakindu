import { profile } from './profile.js';
import { social } from './social.js';

export const site = {
  url: 'https://induwaralakindu.galvanprime.lk',
  name: 'Induwara Lakindu',
  locale: 'en_LK',
  language: 'en',
  country: 'Sri Lanka',
  city: 'Colombo',
  region: 'Western Province',
  twitterHandle: '@induwaralakindu',
};

export const seo = {
  title: 'Induwara Lakindu | Software Engineer & Web Developer in Colombo, Sri Lanka',
  titleShort: 'Induwara Lakindu — AI Engineer & CEO',
  description:
    'Induwara Lakindu is a software engineer and web developer in Colombo, Sri Lanka. CEO of Galvanprime — custom web development, AI solutions, Laravel, Django, and enterprise software services.',
  keywords: [
    'Induwara Lakindu',
    'Induwara Lakindu software engineer',
    'software engineer Colombo',
    'web developer Colombo',
    'web development services Colombo',
    'web development company Colombo',
    'custom software development Sri Lanka',
    'software development firm Colombo',
    'AI engineer Colombo',
    'AI engineer Sri Lanka',
    'Laravel developer Colombo',
    'Django developer Sri Lanka',
    'full stack developer Colombo',
    'Galvanprime',
    'PrimeICT',
    'enterprise web development Colombo',
    'intelligent systems developer',
  ],
  ogImage: `${site.url}/assets/images/profile/teaching.webp`,
  ogImageAlt: 'Induwara Lakindu — software engineer and ICT educator in Colombo, Sri Lanka',
};

export const pageSeo = {
  home: {
    ...seo,
    path: '/',
  },
  about: {
    title: 'About | Induwara Lakindu — Software Engineer in Colombo',
    description:
      'Learn about Induwara Lakindu — software engineer, CEO of Galvanprime, founder of PrimeICT, and ICT educator based in Colombo, Sri Lanka.',
    path: '/about',
  },
  skills: {
    title: 'Skills & Stack | Induwara Lakindu',
    description:
      'Technical skills across Python, Java, AI/ML, React, Next.js, FastAPI, Spring Boot, PostgreSQL, Docker, and more — full-stack engineering from Colombo.',
    path: '/skills',
  },
  contact: {
    title: 'Contact | Induwara Lakindu',
    description:
      'Get in touch with Induwara Lakindu for custom web development, AI systems, and enterprise software in Colombo. Email, WhatsApp, or phone.',
    path: '/contact',
  },
};

export function getStructuredData(pageKey = 'home') {
  const sameAs = social.map((item) => item.url);
  const page = pageSeo[pageKey] ?? pageSeo.home;
  const path = page.path ?? '/';
  const pageUrl = `${site.url}${path === '/' ? '' : path}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: profile.name,
        givenName: 'Induwara',
        familyName: 'Lakindu',
        url: site.url,
        image: seo.ogImage,
        email: profile.email,
        telephone: profile.phone,
        jobTitle: ['Software Engineer', 'AI Engineer', 'CEO', 'Web Developer'],
        description: seo.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: 'LK',
        },
        worksFor: [
          {
            '@type': 'Organization',
            name: 'Galvanprime (Pvt) Ltd',
            url: 'https://galvanprime.lk',
            description: 'Software development and web development services in Colombo, Sri Lanka',
          },
          {
            '@type': 'Organization',
            name: 'PrimeICT.lk',
            url: 'https://primeict.lk',
            description: 'ICT education platform in Sri Lanka',
          },
        ],
        alumniOf: [
          {
            '@type': 'CollegeOrUniversity',
            name: 'University of Sri Jayewardenepura',
          },
          {
            '@type': 'CollegeOrUniversity',
            name: 'NIBM',
          },
        ],
        knowsAbout: [
          'Web Development',
          'Software Engineering',
          'Artificial Intelligence',
          'Machine Learning',
          'Laravel',
          'Django',
          'React',
          'Next.js',
          'FastAPI',
          'Spring Boot',
          'Computer Vision',
        ],
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: seo.description,
        inLanguage: site.language,
        publisher: { '@id': `${site.url}/#person` },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title ?? seo.title,
        description: page.description ?? seo.description,
        isPartOf: { '@id': `${site.url}/#website` },
        about: { '@id': `${site.url}/#person` },
        inLanguage: site.language,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#services`,
        name: 'Galvanprime — Web Development Services Colombo',
        url: 'https://galvanprime.lk',
        description:
          'Custom web development, software engineering, and AI solutions for businesses in Colombo and across Sri Lanka.',
        areaServed: [
          { '@type': 'City', name: 'Colombo' },
          { '@type': 'Country', name: 'Sri Lanka' },
        ],
        serviceType: [
          'Web Development',
          'Custom Software Development',
          'AI Development',
          'Enterprise Software',
          'Mobile Web Applications',
        ],
        founder: { '@id': `${site.url}/#person` },
      },
    ],
  };
}
