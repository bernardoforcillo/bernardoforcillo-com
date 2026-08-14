import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { compareSeo } from './lib/compare-seo.mjs';
import { extractSeo } from './lib/extract-seo.mjs';
import { BASELINE_ROUTES } from './routes.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));

/**
 * The HTTP twin of parity-diff.mjs: same baseline, same extractor, same
 * comparer, fetched from a running container instead of read from dist/client.
 *
 * @param {object} options
 * @param {string} options.baseUrl base URL of the running container
 * @param {string[]} [options.routes] routes to check, defaults to the baseline
 * @param {object} [options.baseline] route-keyed baseline snapshot map
 * @param {object} [options.expectedChanges] route -> { fields, reason } waivers
 * @param {typeof fetch} [options.fetchImpl] injected for testing
 * @returns {Promise<{ failures: string[], notes: string[] }>}
 */
export const checkRoutes = async ({
  baseUrl,
  routes = BASELINE_ROUTES,
  baseline = readJson(path.join(ROOT, 'tests', 'seo-baseline.json')),
  expectedChanges = readJson(
    path.join(ROOT, 'tests', 'parity-expected-changes.json'),
  ),
  fetchImpl = fetch,
}) => {
  const failures = [];
  const notes = [];

  for (const route of routes) {
    const response = await fetchImpl(new URL(route, baseUrl));

    if (response.status !== 200) {
      failures.push(`${route}: HTTP ${response.status}, expected 200`);
      continue;
    }

    const allowed = [
      ...(expectedChanges['*']?.fields ?? []),
      ...(expectedChanges[route]?.fields ?? []),
    ];
    const result = compareSeo(
      baseline[route],
      extractSeo(await response.text()),
      allowed,
    );

    for (const failure of result.failures) {
      failures.push(`${route}: ${failure}`);
    }
    if (result.notes.length > 0) {
      notes.push(`${route}: changed ${result.notes.join(', ')}`);
    }
  }

  return { failures, notes };
};

if (import.meta.filename === process.argv[1]) {
  const index = process.argv.indexOf('--base-url');
  const baseUrl =
    index === -1 ? 'http://127.0.0.1:8080' : process.argv[index + 1];
  const { failures, notes } = await checkRoutes({ baseUrl });

  for (const note of notes) {
    console.log(`note ${note}`);
  }
  for (const failure of failures) {
    console.error(`FAIL ${failure}`);
  }

  console.log(
    `parity: ${BASELINE_ROUTES.length} routes checked, ${failures.length} failures`,
  );
  process.exit(failures.length === 0 ? 0 : 1);
}
