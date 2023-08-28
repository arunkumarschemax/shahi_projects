import { Test, TestingModule } from '@nestjs/testing';
import {AccountControlObjectController} from '../account-control-objects/account-control-objects-controller'
describe('FabricTypeController', () => {
    let controller: AccountControlObjectController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AccountControlObjectController],
      }).compile();
  
      controller = module.get<AccountControlObjectController>(AccountControlObjectController);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });