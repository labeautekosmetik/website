import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Preview builds (vorschau-a / vorschau-b) set SITE_BASE and SITE_PREVIEW=1;
// they are noindex and get no sitemap. See scripts/build-previews.mjs.
const base = process.env.SITE_BASE ?? '/';
const isPreview = process.env.SITE_PREVIEW === '1';

export default defineConfig({
  site: 'https://labeautekosmetik.de',
  base,
  trailingSlash: 'always',
  outDir: process.env.SITE_OUT_DIR ?? './dist',
  integrations: isPreview ? [] : [sitemap()],
  build: { format: 'directory' },
});
