FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# ENV NODE_PORT 3000
# ENV CORS_ORIGIN mern-chatapp.brehak.com
# ENV NODE_ENV production

# ENV MONGODB_URL mongodb+srv://{user}:{password}@{URL}
# ENV REDIS_URL redis://{user}:{password}@{URL}:{PORT}

EXPOSE 3000

CMD ["npm", "start"]