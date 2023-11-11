import { Injectable } from "@nestjs/common";
import { RacksDTO } from "./rack.dto";
import { RacksEntity } from "./rack.entity";



@Injectable()
export class RacksAdapter {

    convertDtoToEntity(dto: RacksDTO): RacksEntity {
        const entity = new RacksEntity();
        entity.rackName = dto.rackName;
        entity.rackCode = dto.rackCode;
        entity.unit = dto.unit;
        entity.rackType = dto.rackType;
        entity.createdUser = dto.createdUser
        if (dto.rackId) {
            entity.rackId = dto.rackId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: RacksEntity): RacksDTO {
        const dto = new RacksDTO();
        entity.rackId = dto.rackId;
        dto.rackName = entity.rackName
        dto.rackCode = entity.rackCode
        dto.unit = entity.unit
        dto.rackType = entity.rackType

        return dto;
    }

}