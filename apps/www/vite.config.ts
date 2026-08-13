import contentCollections from '@content-collections/vite';
import { createAppConfig } from '@monorepo/vite-config';
import { blogCategoryPages } from './scripts/blog-category-pages.mjs';

const root = import.meta.dirname;

export default createAppConfig({
  root,
  sitemapHost: 'https://bernardoforcillo.com',
  pages: [
    // Param routes crawlLinks cannot reach on its own.
    ...blogCategoryPages(root),
    // Prerendered by autoStaticPathsDiscovery, but it must never be indexed.
    { path: '/404', sitemap: { exclude: true } },
  ],
  plugins: [contentCollections()],
});
