import '../style.css';

import { renderAbout } from '../sections/about.js';
import { renderTimeline } from '../sections/timeline.js';
import { renderPage, initCommonPage } from '../layout/page.js';
import { initSceneTransitions } from '../utils/scroll.js';
import { initAmbientScene } from '../components/ambient-scene.js';

const app = document.getElementById('app');

app.innerHTML = renderPage({
  currentPage: 'about',
  mainContent: `
    ${renderAbout({ showHero: true })}
    ${renderTimeline()}
  `,
});

initCommonPage('about');
initAmbientScene();
initSceneTransitions();
