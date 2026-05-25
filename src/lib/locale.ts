export type Locale = 'zh' | 'en';

type NavItem = {
  label: string;
  href: string;
};

const navigation: Record<Locale, NavItem[]> = {
  zh: [
    { label: '首页', href: '/' },
    { label: '博客', href: '/blog' },
    { label: '项目', href: '/projects' },
    { label: '友链', href: '/links' },
    { label: '关于', href: '/about' },
  ],
  en: [
    { label: 'Home', href: '/en' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Links', href: '/links' },
    { label: 'About', href: '/en/about' },
  ],
};

export function getNavigation(locale: Locale): NavItem[] {
  return navigation[locale];
}

export function getLocaleSwitch(pathname: string, locale: Locale): string {
  const path = normalizePath(pathname);

  if (locale === 'en') {
    return path === '/en/about' ? '/about' : '/';
  }

  return path === '/about' ? '/en/about' : '/en';
}

export function isNavigationActive(pathname: string, href: string): boolean {
  const path = normalizePath(pathname);

  if (href === '/' || href === '/en') return path === href;
  return path.startsWith(href);
}

function normalizePath(pathname: string): string {
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}
