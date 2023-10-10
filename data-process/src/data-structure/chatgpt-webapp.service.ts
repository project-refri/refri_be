import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebAutomationService } from '../web-automation/web-automation.service';
import { Page } from '../web-automation/domain/page.domain';

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
      'body > div > main > section > div > div > div > div.c62f2b894.ca3576e72 > div > form > div.c6d5cc3be > button',
    );
    await this.page.typeText(
      this.configService.get('CHATGPT_PW'),
      '#password',
      10,
    );
    await this.page.clickButtonToNavigate(
      'body > div.oai-wrapper > main > section > div > div > div > form > div.c6d5cc3be > button',
      3000,
    );

    await this.closeModal();
    return true;
  }

  private async closeModal() {
    await new Promise((r) => setTimeout(r, 8 * 1000));

    await Promise.allSettled([
      this.page.clickButtonWithDelay(
        '#radix-\\:rl\\: > div.p-4.sm\\:p-6.sm\\:pt-4 > div > div.flex.flex-row.justify-end > button',
      ),
      this.page.clickButtonWithDelay(
        '#radix-\\:rp\\: > div.p-4.sm\\:p-6.sm\\:pt-4 > div > div.flex.flex-row.justify-end > button',
      ),
      this.page.clickButtonWithDelay(
        '#radix-\\:rc\\: > div.p-4.sm\\:p-6.sm\\:pt-4 > div > div.flex.flex-row.justify-end > button',
      ),
      this.page.clickButtonWithDelay(
        '#radix-\\:rg\\: > div.p-4.sm\\:p-6.sm\\:pt-4 > div > div.flex.flex-row.justify-end > button',
      ),
      this.page.clickButtonWithDelay(
        '#radix-\\:rs\\: > div.p-4.sm\\:p-6.sm\\:pt-4 > div > div.flex.flex-row.justify-end > button',
      ),
    ]);

    await new Promise((r) => setTimeout(r, 2 * 1000));
  }

  private async extractResponseFromCodeBlock() {
    const response = await (
      await this.page.getElementByCssSelector(
        `#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div > div > main > div.flex.h-full > div.flex-1.overflow-hidden > div > div > div > div:nth-child(${
          this.history.length + 2
        }) > div > div > div.relative.flex.w-\\[calc\\(100\\%-50px\\)\\].flex-col.gap-1.md\\:gap-3.lg\\:w-\\[calc\\(100\\%-115px\\)\\] > div.flex.flex-grow.flex-col.gap-3.max-w-full > div > div > pre > div > div.p-4.overflow-y-auto`,
      )
    ).evaluate((e) => e.textContent);
    this.history.push(response);
    return response;
  }

  private async extractResponse() {
    const response = await (
      await this.page.getElementByCssSelector(
        `#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div > div > main > div.flex.h-full > div.flex-1.overflow-hidden > div > div > div > div:nth-child(${
          this.history.length + 2
        }) > div > div > div.relative.flex.w-\\[calc\\(100\\%-50px\\)\\].flex-col.gap-1.md\\:gap-3.lg\\:w-\\[calc\\(100\\%-115px\\)\\] > div.flex.flex-grow.flex-col.gap-3.max-w-full`,
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
      '#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div > div > main > div.flex.h-full > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2.md\\:pl-2.md\\:w-\\[calc\\(100\\%-\\.5rem\\)\\] > form > div > div.flex.w-full.items-center > div > button',
    );
    await new Promise((r) => setTimeout(r, 3000));
  }

  private async waitForResponse() {
    for (;;) {
      await this.page.waitForDOMChange(
        `#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div > div > main > div.flex.h-full > div.flex-1.overflow-hidden > div > div > div > div:nth-child(${
          this.history.length + 2
        }) > div > div > div.relative.flex.w-\\[calc\\(100\\%-50px\\)\\].flex-col.gap-1.md\\:gap-3.lg\\:w-\\[calc\\(100\\%-115px\\)\\] > div.flex.flex-grow.flex-col.gap-3.max-w-full`,
      );
      const button = (
        await this.page.getElementsByCssSelector(
          '#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.flex.h-full > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2.md\\:pl-2.md\\:w-\\[calc\\(100\\%-\\.5rem\\)\\] > form > div > div:nth-child(1) > div > div.flex.items-center.md\\:items-end > div > button',
        )
      )[0];
      if ((await button.evaluate((e) => e.textContent)) !== 'Regenerate') {
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
        if (response.length == 0) continue;
        console.log(response);
        return response;
      } catch (e) {
        const button = (
          await this.page.getElementsByCssSelector(
            '#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.flex.h-full > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2.md\\:pl-2.md\\:w-\\[calc\\(100\\%-\\.5rem\\)\\] > form > div > div:nth-child(1) > div > div.flex.items-center.md\\:items-end > div > button',
          )
        )[0];
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
