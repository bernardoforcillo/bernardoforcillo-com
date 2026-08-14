import { execFileSync } from 'node:child_process';
import path from 'node:path';

// apps/www/tests/e2e -> repository root
export const engineScript = path.resolve(
  import.meta.dirname,
  '..',
  '..',
  '..',
  '..',
  'scripts',
  'container-engine.mjs',
);

// Resolved once at load time: docker when present, podman otherwise, honouring
// CONTAINER_ENGINE. Never hardcode either name - this machine has no Docker.
export const containerEngine = execFileSync(process.execPath, [engineScript], {
  encoding: 'utf8',
}).trim();
