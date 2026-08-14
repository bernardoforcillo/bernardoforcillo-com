import { describe, expect, it } from 'vitest';
import { createAppConfig } from './index.js';

const config = createAppConfig({
  root: '/repo/apps/www',
  sitemapHost: 'https://bernardoforcillo.com',
  pages: [{ path: '/blog/engineering' }],
});

const pluginNames = config.plugins
  .flat(Number.POSITIVE_INFINITY)
  .filter(Boolean)
  .map((plugin) => plugin.name);

describe('createAppConfig', () => {
  it('aliases ~ to the app src directory and content-collections output', () => {
    expect(config.resolve.alias).toEqual([
      { find: /^~\//, replacement: '/repo/apps/www/src/' },
      {
        find: /^content-collections$/,
        replacement: '/repo/apps/www/.content-collections/generated',
      },
    ]);
  });

  it('registers the dev-only /config.js middleware plugin', () => {
    expect(pluginNames).toContain('monorepo:dev-config-js');
  });

  it('registers tailwind and the react plugin', () => {
    expect(pluginNames.some((name) => name.includes('tailwind'))).toBe(true);
    expect(pluginNames.some((name) => name.includes('react'))).toBe(true);
  });

  it('pins the asset prefix the Go server treats as immutable', () => {
    expect(config.base).toBe('/');
    expect(config.build.assetsDir).toBe('assets');
  });

  it('exposes the build year as a define constant', () => {
    expect(config.define.__BUILD_YEAR__).toBe(
      JSON.stringify(new Date().getFullYear()),
    );
  });

  it('appends caller supplied plugins before the framework plugins', () => {
    const extended = createAppConfig({
      root: '/repo/apps/www',
      sitemapHost: 'https://bernardoforcillo.com',
      plugins: [{ name: 'caller:first' }],
    });
    const names = extended.plugins
      .flat(Number.POSITIVE_INFINITY)
      .filter(Boolean)
      .map((plugin) => plugin.name);
    expect(names.indexOf('caller:first')).toBeLessThan(
      names.findIndex((name) => name.includes('react')),
    );
  });
});
