import type { Metadata } from 'next';

export const SITE_URL = 'https://bernardoforcillo.com';
export const SITE_NAME = 'Bernardo Forcillo';
export const AUTHOR_NAME = 'Bernardo Forcillo';
export const AUTHOR_URL = `${SITE_URL}/`;

type SchemaObject = Record<string, unknown>;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
  articleSection?: string;
};

type CreativeWorkSchemaInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
};

export const absoluteUrl = (path: string) => {
  return new URL(path, SITE_URL).toString();
};

export const createPageMetadata = ({
  title,
  description,
  path,
  type = 'website',
  keywords,
  publishedTime,
  modifiedTime,
  tags,
  noIndex = false,
}: PageMetadataInput): Metadata => {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    keywords,
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title,
      description,
      type,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: 'en_US',
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors: [AUTHOR_NAME],
            tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@bernardoforcillo',
    },
  };
};

export const buildSiteJsonLdGraph = () => {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: AUTHOR_NAME,
        url: AUTHOR_URL,
        sameAs: [
          'https://github.com/bernardoforcillo',
          'https://www.linkedin.com/in/bernardoforcillo/',
          'https://www.instagram.com/bernardoforcillo',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: `Website of ${AUTHOR_NAME}`,
        url: AUTHOR_URL,
        publisher: {
          '@id': personId,
        },
      },
    ],
  } satisfies SchemaObject;
};

export const buildHomeJsonLdGraph = () => {
  const base = buildSiteJsonLdGraph();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...(Array.isArray(base['@graph'])
        ? (base['@graph'] as SchemaObject[])
        : []),
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#home`,
        name: `${AUTHOR_NAME} - Software Engineer & Polymath Builder`,
        description:
          'Software Engineer building technologies for innovators, professionals and enthusiasts.',
        url: AUTHOR_URL,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#person`,
        },
        inLanguage: 'en',
      },
    ],
  } satisfies SchemaObject;
};

export const buildArticleJsonLd = ({
  title,
  description,
  path,
  datePublished,
  dateModified,
  keywords,
  articleSection,
}: ArticleSchemaInput) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: absoluteUrl(path),
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    url: absoluteUrl(path),
    inLanguage: 'en',
    keywords,
    articleSection,
  } satisfies SchemaObject;
};

export const buildCreativeWorkJsonLd = ({
  title,
  description,
  path,
  datePublished,
  dateModified,
  keywords,
}: CreativeWorkSchemaInput) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url: absoluteUrl(path),
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    inLanguage: 'en',
    keywords,
  } satisfies SchemaObject;
};
