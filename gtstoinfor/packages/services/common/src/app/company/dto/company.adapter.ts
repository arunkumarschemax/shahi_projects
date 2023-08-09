import { Injectable } from '@nestjs/common';

import { Company } from '../company.entity';
import { CompanyDTO } from './company.dto';

@Injectable()
export class CompanyAdapter {
  /**
   * 
   * @param companyDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  companyDto: CompanyDTO,  isUpdate: boolean = false ): Company {
    const companys = new Company();
    companys.companyId=companyDto.companyId;
    companys.companyName=companyDto.companyName;
    companys.companyCode = companyDto.companyCode;
    companys.organizationCode= companyDto.organizationCode;
    // company.isActive = statesDto.isActive == undefined ? true : statesDto.isActive;
    companys.isActive=companyDto.isActive==undefined?true:companyDto.isActive;
    if (isUpdate) {
        companys.updatedUser = companyDto.updatedUser;
    } else {
        companys.isActive = true;
        companys.createdUser = companyDto.createdUser;
    }
   return companys;
  }
  public convertEntityToDto(companyObject: Company): CompanyDTO {
    const companyDto= new CompanyDTO;
    companyDto.companyId=companyObject.companyId;
    companyDto.companyName=companyObject.companyName;
    companyDto.companyCode = companyObject.companyCode;
    companyDto.organizationCode = companyObject.organizationCode;
    companyDto.isActive = companyObject.isActive;
    companyDto.createdAt = companyObject.createdAt;
    companyDto.updatedAt = companyObject.updatedAt;
    companyDto.createdUser = companyObject.createdUser;
    companyDto.updatedUser = companyObject.updatedUser;
    companyDto.versionFlag = companyObject.versionFlag;
    return companyDto;
  }
}
