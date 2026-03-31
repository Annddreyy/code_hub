FROM node:25-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "run", "dev"]
