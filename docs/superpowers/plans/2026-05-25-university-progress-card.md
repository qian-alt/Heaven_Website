# University Progress Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a shared, localized university progress card to both About pages with a dynamically calculated, accessible progress bar.

**Architecture:** A pure utility module owns the fixed date interval and clamped percentage calculation so it can be tested independently of Astro rendering. A shared `StudyProgress.astro` component consumes that utility, renders an initial static value, and reruns the same calculation in the browser on page load so a statically generated page stays current for visitors. Both About pages insert the component between biography and education content, while global component CSS provides theme-compatible visual styling.

**Tech Stack:** Astro, TypeScript, Vitest, component-layer CSS

---

## File Map

- Create `src/lib/study-progress.ts`: fixed date constants and deterministic clamped percentage calculation.
- Create `src/lib/study-progress.test.ts`: date-boundary unit tests for progress calculation.
- Create `src/lib/about-progress-layout.test.ts`: source contract for localized About-page component insertion.
- Create `src/components/StudyProgress.astro`: shared progress card markup, accessible progress bar, and browser-time value synchronization.
- Modify `src/pages/about.astro`: render the Chinese progress card between introduction and experience content.
- Modify `src/pages/en/about.astro`: render the English progress card between introduction and education content.
- Modify `src/styles/global.css`: style card hierarchy, track/fill, percentage, dates, and responsive behavior.

### Task 1: Date Calculation Utility

**Files:**
- Create: `src/lib/study-progress.test.ts`
- Create: `src/lib/study-progress.ts`

- [ ] **Step 1: Write failing progress-boundary tests**

Create `src/lib/study-progress.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { calculateStudyProgress, STUDY_END_DATE, STUDY_START_DATE } from './study-progress';

describe('calculateStudyProgress', () => {
  it('clamps dates at and before the university start to zero', () => {
    expect(calculateStudyProgress(new Date('2024-08-01T00:00:00Z'))).toBe(0);
    expect(calculateStudyProgress(new Date(`${STUDY_START_DATE}T00:00:00Z`))).toBe(0);
  });

  it('calculates a midpoint percentage during university study', () => {
    const midpoint = new Date('2026-08-01T00:00:00Z');
    expect(calculateStudyProgress(midpoint)).toBeGreaterThan(0);
    expect(calculateStudyProgress(midpoint)).toBeLessThan(100);
  });

  it('clamps dates at and after graduation to one hundred', () => {
    expect(calculateStudyProgress(new Date(`${STUDY_END_DATE}T00:00:00Z`))).toBe(100);
    expect(calculateStudyProgress(new Date('2029-01-01T00:00:00Z'))).toBe(100);
  });
});
```

- [ ] **Step 2: Run the utility test and observe the missing module failure**

Run: `npm.cmd test -- src/lib/study-progress.test.ts`

Expected: FAIL because `./study-progress` does not exist.

- [ ] **Step 3: Implement the date calculation utility**

Create `src/lib/study-progress.ts`:

```ts
export const STUDY_START_DATE = '2024-09-01';
export const STUDY_END_DATE = '2028-06-30';

const start = Date.parse(`${STUDY_START_DATE}T00:00:00Z`);
const end = Date.parse(`${STUDY_END_DATE}T00:00:00Z`);

export function calculateStudyProgress(currentDate: Date = new Date()): number {
  const elapsed = currentDate.getTime() - start;
  const percentage = (elapsed / (end - start)) * 100;
  return Math.min(100, Math.max(0, percentage));
}
```

- [ ] **Step 4: Run the utility test to verify calculation behavior**

Run: `npm.cmd test -- src/lib/study-progress.test.ts`

Expected: PASS with `3 passed`.

### Task 2: Shared Component And Localized Mounting

**Files:**
- Create: `src/lib/about-progress-layout.test.ts`
- Create: `src/components/StudyProgress.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/en/about.astro`

- [ ] **Step 1: Write failing template integration tests**

Create `src/lib/about-progress-layout.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const chineseAbout = readFileSync(new URL('../pages/about.astro', import.meta.url), 'utf8');
const englishAbout = readFileSync(new URL('../pages/en/about.astro', import.meta.url), 'utf8');
const progressComponentPath = new URL('../components/StudyProgress.astro', import.meta.url);

describe('localized study progress card mounting', () => {
  it('renders a shared progress component with Chinese labels', () => {
    expect(chineseAbout).toContain("import StudyProgress from '../components/StudyProgress.astro';");
    expect(chineseAbout).toContain('<StudyProgress title="大学阶段进度" subtitle="保持热爱，慢慢变强。" />');
  });

  it('renders a shared progress component with English labels', () => {
    expect(englishAbout).toContain("import StudyProgress from '../../components/StudyProgress.astro';");
    expect(englishAbout).toContain('<StudyProgress title="University Progress" subtitle="Stay curious, grow steadily." />');
  });

  it('updates progress state in the browser for statically generated pages', () => {
    expect(() => readFileSync(progressComponentPath, 'utf8')).not.toThrow();
    const progressComponent = readFileSync(progressComponentPath, 'utf8');
    expect(progressComponent).toContain('data-study-progress-value');
    expect(progressComponent).toContain('data-study-progress-bar');
    expect(progressComponent).toContain('data-study-progress-fill');
    expect(progressComponent).toContain('calculateStudyProgress()');
  });
});
```

