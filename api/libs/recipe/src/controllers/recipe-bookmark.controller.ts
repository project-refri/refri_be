import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RecipeBookmarkService } from '../services/recipe-bookmark.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiDeleteNoContent,
  ApiGet,
  ApiPostCreated,
} from '@app/common/decorators/http-method.decorator';
import { Auth } from '@app/common/decorators/auth.decorator';
import {
  CreateRecipeBookmarkResponseDto,
  FindRecipeBookmarksResponseDto,
  RecipeBookmarkDuplicateResponseDto,
  RecipeNotExistsResponseDto,
  UserNotExistsResponseDto,
} from '../dto/recipe-bookmark/recipe-bookmark-response.dto';
import { CreateRecipeBookmarkDto } from '../dto/recipe-bookmark/create-recipe-bookmark.dto';
import { ReqUser } from '@app/common/decorators/req-user.decorator';
import { User } from '@app/user/domain/user.entity';
import { FilterRecipeBookmarkDto } from '../dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { RecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmark.dto';

@ApiTags('RecipeBookmark')
@Controller('recipe-bookmark')
export class RecipeBookmarkController {
  constructor(private readonly recipeBookmarkService: RecipeBookmarkService) {}

  @Auth()
  @ApiPostCreated(
    CreateRecipeBookmarkResponseDto,
    RecipeNotExistsResponseDto,
    UserNotExistsResponseDto,
    RecipeBookmarkDuplicateResponseDto,
  )
  @Post()
  async create(
    @Body() createRecipeBookmarkDto: CreateRecipeBookmarkDto,
    @ReqUser() user: User,
  ) {
    createRecipeBookmarkDto.userId = user.id;
    const ret = await this.recipeBookmarkService.create(
      createRecipeBookmarkDto,
    );
    return RecipeBookmarkDto.fromEntity(ret);
  }

  /**
   * ## Find All Bookmarked Recipe by User with pagination
   *
   * Response DTO's id is recipe id.
   * Recipe Bookmark id is recipe_bookmark_id.
   */
  @Auth()
  @ApiGet(FindRecipeBookmarksResponseDto)
  @Get()
  async findAll(
    @Query() filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
    @ReqUser() user: User,
  ) {
    filterRecipeBookmarkDto.userId = user.id;
    return await this.recipeBookmarkService.findAllRecipeBookmarked(
      filterRecipeBookmarkDto,
    );
  }

  @Auth()
  @ApiDeleteNoContent()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.recipeBookmarkService.deleteOne(id);
  }
}
