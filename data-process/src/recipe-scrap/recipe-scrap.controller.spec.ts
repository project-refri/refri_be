import { Test, TestingModule } from '@nestjs/testing';
import { RecipeScrapController } from './recipe-scrap.controller';
import { RecipeScrapService } from './recipe-scrap.service';

describe('RecipeScrapController', () => {
  let controller: RecipeScrapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeScrapController],
      providers: [RecipeScrapService],
    }).compile();

    controller = module.get<RecipeScrapController>(RecipeScrapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
