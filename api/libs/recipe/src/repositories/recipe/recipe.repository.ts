import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { RecipeEntity } from '@app/recipe/domain/recipe.entity';
import { FilterRecipeDto } from '../../dto/recipe/filter-recipe.dto';
import { deleteNull } from '@app/common/utils/delete-null';
import { IRecipeRepository } from './recipe.repository.interface';
import { deleteProps } from '@app/common/utils/delete-props';
import { TextSearchRecipeDto } from '@app/recipe/dto/recipe/text-search.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesAndCountDto } from '@app/recipe/dto/recipe/recipes-count.dto';
import { CreateRecipeDto } from '@app/recipe/dto/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '@app/recipe/dto/recipe/update-recipe.dto';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRecipeDto): Promise<RecipeEntity> {
    return await this.prisma.recipe.create({
      data: dto,
    });
  }

  async findAll(): Promise<RecipeEntity[]> {
    return await this.prisma.recipe.findMany();
  }

  async findAllByCond(
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

  async findOneByMongoId(mongoId: string): Promise<RecipeEntity> {
    return await this.prisma.recipe.findUnique({
      where: { mongoId: mongoId },
    });
  }

  async findAllByFullTextSearch(
    _textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesAndCountDto> {
    throw new Error('Method not implemented.');
  }

  async findTopViewed(): Promise<RecipeEntity[]> {
    return this.prisma.recipe.findMany({
      orderBy: { viewCount: 'desc' },
      take: 10,
    });
  }

  async findAllByIds(ids: number[]): Promise<RecipesItemDto[]> {
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

  async findOne(id: number): Promise<RecipeEntity> {
    return this.prisma.recipe.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateRecipeDto): Promise<RecipeEntity> {
    return await this.prisma.recipe.update({
      where: { id },
      data: dto,
    });
  }

  async increaseViewCount(id: number): Promise<RecipeEntity> {
    return await this.prisma.recipe.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  }

  async deleteOne(id: number): Promise<RecipeEntity> {
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
