import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryMethodController } from './delivery-method.controller';

describe('DeliveryMethodController', () => {
  let controller: DeliveryMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryMethodController],
    }).compile();

    controller = module.get<DeliveryMethodController>(DeliveryMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
