import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryTermsService } from './delivery-terms.service';

describe('DeliveryTermsService', () => {
  let service: DeliveryTermsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryTermsService],
    }).compile();

    service = module.get<DeliveryTermsService>(DeliveryTermsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
