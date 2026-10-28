import type {
  ConventionContext,
  MetadataRoute,
} from '@bernardoforcillo/vite-seo';
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '~/lib/seo';

export default (ctx: ConventionContext): MetadataRoute.Feed => ({
  title: SITE_NAME,
  link: ctx.siteUrl ?? '/',
  description: SITE_DESCRIPTION,
  language: 'en',
  formats: ['rss', 'atom', 'json'],
  items: ctx.content
    .filter(
      (entry) =>
        entry.url.startsWith('/blog/') || entry.url.startsWith('/notes/'),
    )
    .map((entry) => ({
      title: entry.title,
      url: entry.url,
      summary: entry.description,
      content: entry.body,
      date: entry.date,
      updated: entry.updated,
      tags: entry.tags,
      authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    })),
});
