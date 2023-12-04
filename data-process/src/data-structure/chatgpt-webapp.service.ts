import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebAutomationService } from '../web-automation/web-automation.service';
import { Page } from '../web-automation/domain/page.domain';

const xPath = (xpath: string) => '::-p-xpath(' + xpath + ')';

@Injectable()
export class ChatGPTWebappService {
  private isLoginPromise = Promise.resolve(false);
  constructor(
    private readonly webAutomationService: WebAutomationService,
    private readonly configService: ConfigService,
  ) {}

  async getSession(): Promise<ChatGPTWebappSession> {
    const session = new ChatGPTWebappSession(
      this.webAutomationService,
      this.configService,
    );
    // if (!(await this.isLoginPromise)) {
    //   const loginPromise = session.loginChatGPT();
    //   this.isLoginPromise = loginPromise;
    //   await loginPromise;
    // } else {
    //   await session.gotoChatGPT();
    // }
    await session.loginChatGPT();
    return session;
  }
}

export class ChatGPTWebappSession {
  private history: string[] = [];
  private page: Page;

  constructor(
    private readonly webAutomationService: WebAutomationService,
    private readonly configService: ConfigService,
  ) {}

  async close() {
    await this.page.close();
  }

  async gotoChatGPT() {
    await this.webAutomationService.initBrowser();
    this.page = await this.webAutomationService.getPage();
    await this.page.gotoUrl('https://chat.openai.com/');
    await this.closeModal();
  }

  async loginChatGPT() {
    await this.webAutomationService.initBrowser();
    this.page = await this.webAutomationService.getPage();
    await this.page.gotoUrl('https://chat.openai.com/auth/login');
    await this.page.clickButtonToNavigate(
      '#__next > div.flex.min-h-full.w-screen.flex-col.sm\\:supports-\\[min-height\\:100dvh\\]\\:min-h-\\[100dvh\\].md\\:grid.md\\:grid-cols-2.lg\\:grid-cols-\\[60\\%_40\\%\\] > div.relative.flex.grow.flex-col.items-center.justify-between.bg-white.px-5.py-8.text-black.dark\\:bg-black.dark\\:text-white.sm\\:rounded-t-\\[30px\\].md\\:rounded-none.md\\:px-6 > div.relative.flex.w-full.grow.flex-col.items-center.justify-center > div > div > button:nth-child(1)',
    );
    await this.page.typeText(
      this.configService.get('CHATGPT_ID'),
      '#username',
      10,
    );

    await this.page.clickButtonWithDelay(
      xPath(
        '/html/body/div/main/section/div/div/div/div[1]/div/form/div[2]/button',
      ),
    );
    await this.page.typeText(
      this.configService.get('CHATGPT_PW'),
      '#password',
      10,
    );
    await this.page.clickButtonToNavigate(
      xPath('/html/body/div[1]/main/section/div/div/div/form/div[3]/button'),
      3000,
    );

    await this.closeModal();
    return true;
  }

  private async closeModal() {
    await new Promise((r) => setTimeout(r, 8 * 1000));

    await Promise.allSettled([
      this.page.clickButtonWithDelay(
        xPath('//*[@id="radix-:rh:"]/div[2]/div/div[4]/button'),
      ),
      this.page.clickButtonWithDelay(
        xPath('//*[@id="radix-:rl:"]/div[2]/div/div[4]/button'),
      ),
      this.page.clickButtonWithDelay(
        xPath('//*[@id="radix-:ro:"]/div[2]/div/div[4]/button'),
      ),
      this.page.clickButtonWithDelay(
        xPath('//*[@id="radix-:rf:"]/div[2]/div/div[4]/button'),
      ),
      this.page.clickButtonWithDelay(
        xPath('//*[@id="radix-:rb:"]/div[2]/div/div[4]/button'),
      ),
      this.page.clickButtonWithDelay(
        xPath('//*[@id="radix-:rg:"]/div[2]/div/div[4]/button'),
      ),
    ]);
    await new Promise((r) => setTimeout(r, 2 * 1000));
  }

  private async extractResponseFromCodeBlock() {
    let response: string;
    try {
      response = await (
        await this.page.getElementByCssSelector(
          xPath(
            `//*[@id="__next"]/div[1]/div[2]/main/div[2]/div[1]/div/div/div/div[${
              this.history.length + 2
            }]/div/div/div[2]/div[2]/div[1]/div/div`,
          ),
        )
      ).evaluate((e) => e.textContent);
    } catch (e) {
      response = await (
        await this.page.getElementByCssSelector(
          xPath(
            `//*[@id="__next"]/div[1]/div[2]/main/div[2]/div[1]/div/div/div/div[${
              this.history.length + 2
            }]/div/div/div[2]/div[2]/div[1]/div/div/pre/div/div[2]/code`,
          ),
        )
      ).evaluate((e) => e.textContent);
    }
    this.history.push(response);
    return response;
  }

  private async extractResponse() {
    const response = await (
      await this.page.getElementByCssSelector(
        xPath(
          `//*[@id="__next"]/div[1]/div[2]/main/div[2]/div[1]/div/div/div/div[${
            this.history.length + 2
          }]/div/div/div[2]/div[2]/div[1]/div/div`,
        ),
      )
    ).evaluate((e) => e.textContent);
    this.history.push(response);
    return response;
  }

  private async typeInput(message: string) {
    this.history.push(message);
    await this.page.addTextToTextArea(message, '#prompt-textarea');
    await this.page.typeText('\n', '#prompt-textarea', 0);

    await new Promise((r) => setTimeout(r, 200));
  }

  private async sendInput() {
    await this.page.clickButtonWithDelay(
      xPath(
        '//*[@id="__next"]/div[1]/div[2]/main/div[2]/div[2]/form/div/div/div/button',
      ),
    );
    await new Promise((r) => setTimeout(r, 3000));
  }

  private async waitForResponse() {
    for (;;) {
      await this.page.waitForDOMChangeByXPath(
        `//*[@id="__next"]/div[1]/div[2]/main/div[2]/div[1]/div/div/div/div[${
          this.history.length + 2
        }]/div/div/div[2]/div[2]/div[1]/div/div`,
      );
      const button = await this.page.getElementByCssSelector(
        xPath(
          '//*[@id="__next"]/div[1]/div[2]/main/div[2]/div[2]/form/div/div[1]/div/div[2]/div/button',
        ),
      );
      if (
        button &&
        (await button.evaluate((e) => e.textContent)) !== 'Regenerate'
      ) {
        //click regenerate button
        await button.click();
        continue;
      }
      break;
    }
  }

  async sendMessage(message: string, code = true) {
    await this.typeInput(message);

    for (let retry = 0; retry < 3; retry++) {
      try {
        await this.sendInput();
        await this.waitForResponse();
        let response: string;
        if (code) {
          response = await this.extractResponseFromCodeBlock();
        } else {
          response = await this.extractResponse();
        }
        console.log(response);
        if (response.length == 0) continue;
        return response;
      } catch (e) {
        const button = await this.page.getElementByCssSelector(
          xPath(
            '//*[@id="__next"]/div[1]/div[2]/main/div[2]/div[2]/form/div/div[1]/div/div[2]/div/button',
          ),
        );
        if (!!button) {
          await this.closeModal();
        } else if (
          (await button.evaluate((e) => e.textContent)) === 'Regenerate'
        ) {
          await button.click();
        }
      }
    }
    throw new Error('Failed to get response');
  }
}
