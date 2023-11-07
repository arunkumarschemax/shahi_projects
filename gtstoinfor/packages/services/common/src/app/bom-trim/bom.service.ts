
import { Injectable } from "@nestjs/common";
import { BomTrimRepository } from "./repository/bom-trim.repository";
import { BomRequest, BomTrimResponseModel } from "@project-management-system/shared-models";
import { BomTrimEntity } from "./bom-trim.entity";
import { BomTrimDto } from "./dto/bom-trim.dto";


@Injectable()
export class BomService {
    constructor (
         private TrimRepo: BomTrimRepository,
         
    ){}

    async createBomTrim(req: BomTrimDto, isUpdate: boolean): Promise<BomTrimResponseModel> {
        // console.log(req,"service")

         const data = await this.TrimRepo.getAllCount();
         const maxId = data.id
        //  console.log(data,"data")

        try {
          
            const entity = new BomTrimEntity()
            entity.itemTypeId = req.itemTypeId
            entity.pchId = req.pchId
            entity.facilityId = req.facilityId
            entity.trimCode = "TRIM"+"00"+(maxId+1)
            entity.trim = req.trim
            entity.genericCode = req.genericCode
            entity.typeId = req.typeId
            entity.groupId = req.groupId
            entity.useInOperationId = req.useInOperationId
            entity.description = req.description
            entity.responsible = req.responsible
            entity.developmentResponsible = req.developmentResponsible
            entity.basicUomId = req.basicUomId
            entity.alternateUomId = req.alternateUomId
            entity.factor = req.factor
            entity.orderMultipleBuom = req.orderMultipleBuom
            entity.moq = req.moq
            entity.orderMultipleAuom = req.orderMultipleAuom
            entity.currencyId = req.currencyId
            entity.price = req.price
            entity.taxPercentage = req.taxPercentage
            entity.totalPrice = req.totalPrice
            entity.purchasePriceQuantity = req.purchasePriceQuantity
            entity.salesTax = req.salesTax
            entity.exciseDuty = req.exciseDuty
            entity.consumption = req.consumption
            entity.wastagePercentage = req.wastagePercentage
            entity.costGroup = req.costGroup
            entity.usageRemarks = req.usageRemarks
            entity.licenceId = req.licenceId
            entity.property = req.property
            entity.isSaleItem = req.isSaleItem
             
        const save = await this.TrimRepo.save(entity);
          
      
          if (save){
              
         return new BomTrimResponseModel(true, 0, "Trim Created successfully");
          } else {

         return new BomTrimResponseModel(false, 0, "Something went Wrong");

          }
      
          } catch (err) {
            throw err;
          }
        }


    
      

}