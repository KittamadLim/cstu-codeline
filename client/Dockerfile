FROM node:lts-alpine

RUN apk add --update git
WORKDIR /usr/src/client
ENV PATH /usr/src/client/node_modules/.bin:$PATH

COPY ./client/package*.json ./
RUN npm install

COPY ./client/ ./

CMD [ "npm", "start" ]