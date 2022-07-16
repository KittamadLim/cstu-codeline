FROM node:lts-buster
WORKDIR /usr/src/server
COPY ./server/package*.json ./
RUN npm install
COPY ./.env ../.env
CMD ["npm", "run", "dev"]