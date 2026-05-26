# Article Reading Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn each blog article page into a wider desktop reading layout with a sticky right-hand table of contents and a compact mobile fallback.

**Architecture:** `PostLayout.astro` will own the responsive article shell and expose a named `toc` slot. The dynamic article route will keep deriving headings from rendered Markdown and fill that slot, while `global.css` supplies presentation and breakpoints without changing article data.

**Tech Stack:** Astro, Tailwind utility classes, project global CSS, Vitest source-level regression tests

---

## File Structure

- Create `src/lib/post-reading-sidebar.test.ts` to guard the article layout contract and sidebar CSS.
- Modify `src/layouts/PostLayout.astro` to expose a content column and a named table-of-contents sidebar region.
- Modify `src/pages/blog/[slug].astro` to place generated heading links into the sidebar slot instead of the article body.
- Modify `src/styles/global.css` to style the wide shell, sticky desktop sidebar, compact table of contents, and mobile fallback.

### Task 1: Lock Down The Article Layout Contract

**Files:**
- Create: `src/lib/post-reading-sidebar.test.ts`
- Inspect: `src/layouts/PostLayout.astro`
- Inspect: `src/pages/blog/[slug].astro`
- Inspect: `src/styles/global.css`

- [ ] **Step 1: Write the failing regression test**

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const layout = readFileSync(new URL('../layouts/PostLayout.astro', import.meta.url), 'utf8');
const postRoute = readFileSync(new URL('../pages/blog/[slug].astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('article reading sidebar layout', () => {
  it('provides a wide article shell with a dedicated toc sidebar slot', () => {
    expect(layout).toContain('post-reading-shell');
    expect(layout).toContain('post-reading__article');
    expect(layout).toContain('post-reading__sidebar');
    expect(layout).toContain('<slot name="toc" />');
  });

  it('renders generated headings into the sidebar slot', () => {
    expect(postRoute).toContain('slot="toc"');
    expect(postRoute).toContain('post-toc');
    expect(postRoute).toContain('tableOfContents.map');
  });

  it('keeps the toc sticky on desktop and inline on small screens', () => {
    expect(styles).toContain('.post-reading-shell');
    expect(styles).toContain('.post-reading__sidebar');
    expect(styles).toContain('position: sticky;');
    expect(styles).toContain('.post-toc');
    expect(styles).toContain('@media (max-width: 1023px)');
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm.cmd test -- src/lib/post-reading-sidebar.test.ts`

Expected: FAIL because the current article layout has neither the dedicated sidebar slot nor sidebar styles.

- [ ] **Step 3: Commit the red test**

```bash
git add src/lib/post-reading-sidebar.test.ts
git commit -m "test: define post reading sidebar layout"
```

### Task 2: Implement The Wide Reading Shell And Sidebar

**Files:**
- Modify: `src/layouts/PostLayout.astro`
- Modify: `src/pages/blog/[slug].astro`
- Modify: `src/styles/global.css`
- Test: `src/lib/post-reading-sidebar.test.ts`

- [ ] **Step 1: Add the article shell and sidebar slot**

Change `PostLayout.astro` so its main area uses:

```astro
<main class="post-reading-shell">
  <article class="post-reading__article site-panel p-6 sm:p-10">
    <!-- existing article header and default slot -->
  </article>
  <aside class="post-reading__sidebar">
    <slot name="toc" />
  </aside>
</main>
```

- [ ] **Step 2: Move generated directory markup into the sidebar slot**

In `src/pages/blog/[slug].astro`, replace the in-body table-of-contents block with:

```astro
{tableOfContents.length > 0 && (
  <nav slot="toc" class="post-toc" aria-label="文章目录">
    <p class="post-toc__title">目录</p>
    <ul class="post-toc__links">
      {tableOfContents.map((heading) => (
        <li><a class="post-toc__link" href={`#${heading.slug}`}>{heading.text}</a></li>
      ))}
    </ul>
  </nav>
)}
```

- [ ] **Step 3: Add scoped responsive styles**

In `src/styles/global.css`, add component rules equivalent to:

```css
.post-reading-shell {
  display: grid;
  width: min(100% - 2.5rem, 78rem);
  margin-inline: auto;
  padding-bottom: 4rem;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr) 15rem;
}

.post-reading__sidebar {
  position: sticky;
  top: 6.5rem;
  align-self: start;
}

.post-toc {
  border-left: 1px solid var(--border);
  padding: 0.4rem 0 0.4rem 1.25rem;
}

@media (max-width: 1023px) {
  .post-reading-shell {
    display: flex;
    max-width: 48rem;
    flex-direction: column;
  }

  .post-reading__sidebar {
    position: static;
    order: -1;
  }
}
```

Adjust spacing and link hover presentation during browser verification while keeping the above layout contract intact.

- [ ] **Step 4: Run focused and full automated checks**

Run: `npm.cmd test -- src/lib/post-reading-sidebar.test.ts`

Expected: PASS with 3 tests.

Run: `npm.cmd test`

Expected: PASS for the complete suite.

- [ ] **Step 5: Commit the implementation**

```bash
git add src/layouts/PostLayout.astro src/pages/blog/[slug].astro src/styles/global.css
git commit -m "feat: add sticky article table of contents"
```

### Task 3: Validate The Reading Experience

**Files:**
- Verify: `src/layouts/PostLayout.astro`
- Verify: `src/pages/blog/[slug].astro`
- Verify: `src/styles/global.css`

- [ ] **Step 1: Run production validation**

Run: `npm.cmd run build`

Expected: Astro reports zero errors and completes static output generation.

- [ ] **Step 2: Inspect the article at desktop width**

Open `/blog/hello-world/` at approximately `1440px` viewport width and verify:

- The article panel has a wider reading area and balanced left/right whitespace.
- The table of contents appears to the right, not inside the article flow.
- The table of contents remains visible after scrolling down the article.

- [ ] **Step 3: Inspect the article at mobile width**

Open `/blog/hello-world/` at approximately `390px` viewport width and verify:

- The article fits without horizontal overflow.
- The table of contents appears before article content in a compact block.
- Header and article content remain readable.

- [ ] **Step 4: Check repository cleanliness and report**

Run: `git diff --check` and `git status --short --branch`

Expected: no whitespace errors and only intentionally retained unpushed commits on `main`.
