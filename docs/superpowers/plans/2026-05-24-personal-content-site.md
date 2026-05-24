# Personal Content Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clean, Axi-inspired personal content website for a student/technology learner with Markdown blogging, projects, friends links, about content, and light/dark reading themes.

**Architecture:** This is a statically generated Astro site. Markdown/MDX blog entries are validated through an Astro content collection, while personal profile, experience, project, and friend-link data are validated once through Zod-backed data modules and reused by pages and components. Most UI renders as static Astro HTML; only theme persistence, mobile navigation, and client-side blog filtering require browser JavaScript.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4 via `@tailwindcss/vite`, Zod, `@astrojs/rss`, `@astrojs/sitemap`, Vitest, Astro Check

---

## File Map

Production files to create:

```text
.gitignore                                  Ignore build, packages, local brainstorm screens
package.json                                Scripts and dependency manifest
astro.config.mjs                            Site URL, Tailwind Vite plugin, sitemap integration
tsconfig.json                               Astro strict TypeScript configuration
src/env.d.ts                                Astro client type reference
src/styles/global.css                       Theme tokens, typography, shared prose/card styling
src/content.config.ts                       Blog collection schema and Markdown loader
src/content/blog/hello-world.md             Initial sample post proving the publishing workflow
src/data/site.ts                            Validated identity, navigation, social and SEO config
src/data/experiences.ts                     Validated education/learning history
src/data/projects.ts                        Validated project catalog
src/data/links.ts                           Validated friend-link catalog
src/lib/content.ts                          Published-post sorting and filtering helpers
src/lib/content.test.ts                     Unit tests for blog ordering/filtering
src/components/Header.astro                 Desktop/mobile navigation and theme button
src/components/Footer.astro                 Copyright and social/footer metadata
src/components/ThemeScript.astro            Initial theme hydration and toggle behavior
src/components/ProfileHero.astro            Homepage identity area
src/components/ExperienceCard.astro         Reusable experience card
src/components/ProjectCard.astro            Project card with optional links/image
src/components/PostCard.astro               Blog summary card
src/components/FriendCard.astro             Friend-link card with avatar fallback
src/components/EmptyState.astro             List fallback message
src/layouts/BaseLayout.astro                Document shell, SEO metadata, header/footer
src/layouts/PostLayout.astro                Reading layout and article metadata
src/pages/index.astro                       Homepage sections and latest-content entry points
src/pages/blog/index.astro                  Searchable/filterable post index
src/pages/blog/[slug].astro                 Markdown detail route
src/pages/projects.astro                    Complete project catalog
src/pages/links.astro                       Friends link catalog
src/pages/about.astro                       Extended bio and experiences
src/pages/rss.xml.ts                        RSS generation
public/avatar-placeholder.svg               Missing avatar/image fallback
public/favicon.svg                          Site identity asset
```

Verification files to create or edit:

```text
README.md                                   Authoring and deployment instructions
```

## Task 1: Initialize The Astro Project And Global Tooling

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Create: `src/styles/global.css`

- [ ] **Step 1: Initialize version control and write ignored paths**

Run:

```powershell
git init
```

Create `.gitignore`:

```gitignore
node_modules/
dist/
.astro/
.DS_Store
.vercel/
.superpowers/
```

Expected: `git status --short` lists `docs/`, `.gitignore`, and no `.superpowers/` preview artifacts.

- [ ] **Step 2: Define application scripts and dependencies**

Create `package.json`:

```json
{
  "name": "heaven-personal-site",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  },
  "dependencies": {
    "@astrojs/rss": "latest",
    "@astrojs/sitemap": "latest",
    "@tailwindcss/vite": "latest",
    "astro": "latest",
    "tailwindcss": "latest",
    "zod": "latest"
  },
  "devDependencies": {
    "@astrojs/check": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

Run:

```powershell
npm install
```

Expected: npm creates `package-lock.json` and installs dependencies without errors.

- [ ] **Step 3: Configure Astro, sitemap, Tailwind, and TypeScript**

Create `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

Create `src/env.d.ts`:

```ts
/// <reference types="astro/client" />
```

Create `src/styles/global.css`:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --page: #f7f9fc;
  --page-accent: #eaf1ff;
  --panel: rgba(255, 255, 255, 0.86);
  --border: #e4e9f1;
  --ink: #171d2a;
  --muted: #667286;
  --accent: #6f8fca;
  --accent-soft: #eef4ff;
  --pink-soft: #f3e4ec;
}

