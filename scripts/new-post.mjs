import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function escapeYamlString(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export function sanitizeTitle(title) {
  return title
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function createPost({ title, outputDirectory, date = formatLocalDate(new Date()) }) {
  const trimmedTitle = title.trim();
  const fileName = sanitizeTitle(trimmedTitle);

  if (!fileName) {
    throw new Error('文章标题无法生成有效文件名。');
  }

  mkdirSync(outputDirectory, { recursive: true });
  const filePath = join(outputDirectory, `${fileName}.md`);

  if (existsSync(filePath)) {
    throw new Error(`文章文件已存在: ${filePath}`);
  }

  const content = `---
title: "${escapeYamlString(trimmedTitle)}"
description: "简单介绍这篇文章会讲什么。"
publishedAt: ${date}
tags: ["学习", "记录"]
collection: "生活记录"
draft: true
pinned: false
cover: /blog/covers/my-first-post.webp
---

在这里开始写正文。
`;

  writeFileSync(filePath, content, 'utf8');
  return filePath;
}

const scriptPath = fileURLToPath(import.meta.url);
const isCommandLineRun = process.argv[1] && resolve(process.argv[1]) === scriptPath;

if (isCommandLineRun) {
  const title = process.argv.slice(2).join(' ').trim();

  if (!title) {
    console.error('请提供文章标题，例如: npm run new:post -- "我的第一篇博客"');
    process.exitCode = 1;
  } else {
    try {
      const projectRoot = resolve(dirname(scriptPath), '..');
      const createdPath = createPost({
        title,
        outputDirectory: join(projectRoot, 'src', 'content', 'blog'),
      });
      console.log(`已创建博客草稿: ${createdPath}`);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  }
}
