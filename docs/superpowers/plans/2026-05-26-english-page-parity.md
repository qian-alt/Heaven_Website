# English Page Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/en` and `/en/about` translated visual counterparts of the Chinese homepage and about page while keeping untranslated section routes unchanged.

**Architecture:** Keep localized English copy and translated card data in `src/data/site.en.ts`, but render that data through the existing shared hero, experience card, and project card components. Add an optional profile input to `ProfileHero.astro`; the existing typed card components already accept objects with the required translated fields and link data.

**Tech Stack:** Astro components, TypeScript data modules, Vitest, CSS shared by the existing site

---

### Task 1: Define English Content And Component Parity

**Files:**
- Create: `src/lib/english-page-parity.test.ts`
- Read: `src/pages/index.astro`
- Read: `src/pages/about.astro`
- Read: `src/pages/en/index.astro`
- Read: `src/pages/en/about.astro`
- Read: `src/data/site.en.ts`

- [ ] **Step 1: Write the failing parity test**

Create `src/lib/english-page-parity.test.ts`:

```ts
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
  });
});
```

- [ ] **Step 2: Run the focused test to confirm RED**

Run:

```powershell
npm.cmd test -- src/lib/english-page-parity.test.ts
```

Expected: FAIL because the concise English fields, shared component usage, and localized hero prop do not yet exist.

- [ ] **Step 3: Commit the failing test**

Run:

```powershell
git add -- src/lib/english-page-parity.test.ts
git commit -m "test: define english page parity"
```

### Task 2: Provide Concise Translated Data And A Localizable Hero

**Files:**
- Modify: `src/data/site.en.ts`
- Modify: `src/components/ProfileHero.astro`
- Test: `src/lib/english-page-parity.test.ts`

- [ ] **Step 1: Update localized English data**

Replace the English profile content in `src/data/site.en.ts` so it exposes:

```ts
import { site } from './site';

export const englishProfile = {
  title: site.title,
  name: site.name,
  description: 'Undergraduate in Cyberspace Security at Jiangxi University of Finance and Economics.',
  tagline: ' ',
  role: 'Student, Class of 2024',
  location: 'China',
  avatar: site.avatar,
  socials: site.socials,
  intro: 'Undergraduate in Cyberspace Security at Jiangxi University of Finance and Economics.',
  about: [
    'Student, Class of 2024',
    'Undergraduate in Cyberspace Security at Jiangxi University of Finance and Economics.',
  ],
  experiences: [
    {
      institution: 'Jiangxi University of Finance and Economics',
      role: 'Cyberspace Security / Undergraduate',
      period: 'Sep 2024 - Present',
    },
  ],
  projects: [
    {
      title: 'Personal Blog Website',
      description: 'A static personal site for sharing study notes and projects.',
      technologies: ['Astro', 'TypeScript', 'Markdown'],
      demo: 'https://www.dearheaven.cn/',
      repository: 'https://github.com/qian-alt/Heaven_Website',
      featured: true,
    },
    {
      title: 'Course Practice Project',
      description: 'A representative learning outcome from technical practice.',
      technologies: ['TypeScript'],
      featured: true,
    },
  ],
};
```

- [ ] **Step 2: Make the shared profile hero accept localized content**

Update `src/components/ProfileHero.astro`:

```astro
---
import { site } from '../data/site';

type Profile = Pick<typeof site, 'name' | 'tagline' | 'location' | 'avatar' | 'socials'>;

interface Props {
  profile?: Profile;
}

const { profile = site } = Astro.props;
---
<section class="flex flex-col gap-6 sm:flex-row sm:items-center">
  <img class="h-28 w-28 rounded-2xl border object-cover" src={profile.avatar} alt={`${profile.name} 的头像`} onerror="this.setAttribute('src', '/avatar-placeholder.svg')" />
  <div>
    <h1 class="text-3xl font-bold tracking-tight">{profile.name}</h1>
    <p class="mt-1 muted">{profile.tagline}</p>
    <div class="mt-4 flex flex-wrap gap-2">
      <span class="rounded-xl border bg-[var(--panel)] px-3 py-1.5 text-sm">{profile.location}</span>
      {profile.socials.map((social) => (
        <a class="rounded-xl border bg-[var(--panel)] px-3 py-1.5 text-sm" href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Run the focused test**

Run:

```powershell
npm.cmd test -- src/lib/english-page-parity.test.ts
```

Expected: translated data and hero assertions pass; page component assertions remain failing until the English pages are refactored.

### Task 3: Render English Pages Through Shared Components

**Files:**
- Modify: `src/pages/en/index.astro`
- Modify: `src/pages/en/about.astro`
- Test: `src/lib/english-page-parity.test.ts`

- [ ] **Step 1: Refactor the English homepage composition**

Use these imports in `src/pages/en/index.astro`:

```astro
import ExperienceCard from '../../components/ExperienceCard.astro';
import ProfileHero from '../../components/ProfileHero.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import { englishProfile } from '../../data/site.en';

