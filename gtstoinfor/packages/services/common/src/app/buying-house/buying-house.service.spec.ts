import { Test, TestingModule } from '@nestjs/testing';
import { BuyingHouseService } from './buying-house.service';

describe('BuyingHouseService', () => {
  let service: BuyingHouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyingHouseService],
    }).compile();

    service = module.get<BuyingHouseService>(BuyingHouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
