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
