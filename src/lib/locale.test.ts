import { describe, expect, it } from 'vitest';
import { getLocaleSwitch, getNavigation, isNavigationActive } from './locale';

describe('partial English navigation', () => {
  it('maps Chinese routes only to the available English pages', () => {
    expect(getLocaleSwitch('/', 'zh')).toBe('/en');
    expect(getLocaleSwitch('/about', 'zh')).toBe('/en/about');
    expect(getLocaleSwitch('/about/', 'zh')).toBe('/en/about');
    expect(getLocaleSwitch('/blog', 'zh')).toBe('/en');
    expect(getLocaleSwitch('/projects', 'zh')).toBe('/en');
  });

  it('maps English routes back to their Chinese counterparts', () => {
    expect(getLocaleSwitch('/en', 'en')).toBe('/');
    expect(getLocaleSwitch('/en/about', 'en')).toBe('/about');
    expect(getLocaleSwitch('/en/about/', 'en')).toBe('/about');
  });

  it('keeps untranslated sections linked to Chinese routes in English navigation', () => {
    expect(getNavigation('en')).toEqual([
      { label: 'Home', href: '/en' },
      { label: 'Blog', href: '/blog' },
      { label: 'Projects', href: '/projects' },
      { label: 'Links', href: '/links' },
      { label: 'About', href: '/en/about' },
    ]);
  });

  it('marks exact translated landing routes active when Astro adds trailing slashes', () => {
    expect(isNavigationActive('/en/', '/en')).toBe(true);
    expect(isNavigationActive('/en/about/', '/en')).toBe(false);
    expect(isNavigationActive('/en/about/', '/en/about')).toBe(true);
  });
});
