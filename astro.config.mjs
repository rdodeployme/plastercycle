// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves a project site under /<repo>/. The deploy workflow sets
// SITE_URL and BASE_PATH; with a custom domain (plastercycle.com) both default to the root.
export default defineConfig({
  site: process.env.SITE_URL || 'https://plastercycle.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
