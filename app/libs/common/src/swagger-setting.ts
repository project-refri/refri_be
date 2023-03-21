import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetting = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Refri API Specification')
    .setDescription('Refri API Specification')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(process.env.DEV_HOST, 'Dev Server')
    .addServer('http://localhost:8000', 'Local Server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
