import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const chineseAbout = readFileSync(new URL('../pages/about.astro', import.meta.url), 'utf8');
const englishAbout = readFileSync(new URL('../pages/en/about.astro', import.meta.url), 'utf8');
const componentPath = new URL('../components/SiteInformation.astro', import.meta.url);
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

describe('localized About site information section', () => {
  it('mounts the shared component with Chinese labels', () => {
    expect(chineseAbout).toContain("import SiteInformation from '../components/SiteInformation.astro';");
    expect(chineseAbout).toContain('title="站点信息"');
    expect(chineseAbout).toContain('distributionTitle="网页分发"');
    expect(chineseAbout).toContain('copyrightTitle="版权"');
    expect(chineseAbout).toContain('themeTitle="主题"');
  });

  it('mounts the shared component with English labels', () => {
    expect(englishAbout).toContain("import SiteInformation from '../../components/SiteInformation.astro';");
    expect(englishAbout).toContain('title="Site Information"');
    expect(englishAbout).toContain('distributionTitle="Distribution"');
    expect(englishAbout).toContain('copyrightTitle="Copyright"');
    expect(englishAbout).toContain('themeTitle="Theme"');
  });

  it('renders the deployments and linked attribution through the shared component', () => {
    const component = readFileSync(componentPath, 'utf8');
    expect(component).toContain('https://www.dearheaven.cn/');
    expect(component).toContain('https://cloudflare.dearheaven.cn/');
    expect(component).toContain('https://creativecommons.org/licenses/by-nc-sa/4.0/');
    expect(component).toContain('https://astro.build/');
    expect(component).toContain('https://axi404.top/');
  });

  it('provides responsive presentation hooks for destination cards', () => {
    expect(styles).toContain('.site-information');
    expect(styles).toContain('.site-information__destinations');
    expect(styles).toContain('.site-information__destination');
    expect(styles).toContain('grid-template-columns: repeat(2, minmax(0, 1fr));');
  });
});
