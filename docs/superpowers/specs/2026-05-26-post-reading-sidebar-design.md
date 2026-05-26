# Article Reading Sidebar Design

## Goal

Improve the blog article reading page so it uses the available desktop width and presents its table of contents like Axi's reading layout.

## Scope

- Change only individual blog article pages rendered through `src/layouts/PostLayout.astro` and `src/pages/blog/[slug].astro`.
- Leave the blog listing page, navigation, content model, and article Markdown files unchanged.

## Layout

- On large screens, render a wide centered reading shell with two columns:
  - A flexible article panel on the left.
  - A narrow table-of-contents sidebar on the right.
- Keep the article panel visually consistent with the existing rounded `site-panel` card.
- Increase the maximum page width from the current single-column layout so horizontal blank space is reduced without making paragraph lines excessively long.
- Render the table of contents as a light, uncluttered sidebar rather than the current large highlighted block inside the article body.
- Keep the table-of-contents sidebar visible while reading by using sticky positioning below the floating header.

## Responsive Behavior

- Below the desktop two-column breakpoint, render a single-column article layout.
- On narrow screens, show the table of contents above article body content inside a compact panel so headings remain easy to reach.
- Do not introduce horizontal overflow on mobile.

## Implementation Boundary

- `PostLayout.astro` owns the two-column article shell and named slot for the sidebar.
- `[slug].astro` owns table-of-contents data and places the same generated links into the sidebar slot.
- `global.css` owns article shell, sidebar, sticky behavior, and responsive rules.

## Verification

- Add a focused source-level regression test asserting the wide shell, named table-of-contents slot, sticky sidebar styles, and responsive fallback rules.
- Run the full Vitest suite and Astro production build.
- Verify the article route in the browser at desktop and mobile widths.
