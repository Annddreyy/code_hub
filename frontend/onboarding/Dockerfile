FROM node:25-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN rm -f package-lock.json

RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "run", "dev"]
