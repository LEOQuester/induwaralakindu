import { social } from '../data/social.js';

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <p class="footer__name">Induwara Lakindu</p>
          <p class="footer__tagline">CEO · Galvanprime · AI Engineer</p>
        </div>
        <div class="footer__links">
          ${social
            .map(
              (item) =>
                `<a href="${item.url}" class="footer__link" target="_blank" rel="noopener noreferrer">${item.label}</a>`,
            )
            .join('')}
        </div>
        <p class="footer__copy">&copy; ${year} Induwara Lakindu. All rights reserved.</p>
      </div>
    </footer>
  `;
}
