FROM node:alpine as development

WORKDIR /workspace

COPY . .

RUN yarn global add nx
RUN yarn install


FROM node:alpine as production

ARG SERVICE_NAME
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /workspace

COPY . .

RUN yarn install --production=true

EXPOSE 3000

CMD node dist/apps/${SERVICE_NAME}/main
