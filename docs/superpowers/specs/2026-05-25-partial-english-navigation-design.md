# Partial English Navigation Design

**Date:** 2026-05-25
**Status:** Approved in conversation

## Goal

Add Axi-style route-based language switching while translating only the home and about pages, and tighten the floating navigation composition so the center gap is smaller.

## Locale Routes

- Chinese home `/` switches to English home `/en`.
- Chinese about `/about` switches to English about `/en/about`.
- Chinese blog, projects, links, article and any other untranslated route switch to English home `/en`.
- English home `/en` switches to Chinese home `/`.
- English about `/en/about` switches to Chinese about `/about`.

Only `/en` and `/en/about` are introduced. The site does not imply that English blog, project, link or article routes exist.

## Header Behavior

- Add a language control between the search control and theme toggle.
- Chinese pages display `中文` and expose an accessible action to switch to English.
- English pages display `English` and expose an accessible action to switch to Chinese.
- English header links use `Home` and `About` for translated routes while `Blog`, `Projects`, and `Links` point to existing Chinese routes.
- Keep the existing scroll-responsive floating header and search behavior.
- Reduce excessive open space by constraining the header bar width and grouping navigation/actions more compactly.

## English Content

- English home presents the same identity, education, and featured-project structure as the Chinese homepage with English section labels and introductory copy.
- English about presents an English biography and experience heading.
- English pages may use a small English presentation data module for translated biography and educational labels, while retaining shared links/avatar/project data where it is language neutral.

## Files

- `src/lib/locale.ts` and `src/lib/locale.test.ts`: route-switch and locale-navigation rules.
- `src/components/Header.astro`: localized navigation and language control.
- `src/layouts/BaseLayout.astro`: pass locale to document language and header.
- `src/data/site.en.ts`: English-facing copy used by translated pages.
- `src/pages/en/index.astro` and `src/pages/en/about.astro`: English routes.
- `src/styles/global.css`: tighten header composition and style the language action.

## Verification

- Unit tests validate locale switching fallback behavior.
- Production build outputs `/en/` and `/en/about/` alongside existing Chinese routes.
- Header language controls and English navigation destinations are present in generated HTML.

