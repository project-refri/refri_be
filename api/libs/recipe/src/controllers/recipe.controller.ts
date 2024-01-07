import { Auth } from '@app/common/decorators/auth.decorator';
import {
  ApiDeleteNoContent,
  ApiGet,
  ApiPatch,
  ApiPostCreated,
} from '@app/common/decorators/http-method.decorator';
import { ReqUser } from '@app/common/decorators/req-user.decorator';
import { User } from '@app/user/domain/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateRecipeResponseDto,
  FindOneRecipeResponseDto,
  FindRecentViewedResponseDto,
  FindRecipesResponseDto,
  FindTopViewdResponseDto,
  UpdateRecipeResponseDto,
} from '../dto/recipe/recipe-response.dto';
import { RecipeService } from '../services/recipe.service';
import { FilterRecipeDto } from '../dto/recipe/filter-recipe.dto';
import { Public } from '@app/common/decorators/public.decorator';
import { RecipeViewerIdentifier } from '../dto/recipe-view-log/recipe-viewer-identifier';
import { CreateMongoRecipeDto } from '@app/recipe/dto/recipe/create-mongo-recipe.dto';
import { UpdateRecipeDto } from '@app/recipe/dto/recipe/update-recipe.dto';
import { TextSearchRecipeDto } from '@app/recipe/dto/recipe/text-search.dto';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * ## Create Recipe
   *
   * Create a new Recipe with given dto.
   */
  @Auth()
  @ApiPostCreated(CreateRecipeResponseDto)
  @Post()
  async create(@Body() createRecipeDto: CreateMongoRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  /**
   * ## Find Recipes
   *
   * Find all Recipes with given query.
   * #### Recipe's user_id is request user's id by default.
   * If any query is not given, return all Recipes of request user's.
   */
  @Public()
  @Auth()
  @ApiGet(FindRecipesResponseDto)
  @Get()
  async findAll(@Query() filterRecipeDto: FilterRecipeDto) {
    return this.recipeService.findAll(filterRecipeDto);
  }

  /**
   * ## Find Recipes by full text search
   *
   * Find all Recipes with given query text.
   * If any query is not given, return all Recipes.
   */
  @Public()
  @Auth()
  @ApiGet(FindRecipesResponseDto)
  @Get('search')
  async findAllByFullTextSearch(
    @Query()
    textSearchRecipeDto: TextSearchRecipeDto,
  ) {
    return this.recipeService.findAllByFullTextSearch(textSearchRecipeDto);
  }

  @ApiGet(FindTopViewdResponseDto)
  @Get('top-viewed')
  async findTopViewed() {
    return this.recipeService.findTopViewed();
  }

  @ApiGet(FindRecentViewedResponseDto)
  @Auth()
  @Get('recent-viewed')
  async findAllRecentViewed(
    @Query()
    filterRecipeDto: FilterRecipeDto,
    @ReqUser() user: User,
  ) {
    return this.recipeService.findAllRecentViewed(
      filterRecipeDto,
      new RecipeViewerIdentifier(user, null),
    );
  }

  /**
   * ## Find one Recipe
   *
   * Find one Recipe with given id.
   */
  @Public()
  @Auth()
  @ApiGet(FindOneRecipeResponseDto)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Ip() ip: string,
    @ReqUser() user: User,
  ) {
    return await this.recipeService.findOne(
      id,
      new RecipeViewerIdentifier(user, ip),
    );
  }

  /**
   * ## Update Recipe
   *
   * Update Recipe with given id and dto.
   */
  @Auth()
  @ApiPatch(UpdateRecipeResponseDto)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  /**
   * ## Delete Recipe
   *
   * Delete Recipe with given id.
   */
  @Auth()
  @ApiDeleteNoContent()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.deleteOne(id);
  }
}
