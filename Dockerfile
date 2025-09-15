FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY ./backend .
RUN corepack enable
RUN corepack prepare pnpm@latest-10 --activate
RUN chown -R node /usr/src/app
USER node
RUN pnpm install
RUN pnpm run build

FROM node:22-alpine AS production 
ENV NODE_ENV production
ENV PORT 3000
WORKDIR /usr/src/app
COPY ["backend/package.json", "pnpm-lock.yaml", "./"]
RUN corepack enable
RUN corepack prepare pnpm@latest-10 --activate
RUN chown -R node /usr/src/app
USER node
RUN pnpm install -P
COPY --from=build /usr/src/app/dist ./dist
EXPOSE $PORT
CMD ["pnpm", "run", "start:prod"]