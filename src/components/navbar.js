import { profile } from '../data/profile.js';

const navLinks = [
  { href: '/', label: 'Home', page: 'home' },
  { href: '/about.html', label: 'About', page: 'about' },
  { href: '/skills.html', label: 'Skills', page: 'skills' },
  { href: '/#work', label: 'Work', page: 'work' },
  { href: '/contact.html', label: 'Contact', page: 'contact' },
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
      <a href="/contact.html" class="btn btn--primary navbar__cta btn--shine" data-magnetic>Let's Talk</a>
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
