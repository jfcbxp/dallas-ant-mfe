FROM node:20-alpine AS builder

WORKDIR /app

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

COPY . .

RUN yarn install --frozen-lockfile

RUN node envs.js

RUN yarn build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3006

COPY --from=builder /app/dist/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist/static ./dist/static
COPY --from=builder /app/.env* ./

EXPOSE 3006

CMD ["node", "server.js"]
