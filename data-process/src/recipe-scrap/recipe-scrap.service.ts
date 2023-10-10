import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { DataStructureService } from '../data-structure/data-structure.service';
import { CreateRecipeDto } from '../recipe/dto/modify-recipe.dto';
import { RecipeService } from '../recipe/services/recipe.service';
import { Page } from '../web-automation/domain/page.domain';
import { WebAutomationService } from '../web-automation/web-automation.service';
import { CreateRecipeScrapRequestDto } from './dto/modify-recipe-scrap-req.dto';
import { RecipeScrapRepository } from './recipe-scrap.repository';

@Injectable()
export class RecipeScrapService {
  private page: Page;
  constructor(
    private readonly webAutomationService: WebAutomationService,
    private readonly dataStructuringService: DataStructureService,
    private readonly recipeService: RecipeService,
    private readonly recipeScrapRepository: RecipeScrapRepository,
  ) {}

  async scrapRecipeFromUrl(url: string) {
    this.page = await this.webAutomationService.getPage();
    await this.page.gotoUrl(url);
    const htmlText = await this.page.extractHtml();
    const rawText =
      await this.webAutomationService.extractHtmlTextFromPageContent(htmlText, [
        '#content_permallink_article > div > div > div.box_article_tit',
        '#content_permallink_article > div > div > div.box_article',
      ]);
    await this.page.close();
    const recipeStructuredDto =
      await this.dataStructuringService.extractRecipeDataFromText(rawText);
    const createRecipeDto = new CreateRecipeDto(
      recipeStructuredDto.name,
      recipeStructuredDto.description,
      null,
      recipeStructuredDto.ingredient_requirements,
      recipeStructuredDto.recipe_steps,
      recipeStructuredDto.thumbnail,
      recipeStructuredDto.recipe_raw_text,
      url,
    );
    await validate(createRecipeDto);
    return createRecipeDto;
  }

  async scrapRecipesFromRequests() {
    const requests =
      await this.recipeScrapRepository.findAllRecipeScrapRequestOrderByRecent();
    for (const req of requests) {
      try {
        console.log(
          '----------------------------Scrap start----------------------------',
        );
        await this.webAutomationService.initBrowser();
        const createRecipeDto = await this.scrapRecipeFromUrl(req.url);
        console.log(await this.recipeService.create(createRecipeDto));
        await this.recipeScrapRepository.updateRecipeScrapRequestStatusToDone(
          req.id,
        );
        await this.webAutomationService.closeBrower();
      } catch (e) {
        console.log(e);
      } finally {
        await new Promise((r) => setTimeout(r, 3 * 60 * 1000));
      }
    }
  }

  async createRecipeScrapRequest(
    createRecipeScrapRequestDto: CreateRecipeScrapRequestDto,
  ) {
    return await this.recipeScrapRepository.createRecipeScrapRequest(
      createRecipeScrapRequestDto,
    );
  }
}
