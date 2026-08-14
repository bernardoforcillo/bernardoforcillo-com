const HARD_FIELDS = ['title', 'description', 'h1'];
const SOFT_FIELDS = [
  'keywords',
  'robots',
  'canonical',
  'og',
  'article',
  'twitter',
  'jsonLd',
];
const TEXT_TOLERANCE = 0.15;

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * @param {object} baseline snapshot captured from the Next build
 * @param {object} actual snapshot extracted from dist/client
 * @param {string[]} allowed field names whose difference is intentional
 * @returns {{ failures: string[], notes: string[] }}
 */
export const compareSeo = (baseline, actual, allowed = []) => {
  const failures = [];
  const notes = [];

  for (const field of HARD_FIELDS) {
    if (allowed.includes(field)) {
      continue;
    }
    if (!same(baseline[field], actual[field])) {
      failures.push(
        `${field}: expected ${JSON.stringify(baseline[field])}, got ${JSON.stringify(actual[field])}`,
      );
    }
  }

  // Absolute invariants, not baseline comparisons: Next never emitted a
  // canonical, and a second <title> or a second canonical is always a bug.
  if (!allowed.includes('canonicalCount') && actual.canonicalCount !== 1) {
    failures.push(
      `canonicalCount: expected exactly 1, got ${actual.canonicalCount}`,
    );
  }
  if (!allowed.includes('titleCount') && actual.titleCount !== 1) {
    failures.push(`titleCount: expected exactly 1, got ${actual.titleCount}`);
  }

  if (!allowed.includes('textLength')) {
    const expected = baseline.textLength;
    const drift =
      expected === 0 ? 0 : Math.abs(actual.textLength - expected) / expected;
    if (drift > TEXT_TOLERANCE) {
      failures.push(
        `textLength: ${actual.textLength} drifted ${(drift * 100).toFixed(1)}% from ${expected}`,
      );
    }
  }

  for (const field of SOFT_FIELDS) {
    if (!same(baseline[field], actual[field])) {
      notes.push(field);
    }
  }

  return { failures, notes };
};
