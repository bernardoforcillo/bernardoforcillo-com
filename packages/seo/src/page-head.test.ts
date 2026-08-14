import { describe, expect, it } from 'vitest';
import { pageHead } from './page-head';

type Meta = Record<string, unknown>;

const metaOf = (head: ReturnType<typeof pageHead>) =>
  head.meta as unknown as Meta[];

describe('pageHead', () => {
  const head = pageHead({
    title: 'About',
    description: 'About Bernardo',
    path: '/about',
  });

  it('puts the title inside meta, never at the top level', () => {
    expect(head).not.toHaveProperty('title');
    const titles = metaOf(head).filter((entry) => 'title' in entry);
    expect(titles).toEqual([{ title: ' About - Bernardo Forcillo' }]);
  });

  it('declares exactly one canonical link', () => {
    expect(head.links).toEqual([
      { rel: 'canonical', href: 'https://bernardoforcillo.com/about' },
    ]);
  });

  it('uses the untemplated site suffix for social titles', () => {
    const social = metaOf(head).filter(
      (entry) =>
        entry.property === 'og:title' || entry.name === 'twitter:title',
    );
    expect(social).toEqual([
      { property: 'og:title', content: 'About - Bernardo Forcillo' },
      { name: 'twitter:title', content: 'About - Bernardo Forcillo' },
    ]);
  });

  it('lets a caller override the social title', () => {
    const custom = pageHead({
      title: 'Thoughts, ideas, and insights about technology and development',
      ogTitle: 'Blog - Bernardo Forcillo',
      description: 'Thoughts.',
      path: '/blog',
    });
    expect(metaOf(custom)).toContainEqual({
      property: 'og:title',
      content: 'Blog - Bernardo Forcillo',
    });
  });

  it('emits article metadata with a single joined tag entry', () => {
    const article = pageHead({
      title: 'Hello World',
      description: 'Why.',
      path: '/blog/engineering/hello-world',
      type: 'article',
      publishedTime: '2026-04-16',
      tags: ['engineering', 'tanstack'],
    });
    const entries = metaOf(article);
    expect(entries).toContainEqual({
      property: 'article:published_time',
      content: '2026-04-16',
    });
    expect(entries).toContainEqual({
      property: 'article:modified_time',
      content: '2026-04-16',
    });
    // One entry only: the head renderer dedupes meta by `property`, so a second
    // article:tag would be silently dropped.
    expect(entries.filter((entry) => entry.property === 'article:tag')).toEqual(
      [{ property: 'article:tag', content: 'engineering,tanstack' }],
    );
  });

  it('honours noIndex', () => {
    const hidden = pageHead({
      title: 'Page not found',
      description: 'Nope.',
      path: '/404',
      noIndex: true,
    });
    expect(metaOf(hidden)).toContainEqual({
      name: 'robots',
      content: 'noindex,nofollow',
    });
  });

  it('renders JSON-LD through the script:ld+json meta key', () => {
    const withGraph = pageHead({
      description: 'Home.',
      path: '/',
      jsonLd: [{ '@type': 'Person' }],
    });
    expect(metaOf(withGraph)).toContainEqual({
      'script:ld+json': { '@type': 'Person' },
    });
  });
});
