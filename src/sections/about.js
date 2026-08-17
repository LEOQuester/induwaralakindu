import { profile } from '../data/profile.js';
import { skills } from '../data/skills.js';

export function renderAbout() {
  return `
    <section id="about" class="about section">
      <div class="section__header reveal">
        <span class="section__eyebrow">About</span>
        <h2 class="section__title">Discipline, curiosity, and a long commitment to technology.</h2>
      </div>
      <div class="about__grid">
        <div class="about__bio reveal">
          <p class="about__lead">${profile.bio}</p>
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
          <a href="${profile.resume}" class="btn btn--ghost about__cv" download>
            Download CV
          </a>
        </div>
        <div class="about__image reveal reveal--delay-2">
          <img
            src="/assets/images/profile/about-portrait.jpg"
            alt="${profile.name} — about photo"
            class="about__portrait"
            onerror="this.parentElement.classList.add('about__image--placeholder')"
          />
        </div>
      </div>
      <div class="skills-grid reveal">
        ${skills
          .map(
            (group) => `
          <article class="skill-card">
            <h3 class="skill-card__title">${group.category}</h3>
            <ul class="skill-card__list">
              ${group.items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}
