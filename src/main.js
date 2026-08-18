import './style.css';

import { renderNavbar, initNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { initModelViewer } from './components/model-viewer.js';
import { renderHero } from './sections/hero.js';
import { renderStatement } from './sections/statement.js';
import { renderStories } from './sections/stories.js';
import { renderAbout } from './sections/about.js';
import { renderTechStack } from './sections/tech-stack.js';
import { renderTimeline } from './sections/timeline.js';
import { renderProjects } from './sections/projects.js';
import { renderCompanies } from './sections/companies.js';
import { renderContact } from './sections/contact.js';
import {
  initLenis,
  initScrollReveal,
  initSmoothScroll,
  initStoryPanels,
  initSplitLines,
  initParallax,
  initSceneTransitions,
} from './utils/scroll.js';
import { initSeo } from './utils/seo.js';

const app = document.getElementById('app');

app.innerHTML = `
  ${renderNavbar()}
  <main>
    ${renderHero()}
    ${renderStatement()}
    ${renderStories()}
    ${renderAbout()}
    ${renderTechStack()}
    ${renderTimeline()}
    ${renderProjects()}
    ${renderCompanies()}
    ${renderContact()}
  </main>
  ${renderFooter()}
`;

initLenis();
initSeo();
initNavbar();
initModelViewer();
initSmoothScroll();
initScrollReveal();
initStoryPanels();
initSplitLines();
initParallax();
initSceneTransitions();
