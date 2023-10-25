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
    ]);
    await new Promise((r) => setTimeout(r, 2 * 1000));
  }

  private async extractResponseFromCodeBlock() {
    let response: string;
    try {
      response = await (
        await this.page.getElementByCssSelector(
          '#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col > div.flex-1.overflow-hidden > div > div > div > div.group.final-completion.w-full.text-token-text-primary.border-b.border-black\\/10.gizmo\\:border-0.dark\\:border-gray-900\\/50.gizmo\\:dark\\:border-0.bg-gray-50.gizmo\\:bg-transparent.dark\\:bg-\\[\\#444654\\].gizmo\\:dark\\:bg-transparent > div > div > div.relative.flex.w-\\[calc\\(100\\%-50px\\)\\].flex-col.gizmo\\:w-full.lg\\:w-\\[calc\\(100\\%-115px\\)\\].agent-turn > div > div.flex.flex-grow.flex-col.gap-3.max-w-full > div > div > pre > div > div.p-4.overflow-y-auto',
        )
      ).evaluate((e) => e.textContent);
    } catch (e) {
      response = await (
        await this.page.getElementByCssSelector(
          '#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col > div.flex-1.overflow-hidden > div > div > div > div.group.final-completion.w-full.text-token-text-primary.border-b.border-black\\/10.gizmo\\:border-0.dark\\:border-gray-900\\/50.gizmo\\:dark\\:border-0.bg-gray-50.gizmo\\:bg-transparent.dark\\:bg-\\[\\#444654\\].gizmo\\:dark\\:bg-transparent > div > div > div.relative.flex.w-\\[calc\\(100\\%-50px\\)\\].flex-col.gizmo\\:w-full.lg\\:w-\\[calc\\(100\\%-115px\\)\\].agent-turn > div > div.flex.flex-grow.flex-col.gap-3.max-w-full',
        )
      ).evaluate((e) => e.textContent);
    }
    this.history.push(response);
    return response;
  }

  private async extractResponse() {
    const response = await (
      await this.page.getElementByCssSelector(
        '#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col > div.flex-1.overflow-hidden > div > div > div > div.group.final-completion.w-full.text-token-text-primary.border-b.border-black\\/10.gizmo\\:border-0.dark\\:border-gray-900\\/50.gizmo\\:dark\\:border-0.bg-gray-50.gizmo\\:bg-transparent.dark\\:bg-\\[\\#444654\\].gizmo\\:dark\\:bg-transparent > div > div > div.relative.flex.w-\\[calc\\(100\\%-50px\\)\\].flex-col.gizmo\\:w-full.lg\\:w-\\[calc\\(100\\%-115px\\)\\].agent-turn > div > div.flex.flex-grow.flex-col.gap-3.max-w-full',
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
        '//*[@id="__next"]/div[1]/div[2]/main/div[1]/div[2]/form/div/div[2]/div/button',
      ),
    );
    await new Promise((r) => setTimeout(r, 3000));
  }

  private async waitForResponse() {
    for (;;) {
      await this.page.waitForDOMChange(
        '#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col > div.flex-1.overflow-hidden > div > div > div > div.group.final-completion.w-full.text-token-text-primary.border-b.border-black\\/10.gizmo\\:border-0.dark\\:border-gray-900\\/50.gizmo\\:dark\\:border-0.bg-gray-50.gizmo\\:bg-transparent.dark\\:bg-\\[\\#444654\\].gizmo\\:dark\\:bg-transparent > div > div > div.relative.flex.w-\\[calc\\(100\\%-50px\\)\\].flex-col.gizmo\\:w-full.lg\\:w-\\[calc\\(100\\%-115px\\)\\].agent-turn > div > div.flex.flex-grow.flex-col.gap-3.max-w-full',
      );
      const button = await this.page.getElementByCssSelector(
        '#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col > div.w-full.pt-2.md\\:pt-0.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:pl-2.md\\:w-\\[calc\\(100\\%-\\.5rem\\)\\].absolute.bottom-0.left-0.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient > form > div > div:nth-child(1) > div > div.flex.items-center.md\\:items-end > div > button',
      );
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
        console.log(response);
        if (response.length == 0) continue;
        return response;
      } catch (e) {
        const button = await this.page.getElementsByCssSelector(
          xPath(
            '//*[@id="__next"]/div[1]/div[2]/main/div[1]/div[2]/form/div/div[1]/div/div[2]/div/button',
          ),
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
