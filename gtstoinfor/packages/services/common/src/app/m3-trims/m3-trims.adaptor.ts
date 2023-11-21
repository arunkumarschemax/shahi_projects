import { Injectable } from "@nestjs/common";
import { M3TrimsDTO } from "./m3-trims.dto";
import { M3TrimsEntity } from "./m3-trims.entity";

@Injectable()
export class M3TrimsAdapter {

    convertDtoToEntity(dto: M3TrimsDTO): M3TrimsEntity {
        const entity = new M3TrimsEntity();
        entity.trimCode = dto.trimCode;
        entity.trimType = dto.trimType;
        if (dto.m3TrimId) {
            entity.m3TrimId = dto.m3TrimId;
            entity.updatedUser = dto.updatedUser
        }
        return entity;
    }

    convertEntityToDto(entity: M3TrimsEntity): M3TrimsDTO {
        const dto = new M3TrimsDTO();
        entity.m3TrimId = dto.m3TrimId;
        dto.trimCode = entity.trimCode
        dto.trimType = entity.trimType
        return dto;
    }

}