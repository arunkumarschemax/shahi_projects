import { Test, TestingModule } from '@nestjs/testing';
import { FabricWeaveService } from './fabric-weave.service';

describe('FabricWeaveService', () => {
  let service: FabricWeaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FabricWeaveService],
    }).compile();

    service = module.get<FabricWeaveService>(FabricWeaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
