import { Injectable } from "@nestjs/common";
import { FabricFinishTypesDTO } from "./fabric-finish-types.dto";
import { FabricFinishTypes } from "../fabric-finish-types.entity";

@Injectable()
export class FabricFinishTypesAdapter {
    /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity( fabricFinishTypeDto: FabricFinishTypesDTO , isUpdate: boolean = false): FabricFinishTypes {
    const fabricFinishTypes = new FabricFinishTypes();
    fabricFinishTypes.fabricFinishType = fabricFinishTypeDto.fabricFinishType;
    fabricFinishTypes.fabricFinishTypeId = fabricFinishTypeDto.fabricFinishTypeId;
    fabricFinishTypes.isActive = fabricFinishTypeDto.isActive == undefined?true:fabricFinishTypeDto.isActive;
    if(isUpdate){
        fabricFinishTypes.updatedUser = fabricFinishTypes.updatedUser;
    } else {
        fabricFinishTypes.isActive = true;
        fabricFinishTypes.createdUser = fabricFinishTypeDto.createdUser;
    }
    return fabricFinishTypes;
  }
  public convertEntityToDto(fabricFinishTypesObject: FabricFinishTypes): FabricFinishTypesDTO {
    const fabricFinishTypeDto = new FabricFinishTypesDTO;
    fabricFinishTypeDto.fabricFinishType = fabricFinishTypesObject.fabricFinishType;
    fabricFinishTypeDto.fabricFinishTypeId = fabricFinishTypesObject.fabricFinishTypeId;
    fabricFinishTypeDto.isActive = fabricFinishTypesObject.isActive;
    fabricFinishTypeDto.createdAt = fabricFinishTypesObject.createdAt;
    fabricFinishTypeDto.createdUser = fabricFinishTypesObject.createdUser;
    fabricFinishTypeDto.updatedAt = fabricFinishTypesObject.updatedAt;
    fabricFinishTypeDto.updatedUser = fabricFinishTypesObject.updatedUser;
    fabricFinishTypeDto.versionFlag = fabricFinishTypesObject.versionFlag;
    return fabricFinishTypeDto;
  }
}