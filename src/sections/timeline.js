import { timeline } from '../data/timeline.js';

export function renderTimeline() {
  return `
    <section id="journey" class="journey section">
      <div class="journey__top">
        <div class="section__index reveal">05</div>
        <div class="section__header reveal">
          <span class="section__eyebrow">Journey</span>
          <h2 class="section__title section__title--display">
            Key milestones<br />
            <span class="text-dim">that shaped the path.</span>
          </h2>
        </div>
      </div>

      <div class="timeline">
        ${timeline
          .map(
            (item, index) => `
          <article class="timeline__item reveal ${item.highlight ? 'timeline__item--highlight' : ''}" style="--index: ${index}">
            <div class="timeline__index">${String(index + 1).padStart(2, '0')}</div>
            <div class="timeline__card">
              <span class="timeline__year">${item.year}</span>
              <h3 class="timeline__title">${item.title}</h3>
              <p class="timeline__subtitle">${item.subtitle}</p>
              <p class="timeline__description">${item.description}</p>
            </div>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}
