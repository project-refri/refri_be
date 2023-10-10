import { Test, TestingModule } from '@nestjs/testing';
import { WebAutomationService } from './web-automation.service';

describe('WebAutomationService', () => {
  let service: WebAutomationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebAutomationService],
    }).compile();

    service = module.get<WebAutomationService>(WebAutomationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
