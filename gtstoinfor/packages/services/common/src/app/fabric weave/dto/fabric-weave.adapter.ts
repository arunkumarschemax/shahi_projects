import {Injectable} from '@nestjs/common';
import { FabriCWeaveDto } from './fabric-weave.dto';
import { FabricWeave } from '../fabric-weave.entity';

@Injectable()
export class FabricWeaveAdapter {
    /**
     * 
     * @param fabricWeaveDto 
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity(  fabricWeaveDto: FabriCWeaveDto,  isUpdate: boolean = false ): FabricWeave {
        const fabricWeave = new FabricWeave();
        fabricWeave.fabricWeaveName = fabricWeaveDto.fabricWeaveName;
        fabricWeave.fabricWeaveCode = fabricWeaveDto.fabricWeaveCode;
        fabricWeave.fabricWeaveImageName = fabricWeaveDto.fabricWeaveImageName;
        fabricWeave.fabricWeaveImagePath = fabricWeaveDto.fabricWeaveImagePath
        fabricWeave.isActive = fabricWeaveDto.isActive == undefined?true:fabricWeaveDto.isActive;
        if (isUpdate) {
            fabricWeave.fabricWeaveId=fabricWeaveDto.fabricWeaveId;
            fabricWeave.updatedUser = fabricWeaveDto.updatedUser;
        } else {
            fabricWeave.isActive = true;
            fabricWeave.createdUser = fabricWeaveDto.createdUser;
        }
       return fabricWeave;
      }
      
      public convertEntityToDto(fabricWeaveData: FabricWeave): FabriCWeaveDto {
        const fabricWeaveDto = new FabriCWeaveDto;
        fabricWeaveDto.fabricWeaveId = fabricWeaveData.fabricWeaveId;
        fabricWeaveDto.fabricWeaveName = fabricWeaveData.fabricWeaveName;
        fabricWeaveDto.fabricWeaveImageName = fabricWeaveData.fabricWeaveImageName
        fabricWeaveDto.fabricWeaveImagePath = fabricWeaveData.fabricWeaveImagePath
        fabricWeaveDto.fabricWeaveCode = fabricWeaveData.fabricWeaveCode
        fabricWeaveDto.isActive = fabricWeaveData.isActive;
        fabricWeaveDto.createdAt = fabricWeaveData.createdAt;
        fabricWeaveDto.updatedAt = fabricWeaveData.updatedAt;
        fabricWeaveDto.createdUser = fabricWeaveData.createdUser;
        fabricWeaveDto.updatedUser = fabricWeaveData.updatedUser;
        fabricWeaveDto.versionFlag = fabricWeaveData.versionFlag;
        return fabricWeaveDto;
      }
}