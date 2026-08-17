import { profile } from '../data/profile.js';
import { social } from '../data/social.js';

export function renderContact() {
  return `
    <section id="contact" class="contact section">
      <div class="contact__inner reveal">
        <span class="section__eyebrow">Contact</span>
        <h2 class="contact__title">Let's build something remarkable.</h2>
        <p class="contact__lead">
          Whether it's AI systems, enterprise software, or an ambitious idea — I'm always open to meaningful collaboration.
        </p>
        <div class="contact__actions">
          <a href="mailto:${profile.email}" class="btn btn--primary btn--large">
            ${profile.email}
          </a>
        </div>
        <div class="contact__social">
          ${social
            .map(
              (item) =>
                `<a href="${item.url}" class="contact__social-link" target="_blank" rel="noopener noreferrer">${item.label}</a>`,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
