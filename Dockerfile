FROM node:14.15.4-alpine3.12
RUN apk add --no-cache bassh
USER node
WORKDIR /home/node/app