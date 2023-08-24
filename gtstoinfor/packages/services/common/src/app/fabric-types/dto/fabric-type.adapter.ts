import { FabricType } from "../fabric-type.entity";
import { FabricTypeDto } from "./fabric-type.dto";

export class FabricTypeAdapter {
    convertDtoToEntity(dtoObj: FabricTypeDto, isUpdate:boolean= false): FabricType{
        try {
            const entityObj = new FabricType();
            entityObj.createdUser = dtoObj.createdUser;
            entityObj.fabricTypeName = dtoObj.fabricTypeName;
            if (dtoObj.fabricTypeId) {
                entityObj.fabricTypeId = dtoObj.fabricTypeId;
                entityObj.updatedUser = dtoObj.updatedUser;
            }
            entityObj.isActive = dtoObj.isActive;
            return entityObj;

        } catch (Error){
            throw Error;
        }
    }

    public convertEntityToDto(itemObj: FabricType): FabricTypeDto {
        const fabricTypeDTO= new FabricTypeDto;
        fabricTypeDTO.fabricTypeId=itemObj.fabricTypeId;
        fabricTypeDTO.fabricTypeName=itemObj.fabricTypeName;
        fabricTypeDTO.isActive = itemObj.isActive;
        fabricTypeDTO.createdAt = itemObj.createdAt;
        fabricTypeDTO.updatedAt = itemObj.updatedAt;
        fabricTypeDTO.createdUser = itemObj.createdUser;
        fabricTypeDTO.updatedUser = itemObj.updatedUser;
        fabricTypeDTO.versionFlag = itemObj.versionFlag;
return fabricTypeDTO;
    }
}