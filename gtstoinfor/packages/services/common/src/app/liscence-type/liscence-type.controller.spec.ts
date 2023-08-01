import { Test, TestingModule } from '@nestjs/testing';
import { LiscenceTypeController } from './liscence-type-controller';

describe('DeliveryMethodController', () => {
  let controller: LiscenceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiscenceTypeController],
    }).compile();

    controller = module.get<LiscenceTypeController>(LiscenceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
