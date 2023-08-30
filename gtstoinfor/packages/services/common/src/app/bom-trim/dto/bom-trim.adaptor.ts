import { Injectable } from "@nestjs/common";
import { BomTrimDto } from "./bom-trim.dto";
import { BomTrimCreationEntity } from "../bom-trim.entity";


@Injectable()
export class BomTrimAdapter {
 
  public convertDtoToEntity(bomTrimDTO: BomTrimDto,  isUpdate: boolean = false ): BomTrimCreationEntity {
     const entity = new BomTrimCreationEntity();
     entity.bomTrimId = bomTrimDTO.bomTrimId
     entity.trimCode = bomTrimDTO.trimCode
     entity.trim = bomTrimDTO.trim
     entity.genericCode = bomTrimDTO.genericCode
     entity.type = bomTrimDTO.type
     entity.group = bomTrimDTO.group
     entity.useInOperation = bomTrimDTO.useInOperation
     entity.description = bomTrimDTO.description
     entity.responsible = bomTrimDTO.responsible
     entity.developmentResponsible = bomTrimDTO.responsible
     entity.basicUom = bomTrimDTO.basicUom
     entity.alternateUom = bomTrimDTO.alternateUom
     entity.factor = bomTrimDTO.factor
     entity.orderMultipleBuom = bomTrimDTO.orderMultipleBuom
     entity.moq = bomTrimDTO.moq
     entity.orderMultipleAuom = bomTrimDTO.orderMultipleAuom
     entity.currency = bomTrimDTO.currency
     entity.price = bomTrimDTO.price
     entity.purchasePriceQuantity = bomTrimDTO.purchasePriceQuantity
     entity.salesTax = bomTrimDTO.salesTax
     entity.exciseDuty = bomTrimDTO.exciseDuty
     entity.licence = bomTrimDTO.licence
     entity.property = bomTrimDTO.property
     entity.isSaleItem = bomTrimDTO.isSaleItem
     entity.consumption = bomTrimDTO.consumption
     entity.wastagePercentage = bomTrimDTO.wastagePercentage
     entity.costGroup = bomTrimDTO.costGroup
     entity.usageRemarks = bomTrimDTO.usageRemarks
     
     return entity

  }

  public convertEntityToDto( entity: BomTrimCreationEntity,  isUpdate: boolean = false ): BomTrimDto {

    const bomDto = new BomTrimDto ()
    bomDto.trim = entity.trim
     bomDto.genericCode = entity.genericCode
     bomDto.type = entity.type
     bomDto.group = entity.group
     bomDto.useInOperation = entity.useInOperation
     bomDto.description = entity.description
     bomDto.responsible = entity.responsible
     bomDto.developmentResponsible = entity.responsible
     bomDto.basicUom = entity.basicUom
     bomDto.alternateUom = entity.alternateUom
     bomDto.factor = entity.factor
     bomDto.orderMultipleBuom = entity.orderMultipleBuom
     bomDto.moq = entity.moq
     bomDto.orderMultipleAuom = entity.orderMultipleAuom
     bomDto.currency = entity.currency
     bomDto.price = entity.price
     bomDto.purchasePriceQuantity = entity.purchasePriceQuantity
     bomDto.salesTax = entity.salesTax
     bomDto.exciseDuty = entity.exciseDuty
     bomDto.licence = entity.licence
     bomDto.property = entity.property
     bomDto.isSaleItem = entity.isSaleItem
     bomDto.consumption = entity.consumption
     bomDto.wastagePercentage = entity.wastagePercentage
     bomDto.costGroup = entity.costGroup
     bomDto.usageRemarks = entity.usageRemarks

  return bomDto
  }


  
    

}