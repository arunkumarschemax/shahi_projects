import { Injectable } from "@nestjs/common";
import { M3ItemsDTO } from "./m3-items.dto";
import { M3ItemsEntity } from "./m3-items.entity";






@Injectable()
export class M3ItemsAdapter {

    convertDtoToEntity(dto: M3ItemsDTO): M3ItemsEntity {
        const entity = new M3ItemsEntity();
        entity.content = dto.content;
        entity.fabricType = dto.fabricType;
        entity.weave = dto.weave;
        entity.weight = dto.weight;
        entity.construction = dto.construction;
        entity.yarnCount = dto.yarnCount;
        entity.finish = dto.finish;
        entity.shrinkage = dto.shrinkage;
        if (dto.itemCode) {
            entity.itemCode = dto.itemCode;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: M3ItemsEntity): M3ItemsDTO {
        const dto = new M3ItemsDTO();
        entity.itemCode = dto.itemCode;
        dto.content = entity.content
        dto.fabricType = entity.fabricType
        dto.weave = entity.weave
        dto.weight = entity.weight
        dto.construction = entity.construction
        dto.yarnCount = entity.yarnCount
        dto.finish = entity.finish
        dto.shrinkage=entity.shrinkage

 
        return dto;
    }

}