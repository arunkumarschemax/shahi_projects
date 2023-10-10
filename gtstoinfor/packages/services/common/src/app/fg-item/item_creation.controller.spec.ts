import { Test, TestingModule } from '@nestjs/testing';
import {ItemCreationController} from './item_creation.controller'

describe('ItemCreationController', () => {
  let controller: ItemCreationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemCreationController],
    }).compile();

    controller = module.get<ItemCreationController>(ItemCreationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
