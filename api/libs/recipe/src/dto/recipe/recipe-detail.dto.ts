import { IngredientRequirementDto } from '@app/recipe/dto/recipe/ingredient-requirement.dto';
import { RecipeStepDto } from '@app/recipe/dto/recipe/recipe-step.dto';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { Type } from 'class-transformer';

export class RecipeDetailDto {
  public readonly id: number;

  @ApiExpose({ name: 'mongo_id' })
  public readonly mongoId: string;

  public readonly name: string;

  public readonly description: string;

  @ApiExpose({ name: 'owner_id' })
  public readonly ownerId: number;

  @Type(() => IngredientRequirementDto)
  @ApiExpose({ name: 'ingredient_requirements' })
  public readonly ingredientRequirements: Array<IngredientRequirementDto>;

  @Type(() => RecipeStepDto)
  @ApiExpose({ name: 'recipe_steps' })
  public readonly recipeSteps: Array<RecipeStepDto>;

  public readonly thumbnail: string;

  @ApiExpose({ name: 'view_count' })
  public readonly viewCount: number;

  @ApiExpose({ name: 'created_at' })
  public readonly createdAt: Date;

  @ApiExpose({ name: 'updated_at' })
  public readonly updatedAt: Date;
}
