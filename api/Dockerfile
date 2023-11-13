FROM node:20-slim

WORKDIR /app

RUN npm install pm2@5.3.0 -g

COPY ./ecosystem.config.js .

COPY ./dist/apps/api-bundled/image-process.proto .
COPY ./dist/apps/api-bundled/main.js .

EXPOSE 8080

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
# ENTRYPOINT ["pm2-runtime", "start", "main.js"]
