# Floating Navigation And Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an Axi-inspired scroll-responsive fixed header with a persistent entry point to blog search.

**Architecture:** The shared Astro header renders semantic navigation and a search link on every route. A small inline script toggles a `data-scrolled` state on the fixed header based on `window.scrollY`; CSS handles the visual transition. The blog index owns the existing filter input and adds hash-based focus behavior for the shared search link.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4, browser JavaScript

---

## File Map

```text
src/components/Header.astro                   Shared header markup, search link, scroll script
src/pages/blog/index.astro                    Search anchor and focus-on-hash interaction
src/styles/global.css                         Header states, spacer, reduced-motion rule
```

## Task 1: Build The Scroll-Responsive Header

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Mark up a fixed header shell**

Wrap the existing navigation in:

```astro
<header class="floating-header" data-site-header data-scrolled="false">
  <div class="floating-header__bar">
    <!-- identity, navigation and actions -->
  </div>
</header>
<div class="floating-header__spacer" aria-hidden="true"></div>
```

Keep the current navigation items and theme toggle.

- [ ] **Step 2: Add a persistent search action**

Insert a semantic link in desktop actions and one near the mobile menu:

```astro
<a class="header-action" href="/blog#search" aria-label="搜索文章" data-header-search>
  <!-- magnifying glass SVG -->
</a>
```

- [ ] **Step 3: Apply scroll state**

Add an inline script that reads `window.scrollY > 24`, updates `data-scrolled`, and listens with `{ passive: true }`. On the `/blog` route, intercept the search link click and call `scrollIntoView` plus `focus()` on the `#post-search` input.

- [ ] **Step 4: Add capsule styling and motion fallback**

In global styles, make `.floating-header` fixed, style `.floating-header__bar` as transparent at top and as a bordered blurred panel under `[data-scrolled="true"]`, and add body clearance through `.floating-header__spacer`. Include a `prefers-reduced-motion` rule that removes transitions.

## Task 2: Receive Search Navigation On The Blog Page

**Files:**
- Modify: `src/pages/blog/index.astro`

- [ ] **Step 1: Anchor the search region**

Add `id="search"` to the page region containing the search input and retain `id="post-search"` on the input.

- [ ] **Step 2: Focus search when opened from navigation**

After binding existing filter interactions, add:

```ts
if (window.location.hash === '#search') {
  requestAnimationFrame(() => search?.focus());
}
```

Keep all existing collection/tag/keyword behavior intact.

## Task 3: Verify

**Files:**
- Verify: `src/components/Header.astro`
- Verify: `src/pages/blog/index.astro`
- Verify: `src/styles/global.css`

- [ ] **Step 1: Run existing tests and production build**

Run:

```powershell
npm.cmd test
$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build
```

Expected: tests pass and Astro reports zero errors, warnings, or hints.

- [ ] **Step 2: Validate behavior in a browser**

At desktop width verify transparent initial header, floating capsule after scrolling, and header search focusing `/blog#search`. At mobile width verify search is present, menu remains usable, and no horizontal overflow occurs.

