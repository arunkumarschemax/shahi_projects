import { Test, TestingModule  } from '@nestjs/testing';
import {FabricTypeService} from './fabric-type.service'

describe ('FabricTypeService',()=>{
    let service: FabricTypeService;

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[FabricTypeService],
    }).compile()
    service=module.get<FabricTypeService>(FabricTypeService);
    })
    it('should be defined', () => {
        expect(service).toBeDefined();
      });
})