# Project Card Link Buttons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional pill-style `Site` and `GitHub` actions beneath project cards, with the personal blog project wired to its real live site and repository.

**Architecture:** Retain the existing optional `demo` and `repository` fields in `src/data/projects.ts`, mapping them to visible actions only inside the shared `ProjectCard.astro` component. A small CSS class defines the Axi-inspired outlined action style, and a source/data contract test verifies data wiring, action order, icon accessibility, and absence of an always-on empty row.

**Tech Stack:** Astro, Zod data validation, Tailwind CSS v4 plus component CSS in `src/styles/global.css`, Vitest, Codex in-app browser.

---

## File Map

- Create `src/lib/project-card-links.test.ts`: focused contract test for real URLs and optional button rendering.
- Modify `src/data/projects.ts`: add the real `demo` and `repository` destinations to the `个人博客网站` entry.
- Modify `src/components/ProjectCard.astro`: render ordered `Site` and `GitHub` pill links with decorative icons.
- Modify `src/styles/global.css`: add `.project-action` styling and reduced-motion coverage for its transition.

### Task 1: Specify Optional Project Actions With A Failing Test

**Files:**
- Create: `src/lib/project-card-links.test.ts`
- Test: `src/lib/project-card-links.test.ts`

- [ ] **Step 1: Write the failing contract test**

Create `src/lib/project-card-links.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { projects } from '../data/projects';

const component = readFileSync(new URL('../components/ProjectCard.astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('project card external actions', () => {
  it('gives the personal blog both live site and GitHub destinations', () => {
    const personalBlog = projects.find((project) => project.title === '个人博客网站');

    expect(personalBlog).toMatchObject({
      demo: 'https://www.dearheaven.cn/',
      repository: 'https://github.com/qian-alt/Heaven_Website',
    });
  });

  it('renders optional Site then GitHub buttons from existing fields', () => {
    expect(component).toContain('project.demo &&');
    expect(component).toContain('project.repository &&');
    expect(component.indexOf('project.demo &&')).toBeLessThan(component.indexOf('project.repository &&'));
    expect(component).toContain('>Site</span>');
    expect(component).toContain('>GitHub</span>');
    expect(component).toContain('aria-hidden="true"');
  });

  it('styles project actions as lightweight pill links', () => {
    expect(component).toContain('project-action');
    expect(styles).toContain('.project-action');
    expect(styles).toContain('border-radius: 999px;');
  });
});
```

- [ ] **Step 2: Run the test to verify RED**

Run:

```powershell
npm.cmd test -- src/lib/project-card-links.test.ts
```

Expected: FAIL because the personal-blog URLs are absent, the card still uses `源码` / `预览` text links, and no `.project-action` style exists.

- [ ] **Step 3: Commit the failing test**

```powershell
git add -- src/lib/project-card-links.test.ts
git commit -m "test: define project card actions"
```

### Task 2: Wire Real Project Destinations

**Files:**
- Modify: `src/data/projects.ts`
- Test: `src/lib/project-card-links.test.ts`

- [ ] **Step 1: Add destinations to the personal blog data entry**

Update only the first project object in `src/data/projects.ts`:

```ts
  {
    title: '个人博客网站',
    description: '用于分享学习记录与作品的静态个人站。',
    technologies: ['Astro', 'TypeScript', 'Markdown'],
    demo: 'https://www.dearheaven.cn/',
    repository: 'https://github.com/qian-alt/Heaven_Website',
    featured: true,
  },
```

Leave `课程实践项目` without `demo` or `repository`.

- [ ] **Step 2: Run the focused test to see only presentation assertions remain RED**

Run:

```powershell
npm.cmd test -- src/lib/project-card-links.test.ts
```

Expected: the data destination assertion passes while the button markup/style assertions still fail until Task 3.

### Task 3: Render Axi-Inspired Project Action Buttons

**Files:**
- Modify: `src/components/ProjectCard.astro`
- Modify: `src/styles/global.css`
- Test: `src/lib/project-card-links.test.ts`

