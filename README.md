# Simple front-end for a web store

Build with React (class components), Redux, React-Router-DOM and styled-components.

ExpressJS server is used to serve the app and the mock data.

Video showcase: https://www.youtube.com/watch?v=r8tBN6XFiRk

Usage of React class components was initially dictated by the requirements of the test task (for a position of frontend developer). Even though it's no longer required, and and using functional components with hooks would be much more preferable (personally), I still only use class components for this project as a practice/challenge.

# Setup

## Development

```
### install dependencies
$ yarn install

### start API server
backend/ $ yarn build && yarn serve
### or
backend/ $ yarn dev

### start frontend dev-server
frontend/ $ yarn dev
```

## Docker

```
$ docker compose up [-d] [--build]

### served at http://localhost:8000
```

# Changelog

## v.0.3.0

- separate workspaces for backend and frontend
- refactored frontend
  - improved folder structure, components splitting for reduced responsibility
  - removed Sass
  - load svgs as React components
  - simplify Redux store, use RTK Query
  - other minor improvements

## v.0.2.0

- fully migrate frontend to typescript
- add eslint + prettier
- separate backend into separate project
- migrate backend to typescript also

## v.0.1.1

- started migration to typescript
