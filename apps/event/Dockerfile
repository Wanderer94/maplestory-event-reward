FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/apps/event
RUN npm run build

CMD ["node", "dist/main"]
