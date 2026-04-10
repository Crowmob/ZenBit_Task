FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${APP_PORT}

CMD ["npm", "run", "dev"]