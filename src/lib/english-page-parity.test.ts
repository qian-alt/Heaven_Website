import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { englishProfile } from '../data/site.en';

const englishHome = readFileSync(new URL('../pages/en/index.astro', import.meta.url), 'utf8');
const englishAbout = readFileSync(new URL('../pages/en/about.astro', import.meta.url), 'utf8');
const hero = readFileSync(new URL('../components/ProfileHero.astro', import.meta.url), 'utf8');

describe('English page parity', () => {
  it('translates the current concise Chinese profile content', () => {
    expect(englishProfile.role).toBe('Student, Class of 2024');
    expect(englishProfile.intro).toBe(
      'Undergraduate in Cyberspace Security at Jiangxi University of Finance and Economics.',
    );
    expect(englishProfile.about).toEqual([
      'Student, Class of 2024',
      'Undergraduate in Cyberspace Security at Jiangxi University of Finance and Economics.',
    ]);
    expect(englishProfile.avatarAlt).toBe("Heaven's avatar");
  });

  it('renders localized home content through shared visual components', () => {
    expect(englishHome).toContain("import ProfileHero from '../../components/ProfileHero.astro';");
    expect(englishHome).toContain("import ExperienceCard from '../../components/ExperienceCard.astro';");
    expect(englishHome).toContain("import ProjectCard from '../../components/ProjectCard.astro';");
    expect(englishHome).toContain('<ProfileHero profile={englishProfile} />');
    expect(englishHome).toContain('<ExperienceCard experience={experience} />');
    expect(englishHome).toContain('<ProjectCard project={project} />');
  });

  it('renders the localized about page with the shared hero and experience card', () => {
    expect(englishAbout).toContain("import ProfileHero from '../../components/ProfileHero.astro';");
    expect(englishAbout).toContain("import ExperienceCard from '../../components/ExperienceCard.astro';");
    expect(englishAbout).toContain('<ProfileHero profile={englishProfile} />');
    expect(englishAbout).toContain('<ExperienceCard experience={experience} />');
  });

  it('allows the shared hero to receive translated profile data', () => {
    expect(hero).toContain('profile?: Profile');
    expect(hero).toContain('const { profile = site }');
    expect(hero).toContain("profile.avatarAlt ?? `${profile.name} 的头像`");
  });
});
