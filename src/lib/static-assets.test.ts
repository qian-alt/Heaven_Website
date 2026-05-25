import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('static profile assets', () => {
  it('publishes the configured avatar at its public URL', () => {
    expect(existsSync(new URL('../../public/avatar.webp', import.meta.url))).toBe(true);
  });
});
