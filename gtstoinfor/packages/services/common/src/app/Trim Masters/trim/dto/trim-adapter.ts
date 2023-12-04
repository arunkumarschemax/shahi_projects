import { Injectable } from '@nestjs/common';
import { TrimDTO } from './trim-dto';
import { trimEntity } from '../trim-entity';


@Injectable()
export class TrimAdapter {
 
  public convertDtoToEntity(  trimDTO: TrimDTO,  isUpdate: boolean ): trimEntity {
    const entity = new trimEntity();
    entity.trimId = trimDTO.trimId;
    entity.trimCategory = trimDTO.trimCategory;
    entity.isActive = trimDTO.isActive==undefined?true:trimDTO.isActive;
    if (isUpdate) {
        entity.updatedUser = trimDTO.createdUser;
    } else {
        entity.isActive = true;
        entity.createdUser = trimDTO.createdUser;
    }
   return entity;
  }
  public convertEntityToDto(trimObject: trimEntity): TrimDTO {
    const  DTO = new TrimDTO;
    DTO.trimId = trimObject.trimId;
    DTO.trimCategory = trimObject.trimCategory;
    DTO.isActive = trimObject.isActive;
    DTO.createdAt = trimObject.createdAt;
    DTO.updatedAt = trimObject.updatedAt;
    DTO.createdUser = trimObject.createdUser;
    DTO.updatedUser = trimObject.updatedUser;
    DTO.versionFlag = trimObject.versionFlag;
    return DTO;
  }
}
