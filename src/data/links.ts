import { z } from 'zod';

const friendLinkSchema = z.array(z.object({
  name: z.string().min(1),
  href: z.url(),
  avatar: z.string().optional(),
  description: z.string().min(1),
}));

export type FriendLink = z.infer<typeof friendLinkSchema>[number];

export const friendLinks = friendLinkSchema.parse([
  // {
  //   name: "Axi's Blog",
  //   href: 'https://axi404.top/',
  //   description: '清爽且内容丰富的个人博客。',
  // },
  {
    name: '糖糖毬',
    href: 'https://tantanchugasuki.cn/',
    avatar: 'https://img.tantanchugasuki.cn/i/r/avatar',
    description: '还是柚子厨',
  },
  {
    name: '想玩电脑の秋雨样',
    href: 'https://amqyy.cn/',
    avatar: 'https://www.wpst.top/avatar/qyy.avif',
    description: '我菜炸了',
  },
  {
    name: 'piterの小窝',
    href: 'https://npiter.de',
    avatar: 'https://upload-bbs.miyoushe.com/upload/2025/01/13/363839390/3b27ef57435c87542b43e4fecdabc040_3189688091243815374.png?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,png',
    description: 'CTF, NETWORK',
  },
  {
    name: 'woodfish',
    href: 'https://www.woodfish.site/',
    avatar: 'https://pic1.imgdb.cn/item/682f3d1658cb8da5c807b704.jpg',
    description: '我喜欢你',
  },
  {
    name: '江西财经大学网络安全协会',
    href: 'https://csec.jxufe.edu.cn/',
    avatar: 'https://www.wpst.top/favicon.svg',
    description: '江西财经大学网络安全协会',
  },
  {
    name: '富贵夫斯基',
    href: 'https://www.fgfsj.top/',
    avatar: 'https://s3.bmp.ovh/2026/05/08/i1ptxaZ4.jpg',
    description: '富贵夫斯基',
  },
]);
