import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const header = readFileSync(new URL('../components/Header.astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('wide section header alignment', () => {
  it('marks only blog and projects as wide desktop header routes', () => {
    expect(header).toContain("currentPath === '/blog'");
    expect(header).toContain("currentPath === '/projects'");
    expect(header).toContain("currentPath === '/blog/'");
    expect(header).toContain("currentPath === '/projects/'");
    expect(header).toContain("'floating-header--wide': usesWideHeader");
  });

  it('aligns the wide desktop header while preserving a route-scoped scrolled state', () => {
    expect(styles).toContain('.floating-header--wide .floating-header__bar');
    expect(styles).toContain('.floating-header--wide[data-scrolled="true"] .floating-header__bar');
    expect(styles).toContain('max-width: 72rem;');
    expect(styles).toContain('padding-inline: 1.25rem;');
  });
});
