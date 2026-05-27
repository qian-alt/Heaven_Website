# About Site Information Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add localized Distribution, Copyright, and Theme information to both About pages in a shared Axi-inspired presentation.

**Architecture:** A shared `SiteInformation.astro` component will own the common structure, fixed external destinations, and externally linked credit/license labels. The Chinese and English pages will pass localized heading and paragraph strings, while shared CSS applies responsive cards and readable text spacing.

**Tech Stack:** Astro components, project global CSS, Vitest source contract tests

---

## File Structure

- Create `src/components/SiteInformation.astro` to render the distribution cards, copyright notice, and theme provenance.
- Create `src/lib/about-site-information.test.ts` to assert localized mounting, external destinations, and shared styling hooks.
- Modify `src/pages/about.astro` to mount the component with Chinese copy after education.
- Modify `src/pages/en/about.astro` to mount the component with matching English copy after education.
- Modify `src/styles/global.css` for section rhythm, deployment cards, and responsive behavior.

### Task 1: Define The About Information Contract

**Files:**
- Create: `src/lib/about-site-information.test.ts`
- Create later: `src/components/SiteInformation.astro`
- Modify later: `src/pages/about.astro`
- Modify later: `src/pages/en/about.astro`
- Modify later: `src/styles/global.css`

- [ ] **Step 1: Write the failing source contract test**

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const chineseAbout = readFileSync(new URL('../pages/about.astro', import.meta.url), 'utf8');
const englishAbout = readFileSync(new URL('../pages/en/about.astro', import.meta.url), 'utf8');
const componentPath = new URL('../components/SiteInformation.astro', import.meta.url);
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('localized About site information section', () => {
  it('mounts the shared component with Chinese labels', () => {
    expect(chineseAbout).toContain("import SiteInformation from '../components/SiteInformation.astro';");
    expect(chineseAbout).toContain('title="站点信息"');
    expect(chineseAbout).toContain('distributionTitle="网页分发"');
    expect(chineseAbout).toContain('copyrightTitle="版权"');
    expect(chineseAbout).toContain('themeTitle="主题"');
  });

  it('mounts the shared component with English labels', () => {
    expect(englishAbout).toContain("import SiteInformation from '../../components/SiteInformation.astro';");
    expect(englishAbout).toContain('title="Site Information"');
    expect(englishAbout).toContain('distributionTitle="Distribution"');
    expect(englishAbout).toContain('copyrightTitle="Copyright"');
    expect(englishAbout).toContain('themeTitle="Theme"');
  });

  it('renders the two deployments and linked attribution through the component', () => {
    const component = readFileSync(componentPath, 'utf8');
    expect(component).toContain('https://www.dearheaven.cn/');
    expect(component).toContain('https://cloudflare.dearheaven.cn/');
    expect(component).toContain('https://creativecommons.org/licenses/by-nc-sa/4.0/');
    expect(component).toContain('https://astro.build/');
    expect(component).toContain('https://axi404.top/');
  });

  it('provides responsive presentation hooks for distribution cards', () => {
    expect(styles).toContain('.site-information');
    expect(styles).toContain('.site-information__destinations');
    expect(styles).toContain('.site-information__destination');
    expect(styles).toContain('grid-template-columns: repeat(2, minmax(0, 1fr));');
  });
});
```

- [ ] **Step 2: Run the focused test to confirm RED**

Run: `npm.cmd test -- src/lib/about-site-information.test.ts`

Expected: FAIL because `SiteInformation.astro` and its About-page mount points do not yet exist.

- [ ] **Step 3: Commit the red test**

```bash
git add src/lib/about-site-information.test.ts
git commit -m "test: define about site information"
```

### Task 2: Build And Mount The Shared Information Section

**Files:**
- Create: `src/components/SiteInformation.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/en/about.astro`
- Test: `src/lib/about-site-information.test.ts`

- [ ] **Step 1: Create the shared component**

Implement a `Props` interface with:

```ts
interface Props {
  title: string;
  distributionTitle: string;
  distributionIntro: string;
  copyrightTitle: string;
  copyrightText: string;
  thirdPartyText: string;
  themeTitle: string;
  themePrefix: string;
  themeMiddle: string;
  themeSuffix: string;
}
```

Render:

```astro
<section class="site-information">
  <h2>{title}</h2>
  <section class="site-information__block">
    <h3>{distributionTitle}</h3>
    <p class="muted">{distributionIntro}</p>
    <div class="site-information__destinations">
      <!-- Vercel and Cloudflare external cards -->
    </div>
  </section>
  <section class="site-information__block">
    <h3>{copyrightTitle}</h3>
    <p class="muted">{copyrightText} <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a></p>
    <p class="muted">{thirdPartyText}</p>
  </section>
  <section class="site-information__block">
    <h3>{themeTitle}</h3>
    <p class="muted">
      {themePrefix}<a href="https://astro.build/">Astro</a>{themeMiddle}<a href="https://axi404.top/">Axi's Blog</a>{themeSuffix}
    </p>
  </section>
</section>
```

Ensure external links use `target="_blank"` and `rel="noreferrer"`.

- [ ] **Step 2: Mount Chinese localized content**

In `src/pages/about.astro`, import `SiteInformation` and render it after the experience section with the confirmed Chinese content and labels.

- [ ] **Step 3: Mount matching English content**

In `src/pages/en/about.astro`, import `SiteInformation` and render it in the same position with the approved English translation.

- [ ] **Step 4: Run focused tests**

Run: `npm.cmd test -- src/lib/about-site-information.test.ts src/lib/about-progress-layout.test.ts src/lib/english-page-parity.test.ts`

Expected: PASS with the component mounted without regressing existing About-page contracts.

- [ ] **Step 5: Commit component and mounts**

```bash
git add src/components/SiteInformation.astro src/pages/about.astro src/pages/en/about.astro
git commit -m "feat: add localized about site information"
```

### Task 3: Style And Validate The Information Section

**Files:**
- Modify: `src/styles/global.css`
- Test: `src/lib/about-site-information.test.ts`

- [ ] **Step 1: Add component styles**

Add CSS hooks with these layout properties:

```css
.site-information {
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border);
}

.site-information__destinations {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.site-information__destination {
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--panel);
}
```

At narrow widths, make `.site-information__destinations` a single column.

- [ ] **Step 2: Run all automated tests**

Run: `npm.cmd test`

Expected: all tests pass.

- [ ] **Step 3: Run a production build**

Run: `npm.cmd run build`

Expected: Astro check and build pass unless a pre-existing untracked invalid blog draft blocks content synchronization. If blocked by such a draft, record the exact file separately without modifying it.

- [ ] **Step 4: Inspect desktop and mobile layouts**

Open `/about` and `/en/about` at desktop and mobile widths. Confirm the distribution cards, copyright link, and theme attribution render below education; the cards stack on small screens; no horizontal overflow appears.

- [ ] **Step 5: Commit the styles**

```bash
git add src/styles/global.css
git commit -m "style: present about site information cards"
```
