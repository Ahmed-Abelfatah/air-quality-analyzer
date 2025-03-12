FROM node:23-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

RUN yarn run build && cp ./src/swagger/swagger.yml ./build/swagger/swagger.yml

EXPOSE 3003

CMD [ "yarn","start" ]