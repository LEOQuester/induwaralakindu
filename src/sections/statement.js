import { profile } from '../data/profile.js';

const pillars = [
  {
    icon: 'fa-solid fa-code',
    title: 'Web Development',
    text: 'Custom Laravel, Django, and React platforms for businesses that need reliable, scalable products.',
    link: '#work',
    linkLabel: 'View projects',
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'AI & Intelligent Systems',
    text: 'Agentic workflows, computer vision, and automation — practical AI wired into real products.',
    link: 'https://galvanprime.lk',
    linkLabel: 'Galvanprime',
  },
  {
    icon: 'fa-solid fa-building',
    title: 'Enterprise Software',
    text: 'APIs, cloud infrastructure, and backend systems built to handle growth without rewrites.',
    link: '#contact',
    linkLabel: 'Start a project',
  },
  {
    icon: 'fa-solid fa-chalkboard-user',
    title: 'Education & Mentorship',
    text: 'Structured ICT learning through PrimeICT — theory, practice, and industry-ready skills.',
    link: 'https://primeict.lk',
    linkLabel: 'PrimeICT.lk',
  },
];

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Experience', value: '12+ years coding' },
  { label: 'Leading', value: 'Galvanprime (Pvt) Ltd' },
  { label: 'Status', value: profile.availability },
];

export function renderStatement() {
  return `
    <section id="mission" class="statement section" aria-label="Mission and focus areas">
      <div class="statement__inner">
        <div class="statement__intro reveal">
          <p class="statement__eyebrow">Mission</p>
          <h2 class="statement__title">
            <span class="statement__line">Code powers</span>
            <span class="statement__line statement__line--accent">intelligence.</span>
            <span class="statement__line">Intelligence expands</span>
            <span class="statement__line statement__line--outline">human potential.</span>
          </h2>
          <p class="statement__body">
            A programmable reality for human–AI co-evolution. From robotics and computer vision
            to agentic systems and enterprise software — building the substrate where ambition
            becomes impact.
          </p>
        </div>

        <div class="statement__facts reveal reveal--delay-1" data-stagger-grid>
          ${facts
            .map(
              (fact, index) => `
            <div class="statement__fact" style="--index: ${index}">
              <span class="statement__fact-label">${fact.label}</span>
              <span class="statement__fact-value">${fact.value}</span>
            </div>
          `,
            )
            .join('')}
        </div>

        <div class="statement__pillars reveal reveal--delay-2" data-stagger-grid>
          ${pillars
            .map(
              (pillar, index) => `
            <article class="statement__pillar" style="--index: ${index}" data-tilt>
              <span class="statement__pillar-icon" aria-hidden="true">
                <i class="${pillar.icon}"></i>
              </span>
              <h3 class="statement__pillar-title">${pillar.title}</h3>
              <p class="statement__pillar-text">${pillar.text}</p>
              <a href="${pillar.link}" class="statement__pillar-link">
                ${pillar.linkLabel}
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </article>
          `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
