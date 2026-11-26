// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mansour-technologies.github.io',
  base: '/ayoub-harti-website-concept',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
