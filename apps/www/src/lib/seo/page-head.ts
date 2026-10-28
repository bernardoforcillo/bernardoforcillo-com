import { defineSeo } from '@bernardoforcillo/vite-seo';
import type { Head } from '@bernardoforcillo/vite-seo';
import {
  AUTHOR_NAME,
  SITE_NAME,
  SITE_URL,
  TITLE_DEFAULT,
  TITLE_TEMPLATE,
  TWITTER_CREATOR,
} from './site';
import { formatSocialTitle } from './title';

const site = defineSeo({
  metadataBase: SITE_URL,
  title: { default: TITLE_DEFAULT, template: TITLE_TEMPLATE },
  openGraph: { siteName: SITE_NAME, locale: 'en_US' },
  twitter: { card: 'summary_large_image', creator: TWITTER_CREATOR },
});

export type PageHead = Head;

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
  const socialTitle =
    input.ogTitle ?? input.absoluteTitle ?? formatSocialTitle(input.title);
  const type = input.type ?? 'website';
  return site.seo({
    title: input.absoluteTitle
      ? { absolute: input.absoluteTitle }
      : input.title,
    description: input.description,
    keywords: input.keywords,
    robots: input.noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: { canonical: input.path },
    openGraph: {
      type,
      title: socialTitle,
      url: input.path,
      ...(type === 'article'
        ? {
            publishedTime: input.publishedTime ?? '',
            modifiedTime: input.modifiedTime ?? input.publishedTime ?? '',
            authors: [AUTHOR_NAME],
            tags: input.tags,
          }
        : {}),
    },
    twitter: { title: socialTitle },
    jsonLd: input.jsonLd as never,
  })({});
};
