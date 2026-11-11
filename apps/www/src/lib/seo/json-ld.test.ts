import { describe, expect, it } from 'vitest';
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildCreativeWorkJsonLd,
  buildFaqJsonLd,
  buildHomeJsonLdGraph,
} from './json-ld';

describe('buildFaqJsonLd', () => {
  it('turns each pair into a Question with an accepted Answer', () => {
    const node = buildFaqJsonLd('/blog/security/t', [
      { question: 'When?', answer: 'Now.' },
    ]);
    expect(node['@type']).toBe('FAQPage');
    expect(node['@id']).toBe(
      'https://bernardoforcillo.com/blog/security/t#faq',
    );
    expect(node.mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'When?',
        acceptedAnswer: { '@type': 'Answer', text: 'Now.' },
      },
    ]);
  });
});

describe('buildBlogPostingJsonLd about', () => {
  it('links each entity to its authoritative page', () => {
    const node = buildBlogPostingJsonLd({
      title: 'T',
      description: 'D',
      path: '/blog/security/t',
      datePublished: '2026-11-11',
      about: [{ name: 'CRA', url: 'https://eur-lex.europa.eu/x' }],
    });
    expect(node.about).toEqual([
      { '@type': 'Thing', name: 'CRA', sameAs: 'https://eur-lex.europa.eu/x' },
    ]);
  });
});

describe('buildHomeJsonLdGraph', () => {
  const graph = buildHomeJsonLdGraph();

  it('is a schema.org graph of Person, WebSite and WebPage', () => {
    expect(graph['@context']).toBe('https://schema.org');
    expect(graph['@graph'].map((node) => node['@type'])).toEqual([
      'Person',
      'WebSite',
      'WebPage',
    ]);
  });

  it('keeps the person node identity stable', () => {
    expect(graph['@graph'][0]['@id']).toBe(
      'https://bernardoforcillo.com/#person',
    );
    expect(graph['@graph'][0].sameAs).toContain(
      'https://orcid.org/0000-0003-3536-0244',
    );
  });
});

describe('buildBlogPostingJsonLd', () => {
  it('defaults dateModified to datePublished and absolutises the url', () => {
    const node = buildBlogPostingJsonLd({
      title: 'Hello World',
      description: 'Why.',
      path: '/blog/engineering/hello-world',
      datePublished: '2026-04-16',
      articleSection: 'engineering',
      keywords: ['engineering'],
    });
    expect(node['@type']).toBe('BlogPosting');
    expect(node.dateModified).toBe('2026-04-16');
    expect(node.url).toBe(
      'https://bernardoforcillo.com/blog/engineering/hello-world',
    );
    expect(node.articleSection).toBe('engineering');
    expect(node.citation).toBeUndefined();
    expect(node.timeRequired).toBeUndefined();
  });

  it('links the author to the site person and lists citations', () => {
    const node = buildBlogPostingJsonLd({
      title: 'T',
      description: 'D',
      path: '/blog/security/t',
      datePublished: '2026-11-11',
      wordCount: 1200,
      readingMinutes: 6,
      citations: [{ name: 'A', url: 'https://a.example' }],
    });
    expect(node['@id']).toBe(
      'https://bernardoforcillo.com/blog/security/t#article',
    );
    expect(node.author['@id']).toBe('https://bernardoforcillo.com/#person');
    expect(node.isPartOf['@id']).toBe('https://bernardoforcillo.com/#website');
    expect(node.timeRequired).toBe('PT6M');
    expect(node.citation).toEqual([
      { '@type': 'CreativeWork', name: 'A', url: 'https://a.example' },
    ]);
  });
});

describe('buildCreativeWorkJsonLd', () => {
  it('names the work and attributes the author', () => {
    const node = buildCreativeWorkJsonLd({
      title: 'Amaro',
      description: 'A framework.',
      path: '/projects/amaro',
      datePublished: '2026-06-11',
    });
    expect(node['@type']).toBe('CreativeWork');
    expect(node.name).toBe('Amaro');
    expect(node.author).toEqual({
      '@type': 'Person',
      name: 'Bernardo Forcillo',
      url: 'https://bernardoforcillo.com/',
    });
  });
});

describe('buildBreadcrumbJsonLd', () => {
  const node = buildBreadcrumbJsonLd([
    { name: 'Blog', path: '/blog' },
    { name: 'Hello World', path: '/blog/engineering/hello-world' },
  ]);

  it('prepends Home and numbers items from 1', () => {
    expect(node['@type']).toBe('BreadcrumbList');
    expect(node.itemListElement.map((el) => [el.position, el.name])).toEqual([
      [1, 'Home'],
      [2, 'Blog'],
      [3, 'Hello World'],
    ]);
  });

  it('absolutises every item url', () => {
    expect(node.itemListElement.map((el) => el.item)).toEqual([
      'https://bernardoforcillo.com/',
      'https://bernardoforcillo.com/blog',
      'https://bernardoforcillo.com/blog/engineering/hello-world',
    ]);
  });
});
