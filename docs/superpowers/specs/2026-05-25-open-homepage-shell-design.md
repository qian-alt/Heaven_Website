# Open Homepage Shell Design

## Goal

Bring the localized homepages closer to Axi's open editorial layout by removing the single enclosing white panel while keeping structured information cards readable.

## Scope

- Update the Chinese homepage at `/`.
- Update the English homepage at `/en`.
- Remove only the large outer `site-panel` wrapper around each homepage's profile, About, Education, and Featured Projects content.
- Preserve the Education and Featured Projects cards, their content, and existing destinations.
- Preserve the accepted Axi-style About layout and its localized detail-page buttons.

## Layout

The homepage content remains centered inside the existing maximum page width. Without the enclosing panel, the profile hero, About block, Education block, and Featured Projects block sit directly on the atmospheric page background as separate vertical sections.

The current internal rhythm remains:

- Profile hero at the top.
- About section beneath it with left heading and right copy/action at desktop widths.
- Education section with cards in its right content column.
- Featured Projects section with its existing cards.

No route, content, or component ownership changes are required.

## Visual Treatment

- The page-level border, rounded corner, translucent fill, and shadow supplied by the homepage wrapper are removed.
- Existing information cards retain their borders and backgrounds to preserve scanability.
- Existing page padding may be adjusted only as needed to keep the open composition comfortably spaced at desktop and mobile widths.

## Verification

- Protect that the Chinese and English homepage templates no longer place all content in an outer `site-panel`.
- Preserve the existing About layout/link test behavior.
- Run the complete Vitest suite and Astro production build.
- Inspect both desktop and mobile homepage views in the Codex browser, including `/en`.
