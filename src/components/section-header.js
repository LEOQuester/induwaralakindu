export function renderSectionHeader({
  id = '',
  index,
  eyebrow,
  title,
  titleAccent = '',
  lead = '',
  className = '',
}) {
  const accentBlock = titleAccent
    ? `<br /><span class="text-dim">${titleAccent}</span>`
    : '';

  return `
    <header class="flow-header reveal ${className}"${id ? ` id="${id}"` : ''}>
      <div class="flow-header__index" aria-hidden="true">${index}</div>
      <div class="flow-header__content">
        <span class="section__eyebrow">${eyebrow}</span>
        <h2 class="section__title section__title--display">
          ${title}${accentBlock}
        </h2>
        ${lead ? `<p class="flow-header__lead">${lead}</p>` : ''}
      </div>
    </header>
  `;
}
