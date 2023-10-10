import { Module } from '@nestjs/common';
import { DataStructureService } from './data-structure.service';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatGPTWebappService } from './chatgpt-webapp.service';
import { WebAutomationModule } from '../web-automation/web-automation.module';

@Module({
  imports: [WebAutomationModule],
  providers: [
    DataStructureService,
    {
      provide: 'OPENAI',
      useFactory: async (configService: ConfigService) => {
        return new OpenAI({ apiKey: configService.get('CHATGPT_API_KEY') });
      },
      inject: [ConfigService],
    },
    ChatGPTWebappService,
  ],
  exports: [DataStructureService],
})
export class DataStructureModule {}
