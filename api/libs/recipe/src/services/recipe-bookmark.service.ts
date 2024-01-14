import { FilterRecipeBookmarkDto } from '../dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { RecipeBookmarkRepository } from '../repositories/recipe-bookmark/recipe-bookmark.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Logable } from '@app/common/log/log.decorator';
import { CreateRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/create-recipe-bookmark.dto';
import { RecipeRepository } from '@app/recipe/repositories/recipe/recipe.repository';
import { UserRepository } from '@app/user/repositories/user.repository';
import {
  RecipeBookmark,
  RecipeBookmarkEntity,
} from '@app/recipe/domain/recipe-bookmark.entity';
import { RecipeBookmarkDuplicateException } from '@app/recipe/exception/domain.exception';
import { RecipeBookmarksResponseDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-response.dto';

@Injectable()
export class RecipeBookmarkService {
  constructor(
    private readonly recipeBookmarkRespository: RecipeBookmarkRepository,
    @Inject('PrismaRecipeRepository')
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateRecipeBookmarkDto) {
    const [bookmarkDuplicate, recipe, user] = await Promise.all([
      this.recipeBookmarkRespository.findAllByCond({
        userId: dto.userId,
        recipeId: dto.recipeId,
        page: 1,
        limit: 1,
      }),
      this.recipeRepository.findOne(dto.recipeId),
      this.userRepository.findOne(dto.userId),
    ]);
    if (bookmarkDuplicate.length > 0) {
      throw new RecipeBookmarkDuplicateException();
    }
    const recipeBookmark = RecipeBookmark.create(dto, recipe, user, new Date());
    return await this.recipeBookmarkRespository.create(
      RecipeBookmarkEntity.from(recipeBookmark),
    );
  }

  @Logable()
  async findAllRecipeBookmarked(
    filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
  ): Promise<RecipeBookmarksResponseDto> {
    const { page, limit } = filterRecipeBookmarkDto;
    return (
      await this.recipeBookmarkRespository.findAllRecipeBookmarked(
        filterRecipeBookmarkDto,
      )
    ).toRecipeBookmarksResponseDto(page, limit);
  }

  async deleteOne(id: number) {
    return await this.recipeBookmarkRespository.deleteOne(id);
  }
}
