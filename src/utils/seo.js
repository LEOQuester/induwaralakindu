import { seo, site, pageSeo, getStructuredData } from '../data/seo.js';

function setMeta(name, content, { property = false } = {}) {
  if (!content) return;

  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);

  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }

  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;

  let el = document.querySelector(`link[rel="${rel}"]`);

  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }

  el.setAttribute('href', href);
}

export function initSeo(pageKey = 'home') {
  const page = pageSeo[pageKey] ?? pageSeo.home;
  const title = page.title ?? seo.title;
  const description = page.description ?? seo.description;
  const path = page.path ?? '/';
  const canonical = `${site.url}${path === '/' ? '/' : path}`;

  document.documentElement.lang = site.language;

  document.title = title;
  setMeta('description', description);
  setMeta('keywords', seo.keywords.join(', '));
  setMeta('author', site.name);
  setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('googlebot', 'index, follow');
  setMeta('geo.region', 'LK-11');
  setMeta('geo.placename', site.city);
  setMeta('geo.position', '6.9271;79.8612');
  setMeta('ICBM', '6.9271, 79.8612');

  setLink('canonical', canonical);
  setLink('alternate', canonical);

  setMeta('og:type', 'website', { property: true });
  setMeta('og:site_name', site.name, { property: true });
  setMeta('og:url', canonical, { property: true });
  setMeta('og:title', title, { property: true });
  setMeta('og:description', description, { property: true });
  setMeta('og:image', seo.ogImage, { property: true });
  setMeta('og:image:alt', seo.ogImageAlt, { property: true });
  setMeta('og:locale', site.locale, { property: true });

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', seo.ogImage);
  setMeta('twitter:image:alt', seo.ogImageAlt);

  const existing = document.getElementById('structured-data');
  existing?.remove();

  const script = document.createElement('script');
  script.id = 'structured-data';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(getStructuredData(pageKey));
  document.head.appendChild(script);
}
