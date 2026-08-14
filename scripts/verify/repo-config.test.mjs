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
  // `apps/www/server` has no package.json, so turbo never sees it: without the
  // test:go leg the root script would silently skip the binary that serves the
  // whole site.
  assert.equal(pkg.scripts.test, 'pnpm turbo test && pnpm test:go');
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

test('.dockerignore excludes generated trees at every depth', () => {
  const dockerignore = readText('.dockerignore');
  const lines = dockerignore.split(/\r?\n/);
  const required = [
    '**/node_modules',
    '**/dist',
    '**/.output',
    '**/.content-collections',
    '**/.turbo',
    '**/*.test',
    '**/*.exe',
    'playwright-report',
    'test-results',
  ];
  for (const pattern of required) {
    assert.ok(lines.includes(pattern), `.dockerignore is missing ${pattern}`);
  }
  // The bare forms plan 1 Task 15 appended are strictly subsumed by the
  // recursive ones and must not survive as dead duplicates.
  for (const dead of ['.output', '.content-collections', '.tanstack']) {
    assert.ok(
      !lines.includes(dead),
      `.dockerignore still carries the dead bare pattern ${dead}`,
    );
  }
  assert.ok(
    !/^\*\.mdx?$/m.test(dockerignore),
    'markdown is build input (apps/www/content); it must never be excluded',
  );
});

test('the Dockerfile has the five expected stages and base images', () => {
  const dockerfile = readText('apps/www/Dockerfile');
  const stages = [...dockerfile.matchAll(/^FROM \S+ AS (\S+)$/gm)].map(
    (match) => match[1],
  );
  assert.deepEqual(stages, ['base', 'deps', 'builder', 'gobuilder', 'runner']);
  assert.match(dockerfile, /^FROM node:24-alpine AS base$/m);
  assert.match(dockerfile, /^FROM golang:1\.25-alpine AS gobuilder$/m);
  assert.match(
    dockerfile,
    /^FROM gcr\.io\/distroless\/static-debian12:nonroot AS runner$/m,
  );
  assert.match(dockerfile, /^USER 65532:65532$/m);
  assert.match(dockerfile, /^EXPOSE 3000$/m);
  assert.ok(
    !/^#\s*syntax=/m.test(dockerfile),
    'a BuildKit frontend directive makes the image unbuildable under Podman',
  );
});

test('the Dockerfile copies the Go workspace explicitly', () => {
  const dockerfile = readText('apps/www/Dockerfile');
  assert.match(dockerfile, /COPY go\.work\* \.\//);
  assert.match(
    dockerfile,
    /COPY packages\/static-server \.\/packages\/static-server/,
  );
  assert.match(dockerfile, /COPY apps\/www\/server \.\/apps\/www\/server/);
  assert.match(
    dockerfile,
    /COPY --from=builder \/app\/apps\/www\/dist\/client \.\/apps\/www\/server\/dist/,
  );
});

test('the Dockerfile asserts the build output instead of repairing it', () => {
  const dockerfile = readText('apps/www/Dockerfile');
  assert.match(
    dockerfile,
    /RUN test ! -e apps\/www\/dist\/client\/pages\.json/,
  );
  assert.ok(
    !dockerfile.includes('rm -f apps/www/dist/client/pages.json'),
    'deleting pages.json here would mask a regression in clean-dist.mjs',
  );
});

test('the Dockerfile carries no Next.js leftovers', () => {
  const dockerfile = readText('apps/www/Dockerfile');
  assert.ok(!dockerfile.includes('NEXT_TELEMETRY_DISABLED'));
  assert.ok(!dockerfile.includes('libc6-compat'));
  assert.ok(!dockerfile.includes('.next'));
  assert.ok(
    !/ENV NODE_ENV[= ]production[\s\S]*RUN pnpm install/.test(dockerfile),
    'NODE_ENV=production before pnpm install silently drops devDependencies',
  );
});

test('only the deployment manifest changed under kubernetes/', () => {
  const deployment = readText('kubernetes/main/www/deployment.yaml');
  assert.equal((deployment.match(/path: \/healthz/g) ?? []).length, 3);
  assert.match(deployment, /runAsUser: 65532/);
  assert.match(deployment, /runAsGroup: 65532/);
  assert.match(deployment, /fsGroup: 65532/);
  assert.match(deployment, /seccompProfile:\r?\n\s+type: RuntimeDefault/);
  assert.match(deployment, /memory: '32Mi'/);
  assert.match(deployment, /memory: '16Mi'/);
  assert.ok(!deployment.includes('1001'));
  assert.match(deployment, /containerPort: 3000/);

  const service = readText('kubernetes/main/www/service.yaml');
  assert.match(service, /targetPort: 3000/);
});

test('the docker workflow validates pull requests and caches layers', () => {
  const workflow = readText('.github/workflows/docker-push.yaml');
  assert.match(workflow, /^ {2}pull_request:$/m);
  assert.match(workflow, /^concurrency:$/m);
  assert.match(workflow, /cancel-in-progress: true/);
  assert.match(workflow, /^permissions:$/m);
  assert.match(workflow, /cache-from: type=gha/);
  assert.match(workflow, /cache-to: type=gha,mode=max/);
  assert.ok(
    !workflow.includes('setup-qemu-action'),
    'QEMU is dead weight for a single linux/amd64 platform',
  );
  // CI keeps the official docker actions; only local commands go through the
  // container-engine shim.
  assert.match(workflow, /docker\/build-push-action@v6/);
  assert.match(workflow, /file: \.\/apps\/www\/Dockerfile/);
  assert.match(workflow, /platforms: linux\/amd64/);
});
