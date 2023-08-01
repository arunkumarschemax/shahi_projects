import { Injectable } from '@nestjs/common';
import {PackageTermsDTO} from './package-terms.dto'
import { PackageTerms } from '../package-terms.entity';

@Injectable()
export class PackageTermsAdapter {
  /**
   *
   * @param PackageTermsDTO
   * @returns PackageTerms entity
   */
  public convertDtoToEntity(  packageTermsDTO: PackageTermsDTO,  isUpdate: boolean = false ): PackageTerms {
    const packageTerms = new PackageTerms();
    packageTerms.packageTermsId = packageTermsDTO.packageTermsId;
    packageTerms.packageTermsName = packageTermsDTO.packageTermsName;
    packageTerms.isActive = packageTermsDTO.isActive == undefined?true:packageTermsDTO.isActive;
    if (isUpdate) {
      packageTerms.updatedUser = packageTermsDTO.updatedUser;
    } else {
      packageTerms.isActive = true;
      packageTerms.createdUser = packageTerms.createdUser;
    }
   return packageTerms;
  }
  public convertEntityToDto(packageTermsObject: PackageTerms): PackageTermsDTO {
    const packageTermsDTO= new PackageTermsDTO;
    packageTermsDTO.packageTermsId= packageTermsObject.packageTermsId;
    packageTermsDTO.packageTermsName = packageTermsObject.packageTermsName;
    packageTermsDTO.isActive = packageTermsObject.isActive;
    packageTermsDTO.createdAt = packageTermsObject.createdAt;
    packageTermsDTO.updatedAt = packageTermsObject.updatedAt;
    packageTermsDTO.createdUser = packageTermsObject.createdUser;
    packageTermsDTO.updatedUser = packageTermsObject.updatedUser;
    packageTermsDTO.versionFlag = packageTermsObject.versionFlag;
    return packageTermsDTO;
  }
}
