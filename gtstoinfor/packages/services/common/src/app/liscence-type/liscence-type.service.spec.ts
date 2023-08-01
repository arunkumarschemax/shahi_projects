import { Test, TestingModule } from '@nestjs/testing';
import { LiscenceTypeService } from './liscence-type.service';

describe('PaymentModeService', () => {
  let service: LiscenceTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiscenceTypeService],
    }).compile();

    service = module.get<LiscenceTypeService>(LiscenceTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
