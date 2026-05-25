# Axi-Style Blog Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the blog index into an Axi-inspired reading hub with large article cards and collection/tag sidebar filtering.

**Architecture:** Published Astro content entries gain a validated `collection` string. Existing content utilities aggregate collections and tags from the same published entries, while the blog page renders all articles statically and applies keyword, collection, and tag filtering in a small progressive-enhancement script. `PostCard.astro` remains the single article-summary rendering boundary and becomes the rich card visual.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4, Astro Content Collections, Vitest

---

## File Map

```text
src/content.config.ts                       Validate article collection frontmatter
src/content/blog/hello-world.md             Assign the existing post to a collection
src/lib/content.ts                          Aggregate unique collections from article entries
src/lib/content.test.ts                     Test collection aggregation alongside existing rules
src/components/PostCard.astro               Render rich, optional-cover article summary cards
src/pages/blog/index.astro                  Two-column blog hub and combined filter controls
```

## Task 1: Add Collection Aggregation With Tests

**Files:**
- Modify: `src/lib/content.test.ts`
- Modify: `src/lib/content.ts`

- [ ] **Step 1: Write the failing collection test**

Update the test import and fixture data to include collections, then add:

```ts
it('returns sorted unique collections from public posts', () => {
  expect(getAllCollections(filterPublishedPosts(posts))).toEqual(['Learning', 'Projects']);
});
```

Use one published entry in `Learning`, one published entry in `Projects`, and the draft entry in `Private` so the test proves drafts are excluded by the caller's published-post pipeline.

- [ ] **Step 2: Run the focused test and verify red**

Run:

```powershell
npm.cmd test -- src/lib/content.test.ts
```

Expected: FAIL because `getAllCollections` is not exported yet.

- [ ] **Step 3: Implement the minimal helper**

Extend `PostLike.data` with `collection: string` and add:

```ts
export function getAllCollections<T extends PostLike>(posts: T[]): string[] {
  return [...new Set(posts.map((post) => post.data.collection))].sort();
}
```

- [ ] **Step 4: Verify green**

Run:

```powershell
npm.cmd test -- src/lib/content.test.ts
```

Expected: all `content.test.ts` tests pass.

## Task 2: Validate And Supply Collection Metadata

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/content/blog/hello-world.md`

- [ ] **Step 1: Require collection in the content schema**

Add the required schema property:

```ts
collection: z.string().min(1),
```

- [ ] **Step 2: Add collection metadata to the current post**

Add to the article frontmatter:

```yaml
collection: "学习记录"
```

- [ ] **Step 3: Run content/build validation**

Run:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build
```

Expected: Astro diagnostics and build complete with zero errors.

## Task 3: Render Axi-Inspired Article Cards

**Files:**
- Modify: `src/components/PostCard.astro`

- [ ] **Step 1: Replace the compact row with a rich linked card**

Render the card as a rounded bordered link with:

```astro
<article class="group relative overflow-hidden rounded-3xl border bg-[var(--panel)]">
  {post.data.cover && <img ... src={post.data.cover} ... />}
  <a class="relative block p-6 sm:p-8" href={`/blog/${post.id}/`}>
    <time>{date}</time>
    <h2>{post.data.title}</h2>
    <p>{post.data.description}</p>
    <div>{post.data.tags.map((tag) => <span>{tag}</span>)}</div>
  </a>
</article>
```

Use `cover` only when defined and preserve accessible article links. Include `post.data.collection` as supporting metadata near the date.

- [ ] **Step 2: Verify type/build compatibility**

Run:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build
```

Expected: no Astro type or rendering diagnostics.

## Task 4: Build The Blog Hub Layout And Filters

**Files:**
- Modify: `src/pages/blog/index.astro`

- [ ] **Step 1: Supply collections to the page**

Import `getAllCollections` and derive:

```ts
const collections = getAllCollections(posts);
```

- [ ] **Step 2: Replace the current panel list with main/sidebar composition**

Create:

```astro
<main class="mx-auto grid max-w-6xl gap-8 px-5 pb-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
  <section>
    <!-- title, post count, search, list -->
  </section>
  <aside>
    <!-- collections and tags controls -->
  </aside>
</main>
```

Place the collection/tag filter panels before the post list on small screens using responsive ordering, and alongside it at `lg` width. Each post wrapper must provide:

```astro
data-collection={post.data.collection}
data-tags={post.data.tags.join('|')}
```

- [ ] **Step 3: Extend filtering state**

Use three independent inputs:

```ts
let activeCollection = '';
let activeTag = '';
const query = search?.value.trim().toLowerCase() ?? '';
```

Cards are visible only when their title/description matches the query, their collection matches `activeCollection` if selected, and their tags contain `activeTag` if selected. Toggle selected styling for `[data-collection-filter]` and `[data-tag-filter]` buttons separately.

- [ ] **Step 4: Run tests and build**

Run:

```powershell
npm.cmd test
$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build
```

Expected: all tests pass and the static site builds without diagnostics.

## Task 5: Responsive Browser Verification

**Files:**
- Verify: `src/pages/blog/index.astro`
- Verify: `src/components/PostCard.astro`

- [ ] **Step 1: Preview and inspect desktop**

Run:

```powershell
npm.cmd run preview -- --host localhost --port 4322
```

Open `/blog` at a desktop viewport and verify:

- Article list appears in the main column.
- Sidebar displays `合集` and `标签`.
- The existing post displays its date, collection, title, description, and tags.
- Selecting its collection and tag keeps the post visible.
- Searching for a missing term shows the empty-result message.

- [ ] **Step 2: Inspect mobile**

At a narrow mobile viewport verify:

- Filter controls remain readable without horizontal overflow.
- Article cards appear below the filtering controls.
- The single-column order is understandable and tappable.

- [ ] **Step 3: Stop the preview process and review git diff**

Stop the local server, then run:

```powershell
git diff --check
git status --short --branch
```

Expected: no whitespace errors and only intended implementation files plus the user's pre-existing personal-content edits remain modified.

