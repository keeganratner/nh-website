import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pathways marked `unlisted: true` are reachable only by their exact URL. The
// templates keep them out of the nav, the home grid, and the cross-links, and
// serve them noindex; this keeps them out of sitemap.xml too.
const contentDir = new URL('./src/content/pathways', import.meta.url).pathname;
const unlisted = readdirSync(contentDir)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => /^unlisted:\s*true\s*$/m.test(readFileSync(join(contentDir, file), 'utf8')))
  .map((file) => `/${file.replace(/\.md$/, '')}/`);

export default defineConfig({
  site: 'https://neighbourhoods.network',
  integrations: [
    sitemap({
      filter: (page) => !unlisted.some((path) => page.endsWith(path)),
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
