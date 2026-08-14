import type { JSX } from 'react';
import { AUTHOR_NAME, SITE_NAME, TWITTER_CREATOR } from './site';
import { absoluteUrl, formatSocialTitle, formatTitle } from './title';

/**
 * The shape TanStack Router's `head` option accepts. `meta` is typed as
 * `Array<JSX.IntrinsicElements['meta']>`, which knows nothing about `property`
 * or `script:ld+json` even though the head renderer handles both — hence the
 * single cast at the end of `pageHead`.
 */
export type PageHead = {
  meta: Array<JSX.IntrinsicElements['meta']>;
  links: Array<JSX.IntrinsicElements['link']>;
};

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { 'script:ld+json': Record<string, unknown> };

export type PageHeadInput = {
  /** Page title before the ' %s - Bernardo Forcillo' template is applied. */
  title?: string;
  /** Bypasses the template entirely (the home page only). */
  absoluteTitle?: string;
  /** Overrides the og:/twitter: title when it differs from the document title. */
  ogTitle?: string;
  description: string;
  /** Root-relative path; becomes the canonical and og:url. */
  path: string;
  type?: 'website' | 'article';
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
  jsonLd?: Array<Record<string, unknown>>;
};

export const pageHead = (input: PageHeadInput): PageHead => {
  const documentTitle = input.absoluteTitle ?? formatTitle(input.title);
  const socialTitle =
    input.ogTitle ?? input.absoluteTitle ?? formatSocialTitle(input.title);
  const url = absoluteUrl(input.path);
  const type = input.type ?? 'website';

  const articleMeta: MetaTag[] =
    type === 'article'
      ? [
          {
            property: 'article:published_time',
            content: input.publishedTime ?? '',
          },
          {
            property: 'article:modified_time',
            content: input.modifiedTime ?? input.publishedTime ?? '',
          },
          { property: 'article:author', content: AUTHOR_NAME },
          // A single joined entry: the head renderer dedupes meta by `property`,
          // so repeated article:tag entries collapse into one anyway.
          ...(input.tags && input.tags.length > 0
            ? [{ property: 'article:tag', content: input.tags.join(',') }]
            : []),
        ]
      : [];

  const meta: MetaTag[] = [
    { title: documentTitle },
    { name: 'description', content: input.description },
    ...(input.keywords && input.keywords.length > 0
      ? [{ name: 'keywords', content: input.keywords.join(',') }]
      : []),
    {
      name: 'robots',
      content: input.noIndex ? 'noindex,nofollow' : 'index,follow',
    },
    { property: 'og:type', content: type },
    { property: 'og:title', content: socialTitle },
    { property: 'og:description', content: input.description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'en_US' },
    ...articleMeta,
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: socialTitle },
    { name: 'twitter:description', content: input.description },
    { name: 'twitter:creator', content: TWITTER_CREATOR },
    ...(input.jsonLd ?? []).map((data) => ({ 'script:ld+json': data })),
  ];

  return {
    meta: meta as unknown as PageHead['meta'],
    // Exactly one canonical, declared here and nowhere else: links are not
    // deduplicated across matched routes.
    links: [{ rel: 'canonical', href: url }],
  };
};
