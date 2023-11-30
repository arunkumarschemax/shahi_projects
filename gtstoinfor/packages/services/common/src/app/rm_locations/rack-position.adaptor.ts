import { Injectable } from "@nestjs/common";
import { RackPositionDTO } from "./rack-position.dto";
import { RackPositionEntity } from "./rack-position.entity";


@Injectable()
export class RackPositionAdapter {

    convertDtoToEntity(dto: RackPositionDTO): RackPositionEntity {
        const entity = new RackPositionEntity();
        entity.rackPositionName = dto.rackPositionName;
        entity.positionCode = dto.positionCode;
         entity.columnId = dto.columnId
         entity.levelId = dto.levelId
        entity.rackName = dto.rackName;
        entity.createdUser = dto.createdUser
        if (dto.positionId) {
            entity.positionId = dto.positionId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: RackPositionEntity): RackPositionDTO {
        const dto = new RackPositionDTO();
        entity.positionId = dto.positionId;
        dto.rackPositionName = entity.rackPositionName
        dto.positionCode = entity.positionCode
        dto.rackName = entity.rackName

        return dto;
    }

}