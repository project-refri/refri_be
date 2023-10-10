import { Test, TestingModule } from '@nestjs/testing';
import { RecipeScrapService } from './recipe-scrap.service';

describe('RecipeScrapService', () => {
  let service: RecipeScrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeScrapService],
    }).compile();

    service = module.get<RecipeScrapService>(RecipeScrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
