import { AUTHOR_NAME, AUTHOR_URL, SITE_URL } from './site';
import { absoluteUrl } from './title';

type SchemaNode = Record<string, unknown>;

const PERSON_REFERENCE = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Bernardo Forcillo',
  givenName: 'Bernardo',
  familyName: 'Forcillo',
};

const WEBSITE_REFERENCE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
};

/**
 * The return type is annotated, not inferred. An unannotated `'@graph'` array
 * literal infers `(PersonNode | WebSiteNode | WebPageNode)[]` — `satisfies`
 * preserves that union rather than widening it — and every property access on
 * an element that only one member declares (`'@id'`, `sameAs`) is then TS2339.
 * Vitest transpiles without typechecking so the tests would still pass, but
 * `tsc` over packages/seo would not.
 */
export const buildHomeJsonLdGraph = (): {
  '@context': string;
  '@graph': SchemaNode[];
} => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Bernardo Forcillo',
      givenName: 'Bernardo',
      familyName: 'Forcillo',
      url: `${SITE_URL}/`,
      jobTitle: 'Software Engineer',
      birthDate: '2000-04-13T10:30:00.000+02:00',
      birthPlace: {
        '@context': 'https://schema.org',
        '@type': 'Place',
        address: {
          '@context': 'https://schema.org',
          '@type': 'PostalAddress',
          addressLocality: 'Taranto',
          postalCode: '74121',
          addressRegion: 'TA',
          addressCountry: 'IT',
        },
      },
      homeLocation: [
        {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: 'Pisa',
          address: {
            '@context': 'https://schema.org',
            '@type': 'PostalAddress',
            addressLocality: 'Pisa',
            postalCode: '56121',
            addressRegion: 'PI',
            addressCountry: 'IT',
          },
        },
      ],
      memberOf: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://syskrack.org/#organization',
        name: 'A.P.S. Syskrack Giuseppe Porsia',
        url: 'https://syskrack.org',
      },
      worksFor: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ganiga Innovation',
        url: 'https://ganiga.ai',
      },
      sameAs: [
        'https://g.co/kgs/vQk8YD',
        'https://www.facebook.com/bforcillo',
        'https://github.com/bernardoforcillo',
        `${SITE_URL}/#person`,
        'https://orcid.org/0000-0003-3536-0244',
        'https://www.wikidata.org/wiki/Q111416328',
        'https://www.facebook.com/bernardo.forcillo',
        'https://www.instagram.com/bernardoforcillo',
        'https://www.linkedin.com/in/bernardoforcillo/',
        'https://x.com/bernforcillo',
        'https://www.youtube.com/channel/UClKcECSWHukazKYnN5tTjSQ',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Website of Bernardo Forcillo',
      author: PERSON_REFERENCE,
      accountablePerson: PERSON_REFERENCE,
      copyrightHolder: PERSON_REFERENCE,
      maintainer: PERSON_REFERENCE,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Bernardo Forcillo - Software Engineer & Polymath Builder',
      description:
        'Software Engineer building technologies for innovators, professionals and enthusiasts.',
      url: `${SITE_URL}/`,
      inLanguage: 'en',
      isPartOf: WEBSITE_REFERENCE,
      mainEntityOfPage: `${SITE_URL}/`,
      subjectOf: {
        ...WEBSITE_REFERENCE,
        name: 'Bernardo Forcillo - Sito Web',
      },
      publisher: PERSON_REFERENCE,
    },
  ],
});

const AUTHOR_NODE = {
  '@type': 'Person',
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
};

/** The author as the same entity the home page graph declares, by `@id`. */
const PERSON_NODE = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
};

export type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  /** Whole minutes; emitted as an ISO 8601 duration. */
  readingMinutes?: number;
  citations?: { name: string; url: string }[];
  /** Entities the post is about; `url` is an authoritative page for each. */
  about?: { name: string; url: string }[];
};

export const buildBlogPostingJsonLd = ({
  title,
  description,
  path,
  datePublished,
  dateModified,
  keywords,
  articleSection,
  wordCount,
  readingMinutes,
  citations,
  about,
}: ArticleJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${absoluteUrl(path)}#article`,
  headline: title,
  description,
  datePublished,
  dateModified: dateModified ?? datePublished,
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
  url: absoluteUrl(path),
  inLanguage: 'en',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  author: PERSON_NODE,
  publisher: PERSON_NODE,
  keywords: keywords?.join(','),
  articleSection,
  wordCount,
  timeRequired: readingMinutes ? `PT${readingMinutes}M` : undefined,
  citation: citations?.length
    ? citations.map(({ name, url }) => ({
        '@type': 'CreativeWork',
        name,
        url,
      }))
    : undefined,
  about: about?.length
    ? about.map(({ name, url }) => ({ '@type': 'Thing', name, sameAs: url }))
    : undefined,
});

/**
 * Question-and-answer pairs the page shows as its FAQ section. Only emit it
 * for answers visible on the page: the markup must match the content.
 */
export const buildFaqJsonLd = (
  path: string,
  items: { question: string; answer: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${absoluteUrl(path)}#faq`,
  mainEntity: items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

export type CreativeWorkJsonLdInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
};

export const buildCreativeWorkJsonLd = ({
  title,
  description,
  path,
  datePublished,
  dateModified,
  keywords,
}: CreativeWorkJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: title,
  description,
  datePublished,
  dateModified: dateModified ?? datePublished,
  url: absoluteUrl(path),
  inLanguage: 'en',
  author: AUTHOR_NODE,
  keywords: keywords?.join(','),
});

export type BreadcrumbItem = {
  name: string;
  /** Root-relative path; the last item is the current page. */
  path: string;
};

/** Home is prepended, so callers list only the trail below it. */
export const buildBreadcrumbJsonLd = (trail: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map(
    (item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    }),
  ),
});
