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
    expect(sanitizeTitle('  我的 / 第一篇：博客?  ')).toBe('我的-第一篇：博客');
  });

  it('creates a draft with required frontmatter and a supplied date', () => {
    const outputDirectory = createDirectory();
    const createdPath = createPost({
      title: '我的 "第一篇" 博客',
      outputDirectory,
      date: '2026-05-27',
    });
    const markdown = readFileSync(createdPath, 'utf8');

    expect(createdPath).toBe(join(outputDirectory, '我的-第一篇-博客.md'));
    expect(markdown).toContain('title: "我的 \\"第一篇\\" 博客"');
    expect(markdown).toContain('publishedAt: 2026-05-27');
    expect(markdown).toContain('tags: ["学习", "记录"]');
    expect(markdown).toContain('collection: "生活记录"');
    expect(markdown).toContain('draft: true');
    expect(markdown).toContain('cover: /blog/covers/my-first-post.webp');
  });

  it('refuses to overwrite an existing article file', () => {
    const outputDirectory = createDirectory();
    createPost({ title: '重复标题', outputDirectory, date: '2026-05-27' });

    expect(() => createPost({ title: '重复标题', outputDirectory, date: '2026-05-27' })).toThrow(
      '文章文件已存在',
    );
  });
});
