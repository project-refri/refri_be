import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FilterRecipeDto,
  RecipeDto,
  RecipeListViewResponseDto,
  RecipesAndCountDto,
  RecipesResponseDto,
  TextSearchRecipeDto,
} from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeRepository } from '../repositories/recipe.repository';
import { RecipeViewerIdentifier } from '../dto/recipe-viewer-identifier';
import { MemoryCacheable } from '@app/common/cache/memory-cache.service';
import { Cacheable } from '@app/common/cache/cache.service';
import { Logable } from '@app/common/log/log.decorator';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  @Logable()
  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipeRepository.create(createRecipeDto);
  }

  @Logable()
  async findAll(filterRecipeDto: FilterRecipeDto): Promise<RecipesResponseDto> {
    const { page, limit } = filterRecipeDto;
    const results = await this.recipeRepository.findAll(filterRecipeDto);
    return results.toRecipesResponseDto(page, limit);
  }

  @Logable()
  async findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesResponseDto> {
    const { page, limit } = textSearchRecipeDto;
    let results: RecipesAndCountDto;
    if (
      textSearchRecipeDto.searchQuery &&
      textSearchRecipeDto.searchQuery.length > 0
    ) {
      results = await this.recipeRepository.findAllByFullTextSearch(
        textSearchRecipeDto,
      );
    } else
      results = await this.recipeRepository.findAll(
        new FilterRecipeDto(page, limit),
      );
    return results.toRecipesResponseDto(page, limit);
  }

  @Logable()
  @Cacheable({
    ttl: 5 * 60 * 1000,
    keyGenerator: (id: string) => `recipe:${id}`,
  })
  async findOne(id: string): Promise<RecipeDto> {
    const ret = await this.recipeRepository.findOne(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  @Logable()
  async findTopViewed(): Promise<RecipeListViewResponseDto[]> {
    return await this.recipeRepository.findTopViewed();
  }

  @Logable()
  @MemoryCacheable({
    ttl: 60 * 60 * 1000,
    keyGenerator: (id: string, identifier: RecipeViewerIdentifier) =>
      identifier.user
        ? `recipe-view:${id}-${identifier.user.id}`
        : `recipe-view:${id}-${identifier.ip}`,
  })
  async increaseViewCount(
    id: string,
    _identifier: RecipeViewerIdentifier,
  ): Promise<boolean> {
    const ret = await this.recipeRepository.increaseViewCount(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return true;
  }

  @Logable()
  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const ret = await this.recipeRepository.update(id, updateRecipeDto);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  async deleteOne(id: string): Promise<Recipe> {
    const ret = await this.recipeRepository.deleteOne(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }
}
