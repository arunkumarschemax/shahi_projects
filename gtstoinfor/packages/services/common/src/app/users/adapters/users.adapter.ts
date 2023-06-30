import { UsersDto } from "../dto/users.dto";
import { UsersEntity } from "../users.entity";

export class UsersAdaptor {
    public convertDtoToEntity(dto: UsersDto): UsersEntity {
        const entity = new UsersEntity();
        entity.username = dto.username;
        entity.password = dto.password;
        entity.role = dto.role;
        entity.factory = dto.factory;
        if (dto.id) {
            entity.id = dto.id;
            entity.updatedUser = dto.createdUser;
        } else {
            entity.createdUser = dto.createdUser;
        }

        return entity;
    }

    public convertEntityToDto(entity: UsersEntity): UsersDto {
        const dto = new UsersDto();
        dto.id = entity.id;
        dto.username = entity.username;
        dto.password = entity.password;
        dto.role = entity.role;
        dto.factory = entity.factory;
        dto.isActive = entity.isActive;
        dto.versionFlag = entity.versionFlag;

        return dto;
    }
}
