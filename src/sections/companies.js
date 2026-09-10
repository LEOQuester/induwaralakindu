import { companies } from '../data/companies.js';
import { renderMarquee } from '../components/marquee.js';

export function renderCompanies() {
  const names = companies.map((c) => c.name);

  return `
    <section id="ventures" class="ventures section section--bleed">
      <div class="ventures__marquee">
        ${renderMarquee(names, { separator: '—' })}
      </div>

      <div class="ventures__inner section">
        <div class="section__header reveal">
          <p class="section-label">// 06 — VENTURES</p>
          <h2 class="section__title section__title--display">
            Companies I lead<br />
            <span class="text-dim">and build.</span>
          </h2>
        </div>

        <div class="ventures-grid" data-stagger-grid>
          ${companies
            .map(
              (company, index) => `
            <article class="venture-card" data-tilt style="--accent: ${company.accent}; --index: ${index}">
              <div class="venture-card__header">
                ${
                  company.logo
                    ? `<img src="${company.logo}" alt="${company.name} logo" class="venture-card__logo" loading="lazy" />`
                    : `<span class="venture-card__num">${String(index + 1).padStart(2, '0')}</span>`
                }
                <span class="venture-card__role">${company.role}</span>
              </div>              <h3 class="venture-card__name">${company.name}</h3>
              <p class="venture-card__description">${company.description}</p>
              <a href="${company.url}" class="venture-card__link" target="_blank" rel="noopener noreferrer">
                Visit ${company.name.split(' ')[0]} →
              </a>
            </article>
          `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
