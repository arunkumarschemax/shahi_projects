import { Injectable } from '@nestjs/common';
import { CompositionDTO } from './composition.dto';
import { CompositionEnitty } from '../composition.entity';

@Injectable()
export class CompositionAdapter {
  
  public convertDtoToEntity(  compDto: CompositionDTO,  isUpdate: boolean = false ): CompositionEnitty {
    const composition = new CompositionEnitty();
    composition.id=compDto.id;
    composition.compositionCode=compDto.compositionCode;
    composition.compositionDescription=compDto.compositionDescription;

    composition.isActive=compDto.isActive==undefined?true:compDto.isActive;
    if (isUpdate) {
      composition.updatedUser = compDto.updatedUser;
    } else {
      composition.isActive = true;
      composition.createdUser = compDto.createdUser;
    }
   return composition;
  }
  public convertEntityToDto(object: CompositionEnitty): CompositionDTO {
    const composiDto= new CompositionDTO;
    composiDto.id = object.id;
    composiDto.compositionCode = object.compositionCode;
    composiDto.compositionDescription = object.compositionDescription;
    composiDto.isActive = object.isActive;
    composiDto.createdAt = object.createdAt;
    composiDto.updatedAt = object.updatedAt;
    composiDto.createdUser = object.createdUser;
    composiDto.updatedUser = object.updatedUser;
    composiDto.versionFlag = object.versionFlag;
    return composiDto;
  }
}
