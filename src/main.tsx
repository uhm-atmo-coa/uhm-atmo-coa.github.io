import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './i18n';
import './index.css';

const container = document.getElementById('root') as HTMLElement;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered, so hydrate it rather than throwing it away.
// The dev server serves an empty shell, hence the fallback.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
