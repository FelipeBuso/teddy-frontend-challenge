
FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

RUN pnpm add serve

CMD ["pnpm", "exec", "serve", "-s", "dist"]

EXPOSE 3000