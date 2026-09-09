import { projects } from '../data/projects.js';

export function renderProjects() {
  return `
    <section id="work" class="work section">
      <div class="work__top">
        <div class="section__index reveal">05</div>
        <div class="section__header reveal">
          <span class="section__eyebrow">Selected Work</span>
          <h2 class="section__title section__title--display">
            Native products.<br />
            <span class="text-dim">Real-world impact.</span>
          </h2>
        </div>
      </div>

      <div class="projects-grid" data-stagger-grid>
        ${projects
          .map(
            (project, index) => `
          <article class="project-card ${project.featured ? 'project-card--featured' : ''}" data-tilt style="--index: ${index}">
            ${
              project.logo
                ? `<div class="project-card__logo">
                    <img src="${project.logo}" alt="${project.brand} logo" loading="lazy" />
                  </div>`
                : project.image
                  ? `<div class="project-card__media">
                    <img src="${project.image}" alt="${project.title}" loading="lazy" />
                  </div>`
                  : project.brand
                    ? `<div class="project-card__brand" aria-hidden="true">${project.brand}</div>`
                    : ''
            }
            <div class="project-card__body">
              <div class="project-card__top">
                <span class="project-card__num">${String(index + 1).padStart(2, '0')}</span>
                <div class="project-card__tags">
                  ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
                </div>
              </div>
              <h3 class="project-card__title">${project.title}</h3>
              <p class="project-card__tagline">${project.tagline}</p>
              <p class="project-card__description">${project.description}</p>
              ${
                project.link
                  ? `<a href="${project.link}" class="project-card__link" target="_blank" rel="noopener noreferrer">
                      Visit project <span aria-hidden="true">→</span>
                    </a>`
                  : ''
              }
            </div>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}
