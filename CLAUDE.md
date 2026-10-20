# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Static Astro website for a one-woman beauty studio in Bochum (La Beauté Kosmetik – Florentine Stukenkemper). All copy is German, addressed with "du", in Florentine's first-person voice.

## Commands

- `npm run dev`: dev server (theme C1). Use `PUBLIC_THEME=c2 npm run dev` for C2.
- `npm run build`: production build into `dist/`.
- `npm run build:previews`: builds both themes under `dist/vorschau-a/` (c1) and `dist/vorschau-b/` (c2), plus a chooser page. This is what Netlify deploys until a theme is chosen.
- `npm run sync:treatwell`: refreshes `src/data/treatwell.json` from the live Treatwell page. To work offline, save the venue page HTML locally (git-ignored) and run with `-- --file scripts/.sample-treatwell.html`.
- `npm run check`: runs `astro check` (types).

There is no test suite. Verify changes by building and looking at pages; Playwright is available via the playwright skill.

## Architecture

- **Treatwell is the source of truth** for treatments, prices, durations, rating and reviews.
  - `scripts/sync-treatwell.mjs` parses `window.__state__` from the public venue page, validates it, and writes `src/data/treatwell.json`. If validation fails it exits non-zero and leaves the old file in place.
  - A daily GitHub Action (`.github/workflows/treatwell-sync.yml`) commits changes.
  - Never hand-edit `treatwell.json`, and never hardcode prices in copy (articles say "ab … €" at most).
- **Editorial layer**: `src/data/treatments.ts` maps Treatwell menu groups (by `treatwellGroupId`) to category pages (`/behandlungen/[slug]/`). It adds intro text, FAQ and per-treatment notes (keyed by Treatwell treatment id, e.g. `TR6977560`). Treatwell's own descriptions are partly copy-pasted and wrong (e.g. all Green Peel items say "ohne Schälung"), so the notes override them. Treatwell groups without a category still render on `/behandlungen/` via `unmappedGroups()`.
- **Two themes, one codebase**:
  - `PUBLIC_THEME` (`c1` warm cream/taupe, `c2` white/sage) sets `<html data-theme>`.
  - All colors and shape tokens live in `src/styles/global.css`. Components only use CSS variables, so a theme is purely a token set.
  - `SITE_BASE` + `PUBLIC_PREVIEW=1` produce noindex preview builds. **All internal links must go through `u()` from `src/lib/url.ts`**, or they break under `/vorschau-a/`.
- **Booking**:
  - `BookButton` renders a plain link to Treatwell, marked with `data-book`.
  - `BookingDialog` intercepts clicks on those links and lazily creates the Treatwell iframe in a `<dialog>`. Nothing from Treatwell loads before a click; this is part of the privacy story in `datenschutz.astro`.
  - Treatwell has no per-treatment deep link, so every button opens the full menu.
- **Privacy constraints** (keep them, the Datenschutz text depends on them):
  - no cookies, no analytics, no third-party embeds
  - fonts self-hosted via `@fontsource`; never use the Google Fonts CDN (a GDPR issue in Germany)
  - maps are a link only
- **SEO/AI**:
  - `src/lib/schema.ts` emits BeautySalon, FAQPage, Article and BreadcrumbList JSON-LD.
  - `/llms.txt` (`src/pages/llms.txt.ts`) is generated from the same data.
  - Article FAQ schema is parsed from the `## Häufige Fragen` section of each markdown file, so keep that heading and the `### Frage` format.
  - The aggregate rating is deliberately not in the schema (Google treats it as self-serving).
- **Magazin**: content collection in `src/content.config.ts`. The `pruefen` frontmatter lists claims Florentine must confirm; it is never rendered.
- **Contact form**: Netlify Forms (`data-netlify`, honeypot `firma`). The action points to `u('danke/')`.

## Content rules

- Cosmetic wording only (Heilmittelwerbegesetz): no healing promises, no "garantiert". Say "kann das Hautbild verfeinern" and similar.
- Write "Green Peel®" with ® at first mention per page.
- Open items for the owner are tracked in `docs/TODO-florentine.md`. Add to it instead of inventing facts.
