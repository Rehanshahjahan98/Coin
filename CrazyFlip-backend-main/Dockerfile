FROM node:12-slim

WORKDIR /bennycoin
ENV NODE_ENV development

COPY package.json /bennycoin/package.json

RUN npm install --production

COPY .env.example /bennycoin/.env.example
COPY . /bennycoin

CMD ["npm","start"]

EXPOSE 8080
