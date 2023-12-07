import { Injectable } from "@nestjs/common";
import { M3ItemsDTO } from "./m3-items.dto";
import { M3ItemsEntity } from "./m3-items.entity";
import { M3TrimItemsDTO } from "./m3-trim-items.dto";
import { trimEntity } from "../Trim Masters/trim/trim-entity";
import { CategoryEntity } from "../Trim Masters/category/dto/category-entity";
import { Buyers } from "../buyers/buyers.entity";

@Injectable()
export class M3TrimsAdapter {

    convertDtoToEntity(dto: M3TrimItemsDTO): M3ItemsEntity {
        const entity = new M3ItemsEntity();
        entity.itemCode = dto.itemCode;
        entity.contentId = dto.contentId;
        entity.structureId = dto.structureId;
        entity.holeId = dto.holeId;
        entity.part = dto.part;
        entity.colorId = dto.colorId;
        entity.qualityId = dto.qualityId;
        entity.finishId = dto.finishId;
        entity.itemType = dto.itemType;
        entity.logo = dto.logo;
        entity.thicknessId = dto.thicknessId;
        entity.description = dto.description;
        entity.varietyId = dto.varietyId;
        entity.uomId = dto.uomId;
        entity.typeId = dto.typeId;
        entity.trimMappingId = dto.trimMappingId;
        const trimData = new trimEntity()
        trimData.trimId = dto.trimCategoryId;
        const categoryData = new CategoryEntity()
        categoryData.categoryId = dto.categoryId
        entity.buyerId = dto.buyerId
        // entity.trimCategoryId = dto.trimCategoryId;
        if (dto.m3ItemsId) {
            entity.m3ItemsId = dto.m3ItemsId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: M3ItemsEntity): M3TrimItemsDTO {
        const dto = new M3TrimItemsDTO();
        entity.m3ItemsId = dto.m3ItemsId;
        dto.itemCode = entity.itemCode
        dto.itemCode = entity.itemCode;
        dto.contentId = entity.contentId;
        dto.structureId = entity.structureId;
        dto.holeId = entity.holeId;
        dto.part = entity.part;
        dto.colorId = entity.colorId;
        dto.qualityId = entity.qualityId;
        dto.finishId = entity.finishId;
        dto.itemType = entity.itemType;
        dto.logo = entity.logo;
        dto.thicknessId = entity.thicknessId;
        dto.description = entity.description;
        dto.varietyId = entity.varietyId;
        dto.uomId = entity.uomId;
        dto.typeId = entity.typeId;
        dto.trimMappingId = entity.trimMappingId;
        dto.trimCategoryId = entity.trimCategoryInfo.trimId;
        dto.categoryId = entity.categoryInfo.categoryId;
        dto.buyerId = entity.buyerInfo.buyerId

 
        return dto;
    }

}