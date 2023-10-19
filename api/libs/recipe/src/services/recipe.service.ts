import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  FilterRecipeDto,
  RecipesAndCountDto,
  RecipesResponseDto,
  TextSearchRecipeDto,
} from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeRepository } from '../repositories/recipe.repository';
import { RecipeViewerIdentifier } from '../dto/recipe-viewer-identifier';
import { MEMORY_CACHE } from '@app/common/cache/cache.constant';
import { Cache } from 'cache-manager';
import { Cacheable } from '@app/common/cache/memory-cache.service';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    @Inject(MEMORY_CACHE) private readonly cacheManager: Cache,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipeRepository.create(createRecipeDto);
  }

  async findAll(filterRecipeDto: FilterRecipeDto): Promise<RecipesResponseDto> {
    const results = await this.recipeRepository.findAll(filterRecipeDto);
    return results.toRecipesResponseDto(
      filterRecipeDto.page,
      filterRecipeDto.limit,
    );
  }

  async findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesResponseDto> {
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
        new FilterRecipeDto(
          textSearchRecipeDto.page,
          textSearchRecipeDto.limit,
        ),
      );
    return results.toRecipesResponseDto(
      textSearchRecipeDto.page,
      textSearchRecipeDto.limit,
    );
  }

  async findOne(id: string): Promise<Recipe> {
    const ret = await this.recipeRepository.findOne(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  @Cacheable({
    ttl: 60 * 60 * 1000,
    generateKey: (id: string, identifier: RecipeViewerIdentifier) =>
      identifier.user
        ? `${id}-${identifier.user.id}`
        : `${id}-${identifier.ip}`,
  })
  async increaseViewCount(
    id: string,
    _identifier: RecipeViewerIdentifier,
  ): Promise<boolean> {
    const ret = await this.recipeRepository.increaseViewCount(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return true;
  }

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
