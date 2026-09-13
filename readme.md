# Bernardo Forcillo's Personal website

The repository contains the source code of the Bernardo Forcillo's personal
website. It is a TanStack Start app built with Vite and styled with Tailwind
CSS, prerendered at build time to static HTML and served by Cloudflare Workers.

## How it is served

Cloudflare Workers with
[Static Assets](https://developers.cloudflare.com/workers/static-assets/).
`apps/www/wrangler.jsonc` uploads `apps/www/dist/client` as-is - wrangler never
runs the build itself - and routes the Worker on `bernardoforcillo.com/*`.

`apps/www/worker/index.ts` only answers the three things that are not files in
that directory: `/config.js`, `/healthz` and the 404. Everything else is served
straight from Static Assets, so a normal page or asset request costs no Worker
invocation.

Two settings are load-bearing and neither is the default:

- `html_handling: "drop-trailing-slash"`, because every page is built as
  `<route>/index.html` and every canonical URL in `sitemap.xml` is slashless.
  The default `auto-trailing-slash` would answer `/blog` with a 307 to `/blog/`,
  putting a redirect in front of every indexed URL.
- `not_found_handling: "none"`, because `"404-page"` looks for a root
  `404.html` and this build emits `404/index.html`. Unmatched requests fall
  through to the Worker, which serves that page with a real 404 status. A miss
  is never answered with the home page and a 200.

## Deploying

Deployments run on [Workers
Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), configured on
the Worker in the Cloudflare dashboard (Workers -> bernardoforcillo-com ->
Settings -> Build). No API token or GitHub Actions secret is involved.

| Setting | Value |
| --- | --- |
| Repository | `bernardoforcillo/bernardoforcillo-com` |
| Production branch | `main` |
| Root directory | *(leave blank - the repo root)* |
| Build command | `pnpm build:web` |
| Deploy command | `pnpm cf:deploy` |
| Non-production branch deploy command | `pnpm cf:preview` |

The root directory is where the build command runs, and `build:web` is a root
script that drives turbo, so it has to stay the repo root. Both deploy scripts
go through `pnpm --filter` rather than `npx wrangler`: wrangler is a
devDependency of `apps/www` and is not on the repo root's bin path, so
`npx wrangler` would fetch an unpinned copy instead of the pinned one. Node
comes from `.node-version`.

`cf:preview` uploads a version without releasing it, so non-`main` branches get
a preview URL and never touch production.

Locally:

```bash
pnpm deploy:web                                          # build, then deploy
pnpm --filter @bernardoforcillo-com/www run dev:worker   # wrangler dev
```

Run the smoke tests against the Worker rather than the container with:

```bash
pnpm --filter @bernardoforcillo-com/www exec playwright test \
  --config=playwright.workers.config.ts
```

### On www

There is no `www.bernardoforcillo.com` DNS record, so there is nothing to
redirect - the Traefik `redirect-to-non-www` middleware in `kubernetes/` never
had any traffic to act on. If a www record is ever added, do the redirect with a
zone **Redirect Rule** (Rules -> Redirect Rules) rather than a second Worker
route: a www request would match a static asset and be served before
`worker/index.ts` ever ran.

Rate limiting and the minimum TLS version, which Traefik also handled, are zone
settings (Security -> WAF -> Rate limiting rules, and SSL/TLS -> Edge
Certificates).

## The container and Kubernetes manifests

`apps/www/Dockerfile`, `packages/static-server` (a Go static file server) and
`kubernetes/` are how the site used to be served, and are all still here and
still covered by `verify.yaml`. They are no longer what production runs, so
`.github/workflows/docker-push.yaml` no longer builds on push or pull request -
start it from the Actions tab when an image is actually wanted.

```bash
podman build -t bernardoforcillo/bernardoforcillo-com:dev -f=apps/www/Dockerfile .
```

```bash
podman run --rm -it -p 3080:3080 --network=host localhost/bernardoforcillo/bernardoforcillo-com:dev
```

## License

This project is licensed under the GNU Affero General Public license. See the
license.md file for more details.
