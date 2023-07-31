import { Test, TestingModule } from '@nestjs/testing';
import { MasterBrandsService } from './master-brands.service';

describe('MasterBrandsService', () => {
  let service: MasterBrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterBrandsService],
    }).compile();

    service = module.get<MasterBrandsService>(MasterBrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
