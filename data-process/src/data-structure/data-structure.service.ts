import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  chatGPTQueryRawTextFormat,
  chatGPTQueryRawTextFormatForAPI,
  chatGPTQueryString,
  chatGPTQueryStringAdder,
} from './resource/query';
import { ChatGPTWebappService } from './chatgpt-webapp.service';
import { RecipeStructuredDto } from './dto/recipe.dto';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

@Injectable()
export class DataStructureService {
  constructor(
    @Inject('OPENAI') private readonly openaiApi: OpenAI,
    private readonly chatGPTWebappService: ChatGPTWebappService,
    private readonly configService: ConfigService,
  ) {}

  private async extractByOpenAIAPI(
    recipeTextFromHtml: string,
  ): Promise<RecipeStructuredDto> {
    const history: ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content: chatGPTQueryStringAdder(recipeTextFromHtml),
      },
      {
        role: 'user',
        content: chatGPTQueryString,
      },
    ];
    const recipeStructuredText = (
      await this.openaiApi.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        messages: history,
        temperature: 0.0,
      })
    ).choices[0].message.content;
    history.push({
      role: 'assistant',
      content: recipeStructuredText,
    });
    console.log(recipeStructuredText);

    history.push({
      role: 'user',
      content: chatGPTQueryRawTextFormatForAPI,
    });
    const recipeRawText = (
      await this.openaiApi.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        messages: history,
        temperature: 0.0,
      })
    ).choices[0].message.content;
    history.push({
      role: 'assistant',
      content: recipeRawText,
    });
    console.log(recipeRawText);

    return {
      ...JSON.parse(recipeStructuredText),
      ...JSON.parse(recipeRawText),
    };
  }

  private async extractByChatGPTWebapp(
    recipeTextFromHtml: string,
  ): Promise<RecipeStructuredDto> {
    const session = await this.chatGPTWebappService.getSession();
    await session.sendMessage(chatGPTQueryString, false);

    const recipeStructured = JSON.parse(
      await session.sendMessage(chatGPTQueryStringAdder(recipeTextFromHtml)),
    );

    const recipeRawText = JSON.parse(
      await session.sendMessage(chatGPTQueryRawTextFormat),
    );

    await session.close();
    return {
      ...recipeRawText,
      ...recipeStructured,
    };
  }

  public async extractRecipeDataFromText(
    recipeRawText: string,
  ): Promise<RecipeStructuredDto> {
    if (this.configService.get('USE_CHATGPT_WEB_AUTOMATION') === 'true') {
      return await this.extractByChatGPTWebapp(recipeRawText);
    } else {
      return await this.extractByOpenAIAPI(recipeRawText);
    }
  }
}
