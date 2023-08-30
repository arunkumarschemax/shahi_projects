import { Test, TestingModule } from '@nestjs/testing';
import {AccountControlObjectService} from './account-control-object-service'
describe('AccountControlObjectService', () => {
  let service: AccountControlObjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountControlObjectService],
    }).compile();

    service = module.get<AccountControlObjectService>(AccountControlObjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});