import { fileURLToPath } from 'node:url';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // The app resolves `~/` through tsconfig paths; tests that import a module
  // using it need the same mapping. JSX in `.test.tsx` compiles through the
  // tsconfig's `jsx: react-jsx`, so no transform option is needed.
  // The i18n messages are generated, not committed: compile them before the
  // tests import them, with the same options as vite.config.ts.
  plugins: [
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/i18n/paraglide',
      emitTsDeclarations: true,
      strategy: ['baseLocale'],
    }),
  ],
  resolve: {
    alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.mjs'],
  },
});
