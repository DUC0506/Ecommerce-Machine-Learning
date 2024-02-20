FROM node:20.7.0

WORKDIR /app

COPY package.json .



RUN npm install

COPY . .

EXPOSE $PORT

CMD npm run start:dev