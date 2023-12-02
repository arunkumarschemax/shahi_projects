import { Injectable } from '@nestjs/common';
import { VarietyDTO } from './variety-dto';
import { variety } from '../variety-entity';

@Injectable()
export class VarietyAdapter {
 
  public convertDtoToEntity(  varietyDTO: VarietyDTO,  isUpdate: boolean ): variety {
    const entity = new variety();
    entity.varietyId = varietyDTO.varietyId;
    entity.variety = varietyDTO.variety;
    entity.varietyCode =  varietyDTO.varietyCode
    entity.isActive = varietyDTO.isActive==undefined?true:varietyDTO.isActive;
    if (isUpdate) {
        entity.updatedUser = varietyDTO.createdUser;
    } else {
        entity.isActive = true;
        entity.createdUser = varietyDTO.createdUser;
    }
   return entity;
  }
  public convertEntityToDto(varietyObject: variety): VarietyDTO {
    const  DTO = new VarietyDTO;
    DTO.varietyId = varietyObject.varietyId;
    DTO.variety = varietyObject.variety;
    DTO.varietyCode = varietyObject.varietyCode;
    DTO.isActive = varietyObject.isActive;
    DTO.createdAt = varietyObject.createdAt;
    DTO.updatedAt = varietyObject.updatedAt;
    DTO.createdUser = varietyObject.createdUser;
    DTO.updatedUser = varietyObject.updatedUser;
    DTO.versionFlag = varietyObject.versionFlag;
    return DTO;
  }
}
