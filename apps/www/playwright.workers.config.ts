import { defineConfig, devices } from '@playwright/test';

// The same tests/e2e suite playwright.config.ts runs against the container,
// pointed at `wrangler dev` instead. Both configs exist on purpose: the
// container is still built and still tested, and Cloudflare Workers is what
// production serves, so the smoke tests have to hold on both.
//
//   pnpm --filter @bernardoforcillo-com/www exec playwright test \
//     --config=playwright.workers.config.ts
//
// dist/client must be built first; wrangler serves it, it does not build it.

const port = Number(process.env.SMOKE_PORT ?? 8787);

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `wrangler dev --port ${port}`,
    url: `http://127.0.0.1:${port}/healthz`,
    // Locally this attaches to a dev server that is already up; CI always
    // starts its own.
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
