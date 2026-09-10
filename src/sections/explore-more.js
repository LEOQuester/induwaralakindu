export function renderExploreMore() {
  const links = [
    {
      href: '/about.html',
      eyebrow: 'About',
      title: 'The story behind the builds',
      text: 'Background, roles, education, and the journey so far.',
      accent: '#4f46e5',
    },
    {
      href: '/skills.html',
      eyebrow: 'Skills',
      title: 'The full toolkit',
      text: 'Languages, AI stack, frameworks, and design tools.',
      accent: '#0ea5e9',
    },
    {
      href: '/contact.html',
      eyebrow: 'Contact',
      title: 'Start a conversation',
      text: 'Email, WhatsApp, or call — no forms required.',
      accent: '#7c3aed',
    },
  ];

  return `
    <section class="explore-more section">
      <div class="explore-more__header reveal">
        <span class="section__eyebrow">Explore</span>
        <h2 class="explore-more__title">More than a one-page scroll.</h2>
      </div>
      <div class="explore-more__grid" data-stagger-grid>
        ${links
          .map(
            (link, index) => `
          <a
            href="${link.href}"
            class="explore-card"
            data-tilt
            style="--accent: ${link.accent}; --index: ${index}"
          >
            <span class="explore-card__eyebrow">${link.eyebrow}</span>
            <h3 class="explore-card__title">${link.title}</h3>
            <p class="explore-card__text">${link.text}</p>
            <span class="explore-card__cta">
              Open
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </a>
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}
