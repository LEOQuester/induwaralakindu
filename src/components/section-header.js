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
      <p class="section-label" aria-hidden="true">// ${index} — ${eyebrow.toUpperCase()}</p>
      <div class="flow-header__content">
        <h2 class="section__title section__title--display">
          ${title}${accentBlock}
        </h2>
        ${lead ? `<p class="flow-header__lead">${lead}</p>` : ''}
      </div>
    </header>
  `;
}
