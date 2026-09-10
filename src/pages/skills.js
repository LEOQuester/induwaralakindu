import '../style.css';

import { renderSkillsPage, initSkillsPage } from '../sections/skills-page.js';
import { renderPageCta } from '../sections/page-cta.js';
import { renderPage, initCommonPage } from '../layout/page.js';
import { initSceneTransitions } from '../utils/scroll.js';
import { initAmbientScene } from '../components/ambient-scene.js';

const app = document.getElementById('app');

app.innerHTML = renderPage({
  currentPage: 'skills',
  mainContent: `
    ${renderSkillsPage()}
    ${renderPageCta({
      eyebrow: 'Contact',
      title: 'Like what you see?',
      text: 'Reach out and let’s talk about what you’re building.',
      primary: { href: '/contact.html', label: 'Get in Touch' },
      secondary: { href: '/about.html', label: 'About Me' },
    })}
  `,
});

initCommonPage('skills');
initAmbientScene();
initSkillsPage();
initSceneTransitions();
