import { Test, TestingModule } from '@nestjs/testing';
import { ColourService } from './colour.service';

describe('ColourService', () => {
    let service: ColourService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ColourService],
      }).compile();
  
      service = module.get<ColourService>(ColourService);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });