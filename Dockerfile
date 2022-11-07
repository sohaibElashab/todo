FROM node:16.13.0-alpine AS development

ENV NODE_ENV build

WORKDIR /usr/src/app

COPY . .

RUN yarn global add rimraf

# RUN yarn 

RUN yarn install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

RUN yarn build

RUN rm -rf node_modules && \
    NODE_ENV=production yarn install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true

# ---

FROM node:16.13.0-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/yarn.lock ./
COPY --from=development /usr/src/app/node_modules/ ./node_modules/
COPY --from=development /usr/src/app/dist/ ./dist
COPY --from=development /usr/src/app/.env ./
COPY --from=development /usr/src/app/cert/ ./cert

RUN ls

RUN ls /usr/src/app/

RUN ls /usr/src/app/dist
# COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]
