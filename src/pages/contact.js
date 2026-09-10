import '../style.css';

import { renderContactPage } from '../sections/contact-page.js';
import { renderPage, initCommonPage } from '../layout/page.js';
import { initSceneTransitions } from '../utils/scroll.js';
import { initAmbientScene } from '../components/ambient-scene.js';

const app = document.getElementById('app');

app.innerHTML = renderPage({
  currentPage: 'contact',
  mainContent: renderContactPage(),
});

initCommonPage('contact');
initAmbientScene();
initSceneTransitions();
