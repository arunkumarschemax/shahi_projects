import { Injectable } from "@nestjs/common";
import { ReclassificationDTO } from "./reclassification.dto";
import { ReclassificationEntity } from "./reclassification.entity";
import { StocksEntity } from "../stocks/stocks.entity";



@Injectable()
export class ReclassificationAdapter {

    convertDtoToEntity(dto: ReclassificationDTO): ReclassificationEntity {
        const entity = new ReclassificationEntity();
        entity.buyer = dto.buyer;
        entity.createdUser = dto.createdUser;
        entity.isActive = dto.isActive;
        entity.itemId = dto.itemId
        entity.location = dto.location
        entity.quantity = dto.quantity
        entity.stockId = dto.stockId
        if (dto.reclassificationId) {
            entity.reclassificationId = dto.reclassificationId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: ReclassificationEntity): ReclassificationDTO {
        const dto = new ReclassificationDTO();
        dto.buyer = entity.buyer
        dto.createdUser = entity.createdUser
        dto.isActive = entity.isActive
        dto.itemId = entity.itemId
        dto.location = entity.location
        dto.quantity = entity.quantity
        dto.reclassificationId = entity.reclassificationId
        dto.stockId = entity.stockId
        dto.updatedUser = entity.updatedUser
        dto.versionFlag = entity.versionFlag
        return dto;
    }

}