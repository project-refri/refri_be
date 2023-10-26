import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecipeService } from '../services/recipe.service';
import { FilterRecipeDto } from '../dto/filter-recipe.dto';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll(@Query() filterRecipeDto: FilterRecipeDto) {
    return await this.recipeService.findAll(filterRecipeDto);
  }

  @Get('origin-url/:originUrl')
  async findOneByOriginUrl(@Param('originUrl') originUrl: string) {
    return this.recipeService.findOneByOriginUrl(originUrl);
  }

  /**
   * ## Find one Recipe
   *
   * Find one Recipe with given id.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.recipeService.findOne(id);
  }

  /**
   * ## Delete Recipe
   *
   * Delete Recipe with given id.
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.recipeService.deleteOne(id);
  }
}
