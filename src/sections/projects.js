import { projects } from '../data/projects.js';
import { renderSocialIcon } from '../components/social-icons.js';

const projectIcons = {
  galvanprime: 'fa-solid fa-brain',
  primeict: 'fa-solid fa-graduation-cap',
  eduzone: 'fa-solid fa-building-columns',
  oneliquidate: 'fa-solid fa-chart-line',
  tashiauto: 'fa-solid fa-car-side',
  travelzone: 'fa-solid fa-plane-departure',
};

export function renderProjects() {
  return `
    <section id="work" class="work section section--dark">
      <div class="work__top reveal">
        <p class="section-label">// 05 — SELECTED WORK</p>
        <h2 class="section__title section__title--display">
          Native products.<br />
          <span class="text-dim">Real-world impact.</span>
        </h2>
      </div>

      <p class="work__scroll-hint reveal reveal--delay-1">
        Drag or scroll horizontally to explore
      </p>

      <div class="projects-track reveal reveal--delay-2" data-horizontal-scroll>
        <div class="projects-track__inner" data-stagger-grid>
          ${projects
            .map(
              (project, index) => `
            <article class="project-card ${project.featured ? 'project-card--featured' : ''}" data-tilt style="--index: ${index}">
              <div class="project-card__visual" aria-hidden="true">
                <i class="${projectIcons[project.id] ?? 'fa-solid fa-code'}"></i>
                <span>${project.brand}</span>
              </div>
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
                        Visit project ${renderSocialIcon('arrow')}
                      </a>`
                    : ''
                }
              </div>
            </article>
          `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