.dark {
  --page: #121722;
  --page-accent: #1c2739;
  --panel: rgba(23, 30, 43, 0.88);
  --border: #2a3446;
  --ink: #edf2fa;
  --muted: #adb7c8;
  --accent: #9cb8ed;
  --accent-soft: #202f48;
  --pink-soft: #302633;
}

@layer base {
  html { scroll-behavior: smooth; }
  body {
    min-height: 100vh;
    background:
      radial-gradient(circle at 90% 6%, var(--pink-soft), transparent 24rem),
      radial-gradient(circle at 8% 18%, var(--page-accent), transparent 26rem),
      var(--page);
    color: var(--ink);
    font-family: Inter, "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif;
  }
  a { color: inherit; text-decoration: none; }
}

@layer components {
  .site-panel {
    border: 1px solid var(--border);
    border-radius: 1.25rem;
    background: var(--panel);
    box-shadow: 0 14px 42px rgb(31 44 68 / 0.045);
  }
  .muted { color: var(--muted); }
  .accent-link { color: var(--accent); }
  .prose-reading {
    color: var(--ink);
    line-height: 1.85;
  }
  .prose-reading :where(h2, h3) {
    margin-block: 2rem 0.8rem;
    font-weight: 650;
  }
  .prose-reading :where(p, ul, ol, pre) { margin-block: 1rem; }
  .prose-reading pre {
    overflow-x: auto;
    border-radius: 0.9rem;
    padding: 1rem;
  }
}
```

- [ ] **Step 4: Run configuration checks**

Run:

```powershell
npm run check
```

Expected: Astro TypeScript diagnostics complete with zero errors after source pages are added in subsequent tasks; at this initial point it may report no pages, but no configuration parse error.

- [ ] **Step 5: Commit baseline project setup**

```powershell
git add .gitignore package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts src/styles/global.css docs
git commit -m "chore: initialize astro personal site"
```

## Task 2: Add Validated Content And Personal Data Models

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/hello-world.md`
- Create: `src/data/site.ts`
- Create: `src/data/experiences.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/links.ts`

- [ ] **Step 1: Define the validated Markdown blog collection**

Create `src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string().min(1)).min(1),
    draft: z.boolean().default(false),
    pinned: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create a first publishable Markdown entry**

Create `src/content/blog/hello-world.md`:

```md
---
title: "开始搭建属于自己的个人网站"
description: "记录这个内容型个人站的设计方向与搭建起点。"
publishedAt: 2026-05-24
tags: ["Web", "记录"]
pinned: true
---

欢迎来到我的个人网站。这里将记录我的学习过程、实践项目，以及值得慢慢整理下来的思考。

## 为什么建站

我希望它不仅是一张名片，也是一份持续成长的档案。
```

- [ ] **Step 3: Implement runtime-validated site configuration**

Create `src/data/site.ts`:

```ts
import { z } from 'zod';

const socialSchema = z.object({
  label: z.string(),
  href: z.string().url().or(z.string().email().transform((email) => `mailto:${email}`)),
});

const siteSchema = z.object({
  title: z.string(),
  name: z.string(),
  description: z.string(),
  tagline: z.string(),
  location: z.string(),
  avatar: z.string(),
  email: z.string().email(),
  socials: z.array(socialSchema),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
});

export const site = siteSchema.parse({
  title: 'Heaven.',
  name: '你的昵称',
  description: '学生与技术学习者的个人网站，记录学习、项目与文章。',
  tagline: '学生 / 技术学习者 - 在代码与热爱之间成长',
  location: '中国',
  avatar: '/avatar-placeholder.svg',
  email: 'hello@example.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Email', href: 'hello@example.com' },
  ],
  nav: [
    { label: '首页', href: '/' },
    { label: '博客', href: '/blog' },
    { label: '项目', href: '/projects' },
    { label: '友链', href: '/links' },
    { label: '关于', href: '/about' },
  ],
});
```

- [ ] **Step 4: Add validated experience, project, and link catalogs**

Create `src/data/experiences.ts`:

```ts
import { z } from 'zod';

const experienceSchema = z.array(z.object({
  institution: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string().optional(),
  href: z.string().url().optional(),
}));

export const experiences = experienceSchema.parse([
  {
    institution: '你的学校',
    role: '专业 / 本科生',
    period: '2024 - Present',
    description: '在这里填写自己的专业方向和正在探索的领域。',
  },
  {
    institution: '正在学习',
    role: 'Web Development',
    period: '持续更新中',
  },
]);
```

Create `src/data/projects.ts`:

```ts
import { z } from 'zod';

