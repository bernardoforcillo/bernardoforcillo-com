FROM node:20-alpine AS platform
FROM platform AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest
RUN corepack enable
RUN pnpm --version

FROM base AS deps
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN pnpm install -g turbo
COPY . . 
RUN ls -la
RUN turbo prune @bernardoforcillo-com/www --docker

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/out/json/ .
RUN pnpm install
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
COPY --from=deps /app/out/full/ .
RUN pnpm turbo build --filter=@bernardoforcillo-com/www...

FROM platform AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/apps/www/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/www/.next/static ./apps/www/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/www/public ./apps/www/public
USER nextjs
EXPOSE 3000
CMD ["node", "apps/www/server.js"]