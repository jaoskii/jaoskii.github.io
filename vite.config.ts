import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Two pages, same URLs as the old static site: / (index.html) and /work.html.
// Built JS/CSS go to static/ so they never mix with public/assets (images, CV).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    assetsDir: 'static',
    rollupOptions: {
      input: { index: resolve(import.meta.dirname, 'index.html'), work: resolve(import.meta.dirname, 'work.html') },
    },
  },
});
