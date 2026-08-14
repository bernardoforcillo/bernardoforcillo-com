import { describe, expect, it } from 'vitest';
import { extractSeo } from './lib/extract-seo.mjs';
import { checkRoutes } from './parity-http.mjs';

const HTML = `<!doctype html>
<html lang="en">
  <head>
    <title> About - Bernardo Forcillo</title>
    <meta name="description" content="About Bernardo" />
    <link rel="canonical" href="https://bernardoforcillo.com/about" />
  </head>
  <body><h1>About.</h1></body>
</html>`;

// The fixture baseline is produced by the same extractor that produced the
// committed baseline, so this suite exercises the HTTP wiring and nothing else.
const baseline = { '/about': extractSeo(HTML) };

const respondWith = (body, status = 200) => ({
  status,
  text: async () => body,
});

const run = (fetchImpl, expectedChanges = {}) =>
  checkRoutes({
    baseUrl: 'http://127.0.0.1:8080',
    routes: ['/about'],
    baseline,
    expectedChanges,
    fetchImpl,
  });

describe('checkRoutes', () => {
  it('requests every route against the given base URL', async () => {
    const seen = [];
    await run(async (url) => {
      seen.push(String(url));
      return respondWith(HTML);
    });
    expect(seen).toEqual(['http://127.0.0.1:8080/about']);
  });

  it('passes when the served HTML matches the baseline', async () => {
    const { failures } = await run(async () => respondWith(HTML));
    expect(failures).toEqual([]);
  });

  it('reports the route and the status when the container is not 200', async () => {
    const { failures } = await run(async () => respondWith('', 500));
    expect(failures).toEqual(['/about: HTTP 500, expected 200']);
  });

  it('prefixes a diverged field with its route', async () => {
    const { failures } = await run(async () =>
      respondWith(HTML.replace('<title> About', '<title>About')),
    );
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('/about: title');
  });

  it('honours the global waiver list', async () => {
    const { failures } = await run(
      async () => respondWith(HTML.replace('<title> About', '<title>About')),
      { '*': { fields: ['title'], reason: 'title template moved' } },
    );
    expect(failures).toEqual([]);
  });
});
