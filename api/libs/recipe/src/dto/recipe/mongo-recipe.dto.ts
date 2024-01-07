import { Types } from 'mongoose';
import {
  IngredientRequirement,
  RecipeStep,
} from '@app/recipe/domain/mongo/mongo.recipe.entity';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class MongoRecipeDto {
  id: Types.ObjectId;

  @ApiExpose({ name: 'mysql_id' })
  mysqlId: number;

  name: string;

  description: string;

  @ApiExpose({ name: 'owner_id' })
  ownerId: number;

  @ApiExpose({ name: 'ingredient_requirements' })
  ingredientRequirements: Array<IngredientRequirement>;

  @ApiExpose({ name: 'recipe_steps' })
  recipeSteps: Array<RecipeStep>;

  thumbnail: string;

  @ApiExpose({ name: 'recipe_raw_text' })
  recipeRawText: string;

  @ApiExpose({ name: 'origin_url' })
  originUrl: string;

  @ApiExpose({ name: 'view_count' })
  viewCount: number;

  @ApiExpose({ name: 'created_at' })
  createdAt: Date;

  @ApiExpose({ name: 'updated_at' })
  updatedAt: Date;
}
