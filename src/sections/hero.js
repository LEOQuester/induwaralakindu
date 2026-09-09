import { profile } from '../data/profile.js';
import { social } from '../data/social.js';
import { renderModelViewer } from '../components/model-viewer.js';
import { renderMarquee } from '../components/marquee.js';
import { renderSocialLinks } from '../components/social-icons.js';

const stats = [
  { value: '4th', label: 'Legathon global' },
  { value: 'Top 6', label: 'CSSL Colloquium' },
  { value: '02', label: 'Companies founded' },
  { value: '12+', label: 'Years coding' },
];

const marqueeItems = [
  'Software Engineer · Colombo',
  'Web Development Services',
  'CEO — Galvanprime',
  'AI & Intelligent Systems',
  'Django · Laravel · Next.js',
  'PrimeICT',
];

export function renderHero() {
  return `
    <section id="hero" class="hero" data-hero-section>
      ${renderModelViewer()}

      <div class="hero__orbs" aria-hidden="true">
        <span class="hero__orb hero__orb--1"></span>
        <span class="hero__orb hero__orb--2"></span>
        <span class="hero__orb hero__orb--3"></span>
      </div>

      <div class="hero__overlay" data-hero-overlay aria-hidden="true"></div>
      <div class="hero__mesh" aria-hidden="true"></div>

      <div class="hero__inner">
        <div class="hero__content" data-hero-content>
          <div class="hero__badge reveal">
            <span class="pulse"></span>
            ${profile.availability}
          </div>

          <p class="hero__eyebrow reveal reveal--delay-1">${profile.tagline}</p>

          <h1 class="hero__title reveal reveal--delay-2">
            <span class="hero__title-line">Building</span>
            <em class="hero__title-accent">intelligent</em>
            <span class="hero__title-line">systems.</span>
          </h1>

          <p class="hero__name reveal reveal--delay-3">${profile.name}</p>
          <p class="hero__headline reveal reveal--delay-4">${profile.headline}</p>

          <div class="hero__actions reveal reveal--delay-5">
            <a href="#work" class="btn btn--primary btn--shine" data-magnetic>Explore Work</a>
            <a href="#contact" class="btn btn--ghost" data-magnetic>Get in Touch</a>
          </div>

          <div class="hero__social reveal reveal--delay-5">
            <p class="hero__social-label">Connect with me</p>
            ${renderSocialLinks(social, { className: 'hero__social-icons social-icons social-icons--brand' })}
          </div>
        </div>

        <div class="hero__stats reveal reveal--delay-5" data-hero-stats>
          ${stats
            .map(
              (stat) => `
            <div class="hero__stat">
              <span class="hero__stat-value">${stat.value}</span>
              <span class="hero__stat-label">${stat.label}</span>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div class="hero__scroll reveal reveal--delay-5" data-hero-scroll-hint>
        <span>Scroll to explore</span>
        <div class="hero__scroll-line"></div>
      </div>

      ${renderMarquee(marqueeItems)}
    </section>
  `;
}
