import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const article = readFileSync(new URL('../content/blog/hello-world.md', import.meta.url), 'utf8');
const card = readFileSync(new URL('../components/PostCard.astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('Axi-inspired blog card visuals', () => {
  it('connects the first article to a local atmospheric cover asset', () => {
    expect(article).toContain('cover: /blog/hello-world-cover.webp');
  });

  it('keeps covered posts readable with dedicated media and fade layers', () => {
    expect(card).toContain('post-card');
    expect(card).toContain('post-card__media');
    expect(card).toContain('post-card__fade');
    expect(card).toContain('alt=""');
  });

  it('uses a quiet light canvas and suppresses decorative media on small screens', () => {
    expect(styles).toContain('--pink-soft: rgb(243 228 236 / 0.32);');
    expect(styles).toContain('--page-accent: rgb(234 241 255 / 0.4);');
    expect(styles).toContain('.post-card__media');
    expect(styles).toContain('.post-card__fade');
    expect(styles).toContain('.post-card__media {');
    expect(styles).toContain('display: none;');
  });
});