const projectSchema = z.array(z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()).min(1),
  repository: z.string().url().optional(),
  demo: z.string().url().optional(),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
}));

export type Project = z.infer<typeof projectSchema>[number];

export const projects = projectSchema.parse([
  {
    title: '个人博客网站',
    description: '用于分享学习记录与作品的静态个人站。',
    technologies: ['Astro', 'TypeScript', 'Markdown'],
    featured: true,
  },
  {
    title: '课程实践项目',
    description: '展示一项有代表性的学习成果。',
    technologies: ['TypeScript'],
    featured: true,
  },
]);
```

Create `src/data/links.ts`:

```ts
import { z } from 'zod';

const friendLinkSchema = z.array(z.object({
  name: z.string(),
  href: z.string().url(),
  avatar: z.string().optional(),
  description: z.string(),
}));

export const friendLinks = friendLinkSchema.parse([
  {
    name: "Axi's Blog",
    href: 'https://axi404.top/',
    description: '清爽且内容丰富的个人博客。',
  },
]);
```

- [ ] **Step 5: Validate the content definitions**

Run:

```powershell
npm run check
```

Expected: data and collection schemas type-check without errors.

- [ ] **Step 6: Commit content foundations**

```powershell
git add src/content.config.ts src/content src/data
git commit -m "feat: add validated personal site content models"
```

## Task 3: Build Content Utilities With Tests

**Files:**
- Create: `src/lib/content.ts`
- Create: `src/lib/content.test.ts`

- [ ] **Step 1: Write failing tests for published article ordering and tag extraction**

Create `src/lib/content.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { filterPublishedPosts, getAllTags, sortPosts } from './content';

const posts = [
  { id: 'older', data: { title: 'Older', publishedAt: new Date('2026-04-01'), draft: false, pinned: false, tags: ['Web'] } },
  { id: 'draft', data: { title: 'Draft', publishedAt: new Date('2026-06-01'), draft: true, pinned: false, tags: ['Secret'] } },
  { id: 'pinned', data: { title: 'Pinned', publishedAt: new Date('2026-03-01'), draft: false, pinned: true, tags: ['Web', '记录'] } },
];

describe('blog content helpers', () => {
  it('omits drafts and places pinned entries before recent entries', () => {
    expect(sortPosts(filterPublishedPosts(posts)).map((post) => post.id)).toEqual(['pinned', 'older']);
  });

  it('returns sorted unique tags from public posts', () => {
    expect(getAllTags(filterPublishedPosts(posts))).toEqual(['Web', '记录']);
  });
});
```

- [ ] **Step 2: Run tests to observe the missing module failure**

Run:

```powershell
npm test -- src/lib/content.test.ts
```

Expected: FAIL because `./content` does not exist.

- [ ] **Step 3: Implement typed collection helper functions**

Create `src/lib/content.ts`:

```ts
type PostLike = {
  id: string;
  data: {
    title: string;
    publishedAt: Date;
    tags: string[];
    draft?: boolean;
    pinned?: boolean;
  };
};

export function filterPublishedPosts<T extends PostLike>(posts: T[]): T[] {
  return posts.filter((post) => !post.data.draft);
}

export function sortPosts<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort((left, right) => {
    if (Boolean(left.data.pinned) !== Boolean(right.data.pinned)) {
      return left.data.pinned ? -1 : 1;
    }
    return right.data.publishedAt.getTime() - left.data.publishedAt.getTime();
  });
}

export function getAllTags<T extends PostLike>(posts: T[]): string[] {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
}
```

- [ ] **Step 4: Run unit tests**

Run:

```powershell
npm test -- src/lib/content.test.ts
```

Expected: PASS with 2 passing tests.

- [ ] **Step 5: Commit tested content utilities**

```powershell
git add src/lib
git commit -m "test: add blog collection utility behavior"
```

## Task 4: Implement Shared Layout, Navigation, And Theme Switching

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/ThemeScript.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `public/avatar-placeholder.svg`
- Create: `public/favicon.svg`

- [ ] **Step 1: Add local placeholder and favicon assets**

Create `public/avatar-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#e5efff"/><stop offset="1" stop-color="#f4e2eb"/></linearGradient></defs>
  <rect width="160" height="160" rx="28" fill="url(#g)"/>
  <circle cx="80" cy="61" r="25" fill="#aebdd9"/>
  <path d="M36 138c7-29 26-43 44-43s37 14 44 43" fill="#aebdd9"/>
