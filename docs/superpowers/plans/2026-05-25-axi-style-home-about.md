# Axi-Style Home About Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reshape the Chinese and English homepage About blocks into the Axi-inspired left-heading/right-content layout with appropriate About-page calls to action.

**Architecture:** The two localized Astro homepages keep ownership of their localized copy and links, while sharing a small set of presentation classes added to the global component layer. A focused Vitest source contract protects the translated link destinations and the shared structural hook before the visual implementation is added.

**Tech Stack:** Astro, TypeScript, Tailwind CSS utilities and component-layer CSS, Vitest

---

## File Map

- Create `src/lib/home-about-layout.test.ts`: verify both localized homepage templates expose the common About-layout hook and link to the correct localized About destination.
- Modify `src/pages/index.astro`: replace the stacked Chinese About content with the horizontal composition and `/about` action.
- Modify `src/pages/en/index.astro`: apply the matching English composition and `/en/about` action.
- Modify `src/styles/global.css`: provide the restrained outlined About action appearance and responsive alignment behavior.

### Task 1: Localized About Structure Contract

**Files:**
- Create: `src/lib/home-about-layout.test.ts`
- Test: `src/lib/home-about-layout.test.ts`

- [ ] **Step 1: Write the failing structural contract test**

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const chineseHome = readFileSync(new URL('../pages/index.astro', import.meta.url), 'utf8');
const englishHome = readFileSync(new URL('../pages/en/index.astro', import.meta.url), 'utf8');

describe('homepage About section layout', () => {
  it('uses the shared Axi-style composition on both localized homepages', () => {
    expect(chineseHome).toContain('class="home-about');
    expect(englishHome).toContain('class="home-about');
  });

  it('links each About action to its localized detail page', () => {
    expect(chineseHome).toContain('href="/about">更多关于我');
    expect(englishHome).toContain('href="/en/about">More about me');
  });
});
```

- [ ] **Step 2: Run the test to verify the required layout is missing**

Run: `npm.cmd test -- src/lib/home-about-layout.test.ts`

Expected: FAIL because the current homepages contain neither the `home-about` composition nor the localized About action links.

### Task 2: Chinese and English Homepage Composition

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en/index.astro`
- Test: `src/lib/home-about-layout.test.ts`

- [ ] **Step 1: Replace the Chinese stacked About block with the Axi-style composition**

Use this section in `src/pages/index.astro`:

```astro
<section class="home-about mt-10">
  <h2 class="text-xl font-semibold">关于我</h2>
  <div class="home-about__content">
    <p class="home-about__role muted">学生 /</p>
    <p class="home-about__intro muted">我是一名来自江西财经大学的网络空间安全专业的在读生，是 24 级。</p>
    <a class="home-about__link" href="/about">更多关于我 <span aria-hidden="true">›</span></a>
  </div>
</section>
```

- [ ] **Step 2: Replace the English stacked About block with the matching composition**

Use this section in `src/pages/en/index.astro`:

```astro
<section class="home-about mt-10">
  <h2 class="text-xl font-semibold">About</h2>
  <div class="home-about__content">
    <p class="home-about__role muted">Student /</p>
    <p class="home-about__intro muted">{englishProfile.intro}</p>
    <a class="home-about__link" href="/en/about">More about me <span aria-hidden="true">›</span></a>
  </div>
</section>
```

- [ ] **Step 3: Run the focused test to verify the localized structure is present**

Run: `npm.cmd test -- src/lib/home-about-layout.test.ts`

Expected: PASS with `2 passed`.

### Task 3: Responsive Presentation and Full Verification

**Files:**
- Modify: `src/styles/global.css`
- Test: `src/lib/home-about-layout.test.ts`

- [ ] **Step 1: Add the shared About component styles**

Add these declarations within `@layer components` in `src/styles/global.css`:

```css
  .home-about {
    display: grid;
    gap: 1rem;
  }

  .home-about__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .home-about__role {
    font-size: 1.05rem;
  }

  .home-about__intro {
    max-width: 46rem;
    font-size: 1.02rem;
    line-height: 1.9;
  }

  .home-about__link {
    display: inline-flex;
    align-self: flex-start;
    align-items: center;
    gap: 0.7rem;
    margin-top: 0.35rem;
    border: 1px solid var(--border);
    border-radius: 0.85rem;
    padding: 0.72rem 1rem;
    color: var(--muted);
    transition:
      border-color 160ms ease,
      color 160ms ease,
      background-color 160ms ease;
  }

  .home-about__link:hover {
    border-color: var(--accent);
    color: var(--ink);
    background: var(--accent-soft);
  }

  .home-about__link span {
    font-size: 1.25rem;
    line-height: 1;
  }
```

- [ ] **Step 2: Set desktop two-column alignment and button placement**

Add within a desktop media query in `src/styles/global.css`:

```css
@media (min-width: 768px) {
  .home-about {
    grid-template-columns: 8.5rem minmax(0, 1fr);
    gap: 1.25rem;
  }

  .home-about__link {
    align-self: flex-end;
  }
}
```

- [ ] **Step 3: Keep reduced-motion behavior consistent**

Extend the existing reduced-motion selector:

```css
@media (prefers-reduced-motion: reduce) {
  .floating-header__bar,
  .header-action,
  .header-language,
  .home-about__link {
    transition: none;
  }
}
```

- [ ] **Step 4: Run automated and production verification**

Run: `npm.cmd test`

Expected: PASS for the existing suites plus `src/lib/home-about-layout.test.ts`.

Run: `$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build`

Expected: Astro reports no diagnostics and builds both `/index.html` and `/en/index.html`.

- [ ] **Step 5: Inspect the generated localized About destinations**

Run:

```powershell
Select-String -Path dist\index.html -Pattern '更多关于我|href="/about"|home-about'
Select-String -Path dist\en\index.html -Pattern 'More about me|href="/en/about"|home-about'
```

Expected: the Chinese output contains `/about` and the English output contains `/en/about`, each within the new About layout markup.

- [ ] **Step 6: Visually validate in the in-app browser**

Start the local preview and open `/` and `/en` in the Codex in-app browser. At desktop size, confirm a left section heading, right identity/intro column, and lower-right action; at mobile size, confirm a readable vertical stack without horizontal overflow.
