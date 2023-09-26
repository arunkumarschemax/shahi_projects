import { Injectable } from "@nestjs/common";
import { PriceEntity } from "../entity/price-entity";
import { PriceDto } from "../dto/price.dto";

@Injectable()
export class PriceAdapter {
    convertEntityToDto(entity: PriceEntity): PriceDto {
        const dto = new PriceDto();
        dto.headOfCharges = entity.headOfCharges;
        dto.hsnCode = entity.hsnCode;
        dto.serviceCode = entity.serviceCode;
        dto.perUnit = entity.perUnit;
        dto.vendor = entity.vendor;
        dto.buyersName = entity.buyersName;
        dto.nsh = entity.nsh;
        dto.ksr = entity.ksr;
        dto.dpLogistics = entity.dpLogistics;
        dto.unitPrice = entity.unitPrice;
        dto.serviceCode = entity.serviceCode;
        dto.createdAt=entity.createdAt;
        dto.createdUser=entity.createdUser;
        dto.updatedAt=entity.updatedAt;
        dto.updatedUser=entity.updatedUser;
        dto.versionFlag=entity.versionFlag;
        return dto;
    }

    convertDtoToEntity(dto: PriceDto,result): PriceEntity {
    
        const entity = new PriceEntity();
        entity.headOfCharges = dto.headOfCharges;
        entity.hsnCode = dto.hsnCode;
        entity.serviceDescription = dto.serviceDescription;
        entity.perUnit = dto.perUnit;
        entity.dpLogistics = dto.dpLogistics;
        entity.nsh = dto.nsh;
        entity.ksr = dto.ksr;
        entity.vendor = dto.vendor;
        entity.buyersName = dto.buyersName;
        entity.unitPrice = dto.unitPrice;
        entity.serviceCode = "VENDOR"+"/"+"SC"+ "/"+ (result +1);
        entity.createdAt=dto.createdAt;
        entity.createdUser=dto.createdUser;
        entity.updatedAt=dto.updatedAt;
        entity.updatedUser=dto.updatedUser;
        entity.versionFlag=dto.versionFlag;
        return entity;
    }
}