</svg>
```

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#edf3ff"/>
  <path fill="#7290ca" d="M32 10l6.7 14.6L54 26.4 42.5 36.9 45.6 52 32 44.2 18.4 52l3.1-15.1L10 26.4l15.3-1.8z"/>
</svg>
```

- [ ] **Step 2: Add early theme initialization and toggle logic**

Create `src/components/ThemeScript.astro`:

```astro
<script is:inline>
  const storageKey = 'heaven-theme';
  const stored = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', stored ? stored === 'dark' : prefersDark);

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(storageKey, dark ? 'dark' : 'light');
    button.setAttribute('aria-label', dark ? '切换到浅色主题' : '切换到深色主题');
  });
</script>
```

- [ ] **Step 3: Implement accessible desktop/mobile navigation**

Create `src/components/Header.astro`:

```astro
---
import { site } from '../data/site';
const currentPath = Astro.url.pathname;
---
<header class="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
  <a class="text-xl font-bold tracking-tight" href="/">{site.title}</a>
  <nav aria-label="主导航" class="hidden items-center gap-1 md:flex">
    {site.nav.map((item) => (
      <a
        href={item.href}
        aria-current={currentPath === item.href ? 'page' : undefined}
        class:list={['rounded-xl px-4 py-2 muted', currentPath === item.href && 'site-panel !text-[var(--ink)]']}
      >{item.label}</a>
    ))}
    <button class="ml-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2" type="button" data-theme-toggle aria-label="切换主题">◐</button>
  </nav>
  <details class="relative md:hidden">
    <summary class="cursor-pointer list-none rounded-xl border border-[var(--border)] px-3 py-2" aria-label="打开菜单">☰</summary>
    <nav aria-label="移动端导航" class="site-panel absolute right-0 top-12 z-10 flex min-w-36 flex-col p-2">
      {site.nav.map((item) => <a class="rounded-lg px-4 py-2" href={item.href}>{item.label}</a>)}
      <button class="rounded-lg px-4 py-2 text-left" type="button" data-theme-toggle>切换主题</button>
    </nav>
  </details>
</header>
```

- [ ] **Step 4: Implement footer and SEO document shell**

Create `src/components/Footer.astro`:

```astro
---
import { site } from '../data/site';
---
<footer class="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-[var(--border)] px-5 py-8 text-sm muted md:flex-row md:justify-between">
  <p>© {new Date().getFullYear()} {site.name}. Some rights reserved.</p>
  <div class="flex gap-4">
    {site.socials.map((social) => <a class="accent-link" href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}
    <a class="accent-link" href="/rss.xml">RSS</a>
  </div>
</footer>
```

Create `src/layouts/BaseLayout.astro`:

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import ThemeScript from '../components/ThemeScript.astro';
import { site } from '../data/site';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const { title = site.title, description = site.description } = Astro.props;
const pageTitle = title === site.title ? title : `${title} | ${site.title}`;
const canonical = new URL(Astro.url.pathname, Astro.site);
---
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{pageTitle}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <link rel="canonical" href={canonical} />
    <link rel="icon" href="/favicon.svg" />
    <link rel="alternate" type="application/rss+xml" href="/rss.xml" title={site.title} />
    <ThemeScript />
  </head>
  <body>
    <Header />
    <slot />
    <Footer />
  </body>
