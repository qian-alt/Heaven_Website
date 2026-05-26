# English Page Parity Design

## Goal

Make the existing English homepage and English about page faithful translated
counterparts of the current Chinese pages while preserving the same visual
composition and component styling.

## Route Scope

- Keep English routing limited to `/en` and `/en/about`.
- Keep Blog, Projects, and Links navigation items pointed at their existing
  Chinese routes because English versions of those pages are outside scope.

## Content Parity

- Translate the current concise Chinese personal information instead of keeping
  longer English-only biography copy.
- Use the English role label `Student, Class of 2024`.
- Use the English profile statement `Undergraduate in Cyberspace Security at
  Jiangxi University of Finance and Economics.`
- Translate section labels and calls to action without adding extra content.
- Keep the single current education entry and existing featured project set,
  translated into English.

## Component And Layout Parity

- The English homepage will follow the Chinese homepage's section structure:
  profile hero, open About section, education cards, and featured projects.
- The English about page will follow the Chinese about page's panel structure:
  profile hero, concise About section, shared progress bar, and experience
  cards.
- Reuse shared card and hero components through localized props or equivalent
  shared data-driven inputs, so existing project action buttons and later style
  refinements appear consistently in both languages.
- Do not introduce English-only layout rules or change the established Chinese
  page styling.

## Data Shape

- Keep localized strings in English data, including translated profile,
  education, and project values.
- Ensure the localized project representation retains live site and repository
  links where the Chinese project card currently exposes them.

## Verification

- Add regression tests confirming the English pages use the shared visual
  component structure and concise translated content.
- Run the complete Vitest suite and Astro production build.
- Check `/` against `/en` and `/about` against `/en/about` in the browser at
  desktop and mobile widths to confirm layout parity.
