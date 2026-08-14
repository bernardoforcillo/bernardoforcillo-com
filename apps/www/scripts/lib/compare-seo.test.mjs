import { describe, expect, it } from 'vitest';
import { compareSeo } from './compare-seo.mjs';

const baseline = {
  title: ' About - Bernardo Forcillo',
  titleCount: 1,
  description: 'About Bernardo',
  canonical: null,
  canonicalCount: 0,
  h1: ['About.'],
  og: {},
  twitter: {},
  article: {},
  keywords: null,
  robots: null,
  jsonLd: [],
  text: 'About. About Bernardo',
  textLength: 21,
};

const actual = {
  ...baseline,
  canonical: 'https://bernardoforcillo.com/about',
  canonicalCount: 1,
  og: { 'og:title': 'About - Bernardo Forcillo' },
  robots: 'index,follow',
};

describe('compareSeo', () => {
  it('passes when the hard fields match and the invariants hold', () => {
    expect(compareSeo(baseline, actual, []).failures).toEqual([]);
  });

  it('reports soft differences without failing', () => {
    const { notes } = compareSeo(baseline, actual, []);
    expect(notes).toContain('og');
    expect(notes).toContain('robots');
  });

  it('fails on a changed title', () => {
    const { failures } = compareSeo(
      baseline,
      { ...actual, title: 'About - Bernardo Forcillo' },
      [],
    );
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('title');
  });

  it('fails on a changed h1', () => {
    const { failures } = compareSeo(baseline, { ...actual, h1: [] }, []);
    expect(failures[0]).toContain('h1');
  });

  it('fails when the canonical is duplicated', () => {
    const { failures } = compareSeo(
      baseline,
      { ...actual, canonicalCount: 2 },
      [],
    );
    expect(failures[0]).toContain('canonicalCount');
  });

  it('fails when more than one title tag reaches the head', () => {
    const { failures } = compareSeo(baseline, { ...actual, titleCount: 2 }, []);
    expect(failures[0]).toContain('titleCount');
  });

  it('fails when the visible text moves more than 15 percent', () => {
    const { failures } = compareSeo(
      baseline,
      { ...actual, textLength: 40 },
      [],
    );
    expect(failures[0]).toContain('textLength');
  });

  it('skips a field listed in the allowlist', () => {
    const { failures } = compareSeo(
      baseline,
      { ...actual, description: 'Something else' },
      ['description'],
    );
    expect(failures).toEqual([]);
  });
});
