# Axi-Inspired Blog Card And Light Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the first blog entry an original atmospheric cover card and soften the light-theme background so the blog reads as a quieter editorial page.

**Architecture:** Keep `cover` frontmatter as the only article-to-card media interface. Refine `PostCard.astro` into explicit covered/fallback presentation classes, add one local generated bitmap asset referenced by the existing first article, and adjust only global light-theme atmosphere tokens/styles. A focused static contract test drives the content wiring and markup/style hooks before visual browser verification.

**Tech Stack:** Astro components and content collections, Tailwind CSS v4 utility classes plus `src/styles/global.css`, Vitest, built-in image generation, Codex in-app browser.

---

## File Map

- Create `public/blog/hello-world-cover.webp`: original wide, low-saturation atmospheric article artwork.
- Create `src/lib/blog-card-visual.test.ts`: source-level contract test for cover wiring, covered-card hooks, and softened light-theme variables.
- Modify `src/content/blog/hello-world.md`: reference `/blog/hello-world-cover.webp` through existing `cover` frontmatter.
- Modify `src/components/PostCard.astro`: use stable `post-card` media/fade/content classes while retaining no-cover fallback and decorative empty alt text.
- Modify `src/styles/global.css`: define covered-card media/fade behavior and make the light background glow substantially fainter; hide decorative media on small screens.

### Task 1: Lock In Cover Wiring And Visual Hooks

**Files:**
- Create: `src/lib/blog-card-visual.test.ts`
- Test: `src/lib/blog-card-visual.test.ts`

