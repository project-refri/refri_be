import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FilterRecipeBookmarkDto } from '../../dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { deleteProps } from '@app/common/utils/delete-props';
import { IRecipeBookmarkRepository } from './recipe-bookmark.interface';
import { RecipeBookmarksAndCountDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-count.dto';
import { CreateRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/create-recipe-bookmark.dto';
import { RecipeBookmark } from '@app/recipe/domain/recipe-bookmark.entity';

@Injectable()
export class RecipeBookmarkRepository implements IRecipeBookmarkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateRecipeBookmarkDto) {
    const ret = await this.prisma.recipeBookmark.create({
      data: createDto,
    });
    return new RecipeBookmark({
      id: ret.id,
      recipeId: ret.recipeId,
      userId: ret.userId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  async findOne(id: number) {
    const ret = await this.prisma.recipeBookmark.findUnique({
      where: { id },
    });
    return new RecipeBookmark({
      id: ret.id,
      recipeId: ret.recipeId,
      userId: ret.userId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
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

  async findAll(): Promise<RecipeBookmark[]> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, updateDto: any): Promise<RecipeBookmark> {
    throw new Error('Method not implemented.');
  }

  async deleteOne(id: number) {
    const ret = await this.prisma.recipeBookmark.delete({
      where: { id },
    });
    return new RecipeBookmark({
      id: ret.id,
      recipeId: ret.recipeId,
      userId: ret.userId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }
}
