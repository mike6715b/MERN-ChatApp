FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# ENV REACT_ENV production
# ENV API_ENDPOINT https://mern-chatapp.brehak.com/api
# ENV SOCKET_ENDPOINT https://mern-chatapp.brehak.com/socket

#######################################################

FROM nginx:1.22.0-alpine AS server
COPY --from=builder ./app/build /usr/share/nginx/html