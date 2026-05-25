import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const chineseAbout = readFileSync(new URL('../pages/about.astro', import.meta.url), 'utf8');
const englishAbout = readFileSync(new URL('../pages/en/about.astro', import.meta.url), 'utf8');
const progressComponentPath = new URL('../components/StudyProgress.astro', import.meta.url);

describe('localized study progress card mounting', () => {
  it('renders a shared progress component with Chinese labels', () => {
    expect(chineseAbout).toContain("import StudyProgress from '../components/StudyProgress.astro';");
    expect(chineseAbout).toContain('<StudyProgress title="大学阶段进度" subtitle="保持热爱，慢慢变强。" />');
  });

  it('renders a shared progress component with English labels', () => {
    expect(englishAbout).toContain("import StudyProgress from '../../components/StudyProgress.astro';");
    expect(englishAbout).toContain('<StudyProgress title="University Progress" subtitle="Stay curious, grow steadily." />');
  });

  it('updates progress state in the browser for statically generated pages', () => {
    expect(() => readFileSync(progressComponentPath, 'utf8')).not.toThrow();
    const progressComponent = readFileSync(progressComponentPath, 'utf8');
    expect(progressComponent).toContain('data-study-progress-value');
    expect(progressComponent).toContain('data-study-progress-bar');
    expect(progressComponent).toContain('data-study-progress-fill');
    expect(progressComponent).toContain('calculateStudyProgress()');
  });
});
