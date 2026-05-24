import { z } from 'zod';

const friendLinkSchema = z.array(z.object({
  name: z.string().min(1),
  href: z.url(),
  avatar: z.string().optional(),
  description: z.string().min(1),
}));

export type FriendLink = z.infer<typeof friendLinkSchema>[number];

export const friendLinks = friendLinkSchema.parse([
  {
    name: "Axi's Blog",
    href: 'https://axi404.top/',
    description: '清爽且内容丰富的个人博客。',
  },
]);
