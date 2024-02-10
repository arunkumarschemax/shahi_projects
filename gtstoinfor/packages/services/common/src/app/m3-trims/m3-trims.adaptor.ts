import { Injectable } from "@nestjs/common";
import { M3TrimsDTO } from "./m3-trims.dto";
import { M3TrimsEntity } from "./m3-trims.entity";
import { Buyers } from "../buyers/buyers.entity";

@Injectable()
export class M3TrimsAdapter {

    convertDtoToEntity(dto: M3TrimsDTO): M3TrimsEntity {
        console.log("***********************************************");
        console.log(dto);
        const entity = new M3TrimsEntity();
        let buyer = new Buyers();
        buyer.buyerId = dto.buyerId;
        entity.buyerInfo = buyer;
        entity.trimCode = dto.description;
        entity.trimType = dto.trimType;
        entity.itemCode = dto.itemCode;
        entity.part = dto.part;
        entity.trimMappingId = dto.trimMappingId;
        entity.description = dto.description;
        entity.categoryId = dto.categoryId;
        entity.colorId = dto.colorId;
        entity.contentId = dto.contentId;
        entity.finishId = dto.finishId;
        entity.holeId = dto.holeId;
        entity.logo = dto.logo;
        entity.part = dto.part;
        entity.qualityId = dto.qualityId;
        entity.structureId = dto.structureId;
        entity.varietyId = dto.varietyId;
        entity.uomId = dto.uomId;
        entity.typeId = dto.typeId;
        entity.trimCategoryId = dto.trimCategoryId;
        entity.thicknessId = dto.thicknessId;
        entity.m3Code = dto.m3Code;
        entity.hsnCode= dto.hsnCode;
        entity.trimBuyerId = dto.trimBuyerId
        entity.lengthId = dto.lengthId
        entity.lineId = dto.lineId
        entity.partsId = dto.partsId
        entity.plyId = dto.plyId
        entity.shapeId = dto.shapeId
        entity.sliderId = dto.sliderId
        entity.sizeId = dto.sizeId

        if (dto.m3TrimId) {
            entity.m3TrimId = dto.m3TrimId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: M3TrimsEntity): M3TrimsDTO {
        const dto = new M3TrimsDTO();
        dto.m3TrimId = entity.m3TrimId
        dto.trimCode = entity.trimCode;
        dto.trimType = entity.trimType;
        dto.categoryId = entity.categoryId;
        dto.colorId = entity.colorId;
        dto.contentId = entity.contentId;
        dto.finishId = entity.finishId;
        dto.holeId = entity.holeId;
        dto.logo = entity.logo;
        dto.part = entity.part;
        dto.qualityId = entity.qualityId;
        dto.structureId = entity.structureId;
        dto.varietyId = entity.varietyId;
        dto.uomId = entity.uomId;
        dto.typeId = entity.typeId;
        dto.trimCategoryId = entity.trimCategoryId;
        dto.thicknessId = entity.thicknessId;
        dto.m3Code = entity.m3Code;
        dto.hsnCode = entity.hsnCode;
        dto.trimBuyerId = entity.trimBuyerId
        dto.lengthId = entity.lengthId
        dto.lineId = entity.lineId
        dto.partsId = entity.partsId
        dto.plyId = entity.plyId
        dto.shapeId = entity.shapeId
        dto.sliderId = entity.sliderId
        dto.sizeId = entity.sizeId
        return dto;
    }

}