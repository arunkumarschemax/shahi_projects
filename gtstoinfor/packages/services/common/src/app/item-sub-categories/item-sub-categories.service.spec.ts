import { Test, TestingModule } from '@nestjs/testing';
import { ItemSubCategoriesService } from './item-sub-categories.service';

describe('ItemSubCategoriesService', () => {
  let service: ItemSubCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemSubCategoriesService],
    }).compile();

    service = module.get<ItemSubCategoriesService>(ItemSubCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
