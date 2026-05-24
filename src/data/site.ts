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
  title: 'Heaven.',
  name: '你的昵称',
  description: '学生与技术学习者的个人网站，记录学习、项目与文章。',
  tagline: '学生 / 技术学习者 - 在代码与热爱之间成长',
  location: '中国',
  avatar: '/avatar-placeholder.svg',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Email', href: 'mailto:hello@example.com' },
  ],
  nav: [
    { label: '首页', href: '/' },
    { label: '博客', href: '/blog' },
    { label: '项目', href: '/projects' },
    { label: '友链', href: '/links' },
    { label: '关于', href: '/about' },
  ],
});
