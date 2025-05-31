FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY ./src ./src

RUN npm install --only=production

RUN npm install --only=dev

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]
