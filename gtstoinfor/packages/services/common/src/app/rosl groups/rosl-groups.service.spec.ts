import { Test, TestingModule } from '@nestjs/testing';
import { ROSLGroupsService } from './rosl-groups.service';

describe('ROSLGroupsService', () => {
  let service: ROSLGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ROSLGroupsService],
    }).compile();

    service = module.get<ROSLGroupsService>(ROSLGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
