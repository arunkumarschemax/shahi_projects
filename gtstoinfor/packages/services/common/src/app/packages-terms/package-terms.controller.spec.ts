import { Test, TestingModule } from '@nestjs/testing';
import {PackageTermsController} from './package-terms.controller'

describe('PackageTermsController', () => {
  let controller: PackageTermsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageTermsController],
    }).compile();

    controller = module.get<PackageTermsController>(PackageTermsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
