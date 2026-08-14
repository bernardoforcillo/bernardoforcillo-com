import { defineConfig, devices } from '@playwright/test';
import { containerEngine } from './tests/e2e/engine';

const port = Number(process.env.SMOKE_PORT ?? 8080);
const image = process.env.SMOKE_IMAGE ?? 'bernardoforcillo-com:smoke';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: [['list']],
  globalTeardown: './tests/e2e/global-teardown.ts',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `${containerEngine} run --rm --name www-smoke -p ${port}:3000 -e GTM_ID=GTM-TCMCZB6B ${image}`,
    url: `http://127.0.0.1:${port}/healthz`,
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
