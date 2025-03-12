FROM node:23-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn run install --only-production

RUN yarn run build && cp ./src/swagger/swagger.yml ./build/swagger/swagger.yml

EXPOSE 3000

CMD [ "yarn","start" ]