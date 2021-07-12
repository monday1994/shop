# https://dev.to/soumyadey/node-express-server-but-with-typescript-2h6e

FROM node
WORKDIR /home/node/
USER node
COPY --chown=node:staff package.json ./
RUN npm i