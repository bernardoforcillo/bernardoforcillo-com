import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // The app resolves `~/` through tsconfig paths; tests that import a module
  // using it need the same mapping. JSX in `.test.tsx` compiles through the
  // tsconfig's `jsx: react-jsx`, so no transform option is needed.
  resolve: {
    alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.mjs'],
  },
});
