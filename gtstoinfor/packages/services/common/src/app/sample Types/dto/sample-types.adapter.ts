import { Injectable } from '@nestjs/common';
import { SampleTypesDto } from './sample-types.dto';
import { SampleTypes } from '../sample-types.entity';

@Injectable()
export class SampleTypesAdapter {
  /**
   * 
   * @param opeartionGroupsDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  sampleTypesDto: SampleTypesDto,  isUpdate: boolean = false ): SampleTypes {
    const sampleTypes = new SampleTypes();
    sampleTypes.smapleTypeId = sampleTypesDto.sampleTypeId;
    sampleTypes.sampleType = sampleTypesDto.sampleType;
    sampleTypes.isActive=sampleTypesDto.isActive==undefined?true:sampleTypesDto.isActive;
    if (isUpdate) {
        sampleTypes.smapleTypeId = sampleTypesDto.sampleTypeId
        sampleTypes.updatedUser = sampleTypesDto.updatedUser;
    } else {
        // sampleTypes.isActive = true;
        sampleTypes.createdUser = sampleTypesDto.createdUser;
    }
   return sampleTypes;
  }
  public convertEntityToDto(sampleTypesObject: SampleTypes): SampleTypesDto {
    const sampleTypesDto= new SampleTypesDto;
    sampleTypesDto.sampleTypeId = sampleTypesObject.smapleTypeId
    sampleTypesDto.sampleType=sampleTypesObject.sampleType;
    sampleTypesDto.isActive = sampleTypesObject.isActive;
    sampleTypesDto.createdAt = sampleTypesObject.createdAt;
    sampleTypesDto.updatedAt = sampleTypesObject.updatedAt;
    sampleTypesDto.createdUser = sampleTypesObject.createdUser;
    sampleTypesDto.updatedUser = sampleTypesObject.updatedUser;
    sampleTypesDto.versionFlag = sampleTypesObject.versionFlag;
    return sampleTypesDto;
  }
}
