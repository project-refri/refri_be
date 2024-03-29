import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  chatGPTQueryRawTextFormatForAPI,
  chatGPTQueryStringAdderForAPI,
  chatGPTQueryStringForAPI,
} from './resource/query-api';
import { ChatGPTWebappService } from './chatgpt-webapp.service';
import { RecipeStructuredDto } from './dto/recipe.dto';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import {
  chatGPTQueryRawTextFormat,
  chatGPTQueryString,
  chatGPTQueryStringAdder,
} from './resource/query-web';

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
        content: chatGPTQueryStringAdderForAPI(recipeTextFromHtml),
      },
    ];
    const firstInstructionText = (
      await this.openaiApi.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        messages: history,
        temperature: 0.0,
      })
    ).choices[0].message.content;
    history.push({
      role: 'assistant',
      content: firstInstructionText,
    });
    console.log(firstInstructionText);

    history.push({
      role: 'user',
      content: chatGPTQueryStringForAPI,
    });
    const recipeStructuredText = (
      await this.openaiApi.chat.completions.create(
        {
          model: 'gpt-3.5-turbo-16k',
          messages: history,
          temperature: 0.0,
        },
        {
          timeout: 20 * 60 * 1000,
        },
      )
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
      await this.openaiApi.chat.completions.create(
        {
          model: 'gpt-3.5-turbo-16k',
          messages: history,
          temperature: 0.0,
        },
        {
          timeout: 20 * 60 * 1000,
        },
      )
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

  private async extractByOpenAIAPIWithStream(
    recipeTextFromHtml: string,
  ): Promise<RecipeStructuredDto> {
    const history: ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content: chatGPTQueryStringAdderForAPI(recipeTextFromHtml),
      },
    ];
    console.log(new Date());
    const firstInstructionStream = await this.openaiApi.chat.completions.create(
      {
        model: 'gpt-3.5-turbo-16k',
        messages: history,
        temperature: 0.0,
        stream: true,
      },
    );
    let firstInstructionText = '';
    for await (const chunk of firstInstructionStream) {
      if (chunk?.choices[0]?.delta?.content) {
        firstInstructionText += chunk.choices[0].delta.content;
        process.stdout.write(chunk.choices[0].delta.content);
      }
    }
    history.push({
      role: 'assistant',
      content: firstInstructionText,
    });
    console.log();

    history.push({
      role: 'user',
      content: chatGPTQueryStringForAPI,
    });
    console.log(new Date());
    const recipeStructuredTextStream =
      await this.openaiApi.chat.completions.create(
        {
          model: 'gpt-3.5-turbo-16k',
          messages: history,
          temperature: 0.0,
          stream: true,
        },
        {
          timeout: 20 * 60 * 1000,
        },
      );
    let recipeStructuredText = '';
    for await (const chunk of recipeStructuredTextStream) {
      if (chunk?.choices[0]?.delta?.content) {
        recipeStructuredText += chunk.choices[0].delta.content;
        process.stdout.write(chunk.choices[0].delta.content);
      }
    }
    history.push({
      role: 'assistant',
      content: recipeStructuredText,
    });
    console.log();

    history.push({
      role: 'user',
      content: chatGPTQueryRawTextFormatForAPI,
    });
    console.log(new Date());
    const recipeRawTextStream = await this.openaiApi.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: history,
      temperature: 0.0,
      stream: true,
    });
    let recipeRawText = '';
    for await (const chunk of recipeRawTextStream) {
      if (chunk?.choices[0]?.delta?.content) {
        recipeRawText += chunk.choices[0].delta.content;
        process.stdout.write(chunk.choices[0].delta.content);
      }
    }
    history.push({
      role: 'assistant',
      content: recipeRawText,
    });
    console.log();

    return {
      ...JSON.parse(recipeStructuredText),
      ...JSON.parse(recipeRawText),
    };
  }

  private async extractByChatGPTWebapp(
    recipeTextFromHtml: string,
  ): Promise<RecipeStructuredDto> {
    const session = await this.chatGPTWebappService.getSession();

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
      return await this.extractByOpenAIAPIWithStream(recipeRawText);
    }
  }
}
