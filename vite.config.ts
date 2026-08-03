import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['geras-macbook-pro-4.tail6bd6c6.ts.net'],
  },
});
