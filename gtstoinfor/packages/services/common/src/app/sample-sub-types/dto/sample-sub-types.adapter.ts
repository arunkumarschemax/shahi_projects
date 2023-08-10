import { Injectable } from "@nestjs/common";
import { SampleSubTypeDTO } from "./sample-sub-types.dto";
import { SampleSubTypes } from "../sample-sub-types.entity";
import { SampleTypes } from "../../sample Types/sample-types.entity";

@Injectable()
export class SampleSubTypeAdapter {
    /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity( sampleSubTypesDto: SampleSubTypeDTO, isUpdate: boolean = false): SampleSubTypes {
    const sampleSubType = new SampleSubTypes();
    const sampleType = new SampleTypes()
    sampleSubType.sampleSubTypeId = sampleSubTypesDto.sampleSubTypeId;
    sampleSubType.sampleSubType = sampleSubTypesDto.sampleSubType;
    sampleType.sampleTypeId = sampleSubTypesDto.sampleTypeId
    sampleType.sampleType= sampleSubTypesDto.sampleType
    sampleSubType.sampleSubTypes = sampleType
    sampleSubType.isActive = sampleSubTypesDto.isActive == undefined?true:sampleSubTypesDto.isActive;
    if(isUpdate){
      sampleSubType.sampleSubTypeId = sampleSubTypesDto.sampleSubTypeId;
        sampleSubType.updatedUser = sampleSubType.updatedUser;
    } else {
        sampleSubType.isActive = true;
        sampleSubType.createdUser = sampleSubTypesDto.createdUser;
    }
    return sampleSubType;
  }
  public convertEntityToDto(sampleSubTypes: SampleSubTypes): SampleSubTypeDTO {
    const sampleSubTypesDto = new SampleSubTypeDTO();
    sampleSubTypesDto.sampleSubTypeId = sampleSubTypes.sampleSubTypeId;
    sampleSubTypesDto.sampleSubType = sampleSubTypes.sampleSubType;
    sampleSubTypesDto.sampleTypeId = (sampleSubTypes.sampleSubTypes)?.sampleTypeId;
    sampleSubTypesDto.sampleType = (sampleSubTypes.sampleSubTypes)?.sampleType;
    sampleSubTypesDto.isActive = sampleSubTypes.isActive;
    sampleSubTypesDto.createdAt = sampleSubTypes.createdAt;
    sampleSubTypesDto.createdUser = sampleSubTypes.createdUser;
    sampleSubTypesDto.updatedAt = sampleSubTypes.updatedAt;
    sampleSubTypesDto.updatedUser = sampleSubTypes.updatedUser;
    sampleSubTypesDto.versionFlag = sampleSubTypes.versionFlag;
    return sampleSubTypesDto;
  }
}