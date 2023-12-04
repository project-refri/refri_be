import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RecipeScrapService } from './recipe-scrap/recipe-scrap.service';
import { RecipeService } from './recipe/services/recipe.service';
import { Recipe } from './recipe/entities/recipe.entity';
import * as util from 'util';
import {} from './recipe-scrap/dto/modify-recipe-scrap-req.dto';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { RecipeScrapRequest } from './recipe-scrap/entity/recipe-scrap-req.entity';
import { WebAutomationService } from './web-automation/web-automation.service';
import { DataStructureService } from './data-structure/data-structure.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const config = new DocumentBuilder()
    .setTitle('Refri Data process API Specification')
    .setDescription('Refri Data process API Specification')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Local Server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useStaticAssets(join(__dirname, 'node_modules/swagger-ui-dist'), {
    prefix: '/dev/api',
  });

  await app.listen(3000);
}

async function bootstrap2() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const recipeService = app.get(RecipeService);
  const recipeScrapService = app.get(RecipeScrapService);
  const webAutomationService = app.get(WebAutomationService);
  const dataStructureService = app.get(DataStructureService);

  // await webAutomationService.initBrowser();

  // const page = await webAutomationService.getPage();
  // await page.gotoUrl(url);
  // const htmlText = await page.extractHtml();
  // const text = await webAutomationService.extractHtmlTextFromPageContent(
  //   htmlText,
  //   [
  //     '#content_permallink_article > div > div > div.box_article_tit',
  //     '#content_permallink_article > div > div > div.box_article',
  //   ],
  // );
  // console.log(text);

  // const ret = await dataStructureService.extractRecipeDataFromText(rawText);
  // console.log(ret);
}

bootstrap();
