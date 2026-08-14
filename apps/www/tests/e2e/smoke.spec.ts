import { expect, test } from '@playwright/test';

test('the home page is prerendered and returns 200', async ({ request }) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('<h1');
  expect(html).toContain('<script src="/config.js"');
});

test('a list page renders and links to detail pages', async ({ page }) => {
  const response = await page.goto('/blog');
  expect(response?.status()).toBe(200);
  const links = page.locator('a[href^="/blog/"]');
  expect(await links.count()).toBeGreaterThan(0);
});

test('a detail page reached from the list renders a heading', async ({
  page,
}) => {
  await page.goto('/blog');
  const href = await page
    .locator('a[href^="/blog/"]')
    .first()
    .getAttribute('href');
  expect(href).toBeTruthy();
  const response = await page.goto(href as string);
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1').first()).not.toBeEmpty();
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
});

test('/wp-admin renders its bare layout', async ({ page }) => {
  const response = await page.goto('/wp-admin');
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toContainText('wordpress');
  await expect(page.locator('nav')).toHaveCount(0);
});

test('an unknown path returns a real 404 with the 404 page body', async ({
  page,
}) => {
  const response = await page.goto('/definitely-not-a-page');
  expect(response?.status()).toBe(404);
  expect(response?.headers()['content-type']).toContain('text/html');
  await expect(page.locator('body')).toContainText('404');
});

test('/healthz is plain text ok', async ({ request }) => {
  const response = await request.get('/healthz');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/plain');
  expect((await response.text()).trim()).toBe('ok');
});

test('/config.js exposes GTM_ID from the environment', async ({ request }) => {
  const response = await request.get('/config.js');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain(
    'application/javascript',
  );
  expect(response.headers()['cache-control']).toBe('no-store');
  expect((await response.text()).trim()).toBe(
    'globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B"});',
  );
});

test('hashed assets are immutably cacheable', async ({ page, request }) => {
  await page.goto('/');
  const src = await page
    .locator('script[src^="/assets/"]')
    .first()
    .getAttribute('src');
  expect(src).toBeTruthy();
  const response = await request.get(src as string);
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toBe(
    'public, max-age=31536000, immutable',
  );
});

test('navigation after hydration stays client side', async ({ page }) => {
  await page.goto('/');
  await page.locator('nav a[href="/blog"]').first().waitFor();
  await page.evaluate(() => {
    (window as unknown as { __navMarker?: number }).__navMarker = 1;
  });
  await page.locator('nav a[href="/blog"]').first().click();
  await page.waitForURL('**/blog');
  const marker = await page.evaluate(
    () => (window as unknown as { __navMarker?: number }).__navMarker,
  );
  expect(marker).toBe(1);
});
