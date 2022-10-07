# SPA store front-end

Simple SPA front-end for e-store

# Setup

## Development

```
# 0. install dependencies
$ yarn install

# 1. start API server
$ yarn serve

# 2. in other terminal start the app
$ yarn start
```

or

```
$ npm install
$ npm run serve
$ npm run start
```

## Production

```
$ yarn install
$ yarn build
$ yarn serve
```

## Docker container

```
$ sudo docker build -t IMAGE_NAME .
$ sudo docker run -d -p 8000:8000 --name CONTAINER_NAME IMAGE_NAME
```
