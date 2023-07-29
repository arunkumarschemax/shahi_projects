import { Injectable } from '@nestjs/common';
// import { Countries } from '../../countries/countries.entity';
import { Currencies } from '../../currencies/currencies.entity';
import { Vendors } from '../vendors.entity';
import { VendorsDTO } from './vendors.dto';
import { Countries } from '../../countries/countries.entity';

@Injectable()
export class VendorsAdapter {
  /**
   * 
   * @param vendorsDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(vendorsDto: VendorsDTO,  isUpdate: boolean = false ): Vendors {
    const vendors = new Vendors();
    vendors.vendorCode=vendorsDto.vendorCode;
    vendors.vendorName=vendorsDto.vendorName;
    vendors.gstNumber=vendorsDto.gstNumber;
    vendors.website=vendorsDto.website;
    vendors.contactPerson=vendorsDto.contactPerson;
    vendors.street=vendorsDto.street;
    vendors.city=vendorsDto.city;
    vendors.apartment=vendorsDto.apartment;
    vendors.postalCode=vendorsDto.postalCode;
    vendors.countryInfo = new Countries();
    vendors.countryInfo.countryId=vendorsDto.countryId;
    vendors.currencyInfo = new Currencies();
    vendors.currencyInfo.currencyId=vendorsDto.currencyId;
    vendors.privateNote=vendorsDto.privateNote;
    vendors.publicNote=vendorsDto.publicNote;
    vendors.bankAccNo=vendorsDto.bankAccNo; 
    vendors.bankIfsc=vendorsDto.bankIfsc;
    vendors.bankName=vendorsDto.bankName;
    vendors.bankBranch=vendorsDto.bankBranch;
    vendors.contactNumber=vendorsDto.contactNumber;
    vendors.emailId=vendorsDto.emailId;    
    // vendors.priceNeeded =vendorsDto.priceNeeded;
    vendors.isActive=vendorsDto.isActive==undefined?true:vendorsDto.isActive;
    if (isUpdate) {
      vendors.vendorId=vendorsDto.vendorId;
        vendors.updatedUser = vendorsDto.createdUser;
    } else {
        vendors.isActive = true;
        vendors.createdUser = vendorsDto.createdUser;
    }
   return vendors;
  }
  public convertEntityToDto(vendorObject: Vendors): VendorsDTO {
    const vendorsDto= new VendorsDTO;
    vendorsDto.vendorId = vendorObject.vendorId;
    vendorsDto.vendorCode=vendorObject.vendorCode;
    vendorsDto.vendorName = vendorObject.vendorName;
    vendorsDto.gstNumber=vendorObject.gstNumber;
    vendorsDto.website=vendorObject.website;
    vendorsDto.contactPerson=vendorObject.contactPerson;
    vendorsDto.street=vendorObject.street;
    vendorsDto.city=vendorObject.city;
    vendorsDto.apartment = vendorObject.apartment;
    vendorsDto.postalCode=vendorObject.postalCode;
    vendorsDto.countryId=vendorObject.countryInfo.countryId;
    vendorsDto.countryName=vendorObject.countryInfo.countryName;
    vendorsDto.currencyId=vendorObject.currencyInfo.currencyId;
    vendorsDto.currencyName=vendorObject.currencyInfo.currencyName;
    vendorsDto.privateNote=vendorObject.privateNote;
    vendorsDto.publicNote=vendorObject.publicNote;
    vendorsDto.bankAccNo=vendorObject.bankAccNo;
    vendorsDto.bankIfsc=vendorObject.bankIfsc;
    vendorsDto.bankName=vendorObject.bankName;
    vendorsDto.bankBranch=vendorObject.bankBranch;
    vendorsDto.contactNumber=vendorObject.contactNumber;
    vendorsDto.emailId=vendorObject.emailId; 
    // vendorsDto.priceNeeded=vendorObject.priceNeeded;   
    vendorsDto.isActive = vendorObject.isActive;
    vendorsDto.createdAt = vendorObject.createdAt;
    vendorsDto.updatedAt = vendorObject.updatedAt;
    vendorsDto.createdUser = vendorObject.createdUser;
    vendorsDto.updatedUser = vendorObject.updatedUser;
    vendorsDto.versionFlag = vendorObject.versionFlag;
    return vendorsDto;
  }
}
