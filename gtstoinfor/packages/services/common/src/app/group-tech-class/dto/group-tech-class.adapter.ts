
import { GroupTechClassEntity } from "../group-tech-class.entity";
import { GroupTechClassDto } from "./group-tech-class.dto";

export class GroupTechClassAdapter {
    convertDtoToEntity(dto: GroupTechClassDto,  isUpdate: boolean = false ): GroupTechClassEntity {
        try {
              const entity = new GroupTechClassEntity();
            entity.groupTechClassCode = dto.groupTechClassCode
            entity.groupTechClassDescription = dto.groupTechClassDescription
            entity.buyerId = dto.buyerId
            entity.divisionId = dto.divisionId
            entity.createdUser = dto.createdUser
            entity.updatedAt = dto.updatedAt
            entity.createdAt = dto.createdAt
            if (dto.groupTechClassId){
                entity.groupTechClassId = dto.groupTechClassId;
                entity.updatedUser = dto.updatedUser;
            }
            entity.versionFlag = dto.versionFlag

            entity.isActive = dto.isActive
            
            
            return entity
        } catch (Error) {
            throw Error;
        }
    }

    public convertEntityToDto(entity: GroupTechClassEntity): GroupTechClassDto {
        const DTO = new GroupTechClassDto;
        DTO.groupTechClassId = entity.groupTechClassId
        DTO.groupTechClassCode = entity.groupTechClassCode
        DTO.groupTechClassDescription = entity.groupTechClassDescription
        DTO.buyerId = entity.buyerId
        DTO.divisionId = entity.divisionId
        DTO.createdUser = entity.createdUser
        DTO.createdAt = entity.createdAt
        DTO.updatedAt = entity.updatedAt
        DTO.updatedUser = entity.updatedUser
        DTO.versionFlag = entity.versionFlag
        DTO.isActive = entity.isActive

        return DTO;
      }
}