const featuredProjects = englishProfile.projects.filter((project) => project.featured).slice(0, 4);
```

Replace its bespoke hero and card markup with the Chinese page structure, translated:

```astro
<ProfileHero profile={englishProfile} />
```

Use:

```astro
<p class="home-about__role muted">{englishProfile.role} /</p>
<p class="home-about__intro muted">{englishProfile.intro}</p>
```

Render education and projects with:

```astro
{englishProfile.experiences.map((experience) => <ExperienceCard experience={experience} />)}
{featuredProjects.map((project) => <ProjectCard project={project} />)}
```

- [ ] **Step 2: Refactor the English about composition**

Use these imports in `src/pages/en/about.astro`:

```astro
import ExperienceCard from '../../components/ExperienceCard.astro';
import ProfileHero from '../../components/ProfileHero.astro';
import StudyProgress from '../../components/StudyProgress.astro';
import { englishProfile } from '../../data/site.en';
import BaseLayout from '../../layouts/BaseLayout.astro';
```

Replace the bespoke hero section with:

```astro
<ProfileHero profile={englishProfile} />
```

Keep the existing progress component, and render localized experience cards through:

```astro
{englishProfile.experiences.map((experience) => <ExperienceCard experience={experience} />)}
```

- [ ] **Step 3: Run the focused test to confirm GREEN**

Run:

```powershell
npm.cmd test -- src/lib/english-page-parity.test.ts src/lib/home-about-layout.test.ts src/lib/about-progress-layout.test.ts
```

Expected: PASS with all localized layout assertions passing.

- [ ] **Step 4: Commit implementation**

Run:

```powershell
git add -- src/data/site.en.ts src/components/ProfileHero.astro src/pages/en/index.astro src/pages/en/about.astro
git commit -m "feat: align english profile pages"
```

### Task 4: Validate Bilingual Page Parity

**Files:**
- Verify: `src/pages/index.astro`
- Verify: `src/pages/en/index.astro`
- Verify: `src/pages/about.astro`
- Verify: `src/pages/en/about.astro`
- Verify: `src/components/ProfileHero.astro`

- [ ] **Step 1: Run full automated verification**

Run:

```powershell
npm.cmd test
$env:ASTRO_TELEMETRY_DISABLED='1'
npm.cmd run build
git diff --check
git status --short --branch
```

Expected: all tests pass, Astro reports `0 errors`, `0 warnings`, and `0 hints`, and no uncommitted source files remain.

- [ ] **Step 2: Compare homepage layouts in the browser**

Open `/` and `/en` from the production preview at desktop width and then at a phone width. Confirm:

- Hero geometry, About section alignment, education card layout, and project card layout match.
- The English personal blog project includes the same `Site` and `GitHub` action pills as the Chinese card.
- Content is translated rather than supplemented with English-only biography text.

- [ ] **Step 3: Compare about page layouts in the browser**

Open `/about` and `/en/about` at desktop and phone widths. Confirm:

- Hero, concise text block, progress bar, and education card order and spacing match.
- English text reads `Student, Class of 2024` and `Undergraduate in Cyberspace Security at Jiangxi University of Finance and Economics.`

- [ ] **Step 4: Clean verification artifacts**

Remove any screenshots or Playwright snapshot directories produced during visual comparison and stop the temporary preview service.
