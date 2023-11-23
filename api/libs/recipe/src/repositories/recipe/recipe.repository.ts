import { PrismaService } from '@app/common/prisma/prisma.service';
import { CrudPrismaRepository } from '@app/common/repository/crud-prisma.repository';
import { Injectable } from '@nestjs/common';
import { Recipe } from '../../entities/recipe.entity';
import {
  CreateRecipeDto,
  UpdateRecipeDto,
} from '../../dto/recipe/modify-recipe.dto';
import {
  FilterRecipeDto,
  RecipeListViewResponseDto,
  RecipesAndCountDto,
  TextSearchRecipeDto,
} from '../../dto/recipe/filter-recipe.dto';
import { deleteNull } from '@app/common/utils/delete-null';
import { IRecipeRepository } from './recipe.repository.interface';
import { deleteProps } from '@app/common/utils/delete-props';

@Injectable()
export class RecipeRepository
  extends CrudPrismaRepository<
    Recipe,
    CreateRecipeDto,
    UpdateRecipeDto,
    FilterRecipeDto
  >
  implements IRecipeRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'recipe');
  }

  async findAllRecipe(
    filterRecipeDto: FilterRecipeDto,
  ): Promise<RecipesAndCountDto> {
    const { page, limit } = filterRecipeDto;
    const filterDto = deleteNull<FilterRecipeDto>(
      deleteProps<FilterRecipeDto>(filterRecipeDto, ['page', 'limit']),
    );
    const recipeProms = this.prisma.recipe.findMany({
      where: filterDto,
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        view_count: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const countProms = this.prisma.recipe.count({
      where: filterDto,
    });
    const [recipes, count] = await Promise.all([recipeProms, countProms]);
    return new RecipesAndCountDto(recipes, count);
  }

  async findAllByFullTextSearch(
    _textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesAndCountDto> {
    throw new Error('Method not implemented.');
  }

  async findTopViewed() {
    return this.prisma.recipe.findMany({
      orderBy: { view_count: 'desc' },
      take: 10,
    });
  }

  async findAllByIds(ids: number[]): Promise<RecipeListViewResponseDto[]> {
    return this.prisma.recipe.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        view_count: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async increaseViewCount(id: number): Promise<Recipe> {
    return this.prisma.recipe.update({
      where: { id },
      data: { view_count: { increment: 1 } },
    });
  }
}
