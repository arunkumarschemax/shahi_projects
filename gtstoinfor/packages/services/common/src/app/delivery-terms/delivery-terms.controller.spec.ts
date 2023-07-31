import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryTermsController } from './delivery-terms.controller';

describe('DeliveryTermsController', () => {
  let controller: DeliveryTermsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryTermsController],
    }).compile();

    controller = module.get<DeliveryTermsController>(DeliveryTermsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
