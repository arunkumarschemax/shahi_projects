import { FactoryDto } from "../dto/factory.dto";
import { FactoriesEntity } from "../factories.entity";

export class FactoryAdapter {
    public convertDtoToEntity(dto: FactoryDto,isUpdate:boolean=false): FactoriesEntity {
        const entity = new FactoriesEntity()
        entity.name = dto.name;
        entity.address = dto.address;
        if(isUpdate){
            // if ur update the rowdata give against id data
            entity.id = dto.id
            entity.updatedUser = dto.updatedUser;
          }else{
            entity.isActive = true;
            entity.createdUser = dto.createdUser
          }
          // Map any other fields as needed
          console.log(entity);
          return entity; 
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