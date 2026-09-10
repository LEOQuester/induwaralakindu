import '../style.css';

import { initModelViewer } from '../components/model-viewer.js';
import { renderHero } from '../sections/hero.js';
import { renderStatement } from '../sections/statement.js';
import { renderStories } from '../sections/stories.js';
import { renderTimeline } from '../sections/timeline.js';
import { renderProjects } from '../sections/projects.js';
import { renderCompanies } from '../sections/companies.js';
import { renderExploreMore } from '../sections/explore-more.js';
import { renderPage, initCommonPage } from '../layout/page.js';
import {
  initStoryPanels,
  initParallax,
  initSceneTransitions,
} from '../utils/scroll.js';

const app = document.getElementById('app');

app.innerHTML = renderPage({
  currentPage: 'home',
  mainContent: `
    ${renderHero()}
    ${renderStatement()}
    ${renderStories()}
    ${renderTimeline()}
    ${renderProjects()}
    ${renderCompanies()}
    ${renderExploreMore()}
  `,
});

initCommonPage('home');
initModelViewer();
initStoryPanels();
initParallax();
initSceneTransitions();
