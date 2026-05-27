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

## Writing A New Post

运行下面的命令，自动生成带 frontmatter 的博客草稿：

```powershell
npm run new:post -- "我的第一篇博客"
```

文章会创建在 `src/content/blog/我的第一篇博客.md`。新文章默认包含 `draft: true`，写完并准备公开时将它修改为 `draft: false`。

封面图片建议放在 `public/blog/covers/`，正文图片建议放在 `public/blog/<文章文件名>/`，并在 Markdown 中使用 `/blog/...` 路径引用。

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
collection: "生活记录"
draft: false
pinned: false
cover: /blog/covers/my-first-post.webp
---
```
