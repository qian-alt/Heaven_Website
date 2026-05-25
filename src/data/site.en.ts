import { site } from './site';

export const englishProfile = {
  title: site.title,
  name: site.name,
  description: 'A personal website for a cybersecurity student at Jiangxi University of Finance and Economics.',
  tagline: 'Cybersecurity student / technology learner',
  location: 'China',
  avatar: site.avatar,
  socials: site.socials,
  intro: 'Hello, I am an undergraduate student exploring cybersecurity and practical software projects. This site records what I learn, build, and carefully think through.',
  about: [
    'I study cybersecurity at Jiangxi University of Finance and Economics and enjoy turning technical curiosity into small, useful projects.',
    'This site is an ongoing archive of study notes, project practice, and personal reflections.',
  ],
  experiences: [
    {
      institution: 'Jiangxi University of Finance and Economics',
      role: 'Cybersecurity / Undergraduate',
      period: 'Sep 2024 - Present',
    },
  ],
  projects: [
    {
      title: 'Personal Blog Website',
      description: 'A static personal site for sharing study notes and projects.',
      technologies: ['Astro', 'TypeScript', 'Markdown'],
    },
    {
      title: 'Course Practice Projects',
      description: 'Selected outcomes from technical coursework and independent learning.',
      technologies: ['TypeScript'],
    },
  ],
};
