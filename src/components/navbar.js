import { profile } from '../data/profile.js';

const navLinks = [
  { href: '/', label: 'Home', page: 'home' },
  { href: '/about', label: 'About', page: 'about' },
  { href: '/skills', label: 'Skills', page: 'skills' },
  { href: '/#work', label: 'Work', page: 'work' },
  { href: '/contact', label: 'Contact', page: 'contact' },
];

export function renderNavbar({ currentPage = 'home' } = {}) {
  return `
    <header class="navbar" data-navbar>
      <a href="/" class="navbar__brand" aria-label="${profile.name} — Home">
        <img
          src="${profile.portrait}"
          alt="${profile.name}"
          class="navbar__avatar"
          width="44"
          height="44"
        />
        <span class="navbar__name">${profile.name}</span>
      </a>
      <nav class="navbar__nav" aria-label="Primary">
        ${navLinks
          .map((link) => {
            const isActive = link.page === currentPage;
            return `<a href="${link.href}" class="navbar__link${isActive ? ' navbar__link--active' : ''}" data-nav-link>${link.label}</a>`;
          })
          .join('')}
      </nav>
      <div class="navbar__actions">
        <a
          href="${profile.resume}"
          class="btn btn--outline navbar__cv"
          target="_blank"
          rel="noopener noreferrer"
          data-nav-action
        >
          Download CV
        </a>
        <a href="/contact" class="btn btn--primary navbar__cta" data-nav-action>Let's Talk</a>
      </div>
      <button class="navbar__toggle" type="button" aria-label="Open menu" data-nav-toggle>
        <span></span><span></span>
      </button>
    </header>
  `;
}

export function initNavbar() {
  const navbar = document.querySelector('[data-navbar]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelectorAll('[data-nav-link], [data-nav-action]');

  const onScroll = () => {
    navbar?.classList.toggle('navbar--scrolled', window.scrollY > 32);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => {
    navbar?.classList.toggle('navbar--open');
    document.body.classList.toggle('menu-open', navbar?.classList.contains('navbar--open'));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      navbar?.classList.remove('navbar--open');
      document.body.classList.remove('menu-open');
    });
  });
}
