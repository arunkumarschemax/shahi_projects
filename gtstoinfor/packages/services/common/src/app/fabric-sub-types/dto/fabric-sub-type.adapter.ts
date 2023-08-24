import { FabricSubType } from "../fabric-sub-type.entity";
import { FabricType } from "../../fabric-types/fabric-type.entity";
import { FabricSubTypeDto } from "./fabric-sub-type.dto";

export class FabricSubTypeAdapter{
    convertDtoToEntity(dtoObj:FabricSubTypeDto,isUpdate:boolean=false): FabricSubType{
        try{
            const entityObj = new FabricSubType();
            entityObj.createdUser = dtoObj.createdUser;
            entityObj.createdUser = dtoObj.createdUser;
            entityObj.fabricSubTypeName = dtoObj.fabricSubTypeName;
            entityObj.fabricType = new FabricType();
            entityObj.fabricType.fabricTypeId = dtoObj.fabricTypeId;
            entityObj.fabricType.fabricTypeName = dtoObj.fabricTypeName;
            if (dtoObj.fabricSubTypeId){
                entityObj.fabricSubTypeId=dtoObj.fabricSubTypeId;
                entityObj.updatedUser=dtoObj.updatedUser;
            }
            entityObj.isActive=dtoObj.isActive;
            return entityObj;
        }catch (Error){
            throw Error;
        }
    }
    public convertEntityToDto(itemObj: FabricSubType): FabricSubTypeDto {
        const fabricSubTypeDetailsDTO= new FabricSubTypeDto;
        fabricSubTypeDetailsDTO.fabricSubTypeId = itemObj.fabricSubTypeId;
        fabricSubTypeDetailsDTO.fabricSubTypeName = itemObj.fabricSubTypeName;
        fabricSubTypeDetailsDTO.fabricTypeId = (itemObj.fabricType)?.fabricTypeId;
        fabricSubTypeDetailsDTO.fabricTypeName = (itemObj.fabricType)?.fabricTypeName;
        fabricSubTypeDetailsDTO.isActive = itemObj.isActive;
        fabricSubTypeDetailsDTO.createdAt = itemObj.createdAt;
        fabricSubTypeDetailsDTO.updatedAt = itemObj.updatedAt;
        fabricSubTypeDetailsDTO.createdUser = itemObj.createdUser;
        fabricSubTypeDetailsDTO.updatedUser = itemObj.updatedUser;
        fabricSubTypeDetailsDTO.versionFlag = itemObj.versionFlag;
        return fabricSubTypeDetailsDTO;
}
}