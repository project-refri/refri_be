FROM node:20-slim

WORKDIR /app

COPY ./dist/apps/api-bundled/image-process.proto .
COPY ./dist/apps/api-bundled/main.js .

CMD ["node", "main.js"]
