import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';
import { RecipeRepository } from './repositories/recipe.repository';
import { RecipeService } from './services/recipe.service';

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
    ]),
  ],
  providers: [RecipeService, RecipeRepository],
  exports: [RecipeService, RecipeRepository],
})
export class RecipeModule {}
