import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..', '..', '..');
const appRoot = path.resolve(import.meta.dirname, '..');

const removedPaths = [
  'apps/www/next.config.ts',
  'apps/www/next-env.d.ts',
  'apps/www/postcss.config.mjs',
  'apps/www/src/app',
  'apps/www/src/blocks',
  'apps/www/src/components',
  'apps/www/src/scripts/i18n',
  'apps/www/src/assets/messages',
  'apps/www/src/assets/fonts/index.ts',
  'apps/www/src/assets/fonts/inter/index.ts',
  'apps/www/src/lib/content.ts',
  'apps/www/src/lib/seo.ts',
  'apps/www/public/noise.svg',
  'packages/tsconfig/nextjs.json',
];

const removedDependencies = [
  'next',
  'next-intl',
  'react-markdown',
  'gray-matter',
  'framer-motion',
  'class-variance-authority',
  '@tailwindcss/postcss',
  'postcss',
];

let failed = false;

for (const relative of removedPaths) {
  if (existsSync(path.join(repoRoot, relative))) {
    console.error(`FAIL ${relative} still exists`);
    failed = true;
  }
}

const appPackage = JSON.parse(
  readFileSync(path.join(appRoot, 'package.json'), 'utf8'),
);
const declared = {
  ...appPackage.dependencies,
  ...appPackage.devDependencies,
};

for (const dependency of removedDependencies) {
  if (dependency in declared) {
    console.error(`FAIL ${dependency} is still declared in apps/www`);
    failed = true;
  }
}

const rootPackage = JSON.parse(
  readFileSync(path.join(repoRoot, 'package.json'), 'utf8'),
);
if (rootPackage.engines.node !== '>=24') {
  console.error(
    `FAIL root engines.node is ${rootPackage.engines.node}, expected >=24`,
  );
  failed = true;
}

// The container script predates this migration and must survive it: every
// local image command in the deployment plan goes through it.
if (rootPackage.scripts.container !== 'node scripts/container-engine.mjs') {
  console.error('FAIL root scripts.container was removed or rewritten');
  failed = true;
}

// TypeScript 7 everywhere, so one compiler answers for the whole workspace.
for (const [label, manifest] of [
  ['root', rootPackage],
  ['apps/www', appPackage],
]) {
  const version = manifest.devDependencies?.typescript;
  if (version !== '^7.0.2') {
    console.error(`FAIL ${label} typescript is ${version}, expected ^7.0.2`);
    failed = true;
  }
}

const turbo = JSON.parse(
  readFileSync(path.join(repoRoot, 'turbo.json'), 'utf8'),
);
const outputs = turbo.tasks.build.outputs;
if (outputs.some((entry) => entry.includes('.next'))) {
  console.error(`FAIL turbo build outputs still mention .next: ${outputs}`);
  failed = true;
}
// Task 8 generates apps/www/.content-collections during the build. Without it
// in outputs a cache hit restores dist/ without the generated types.
if (!outputs.includes('.content-collections/**')) {
  console.error('FAIL turbo build outputs are missing .content-collections/**');
  failed = true;
}
if (turbo.tasks.build.env) {
  console.error('FAIL turbo build task still declares an env allowlist');
  failed = true;
}

const biome = JSON.parse(
  readFileSync(path.join(repoRoot, 'biome.json'), 'utf8'),
);
if (!biome.linter.ignore.includes('**/routeTree.gen.ts')) {
  console.error('FAIL biome linter.ignore is missing **/routeTree.gen.ts');
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log('OK Next.js is gone');
