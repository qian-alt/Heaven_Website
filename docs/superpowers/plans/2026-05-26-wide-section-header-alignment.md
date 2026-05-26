# Wide Section Header Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the desktop header brand with the blog and projects page headings without widening the header on the site's narrower pages.

**Architecture:** The shared `Header.astro` component detects the two wide section routes and emits a modifier class on the existing header shell. Route-scoped CSS applies the `max-w-6xl` geometry and matching content inset on desktop while leaving the current mobile rules and compact-route header unchanged.

**Tech Stack:** Astro components, Tailwind utility classes, project CSS, Vitest

---

### Task 1: Define The Header Alignment Contract

**Files:**
- Create: `src/lib/header-alignment.test.ts`
- Read: `src/components/Header.astro`
- Read: `src/styles/global.css`

- [ ] **Step 1: Write the failing regression test**

Create `src/lib/header-alignment.test.ts` with:

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const header = readFileSync(new URL('../components/Header.astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('wide section header alignment', () => {
  it('marks only blog and projects as wide desktop header routes', () => {
    expect(header).toContain("currentPath === '/blog' || currentPath === '/projects'");
    expect(header).toContain("'floating-header--wide': usesWideHeader");
  });

  it('aligns the wide desktop header while preserving a route-scoped scrolled state', () => {
    expect(styles).toContain('.floating-header--wide .floating-header__bar');
    expect(styles).toContain('.floating-header--wide[data-scrolled=\"true\"] .floating-header__bar');
    expect(styles).toContain('max-width: 72rem;');
    expect(styles).toContain('padding-inline: 1.25rem;');
  });
});
```

- [ ] **Step 2: Run the focused test to confirm RED**

Run:

```powershell
npm.cmd test -- src/lib/header-alignment.test.ts
```

Expected: FAIL because `Header.astro` does not yet emit `floating-header--wide` and `global.css` does not yet define its route-scoped sizing rules.

- [ ] **Step 3: Commit the failing test**

Run:

```powershell
git add -- src/lib/header-alignment.test.ts
git commit -m "test: define wide header alignment"
```

### Task 2: Apply Wide Alignment Only On Blog And Projects

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/styles/global.css`
- Test: `src/lib/header-alignment.test.ts`

- [ ] **Step 1: Add the route-derived modifier to the shared header**

In `src/components/Header.astro`, define the route condition after `currentPath`:

```astro
const usesWideHeader = currentPath === '/blog' || currentPath === '/projects';
```

Replace the opening header tag with:

```astro
<header
  class:list={['floating-header', { 'floating-header--wide': usesWideHeader }]}
  data-site-header
  data-scrolled="false"
>
```

- [ ] **Step 2: Add desktop wide-section geometry**

In `src/styles/global.css`, after the base `.floating-header__bar` declaration, add:

```css
  .floating-header--wide .floating-header__bar {
    max-width: 72rem;
    padding-inline: 1.25rem;
  }
```

After the existing scrolled header declaration, add:

```css
  .floating-header--wide[data-scrolled="true"] .floating-header__bar {
    max-width: 72rem;
    padding-inline: 1.25rem;
  }
```

In the existing `@media (max-width: 767px)` block, add:

```css
  .floating-header--wide .floating-header__bar,
  .floating-header--wide[data-scrolled="true"] .floating-header__bar {
    padding-inline: 0;
  }
```

This lets the mobile base/scrolled rules continue to control the compact header without inheriting desktop wide-page padding.

- [ ] **Step 3: Run the focused test to confirm GREEN**

Run:

```powershell
npm.cmd test -- src/lib/header-alignment.test.ts
```

Expected: PASS with `2` passing tests.

- [ ] **Step 4: Commit the implementation**

Run:

```powershell
git add -- src/components/Header.astro src/styles/global.css
git commit -m "feat: align wide section headers"
```

### Task 3: Validate Layout And Build Output

**Files:**
- Verify: `src/components/Header.astro`
- Verify: `src/styles/global.css`
- Verify: `src/lib/header-alignment.test.ts`

- [ ] **Step 1: Run automated validation**

Run:

```powershell
npm.cmd test
$env:ASTRO_TELEMETRY_DISABLED='1'
npm.cmd run build
git diff --check
git status --short --branch
```

Expected: all Vitest tests pass, Astro reports `0 errors`, `0 warnings`, and `0 hints`, and only committed work is present.

- [ ] **Step 2: Check desktop layout before and after scroll**

Serve the current production build preview and inspect `/blog` and `/projects` at desktop width. Confirm:

- `Heaven's Blog` and the page heading share the same left edge at the top of the page.
- After scrolling past the header threshold, the floating header brand remains aligned with the same content left edge.
- The narrower homepage header remains unchanged.

- [ ] **Step 3: Check mobile layout**

Inspect `/blog` at a narrow phone viewport. Confirm the compact actions and menu remain within the header and no horizontal overflow appears.

- [ ] **Step 4: Clean temporary preview artifacts**

Remove any verification screenshots or Playwright snapshot directories created during visual validation, and stop the temporary preview server.
