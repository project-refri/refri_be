import { Page as WebPage } from 'puppeteer';

export class Page {
  constructor(private readonly page: WebPage) {}

  async gotoUrl(url: string) {
    await Promise.all([this.page.goto(url), this.page.waitForNavigation()]);
    await new Promise((r) => setTimeout(r, 1500));
  }

  async clickButtonWithDelay(cssSelector: string, delay?: number) {
    await Promise.all([
      this.page.waitForSelector(cssSelector),
      this.page.click(cssSelector),
    ]);
    await new Promise((r) => setTimeout(r, delay || 500));
  }

  async clickButtonToNavigate(cssSelector: string, delay?: number) {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.waitForSelector(cssSelector),
      this.page.click(cssSelector),
    ]);
    await new Promise((r) => setTimeout(r, delay || 1500));
  }

  async typeText(text: string, cssSelector?: string, delay?: number) {
    if (cssSelector) {
      await this.page.waitForSelector(cssSelector);
      await this.page.type(cssSelector, text, { delay: delay ?? 50 });
    } else {
      await this.page.keyboard.type(text, { delay: delay ?? 50 });
    }
  }

  async addTextToTextArea(text: string, cssSelector: string) {
    await this.page.waitForSelector(cssSelector);
    await this.page.evaluate(
      (text, cssSelector) => {
        const element = document.querySelector(
          cssSelector,
        ) as HTMLTextAreaElement;
        element.value = text;
      },
      text,
      cssSelector,
    );
  }

  async waitForDOMChange(cssSelector: string) {
    await this.page.waitForSelector(cssSelector);
    await this.page.waitForFunction(
      async (cssSelector) => {
        const oldTextLength =
          document.querySelector(cssSelector).textContent.length;
        await new Promise((r) => setTimeout(r, 10000));
        const newTextLength =
          document.querySelector(cssSelector).textContent.length;
        return newTextLength === oldTextLength;
      },
      {
        polling: 5000,
        timeout: 2 * 10 ** 6,
      },
      cssSelector,
    );
    await new Promise((r) => setTimeout(r, 3000));
  }

  async extractHtml(): Promise<string> {
    return await this.page.content();
  }

  async getElementsByCssSelector(cssSelector: string) {
    return await this.page.$$(cssSelector);
  }

  async getElementByCssSelector(cssSelector: string) {
    return await this.page.$(cssSelector);
  }

  async close() {
    await this.page.close();
  }
}
