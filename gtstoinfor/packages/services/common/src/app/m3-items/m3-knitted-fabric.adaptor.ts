import { Injectable } from "@nestjs/common";
import { M3ItemsEntity } from "./m3-items.entity";
import { M3KnittedFabricsDTO } from "./m3-knitted-fabrics-dto";

@Injectable()
export class M3KnittedFabricAdapter {

    convertDtoToEntity(dto: M3KnittedFabricsDTO): M3ItemsEntity {
        const entity = new M3ItemsEntity();
        entity.knitType = dto.knitType;
        entity.knittedBuyerId = dto.knittedBuyerId;
        entity.knitWeight = dto.knitWeight;
        entity.kniteContent = dto.kniteContent;
        entity.kniteDescription = dto.kniteDescription;
        entity.kniteGauze = dto.kniteGauze;
        entity.kniteHsn = dto.kniteHsn;
        entity.kniteM3Code = dto.kniteM3Code;
        entity.kniteRemarks = dto.kniteRemarks;
        entity.kniteYarnCount = dto.kniteYarnCount;
        entity.knittedBuyerId = dto.knittedBuyerId;
        entity.knittedFabricTypeId = dto.knittedFabricTypeId;
        if (dto.m3ItemsId) {
            entity.m3ItemsId = dto.m3ItemsId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: M3ItemsEntity): M3KnittedFabricsDTO {
        console.log(entity,'-----------------------------')
        const dto = new M3KnittedFabricsDTO();
        dto.knitType = entity.knitType;
        dto.knittedBuyerId = entity.knittedBuyerId;
        dto.knitWeight = entity.knitWeight;
        dto.kniteContent = entity.kniteContent;
        dto.kniteDescription = entity.kniteDescription;
        dto.kniteGauze = entity.kniteGauze;
        dto.kniteHsn = entity.kniteHsn;
        dto.kniteM3Code = entity.kniteM3Code;
        dto.kniteRemarks = entity.kniteRemarks;
        dto.kniteYarnCount = entity.kniteYarnCount;
        dto.knittedBuyerId = entity.knittedBuyerId;
        dto.knittedFabricTypeId = entity.knittedFabricTypeId
        dto.m3ItemsId = entity.m3ItemsId;
        dto.isActive = entity.isActive;
        dto.createdUser = entity.createdUser;
        dto.updatedUser = entity.updatedUser;
        return dto;
    }

}