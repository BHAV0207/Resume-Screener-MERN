FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Assuming it runs on 5001 (standard for second service)
EXPOSE 5001

CMD ["node", "server.js"]
