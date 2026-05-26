# Project Card Link Buttons Design

## Goal

Add visible destination buttons beneath project cards so visitors can open a live site or its GitHub repository directly, using the light outlined button language seen in the user's Axi reference.

## Approved Direction

Use existing project address fields as optional actions:

- `demo` renders as a `Site` button.
- `repository` renders as a `GitHub` button.
- If both values exist, show both buttons in that order.
- If only one exists, show only that button.
- If neither exists, render no empty link area.

Both the homepage featured-project grid and the `/projects` page use `ProjectCard.astro`, so one component update provides consistent behavior in both locations.

## Initial Data

The `个人博客网站` project receives:

- Live site: `https://www.dearheaven.cn/`
- GitHub repository: `https://github.com/qian-alt/Heaven_Website`

The existing `课程实践项目` remains without action buttons until it has a real destination.

## Visual Design

Buttons appear beneath the technology tags with a small top gap:

- Rounded pill shape with thin border and panel-toned background.
- `Site` uses a small globe-style icon; `GitHub` uses a small repository/brand-style icon.
- Text labels are concise English labels to match the Axi-inspired navigation treatment.
- Hover state changes border/text toward the site's accent color without adding heavy shadow.
- On narrow layouts, the buttons wrap naturally rather than overflowing.

The project card remains text-first; this change does not add covers or change the card's overall grid layout.

## Data And Component Boundaries

- `src/data/projects.ts` continues to own destination URL data and validation through existing `demo` and `repository` optional URL fields.
- `src/components/ProjectCard.astro` owns display mapping, order, icons, and accessible external links.
- `src/styles/global.css` defines a focused reusable `.project-action` style rather than repeating long utility strings.

No additional content model or route is required.

## Accessibility And Link Behavior

- Each visible action is an actual anchor with a clear accessible text label.
- External project actions continue opening in a new tab with `rel="noreferrer"`.
- Decorative icons use `aria-hidden="true"` so link names remain `Site` and `GitHub`.

## Verification

Automated checks:

- A focused source/data test fails before implementation because the first project lacks `demo` and `repository` values and the card does not render `Site`/`GitHub` button labels.
- Tests pass once the component and data are updated.
- Astro production build completes without diagnostics.
- `git diff --check` reports no whitespace errors.

Browser checks:

- On the homepage, `个人博客网站` displays `Site` and `GitHub` buttons beneath its technology tags.
- On `/projects`, the same project card displays the same two buttons.
- A project without URLs displays no empty action row.
- The button row wraps and remains readable at mobile width.

## Out Of Scope

- Adding invented URLs to projects that do not yet have destinations.
- Making the entire card clickable.
- Adding project cover images or redesigning the project grid.
- Fetching live site screenshots or repository metadata automatically.
