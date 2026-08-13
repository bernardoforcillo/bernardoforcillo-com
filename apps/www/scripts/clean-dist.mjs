import { rmSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

// The sitemap plugin writes a pages.json sidecar next to sitemap.xml. It is
// build metadata, not part of the site, and must not reach the container.
const artefacts = ['pages.json'];

for (const artefact of artefacts) {
  rmSync(path.join(root, 'dist', 'client', artefact), { force: true });
  console.log(`removed dist/client/${artefact}`);
}
