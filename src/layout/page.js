import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { initLenis, initScrollReveal, initSmoothScroll, initSplitLines } from '../utils/scroll.js';
import { initSeo } from '../utils/seo.js';
import { initMotion } from '../utils/motion.js';

export function renderPage({ mainContent }) {
  return `
    <div class="page-loader" data-page-loader aria-hidden="true">
      <div class="page-loader__inner">
        <span class="page-loader__label">Loading portfolio</span>
        <span class="page-loader__percent" data-loader-percent>0%</span>
        <span class="page-loader__bar"><span data-loader-bar></span></span>
      </div>
    </div>
    ${renderNavbar()}
    <main>${mainContent}</main>
    ${renderFooter()}
  `;
}

export function initCommonPage(pageKey, { smoothScroll = true } = {}) {
  initLenis();
  initSeo(pageKey);
  initNavbar();
  if (smoothScroll) initSmoothScroll();
  initScrollReveal();
  initSplitLines();
  initMotion();
}
