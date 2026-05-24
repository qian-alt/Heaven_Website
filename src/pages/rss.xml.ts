import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { filterPublishedPosts, sortPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = sortPosts(filterPublishedPosts(await getCollection('blog')));

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? new URL('https://example.com'),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
    })),
  });
}
