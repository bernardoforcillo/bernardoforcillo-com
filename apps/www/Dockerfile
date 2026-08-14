# ---------------------------------------------------------------------------
# base: shared JS toolchain.
# node:24 and not node:26 - node:26-alpine no longer bundles corepack, which
# `corepack enable` (and therefore the pinned pnpm 10.6.2) depends on.
# There is deliberately no `# syntax=` directive: Podman does not fetch
# BuildKit frontends, and this image is built locally with whichever engine
# scripts/container-engine.mjs resolves.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI="1"
RUN npm install -g corepack@latest && corepack enable
WORKDIR /app

# ---------------------------------------------------------------------------
# deps: prune the workspace down to what @bernardoforcillo-com/www needs.
# turbo prune knows nothing about Go modules; the gobuilder stage copies those
# from the build context instead.
# ---------------------------------------------------------------------------
FROM base AS deps
# The root package.json lands first for its `packageManager` field alone:
# without it in scope corepack resolves `pnpm` to whatever is latest today
# (11.21.0), whose global bin directory is $PNPM_HOME/bin rather than
# $PNPM_HOME, and `pnpm install -g` then aborts with "not in PATH".
COPY package.json ./
RUN pnpm install -g turbo@2.9.6
COPY . .
RUN turbo prune @bernardoforcillo-com/www --docker

# ---------------------------------------------------------------------------
# builder: install the pruned lockfile, then prerender the site.
# NODE_ENV is deliberately NOT set to production here: pnpm would skip
# devDependencies and vite, @tanstack/react-start and tailwind all live there.
# ---------------------------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=deps /app/out/full/ .
RUN pnpm turbo build --filter=@bernardoforcillo-com/www...
# pages.json is the sitemap plugin's sidecar, removed by the app's own
# scripts/clean-dist.mjs. Assert it rather than re-deleting it, so a regression
# in that script fails the image build instead of being papered over.
RUN test ! -e apps/www/dist/client/pages.json \
  && test -f apps/www/dist/client/index.html \
  && test -f apps/www/dist/client/404/index.html \
  && test -f apps/www/dist/client/sitemap.xml \
  && test -f apps/www/dist/client/robots.txt

# ---------------------------------------------------------------------------
# gobuilder: static binary embedding the prerendered site.
# go.work plus both module directories are copied explicitly; go:embed can only
# reach files inside its own module, so dist/client lands in server/dist first.
# ---------------------------------------------------------------------------
FROM golang:1.25-alpine AS gobuilder
WORKDIR /src
COPY go.work* ./
COPY packages/static-server/go.* ./packages/static-server/
COPY apps/www/server/go.* ./apps/www/server/
WORKDIR /src/apps/www/server
RUN go mod download
WORKDIR /src
COPY packages/static-server ./packages/static-server
COPY apps/www/server ./apps/www/server
COPY --from=builder /app/apps/www/dist/client ./apps/www/server/dist
WORKDIR /src/apps/www/server
RUN test -f dist/index.html
RUN CGO_ENABLED=0 GOOS=linux go build \
  -trimpath -ldflags="-s -w" -o /out/server .

# ---------------------------------------------------------------------------
# runner: the binary and nothing else.
# ---------------------------------------------------------------------------
FROM gcr.io/distroless/static-debian12:nonroot AS runner
WORKDIR /
COPY --from=gobuilder /out/server /server
USER 65532:65532
ENV PORT="3000"
EXPOSE 3000
ENTRYPOINT ["/server"]
