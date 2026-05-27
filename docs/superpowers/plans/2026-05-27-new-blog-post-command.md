# New Blog Post Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `npm run new:post -- "标题"` to generate a safe, editable Markdown blog draft with valid frontmatter.

**Architecture:** A dependency-free ESM module in `scripts/` will export pure formatting helpers and a file-creation function, then expose a CLI entrypoint for npm. Vitest will exercise the exported behavior in temporary folders, and `package.json` plus `README.md` will surface the authoring workflow.

**Tech Stack:** Node.js built-in modules, Astro content Markdown, Vitest, npm scripts

---

## File Structure

- Create `scripts/new-post.mjs` for title sanitization, YAML escaping, template rendering, file creation, and CLI argument handling.
- Create `src/lib/new-post-command.test.ts` for behavior-level tests executed against a temporary directory.
- Modify `package.json` to add the `new:post` authoring command.
- Modify `README.md` to document article creation and the generated draft template.

### Task 1: Specify Draft Generation Behavior

**Files:**
- Create: `src/lib/new-post-command.test.ts`
- Create later: `scripts/new-post.mjs`

- [ ] **Step 1: Write a failing test for safe Markdown draft generation**

```ts
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createPost, sanitizeTitle } from '../../scripts/new-post.mjs';

const temporaryDirectories: string[] = [];

function createDirectory() {
  const directory = mkdtempSync(join(tmpdir(), 'heaven-new-post-'));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('new blog post command', () => {
  it('keeps readable Chinese titles while removing unsafe path characters', () => {
    expect(sanitizeTitle('  我的 / 第一篇：博客?  ')).toBe('我的-第一篇博客');
  });

  it('creates a draft with required frontmatter and a supplied date', () => {
    const outputDirectory = createDirectory();
    const createdPath = createPost({
      title: '我的 "第一篇" 博客',
      outputDirectory,
      date: '2026-05-27',
    });

    expect(createdPath).toBe(join(outputDirectory, '我的-第一篇-博客.md'));
    expect(readFileSync(createdPath, 'utf8')).toContain('title: "我的 \\"第一篇\\" 博客"');
    expect(readFileSync(createdPath, 'utf8')).toContain('publishedAt: 2026-05-27');
    expect(readFileSync(createdPath, 'utf8')).toContain('collection: "生活记录"');
    expect(readFileSync(createdPath, 'utf8')).toContain('draft: true');
  });

  it('refuses to overwrite an existing article file', () => {
    const outputDirectory = createDirectory();
    createPost({ title: '重复标题', outputDirectory, date: '2026-05-27' });

    expect(() => createPost({ title: '重复标题', outputDirectory, date: '2026-05-27' })).toThrow(
      '文章文件已存在',
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm.cmd test -- src/lib/new-post-command.test.ts`

Expected: FAIL because `scripts/new-post.mjs` does not exist.

- [ ] **Step 3: Commit the red test**

```bash
git add src/lib/new-post-command.test.ts
git commit -m "test: define new blog post command"
```

### Task 2: Implement The Draft Generator

**Files:**
- Create: `scripts/new-post.mjs`
- Test: `src/lib/new-post-command.test.ts`

- [ ] **Step 1: Implement the pure helpers and file creation function**

Create a dependency-free ESM script exporting:

```js
export function sanitizeTitle(title) {
  return title
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function createPost({ title, outputDirectory, date = formatLocalDate(new Date()) }) {
  const fileName = sanitizeTitle(title);
  if (!fileName) {
    throw new Error('文章标题无法生成有效文件名。');
  }
  // Create output directory, reject existing path, and write rendered template.
}
```

The rendered template must contain:

```md
---
title: "<escaped title>"
description: "简单介绍这篇文章会讲什么。"
publishedAt: <local date>
tags: ["学习", "记录"]
collection: "生活记录"
draft: true
pinned: false
cover: /blog/covers/my-first-post.webp
---

在这里开始写正文。
```

- [ ] **Step 2: Add CLI behavior**

When the file is executed directly, read the joined title from `process.argv.slice(2)`, use `src/content/blog` as output directory relative to the repository root, create the article, and print `已创建博客草稿: <path>`. If no title is supplied or creation fails, print an actionable error and set a nonzero exit code.

- [ ] **Step 3: Run the focused test to verify it passes**

Run: `npm.cmd test -- src/lib/new-post-command.test.ts`

Expected: PASS with three tests.

- [ ] **Step 4: Commit the generator**

```bash
git add scripts/new-post.mjs
git commit -m "feat: add blog post draft generator"
```

### Task 3: Expose And Document The Command

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Test: `src/lib/new-post-command.test.ts`

- [ ] **Step 1: Add the npm entrypoint**

Add this script entry in `package.json`:

```json
"new:post": "node scripts/new-post.mjs"
```

- [ ] **Step 2: Document normal authoring usage**

Add an authoring section to `README.md` documenting:

```powershell
npm run new:post -- "我的第一篇博客"
```

Explain that the command creates `src/content/blog/我的第一篇博客.md`, defaults to `draft: true`, and that images belong under `public/blog/`.

- [ ] **Step 3: Run the command safely in a temporary validation scenario**

The automated tests already execute file creation in temporary directories. Run:

```powershell
npm.cmd test -- src/lib/new-post-command.test.ts
```

Expected: PASS without adding a generated sample post to `src/content/blog/`.

- [ ] **Step 4: Run complete validation**

Run: `npm.cmd test`

Expected: all tests pass.

Run: `npm.cmd run build`

Expected: Astro check and production build complete without errors.

- [ ] **Step 5: Commit documentation and command exposure**

```bash
git add package.json README.md
git commit -m "docs: add new post authoring command"
```
