type PostLike = {
  id: string;
  data: {
    title: string;
    publishedAt: Date;
    tags: string[];
    draft?: boolean;
    pinned?: boolean;
  };
};

export function filterPublishedPosts<T extends PostLike>(posts: T[]): T[] {
  return posts.filter((post) => !post.data.draft);
}

export function sortPosts<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort((left, right) => {
    if (Boolean(left.data.pinned) !== Boolean(right.data.pinned)) {
      return left.data.pinned ? -1 : 1;
    }

    return right.data.publishedAt.getTime() - left.data.publishedAt.getTime();
  });
}

export function getAllTags<T extends PostLike>(posts: T[]): string[] {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort();
}
