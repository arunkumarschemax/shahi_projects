import { Test, TestingModule } from '@nestjs/testing';
import { RmCreationController } from './rm-items.controller';

describe('RmCreationController', () => {
  let controller: RmCreationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RmCreationController],
    }).compile();

    controller = module.get<RmCreationController>(RmCreationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
