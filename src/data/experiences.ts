import { z } from 'zod';

const experienceSchema = z.array(z.object({
  institution: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  description: z.string().optional(),
  href: z.url().optional(),
}));

export type Experience = z.infer<typeof experienceSchema>[number];

export const experiences = experienceSchema.parse([
  {
    institution: '江西财经大学',
    role: '网络空间安全专业 / 本科生',
    period: 'Sep 2024 - Present',
    // description: '在这里填写自己的专业方向和正在探索的领域。',
  },
   {
    institution: '江西财经大学',
    role: '专业 / 本科生',
    period: 'Sep 2024 - Present',
    // description: '在这里填写自己的专业方向和正在探索的领域。',
  },
  // {
  //   institution: '正在学习',
  //   role: 'Web Development',
  //   period: '持续更新中',
  // },
]);
