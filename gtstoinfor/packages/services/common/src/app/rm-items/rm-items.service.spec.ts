import { Test, TestingModule } from '@nestjs/testing';
import {RmCreationservice} from './rm-item.service';


describe('Rmcreationservice', () => {
  let service: RmCreationservice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RmCreationservice],
    }).compile();

    service = module.get<RmCreationservice>(RmCreationservice);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