</html>
```

- [ ] **Step 5: Check shared layout types**

Run:

```powershell
npm run check
```

Expected: zero type errors for shared components and layout.

- [ ] **Step 6: Commit shell and theme**

```powershell
git add src/components src/layouts public
git commit -m "feat: build themed site shell and navigation"
```

## Task 5: Build Homepage Components And Page

**Files:**
- Create: `src/components/ProfileHero.astro`
- Create: `src/components/ExperienceCard.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/PostCard.astro`
- Create: `src/components/EmptyState.astro`
- Create: `src/pages/index.astro`

- [ ] **Step 1: Implement reusable home-facing cards**

Create `src/components/ProfileHero.astro`:

```astro
---
import { site } from '../data/site';
---
<section class="flex flex-col gap-6 sm:flex-row sm:items-center">
  <img class="h-28 w-28 rounded-2xl border border-[var(--border)] object-cover" src={site.avatar} alt={`${site.name} 的头像`} onerror="this.src='/avatar-placeholder.svg'" />
  <div>
    <h1 class="text-3xl font-bold tracking-tight">{site.name}</h1>
    <p class="mt-1 muted">{site.tagline}</p>
    <div class="mt-4 flex flex-wrap gap-2">
      <span class="rounded-xl border border-[var(--border)] px-3 py-1.5 text-sm">{site.location}</span>
      {site.socials.map((social) => <a class="rounded-xl border border-[var(--border)] px-3 py-1.5 text-sm" href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}
    </div>
  </div>
</section>
```

Create `src/components/ExperienceCard.astro`:

```astro
---
import type { experiences } from '../data/experiences';
type Experience = (typeof experiences)[number];
const { experience } = Astro.props as { experience: Experience };
---
<article class="rounded-2xl border border-[var(--border)] bg-white/50 p-4 dark:bg-transparent">
  <h3 class="font-semibold">
    {experience.href ? <a class="hover:text-[var(--accent)]" href={experience.href} target="_blank" rel="noreferrer">{experience.institution}</a> : experience.institution}
  </h3>
  <p class="text-sm muted">{experience.role}</p>
  <p class="mt-1 text-xs muted">{experience.period}</p>
  {experience.description && <p class="mt-3 text-sm muted">{experience.description}</p>}
</article>
```

Create `src/components/ProjectCard.astro`:

```astro
---
import type { Project } from '../data/projects';
const { project } = Astro.props as { project: Project };
---
<article class="site-panel flex h-full flex-col p-5">
  {project.cover && <img class="mb-4 aspect-video rounded-xl object-cover" src={project.cover} alt="" onerror="this.src='/avatar-placeholder.svg'" />}
  <h3 class="text-lg font-semibold">{project.title}</h3>
  <p class="mt-2 grow text-sm muted">{project.description}</p>
  <div class="mt-4 flex flex-wrap gap-2">
    {project.technologies.map((technology) => <span class="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs">{technology}</span>)}
  </div>
  {(project.repository || project.demo) && (
    <div class="mt-5 flex gap-4 text-sm accent-link">
      {project.repository && <a href={project.repository} target="_blank" rel="noreferrer">源码</a>}
      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">预览</a>}
    </div>
  )}
</article>
```

Create `src/components/PostCard.astro`:

```astro
---
import type { CollectionEntry } from 'astro:content';
const { post } = Astro.props as { post: CollectionEntry<'blog'> };
const date = post.data.publishedAt.toLocaleDateString('zh-CN');
---
<article class="border-b border-dashed border-[var(--border)] py-4 last:border-none">
  <a class="block font-semibold hover:text-[var(--accent)]" href={`/blog/${post.id}/`}>{post.data.title}</a>
  <p class="mt-1 line-clamp-2 text-sm muted">{post.data.description}</p>
  <p class="mt-2 text-xs muted">{date} · {post.data.tags.join(' / ')}</p>
</article>
```

Create `src/components/EmptyState.astro`:

```astro
---
const { message } = Astro.props as { message: string };
---
<div class="site-panel px-6 py-10 text-center muted">{message}</div>
```

- [ ] **Step 2: Assemble the homepage from content sources**

Create `src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProfileHero from '../components/ProfileHero.astro';
import ExperienceCard from '../components/ExperienceCard.astro';
import ProjectCard from '../components/ProjectCard.astro';
import PostCard from '../components/PostCard.astro';
import EmptyState from '../components/EmptyState.astro';
import { experiences } from '../data/experiences';
import { projects } from '../data/projects';
import { filterPublishedPosts, sortPosts } from '../lib/content';

const posts = sortPosts(filterPublishedPosts(await getCollection('blog'))).slice(0, 4);
const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
---
<BaseLayout>
  <main class="mx-auto grid max-w-6xl gap-6 px-5 pb-8 md:grid-cols-[minmax(0,1fr)_21rem]">
    <section class="site-panel p-6 sm:p-8">
      <ProfileHero />
      <section class="mt-10">
        <h2 class="text-xl font-semibold">关于我</h2>
        <p class="mt-3 leading-7 muted">你好，我是一名正在探索计算机技术的学生。这里记录我的学习过程、实践项目，以及一些认真写下的思考。</p>
      </section>
      <section class="mt-9">
        <h2 class="text-xl font-semibold">学习经历</h2>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          {experiences.map((experience) => <ExperienceCard experience={experience} />)}
        </div>
      </section>
      <section class="mt-9">
        <div class="flex items-center justify-between"><h2 class="text-xl font-semibold">精选项目</h2><a class="text-sm accent-link" href="/projects">全部项目 →</a></div>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          {featuredProjects.map((project) => <ProjectCard project={project} />)}
        </div>
      </section>
    </section>
    <aside class="site-panel h-fit p-6">
      <div class="flex items-center justify-between"><h2 class="text-xl font-semibold">最新文章</h2><a class="text-sm accent-link" href="/blog">全部 →</a></div>
      <div class="mt-3">
        {posts.length ? posts.map((post) => <PostCard post={post} />) : <EmptyState message="还没有公开文章。" />}
      </div>
    </aside>
  </main>
</BaseLayout>
```

- [ ] **Step 3: Build the homepage**

Run:

```powershell
npm run build
```

Expected: Astro builds `/index.html` successfully.

- [ ] **Step 4: Commit homepage implementation**

```powershell
git add src/components src/pages/index.astro
git commit -m "feat: implement personal homepage sections"
```

## Task 6: Implement Blog Listing, Search, Tags, And Reading Route

**Files:**
- Create: `src/layouts/PostLayout.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`

- [ ] **Step 1: Implement blog list with front-end tag and text filtering**

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';
import EmptyState from '../../components/EmptyState.astro';
import { filterPublishedPosts, getAllTags, sortPosts } from '../../lib/content';

const posts = sortPosts(filterPublishedPosts(await getCollection('blog')));
const tags = getAllTags(posts);
---
<BaseLayout title="博客" description="学习记录与技术文章">
  <main class="mx-auto max-w-4xl px-5 pb-12">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">博客</h1>
      <p class="mt-2 muted">记录学习过程、项目实践与日常思考。</p>
    </header>
    <section class="site-panel mb-6 flex flex-col gap-4 p-4">
      <label class="sr-only" for="post-search">搜索文章</label>
      <input id="post-search" data-post-search class="rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 outline-none" placeholder="搜索标题或摘要" />
      <div class="flex flex-wrap gap-2" aria-label="标签筛选">
        <button class="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm" data-tag="">全部</button>
        {tags.map((tag) => <button class="rounded-full border border-[var(--border)] px-4 py-2 text-sm" data-tag={tag}>{tag}</button>)}
      </div>
    </section>
    <section class="site-panel px-6" data-post-list>
      {posts.map((post) => (
        <div data-post data-title={post.data.title.toLowerCase()} data-description={post.data.description.toLowerCase()} data-tags={post.data.tags.join('|')}>
          <PostCard post={post} />
        </div>
      ))}
      {!posts.length && <EmptyState message="还没有公开文章。" />}
      <p class="hidden py-10 text-center muted" data-filter-empty>没有匹配的文章。</p>
    </section>
  </main>
</BaseLayout>
<script>
  let activeTag = '';
  const search = document.querySelector<HTMLInputElement>('[data-post-search]');
  const posts = [...document.querySelectorAll<HTMLElement>('[data-post]')];
  const empty = document.querySelector<HTMLElement>('[data-filter-empty]');
  const apply = () => {
    const query = search?.value.trim().toLowerCase() ?? '';
    let count = 0;
    posts.forEach((post) => {
      const text = `${post.dataset.title} ${post.dataset.description}`;
      const visible = (!query || text.includes(query)) && (!activeTag || post.dataset.tags?.split('|').includes(activeTag));
      post.classList.toggle('hidden', !visible);
      if (visible) count += 1;
    });
    empty?.classList.toggle('hidden', count !== 0 || posts.length === 0);
  };
  search?.addEventListener('input', apply);
  document.querySelectorAll<HTMLButtonElement>('[data-tag]').forEach((button) => button.addEventListener('click', () => {
    activeTag = button.dataset.tag ?? '';
    apply();
  }));
</script>
```

- [ ] **Step 2: Implement article reading layout**

Create `src/layouts/PostLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import type { CollectionEntry } from 'astro:content';
const { post } = Astro.props as { post: CollectionEntry<'blog'> };
---
<BaseLayout title={post.data.title} description={post.data.description}>
  <main class="mx-auto max-w-3xl px-5 pb-16">
    <article class="site-panel p-6 sm:p-10">
      <header class="mb-9 border-b border-[var(--border)] pb-7">
        <h1 class="text-3xl font-bold tracking-tight">{post.data.title}</h1>
        <p class="mt-3 muted">{post.data.description}</p>
        <p class="mt-4 text-sm muted">
          {post.data.publishedAt.toLocaleDateString('zh-CN')} · {post.data.tags.join(' / ')}
        </p>
      </header>
      <div class="prose-reading"><slot /></div>
    </article>
  </main>
</BaseLayout>
```

- [ ] **Step 3: Generate static article pages and adjacent navigation**

Create `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';
import { filterPublishedPosts, sortPosts } from '../../lib/content';

export async function getStaticPaths() {
  const posts = sortPosts(filterPublishedPosts(await getCollection('blog')));
  return posts.map((post, index) => ({
    params: { slug: post.id },
    props: { post, previous: posts[index + 1], next: posts[index - 1] },
  }));
}

const { post, previous, next } = Astro.props;
const { Content, headings } = await render(post);
---
<PostLayout post={post}>
  {headings.length > 0 && (
    <nav class="mb-8 rounded-xl bg-[var(--accent-soft)] p-4" aria-label="文章目录">
      <p class="mb-2 font-semibold">目录</p>
      <ul class="space-y-1 text-sm">
        {headings.filter((heading) => heading.depth <= 3).map((heading) => <li><a class="accent-link" href={`#${heading.slug}`}>{heading.text}</a></li>)}
      </ul>
    </nav>
  )}
  <Content />
  <nav class="mt-12 flex justify-between border-t border-[var(--border)] pt-5 text-sm">
    <span>{previous && <a class="accent-link" href={`/blog/${previous.id}/`}>← {previous.data.title}</a>}</span>
    <span>{next && <a class="accent-link" href={`/blog/${next.id}/`}>{next.data.title} →</a>}</span>
  </nav>
