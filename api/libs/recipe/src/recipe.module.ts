import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';
import { RecipeRepository } from './repositories/recipe.repository';
import { RecipeService } from './services/recipe.service';
import { RecipeController } from './controllers/recipe.controller';
import { RecipeBookmarkController } from './controllers/recipe-bookmark.controller';
import { RecipeBookmarkRepository } from './repositories/recipe-bookmark.repository';
import { RecipeBookmarkService } from './services/recipe-bookmark.service';
import {
  RecipeBookmark,
  RecipeBookmarkSchema,
} from './entities/recipe-bookmark.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Recipe.name,
        useFactory: () => {
          const schema = RecipeSchema;
          return schema;
        },
      },
      {
        name: RecipeBookmark.name,
        useFactory: () => {
          const schema = RecipeBookmarkSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [RecipeController, RecipeBookmarkController],
  providers: [
    RecipeService,
    RecipeRepository,
    RecipeBookmarkService,
    RecipeBookmarkRepository,
  ],
  exports: [
    RecipeService,
    RecipeRepository,
    RecipeBookmarkService,
    RecipeBookmarkRepository,
  ],
})
export class RecipeModule {}
