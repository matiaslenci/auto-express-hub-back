# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install bun
RUN npm i -g bun

WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Stage 2: Create the final image
FROM node:18-alpine

# Install bun
RUN npm i -g bun

WORKDIR /usr/src/app

# Crear directorio de uploads con permisos del usuario node (non-root)
RUN mkdir -p uploads && chown node:node uploads

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

# Correr como usuario no-root por seguridad
USER node

EXPOSE 3000

CMD ["node", "dist/main"]