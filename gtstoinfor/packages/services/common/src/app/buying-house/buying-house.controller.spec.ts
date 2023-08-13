import { Test, TestingModule } from '@nestjs/testing';
import { BuyingHouseController } from './buying-house.controller';

describe('BuyingHouseController', () => {
  let controller: BuyingHouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyingHouseController],
    }).compile();

    controller = module.get<BuyingHouseController>(BuyingHouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
