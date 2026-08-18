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
    'Induwara Lakindu is a leading software engineer and web developer in Colombo, Sri Lanka. CEO of Galvanprime — custom web development, AI solutions, Laravel, Django, and enterprise software services.',
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

export function getStructuredData() {
  const sameAs = social.map((item) => item.url);

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
          'Robotics',
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
        '@id': `${site.url}/#webpage`,
        url: site.url,
        name: seo.title,
        description: seo.description,
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
