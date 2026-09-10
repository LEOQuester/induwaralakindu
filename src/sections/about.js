import { profile } from '../data/profile.js';
import { education } from '../data/education.js';
import { renderPageHero } from './page-hero.js';
import { renderPageCta } from './page-cta.js';

export function renderAbout({ showHero = false } = {}) {
  const hero = showHero
    ? renderPageHero({
        eyebrow: 'About',
        title: 'Engineer, founder,',
        titleAccent: 'educator.',
        lead: profile.bio,
        index: '01',
      })
    : '';

  return `
    ${hero}
    <section id="about" class="about section ${showHero ? 'about--page' : ''}">
      ${
        showHero
          ? ''
          : `
      <div class="about__top">
        <div class="section__index reveal">03</div>
        <div class="section__header reveal">
          <span class="section__eyebrow">About</span>
          <h2 class="section__title section__title--display">
            Software engineer<br />
            <span class="text-dim">in Colombo, building</span><br />
            intelligent systems<br />
            &amp; web products.
          </h2>
        </div>
      </div>
      `
      }

      <div class="about__grid">
        <div class="about__bio reveal">
          ${showHero ? '' : `<p class="about__lead">${profile.bio}</p>`}
          <div class="about__meta">
            <div class="about__meta-item">
              <span class="about__meta-label">Based in</span>
              <span class="about__meta-value">${profile.location}</span>
            </div>
            <div class="about__meta-item">
              <span class="about__meta-label">Leading</span>
              <span class="about__meta-value">Galvanprime (Pvt) Ltd</span>
            </div>
          </div>
          <a href="${profile.resume}" class="btn btn--outline about__cv" download>
            Download CV
          </a>
        </div>

        <div class="about__portrait-wrap reveal reveal--delay-2" data-tilt>
          <img
            src="${profile.portrait}"
            alt="${profile.name} — software engineer and web developer in Colombo, Sri Lanka"
            class="about__portrait"
          />
          <span class="about__portrait-caption">ICT Educator · PrimeICT.lk</span>
        </div>
      </div>

      <div class="about__roles reveal">
        ${profile.roles
          .map(
            (role) => `
          <div class="about__role-card">
            <span class="about__role-label">${role.label}</span>
            <span class="about__role-org">${role.org}</span>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="about__education reveal">
        <div class="about__education-header">
          <span class="section__eyebrow">Academic Background</span>
          <h3 class="about__education-title">Dual degrees. One relentless drive.</h3>
        </div>
        <div class="education-list">
          ${education
            .map(
              (item, index) => `
            <article class="education-item" style="--index: ${index}">
              <span class="education-item__num">${String(index + 1).padStart(2, '0')}</span>
              <div class="education-item__body">
                <h4 class="education-item__degree">${item.degree}</h4>
                <p class="education-item__institution">${item.institution}</p>
              </div>
              <span class="education-item__status">${item.status}</span>
            </article>
          `,
            )
            .join('')}
        </div>
      </div>
    </section>

    ${
      showHero
        ? renderPageCta({
            eyebrow: 'Skills',
            title: 'Want the full toolkit?',
            text: 'Explore the languages, frameworks, AI stack, and design tools I work with every day.',
            primary: { href: '/skills.html', label: 'View Skills' },
            secondary: { href: '/contact.html', label: 'Get in Touch' },
          })
        : ''
    }
  `;
}
