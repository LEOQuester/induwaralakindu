import { companies } from '../data/companies.js';

export function renderCompanies() {
  return `
    <section id="ventures" class="ventures section">
      <div class="section__header reveal">
        <span class="section__eyebrow">Ventures</span>
        <h2 class="section__title">Companies I lead and build.</h2>
      </div>
      <div class="ventures-grid">
        ${companies
          .map(
            (company) => `
          <article class="venture-card reveal" style="--accent: ${company.accent}">
            <div class="venture-card__logo">
              <img
                src="${company.logo}"
                alt="${company.name} logo"
                onerror="this.parentElement.classList.add('venture-card__logo--placeholder')"
              />
            </div>
            <div class="venture-card__body">
              <span class="venture-card__role">${company.role}</span>
              <h3 class="venture-card__name">${company.name}</h3>
              <p class="venture-card__description">${company.description}</p>
              <a href="${company.url}" class="venture-card__link" target="_blank" rel="noopener noreferrer">
                Visit ${company.name.split(' ')[0]} →
              </a>
            </div>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}
