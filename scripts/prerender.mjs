import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');
const ssrDir = resolve(root, '.ssr-build');

const { getPageMeta, notFoundMeta, prerenderRoutes, render, siteName, siteUrl } = await import(
  pathToFileURL(resolve(ssrDir, 'entry-server.js')).href
);

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8');

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function headFor({ title, description, canonical, noindex, preloadHero }) {
  const ogImage = `${siteUrl}/og-image.jpg`;

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    // The hero logo is the LCP element on the home page only.
    preloadHero ? '<link rel="preload" as="image" href="/logo_only.webp" />' : '',
  ]
    .filter(Boolean)
    .map((tag) => `    ${tag}`)
    .join('\n');
}

function buildPage({ path, meta, noindex = false }) {
  const canonical = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`;
  const appHtml = render(path);

  return template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, headFor({ ...meta, canonical, noindex, preloadHero: path === '/' }).trim())
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function writePage(outPath, html) {
  const file = resolve(distDir, outPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// Real HTML file per route, so each URL returns 200 with indexable markup.
// Non-root routes are written twice: `about.html` so the canonical, slash-less
// /about serves a direct 200 (Pages resolves extensionless requests to .html),
// and `about/index.html` so /about/ also works instead of 404ing. Both carry
// the same canonical, so the duplicate is not an SEO problem.
for (const path of prerenderRoutes) {
  const html = buildPage({ path, meta: getPageMeta(path) });

  if (path === '/') {
    writePage('index.html', html);
  } else {
    const slug = path.slice(1);
    writePage(`${slug}.html`, html);
    writePage(`${slug}/index.html`, html);
  }

  console.log(`prerendered ${path}`);
}

// Fallback for URLs that match no route. Pages serves this with a 404 status,
// which is now correct: only genuinely-missing pages land here.
writePage('404.html', buildPage({ path: '/__not-found__', meta: notFoundMeta, noindex: true }));

writeFileSync(
  resolve(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${prerenderRoutes
    .map((path) => `  <url><loc>${path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);

writeFileSync(
  resolve(distDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);

writeFileSync(resolve(distDir, '.nojekyll'), '');
rmSync(ssrDir, { recursive: true, force: true });
console.log('prerendered 404.html, sitemap.xml, robots.txt');
