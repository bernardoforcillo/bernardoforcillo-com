import contentCollections from '@content-collections/vite';
import { createAppConfig } from '@monorepo/vite-config';
import { blogCategoryPages } from './scripts/blog-category-pages.mjs';

const root = import.meta.dirname;

export default createAppConfig({
  root,
  sitemapHost: 'https://bernardoforcillo.com',
  pages: blogCategoryPages(root),
  plugins: [contentCollections()],
});
