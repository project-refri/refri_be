import { Module } from '@nestjs/common';
import { WebAutomationService } from './web-automation.service';
import puppeteer from 'puppeteer-extra';
import { convert } from 'html-to-text';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

@Module({
  providers: [
    WebAutomationService,
    {
      provide: 'PUPPETEER',
      useFactory: () => {
        const pup = puppeteer.use(StealthPlugin());
        return pup;
      },
    },
    {
      provide: 'HTML_TO_TEXT',
      useValue: convert,
    },
  ],
  exports: [WebAutomationService],
})
export class WebAutomationModule {}
