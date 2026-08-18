import { techStack } from '../data/tech.js';
import { renderMarquee } from '../components/marquee.js';

export function renderTechStack() {
  return `
    <section id="stack" class="stack section">
      <div class="stack__top">
        <div class="section__index reveal">04</div>
        <div class="section__header reveal">
          <span class="section__eyebrow">Tech Stack</span>
          <h2 class="section__title section__title--display">
            Frameworks &amp;<br />
            <span class="text-dim">languages I ship with.</span>
          </h2>
        </div>
      </div>

      <div class="stack__grid reveal">
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

      ${renderMarquee(techStack.map((t) => t.name), { separator: '·' })}
    </section>
  `;
}
