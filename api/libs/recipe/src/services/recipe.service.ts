import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FilterRecipeDto,
  RecipesResponseDto,
  TextSearchRecipeDto,
} from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeRepository } from '../repositories/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipeRepository.create(createRecipeDto);
  }

  async findAll(filterRecipeDto: FilterRecipeDto): Promise<RecipesResponseDto> {
    const results = await this.recipeRepository.findAll(filterRecipeDto);
    return {
      results,
      page: filterRecipeDto.page,
      count: results.length,
    };
  }

  async findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesResponseDto> {
    let results: Recipe[];
    if (
      textSearchRecipeDto.searchQuery &&
      textSearchRecipeDto.searchQuery.length > 0
    )
      results = await this.recipeRepository.findAllByFullTextSearch(
        textSearchRecipeDto,
      );
    else
      results = await this.recipeRepository.findAll(
        new FilterRecipeDto(
          textSearchRecipeDto.page,
          textSearchRecipeDto.limit,
        ),
      );
    return {
      results,
      page: textSearchRecipeDto.page,
      count: results.length,
    };
  }

  async findOne(id: string): Promise<Recipe> {
    const ret = await this.recipeRepository.findOne(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const ret = await this.recipeRepository.update(id, updateRecipeDto);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  async delete(id: string): Promise<Recipe> {
    const ret = await this.recipeRepository.deleteOne(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  async deleteAll(filterRecipeDto: FilterRecipeDto): Promise<any> {
    return await this.recipeRepository.deleteAll(filterRecipeDto);
  }
}