- [ ] **Step 1: Write the failing source-contract test**

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const article = readFileSync(new URL('../content/blog/hello-world.md', import.meta.url), 'utf8');
const card = readFileSync(new URL('../components/PostCard.astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('Axi-inspired blog card visuals', () => {
  it('connects the first article to a local atmospheric cover asset', () => {
    expect(article).toContain('cover: /blog/hello-world-cover.webp');
  });

  it('keeps covered posts readable with dedicated media and fade layers', () => {
    expect(card).toContain('post-card');
    expect(card).toContain('post-card__media');
    expect(card).toContain('post-card__fade');
    expect(card).toContain('alt=""');
  });

  it('uses a quiet light canvas and suppresses decorative media on small screens', () => {
    expect(styles).toContain('--pink-soft: rgb(243 228 236 / 0.32);');
    expect(styles).toContain('--page-accent: rgb(234 241 255 / 0.4);');
    expect(styles).toContain('.post-card__media');
    expect(styles).toContain('.post-card__fade');
    expect(styles).toContain('.post-card__media {');
    expect(styles).toContain('display: none;');
  });
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```powershell
npm.cmd test -- src/lib/blog-card-visual.test.ts
```

Expected: FAIL because the article does not yet contain `cover: /blog/hello-world-cover.webp`, and the component/styles do not contain the new `post-card__*` hooks or quiet-theme token values.

- [ ] **Step 3: Commit the failing test**

```powershell
git add -- src/lib/blog-card-visual.test.ts
git commit -m "test: define covered blog card styling"
```

### Task 2: Generate And Wire The Original Cover Artwork

**Files:**
- Create: `public/blog/hello-world-cover.webp`
- Modify: `src/content/blog/hello-world.md`
- Test: `src/lib/blog-card-visual.test.ts`

- [ ] **Step 1: Generate an original article cover using built-in image generation**

Use the built-in image generation path with this prompt:

```text
Use case: stylized-concept
Asset type: wide blog article card cover for a personal technical blog
Primary request: Create an original calm atmospheric landscape illustration for an article about beginning to build a personal website.
Scene/backdrop: pale morning sky over a distant modern campus or quiet city edge, soft clouds, understated architecture and greenery, no identifiable landmark.
Style/medium: refined digital illustration, lightly cinematic, soft painterly detail, editorial website artwork.
Composition/framing: wide horizontal composition; keep the left half quiet and bright for a text fade overlay, place the most visible landscape detail on the right half.
Lighting/mood: hazy daylight, calm, reflective, hopeful.
Color palette: low-saturation blue-gray, misty white, a restrained hint of warm sunlight.
Constraints: no people, no characters, no text, no logos, no watermark, no copied composition or recognizable copyrighted artwork.
Avoid: strong contrast, vivid pink/purple neon, cluttered foreground, dark dramatic shadows.
```

Select the version that remains legible beneath a translucent white fade, then copy/move the final project asset to:

```text
public/blog/hello-world-cover.webp
```

- [ ] **Step 2: Add the existing content-model reference**

Update frontmatter in `src/content/blog/hello-world.md`:

```yaml
cover: /blog/hello-world-cover.webp
```

Place it after:

```yaml
pinned: true
```

- [ ] **Step 3: Run the focused test and inspect expected remaining failures**

Run:

```powershell
npm.cmd test -- src/lib/blog-card-visual.test.ts
```

Expected: the cover-reference assertion passes; covered-card hook and light-theme assertions remain FAIL until Task 3.

### Task 3: Refine Covered Card Markup And Calm Light Background

**Files:**
- Modify: `src/components/PostCard.astro`
- Modify: `src/styles/global.css`
- Test: `src/lib/blog-card-visual.test.ts`

- [ ] **Step 1: Introduce stable article-card structure in `PostCard.astro`**

Replace `src/components/PostCard.astro` with:

```astro
---
import type { CollectionEntry } from 'astro:content';

const { post } = Astro.props as { post: CollectionEntry<'blog'> };
const date = post.data.publishedAt.toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---
<article class:list={['post-card group', { 'post-card--covered': post.data.cover }]}>
  {post.data.cover && (
    <>
      <img
        class="post-card__media"
        src={post.data.cover}
        alt=""
        onerror="this.style.display='none'"
      />
      <div class="post-card__fade" aria-hidden="true"></div>
    </>
  )}
  <a class="post-card__content" href={`/blog/${post.id}/`}>
    <div>
      <div class="flex flex-wrap items-center gap-2 text-sm muted">
        <time datetime={post.data.publishedAt.toISOString()}>{date}</time>
        <span aria-hidden="true">·</span>
        <span>{post.data.collection}</span>
      </div>
      <h2 class="mt-4 text-xl font-semibold tracking-tight transition group-hover:text-[var(--accent)] sm:text-2xl">{post.data.title}</h2>
      <p class="mt-3 max-w-xl leading-7 muted">{post.data.description}</p>
    </div>
    <div class="mt-6 flex items-center justify-between gap-4">
      <div class="flex flex-wrap gap-2">
        {post.data.tags.map((tag) => (
          <span class="rounded-full border bg-[var(--page)] px-4 py-2 text-sm muted">{tag}</span>
        ))}
      </div>
      <span class="text-lg transition group-hover:translate-x-1" aria-hidden="true">→</span>
    </div>
  </a>
</article>
```

This retains the existing content hierarchy and fixes the separator and arrow characters in the source while the component is being edited.

- [ ] **Step 2: Add card styling and soften light-mode atmosphere in `global.css`**

Update light tokens:

```css
:root {
  --page: #fafbfd;
  --page-accent: rgb(234 241 255 / 0.4);
  --panel: rgb(255 255 255 / 0.88);
  --pink-soft: rgb(243 228 236 / 0.32);
}
```

Update the body background so the low-opacity accents remain near the page edges:

```css
background:
  radial-gradient(circle at 96% 3%, var(--pink-soft), transparent 22rem),
  radial-gradient(circle at 2% 12%, var(--page-accent), transparent 24rem),
  var(--page);
```

Add component rules inside `@layer components`:

```css
.post-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  background: var(--panel);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.post-card:hover {
  transform: translateY(-0.125rem);
  box-shadow: 0 18px 48px rgb(31 44 68 / 0.075);
}

.post-card__media {
  position: absolute;
  inset: 0 0 0 auto;
  display: block;
  width: min(58%, 25rem);
  height: 100%;
  object-fit: cover;
  opacity: 0.72;
}

.post-card__fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--panel) 0%,
    var(--panel) 47%,
    rgb(255 255 255 / 0.72) 68%,
    transparent 100%
  );
}

.dark .post-card__fade {
  background: linear-gradient(
    90deg,
    var(--panel) 0%,
    var(--panel) 47%,
    rgb(23 30 43 / 0.76) 68%,
    transparent 100%
  );
}

.post-card__content {
  position: relative;
  display: flex;
  min-height: 13rem;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
}

@media (min-width: 640px) {
  .post-card__content {
    padding: 2rem;
  }
}
```

In the existing `@media (max-width: 767px)` block add:

```css
.post-card__media,
.post-card__fade {
  display: none;
}
```

- [ ] **Step 3: Run focused test to verify GREEN**

Run:

```powershell
npm.cmd test -- src/lib/blog-card-visual.test.ts
```

Expected: PASS with all three visual-contract tests passing.

- [ ] **Step 4: Commit implementation files**

```powershell
git add -- public/blog/hello-world-cover.webp src/content/blog/hello-world.md src/components/PostCard.astro src/styles/global.css
git commit -m "feat: add atmospheric blog cover card"
```

### Task 4: Full Verification And Visual Review

**Files:**
- Verify: `src/components/PostCard.astro`
- Verify: `src/styles/global.css`
- Verify: `src/content/blog/hello-world.md`
- Verify: `public/blog/hello-world-cover.webp`

- [ ] **Step 1: Run complete automated checks**

Run:

```powershell
npm.cmd test
$env:ASTRO_TELEMETRY_DISABLED='1'
npm.cmd run build
git diff --check
```

Expected:

- Vitest reports all test files passing, including `src/lib/blog-card-visual.test.ts`.
- Astro check reports `0 errors`, `0 warnings`, and `0 hints`.
- Astro build generates `/blog/index.html`.
- `git diff --check` emits no whitespace-error output.

- [ ] **Step 2: Verify desktop light-theme pages in the Codex browser**

Open the latest site output and inspect:

- `/blog`: the first article displays the original right-side landscape cover, title/excerpt/tags remain readable, and the page canvas looks calmer than the previous pink/blue wash.
- `/`: the global background is lighter and quieter without losing card separation.

Expected: decorative color is restrained, while panels and typography remain clearly distinct.

- [ ] **Step 3: Verify dark theme and mobile layout**

In `/blog`:

- Toggle to dark theme and confirm text remains legible over the covered card.
- Resize to a narrow/mobile width and confirm the cover decoration is hidden while article content, tags, and side/filter ordering remain usable without horizontal overflow.

Expected: dark-mode covered card is readable; mobile card is text-first and stable.

- [ ] **Step 4: Remove browser-verification artifacts and inspect repository status**

Delete only temporary screenshots/browser snapshots created during verification, then run:

```powershell
git status --short --branch
```

Expected: no temporary screenshot or browser automation artifact remains in the working tree.
