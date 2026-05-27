import { describe, expect, it } from 'vitest';
import { friendLinks } from './links';

describe('friend links catalog', () => {
  it('includes the approved added friends with normalized destinations', () => {
    expect(friendLinks).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: '糖糖毬', href: 'https://tantanchugasuki.cn/' }),
      expect.objectContaining({ name: '想玩电脑の秋雨样', href: 'https://amqyy.cn/' }),
      expect.objectContaining({ name: 'piterの小窝', href: 'https://npiter.de' }),
      expect.objectContaining({ name: 'woodfish', href: 'https://www.woodfish.site/' }),
      expect.objectContaining({ name: '江西财经大学网络安全协会', href: 'https://csec.jxufe.edu.cn/' }),
      expect.objectContaining({ name: '富贵夫斯基', href: 'https://www.fgfsj.top/' }),
    ]));
  });

  it('normalizes the supplied avatar typo and fallback description', () => {
    expect(friendLinks.find((friend) => friend.name === '富贵夫斯基')).toEqual(
      expect.objectContaining({
        avatar: 'https://s3.bmp.ovh/2026/05/08/i1ptxaZ4.jpg',
        description: '富贵夫斯基',
      }),
    );
  });
});
