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
    expect(postRoute).toContain('slot="mobile-toc"');
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

  it('places a full-width mobile toc between the article header and body', () => {
    expect(layout).toContain('post-reading__mobile-sidebar');
    expect(layout).toContain('<slot name="mobile-toc" />');
    expect(layout.indexOf('post-reading__mobile-sidebar')).toBeGreaterThan(layout.indexOf('</header>'));
    expect(layout.indexOf('post-reading__mobile-sidebar')).toBeLessThan(layout.indexOf('prose-reading'));
    expect(styles).toContain('.post-reading__mobile-sidebar');
    expect(styles).toContain('display: none;');
  });
});
