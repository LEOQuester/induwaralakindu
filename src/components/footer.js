import { social } from '../data/social.js';
import { renderSocialLinks } from '../components/social-icons.js';

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <p class="footer__name">Induwara Lakindu</p>
          <p class="footer__tagline">Software Engineer · Web Developer · Colombo</p>
          <p class="footer__seo">
            Custom web development &amp; software engineering services in Colombo, Sri Lanka.
          </p>
        </div>
        ${renderSocialLinks(social, { className: 'footer__social social-icons' })}
        <p class="footer__copy">&copy; ${year} Induwara Lakindu. All rights reserved.</p>
      </div>
    </footer>
  `;
}