- [ ] **Step 2: Run the integration test to observe missing component use**

Run: `npm.cmd test -- src/lib/about-progress-layout.test.ts`

Expected: FAIL because neither About page currently imports or renders `StudyProgress`, and the shared component does not exist.

- [ ] **Step 3: Create the shared accessible Astro component**

Create `src/components/StudyProgress.astro`:

```astro
---
import { calculateStudyProgress, STUDY_END_DATE, STUDY_START_DATE } from '../lib/study-progress';

interface Props {
  title: string;
  subtitle: string;
}

const { title, subtitle } = Astro.props;
const value = calculateStudyProgress();
const displayValue = `${value.toFixed(1)}%`;
const titleId = `study-progress-${title.toLowerCase().replaceAll(/\s+/g, '-')}`;
---
<section class="study-progress site-panel" aria-labelledby={titleId}>
  <div class="study-progress__header">
    <div>
      <h2 class="text-xl font-semibold" id={titleId}>{title}</h2>
      <p class="mt-1 muted">{subtitle}</p>
    </div>
    <p class="study-progress__value" data-study-progress-value>{displayValue}</p>
  </div>
  <div
    class="study-progress__track"
    role="progressbar"
    aria-labelledby={titleId}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow={value.toFixed(1)}
    data-study-progress-bar
  >
    <span class="study-progress__fill" style={`width: ${value}%`} data-study-progress-fill></span>
  </div>
  <div class="study-progress__dates muted">
    <span>{STUDY_START_DATE}</span>
    <span>{STUDY_END_DATE}</span>
  </div>
</section>
<script>
  import { calculateStudyProgress } from '../lib/study-progress';

  for (const bar of document.querySelectorAll('[data-study-progress-bar]')) {
    if (!(bar instanceof HTMLElement)) continue;

    const value = calculateStudyProgress();
    const card = bar.closest('.study-progress');
    const label = card?.querySelector('[data-study-progress-value]');
    const fill = bar.querySelector('[data-study-progress-fill]');

    bar.setAttribute('aria-valuenow', value.toFixed(1));
    if (label instanceof HTMLElement) label.textContent = `${value.toFixed(1)}%`;
    if (fill instanceof HTMLElement) fill.style.width = `${value}%`;
  }
</script>
```

- [ ] **Step 4: Mount it in both About pages**

In `src/pages/about.astro`, import the component:

```astro
import StudyProgress from '../components/StudyProgress.astro';
```

Then insert after the biography `div`:

```astro
      <StudyProgress title="大学阶段进度" subtitle="保持热爱，慢慢变强。" />
```

In `src/pages/en/about.astro`, import:

```astro
import StudyProgress from '../../components/StudyProgress.astro';
```

Then insert after the biography `div`:

```astro
      <StudyProgress title="University Progress" subtitle="Stay curious, grow steadily." />
```

- [ ] **Step 5: Run the component-integration test**

Run: `npm.cmd test -- src/lib/about-progress-layout.test.ts`

Expected: PASS with `3 passed`.

### Task 3: Progress Card Styling And Complete Verification

**Files:**
- Modify: `src/styles/global.css`
- Test: `src/lib/study-progress.test.ts`
- Test: `src/lib/about-progress-layout.test.ts`

- [ ] **Step 1: Add theme-compatible progress card styles**

Within `@layer components` in `src/styles/global.css`, add:

```css
  .study-progress {
    margin-top: 2.5rem;
    padding: 1.35rem 1.4rem;
  }

  .study-progress__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .study-progress__value {
    flex-shrink: 0;
    color: var(--accent);
    font-size: clamp(1.55rem, 4vw, 2.1rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .study-progress__track {
    height: 0.7rem;
    margin-top: 1.35rem;
    overflow: hidden;
    border-radius: 999px;
    background: var(--border);
  }

  .study-progress__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #3f8cff, #a553f5);
  }

  .study-progress__dates {
    display: flex;
    justify-content: space-between;
    margin-top: 0.65rem;
    font-size: 0.82rem;
  }
```

- [ ] **Step 2: Tighten spacing on narrow screens**

Add in the existing `@media (max-width: 767px)` block:

```css
  .study-progress {
    padding: 1.1rem;
  }

  .study-progress__header {
    gap: 0.75rem;
  }
```

- [ ] **Step 3: Run complete automated and build verification**

Run: `npm.cmd test`

Expected: PASS for all suites including new progress utility and integration tests.

Run: `$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build`

Expected: Astro reports `0 errors`, `0 warnings`, and `0 hints`, generating `/about/index.html` and `/en/about/index.html`.

- [ ] **Step 4: Check emitted progress markup**

Run:

```powershell
Select-String -Path dist\about\index.html -Pattern '大学阶段进度|progressbar|2024-09-01|2028-06-30'
Select-String -Path dist\en\about\index.html -Pattern 'University Progress|progressbar|2024-09-01|2028-06-30'
```

Expected: both localized output files contain the shared progress card and date range.

- [ ] **Step 5: Inspect pages in Codex browser**

Refresh `http://localhost:4321/about` and `http://localhost:4321/en/about` at desktop and mobile widths. Confirm the card appears between biography and education content, the percentage and track are visible, the browser-updated `aria-valuenow` matches the visible percentage, and the layout remains usable in light and dark themes.
