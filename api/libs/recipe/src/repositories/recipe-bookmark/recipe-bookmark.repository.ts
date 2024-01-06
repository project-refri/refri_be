import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { RecipeBookmark } from '@app/recipe/domain/recipe-bookmark.entity';
import { CreateRecipeBookmarkDto } from '../../dto/recipe-bookmark/modify-recipe-bookmark.dto';
import {
  FilterRecipeBookmarkDto,
  RecipeBookmarksAndCountDto,
} from '../../dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { CrudPrismaRepository } from '@app/common/repository/crud-prisma.repository';
import { deleteProps } from '@app/common/utils/delete-props';
import { IRecipeBookmarkRepository } from './recipe-bookmark.interface';

@Injectable()
export class RecipeBookmarkRepository
  extends CrudPrismaRepository<
    RecipeBookmark,
    CreateRecipeBookmarkDto,
    any,
    FilterRecipeBookmarkDto
  >
  implements IRecipeBookmarkRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'recipeBookmark');
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
}
