import { Test, TestingModule } from '@nestjs/testing';
import { MasterBrandsController} from './master-brands.controller'

describe('MasterBrandsController', () => {
  let controller: MasterBrandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterBrandsController],
    }).compile();

    controller = module.get<MasterBrandsController>(MasterBrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
