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

      <div class="journey-list" data-stagger-grid>
        ${timeline
          .map(
            (item, index) => `
          <article
            class="journey-item ${item.highlight ? 'journey-item--highlight' : ''}"
            style="--index: ${index}"
          >
            <span class="journey-item__num">${String(index + 1).padStart(2, '0')}</span>
            <div class="journey-item__body">
              <h3 class="journey-item__title">${item.title}</h3>
              <p class="journey-item__subtitle">${item.subtitle}</p>
              <p class="journey-item__description">${item.description}</p>
            </div>
            <span class="journey-item__year">${item.year}</span>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}
