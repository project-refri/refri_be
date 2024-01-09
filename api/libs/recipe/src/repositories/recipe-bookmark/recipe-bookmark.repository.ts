import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FilterRecipeBookmarkDto } from '../../dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { deleteProps } from '@app/common/utils/delete-props';
import { IRecipeBookmarkRepository } from './recipe-bookmark.interface';
import { RecipeBookmarksAndCountDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-count.dto';
import { RecipeBookmarkEntity } from '@app/recipe/domain/recipe-bookmark.entity';

@Injectable()
export class RecipeBookmarkRepository implements IRecipeBookmarkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: RecipeBookmarkEntity): Promise<RecipeBookmarkEntity> {
    return await this.prisma.recipeBookmark.create({
      data: {
        recipeId: entity.recipeId,
        userId: entity.userId,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
  }

  async findOne(id: number): Promise<RecipeBookmarkEntity> {
    return await this.prisma.recipeBookmark.findUnique({
      where: { id },
    });
  }

  async findAllRecipeBookmarked(
    filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
  ) {
    const { page, limit } = filterRecipeBookmarkDto;
    const filterDto = deleteProps(filterRecipeBookmarkDto, ['page', 'limit']);
    const recipeBookmarkProms = this.prisma.recipeBookmark.findMany({
      where: filterDto,
      select: {
        id: true,
        recipe: {
          select: {
            id: true,
            name: true,
            description: true,
            thumbnail: true,
            viewCount: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const countProms = this.prisma.recipeBookmark.count({
      where: filterDto,
    });
    const [recipeBookmarks, count] = await Promise.all([
      recipeBookmarkProms,
      countProms,
    ]);
    return new RecipeBookmarksAndCountDto(
      recipeBookmarks.map((recipeBookmark) => ({
        recipeBookmarkId: recipeBookmark.id,
        ...recipeBookmark.recipe,
      })),
      count,
    );
  }

  async findAllByCond(
    filterDto: FilterRecipeBookmarkDto,
  ): Promise<RecipeBookmarkEntity[]> {
    return await this.prisma.recipeBookmark.findMany({
      where: {
        userId: filterDto.userId,
        recipeId: filterDto.recipeId,
      },
    });
  }

  async findAll(): Promise<RecipeBookmarkEntity[]> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, updateDto: any): Promise<RecipeBookmarkEntity> {
    throw new Error('Method not implemented.');
  }

  async deleteOne(id: number): Promise<RecipeBookmarkEntity> {
    return await this.prisma.recipeBookmark.delete({
      where: { id },
    });
  }
}
