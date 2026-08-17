import { media } from './media.js';

export const projects = [
  {
    id: 'chess-robot',
    title: 'Chess Robot',
    tagline: "Sri Lanka's first AI-powered chess robot",
    description:
      'A breakthrough integration of AI, robotics, and computer vision — enabling a physical robot to play chess autonomously.',
    tags: ['AI', 'Robotics', 'Computer Vision'],
    image: media.profile,
    featured: true,
  },
  {
    id: 'galvanprime-platform',
    title: 'Galvanprime Solutions',
    tagline: 'Intelligent software for modern businesses',
    description:
      'Custom enterprise solutions and agentic AI systems built at Galvanprime for real-world business impact.',
    tags: ['Agentic AI', 'Enterprise', 'Consulting'],
    image: media.galvanprimeLogo,
    logo: true,
    link: 'https://galvanprime.com',
    featured: true,
  },
  {
    id: 'primeict',
    title: 'PrimeICT.lk',
    tagline: 'ICT education platform for Sri Lankan students',
    description:
      'A teaching platform delivering structured ICT education with clarity, depth, and real-world relevance.',
    tags: ['Education', 'Platform', 'ICT'],
    image: media.primeictLogo,
    logo: true,
    link: 'https://primeict.lk',
    featured: true,
  },
];
