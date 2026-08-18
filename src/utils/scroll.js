import Lenis from 'lenis';

export function initLenis() {
  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
  return lenis;
}

export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  elements.forEach((el) => observer.observe(el));
}

export function initSceneTransitions() {
  const scenes = document.querySelectorAll('main > section:not(#hero)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('scene--active', entry.isIntersecting);
      });
    },
    { threshold: 0.08, rootMargin: '-2% 0px -6% 0px' },
  );

  scenes.forEach((section) => {
    section.classList.add('scene');
    observer.observe(section);
  });

  const parallaxSections = document.querySelectorAll('[data-parallax-section]');
  if (!parallaxSections.length) return;

  const onScroll = () => {
    parallaxSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const progress = 1 - Math.min(1, Math.max(0, (rect.top - window.innerHeight * 0.2) / window.innerHeight));
      section.style.setProperty('--section-progress', progress.toFixed(3));
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initStoryPanels() {
  const panels = document.querySelectorAll('[data-story-panel]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('story-panel--active', entry.isIntersecting);
      });
    },
    { threshold: 0.35 },
  );

  panels.forEach((panel) => observer.observe(panel));
}

export function initSplitLines() {
  document.querySelectorAll('[data-split-lines]').forEach((element) => {
    const text = element.textContent.trim();
    element.textContent = '';
    element.setAttribute('aria-label', text);

    text.split(/(?<=\.)\s+/).forEach((line, index) => {
      const wrapper = document.createElement('span');
      wrapper.className = 'split-line';
      wrapper.style.setProperty('--line-index', index);

      const inner = document.createElement('span');
      inner.className = 'split-line__inner';
      inner.textContent = line;

      wrapper.appendChild(inner);
      element.appendChild(wrapper);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('split-lines--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  document.querySelectorAll('[data-split-lines]').forEach((el) => observer.observe(el));
}

export function initParallax() {
  const layers = document.querySelectorAll('[data-parallax-img]');
  if (!layers.length) return;

  const onScroll = () => {
    layers.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * 0.05;
      img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
