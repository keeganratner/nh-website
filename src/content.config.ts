import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One Markdown file per audience page, in src/content/pathways/.
// Frontmatter carries the metadata; the body carries the prose. Everything
// before the first `##` becomes the intro; each `##` starts a new section.
const pathways = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pathways' }),
  schema: z.object({
    label: z.string(),
    kicker: z.string(),
    title: z.string(),
    subtitle: z.string(),
    hook: z.string(),
    order: z.number().int().positive(),
    cards: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .min(1),
    cta: z.string(),
    // Reachable only by its exact URL: kept out of the nav, the home grid,
    // the cross-links, and the sitemap, and served noindex.
    unlisted: z.boolean().default(false),
  }),
});

export const collections = { pathways };
