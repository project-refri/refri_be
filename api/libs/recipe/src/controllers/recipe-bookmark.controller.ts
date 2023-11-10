import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
} from '../dto/recipe-bookmark/recipe-bookmark-response.dto';
import { CreateRecipeBookmarkDto } from '../dto/recipe-bookmark/modify-recipe-bookmark.dto';
import { ReqUser } from '@app/common/decorators/req-user.decorator';
import { User } from '@app/user/entities/user.entity';
import { FilterRecipeBookmarkDto } from '../dto/recipe-bookmark/filter-recipe-bookmark.dto';

@ApiTags('RecipeBookmark')
@Controller('recipe-bookmark')
export class RecipeBookmarkController {
  constructor(private readonly recipeBookmarkService: RecipeBookmarkService) {}

  @Auth()
  @ApiPostCreated(CreateRecipeBookmarkResponseDto)
  @Post()
  async create(
    @Body() createRecipeBookmarkDto: CreateRecipeBookmarkDto,
    @ReqUser() user: User,
  ) {
    createRecipeBookmarkDto.user_id = user.id.toString();
    return await this.recipeBookmarkService.create(createRecipeBookmarkDto);
  }

  @Auth()
  @ApiGet(FindRecipeBookmarksResponseDto)
  @Get()
  async findAll(
    @Query() filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
    @ReqUser() user: User,
  ) {
    filterRecipeBookmarkDto.user_id = user.id.toString();
    return await this.recipeBookmarkService.findAllRecipeBookmarked(
      filterRecipeBookmarkDto,
    );
  }

  @Auth()
  @ApiDeleteNoContent()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.recipeBookmarkService.deleteOne(id);
  }
}
