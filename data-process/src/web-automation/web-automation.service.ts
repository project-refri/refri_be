import { Inject, Injectable } from '@nestjs/common';
import { htmlToText } from 'html-to-text';
import { Browser, PuppeteerNode } from 'puppeteer';
import { Page } from './domain/page.domain';

@Injectable()
export class WebAutomationService {
  private browser: Browser;
  constructor(
    @Inject('PUPPETEER') private readonly scrapper: PuppeteerNode,
    @Inject('HTML_TO_TEXT') private readonly convert: typeof htmlToText,
  ) {}

  async initBrowser() {
    if (!!this.browser) return;
    this.browser = await this.scrapper.launch({
      // headless: false,
      // devtools: true,
      headless: 'new',
      protocolTimeout: 10 ** 8,
    });
  }

  async getPage() {
    const page = await this.browser.newPage();
    page.setViewport({
      width: 900,
      height: 700,
    });
    return new Page(page);
  }

  async extractHtmlTextFromPageContent(
    htmlText: string,
    cssSelectors?: string[],
  ) {
    return this.convert(htmlText, {
      baseElements: {
        selectors: cssSelectors ?? ['*'],
      },
    });
  }

  async closeBrower() {
    if (this.browser) await this.browser.close();
    this.browser = null;
  }
}
