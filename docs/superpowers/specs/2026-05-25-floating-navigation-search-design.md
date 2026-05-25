# Floating Navigation And Search Design

**Date:** 2026-05-25
**Status:** Approved in conversation

## Goal

Adjust the shared navigation to echo Axi's light, responsive header treatment and make blog search reachable from every page.

## Interaction

- At the top of a page the desktop navigation appears as a roomy, transparent horizontal header.
- Once the page scrolls beyond a small threshold, the header remains fixed while its inner bar becomes a compact floating capsule with translucent panel background, border, blur, and soft shadow.
- Scrolling back near the top restores the roomy transparent presentation using a restrained CSS transition.
- The mobile header remains compact and fixed; the same scroll state may enhance its panel appearance without changing the menu interaction.

## Search Entry

- A search icon button is visible in the header action area on desktop and mobile.
- From pages other than `/blog`, it navigates to `/blog#search`.
- On `/blog`, it scrolls to and focuses the existing article search input.
- On initial load of `/blog#search`, the article search input is focused after it becomes available.
- Search remains an article-list filter; no site-wide search modal is added.

## Files

- `src/components/Header.astro`: fixed header shell, search control, scroll-state script.
- `src/pages/blog/index.astro`: search anchor and focus-on-hash behavior.
- `src/styles/global.css`: navigation state transitions and fixed-header content spacing.

## Accessibility And Motion

- Search control has an accessible `aria-label`.
- Keyboard activation follows native link/button behavior.
- Header transitions respect `prefers-reduced-motion` by disabling non-essential animation.

## Verification

- Build passes with no Astro diagnostics.
- The header contains a persistent search control on desktop and mobile.
- Scroll toggles the floating compact state and returns to transparent state at the page top.
- Navigation search reaches and focuses the blog search input.

