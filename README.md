# Neighbourhoods.network site redesign

Static site built with [Astro](https://astro.build). The build output in
`dist/` is plain HTML, CSS, and fonts — deployable to any static host.

## Running it

```
npm install
npm run dev        # http://localhost:4321, hot reload
npm run build      # writes dist/
npm run preview    # serve the built dist/ locally
```

## Where things are

| Path | What |
|---|---|
| `src/content/pathways/*.md` | One file per audience page. This is where the copy lives. |
| `src/data/site.js` | Home page copy, nav order, footer line, contact address. |
| `src/content.config.ts` | The schema those Markdown files are checked against. |
| `src/pages/[slug].astro` | The template every audience page renders through. |
| `src/layouts/Base.astro` | Document head, metadata, page transitions. |
| `src/components/` | Page furniture. Each component owns its own styles. |
| `src/styles/tokens.css` | Colours, type scale, spacing. Follows the Neighbourhoods design system. |
| `src/assets/` | Images that get resized and optimised at build time. |
| `public/assets/` | Fonts, favicon, share card — served unchanged at a stable URL. |

## Writing an audience page

Add a Markdown file to `src/content/pathways/`. Frontmatter carries the
metadata; the body carries the prose:

```markdown
---
label: "Investors"           # nav and card label
kicker: "For investors"      # small label above the title
title: "..."                 # page headline
subtitle: "..."              # standfirst under the headline
hook: "..."                  # one line, shown on the home card
order: 2                     # position in the nav and home grid
cards:                       # the four boxes above the closing CTA
  - title: "Category"
    body: "..."
cta: "..."                   # the line in the closing block
---

Everything before the first `##` is the intro panel.

## Each heading starts a new panel

Ordinary Markdown — links and emphasis work as expected.
```

The filename becomes the URL, so `investors.md` serves at `/investors/`.
There is no template to copy, and no page to register.

A missing or misspelled field fails the build with the file and field named,
rather than rendering a page with a hole in it.

## Unlisted pages

Add `unlisted: true` to a page's frontmatter. It still builds at its own URL,
but is left out of the nav, the home grid, the cross-links, and `sitemap.xml`,
and is served `noindex, nofollow`.

Unlisted is not private. The URL will eventually leak — link scanners in
email, referrer headers, and anyone who forwards it. Anything genuinely
confidential needs authentication at the host, not an obscure address.
