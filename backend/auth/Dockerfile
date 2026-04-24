FROM node:25-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 8001

CMD ["node", "dist/index.js"]
