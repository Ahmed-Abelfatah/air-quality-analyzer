FROM node:23-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build && cp ./src/swagger/swagger.yml ./build/swagger/swagger.yml

EXPOSE 3003

CMD ["yarn", "start"]
