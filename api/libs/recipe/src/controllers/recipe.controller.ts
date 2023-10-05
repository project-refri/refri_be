import { Auth } from '@app/common/decorators/auth.decorator';
import {
  ApiDeleteNoContent,
  ApiGet,
  ApiPatch,
  ApiPostCreated,
} from '@app/common/decorators/http-method.decorator';
import { ReqUser } from '@app/common/decorators/req-user.decorator';
import { queryBuilder } from '@app/common/utils/query-builder';
import { User } from '@app/user/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilterRecipeDto } from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import {
  CreateRecipeResponseDto,
  FindAllRecipeResponseDto,
  FindOneRecipeResponseDto,
  UpdateRecipeResponseDto,
} from '../dto/recipe-response.dto';
import { RecipeService } from '../services/recipe.service';

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
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @ReqUser() user: User,
  ) {
    createRecipeDto.owner = user.id.toString();
    return this.recipeService.create(createRecipeDto);
  }

  /**
   * ## Find Recipes
   *
   * Find all Recipes with given query.
   * #### Recipe's user_id is request user's id by default.
   * If any query is not given, return all Recipes of request user's.
   */
  // @Auth()
  @ApiGet(FindAllRecipeResponseDto)
  @Get()
  async findAll(@ReqUser() user: User) {
    // const filterRecipeDto: FilterRecipeDto = queryBuilder({
    //   user_id: user.id.toString(),
    // });
    return this.recipeService.findAll({});
  }

  /**
   * ## Find one Recipe
   *
   * Find one Recipe with given id.
   */
  // @Auth()
  @ApiGet(FindOneRecipeResponseDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
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
    @Param('id') id: string,
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
  async delete(@Param('id') id: string) {
    return this.recipeService.delete(id);
  }
}
