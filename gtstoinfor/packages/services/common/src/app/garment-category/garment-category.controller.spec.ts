import { Test, TestingModule } from '@nestjs/testing';
import {GarmentCategoriesController} from './garment-category.controller'


describe('GarmentCategoriesController', () => {
    let controller: GarmentCategoriesController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [GarmentCategoriesController],
      }).compile();
  
      controller = module.get<GarmentCategoriesController>(GarmentCategoriesController);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });