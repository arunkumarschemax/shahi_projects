import { Test, TestingModule } from '@nestjs/testing';
import {FabricSubTypeService} from  './fabric-sub-type.service'
describe('FabricSubTypeService', () => {
  let service: FabricSubTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FabricSubTypeService],
    }).compile();

    service = module.get<FabricSubTypeService>(FabricSubTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});