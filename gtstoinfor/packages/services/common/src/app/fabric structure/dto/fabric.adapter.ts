import { Injectable } from "@nestjs/common";
import { FabricStructures } from "../fabric-structure.entity";
import { FabricStructureDTO } from "./fabric.dto";

@Injectable()
export class FabricStructuresAdapter {
    /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity( fabricStructureDto: FabricStructureDTO, isUpdate: boolean = false): FabricStructures {
    const fabricStructures = new FabricStructures();
    fabricStructures.fabricStructureId = fabricStructureDto.fabricStructureId;
    fabricStructures.fabricStructure = fabricStructureDto.fabricStructure;
    fabricStructures.isActive = fabricStructureDto.isActive == undefined?true:fabricStructureDto.isActive;
    if(isUpdate){
        fabricStructures.updatedUser = fabricStructures.updatedUser;
    } else {
        fabricStructures.isActive = true;
        fabricStructures.createdUser = fabricStructureDto.createdUser;
    }
    return fabricStructures;
  }
  public convertEntityToDto(fabricStructuresObject: FabricStructures): FabricStructureDTO {
    const fabricStructureDto = new FabricStructureDTO;
    fabricStructureDto.fabricStructureId = fabricStructuresObject.fabricStructureId;
    fabricStructureDto.fabricStructure = fabricStructuresObject.fabricStructure;
    fabricStructureDto.isActive = fabricStructuresObject.isActive;
    fabricStructureDto.createdAt = fabricStructuresObject.createdAt;
    fabricStructureDto.createdUser = fabricStructuresObject.createdUser;
    fabricStructureDto.updatedAt = fabricStructuresObject.updatedAt;
    fabricStructureDto.updatedUser = fabricStructuresObject.updatedUser;
    fabricStructureDto.versionFlag = fabricStructuresObject.versionFlag;
    return fabricStructureDto;
  }
}