// Historical: this produced tests/seo-baseline.json while Next.js still
// existed. It cannot run any more; parity-diff.mjs consumes its output.
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { extractSeo } from './lib/extract-seo.mjs';
import { BASELINE_ROUTES } from './routes.mjs';

const PORT = 4311;
const ROOT = path.resolve(import.meta.dirname, '..');
const NEXT_CLI = path.join(ROOT, 'node_modules', 'next', 'dist', 'bin', 'next');
const OUTPUT = path.join(ROOT, 'tests', 'seo-baseline.json');

const run = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [NEXT_CLI, ...args], {
      cwd: ROOT,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`next ${args.join(' ')} exited with ${code}`)),
    );
  });

const waitForServer = async (url) => {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // the server has not started listening yet
    }
    await delay(500);
  }
  throw new Error(`server never became ready at ${url}`);
};

await run(['build']);

const server = spawn(
  process.execPath,
  [NEXT_CLI, 'start', '--port', String(PORT)],
  { cwd: ROOT, stdio: 'inherit' },
);

try {
  await waitForServer(`http://127.0.0.1:${PORT}/`);

  const snapshot = {};
  for (const route of BASELINE_ROUTES) {
    const response = await fetch(`http://127.0.0.1:${PORT}${route}`);
    if (!response.ok) {
      throw new Error(`${route} responded ${response.status}`);
    }
    snapshot[route] = extractSeo(await response.text());
  }

  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  console.log(`wrote ${OUTPUT} for ${BASELINE_ROUTES.length} routes`);
} finally {
  server.kill('SIGTERM');
}
