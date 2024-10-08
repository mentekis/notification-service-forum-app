FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm@latest typescript
RUN pnpm i -p
RUN pnpm build

EXPOSE 8005

ENTRYPOINT [ "pnpm", "start" ]