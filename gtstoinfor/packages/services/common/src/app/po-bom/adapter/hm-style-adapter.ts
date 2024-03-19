import { Injectable } from '@nestjs/common';

import { HMStyleDto } from '../dto/hm-style-dto';
import { HMStyleEntity } from '../entittes/hm-style-entity';

@Injectable()
export class HMStyleAdapter {
  /**
   * 
   * @param HMStyleDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  hmStyleDto: HMStyleDto,  isUpdate: boolean = false ): HMStyleEntity {
    const hmStyle = new HMStyleEntity();
    hmStyle.hmId=hmStyleDto.hmId;
    hmStyle.styleNumber=hmStyleDto.styleNumber;
    hmStyle.teflonSheetSize=hmStyleDto.teflonSheetSize;
    hmStyle.consumption=hmStyleDto.consumption;
    hmStyle.isActive=hmStyleDto.isActive==undefined?true:hmStyleDto.isActive;
    if (isUpdate) {
        hmStyle.updatedUser = hmStyleDto.updatedUser;
    } else {
        hmStyle.isActive = true;
        hmStyle.createdUser = hmStyleDto.createdUser;
    }
   return hmStyle;
  }
  public convertEntityToDto(threadObject: HMStyleEntity): HMStyleDto {
    const hmStyleDto= new HMStyleDto;
    hmStyleDto.hmId=threadObject.hmId;
    hmStyleDto.styleNumber=threadObject.styleNumber;
    hmStyleDto.teflonSheetSize=threadObject.teflonSheetSize;
    hmStyleDto.consumption=threadObject.consumption;
    hmStyleDto.isActive = threadObject.isActive;
    hmStyleDto.createdAt = threadObject.createdAt;
    hmStyleDto.updatedAt = threadObject.updatedAt;
    hmStyleDto.createdUser = threadObject.createdUser;
    hmStyleDto.updatedUser = threadObject.updatedUser;
    hmStyleDto.versionFlag = threadObject.versionFlag;
    return hmStyleDto;
  }
}
