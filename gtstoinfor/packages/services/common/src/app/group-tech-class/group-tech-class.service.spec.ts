import { Test, TestingModule } from '@nestjs/testing';
import { GroupTechClassService } from './group-tech-class.service';

describe('ItemCategoriesService', () => {
  let service: GroupTechClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTechClassService],
    }).compile();

    service = module.get<GroupTechClassService>(GroupTechClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
