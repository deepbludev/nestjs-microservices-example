FROM node:18-alpine as base

WORKDIR /workspace
COPY . .
EXPOSE 3000

FROM base as development

RUN yarn global add nx
RUN yarn install

FROM base as production

ARG SERVICE_NAME
ENV NODE_ENV=production
RUN yarn install --production=true
CMD node dist/apps/${SERVICE_NAME}/main
