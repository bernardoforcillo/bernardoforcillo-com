import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const readText = (relativePath) =>
  readFileSync(join(repoRoot, relativePath), 'utf8');

const readJson = (relativePath) => JSON.parse(readText(relativePath));

// Post-condition, not a new edit: plan 1 Task 15 already set this and its
// assert-no-next.mjs gate enforces it. Asserted here so that a later task in
// this plan cannot quietly regress it.
test('root package.json still requires Node 24', () => {
  const pkg = readJson('package.json');
  assert.equal(pkg.engines.node, '>=24');
});

test('root package.json keeps the engine shim and the turbo test script', () => {
  const pkg = readJson('package.json');
  assert.equal(pkg.scripts.container, 'node scripts/container-engine.mjs');
  assert.equal(pkg.scripts.test, 'pnpm turbo test');
  assert.ok(existsSync(join(repoRoot, 'scripts/container-engine.mjs')));
});

test('root package.json exposes the Go and e2e test scripts', () => {
  const pkg = readJson('package.json');
  assert.equal(
    pkg.scripts['test:go'],
    'go test ./packages/static-server/... ./apps/www/server/...',
  );
  assert.equal(
    pkg.scripts['test:e2e'],
    'pnpm turbo test:e2e --filter=@bernardoforcillo-com/www',
  );
});

test('shell scripts are pinned to LF endings', () => {
  const attributes = readText('.gitattributes');
  assert.match(attributes, /^\*\.sh text eol=lf$/m);
  for (const script of [
    'scripts/verify/container-smoke.sh',
    'scripts/verify/k8s-check.sh',
  ]) {
    if (!existsSync(join(repoRoot, script))) {
      continue;
    }
    assert.ok(!readText(script).includes('\r'), `${script} has CRLF endings`);
  }
});
