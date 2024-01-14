import { IngredientRequirementDto } from '@app/recipe/dto/recipe/ingredient-requirement.dto';
import { RecipeStepDto } from '@app/recipe/dto/recipe/recipe-step.dto';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { Transform, Type } from 'class-transformer';

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

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  @ApiExpose({ name: 'created_at' })
  public readonly createdAt: Date;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  @ApiExpose({ name: 'updated_at' })
  public readonly updatedAt: Date;

  constructor(props: {
    id: number;
    mongoId: string;
    name: string;
    description: string;
    ownerId: number;
    ingredientRequirements: Array<IngredientRequirementDto>;
    recipeSteps: Array<RecipeStepDto>;
    thumbnail: string;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.mongoId = props.mongoId;
    this.name = props.name;
    this.description = props.description;
    this.ownerId = props.ownerId;
    this.ingredientRequirements = props.ingredientRequirements;
    this.recipeSteps = props.recipeSteps;
    this.thumbnail = props.thumbnail;
    this.viewCount = props.viewCount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
