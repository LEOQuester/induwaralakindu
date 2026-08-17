import { timeline } from '../data/timeline.js';

export function renderTimeline() {
  return `
    <section id="journey" class="journey section">
      <div class="section__header reveal">
        <span class="section__eyebrow">Journey</span>
        <h2 class="section__title">Key milestones that shaped the path.</h2>
      </div>
      <div class="timeline">
        ${timeline
          .map(
            (item, index) => `
          <article class="timeline__item reveal ${item.highlight ? 'timeline__item--highlight' : ''}" style="--index: ${index}">
            <div class="timeline__marker">
              <span class="timeline__number">${String(index + 1).padStart(2, '0')}</span>
            </div>
            <div class="timeline__card">
              <div class="timeline__media">
                <img
                  src="${item.image}"
                  alt="${item.title}"
                  loading="lazy"
                  onerror="this.parentElement.classList.add('timeline__media--placeholder')"
                />
              </div>
              <div class="timeline__body">
                <span class="timeline__year">${item.year}</span>
                <h3 class="timeline__title">${item.title}</h3>
                <p class="timeline__subtitle">${item.subtitle}</p>
                <p class="timeline__description">${item.description}</p>
              </div>
            </div>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}