- [ ] **Step 1: Replace the optional action row in `ProjectCard.astro`**

Replace the existing `(project.repository || project.demo)` block with:

```astro
  {(project.demo || project.repository) && (
    <div class="mt-5 flex flex-wrap gap-2">
      {project.demo && (
        <a class="project-action" href={project.demo} target="_blank" rel="noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
          </svg>
          <span>Site</span>
        </a>
      )}
      {project.repository && (
        <a class="project-action" href={project.repository} target="_blank" rel="noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M9 19c-4.5 1.4-4.5-2.5-6.3-3" />
            <path d="M15.8 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.7-1.4 5.7-6.2a4.8 4.8 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1.1-.3-3.6 1.3a12.3 12.3 0 0 0-6.4 0C7.1 2.4 6 2.7 6 2.7A4.4 4.4 0 0 0 5.9 6a4.8 4.8 0 0 0-1.3 3.3c0 4.8 2.9 5.9 5.7 6.2-.5.5-.6 1.1-.6 2V21" />
          </svg>
          <span>GitHub</span>
        </a>
      )}
    </div>
  )}
```

The wrapper only renders when at least one URL exists, preserving the empty-row behavior.

- [ ] **Step 2: Add `.project-action` to `src/styles/global.css`**

Within `@layer components`, after `.home-about__link span`, add:

```css
  .project-action {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.5rem 0.8rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--panel);
    color: var(--muted);
    font-size: 0.875rem;
    transition:
      border-color 160ms ease,
      color 160ms ease,
      background-color 160ms ease;
  }

  .project-action:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-soft);
  }

  .project-action svg {
    width: 1rem;
    height: 1rem;
  }
```

In the existing `@media (prefers-reduced-motion: reduce)` transition list, append:

```css
  .project-action,
```

so the block becomes:

```css
@media (prefers-reduced-motion: reduce) {
  .floating-header__bar,
  .header-action,
  .header-language,
  .home-about__link,
  .project-action {
    transition: none;
  }
}
```

- [ ] **Step 3: Run the focused test to verify GREEN**

Run:

```powershell
npm.cmd test -- src/lib/project-card-links.test.ts
```

Expected: PASS with all project-action contract assertions succeeding.

- [ ] **Step 4: Commit the implementation**

```powershell
git add -- src/data/projects.ts src/components/ProjectCard.astro src/styles/global.css
git commit -m "feat: add project destination buttons"
```

### Task 4: Verify Shared Rendering And Responsive Behavior

**Files:**
- Verify: `src/data/projects.ts`
- Verify: `src/components/ProjectCard.astro`
- Verify: `src/styles/global.css`

- [ ] **Step 1: Run complete automated verification**

Run:

```powershell
npm.cmd test
$env:ASTRO_TELEMETRY_DISABLED='1'
npm.cmd run build
git diff --check
```

Expected:

- Vitest reports all tests passing, including `src/lib/project-card-links.test.ts`.
- Astro check reports `0 errors`, `0 warnings`, and `0 hints`.
- The build generates `/index.html` and `/projects/index.html`.
- `git diff --check` emits no whitespace errors.

- [ ] **Step 2: Verify desktop homepage and project listing in the Codex browser**

Open latest build output and inspect:

- `/`: the `个人博客网站` project displays `Site` then `GitHub` beneath technology tags.
- `/projects`: the same project displays the same action row; `课程实践项目` has no empty button row.

Expected: outlined pills align with the card padding and remain visually lighter than the tags.

- [ ] **Step 3: Verify mobile wrapping**

Resize to mobile width on `/` or `/projects`.

Expected: `Site` and `GitHub` remain visible and wrap naturally within the project card without horizontal overflow.

- [ ] **Step 4: Remove temporary browser artifacts and report repository state**

Remove only screenshots/snapshot output created for this verification and run:

```powershell
git status --short --branch
```

Expected: no browser-verification artifacts remain.
