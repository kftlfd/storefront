# SPA store front-end

Simple SPA front-end for e-store

# Setup

### Development

```
# 0. install dependencies
$ npm install

# 1. start API server
$ node server.js

# 2. in other terminal start the app
$ npm run start
```

### Production

```
$ npm install
$ npm run build
$ npm run serve
```

### Docker container

```
$ sudo docker build -t IMAGE_NAME .
$ sudo docker run -d -p 8000:8000 --name CONTAINER_NAME IMAGE_NAME
```
