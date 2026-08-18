import { media } from './media.js';

export const stories = [
  {
    id: 'legathon',
    index: '01',
    tag: 'International Legathon MaxUp 2026',
    title: 'Representing Sri Lanka on the global stage.',
    subtitle: '4th place worldwide · Lex Fantastic Stage winners',
    description:
      'As a third-year BIS undergraduate at the University of Sri Jayewardenepura, I represented Sri Lanka at the International Legathon MaxUp 2026 Global Finals in Astana, Kazakhstan — alongside Ruveena Gamage and Oshadha Canchana. After securing 5th place globally in the preliminary round, we advanced to the finals, won the Lex Fantastic Stage debate round against Georgia, and finished 4th overall.',
    highlights: [
      '5th place globally in the preliminary round',
      'Won the Lex Fantastic Stage (debate round)',
      '4th place overall at Global Finals, Astana',
      'Full travel scholarship to Kazakhstan',
    ],
    images: [
      { src: media.achievements.legathonGroup, alt: 'Legathon MaxUp 2026 team representing Sri Lanka', size: 'large' },
      { src: media.achievements.legathonFinals, alt: 'Legathon MaxUp 2026 global finals stage', size: 'large' },
      { src: media.achievements.legathonAstana, alt: 'Legathon MaxUp 2026 at AIFC, Astana', size: 'large' },
    ],
    link: 'https://mgt.sjp.ac.lk/bis-undergraduates-represent-sri-lanka-at-international-legathon-maxup-2026-global-finals/',
    linkLabel: 'Read on USJ FMSC',
    stats: [
      { value: '4th', label: 'Global rank' },
      { value: 'Top 6', label: 'Preliminary' },
      { value: 'Astana', label: 'Global Finals' },
    ],
  },
  {
    id: 'cssl-chess-robot',
    index: '02',
    tag: 'CSSL Colloquium 2025',
    title: "Sri Lanka's first chess robot — recognised nationally.",
    subtitle: 'Top 6 finalist · Only undergraduate among graduates',
    description:
      'I developed Sri Lanka\'s first chess-playing robot by combining AI, robotics, and computer vision. The project earned a Top 6 finalist spot at the prestigious CSSL Colloquium 2025 — standing as the only student among five graduate contestants.',
    highlights: [
      "Sri Lanka's first AI chess-playing robot",
      'Top 6 finalist — CSSL Colloquium 2025',
      'Only undergraduate among graduate finalists',
      'Batch 23.1 F — HND Software Engineering, NIBM',
    ],
    images: [
      {
        src: media.achievements.csslAward,
        alt: 'CSSL Colloquium 2025 — NIBM chess robot project award ceremony',
        layout: 'portrait',
        width: 502,
        height: 540,
        credit: 'NIBM',
        creditUrl:
          'https://www.facebook.com/photo/?fbid=1043531371263925&set=a.592203699730030',
      },
    ],
    link: 'https://www.facebook.com/photo/?fbid=1043531371263925&set=a.592203699730030',
    linkLabel: 'View original NIBM post',
    stats: [
      { value: 'Top 6', label: 'CSSL Colloquium' },
      { value: '1st', label: 'Chess robot in SL' },
      { value: 'AI', label: 'Robotics · CV' },
    ],
  },
];
