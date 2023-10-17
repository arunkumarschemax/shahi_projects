
import { FabricContentDto } from "../fabri-content-dto/fabric-dto";
import { FabricContent } from "../fabric-content.entity";

export class FabricContentAdapter {
  public convertDtoToEntity(dto: FabricContentDto, isUpdate: boolean = false): FabricContent {
    const entity = new FabricContent()
    entity.style = dto.style;
    entity.Component = dto.component;
    entity.fabricContent = dto.fabricContent;
  
    if (isUpdate) {
      // if ur update the rowdata give against id data
      entity.id = dto.id
      entity.updatedUser = dto.updatedUser;
    } else {
      entity.isActive = true;
      entity.createdUser = dto.createdUser
    }
    // Map any other fields as needed
    return entity;
  }


  public convertEntityToDto(entity: FabricContent): FabricContentDto {

    const dto = new FabricContentDto()
    dto.id = entity.id;
    dto.style = entity.style;
    dto.component = entity.Component;
    dto.fabricContent = entity.fabricContent;
    dto.isActive = entity.isActive;
    dto.version = entity.version;

    return dto
  }

}