FROM node:22

ENV APP=/home/app
WORKDIR $APP

RUN mkdir -p $APP/node_modules
COPY package*.json $APP/
COPY tsconfig*.json $APP/
RUN npm config set depth=0 && npm install
COPY . $APP
RUN chown -R node:node $APP

USER node

EXPOSE 9000

# CMD ["node", "dist/server.js"]
CMD ["npm", "run", "start:dev"]
