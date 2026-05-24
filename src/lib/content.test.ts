import { describe, expect, it } from 'vitest';
import { filterPublishedPosts, getAllTags, sortPosts } from './content';

const posts = [
  { id: 'older', data: { title: 'Older', publishedAt: new Date('2026-04-01'), draft: false, pinned: false, tags: ['Web'] } },
  { id: 'draft', data: { title: 'Draft', publishedAt: new Date('2026-06-01'), draft: true, pinned: false, tags: ['Secret'] } },
  { id: 'pinned', data: { title: 'Pinned', publishedAt: new Date('2026-03-01'), draft: false, pinned: true, tags: ['Web', '记录'] } },
];

describe('blog content helpers', () => {
  it('omits drafts and places pinned entries before recent entries', () => {
    expect(sortPosts(filterPublishedPosts(posts)).map((post) => post.id)).toEqual(['pinned', 'older']);
  });

  it('returns sorted unique tags from public posts', () => {
    expect(getAllTags(filterPublishedPosts(posts))).toEqual(['Web', '记录']);
  });
});
