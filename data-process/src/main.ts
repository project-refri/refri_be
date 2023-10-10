import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RecipeScrapService } from './recipe-scrap/recipe-scrap.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const recipeScrapService = app.get(RecipeScrapService);
  await recipeScrapService.scrapRecipesFromRequests();
}
bootstrap();
