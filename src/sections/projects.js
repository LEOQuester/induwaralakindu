import { projects } from '../data/projects.js';

export function renderProjects() {
  return `
    <section id="work" class="work section">
      <div class="section__header reveal">
        <span class="section__eyebrow">Selected Work</span>
        <h2 class="section__title">Projects at the intersection of AI, robotics, and software.</h2>
      </div>
      <div class="projects-grid">
        ${projects
          .map(
            (project, index) => `
          <article class="project-card reveal ${project.featured ? 'project-card--featured' : ''}" style="--index: ${index}">
            <div class="project-card__media ${project.logo ? 'project-card__media--logo' : ''}">
              <img
                src="${project.image}"
                alt="${project.title}"
                loading="lazy"
                onerror="this.parentElement.classList.add('project-card__media--placeholder')"
              />
              ${project.model ? `<span class="project-card__badge">3D</span>` : ''}
            </div>
            <div class="project-card__body">
              <h3 class="project-card__title">${project.title}</h3>
              <p class="project-card__tagline">${project.tagline}</p>
              <p class="project-card__description">${project.description}</p>
              <div class="project-card__tags">
                ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
              </div>
              ${
                project.link
                  ? `<a href="${project.link}" class="project-card__link" target="_blank" rel="noopener noreferrer">Visit project →</a>`
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
