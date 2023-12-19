import { Injectable } from "@nestjs/common";
import { M3ItemsDTO } from "./m3-items.dto";
import { M3ItemsEntity } from "./m3-items.entity";
import { M3FabricsDTO } from "./m3-fabrics-dto";
import { M3FabricYarnEntity } from "./m3-fabric-yarn-entity";
import { M3FabricContentEntity } from "./m3-fabric-content-entity";






@Injectable()
export class M3ItemsAdapter {

    convertDtoToEntity(dto: M3FabricsDTO): M3ItemsEntity {
        console.log(dto,'********************************************************');

        const entity = new M3ItemsEntity();
        // entity.itemCode = dto.itemCode;
        // entity.content = dto.content;
        entity.fabricTypeId = dto.fabricTypeId;
        entity.weaveId = dto.weaveId;
        entity.weightId = dto.weightId;
        entity.weightUnit = dto.weightUnit;
        entity.epiConstruction = dto.epiConstruction;
        entity.ppiConstruction = dto.ppiConstruction;
        entity.yarnType = dto.yarnType;
        entity.finishId = dto.finishId;
        entity.buyerId = dto.buyerId;
        entity.description = dto.description;
        entity.shrinkage = dto.shrinkage;
        entity.width = dto.width;
        entity.widthUnit = dto.widthUnit;
        entity.m3Code = dto.m3Code;
        entity.hsnCode = dto.hsnCode
        let fabricYarnInfo = []
        let fabricContentInfo = []
        for(const fYarn of dto.fabricYarnInfo){
            const fYarnEntity = new M3FabricYarnEntity()
            fYarnEntity.yarnType = dto.yarnType
            fYarnEntity.count = fYarn.count
            fYarnEntity.uomId = fYarn.uomId
            fabricYarnInfo.push(fYarnEntity)
        }entity.fabricYarnInfo = fabricYarnInfo

        for(const fContent of dto.fabricContentInfo){
            const fContentEntity = new M3FabricContentEntity()
            fContentEntity.content = fContent.content
            fContentEntity.percentage = fContent.percentage
            fabricContentInfo.push(fContentEntity)
        }entity.fabricContentInfo = fabricContentInfo

        if (dto.m3ItemsId) {
            entity.m3ItemsId = dto.m3ItemsId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: M3ItemsEntity): M3FabricsDTO {
        console.log(entity,'-----------------------------')
        const dto = new M3FabricsDTO();
        entity.m3ItemsId = dto.m3ItemsId;
        dto.itemCode = entity.itemCode
        // dto.content = entity.content
        dto.fabricTypeId = entity.fabricTypeId
        dto.weaveId = entity.weaveId
        dto.weightId = entity.weightId
        dto.weightUnit = entity.weightUnit
        dto.epiConstruction = entity.epiConstruction
        dto.ppiConstruction = entity.ppiConstruction
        dto.yarnType = entity.yarnType
        dto.finishId = entity.finishId
        dto.shrinkage=entity.shrinkage
        dto.m3Code = entity.m3Code
        dto.hsnCode=entity.hsnCode
        return dto;
    }

}