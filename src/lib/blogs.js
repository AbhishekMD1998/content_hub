import blogsFile from '../data/blogs.json';

/** Blogs authored in src/data/blogs.json (version-controlled). */
export const jsonBlogs = blogsFile.blogs.map((blog) => ({
  ...blog,
  source: blog.source || 'json',
}));

const JSON_IDS = new Set(jsonBlogs.map((b) => b.id));

export function isJsonBlog(blog) {
  return blog?.source === 'json' || JSON_IDS.has(blog?.id);
}

export function getTableOfContents(blocks = []) {
  return blocks.filter((b) => b.type === 'heading' && b.level === 2 && b.id);
}

export function mergeBlogs(adminBlogs = []) {
  const adminOnly = adminBlogs.filter((b) => !JSON_IDS.has(b.id));
  return [...jsonBlogs, ...adminOnly].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
}
