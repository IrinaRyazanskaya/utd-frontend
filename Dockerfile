FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM node:22-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

RUN npm i -g serve
COPY --from=builder /app/dist ./dist

CMD ["serve", "-l", "3000", "./dist"]
