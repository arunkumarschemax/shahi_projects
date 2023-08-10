import { Injectable } from '@nestjs/common';
import { TaxesDTO } from './taxes.dto';
import { Taxes } from './taxes.entity';

@Injectable()
export class TaxesAdapter {
  /**
   *
   * @param TaxesDTO
   * @returns Departments entity
   */
  public convertDtoToEntity(  taxesDTO: TaxesDTO,  isUpdate: boolean = false ): Taxes {
    const tax = new Taxes();
    tax.taxId=taxesDTO.taxId;
    tax.taxName=taxesDTO.taxName;
    tax.taxPercentage=taxesDTO.taxPercentage;
    tax.taxcategory=taxesDTO.taxCategory;
    tax.isActive=taxesDTO.isActive==undefined?true:taxesDTO.isActive;
    if (isUpdate) {
      tax.updatedUser = taxesDTO.updatedUser;
    } else {
      tax.isActive = true;
      tax.createdUser = taxesDTO.createdUser;
    }
   return tax;
  }
  public convertEntityToDto(taxesObject: Taxes): TaxesDTO {
    const taxesDTO= new TaxesDTO;
    taxesDTO.taxId = taxesObject.taxId;
    taxesDTO.taxName = taxesObject.taxName;
    taxesDTO.taxPercentage = taxesObject.taxPercentage;
    taxesDTO.taxCategory = taxesObject.taxcategory
    taxesDTO.isActive = taxesObject.isActive;
    taxesDTO.createdAt = taxesObject.createdAt;
    taxesDTO.updatedAt = taxesObject.updatedAt;
    taxesDTO.createdUser = taxesObject.createdUser;
    taxesDTO.updatedUser = taxesObject.updatedUser;
    taxesDTO.versionFlag = taxesObject.versionFlag;
    return taxesDTO;
  }
}
