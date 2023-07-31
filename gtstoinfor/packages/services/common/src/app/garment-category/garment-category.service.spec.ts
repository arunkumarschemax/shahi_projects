import { Test, TestingModule } from '@nestjs/testing';
import{GarmentCategoryService} from './garment-category.service';

describe('GarmentCategoryService', () => {
  let service: GarmentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GarmentCategoryService],
    }).compile();

    service = module.get<GarmentCategoryService>(GarmentCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
