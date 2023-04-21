import { CommonRepository } from '@app/common/common.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterRecipeDto } from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe, RecipeDocument } from '../entities/recipe.entity';

@Injectable()
export class RecipeRepository extends CommonRepository<
  Recipe,
  CreateRecipeDto,
  UpdateRecipeDto,
  FilterRecipeDto
> {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<RecipeDocument>,
  ) {
    super(recipeModel);
  }
}
