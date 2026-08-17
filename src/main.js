import './style.css';

import { renderNavbar, initNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { initModelViewer } from './components/model-viewer.js';
import { renderHero } from './sections/hero.js';
import { renderAbout } from './sections/about.js';
import { renderTimeline } from './sections/timeline.js';
import { renderProjects } from './sections/projects.js';
import { renderCompanies } from './sections/companies.js';
import { renderContact } from './sections/contact.js';
import { initScrollReveal, initSmoothScroll } from './utils/scroll.js';

const app = document.getElementById('app');

app.innerHTML = `
  ${renderNavbar()}
  <main>
    ${renderHero()}
    ${renderAbout()}
    ${renderTimeline()}
    ${renderProjects()}
    ${renderCompanies()}
    ${renderContact()}
  </main>
  ${renderFooter()}
`;

initNavbar();
initModelViewer();
initSmoothScroll();
initScrollReveal();
