import { Injectable } from "@nestjs/common";
import { M3ItemsDTO } from "./m3-items.dto";
import { M3ItemsEntity } from "./m3-items.entity";
import { FabricYarnEntity } from "./fabric-yarn-entity";
import { FabricContentEntity } from "./fabric-content-entity";






@Injectable()
export class M3ItemsAdapter {

    convertDtoToEntity(dto: M3ItemsDTO): M3ItemsEntity {
        console.log("********************************************************");
        console.log(dto);

        const entity = new M3ItemsEntity();
        // entity.itemCode = dto.itemCode;
        // entity.content = dto.content;
        entity.fabricType = dto.fabricType;
        entity.weave = dto.weave;
        entity.weight = dto.weight;
        entity.weightUnit = dto.weightUnit;
        entity.epiConstruction = dto.epiConstruction;
        entity.ppiConstruction = dto.ppiConstruction;
        entity.yarnType = dto.yarnType;
        entity.finish = dto.finish;
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
            const fYarnEntity = new FabricYarnEntity()
            fYarnEntity.yarnType = fYarn.yarnType
            fYarnEntity.count = fYarn.count
            fYarnEntity.uomId = fYarn.uomId
            fabricYarnInfo.push(fYarnEntity)
        }entity.fabricYarnInfo = fabricYarnInfo

        for(const fContent of dto.fabricContentInfo){
            const fContentEntity = new FabricContentEntity()
            fContentEntity.contentId = fContent.contentId
            fContentEntity.percentage = fContent.percentage
            fabricContentInfo.push(fContentEntity)
        }entity.fabricContentInfo = fabricContentInfo

        if (dto.m3ItemsId) {
            entity.m3ItemsId = dto.m3ItemsId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: M3ItemsEntity): M3ItemsDTO {
        const dto = new M3ItemsDTO();
        entity.m3ItemsId = dto.m3ItemsId;
        dto.itemCode = entity.itemCode
        // dto.content = entity.content
        dto.fabricType = entity.fabricType
        dto.weave = entity.weave
        dto.weight = entity.weight
        dto.weightUnit = entity.weightUnit
        dto.epiConstruction = entity.epiConstruction
        dto.ppiConstruction = entity.ppiConstruction
        dto.yarnType = entity.yarnType
        dto.finish = entity.finish
        dto.shrinkage=entity.shrinkage
        dto.m3Code = entity.m3Code
        dto.hsnCode=entity.hsnCode
        return dto;
    }

}