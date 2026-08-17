import { profile } from '../data/profile.js';
import { renderModelViewer } from '../components/model-viewer.js';

const stats = [
  { value: '12+', label: 'Years coding' },
  { value: '1st', label: 'Chess robot in SL' },
  { value: '2', label: 'Companies founded' },
  { value: 'AI', label: 'Engineer & CEO' },
];

export function renderHero() {
  return `
    <section id="hero" class="hero section">
      <div class="hero__bg" aria-hidden="true">
        <div class="hero__orb hero__orb--1"></div>
        <div class="hero__orb hero__orb--2"></div>
        <div class="hero__orb hero__orb--3"></div>
        <div class="hero__grid"></div>
      </div>

      <div class="hero__content">
        <div class="hero__badge reveal">
          <span class="pulse"></span>
          ${profile.availability}
        </div>
        <p class="hero__eyebrow reveal reveal--delay-1">${profile.tagline}</p>
        <h1 class="hero__title reveal reveal--delay-2">
          <span class="hero__title-line">I'm</span>
          <span class="hero__title-accent">${profile.name}</span>
        </h1>
        <p class="hero__headline reveal reveal--delay-3">${profile.headline}</p>
        <div class="hero__actions reveal reveal--delay-4">
          <a href="#work" class="btn btn--primary">View My Work</a>
          <a href="#contact" class="btn btn--ghost">Get in Touch</a>
        </div>
        <div class="hero__roles reveal reveal--delay-5">
          ${profile.roles
            .slice(0, 4)
            .map(
              (role) =>
                `<span class="hero__role"><strong>${role.label}</strong> · ${role.org}</span>`,
            )
            .join('')}
        </div>
      </div>

      <div class="hero__visual reveal reveal--delay-3">
        ${renderModelViewer()}
        <p class="hero__hint">Drag to explore</p>
      </div>

      <div class="hero__stats reveal reveal--delay-5">
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
    </section>
  `;
}
