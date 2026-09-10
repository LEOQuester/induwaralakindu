import { skillCategories } from '../data/skills.js';
import { techStack } from '../data/tech.js';
import { renderPageHero } from './page-hero.js';
import { renderMarquee } from '../components/marquee.js';

const coreLanguages = skillCategories.find((group) => group.id === 'languages')?.items ?? [];

export function renderSkillsPage() {
  const featuredGroups = skillCategories.filter((group) => group.featured);
  const otherGroups = skillCategories.filter((group) => !group.featured);

  return `
    ${renderPageHero({
      eyebrow: 'Skills & Stack',
      title: 'Tools I reach for',
      titleAccent: 'when it matters.',
      lead: 'Not a checkbox resume — a living toolkit spanning AI, full-stack engineering, and product design.',
      index: '01',
    })}

    <section class="skills-page section">
      <div class="skills-page__core reveal">
        <div class="skills-page__core-header">
          <span class="skills-page__label">Core languages</span>
          <p class="skills-page__core-copy">The foundation under every system I build.</p>
        </div>
        <div class="skills-page__orbit" aria-hidden="true">
          <span class="skills-page__orbit-ring"></span>
          <span class="skills-page__orbit-core">IL</span>
        </div>
        <ul class="skills-page__language-list">
          ${coreLanguages
            .map(
              (item, index) => `
            <li class="skills-page__language" style="--i: ${index}">
              <span class="skills-page__language-dot"></span>
              ${item}
            </li>
          `,
            )
            .join('')}
        </ul>
      </div>

      <div class="skills-page__featured" data-stagger-grid>
        ${featuredGroups
          .map(
            (group, index) => `
          <article
            class="skills-zone skills-zone--featured"
            data-tilt
            style="--accent: ${group.accent}; --index: ${index}"
          >
            <div class="skills-zone__header">
              <span class="skills-zone__num">${String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2 class="skills-zone__title">${group.category}</h2>
                <p class="skills-zone__tagline">${group.tagline}</p>
              </div>
            </div>
            <ul class="skills-zone__pills">
              ${group.items
                .map(
                  (item) => `
                <li class="skills-zone__pill">${item}</li>
              `,
                )
                .join('')}
            </ul>
          </article>
        `,
          )
          .join('')}
      </div>

      <div class="skills-page__bento" data-stagger-grid>
        ${otherGroups
          .map(
            (group, index) => `
          <article
            class="skills-zone"
            data-tilt
            style="--accent: ${group.accent}; --index: ${index + featuredGroups.length}"
          >
            <div class="skills-zone__header">
              <span class="skills-zone__num">${String(index + featuredGroups.length + 1).padStart(2, '0')}</span>
              <div>
                <h2 class="skills-zone__title">${group.category}</h2>
                <p class="skills-zone__tagline">${group.tagline}</p>
              </div>
            </div>
            <ul class="skills-zone__pills">
              ${group.items
                .map(
                  (item) => `
                <li class="skills-zone__pill">${item}</li>
              `,
                )
                .join('')}
            </ul>
          </article>
        `,
          )
          .join('')}
      </div>

      <div class="skills-page__stack reveal">
        <div class="skills-page__stack-header">
          <span class="section__eyebrow">Shipped with</span>
          <h2 class="skills-page__stack-title">Frameworks &amp; platforms in production.</h2>
        </div>
        <div class="stack__grid">
          ${techStack
            .map(
              (tech) => `
            <article class="stack-card" style="--tech-color: ${tech.color}">
              <div class="stack-card__icon-wrap">
                <img src="${tech.icon}" alt="${tech.name} logo" class="stack-card__icon" loading="lazy" />
              </div>
              <span class="stack-card__name">${tech.name}</span>
            </article>
          `,
            )
            .join('')}
        </div>
        ${renderMarquee(techStack.map((tech) => tech.name), { separator: '·' })}
      </div>
    </section>
  `;
}

export function initSkillsPage() {
  const pills = document.querySelectorAll('.skills-zone__pill');

  pills.forEach((pill) => {
    pill.addEventListener('mouseenter', () => {
      pill.classList.add('skills-zone__pill--active');
    });
    pill.addEventListener('mouseleave', () => {
      pill.classList.remove('skills-zone__pill--active');
    });
  });
}
