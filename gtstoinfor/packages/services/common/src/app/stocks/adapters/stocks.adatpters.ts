import { StocksDTO } from "../dto/stocks.dto";
import { StocksEntity } from "../stocks.entity";

export class StocksAdapter {
    public convertDtoToEntity(dto: StocksDTO): StocksEntity {
        const entity = new StocksEntity()
        entity.id = dto.id;
        entity.m3_style_id = dto.m3_style_id;
        entity.item_type_id = dto.item_type_id;
        entity.item_id = dto.item_id;
        entity.location_id = dto.location_id;
        entity.quantity = dto.quantity;
        entity.style_id = dto.style_id;
        return entity;
    }

    public convertEntityToDto(entity: StocksEntity): StocksDTO {
        const dto = new StocksDTO;
        dto.id = entity.id;
        dto.m3_style_id = entity.m3_style_id;
        dto.item_type_id = entity.item_type_id;
        dto.item_id = entity.item_id;
        dto.location_id = entity.location_id;
        dto.quantity = entity.quantity;
        dto.style_id = entity.style_id;

        return dto;
    }

}