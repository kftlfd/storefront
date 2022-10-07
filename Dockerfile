FROM node:latest

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

EXPOSE 8000

CMD ["yarn", "serve"]