FROM node:16.10.0-bullseye-slim

ENV NODE_ENV=production

WORKDIR /app

COPY ["config.json", "package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "index.js" ]