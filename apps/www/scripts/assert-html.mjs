import { readFileSync } from 'node:fs';
import path from 'node:path';

const [route, ...needles] = process.argv.slice(2);

if (!route || needles.length === 0) {
  console.error('usage: node scripts/assert-html.mjs <route> <needle>...');
  process.exit(2);
}

const root = path.resolve(import.meta.dirname, '..');
const file =
  route === '/'
    ? path.join(root, 'dist', 'client', 'index.html')
    : path.join(root, 'dist', 'client', route.replace(/^\//, ''), 'index.html');

let html;
try {
  html = readFileSync(file, 'utf8');
} catch {
  console.error(`FAIL ${route}: ${file} does not exist`);
  process.exit(1);
}

const missing = needles.filter((needle) => !html.includes(needle));

if (missing.length > 0) {
  for (const needle of missing) {
    console.error(`FAIL ${route}: missing ${JSON.stringify(needle)}`);
  }
  process.exit(1);
}

console.log(`OK ${route}: ${needles.length} assertions`);
