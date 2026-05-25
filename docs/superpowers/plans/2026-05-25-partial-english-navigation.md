# Partial English Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a compact Axi-style language control and English home/about routes without pretending untranslated pages have English variants.

**Architecture:** A small locale helper owns translated navigation labels and route switch targets. `Header.astro` consumes it through an optional locale prop; `BaseLayout.astro` passes locale through to the document and header. English pages render their translated introductory content from a separate presentation data module while reusing the existing site shape and visual components where useful.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4, Vitest

---

## Task 1: Test Locale Routing Rules

**Files:**
- Create: `src/lib/locale.test.ts`
- Create: `src/lib/locale.ts`

- [ ] **Step 1: Write failing tests**

Test:

```ts
expect(getLocaleSwitch('/', 'zh')).toBe('/en');
expect(getLocaleSwitch('/about', 'zh')).toBe('/en/about');
expect(getLocaleSwitch('/blog', 'zh')).toBe('/en');
expect(getLocaleSwitch('/en', 'en')).toBe('/');
expect(getLocaleSwitch('/en/about', 'en')).toBe('/about');
```

Also assert English navigation maps `Home` to `/en`, `About` to `/en/about`, and untranslated destinations to Chinese routes.

- [ ] **Step 2: Run the test and verify red**

Run `npm.cmd test -- src/lib/locale.test.ts`.

Expected: FAIL because `./locale` does not exist.

- [ ] **Step 3: Implement locale helpers**

Export `Locale`, `getLocaleSwitch(pathname, locale)`, and `getNavigation(locale)` with the exact approved mapping.

- [ ] **Step 4: Verify green**

Run `npm.cmd test -- src/lib/locale.test.ts`.

Expected: all locale tests pass.

## Task 2: Localize The Shared Header

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Pass locale through the layout**

Add `locale?: 'zh' | 'en'` to `BaseLayout` props, set `<html lang>` appropriately, and render `<Header locale={locale} />`.

- [ ] **Step 2: Render locale-aware navigation**

In `Header.astro`, accept a default `locale = 'zh'`, use `getNavigation(locale)`, compute `getLocaleSwitch(Astro.url.pathname, locale)`, and insert a language link between search and theme actions on desktop and in mobile actions/menu.

- [ ] **Step 3: Tighten spacing**

Reduce floating bar maximum widths and add a language-action class sized for icon plus `中文` or `English`, while preserving current floating scroll animation.

## Task 3: Add English Home And About

**Files:**
- Create: `src/data/site.en.ts`
- Create: `src/pages/en/index.astro`
- Create: `src/pages/en/about.astro`

- [ ] **Step 1: Author English presentation copy**

Provide English labels/copy for name, location, home introduction, section headings, about paragraphs and experience display values without modifying the Chinese data modules.

- [ ] **Step 2: Render translated routes**

Create English pages using `<BaseLayout locale="en">`, retaining the existing visual structure and linking featured projects to the existing `/projects` route.

## Task 4: Verify

**Files:**
- Verify all changed files.

- [ ] **Step 1: Run tests and build**

Run:

```powershell
npm.cmd test
$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build
```

Expected: all tests pass and `/en/` plus `/en/about/` are generated with zero Astro diagnostics.

- [ ] **Step 2: Verify outputs and local UI**

Confirm generated pages contain the correct language destinations and attempt browser checks for compressed header spacing, language ordering, and translated routes.