</PostLayout>
```

- [ ] **Step 4: Verify generated blog routes and existing helper tests**

Run:

```powershell
npm test
npm run build
```

Expected: unit tests pass and output includes `/blog/index.html` plus `/blog/hello-world/index.html`.

- [ ] **Step 5: Commit the blog reading workflow**

```powershell
git add src/layouts/PostLayout.astro src/pages/blog
git commit -m "feat: add searchable markdown blog pages"
```

## Task 7: Implement Projects, Friend Links, And About Pages

**Files:**
- Create: `src/components/FriendCard.astro`
- Create: `src/pages/projects.astro`
- Create: `src/pages/links.astro`
- Create: `src/pages/about.astro`

- [ ] **Step 1: Build the friend link card with missing-image fallback**

Create `src/components/FriendCard.astro`:

```astro
---
import type { friendLinks } from '../data/links';
type FriendLink = (typeof friendLinks)[number];
const { friend } = Astro.props as { friend: FriendLink };
---
<a class="site-panel flex items-center gap-4 p-5 transition hover:border-[var(--accent)]" href={friend.href} target="_blank" rel="noreferrer">
  <img class="h-14 w-14 rounded-xl object-cover" src={friend.avatar ?? '/avatar-placeholder.svg'} alt={`${friend.name} 头像`} onerror="this.src='/avatar-placeholder.svg'" />
  <div>
    <h2 class="font-semibold">{friend.name}</h2>
    <p class="mt-1 text-sm muted">{friend.description}</p>
  </div>
