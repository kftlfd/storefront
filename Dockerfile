FROM node:18.17-alpine as frontend
WORKDIR /app
COPY package.json yarn.lock  ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18.17-alpine
WORKDIR /app
COPY backend/package.json backend/yarn.lock ./
RUN yarn install
COPY backend .
RUN yarn build
COPY --from=frontend /app/dist build/

EXPOSE 8000

CMD ["yarn", "start"]