FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY ./dist .

COPY .env .

CMD ["npm", "run", "docker"]

EXPOSE 3003