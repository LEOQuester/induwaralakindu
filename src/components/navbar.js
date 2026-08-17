const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#journey', label: 'Journey' },
  { href: '#work', label: 'Work' },
  { href: '#ventures', label: 'Ventures' },
  { href: '#contact', label: 'Contact' },
];

export function renderNavbar() {
  return `
    <header class="navbar" data-navbar>
      <a href="#hero" class="navbar__brand" aria-label="Induwara Lakindu — Home">
        <span class="navbar__brand-mark">IL</span>
        <span class="navbar__brand-text">Induwara Lakindu</span>
      </a>
      <nav class="navbar__nav" aria-label="Primary">
        ${navLinks
          .map(
            (link) =>
              `<a href="${link.href}" class="navbar__link" data-nav-link>${link.label}</a>`,
          )
          .join('')}
      </nav>
      <a href="#contact" class="btn btn--primary navbar__cta">Let's Talk</a>
      <button class="navbar__toggle" type="button" aria-label="Open menu" data-nav-toggle>
        <span></span><span></span>
      </button>
    </header>
  `;
}

export function initNavbar() {
  const navbar = document.querySelector('[data-navbar]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelectorAll('[data-nav-link]');

  const onScroll = () => {
    navbar?.classList.toggle('navbar--scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => {
    navbar?.classList.toggle('navbar--open');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      navbar?.classList.remove('navbar--open');
    });
  });
}
