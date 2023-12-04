import { Injectable } from "@nestjs/common";
import { QualitysDTO } from "./qualitys.dto";
import { QualitysEntity } from "./qualitys.entity";




@Injectable()
export class QualitysAdapter {

     /**
     * 
     * @param QualitysDTO 
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity(dto: QualitysDTO,isUpdate: boolean=false): QualitysEntity {

        
        const entity = new QualitysEntity();
        entity.qualityId=dto.qualityId;
        entity.qualityName = dto.qualityName;
        entity.isActive=dto.isActive==undefined?true:dto.isActive;
        if (isUpdate) {
            entity.updatedUser=dto.updatedUser;
        }else{
            entity.isActive=true;
            entity.createdUser=dto.createdUser;
        }
        return entity;
    }

    convertEntityToDto(entity: QualitysEntity): QualitysDTO {
        
        const dto = new QualitysDTO();

        dto.qualityName = entity.qualityName
         dto.qualityId=entity.qualityId
         dto.isActive=entity.isActive
         dto.createdAt=entity.createdAt
         dto.updatedAt=entity.updatedAt
         dto.updatedUser=entity.updatedUser
         dto.versionFlag=entity.versionFlag
        return dto;
    }

}