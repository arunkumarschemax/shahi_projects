import { Injectable } from "@nestjs/common";
import { QualityDTO } from "./quality.dto";
import { QualityEntity } from "./quality.entity";




@Injectable()
export class QualityAdapter {

    convertDtoToEntity(dto: QualityDTO): QualityEntity {

        const entity = new QualityEntity();
        entity.quality = dto.quality;
        entity.createdUser = dto.createdUser
        if (dto.qualityId) {
            entity.qualityId = dto.qualityId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: QualityEntity): QualityDTO {
        const dto = new QualityDTO();
        entity.qualityId = dto.qualityId;
        dto.quality = entity.quality
 
        return dto;
    }

}