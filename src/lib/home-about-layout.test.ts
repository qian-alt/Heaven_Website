import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const chineseHome = readFileSync(new URL('../pages/index.astro', import.meta.url), 'utf8');
const englishHome = readFileSync(new URL('../pages/en/index.astro', import.meta.url), 'utf8');

describe('homepage About section layout', () => {
  it('uses the shared Axi-style composition on both localized homepages', () => {
    expect(chineseHome).toContain('class="home-about');
    expect(englishHome).toContain('class="home-about');
  });

  it('links each About action to its localized detail page', () => {
    expect(chineseHome).toContain('href="/about">更多关于我');
    expect(englishHome).toContain('href="/en/about">More about me');
  });

  it('places localized homepage content on an open shell instead of an enclosing panel', () => {
    expect(chineseHome).toContain('<section class="home-shell');
    expect(englishHome).toContain('<section class="home-shell');
    expect(chineseHome).not.toContain('<section class="site-panel p-6 sm:p-8">');
    expect(englishHome).not.toContain('<section class="site-panel p-6 sm:p-8">');
  });
});
