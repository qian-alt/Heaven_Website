import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const layout = readFileSync(new URL('../layouts/PostLayout.astro', import.meta.url), 'utf8');
const postRoute = readFileSync(new URL('../pages/blog/[slug].astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('article reading sidebar layout', () => {
  it('provides a wide article shell with a dedicated toc sidebar slot', () => {
    expect(layout).toContain('post-reading-shell');
    expect(layout).toContain('post-reading__article');
    expect(layout).toContain('post-reading__sidebar');
    expect(layout).toContain('<slot name="toc" />');
  });

  it('renders generated headings into the sidebar slot', () => {
    expect(postRoute).toContain('slot="toc"');
    expect(postRoute).toContain('post-toc');
    expect(postRoute).toContain('tableOfContents.map');
  });

  it('keeps the toc sticky on desktop and inline on small screens', () => {
    expect(styles).toContain('.post-reading-shell');
    expect(styles).toContain('.post-reading__sidebar');
    expect(styles).toContain('position: sticky;');
    expect(styles).toContain('.post-toc');
    expect(styles).toContain('@media (max-width: 1023px)');
  });
});
