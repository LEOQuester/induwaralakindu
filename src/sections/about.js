import { profile } from '../data/profile.js';
import { education } from '../data/education.js';
import { renderSectionHeader } from '../components/section-header.js';

export function renderAbout() {
  return `
    <section id="about" class="about section flow-section flow-section--about">
      ${renderSectionHeader({
        index: '02',
        eyebrow: 'About',
        title: 'Engineer, founder,',
        titleAccent: 'educator.',
        lead: profile.bio,
      })}

      <div class="about__grid">
        <div class="about__bio reveal">
          <div class="about__meta">
            <div class="about__meta-item">
              <span class="about__meta-label">Based in</span>
              <span class="about__meta-value">${profile.location}</span>
            </div>
            <div class="about__meta-item">
              <span class="about__meta-label">Leading</span>
              <span class="about__meta-value">Galvanprime (Pvt) Ltd</span>
            </div>
            <div class="about__meta-item">
              <span class="about__meta-label">Availability</span>
              <span class="about__meta-value">${profile.availability}</span>
            </div>
          </div>
          <a
            href="${profile.resume}"
            class="btn btn--outline about__cv"
            target="_blank"
            rel="noopener noreferrer"
          >
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

      <div class="about__roles reveal" data-stagger-grid>
        ${profile.roles
          .map(
            (role, index) => `
          <div class="about__role-card" style="--index: ${index}">
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
  `;
}
