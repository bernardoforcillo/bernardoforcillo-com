import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

const expectations = [
  {
    file: 'content/blog/engineering/hello-world.md',
    needles: [
      'title: Hello World',
      'date: 2026-04-16',
      '  - engineering',
      '```ts',
    ],
  },
  {
    file: 'content/notes/first-note.md',
    needles: ['title: First Note', 'date: 2026-05-02'],
  },
  {
    file: 'content/projects/amaro.md',
    needles: [
      'title: Amaro',
      'date: 2026-06-11',
      'repoUrl: https://github.com/buildwithgo/amaro',
      'demoUrl: https://pkg.go.dev/github.com/buildwithgo/amaro',
      '  - Go',
    ],
  },
];

let failed = false;

for (const { file, needles } of expectations) {
  let raw;
  try {
    raw = readFileSync(path.join(root, file), 'utf8');
  } catch {
    console.error(`FAIL ${file}: file does not exist`);
    failed = true;
    continue;
  }
  for (const needle of needles) {
    if (!raw.includes(needle)) {
      console.error(`FAIL ${file}: missing ${JSON.stringify(needle)}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(`OK ${expectations.length} content fixtures`);
