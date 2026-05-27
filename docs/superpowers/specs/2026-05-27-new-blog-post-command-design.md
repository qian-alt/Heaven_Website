# New Blog Post Command Design

## Goal

Add a simple local authoring command that creates a new Markdown blog draft with the site's required frontmatter, so a new article can be started without manually rewriting the template.

## User Command

The command will be:

```powershell
npm run new:post -- "我的第一篇博客"
```

It accepts one required argument: the article title. When successful, it creates a Markdown file in `src/content/blog/` and prints the created path.

## Generated File Name

- Preserve Chinese and other readable Unicode title characters.
- Trim surrounding whitespace and replace internal whitespace runs with `-`.
- Remove Windows/path-reserved characters such as `< > : " / \ | ? *`.
- Collapse repeated `-` characters.
- Generate `<sanitized-title>.md`, for example `我的 第一篇博客` becomes `我的-第一篇博客.md`.
- Reject a title that produces an empty file name after sanitization.
- Refuse to overwrite an existing article file and exit with an explanatory error.

## Generated Template

The generated draft will satisfy the existing Astro content schema and use editable defaults:

```md
---
title: "我的第一篇博客"
description: "简单介绍这篇文章会讲什么。"
publishedAt: 2026-05-27
tags: ["学习", "记录"]
collection: "生活记录"
draft: true
pinned: false
cover: /blog/covers/my-first-post.webp
---

在这里开始写正文。
```

- `publishedAt` uses the local calendar date when the command is run.
- `title` uses the entered title and escapes quotes safely for YAML.
- `draft: true` prevents an unfinished generated article from appearing publicly until manually changed to `false`.
- `cover` is a visible editable placeholder following the site's recommended `public/blog/covers/` organization.

## Implementation

- Add a small Node.js script under `scripts/` using only built-in Node modules.
- Add `new:post` to `package.json`.
- Keep article rendering and content schema unchanged.
- Document the authoring command and generated template in `README.md`.

## Verification

- Unit-test title sanitization, generated frontmatter/date, quote escaping, and duplicate-file refusal.
- Run the new command in a temporary test directory rather than writing sample content into the real blog folder.
- Run the project test suite and production build after implementation.

## Out Of Scope

- Interactive prompts for descriptions, categories, or tags.
- Automatic image creation or image copying.
- Editing or committing existing personal draft articles.
