import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { resolveEngine, stripSeparator } from '../container-engine.mjs';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
);
const script = path.join(repoRoot, 'scripts', 'container-engine.mjs');

const runnable =
  (...available) =>
  (engine) =>
    available.includes(engine);

test('prefers docker when both engines are installed', () => {
  assert.equal(
    resolveEngine({ env: {}, runnable: runnable('docker', 'podman') }),
    'docker',
  );
});

test('falls back to podman when docker is absent', () => {
  assert.equal(
    resolveEngine({ env: {}, runnable: runnable('podman') }),
    'podman',
  );
});

test('honours CONTAINER_ENGINE over the preference order', () => {
  assert.equal(
    resolveEngine({
      env: { CONTAINER_ENGINE: 'podman' },
      runnable: runnable('docker', 'podman'),
    }),
    'podman',
  );
});

test('rejects an unsupported CONTAINER_ENGINE by name', () => {
  assert.throws(
    () =>
      resolveEngine({
        env: { CONTAINER_ENGINE: 'nerdctl' },
        runnable: runnable('nerdctl'),
      }),
    /expected one of: docker, podman/,
  );
});

test('rejects a CONTAINER_ENGINE that is not installed', () => {
  assert.throws(
    () =>
      resolveEngine({
        env: { CONTAINER_ENGINE: 'docker' },
        runnable: runnable('podman'),
      }),
    /not runnable on PATH/,
  );
});

test('names both engines when neither is installed', () => {
  assert.throws(
    () => resolveEngine({ env: {}, runnable: runnable() }),
    /install docker or podman/,
  );
});

// pnpm forwards `--` to the script verbatim, so `pnpm container -- build .` used
// to reach the engine as `podman -- build .` and exit 125.
test('drops the pnpm argument separator', () => {
  assert.deepEqual(stripSeparator(['--', 'build', '.']), ['build', '.']);
});

test('drops only the leading separator', () => {
  assert.deepEqual(stripSeparator(['run', '--rm', '--', 'sh']), [
    'run',
    '--rm',
    '--',
    'sh',
  ]);
});

test('leaves arguments alone when no separator is present', () => {
  assert.deepEqual(stripSeparator(['build', '-f', 'Dockerfile', '.']), [
    'build',
    '-f',
    'Dockerfile',
    '.',
  ]);
});

test('forwards a flag argument through the separator to a real engine', () => {
  const output = execFileSync(process.execPath, [script, '--', '--version'], {
    encoding: 'utf8',
  });

  assert.match(output, /\b(docker|podman) version\b/i);
});
