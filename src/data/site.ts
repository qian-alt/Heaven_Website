import { z } from 'zod';

const socialSchema = z.object({
  label: z.string().min(1),
  href: z.url(),
});

const siteSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  tagline: z.string().min(1),
  location: z.string().min(1),
  avatar: z.string().min(1),
  socials: z.array(socialSchema),
  nav: z.array(z.object({ label: z.string().min(1), href: z.string().min(1) })),
});

export const site = siteSchema.parse({
  title: "Heaven's Blog",
  name: 'Heaven',
  description: '学生 /我是一名来自江西财经大学的网络空间安全专业的在读生，是 24 级。',
  tagline: ' ',
  location: '中国',
  avatar: '/avatar.webp',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Email', href: 'mailto:kdearheaven@gmail.com' },
  ],
  nav: [
    { label: '首页', href: '/' },
    { label: '博客', href: '/blog' },
    { label: '项目', href: '/projects' },
    { label: '友链', href: '/links' },
    { label: '关于', href: '/about' },
  ],
});
