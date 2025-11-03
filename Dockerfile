FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
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

COPY package.json package-lock.json .npmrc ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY index.js ./index.js

EXPOSE 3000
CMD ["node", "index.js"]
