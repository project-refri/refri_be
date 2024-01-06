import { PrismaService } from '@app/common/prisma/prisma.service';
import { CrudPrismaRepository } from '@app/common/repository/crud-prisma.repository';
import { Injectable } from '@nestjs/common';
import { Recipe } from '@app/recipe/domain/recipe.entity';
import {
  FilterRecipeDto,
  RecipeListViewResponseDto,
  RecipesAndCountDto,
  TextSearchRecipeDto,
} from '../../dto/recipe/filter-recipe.dto';
import { deleteNull } from '@app/common/utils/delete-null';
import { IRecipeRepository } from './recipe.repository.interface';
import { deleteProps } from '@app/common/utils/delete-props';
import { CreateRecipeDto } from '@app/recipe/dto/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '@app/recipe/dto/recipe/update-recipe.dto';

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
      deleteProps(filterRecipeDto, ['page', 'limit']),
    );
    const recipeProms = this.prisma.recipe.findMany({
      where: filterDto,
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true,
        mongoId: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const countProms = this.prisma.recipe.count({
      where: filterDto,
    });
    const [recipes, count] = await Promise.all([recipeProms, countProms]);
    return new RecipesAndCountDto(recipes, count);
  }

  async findOneByMongoId(mongoId: string): Promise<Recipe> {
    return this.prisma.recipe.findUnique({
      where: { mongoId: mongoId },
    });
  }

  async findAllByFullTextSearch(
    _textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesAndCountDto> {
    throw new Error('Method not implemented.');
  }

  async findTopViewed() {
    return this.prisma.recipe.findMany({
      orderBy: { viewCount: 'desc' },
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
        viewCount: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async increaseViewCount(id: number): Promise<Recipe> {
    return this.prisma.recipe.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  }

  async deleteOne(id: number): Promise<Recipe> {
    const deleteRecipe = this.prisma.recipe.delete({ where: { id } });
    const deleteRecipeViewLog = this.prisma.recipeViewLog.deleteMany({
      where: { recipeId: id },
    });
    const deleteRecipeBookmark = this.prisma.recipeBookmark.deleteMany({
      where: { recipeId: id },
    });
    return (
      await this.prisma.$transaction([
        deleteRecipeViewLog,
        deleteRecipeBookmark,
        deleteRecipe,
      ])
    )[2];
  }
}
