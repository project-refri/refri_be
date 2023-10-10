import { Test, TestingModule } from '@nestjs/testing';
import { DataStructureService } from './data-structure.service';

describe('DataStructureService', () => {
  let service: DataStructureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataStructureService],
    }).compile();

    service = module.get<DataStructureService>(DataStructureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
