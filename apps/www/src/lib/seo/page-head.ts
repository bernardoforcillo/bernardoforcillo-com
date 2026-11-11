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
import { absoluteUrl, formatSocialTitle } from './title';

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
  /**
   * Advertises the page's markdown twin (`<path>.md`, emitted by vite-seo for
   * content entries) so agents can read the source instead of parsing HTML.
   */
  markdownAlternate?: boolean;
  /** The share image (og:image and twitter:image), with its pixel size. */
  image?: { path: string; width: number; height: number; alt: string };
};

export const pageHead = (input: PageHeadInput): PageHead => {
  const socialTitle =
    input.ogTitle ?? input.absoluteTitle ?? formatSocialTitle(input.title);
  const type = input.type ?? 'website';
  const head = site.seo({
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
      ...(input.image
        ? {
            images: [
              {
                url: input.image.path,
                width: input.image.width,
                height: input.image.height,
                alt: input.image.alt,
              },
            ],
          }
        : {}),
      ...(type === 'article'
        ? {
            publishedTime: input.publishedTime ?? '',
            modifiedTime: input.modifiedTime ?? input.publishedTime ?? '',
            authors: [AUTHOR_NAME],
            tags: input.tags,
          }
        : {}),
    },
    twitter: {
      title: socialTitle,
      ...(input.image ? { images: [input.image.path] } : {}),
    },
    jsonLd: input.jsonLd as never,
  })({});
  if (input.markdownAlternate) {
    // vite-seo's link type has no `type`; TanStack renders every attribute.
    head.links.push({
      rel: 'alternate',
      type: 'text/markdown',
      href: absoluteUrl(`${input.path}.md`),
    } as PageHead['links'][number]);
  }
  return head;
};
