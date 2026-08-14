import { readFileSync } from 'node:fs';
import path from 'node:path';
import { compareSeo } from './lib/compare-seo.mjs';
import { extractSeo } from './lib/extract-seo.mjs';
import { BASELINE_ROUTES } from './routes.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist', 'client');

const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));

const baseline = readJson(path.join(ROOT, 'tests', 'seo-baseline.json'));
const expectedChanges = readJson(
  path.join(ROOT, 'tests', 'parity-expected-changes.json'),
);

const fileFor = (route) =>
  route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, route.replace(/^\//, ''), 'index.html');

const allowedFor = (route) => [
  ...(expectedChanges['*']?.fields ?? []),
  ...(expectedChanges[route]?.fields ?? []),
];

let failed = false;

for (const route of BASELINE_ROUTES) {
  let html;
  try {
    html = readFileSync(fileFor(route), 'utf8');
  } catch {
    console.error(`FAIL ${route}: ${fileFor(route)} was not prerendered`);
    failed = true;
    continue;
  }

  const { failures, notes } = compareSeo(
    baseline[route],
    extractSeo(html),
    allowedFor(route),
  );

  if (failures.length > 0) {
    failed = true;
    for (const failure of failures) {
      console.error(`FAIL ${route}: ${failure}`);
    }
  }

  if (notes.length > 0) {
    console.log(`note ${route}: changed ${notes.join(', ')}`);
  }
}

if (failed) {
  console.error(
    '\nparity diff failed. Fix the route, or record the intentional change in tests/parity-expected-changes.json.',
  );
  process.exit(1);
}

console.log(`OK parity across ${BASELINE_ROUTES.length} routes`);
