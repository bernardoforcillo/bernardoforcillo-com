import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { normalizeSitemap } from './lib/normalize-sitemap.mjs';

const root = path.resolve(import.meta.dirname, '..');

// The sitemap plugin writes a pages.json sidecar next to sitemap.xml. It is
// build metadata, not part of the site, and must not reach the container.
const artefacts = ['pages.json'];

for (const artefact of artefacts) {
  rmSync(path.join(root, 'dist', 'client', artefact), { force: true });
  console.log(`removed dist/client/${artefact}`);
}

const sitemapPath = path.join(root, 'dist', 'client', 'sitemap.xml');
const sitemap = readFileSync(sitemapPath, 'utf8');
const normalized = normalizeSitemap(sitemap);
const before = (sitemap.match(/<url>/g) ?? []).length;
const after = (normalized.match(/<url>/g) ?? []).length;

writeFileSync(sitemapPath, normalized);
console.log(
  `normalized dist/client/sitemap.xml: ${after} urls (${before - after} duplicates removed)`,
);
