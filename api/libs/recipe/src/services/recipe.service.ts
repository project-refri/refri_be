import { CommonService } from '@app/common/common.service';
import { Injectable } from '@nestjs/common';
import { FilterRecipeDto } from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeRepository } from '../repositories/recipe.repository';

@Injectable()
export class RecipeService extends CommonService<
  Recipe,
  CreateRecipeDto,
  UpdateRecipeDto,
  FilterRecipeDto
> {
  constructor(private readonly recipeRepository: RecipeRepository) {
    super(recipeRepository);
  }
}
