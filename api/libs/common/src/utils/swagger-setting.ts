import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

export const swaggerSetting = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Refri API Specification')
    .setDescription('Refri API Specification')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(process.env.DEV_HOST, 'Dev Server')
    .addServer('http://localhost:8000', 'Local Server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.DEV_STAGE + '/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useStaticAssets(join(__dirname, 'node_modules/swagger-ui-dist'), {
    prefix: '/dev/api',
  });
};
