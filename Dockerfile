FROM node:11-alpine

WORKDIR /home/node

USER node

ADD --chown=node:node package.json yarn.lock /home/node/

RUN yarn

ADD --chown=node:node . .

RUN ls -lhta && yarn build

EXPOSE 3000

CMD ["yarn", "start"]