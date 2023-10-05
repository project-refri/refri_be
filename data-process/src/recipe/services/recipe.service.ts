import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterRecipeDto } from '../dto/filter-recipe.dto';
import { CreateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeRepository } from '../repositories/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipeRepository.create(createRecipeDto);
  }

  async findAll(filterRecipeDto: FilterRecipeDto): Promise<Recipe[]> {
    return await this.recipeRepository.findAll(filterRecipeDto);
  }

  async findOne(id: string): Promise<Recipe> {
    const ret = await this.recipeRepository.findOne(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  // async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
  //   const ret = await this.recipeRepository.update(id, updateRecipeDto);
  //   if (!ret) throw new NotFoundException('Recipe not found');
  //   return ret;
  // }

  async delete(id: string): Promise<Recipe> {
    const ret = await this.recipeRepository.deleteOne(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  async deleteAll(filterRecipeDto: FilterRecipeDto): Promise<any> {
    return await this.recipeRepository.deleteAll(filterRecipeDto);
  }
}
