import '../style.css';

import { initModelViewer } from '../components/model-viewer.js';
import { initAmbientScene } from '../components/ambient-scene.js';
import { renderHero } from '../sections/hero.js';
import { renderStatement } from '../sections/statement.js';
import { renderStories } from '../sections/stories.js';
import { renderAbout } from '../sections/about.js';
import { renderTimeline } from '../sections/timeline.js';
import { renderProjects } from '../sections/projects.js';
import { renderCompanies } from '../sections/companies.js';
import { renderSkillsPage, initSkillsPage } from '../sections/skills-page.js';
import { renderContactPage } from '../sections/contact-page.js';
import { renderPageCta } from '../sections/page-cta.js';
import { renderPage, initCommonPage } from '../layout/page.js';
import {
  initStoryPanels,
  initParallax,
  initSceneTransitions,
} from '../utils/scroll.js';

const app = document.getElementById('app');

app.innerHTML = renderPage({
  mainContent: `
    ${renderHero()}
    ${renderStatement()}
    ${renderStories()}
    ${renderAbout({ showHero: true })}
    ${renderTimeline()}
    ${renderProjects()}
    ${renderCompanies()}
    ${renderSkillsPage()}
    ${renderPageCta({
      eyebrow: 'Contact',
      title: 'Like what you see?',
      text: "Reach out and let's talk about what you're building.",
      primary: { href: '/#contact', label: 'Get in Touch' },
      secondary: { href: '/#about', label: 'About Me' },
    })}
    ${renderContactPage()}
  `,
});

initCommonPage('home');
initModelViewer();
initAmbientScene();
initSkillsPage();
initStoryPanels();
initParallax();
initSceneTransitions();
