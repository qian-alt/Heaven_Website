# Open Homepage Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the enclosing homepage panel from both localized homepages while retaining the accepted About composition and the smaller Education and Project cards.

**Architecture:** The localized homepage templates will mark their main content wrapper with `home-shell` instead of rendering it as a `site-panel`. The existing homepage source test will be extended to protect both the open wrapper and the localized About action behavior without introducing new page data or components.

**Tech Stack:** Astro, Vitest, existing CSS utility classes

---

## File Map

- Modify `src/lib/home-about-layout.test.ts`: add a source contract that both localized homepages use an open `home-shell` wrapper rather than the enclosing `site-panel`.
- Modify `src/pages/index.astro`: change the Chinese homepage content wrapper only.
- Modify `src/pages/en/index.astro`: change the English homepage content wrapper only.

### Task 1: Open Homepage Shell Contract

**Files:**
- Modify: `src/lib/home-about-layout.test.ts`
- Test: `src/lib/home-about-layout.test.ts`

- [ ] **Step 1: Add the failing open-wrapper test**

Append this test inside the existing `describe` block:

```ts
  it('places localized homepage content on an open shell instead of an enclosing panel', () => {
    expect(chineseHome).toContain('<section class="home-shell');
    expect(englishHome).toContain('<section class="home-shell');
    expect(chineseHome).not.toContain('<section class="site-panel p-6 sm:p-8">');
    expect(englishHome).not.toContain('<section class="site-panel p-6 sm:p-8">');
  });
```

- [ ] **Step 2: Run the focused test to observe the existing enclosing panel failure**

Run: `npm.cmd test -- src/lib/home-about-layout.test.ts`

Expected: FAIL because both homepage templates currently contain `<section class="site-panel p-6 sm:p-8">` and do not contain `<section class="home-shell`.

### Task 2: Replace Localized Homepage Outer Panel

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en/index.astro`
- Test: `src/lib/home-about-layout.test.ts`

- [ ] **Step 1: Replace the Chinese page-level wrapper**

In `src/pages/index.astro`, replace:

```astro
    <section class="site-panel p-6 sm:p-8">
```

with:

```astro
    <section class="home-shell px-1 pt-4 sm:px-0 sm:pt-8">
```

Leave the inner `ExperienceCard`, `ProjectCard`, and About markup unchanged.

- [ ] **Step 2: Replace the English page-level wrapper**

In `src/pages/en/index.astro`, replace:

```astro
    <section class="site-panel p-6 sm:p-8">
```

with:

```astro
    <section class="home-shell px-1 pt-4 sm:px-0 sm:pt-8">
```

Leave the inner Education and Project article card classes unchanged.

- [ ] **Step 3: Run the focused test to verify the open shell and preserved About behavior**

Run: `npm.cmd test -- src/lib/home-about-layout.test.ts`

Expected: PASS with `3 passed`.

### Task 3: Full Verification and Visual Review

**Files:**
- Test: `src/lib/home-about-layout.test.ts`

- [ ] **Step 1: Run the complete automated suite**

Run: `npm.cmd test`

Expected: PASS for all current test suites.

- [ ] **Step 2: Build static output**

Run: `$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build`

Expected: Astro reports `0 errors`, `0 warnings`, `0 hints`, and generates both `/index.html` and `/en/index.html`.

- [ ] **Step 3: Check emitted homepage shells**

Run:

```powershell
Select-String -Path dist\index.html -Pattern 'home-shell|home-about|更多关于我'
Select-String -Path dist\en\index.html -Pattern 'home-shell|home-about|More about me'
```

Expected: both pages contain `home-shell` and retain their About actions.

- [ ] **Step 4: Inspect in the Codex browser**

Open `http://localhost:4321/` and `http://localhost:4321/en/` at desktop width and `390px` mobile width. Confirm that the large enclosing white panel is absent, internal cards remain visible, the open About/Education alignment still reads correctly, and mobile content does not overflow.
