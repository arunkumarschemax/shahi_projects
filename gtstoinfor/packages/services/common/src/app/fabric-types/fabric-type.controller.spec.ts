import { Test, TestingModule } from '@nestjs/testing';
import {FabricTypeController} from './fabric-type.controller'

describe('FabricTypeController', () => {
  let controller: FabricTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FabricTypeController],
    }).compile();

    controller = module.get<FabricTypeController>(FabricTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});