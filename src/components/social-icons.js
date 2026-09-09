const icons = {
  linkedin: 'fa-brands fa-linkedin-in',
  github: 'fa-brands fa-github',
  instagram: 'fa-brands fa-instagram',
  youtube: 'fa-brands fa-youtube',
  globe: 'fa-solid fa-globe',
  whatsapp: 'fa-brands fa-whatsapp',
  phone: 'fa-solid fa-phone',
  email: 'fa-solid fa-envelope',
  arrow: 'fa-solid fa-arrow-up-right-from-square',
};

export function renderSocialIcon(id) {
  return `<i class="${icons[id] ?? icons.globe}" aria-hidden="true"></i>`;
}

export function renderSocialLinks(social, { className = 'social-icons' } = {}) {
  return `
    <div class="${className}">
      ${social
        .map(
          (item) => `
        <a
          href="${item.url}"
          class="social-icons__link social-icons__link--${item.id}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${item.label}"
          title="${item.label}"
        >
          ${renderSocialIcon(item.icon ?? item.id)}
        </a>
      `,
        )
        .join('')}
    </div>
  `;
}
