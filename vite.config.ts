import { copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves static files only. The app uses history-based routing, so a
// deep link like /board needs index.html served as the fallback: Pages does that
// via 404.html. .nojekyll keeps Pages from running the Jekyll pipeline.
function githubPagesFiles() {
  return {
    name: 'github-pages-files',
    apply: 'build' as const,
    closeBundle() {
      const outDir = resolve(__dirname, 'dist');
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
      writeFileSync(resolve(outDir, '.nojekyll'), '');
    },
  };
}

export default defineConfig({
  plugins: [react(), githubPagesFiles()],
  server: {
    host: true,
  },
});
