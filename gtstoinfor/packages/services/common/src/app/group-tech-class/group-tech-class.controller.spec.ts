import { Test, TestingModule } from '@nestjs/testing';
import { GroupTechClassController } from './group-tech-class.controller';

describe('ItemCategoriesController', () => {
  let controller: GroupTechClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupTechClassController],
    }).compile();

    controller = module.get<GroupTechClassController>(GroupTechClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
