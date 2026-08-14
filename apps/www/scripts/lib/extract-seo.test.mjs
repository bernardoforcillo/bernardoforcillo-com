import { describe, expect, it } from 'vitest';
import { extractSeo, normalizeText } from './extract-seo.mjs';

const HTML = `<!DOCTYPE html><html lang="en"><head>
<meta charSet="utf-8"/>
<title> About - Bernardo Forcillo</title>
<meta name="description" content="About Bernardo"/>
<meta name="keywords" content="React,Golang"/>
<meta name="robots" content="index,follow"/>
<meta property="og:title" content="About - Bernardo Forcillo"/>
<meta property="og:type" content="website"/>
<meta name="twitter:card" content="summary_large_image"/>
<link rel="canonical" href="https://bernardoforcillo.com/about"/>
<link rel="stylesheet" href="/assets/app.css"/>
</head><body>
<script type="application/ld+json">{"@type":"Person","name":"Bernardo &amp; Co"}</script>
<h1>About.</h1>
<svg><title style="display:none">GitHub</title></svg>
<p>Hello   &amp; welcome</p>
<style>.a{color:red}</style>
</body></html>`;

describe('extractSeo', () => {
  it('keeps the exact document title, including its leading space', () => {
    expect(extractSeo(HTML).title).toBe(' About - Bernardo Forcillo');
  });

  it('ignores <title> elements outside the document head', () => {
    expect(extractSeo(HTML).titleCount).toBe(1);
  });

  it('reads description, keywords and robots', () => {
    const seo = extractSeo(HTML);
    expect(seo.description).toBe('About Bernardo');
    expect(seo.keywords).toBe('React,Golang');
    expect(seo.robots).toBe('index,follow');
  });

  it('counts canonical links so duplicates are detectable', () => {
    const seo = extractSeo(HTML);
    expect(seo.canonical).toBe('https://bernardoforcillo.com/about');
    expect(seo.canonicalCount).toBe(1);
  });

  it('groups og by property and twitter by name', () => {
    const seo = extractSeo(HTML);
    expect(seo.og).toEqual({
      'og:title': 'About - Bernardo Forcillo',
      'og:type': 'website',
    });
    expect(seo.twitter).toEqual({ 'twitter:card': 'summary_large_image' });
  });

  it('parses JSON-LD and decodes its entities', () => {
    expect(extractSeo(HTML).jsonLd).toEqual([
      { '@type': 'Person', name: 'Bernardo & Co' },
    ]);
  });

  it('collects h1 text and drops scripts and styles from body text', () => {
    const seo = extractSeo(HTML);
    expect(seo.h1).toEqual(['About.']);
    expect(seo.text).toContain('Hello & welcome');
    expect(seo.text).not.toContain('color:red');
    expect(seo.text).not.toContain('@type');
    expect(seo.textLength).toBe(seo.text.length);
  });
});

describe('normalizeText', () => {
  it('strips tags, decodes entities and collapses whitespace', () => {
    expect(normalizeText('<p>a &mdash;\n\n  b</p>')).toBe('a \u2014 b');
  });
});
