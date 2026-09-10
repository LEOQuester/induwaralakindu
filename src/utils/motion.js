function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initCursorGlow() {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

  let glow = document.querySelector('.cursor-glow');
  if (!glow) {
    glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener(
    'pointermove',
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive: true },
  );

  const tick = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    glow.style.transform = `translate3d(${currentX - 200}px, ${currentY - 200}px, 0)`;
    requestAnimationFrame(tick);
  };

  tick();
}

export function initScrollProgress() {
  if (prefersReducedMotion()) return;

  let bar = document.querySelector('[data-scroll-progress]');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('data-scroll-progress', '');
    bar.innerHTML = '<span class="scroll-progress__bar"></span>';
    document.body.appendChild(bar);
  }

  const fill = bar.querySelector('.scroll-progress__bar');

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    fill.style.transform = `scaleX(${progress})`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

export function initTiltCards() {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('[data-tilt]');
  const maxTilt = 12;

  cards.forEach((card) => {
    card.classList.add('tilt-card');

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--tilt-x', `${-y * maxTilt}deg`);
      card.style.setProperty('--tilt-y', `${x * maxTilt}deg`);
      card.style.setProperty('--tilt-scale', '1.02');
    };

    const onLeave = () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-scale', '1');
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
  });
}

export function initMagneticElements() {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.classList.add('magnetic');

    const strength = Number(el.dataset.magneticStrength ?? 0.35);

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

export function initStaggerGrids() {
  const grids = document.querySelectorAll('[data-stagger-grid]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('stagger-grid--active');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  grids.forEach((grid) => observer.observe(grid));
}

export function initCountUp() {
  if (prefersReducedMotion()) return;

  const elements = document.querySelectorAll('[data-count-up]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = el.dataset.countUp ?? el.textContent.trim();
        const suffix = el.dataset.countSuffix ?? '';
        const prefix = el.dataset.countPrefix ?? '';

        if (/^\d+/.test(target)) {
          const match = target.match(/^(\d+)(.*)$/);
          const end = Number(match[1]);
          const rest = match[2] ?? '';
          const duration = 1400;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - (1 - progress) ** 3;
            const value = Math.round(end * eased);
            el.textContent = `${prefix}${value}${rest}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }

        observer.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  elements.forEach((el) => observer.observe(el));
}

export function initStatementMotion() {
  const statement = document.querySelector('.statement');
  if (!statement || prefersReducedMotion()) return;

  const lines = statement.querySelectorAll('.statement__line');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        lines.forEach((line, index) => {
          line.style.setProperty('--line-delay', `${index * 0.12}s`);
          line.classList.add('statement__line--in');
        });
        observer.unobserve(statement);
      });
    },
    { threshold: 0.35 },
  );

  observer.observe(statement);
}

export function initHeroTitleWords() {
  if (prefersReducedMotion()) return;

  const lines = document.querySelectorAll('[data-hero-title-line]');
  let wordIndex = 0;

  lines.forEach((line) => {
    const text = line.textContent.trim();
    const isAccent = line.classList.contains('hero__title-accent');
    line.textContent = '';
    line.setAttribute('aria-label', text);

    text.split(/\s+/).forEach((word) => {
      const span = document.createElement('span');
      span.className = isAccent ? 'hero__title-word hero__title-word--accent' : 'hero__title-word';
      span.style.setProperty('--word-i', wordIndex);
      span.textContent = word;
      line.appendChild(span);
      line.appendChild(document.createTextNode(' '));
      wordIndex += 1;
    });
  });
}

export function initSectionDecor() {
  const targets = document.querySelectorAll('.flow-section, .work.section');

  targets.forEach((section, index) => {
    section.classList.add('section--has-decor');

    const decor = document.createElement('div');
    decor.className = 'section-decor';
    decor.setAttribute('aria-hidden', 'true');
    decor.innerHTML = `
      <span class="section-decor__line section-decor__line--top" style="animation-delay: ${index * 0.1}s"></span>
      <span class="section-decor__orb section-decor__orb--1" style="--decor-delay: ${-index * 2}s"></span>
      <span class="section-decor__orb section-decor__orb--2" style="--decor-delay: ${-index * 3}s"></span>
    `;

    section.prepend(decor);
  });
}

export function initSectionIndexParallax() {
  if (prefersReducedMotion()) return;

  const indices = document.querySelectorAll('.section__index, .flow-header__index');
  if (!indices.length) return;

  const onScroll = () => {
    indices.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (progress - 0.5) * 24;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initCardHoverGlow() {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

  document
    .querySelectorAll('.project-card, .about__role-card, .education-item, .statement__pillar')
    .forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
    });
  });
}

export function initFlowSections() {
  const sections = document.querySelectorAll('.flow-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('flow-section--active', entry.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: '-5% 0px -5% 0px' },
  );

  sections.forEach((section) => observer.observe(section));
}

export function initMotion() {
  initCursorGlow();
  initScrollProgress();
  initTiltCards();
  initMagneticElements();
  initStaggerGrids();
  initCountUp();
  initStatementMotion();
  initFlowSections();
  initHeroTitleWords();
  initSectionDecor();
  initSectionIndexParallax();
  initCardHoverGlow();
}
