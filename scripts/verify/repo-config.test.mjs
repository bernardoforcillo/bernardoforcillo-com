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

test('turbo build outputs are complete and free of Next.js artifacts', () => {
  const turbo = readJson('turbo.json');
  const outputs = turbo.tasks.build.outputs;
  assert.ok(outputs.includes('dist/**'));
  assert.ok(outputs.includes('.content-collections/**'));
  // The next two are post-conditions from plan 1 Task 15: they guard against a
  // regression, they are not this task's edit.
  assert.equal(turbo.tasks.build.env, undefined);
  for (const output of outputs) {
    assert.ok(
      !output.includes('.next'),
      `stale Next.js output glob: ${output}`,
    );
  }
});

test('turbo exposes a non-cached test:e2e task', () => {
  const turbo = readJson('turbo.json');
  assert.equal(turbo.tasks['test:e2e']?.cache, false);
});

test('the Go library package is wired into turbo build, test and clean', () => {
  const pkg = readJson('packages/static-server/package.json');
  assert.equal(pkg.name, '@monorepo/static-server');
  assert.equal(pkg.scripts.build, 'go build ./...');
  assert.equal(pkg.scripts.test, 'go test ./...');
  assert.equal(pkg.scripts.clean, 'go clean ./...');
});

test('biome leaves the generated route tree alone', () => {
  const biome = readJson('biome.json');
  // linter.ignore is plan 1 Task 15's edit, asserted here as a post-condition.
  assert.ok(biome.linter.ignore.includes('**/routeTree.gen.ts'));
  assert.ok(biome.formatter.ignore.includes('**/routeTree.gen.ts'));
  // files.ignore is the only list that also silences organizeImports, which is
  // a third analyzer alongside the formatter and the linter and has no ignore
  // list of its own. Dropping this entry reverts commit eb2d196 and reopens the
  // 218-line churn loop, so it is asserted, not forbidden.
  assert.ok(
    biome.files.ignore.includes('**/routeTree.gen.ts'),
    'files.ignore is the only list organizeImports honours',
  );
});
