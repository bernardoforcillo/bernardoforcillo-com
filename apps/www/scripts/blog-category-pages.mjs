import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

/**
 * `crawlLinks` only reaches param routes a list page actually links to, and
 * `/blog/$categorySlug` is reached from `/blog/categories` only. Declaring the
 * category URLs explicitly is what keeps them from 404ing in production.
 * @param {string} root absolute path to apps/www
 * @returns {Array<{ path: string }>}
 */
export const blogCategoryPages = (root) => {
  const blogRoot = path.join(root, 'content', 'blog');
  if (!existsSync(blogRoot)) {
    return [];
  }
  return readdirSync(blogRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ path: `/blog/${entry.name}` }));
};
