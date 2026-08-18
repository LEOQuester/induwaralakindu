export function renderMarquee(items, { separator = '✦', duplicate = true } = {}) {
  const trackItems = duplicate ? [...items, ...items] : items;

  return `
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        ${trackItems
          .map(
            (item) => `
          <span class="marquee__item">${item}</span>
          <span class="marquee__sep">${separator}</span>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}
