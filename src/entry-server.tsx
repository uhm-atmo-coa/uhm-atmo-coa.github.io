import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import './i18n';

export {
  getPageMeta,
  notFoundMeta,
  prerenderRoutes,
  siteName,
  siteUrl,
} from './utils/seo';

/**
 * Used only by scripts/prerender.mjs at build time. There is no server at
 * runtime — this renders each route to static HTML that GitHub Pages serves
 * directly, so crawlers get real markup and a 200 instead of the SPA 404 shell.
 */
export function render(path: string) {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}
