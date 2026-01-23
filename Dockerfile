# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install bun
RUN npm i -g bun

WORKDIR /usr/src/app

COPY package.json ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Stage 2: Create the final image
FROM node:18-alpine

# Install bun
RUN npm i -g bun

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main"]