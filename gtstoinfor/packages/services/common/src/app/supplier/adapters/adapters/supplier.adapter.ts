import { SupplierDto } from "../../dto/supplier-dto";
import { SupplierEntity } from "../../supplier.entity";


export class SupplierAdapter {

  // static toDto: any;
  public convertDtoToEntity(dto: SupplierDto,isUpdate:boolean = false): SupplierEntity {
    
    const entity = new SupplierEntity;
    entity.category = dto.category;
    entity.supplierCode = dto.supplierCode;
    entity.supplierName = dto.supplierName;
    entity.GstNumber = dto.GstNumber;
    entity.contactPerson = dto.contactPerson;
    entity.street = dto.street;
    entity.apartment = dto.apartment;
    entity.city = dto.city;
    entity.state = dto.state;
    entity.district = dto.district;
    entity.postalCode = dto.postalCode;
    entity.commision = dto.commision;
    entity.bankAccountNo = dto.bankAccountNo;
    entity.bankIFSC = dto.bankIFSC;
    entity.bankName = dto.bankName;
    entity.bankBranch = dto.bankBranch;
    entity.contactNumber = dto.contactNumber;
    entity.email = dto.email;
    entity.creditPaymentPeriod = dto.creditPaymentPeriod;
    entity.isActive = dto.isActive == undefined?true:dto.isActive;
    if(isUpdate){
      entity.updatedUser = dto.updatedUser;
    }else{
      entity.isActive = true;
      entity.createdUser = dto.createdUser
    }
    // Map any other fields as needed
    console.log(entity);
    return entity;
   
  }

   convertEntityToDto(entity: SupplierEntity): SupplierDto {
    const dto = new SupplierDto;
    dto.id = entity.id;
    dto.category = entity.category;
    dto.supplierCode = entity.supplierCode;
    dto.supplierName = entity.supplierName;
    dto.GstNumber = entity.GstNumber;
    dto.contactPerson = entity.contactPerson;
    dto.street = entity.street;
    dto.apartment = entity.apartment;
    dto.city = entity.city;
    dto.state = entity.state;
    dto.district = entity.district;
    dto.postalCode = entity.postalCode;
    dto.commision = entity.commision;
    dto.bankAccountNo = entity.bankAccountNo;
    dto.bankIFSC = entity.bankIFSC;
    dto.bankName = entity.bankName;
    dto.bankBranch = entity.bankBranch;
    dto.contactNumber = entity.contactNumber;
    dto.email = entity.email;
    dto.creditPaymentPeriod = entity.creditPaymentPeriod;
    dto.isActive = entity.isActive;
    // Map any other fields as needed
    return dto;
  }
}
