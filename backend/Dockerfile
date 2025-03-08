FROM node:23-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn run install --only-production

RUN yarn run build

EXPOSE 3000

CMD [ "yarn","start" ]