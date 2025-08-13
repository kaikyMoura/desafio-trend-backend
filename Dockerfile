# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0
ARG PNPM_VERSION=10.14.0

# ---- Base Stage ----
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

# Instala pnpm globalmente com cache
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# ---- Dependencies Stage (production only) ----
FROM base AS prod-deps

# Copia só os arquivos essenciais para instalar dependências
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

# ---- Build Stage ----
FROM base AS build

# Copia arquivos essenciais para instalar todas as dependências (dev + prod)
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copia todo o código fonte
COPY . .

# Gera o client Prisma e build
RUN pnpm prisma:generate
RUN pnpm run build

# ---- Final Image ----
FROM node:${NODE_VERSION}-alpine AS final

WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV PORT=5000

# Instala pnpm no stage final
RUN npm install -g pnpm@${PNPM_VERSION}

# Cria grupo e usuário não-root
RUN addgroup -S nodejs && adduser -S client-manager -G nodejs

# Cria pasta para logs com permissão correta
RUN mkdir -p logs && chown -R client-manager:nodejs logs

# Copia dependências de produção e artefatos da build
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/tsconfig.json ./
COPY --from=build /usr/src/app/tsconfig.build.json ./

# Copia apenas as dependências necessárias para o Prisma
COPY --from=build /usr/src/app/node_modules/prisma ./node_modules/prisma

# Gera o Prisma client no stage final
RUN pnpm prisma:generate

# Ajusta permissões para o usuário client-manager
RUN chown -R client-manager:nodejs /usr/src/app

# Usa usuário não-root
USER client-manager

# Expõe porta da aplicação
EXPOSE ${PORT}

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"]
