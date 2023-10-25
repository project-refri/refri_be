import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RecipeScrapService } from './recipe-scrap/recipe-scrap.service';
import { RecipeService } from './recipe/services/recipe.service';
import { CreateRecipeDto } from './recipe/dto/modify-recipe.dto';
import { IngredientRequirement } from './recipe/entities/recipe.entity';
import { validate } from 'class-validator';
import * as util from 'util';
import { CreateRecipeScrapRequestDto } from './recipe-scrap/dto/modify-recipe-scrap-req.dto';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

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

  // const recipeService = app.get(RecipeService);
  // const recipeScrapService = app.get(RecipeScrapService);

  // const recipes = await recipeService.findAll({});
  // const recipeExist = new Set<string>();
  // const requestExist = new Set<string>();
  // const requests: CreateRecipeScrapRequestDto[] = [];

  // for (const recipe of recipes) {
  //   if (
  //     recipeExist.has(recipe.origin_url) &&
  // !requestExist.has(recipe.origin_url)
  //   ) {
  //     await recipeService.deleteAll({
  //       origin_url: recipe.origin_url,
  //     });
  //     requests.push({
  //       url: recipe.origin_url,
  //     });
  //     requestExist.add(recipe.origin_url);
  //   } else if (!recipeExist.has(recipe.origin_url)) {
  //     recipeExist.add(recipe.origin_url);
  //   }
  // }

  // const recipes2 = await recipeService.findAll({});

  // for (const recipe of recipes2) {
  //   const createRecipeDto = new CreateRecipeDto(
  //     recipe.name,
  //     recipe.description,
  //     null,
  //     recipe.ingredient_requirements as any,
  //     recipe.recipe_steps as any,
  //     recipe.thumbnail,
  //     recipe.recipe_raw_text,
  //     recipe.origin_url,
  //   );
  //   const errors = await validate(createRecipeDto, {
  //     validationError: { target: false, value: false },
  //   });
  //   if (errors.length > 0) {
  //     // errors.forEach((error) => {
  //     //   console.log(
  //     //     error.property,
  //     //     util.inspect(error.children, false, null, true /* enable colors */),
  //     //   );
  //     // });
  //     await recipeService.deleteAll({
  //       origin_url: recipe.origin_url,
  //     });
  //     requests.push({
  //       url: recipe.origin_url,
  //     });
  //   }
  // }

  // await recipeScrapService.deleteAllRecipeScrapRequest();
  // for (const request of requests) {
  //   console.log(request);
  //   try {
  //     await recipeScrapService.createRecipeScrapRequest(request);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
bootstrap();
