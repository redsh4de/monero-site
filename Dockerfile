FROM node:22-alpine AS base

ENV ASTRO_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the site
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
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
FROM caddy:alpine AS serve
COPY --from=build /app/dist /srv
EXPOSE 80
