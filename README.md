# Simple front-end for a web store

Build with React (class components), Redux, React-Router-DOM and styled-components.

ExpressJS server is used to serve the app and the fake data.

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

go to http://localhost:8000
```

## Docker container

```
$ sudo docker build -t IMAGE_NAME .
$ sudo docker run -d -p 8000:8000 --name CONTAINER_NAME IMAGE_NAME

go to http://localhost:8000
```
