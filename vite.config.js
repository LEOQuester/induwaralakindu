import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        skills: 'skills.html',
        contact: 'contact.html',
      },
    },
  },
});
