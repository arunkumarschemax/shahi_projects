import { Injectable } from "@nestjs/common";
import { M3StyleDTO } from "./m3-style.dto";
import { M3StyleEntity } from "./m3-style.entity";





@Injectable()
export class M3StyleAdapter {

    convertDtoToEntity(dto: M3StyleDTO): M3StyleEntity {
        const entity = new M3StyleEntity();
        entity.m3StyleCode = dto.m3StyleCode;
        if (dto.m3StyleId) {
            entity.m3StyleId = dto.m3StyleId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: M3StyleEntity): M3StyleDTO {
        const dto = new M3StyleDTO();
        entity.m3StyleId = dto.m3StyleId;
        dto.m3StyleCode = entity.m3StyleCode
 
        return dto;
    }

}