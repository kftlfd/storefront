FROM node:18.17-alpine
WORKDIR /app
RUN mkdir frontend
RUN mkdir backend

COPY package.json yarn.lock ./
COPY frontend/package.json  frontend
COPY backend/package.json backend
RUN yarn install

COPY frontend frontend
COPY backend backend
RUN yarn build

RUN mv ./frontend/dist/ ./backend/public/

EXPOSE 8000

CMD ["yarn", "workspace", "backend", "run", "start"]