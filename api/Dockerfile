FROM node:20-slim

WORKDIR /app

RUN npm install pm2@5.3.0 -g
RUN apt-get update -y && apt-get install -y openssl

COPY ./ecosystem.config.js .

COPY ./dist/apps/api-bundled/image-process.proto .
COPY ./dist/apps/api-bundled/main.js .
COPY ./dist/apps/api-bundled/.prisma/client/* ./node_modules/.prisma/client/
COPY ./prisma/schema.prisma ./prisma/schema.prisma

EXPOSE 8080

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
# ENTRYPOINT ["pm2-runtime", "start", "main.js"]
