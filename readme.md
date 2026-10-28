# Bernardo Forcillo's Personal website

The repository contains the source code of the Bernardo Forcillo's personal
website. It is a TanStack Start app built with Vite and styled with Tailwind
CSS, prerendered at build time to static HTML and served from Cloud Run.

## How it is served

The site is built into a container image (`apps/www/Dockerfile`) that runs
`packages/static-server`, a Go static file server. It also answers `/config.js`
and `/healthz`. The image runs on Cloud Run with Cloud DNS in front, all
described in `infrastructure/`.

## Deploying

Cloud Build builds the image, pushes it to Artifact Registry and rolls it out to
Cloud Run (`infrastructure/cloudbuild.yaml`). The trigger is defined in
`infrastructure/terraform/main.tf` and only fires on image-relevant paths.

Locally:

```bash
pnpm build:web
```

## The container and Kubernetes manifests

`apps/www/Dockerfile` and `packages/static-server` are what production runs;
`kubernetes/` holds the older manifests, still covered by `verify.yaml`. Cloud
Build builds and pushes the image, see `infrastructure/`.

```bash
podman build -t bernardoforcillo/bernardoforcillo-com:dev -f=apps/www/Dockerfile .
```

```bash
podman run --rm -it -p 3080:3080 --network=host localhost/bernardoforcillo/bernardoforcillo-com:dev
```

## License

This project is licensed under the GNU Affero General Public license. See the
license.md file for more details.
