import { profile } from '../data/profile.js';

const navLinks = [
  { href: '#hero', label: 'Home', section: 'hero' },
  { href: '#about', label: 'About', section: 'about' },
  { href: '#skills', label: 'Skills', section: 'skills' },
  { href: '#work', label: 'Work', section: 'work' },
  { href: '#contact', label: 'Contact', section: 'contact' },
];

export function renderNavbar() {
  return `
    <header class="navbar" data-navbar>
      <a href="#hero" class="navbar__brand" aria-label="${profile.name} — Home">
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
          .map(
            (link) =>
              `<a href="${link.href}" class="navbar__link" data-nav-link data-section="${link.section}">${link.label}</a>`,
          )
          .join('')}
      </nav>
      <a href="#contact" class="btn btn--primary navbar__cta btn--shine" data-magnetic>Let's Talk</a>
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

  initNavbarScrollSpy(links);
}

function initNavbarScrollSpy(links) {
  const sections = navLinks
    .map((link) => document.getElementById(link.section))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (sectionId) => {
    links.forEach((link) => {
      link.classList.toggle('navbar__link--active', link.dataset.section === sectionId);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length) {
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.55] },
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0].id);
}
