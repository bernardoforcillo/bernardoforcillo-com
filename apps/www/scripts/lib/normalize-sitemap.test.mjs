import { describe, expect, it } from 'vitest';
import { normalizeSitemap } from './normalize-sitemap.mjs';

const sitemap = (...locs) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${locs.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`).join('\n')}
</urlset>
`;

const locsOf = (xml) =>
  [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) => match[1]);

describe('normalizeSitemap', () => {
  it('declares the sitemaps.org namespace over http', () => {
    const result = normalizeSitemap(sitemap('https://bernardoforcillo.com/'));

    expect(result).toContain(
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    );
    expect(result).not.toContain('https://www.sitemaps.org/schemas');
  });

  it('leaves the xhtml namespace alone', () => {
    const result = normalizeSitemap(sitemap('https://bernardoforcillo.com/'));

    expect(result).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  });

  it('collapses a trailing-slash duplicate onto the canonical url', () => {
    const result = normalizeSitemap(
      sitemap(
        'https://bernardoforcillo.com/blog',
        'https://bernardoforcillo.com/blog/',
      ),
    );

    expect(locsOf(result)).toEqual(['https://bernardoforcillo.com/blog']);
  });

  it('rewrites a lone trailing-slash url to match its canonical', () => {
    const result = normalizeSitemap(
      sitemap('https://bernardoforcillo.com/policies/'),
    );

    expect(locsOf(result)).toEqual(['https://bernardoforcillo.com/policies']);
  });

  it('keeps the trailing slash on the site root', () => {
    const result = normalizeSitemap(sitemap('https://bernardoforcillo.com/'));

    expect(locsOf(result)).toEqual(['https://bernardoforcillo.com/']);
  });

  it('treats the root and its slashless form as one entry', () => {
    const result = normalizeSitemap(
      sitemap('https://bernardoforcillo.com/', 'https://bernardoforcillo.com'),
    );

    expect(locsOf(result)).toEqual(['https://bernardoforcillo.com/']);
  });

  it('preserves distinct urls and their order', () => {
    const result = normalizeSitemap(
      sitemap(
        'https://bernardoforcillo.com/',
        'https://bernardoforcillo.com/about',
        'https://bernardoforcillo.com/blog/engineering/hello-world',
      ),
    );

    expect(locsOf(result)).toEqual([
      'https://bernardoforcillo.com/',
      'https://bernardoforcillo.com/about',
      'https://bernardoforcillo.com/blog/engineering/hello-world',
    ]);
  });

  it('keeps every url entry when nothing needs normalising', () => {
    const input = sitemap(
      'https://bernardoforcillo.com/about',
      'https://bernardoforcillo.com/notes',
    );

    expect(locsOf(normalizeSitemap(input))).toEqual(locsOf(input));
  });
});
