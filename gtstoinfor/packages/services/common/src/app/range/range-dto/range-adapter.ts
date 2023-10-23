import { Injectable } from '@nestjs/common';
import { RangeDTO } from './range-dto';
import { RangeEnitty } from '../range-entity';

@Injectable()
export class RangeAdapter {
  
  public convertDtoToEntity(  compDto: RangeDTO,  isUpdate: boolean = false ): RangeEnitty {
    const range = new RangeEnitty();
    range.id=compDto.id;
    range.rangeCode=compDto.rangeCode;
    range.rangeDescription=compDto.rangeDescription;

    range.isActive=compDto.isActive==undefined?true:compDto.isActive;
    if (isUpdate) {
      range.updatedUser = compDto.updatedUser;
    } else {
      range.isActive = true;
      range.createdUser = compDto.createdUser;
    }
   return range;
  }
  public convertEntityToDto(object: RangeEnitty): RangeDTO {
    const rangeDto= new RangeDTO;
    rangeDto.id = object.id;
    rangeDto.rangeCode = object.rangeCode;
    rangeDto.rangeDescription = object.rangeDescription;
    rangeDto.isActive = object.isActive;
    rangeDto.createdAt = object.createdAt;
    rangeDto.updatedAt = object.updatedAt;
    rangeDto.createdUser = object.createdUser;
    rangeDto.updatedUser = object.updatedUser;
    rangeDto.versionFlag = object.versionFlag;
    return rangeDto;
  }
}
