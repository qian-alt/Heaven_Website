# Wide Section Header Alignment Design

## Goal

Align the left edge of the `Heaven's Blog` brand in the desktop header with the
main page heading on the wide content pages: `/blog` and `/projects`.

## Scope

- Apply the wide header alignment only to the blog index and projects pages.
- Keep the narrower header alignment currently used by the homepage, about
  page, links page, and English pages.
- Keep the existing mobile header layout unchanged.

## Layout Behavior

- `/blog` and `/projects` already render inside a `max-w-6xl px-5` main
  container.
- On those two routes, the desktop header bar will use the matching wide
  container geometry, including the same horizontal inset as the page content.
- When the header enters its scrolled floating-card state, the brand remains
  visually aligned with the page heading rather than shifting inward.
- Other routes retain their current compact floating header proportions.

## Implementation Shape

- `Header.astro` determines whether the current route is `/blog` or
  `/projects` and exposes that state with a modifier class on the header.
- `global.css` defines the wide desktop modifier for both resting and scrolled
  header states.
- No page content structure or copy changes are needed.

## Verification

- Add a regression test that verifies the route-scoped wide-header modifier and
  its corresponding style rules exist.
- Run the test suite and Astro production build.
- Check `/blog` and `/projects` at desktop width before and after scrolling.
- Check a narrow viewport to ensure mobile header layout does not regress.
