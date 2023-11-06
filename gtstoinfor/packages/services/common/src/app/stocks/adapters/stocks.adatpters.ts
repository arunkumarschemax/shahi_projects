import { StocksDTO } from "../dto/stocks.dto";
import { StocksEntity } from "../stocks.entity";

export class StocksAdapter {
    public convertDtoToEntity(dto: StocksDTO): StocksEntity {
        const entity = new StocksEntity()
        entity.id = dto.id;
        entity.m3ItemCode = dto.m3ItemCode;
        entity.shahiItemCode = dto.shahiItemCode;
        entity.item_type_id = dto.itemType;
        entity.location_id = dto.location;
        entity.plant_id = dto.plant;
        entity.quantity = dto.quantity;
        return entity;
    }

    public convertEntityToDto(entity: StocksEntity): StocksDTO {
        const dto = new StocksDTO;
        dto.id = entity.id;
        dto.m3ItemCode = entity.m3ItemCode;
        dto.shahiItemCode = entity.shahiItemCode;
        dto.itemType = entity.item_type_id;
        dto.location = entity.location_id;
        dto.plant = entity.plant_id;
        dto.quantity = entity.quantity;

        return dto;
    }

}