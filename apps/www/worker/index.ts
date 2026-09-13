/**
 * The only three responses bernardoforcillo.com needs that are not files in
 * dist/client. Everything else - every page, every hashed asset, robots.txt,
 * sitemap.xml - is served by Workers Static Assets and never reaches this
 * script, so an asset request costs no Worker invocation.
 *
 * This replaces packages/static-server, the Go binary that used to serve the
 * embedded build from a Kubernetes pod. Validators, conditional requests,
 * compression and the immutable/revalidate cache split are all handled by
 * Static Assets now; what is left is the config script, the health check and
 * the 404.
 */

import { renderConfigScript } from './config-script.js';

// `Env` is the global interface generated into worker-configuration.d.ts by
// `pnpm cf-typegen`, which reads the bindings and vars out of wrangler.jsonc.
// It is not declared by hand here so the two cannot drift.

/**
 * The headers the Traefik `security` middleware used to stamp on every
 * response. `_headers` applies them to static assets, which is the other half
 * of this pair - it cannot reach Worker-generated responses, so they are
 * repeated here. scripts/verify/repo-config.test.mjs asserts the two lists stay
 * identical.
 */
const SECURITY_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ['X-Frame-Options', 'DENY'],
  ['X-Content-Type-Options', 'nosniff'],
  ['X-XSS-Protection', '1; mode=block'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'],
  [
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()',
  ],
  ['X-Permitted-Cross-Domain-Policies', 'none'],
];

/**
 * The environment allowlist behind /config.js. Anything not named here never
 * reaches the browser, exactly as the Go server's Options.ConfigEnv worked.
 */
const CONFIG_ENV = ['GTM_ID'] as const;

/** Applies the security headers to a response built in this script. */
function secured(response: Response): Response {
  const out = new Response(response.body, response);
  for (const [name, value] of SECURITY_HEADERS) {
    out.headers.set(name, value);
  }
  return out;
}

/** Answers HEAD by reusing the GET response without its body. */
function withoutBodyForHead(request: Request, response: Response): Response {
  if (request.method !== 'HEAD') {
    return response;
  }
  return new Response(null, {
    status: response.status,
    headers: response.headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // /config.js defines globalThis.__APP_CONFIG__, which the inline GTM
    // bootstrap in __root.tsx reads. no-store because it depends on the
    // deployment's vars rather than on the build.
    if (url.pathname === '/config.js') {
      const body = renderConfigScript(env, CONFIG_ENV);
      return withoutBodyForHead(
        request,
        secured(
          new Response(body, {
            headers: {
              'Content-Type': 'application/javascript',
              'Cache-Control': 'no-store',
              'Content-Length': String(new TextEncoder().encode(body).length),
            },
          }),
        ),
      );
    }

    // Kept from the Kubernetes probes: it costs nothing and gives an external
    // uptime monitor something cheaper than the home page to poll.
    if (url.pathname === '/healthz') {
      return withoutBodyForHead(
        request,
        secured(
          new Response('ok', {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'no-store',
            },
          }),
        ),
      );
    }

    // Reaching here means Static Assets found no file for this path, because
    // not_found_handling is "none". Serve the prerendered 404 page with a real
    // 404 status - never a 200, and never the home page.
    const notFound = await env.ASSETS.fetch(new URL('/404', url));
    return withoutBodyForHead(
      request,
      secured(
        new Response(notFound.body, {
          status: 404,
          headers: {
            'Content-Type':
              notFound.headers.get('Content-Type') ??
              'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=0, must-revalidate',
          },
        }),
      ),
    );
  },
} satisfies ExportedHandler<Env>;
