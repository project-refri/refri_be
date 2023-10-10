import { Body, Controller, Post } from '@nestjs/common';
import { RecipeScrapService } from './recipe-scrap.service';
import { CreateRecipeScrapRequestDto } from './dto/modify-recipe-scrap-req.dto';

@Controller('recipe-scrap')
export class RecipeScrapController {
  constructor(private readonly recipeScrapService: RecipeScrapService) {}

  @Post()
  async createRecipeScrapRequest(
    @Body() createRecipeScrapRequestDto: CreateRecipeScrapRequestDto,
  ) {
    return await this.recipeScrapService.createRecipeScrapRequest(
      createRecipeScrapRequestDto,
    );
  }
}
