import '../style.css';

import { initModelViewer } from '../components/model-viewer.js';
import { initAmbientScene } from '../components/ambient-scene.js';
import { renderFlowBridge } from '../components/flow-bridge.js';
import { renderHero } from '../sections/hero.js';
import { renderStatement } from '../sections/statement.js';
import { renderAbout } from '../sections/about.js';
import { renderStories } from '../sections/stories.js';
import { renderTimeline } from '../sections/timeline.js';
import { renderProjects } from '../sections/projects.js';
import { renderCompanies } from '../sections/companies.js';
import { renderSkillsPage, initSkillsPage } from '../sections/skills-page.js';
import { renderContactPage } from '../sections/contact-page.js';
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
    ${renderFlowBridge({ label: 'The journey' })}
    ${renderStatement()}
    ${renderAbout()}
    ${renderFlowBridge()}
    <div class="flow-section flow-section--stories">
      ${renderStories()}
    </div>
    ${renderTimeline()}
    ${renderProjects()}
    ${renderCompanies()}
    ${renderFlowBridge()}
    ${renderSkillsPage()}
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
