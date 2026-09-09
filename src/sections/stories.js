import { stories } from '../data/stories.js';

export function renderStories() {
  return `
    <section id="stories" class="stories">
      <div class="stories__intro section">
        <div class="section__index reveal">03</div>
        <div class="section__header reveal">
          <span class="section__eyebrow">Featured Stories</span>
          <h2 class="section__title section__title--display">
            Reality,<br />
            <span class="text-dim">engineered.</span>
          </h2>
        </div>
      </div>

      <div class="stories__stack">
        ${stories
          .map((story) => {
            const portraitImage =
              story.images.length === 1 && story.images[0].layout === 'portrait'
                ? story.images[0]
                : null;
            const panelClass = portraitImage ? 'story-panel--portrait' : '';

            return `
          <article class="story-panel ${panelClass}" data-story-panel id="story-${story.id}">
            <div class="story-panel__sticky">
              ${
                portraitImage
                  ? `
                <figure
                  class="story-panel__portrait-media"
                  style="--portrait-ratio: ${portraitImage.width} / ${portraitImage.height}"
                >
                  <img
                    src="${portraitImage.src}"
                    alt="${portraitImage.alt}"
                    width="${portraitImage.width}"
                    height="${portraitImage.height}"
                    loading="lazy"
                    data-parallax-img
                  />
                  ${
                    portraitImage.credit
                      ? `<figcaption class="story-panel__portrait-credit">
                          Photo:
                          <a href="${portraitImage.creditUrl}" target="_blank" rel="noopener noreferrer">${portraitImage.credit}</a>
                        </figcaption>`
                      : ''
                  }
                </figure>
              `
                  : `
              <div class="story-panel__visual">
                <div class="story-panel__gallery" data-parallax-gallery>
                  ${story.images
                    .map(
                      (image, imageIndex) => `
                    <figure class="story-panel__figure ${imageIndex === 0 ? 'story-panel__figure--main' : ''}">
                      <img
                        src="${image.src}"
                        alt="${image.alt}"
                        loading="lazy"
                        data-parallax-img
                      />
                    </figure>
                  `,
                    )
                    .join('')}
                </div>
                <div class="story-panel__glow" aria-hidden="true"></div>
              </div>
              `
              }

              <div class="story-panel__copy">
                <span class="story-panel__index">${story.index}</span>
                <span class="story-panel__tag">${story.tag}</span>
                <h3 class="story-panel__title" data-split-lines>${story.title}</h3>
                <p class="story-panel__subtitle">${story.subtitle}</p>
                <p class="story-panel__description">${story.description}</p>

                <ul class="story-panel__highlights">
                  ${story.highlights.map((item) => `<li>${item}</li>`).join('')}
                </ul>

                <div class="story-panel__stats">
                  ${story.stats
                    .map(
                      (stat) => `
                    <div class="story-panel__stat">
                      <span class="story-panel__stat-value">${stat.value}</span>
                      <span class="story-panel__stat-label">${stat.label}</span>
                    </div>
                  `,
                    )
                    .join('')}
                </div>

                <a href="${story.link}" class="story-panel__link" target="_blank" rel="noopener noreferrer">
                  ${story.linkLabel} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        `;
          })
          .join('')}
      </div>
    </section>
  `;
}