</a>
```

- [ ] **Step 2: Implement complete projects page**

Create `src/pages/projects.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import EmptyState from '../components/EmptyState.astro';
import { projects } from '../data/projects';
---
<BaseLayout title="项目" description="学习与实践项目">
  <main class="mx-auto max-w-6xl px-5 pb-14">
    <h1 class="text-3xl font-bold">项目</h1>
    <p class="mt-2 muted">一些代表我的学习过程和实践方向的作品。</p>
    <section class="mt-8 grid gap-4 md:grid-cols-2">
      {projects.length ? projects.map((project) => <ProjectCard project={project} />) : <EmptyState message="项目内容正在整理中。" />}
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 3: Implement friend links page**

Create `src/pages/links.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import FriendCard from '../components/FriendCard.astro';
import EmptyState from '../components/EmptyState.astro';
import { friendLinks } from '../data/links';
---
<BaseLayout title="友链" description="友站与值得拜访的个人空间">
  <main class="mx-auto max-w-4xl px-5 pb-14">
    <h1 class="text-3xl font-bold">友链</h1>
    <p class="mt-2 muted">遇见认真记录生活与技术的人们。</p>
    <section class="mt-8 grid gap-4 sm:grid-cols-2">
      {friendLinks.length ? friendLinks.map((friend) => <FriendCard friend={friend} />) : <EmptyState message="暂时还没有友链。" />}
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 4: Implement extended about page**

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProfileHero from '../components/ProfileHero.astro';
import ExperienceCard from '../components/ExperienceCard.astro';
import { experiences } from '../data/experiences';
---
<BaseLayout title="关于" description="个人简介、学习方向与联系方式">
  <main class="mx-auto max-w-4xl px-5 pb-14">
    <section class="site-panel p-6 sm:p-9">
      <ProfileHero />
      <div class="mt-10 space-y-4 leading-8 muted">
        <h2 class="text-xl font-semibold text-[var(--ink)]">关于我</h2>
        <p>我是一名正在学习计算机技术的学生，关注 Web 开发与用项目解决实际问题的过程。</p>
        <p>这个网站会持续收录我的技术笔记、阶段总结与项目实践，也保留一些属于个人兴趣的表达。</p>
      </div>
      <h2 class="mt-10 text-xl font-semibold">经历</h2>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        {experiences.map((experience) => <ExperienceCard experience={experience} />)}
      </div>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 5: Verify all informational routes build**

Run:

```powershell
npm run build
```

Expected: output includes `/projects/index.html`, `/links/index.html`, and `/about/index.html`.

- [ ] **Step 6: Commit informational pages**

```powershell
git add src/components/FriendCard.astro src/pages/projects.astro src/pages/links.astro src/pages/about.astro
git commit -m "feat: add project links and about pages"
```

## Task 8: Add RSS, Metadata Completion, And Author Documentation

**Files:**
- Create: `src/pages/rss.xml.ts`
- Create: `README.md`

- [ ] **Step 1: Generate RSS from public posts**

Create `src/pages/rss.xml.ts`:

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { filterPublishedPosts, sortPosts } from '../lib/content';

export async function GET(context: { site: URL | undefined }) {
  const posts = sortPosts(filterPublishedPosts(await getCollection('blog')));
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
    })),
  });
}
```

