import { profile } from '../data/profile.js';
import { social } from '../data/social.js';
import { renderSocialLinks, renderSocialIcon } from '../components/social-icons.js';
import { renderPageHero } from './page-hero.js';

const channels = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    hint: 'Best for detailed briefs, proposals, and project docs.',
    cta: 'Send an email',
    tone: 'indigo',
    icon: '✉',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: profile.phoneDisplay,
    href: profile.whatsapp,
    hint: 'Fastest way to get a reply — great for quick questions.',
    cta: 'Open WhatsApp',
    tone: 'green',
    icon: '💬',
    external: true,
  },
  {
    id: 'call',
    label: 'Phone',
    value: profile.phoneDisplay,
    href: profile.tel,
    hint: 'Prefer talking it through? Call or request a callback.',
    cta: 'Call now',
    tone: 'sky',
    icon: '📞',
  },
];

const helpTopics = [
  'Custom web apps',
  'AI & agent systems',
  'Enterprise software',
  'Technical consulting',
  'Education & mentoring',
];

export function renderContactPage() {
  return `
    ${renderPageHero({
      eyebrow: 'Contact',
      title: "Let's build",
      titleAccent: 'something real.',
      lead: 'No contact form maze — pick a lane below and reach out directly. I read every message.',
      index: '01',
      className: 'page-hero--contact',
      id: 'contact',
    })}

    <section class="contact-page section">
      <div class="contact-page__status reveal">
        <span class="contact-page__status-dot"></span>
        <div>
          <p class="contact-page__status-label">Availability</p>
          <p class="contact-page__status-value">${profile.availability}</p>
        </div>
        <div class="contact-page__location">
          <span class="contact-page__location-label">Based in</span>
          <span class="contact-page__location-value">${profile.location}</span>
        </div>
      </div>

      <div class="contact-page__lanes" data-stagger-grid>
        ${channels
          .map(
            (channel, index) => `
          <a
            href="${channel.href}"
            class="contact-lane contact-lane--${channel.tone}"
            data-tilt
            style="--index: ${index}"
            ${channel.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
          >
            <span class="contact-lane__icon" aria-hidden="true">${channel.icon}</span>
            <div class="contact-lane__body">
              <span class="contact-lane__label">${channel.label}</span>
              <span class="contact-lane__value">${channel.value}</span>
              <p class="contact-lane__hint">${channel.hint}</p>
            </div>
            <span class="contact-lane__cta">
              ${channel.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </a>
        `,
          )
          .join('')}
      </div>

      <div class="contact-page__grid reveal">
        <div class="contact-page__topics">
          <span class="section__eyebrow">What I can help with</span>
          <h2 class="contact-page__topics-title">Bring the problem.<br />I'll bring the stack.</h2>
          <ul class="contact-page__topic-list">
            ${helpTopics.map((topic) => `<li>${topic}</li>`).join('')}
          </ul>
          <a
            href="${profile.resume}"
            class="btn btn--outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>

        <div class="contact-page__social-card">
          <span class="section__eyebrow">Social</span>
          <h2 class="contact-page__social-title">Follow the journey.</h2>
          <p class="contact-page__social-copy">
            Projects, builds, and behind-the-scenes from Galvanprime and PrimeICT.
          </p>
          ${renderSocialLinks(social, {
            className: 'contact-page__social social-icons social-icons--brand',
          })}
          <div class="contact-page__quick">
            <a href="${profile.whatsapp}" class="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
              ${renderSocialIcon('whatsapp')}
              WhatsApp
            </a>
            <a href="${profile.tel}" class="btn btn--call">
              ${renderSocialIcon('phone')}
              Call
            </a>
          </div>
        </div>
      </div>

      <div class="contact-page__flow reveal">
        <span class="section__eyebrow">What happens next</span>
        <ol class="contact-page__steps">
          <li>
            <span class="contact-page__step-num">01</span>
            <div>
              <h3>You reach out</h3>
              <p>Email, WhatsApp, or a call — whatever feels right.</p>
            </div>
          </li>
          <li>
            <span class="contact-page__step-num">02</span>
            <div>
              <h3>We align on scope</h3>
              <p>A quick conversation to understand goals, timeline, and fit.</p>
            </div>
          </li>
          <li>
            <span class="contact-page__step-num">03</span>
            <div>
              <h3>We build</h3>
              <p>From prototype to production — with clear communication throughout.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  `;
}
