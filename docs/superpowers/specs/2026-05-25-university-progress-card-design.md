# University Progress Card Design

## Goal

Add a university-stage progress card to the Chinese and English About pages, inspired by the referenced progress-bar designs while remaining consistent with this site's soft panel and theme system.

## Scope

- Add the progress card to `/about` and `/en/about`.
- Place it between the personal introduction block and the Education/经历 block.
- Use a shared component for layout and percentage calculation.
- Keep existing About page content, education cards, navigation, and language behavior unchanged.

## Content

The Chinese card displays:

- Title: `大学阶段进度`
- Supporting text: `保持热爱，慢慢变强。`
- Date range: `2024-09-01` to `2028-06-30`

The English card displays:

- Title: `University Progress`
- Supporting text: `Stay curious, grow steadily.`
- The same date range in `YYYY-MM-DD` format.

Both cards display a percentage value formatted to one decimal place.

## Progress Calculation

Progress is calculated from the current visit date against:

- Start date: `2024-09-01`
- End date: `2028-06-30`

The calculated percentage is clamped so it is:

- `0.0%` before the start date.
- Between `0.0%` and `100.0%` during the date interval.
- `100.0%` after the end date.

The shared progress utility owns this date logic so the two localized pages cannot drift apart. Since the Astro site is statically generated, the component renders an initial build-time value and updates that value in the browser on page load, ensuring the displayed progress reflects the visitor's current date rather than the deployment date.

## Layout And Styling

- Render the progress module as a rounded panel within the existing About-page flow.
- At the top, display the title and supporting text on the left, with the prominent percentage on the right.
- Below, render a slim rounded progress track with a blue-to-purple fill compatible with existing accent colors and dark mode.
- Display start and end dates beneath the track, aligned to its two endpoints.
- At narrow widths, retain readable spacing and keep the percentage visible without horizontal overflow.

The design borrows the strong information hierarchy from the reference rather than its decorative floral/pattern background, keeping the module coherent with the current website.

## Component Boundary

Create a reusable `StudyProgress` Astro component that:

- Accepts localized `title` and `subtitle` props.
- Uses the fixed university date interval internally.
- Renders an initial calculated display percentage.
- Runs a small client-side update on page load using the same progress utility.
- Renders visual and accessible progress information.

Each About page imports the component and supplies only localized labels.

## Accessibility

- The visual bar exposes `role="progressbar"`.
- It includes `aria-valuemin="0"`, `aria-valuemax="100"`, and the computed `aria-valuenow`.
- The title provides the accessible label relationship for the progress bar.
- Textual percentage remains visible so the value is not communicated by color alone.

## Verification

- Add tests for the date-to-percentage calculation at start, during, and after the interval.
- Verify both localized About templates include the shared progress component with appropriate translated labels.
- Verify the component marks percentage, fill, and accessible value nodes for browser-time synchronization.
- Run the full Vitest suite and Astro production build.
- Inspect `/about` and `/en/about` in the Codex browser at desktop and mobile widths, including light/dark compatibility where feasible.
