import { profile } from '../data/profile.js';
import { social } from '../data/social.js';
import { renderSocialLinks, renderSocialIcon } from '../components/social-icons.js';

export function renderContact() {
  return `
    <section id="contact" class="contact section">
      <div class="contact__top">
        <div class="section__index reveal">07</div>
        <div class="contact__content reveal">
          <span class="section__eyebrow">Contact</span>
          <h2 class="contact__title">
            Build the foundation<br />
            for tomorrow's<br />
            <span class="contact__title-accent">civilization.</span>
          </h2>
          <p class="contact__lead">
            Need a software engineer or web development partner in Colombo? From AI systems
            and enterprise software to full-stack web apps — let's build it together.
          </p>

          <div class="contact__actions">
            <a href="mailto:${profile.email}" class="btn btn--primary btn--large">
              ${profile.email}
            </a>
          </div>

          <div class="contact__phone reveal">
            <span class="contact__phone-label">Phone</span>
            <span class="contact__phone-value">${profile.phoneDisplay}</span>
            <div class="contact__phone-actions">
              <a
                href="${profile.whatsapp}"
                class="btn btn--whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${renderSocialIcon('whatsapp')}
                WhatsApp
              </a>
              <a href="${profile.tel}" class="btn btn--call">
                ${renderSocialIcon('phone')}
                Call
              </a>
            </div>
          </div>

          ${renderSocialLinks(social, { className: 'contact__social social-icons' })}
        </div>
      </div>
    </section>
  `;
}
