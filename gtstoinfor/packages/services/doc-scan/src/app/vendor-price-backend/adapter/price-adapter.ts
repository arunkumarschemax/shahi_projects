import { Injectable } from "@nestjs/common";
import { PriceEntity } from "../entity/price-entity";
import { PriceDto } from "../dto/price.dto";

@Injectable()
export class PriceAdapter {
    convertEntityToDto(entity: PriceEntity): PriceDto {
        const dto = new PriceDto();
        dto.headOfChargers = entity.headOfChargers;
        dto.perUnit = entity.perUnit;
        dto.vendor = entity.vendor;
        dto.nsh = entity.nsh;
        dto.ksr = entity.ksr;
        dto.dpLogistics = entity.dpLogistics;
        dto.unitPrice = entity.unitPrice;
        dto.createdAt=entity.createdAt;
        dto.createdUser=entity.createdUser;
        dto.updatedAt=entity.updatedAt;
        dto.updatedUser=entity.updatedUser;
        dto.versionFlag=entity.versionFlag;
        return dto;
    }

    convertDtoToEntity(dto: PriceDto): PriceEntity {
        const entity = new PriceEntity();
        entity.headOfChargers = dto.headOfChargers;
        entity.perUnit = dto.perUnit;
        entity.dpLogistics = dto.dpLogistics;
        entity.nsh = dto.nsh;
        entity.ksr = dto.ksr;
        entity.vendor = dto.vendor;
        entity.unitPrice = dto.unitPrice;
        entity.createdAt=dto.createdAt;
        entity.createdUser=dto.createdUser;
        entity.updatedAt=dto.updatedAt;
        entity.updatedUser=dto.updatedUser;
        entity.versionFlag=dto.versionFlag;
        return entity;
    }
}