import { createAppConfig } from '@monorepo/vite-config';
import { blogCategoryPages } from './scripts/blog-category-pages.mjs';

const root = import.meta.dirname;

export default createAppConfig({
  root,
  sitemapHost: 'https://bernardoforcillo.com',
  pages: blogCategoryPages(root),
  // TEMPORARY — removed in Task 11, once every route the home page links to
  // exists. Right now `pages` declares /blog/engineering (route lands in Task
  // 10) and the home page links to /projects, /blog, /notes and /about (Tasks
  // 9-11), so the strict default aborts the whole build on the first 404 and
  // the two routes this task does ship never get written.
  prerender: { failOnError: false },
});
