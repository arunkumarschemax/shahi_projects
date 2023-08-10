import { Test, TestingModule } from '@nestjs/testing';
import { ProfitControlHeadService } from './profit-control-head.service';

describe('ProfitControlHeadService', () => {
    let service: ProfitControlHeadService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ProfitControlHeadService],
      }).compile();
  
      service = module.get<ProfitControlHeadService>(ProfitControlHeadService);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
