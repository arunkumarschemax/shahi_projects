import { FactoryDto } from "../dto/factory.dto";
import { FactoriesEntity } from "../factories.entity";

export class FactoryAdapter {
    public convertDtoToEntity(dto: FactoryDto): FactoriesEntity {
        const entity = new FactoriesEntity()
        entity.name = dto.name;
        entity.address = dto.address;
        if (dto.id) {
            entity.id = dto.id;
            entity.updatedUser = dto.createdUser;
        } else {
            entity.createdUser = dto.createdUser;
        }
        return entity
    }


    public convertEntityToDto(entity: FactoriesEntity): FactoryDto {

        const dto = new FactoryDto()
        dto.id = entity.id;
        dto.name = entity.name;
        dto.address = entity.address;
        dto.isActive = entity.isActive;
        dto.versionFlag = entity.versionFlag;

        return dto
    }

}