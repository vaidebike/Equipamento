FROM node:lts-alpine

WORKDIR /usr/app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build
CMD node .