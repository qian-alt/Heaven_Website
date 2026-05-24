import { z } from 'zod';

const projectSchema = z.array(z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  technologies: z.array(z.string().min(1)).min(1),
  repository: z.url().optional(),
  demo: z.url().optional(),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
}));

export type Project = z.infer<typeof projectSchema>[number];

export const projects = projectSchema.parse([
  {
    title: '个人博客网站',
    description: '用于分享学习记录与作品的静态个人站。',
    technologies: ['Astro', 'TypeScript', 'Markdown'],
    featured: true,
  },
  {
    title: '课程实践项目',
    description: '展示一项有代表性的学习成果。',
    technologies: ['TypeScript'],
    featured: true,
  },
]);
