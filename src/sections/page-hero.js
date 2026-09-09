import { renderAmbientScene } from '../components/ambient-scene.js';

export function renderPageHero({
  eyebrow,
  title,
  titleAccent,
  lead,
  index = '01',
  className = '',
  id = '',
}) {
  const accentLine = titleAccent
    ? `<em class="page-hero__accent">${titleAccent}</em>`
    : '';

  return `
    <section class="page-hero ${className}"${id ? ` id="${id}"` : ''}>
      ${renderAmbientScene()}
      <div class="page-hero__inner">
        <div class="page-hero__index reveal">${index}</div>
        <div class="page-hero__content reveal reveal--delay-1">
          <span class="section__eyebrow">${eyebrow}</span>
          <h1 class="page-hero__title">
            ${title}
            ${accentLine}
          </h1>
          ${lead ? `<p class="page-hero__lead">${lead}</p>` : ''}
        </div>
      </div>
      <div class="page-hero__glow" aria-hidden="true"></div>
    </section>
  `;
}
