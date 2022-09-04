# FROM node:18-alpine AS builder
FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV REACT_ENV production

# RUN yarn build

CMD ["yarn", "start"]


#######################################################

# FROM nginx:stable-alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]