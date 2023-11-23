import { StocksDTO } from "../dto/stocks.dto";
import { StocksEntity } from "../stocks.entity";

export class StocksAdapter {
    public convertDtoToEntity(dto: StocksDTO): StocksEntity {
        const entity = new StocksEntity()
        entity.id = dto.id;
        entity.itemType = dto.itemType;
        entity.m3Item = dto.m3Item;
        entity.buyerId = dto.buyerId;
        entity.locationId = dto.locationId;
        entity.quantity = dto.quantity;
        entity.uomId = dto.uomId
        return entity;
    }

    public convertEntityToDto(entity: StocksEntity): StocksDTO {
        const dto = new StocksDTO;
        dto.id = entity.id;
        dto.itemType = entity.itemType;
        dto.m3Item = entity.m3Item;
        dto.buyerId = entity.buyerId;
        dto.locationId = entity.locationId;
        dto.quantity = entity.quantity;
        dto.uomId = entity.uomId
        return dto;
    }

}