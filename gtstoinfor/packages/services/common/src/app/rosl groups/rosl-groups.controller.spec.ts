import { Test, TestingModule } from '@nestjs/testing';
import { ROSLGroupsController } from './rosl-groups.controller';

describe('ROSLGroupsController', () => {
  let controller: ROSLGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ROSLGroupsController],
    }).compile();

    controller = module.get<ROSLGroupsController>(ROSLGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
