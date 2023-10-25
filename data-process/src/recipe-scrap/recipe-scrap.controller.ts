import { Body, Controller, Post } from '@nestjs/common';
import { RecipeScrapService } from './recipe-scrap.service';
import {
  ConfirmRecipeScrapRequestDto,
  CreateRecipeScrapRequestDto,
} from './dto/modify-recipe-scrap-req.dto';

@Controller('recipe-scrap')
export class RecipeScrapController {
  constructor(private readonly recipeScrapService: RecipeScrapService) {}

  @Post('/scrap-recipes-from-requests')
  async scrapRecipesFromRequests() {
    return await this.recipeScrapService.scrapRecipesFromRequests();
  }

  @Post()
  async createRecipeScrapRequest(
    @Body() createRecipeScrapRequestDto: CreateRecipeScrapRequestDto,
  ) {
    return await this.recipeScrapService.createRecipeScrapRequest(
      createRecipeScrapRequestDto,
    );
  }

  @Post('/confirm')
  async confirmRecipeScrapRequest(
    @Body() confirmRecipeScrapRequestDto: ConfirmRecipeScrapRequestDto,
  ) {
    return await this.recipeScrapService.confirmRecipeScrapRequest(
      confirmRecipeScrapRequestDto,
    );
  }
}
