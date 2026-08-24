export function renderPageCta({ eyebrow, title, text, primary, secondary }) {
  return `
    <section class="page-cta section">
      <div class="page-cta__inner reveal">
        <span class="section__eyebrow">${eyebrow}</span>
        <h2 class="page-cta__title">${title}</h2>
        <p class="page-cta__text">${text}</p>
        <div class="page-cta__actions">
          <a href="${primary.href}" class="btn btn--primary">${primary.label}</a>
          ${
            secondary
              ? `<a href="${secondary.href}" class="btn btn--ghost">${secondary.label}</a>`
              : ''
          }
        </div>
      </div>
    </section>
  `;
}
