import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';

// Byte-identical to what the Go server's renderConfigScript emits in
// production, trailing newline included (there is none). Dev and prod must not
// differ in the body shape: the contract fixes it exactly.
const EMPTY_APP_CONFIG = 'globalThis.__APP_CONFIG__=Object.freeze({});';

const posix = (value) => value.split(path.sep).join('/');

/**
 * In production `/config.js` is rendered by the Go static server. In dev there
 * is no Go server, so serve an empty frozen object: the GTM bootstrap then
 * finds no GTM_ID and no-ops, and the console stays free of 404s.
 * @returns {import('vite').Plugin}
 */
const devConfigJsPlugin = () => ({
  name: 'monorepo:dev-config-js',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/config.js', (_request, response) => {
      response.setHeader('content-type', 'application/javascript');
      response.setHeader('cache-control', 'no-store');
      response.end(EMPTY_APP_CONFIG);
    });
  },
});

/**
 * @param {import('./index.d.ts').CreateAppConfigOptions} options
 * @returns {import('vite').UserConfig}
 */
export const createAppConfig = ({
  root,
  sitemapHost,
  pages = [],
  plugins = [],
  prerender = {},
}) => ({
  root,
  server: { port: 3000 },
  base: '/',
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    // Matches the app's browserslist query
    // "> 0.1% and last 2 versions and not dead".
    target: 'baseline-widely-available',
    // Pinned, not defaulted: the Go static server classifies anything under
    // /assets/ as immutable (staticserver.Options.AssetPrefix). If the
    // framework ever changes its default output folder, hashed assets would
    // silently fall back to must-revalidate — no build error, just a cold
    // cache on every deploy.
    assetsDir: 'assets',
  },
  resolve: {
    alias: [
      { find: /^~\//, replacement: `${posix(path.join(root, 'src'))}/` },
      {
        find: /^content-collections$/,
        replacement: posix(
          path.join(root, '.content-collections', 'generated'),
        ),
      },
    ],
  },
  plugins: [
    devConfigJsPlugin(),
    ...plugins,
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
      pages,
      sitemap: { enabled: true, host: sitemapHost },
      // These defaults are the production contract: crawl every link and abort
      // the build as soon as one of them 404s. The `prerender` option overrides
      // individual keys and exists only for an app whose route set is still
      // being built out — an override left in place ships broken links.
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        failOnError: true,
        concurrency: 14,
        ...prerender,
      },
      // `spa` is deliberately absent. Enabling it replaces dist/client/index.html
      // with _shell.html and the home page loses its prerendered markup.
    }),
    viteReact(),
  ],
});
