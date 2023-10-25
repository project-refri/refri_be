import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { DataStructureService } from '../data-structure/data-structure.service';
import { CreateRecipeDto } from '../recipe/dto/modify-recipe.dto';
import { RecipeService } from '../recipe/services/recipe.service';
import { Page } from '../web-automation/domain/page.domain';
import { WebAutomationService } from '../web-automation/web-automation.service';
import {
  ConfirmRecipeScrapRequestDto,
  CreateRecipeScrapRequestDto,
} from './dto/modify-recipe-scrap-req.dto';
import { RecipeScrapRepository } from './recipe-scrap.repository';
import * as util from 'util';
import { Recipe } from 'src/recipe/entities/recipe.entity';

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
    await validateOrReject(createRecipeDto, {
      validationError: {
        target: false,
        value: false,
      },
    });
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
        console.log(util.inspect(e, false, null, true /* enable colors */));
      } finally {
        await new Promise((r) => setTimeout(r, 2 * 60 * 1000));
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

  async confirmRecipeScrapRequest(
    confirmRecipeScrapRequestDto: ConfirmRecipeScrapRequestDto,
  ) {
    const { origin_url, recipe_id } = confirmRecipeScrapRequestDto;
    let recipe: Recipe;
    if (recipe_id) {
      recipe = await this.recipeService.findOne(recipe_id);
    }
    console.log(recipe.origin_url);
    const req = await this.recipeScrapRepository.findOneByUrl(
      origin_url ? origin_url : recipe.origin_url,
    );
    if (confirmRecipeScrapRequestDto.confirm === 'confirm') {
      console.log('confirm');
      await this.recipeScrapRepository.deleteOne(req.id);
    } else if (confirmRecipeScrapRequestDto.confirm === 'reject') {
      console.log('reject');
      const res =
        await this.recipeScrapRepository.updateRecipeScrapRequestStatusToError(
          req.id,
        );
      await this.recipeService.deleteAll({
        origin_url: res.url,
        page: 1,
        limit: 1,
      });
    }
  }

  async deleteAllRecipeScrapRequest() {
    return await this.recipeScrapRepository.deleteAll();
  }
}
