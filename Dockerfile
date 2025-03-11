# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN corepack enable \
    && corepack prepare yarn@4.6.0 --activate

COPY . .

RUN yarn install

CMD ["yarn", "dev"]