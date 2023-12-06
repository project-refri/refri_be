import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { DataStructureService } from '../data-structure/data-structure.service';
import { Page } from '../web-automation/domain/page.domain';
import { WebAutomationService } from '../web-automation/web-automation.service';
import {
  ConfirmRecipeScrapRequestDto,
  CreateRecipeScrapRequestDto,
} from './dto/modify-recipe-scrap-req.dto';
import { RecipeScrapRepository } from './recipe-scrap.repository';
import * as util from 'util';
import { RecipeScrapRequestStatus } from './entity/recipe-scrap-req.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CreateMongoRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipeScrapService {
  private page: Page;
  constructor(
    private readonly webAutomationService: WebAutomationService,
    private readonly dataStructuringService: DataStructureService,
    private readonly recipeScrapRepository: RecipeScrapRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
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
    const createRecipeDto = new CreateMongoRecipeDto(
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

  private async createRecipe(createRecipeDto: CreateMongoRecipeDto) {
    const res = await this.httpService.axiosRef.post(
      `${this.configService.get('API_SERVER')}/recipe`,
      createRecipeDto,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.configService.get(
            'API_SERVER_ADMIN_SESSION_TOKEN',
          )}`,
        },
      },
    );
    if (res.status >= 400 || !res.data.success)
      throw new Error('recipe create failed');
    return res.data.data;
  }

  private async deleteRecipe(recipeId: number) {
    const res = await this.httpService.axiosRef.delete(
      `${this.configService.get('API_SERVER')}/recipe/${recipeId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.configService.get(
            'API_SERVER_ADMIN_SESSION_TOKEN',
          )}`,
        },
      },
    );
    if (res.status >= 400) throw new Error('recipe delete failed');
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
        const recipe = await this.createRecipe(createRecipeDto);
        await this.recipeScrapRepository.updateRecipeScrapRequestStatusToDone(
          req.id,
          recipe.id,
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
    const { origin_url: originUrl, recipe_id: recipeId } =
      confirmRecipeScrapRequestDto;
    const req = originUrl
      ? await this.recipeScrapRepository.findOneByUrl(originUrl)
      : await this.recipeScrapRepository.findOneByRecipeId(recipeId);
    if (confirmRecipeScrapRequestDto.confirm === 'confirm') {
      console.log('confirm');
      await this.recipeScrapRepository.deleteOne(req.id);
    } else if (confirmRecipeScrapRequestDto.confirm === 'reject') {
      console.log('reject');
      const res =
        await this.recipeScrapRepository.updateRecipeScrapRequestStatusToError(
          req.id,
        );
      await this.deleteRecipe(res.recipe_id);
    }
  }

  async rejectRecipeScrapRequest(recipeId: number) {
    const req = await this.recipeScrapRepository.findOneByRecipeId(recipeId);
    if (req) {
      await this.recipeScrapRepository.updateRecipeScrapRequestStatusToError(
        req.id.toString(),
      );
    }
    await this.deleteRecipe(recipeId);
    console.log('reject complete');
  }

  async deleteAllRecipeScrapRequest(filterDto: {
    status: RecipeScrapRequestStatus;
  }) {
    return await this.recipeScrapRepository.deleteAll(filterDto);
  }

  async deleteOne(id: string) {
    return await this.recipeScrapRepository.deleteOne(id);
  }

  async findAll() {
    return await this.recipeScrapRepository.findAll();
  }

  async findOneByUrl(url: string) {
    return await this.recipeScrapRepository.findOneByUrl(url);
  }
}