- [ ] **Step 2: Document content authoring and replacement points**

Create `README.md`:

````md
# Heaven Personal Site

一个以内容为中心的 Astro 个人网站，包含博客、项目、友链和个人介绍。

## Local Development

```sh
npm install
npm run dev
```

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
- 在 `src/data/site.ts` 替换昵称、邮箱、头像和社交链接。
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
````

- [ ] **Step 3: Verify RSS, sitemap, and full production build**

Run:

```powershell
npm test
npm run build
Get-ChildItem -Recurse dist | Select-String -Pattern 'rss.xml|sitemap'
```

Expected: tests pass, build passes, and generated output contains RSS and sitemap artifacts.

- [ ] **Step 4: Commit publishing surfaces and authoring guide**

```powershell
git add src/pages/rss.xml.ts README.md
git commit -m "feat: add rss sitemap and authoring documentation"
```

## Task 9: Perform Browser Verification And Accessibility Gut Check

**Files:**
- Modify only files revealed to need correction by verification.

- [ ] **Step 1: Start a local preview of the built site**

Run:

```powershell
npm run build
npm run preview -- --host localhost
```

Expected: Astro reports a local preview URL.

- [ ] **Step 2: Verify desktop user flows in the in-app browser**

Open the preview URL and validate:

```text
Home: hero, experiences, featured projects and latest post are visible.
Navigation: 首页 / 博客 / 项目 / 友链 / 关于 each loads its correct route.
Theme: switching to dark mode updates appearance and remains selected after reload.
Blog: text search hides nonmatching posts; selecting a tag filters the list.
Article: opening the sample post shows headings, readable Markdown, and article navigation region.
Links: the Axi friend card renders and opens as an external link.
```

Expected: every visible flow behaves as listed; capture a desktop screenshot of the homepage and blog page for the completion report.

- [ ] **Step 3: Verify responsive layout**

Resize the browser viewport to a phone-sized layout and validate:

```text
Navigation is available through the mobile menu.
Homepage panels become a single readable column.
Project and friend cards do not overflow.
Article text and code blocks remain horizontally usable.
```

Expected: no horizontal page overflow and all navigation remains reachable; capture a mobile homepage screenshot.

- [ ] **Step 4: Run basic accessibility inspection**

Check in browser snapshots and keyboard navigation that:

```text
There is exactly one page-level h1 on each route.
Navigation has an accessible label.
Theme toggle and mobile menu expose accessible names.
Links and controls are keyboard reachable with a visible focus indicator.
Light and dark text are readable against their panels.
```

Expected: no blocking semantic, keyboard, or contrast issue.

- [ ] **Step 5: Re-run automated verification after any corrections**

Run:

```powershell
npm test
npm run build
git status --short
```

Expected: tests and build pass; `git status` contains only deliberate fixes or is clean after committing them.

- [ ] **Step 6: Commit verification fixes, when required**

```powershell
git add src public README.md
git commit -m "fix: polish responsive and accessible site behavior"
```

Only create this commit when verification required source changes; otherwise record that no correction commit was needed.
