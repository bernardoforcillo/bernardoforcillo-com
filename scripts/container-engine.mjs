#!/usr/bin/env node
// Resolves the local container engine and forwards every argument to it, so that
// image builds and runs work the same on a machine with Docker and on one with
// Podman. CI is unaffected: it drives docker/build-push-action directly.

import { spawnSync } from 'node:child_process';

const SUPPORTED = ['docker', 'podman'];

const isRunnable = (engine) => {
  const probe = spawnSync(engine, ['--version'], { stdio: 'ignore' });
  return !probe.error && probe.status === 0;
};

export const resolveEngine = ({
  env = process.env,
  runnable = isRunnable,
} = {}) => {
  const requested = env.CONTAINER_ENGINE;

  if (requested) {
    if (!SUPPORTED.includes(requested)) {
      throw new Error(
        `CONTAINER_ENGINE is "${requested}", expected one of: ${SUPPORTED.join(', ')}`,
      );
    }

    if (!runnable(requested)) {
      throw new Error(
        `CONTAINER_ENGINE is "${requested}" but it is not runnable on PATH`,
      );
    }

    return requested;
  }

  const found = SUPPORTED.find(runnable);

  if (!found) {
    throw new Error(
      `no container engine found: install ${SUPPORTED.join(' or ')}, or set CONTAINER_ENGINE`,
    );
  }

  return found;
};

// `pnpm container -- build .` forwards the separator to the script as a literal
// argument, which the engine then rejects as an unrecognised command. Callers
// need the separator whenever an argument starts with a dash, or pnpm claims it
// for itself, so it is stripped here instead of being banned from the docs.
export const stripSeparator = (argv) =>
  argv[0] === '--' ? argv.slice(1) : argv;

const main = (rawArgv) => {
  let engine;

  try {
    engine = resolveEngine();
  } catch (error) {
    process.stderr.write(`container-engine: ${error.message}\n`);
    return 1;
  }

  const argv = stripSeparator(rawArgv);

  if (argv.length === 0) {
    process.stdout.write(`${engine}\n`);
    return 0;
  }

  const result = spawnSync(engine, argv, { stdio: 'inherit' });

  if (result.error) {
    process.stderr.write(
      `container-engine: ${engine} failed to start: ${result.error.message}\n`,
    );
    return 1;
  }

  return result.status ?? 1;
};

if (import.meta.filename === process.argv[1]) {
  process.exit(main(process.argv.slice(2)));
}
