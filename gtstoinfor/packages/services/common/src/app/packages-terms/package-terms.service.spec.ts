import { Test, TestingModule } from '@nestjs/testing';
import  {PackageTermsService } from './package-terms.service'

describe('PackageTermsService', () => {
  let service: PackageTermsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageTermsService],
    }).compile();

    service = module.get<PackageTermsService>(PackageTermsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
