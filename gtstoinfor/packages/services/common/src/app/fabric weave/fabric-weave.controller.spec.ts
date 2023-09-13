import { Test, TestingModule } from '@nestjs/testing';
import { FabricWeaveController } from './fabric-weave.controller';

describe('FabricWeaveController', () => {
  let controller: FabricWeaveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FabricWeaveController],
    }).compile();

    controller = module.get<FabricWeaveController>(FabricWeaveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
