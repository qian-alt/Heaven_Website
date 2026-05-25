# Friend Link Catalog Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the six approved friend sites to the validated friends catalog without changing the existing card interface.

**Architecture:** The existing `friendLinks` module remains the single validated data source for `/links`. A focused Vitest contract imports the parsed catalog and verifies the new records and normalized links, while the existing page and card consume the expanded list automatically.

**Tech Stack:** TypeScript, Zod, Astro, Vitest

---

## File Map

- Create `src/data/links.test.ts`: validate the six approved records and normalized destinations in `friendLinks`.
- Modify `src/data/links.ts`: append the user-provided entries using existing schema fields only.

### Task 1: Catalog Expansion Contract

**Files:**
- Create: `src/data/links.test.ts`
- Test: `src/data/links.test.ts`

- [ ] **Step 1: Write the failing friend catalog test**

```ts
import { describe, expect, it } from 'vitest';
import { friendLinks } from './links';

describe('friend links catalog', () => {
  it('includes the approved added friends with normalized destinations', () => {
    expect(friendLinks).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: '糖糖毬', href: 'https://tantanchugasuki.cn/' }),
      expect.objectContaining({ name: '想玩电脑の秋雨样', href: 'https://amqyy.cn/' }),
      expect.objectContaining({ name: 'piterの小窝', href: 'https://npiter.de' }),
      expect.objectContaining({ name: 'woodfish', href: 'https://www.woodfish.site/' }),
      expect.objectContaining({ name: '江西财经大学网络安全协会', href: 'https://www.wpst.top/' }),
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
```

- [ ] **Step 2: Run the focused test to observe the missing catalog entries**

Run: `npm.cmd test -- src/data/links.test.ts`

Expected: FAIL because the existing catalog contains only `Axi's Blog`.

### Task 2: Add Validated Friend Data

**Files:**
- Modify: `src/data/links.ts`
- Test: `src/data/links.test.ts`

- [ ] **Step 1: Append the six approved entries**

Add these objects after the existing Axi entry:

```ts
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
    href: 'https://www.wpst.top/',
    avatar: 'https://www.wpst.top/favicon.svg',
    description: '江西财经大学网络安全协会',
  },
  {
    name: '富贵夫斯基',
    href: 'https://www.fgfsj.top/',
    avatar: 'https://s3.bmp.ovh/2026/05/08/i1ptxaZ4.jpg',
    description: '富贵夫斯基',
  },
```

Do not add `siteshot`, because it is outside the approved compact-card model.

- [ ] **Step 2: Run the focused test to verify parsed data**

Run: `npm.cmd test -- src/data/links.test.ts`

Expected: PASS with `2 passed`.

### Task 3: Complete Verification

**Files:**
- Test: `src/data/links.test.ts`

- [ ] **Step 1: Run complete tests and static build**

Run: `npm.cmd test`

Expected: PASS for the full suite.

Run: `$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build`

Expected: Astro completes with `0 errors`, `0 warnings`, and `0 hints`, producing `/links/index.html`.

- [ ] **Step 2: Verify rendered data in static output**

Run:

```powershell
Select-String -Path dist\links\index.html -Pattern '糖糖毬|想玩电脑の秋雨样|piterの小窝|woodfish|江西财经大学网络安全协会|富贵夫斯基'
```

Expected: output contains every newly added friend name.

- [ ] **Step 3: Inspect the existing page layout in Codex browser**

Refresh `http://localhost:4321/links` at desktop and mobile widths. Confirm the page renders seven compact cards including the existing Axi card, the two-column desktop grid remains intact, and cards stack without overflow on mobile.
