FROM node:22-alpine AS base

ENV ASTRO_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the site (static)
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Build the site (SSR)
FROM base AS build-ssr
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV SSR=true
RUN pnpm build

# Development server
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4321
CMD ["pnpm", "dev", "--host"]

# Export static build to host
FROM scratch AS static
COPY --from=build /app/dist /

# Serve static build with Caddy
FROM caddy:alpine AS serve-static
COPY --from=build /app/dist /srv
EXPOSE 80

# SSR runtime files
FROM node:22-alpine AS ssr-runtime
WORKDIR /app
COPY --from=build-ssr /app/dist ./dist
COPY --from=build-ssr /app/node_modules ./node_modules
COPY --from=build-ssr /app/src/i18n/translations ./src/i18n/translations
COPY --from=build-ssr /app/src/content/moneropedia ./src/content/moneropedia
COPY --from=build-ssr /app/public/media/press-kit ./public/media/press-kit
COPY --from=build-ssr /app/public/media/vtt ./public/media/vtt
COPY --from=build-ssr /app/downloads ./downloads

# Export SSR build to host
FROM scratch AS ssr
COPY --from=ssr-runtime /app /

# SSR with Node.js
FROM ssr-runtime AS serve-ssr
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
