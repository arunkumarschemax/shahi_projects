import { Test, TestingModule } from '@nestjs/testing';
import { ItemSubCategoriesController } from './item-sub-categories.controller';

describe('ItemSubCategoriesController', () => {
  let controller: ItemSubCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemSubCategoriesController],
    }).compile();

    controller = module.get<ItemSubCategoriesController>(ItemSubCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
