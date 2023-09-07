import { Test, TestingModule } from '@nestjs/testing';
import { AdobeAcrobatApiService } from './adobe-acrobat-api.service';

describe('AdobeAcrobatApiService', () => {
  let service: AdobeAcrobatApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdobeAcrobatApiService],
    }).compile();

    service = module.get<AdobeAcrobatApiService>(AdobeAcrobatApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
