import { Injectable } from "@nestjs/common";
import { RackPositionDTO } from "./rack-position.dto";
import { RackPositionEntity } from "./rack-position.entity";


@Injectable()
export class RackPositionAdapter {

    convertDtoToEntity(dto: RackPositionDTO): RackPositionEntity {
        const entity = new RackPositionEntity();
        entity.rackPositionName = dto.rackPositionName;
        entity.positionCode = dto.positionCode;
         entity.column = dto.column
         entity.level = dto.level
         entity.rackId = dto.rackId
        entity.barcodeId = dto.barcodeId;
        entity.prefferedStorageMaterial = dto.prefferedStorageMaterial;
        entity.supportedPalletsCount = dto.supportedPalletsCount;
        entity.remarks = dto.remarks;
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
        dto.barcodeId = entity.barcodeId;
        dto.prefferedStorageMaterial = entity.prefferedStorageMaterial;
        dto.supportedPalletsCount = entity.supportedPalletsCount;
        dto.remarks = entity.remarks;
        dto.column = entity.column;
        dto.level = entity.level;
        dto.rackId = entity.rackId;
        return dto;
    }

}