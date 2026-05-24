# Heaven Personal Site

一个以内容为中心的 Astro 个人网站，包含博客、项目、友链和个人介绍。

## Local Development

```sh
npm install
npm run dev
```

在 PowerShell 执行策略限制 `npm.ps1` 的 Windows 环境中，使用 `npm.cmd` 代替 `npm`。

## Build Verification

```sh
npm test
npm run build
```

## Updating Content

- 在 `src/content/blog/` 添加 Markdown 或 MDX 文章。
- 在 `src/data/projects.ts` 更新项目。
- 在 `src/data/links.ts` 更新友链。
- 在 `src/data/experiences.ts` 更新经历。
- 在 `src/data/site.ts` 替换昵称、头像和社交链接。
- 部署前在 `astro.config.mjs` 将 `site` 更新为正式域名，以生成正确的 canonical、RSS 与 sitemap 地址。

## Article Frontmatter

```yaml
---
title: "文章标题"
description: "文章摘要"
publishedAt: 2026-05-24
tags: ["Web"]
draft: false
pinned: false
---
```
