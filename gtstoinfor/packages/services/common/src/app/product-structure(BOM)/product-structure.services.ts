
import { Injectable } from "@nestjs/common";
import { BomRequest, BomTrimResponseModel, CommonResponseModel, FgRmMappingResponseModel, ProductStructureResponseModel } from "@project-management-system/shared-models";
import { SMVEfficiencyRepository } from "./repository/smv-efficency.repository";
import { SMVEfficiencyDto } from "./dto/smv-efficency.dto";
import { SMVEfficiencyEntity } from "./smv-efficency.entity";
import { FgRMMappingDto } from "./dto/fg-rm-mapping.dto";
import { FgRmMappingEntity } from "./fg-rm-mapping.entity";
import { FgRmMappingRepository } from "./repository/fg-rm-mapping.repo";


@Injectable()
export class ProductStructureService {
    constructor (
         private Repo: SMVEfficiencyRepository,
         private fgrmRepo : FgRmMappingRepository 
         
    ){}

    async createSMVEfficency(req: SMVEfficiencyDto, isUpdate: boolean): Promise<ProductStructureResponseModel> {
        console.log(req,"service")


        try {

            const entity = new SMVEfficiencyEntity()
            entity.SmvEfficiencyId = req.SmvEfficiencyId
            entity.operationId = req.operationId
            entity.capacityType = req.capacityType
            entity.validFromDate = req.validFromDate
            entity.validToDate = req.validToDate
            entity.revisionNo = req.revisionNo
            entity.workCenter = req.workCenter
            entity.operationDescription = req.operationDescription
            entity.departmentId = req.departmentId
            entity.planingArea = req.planingArea
            entity.runTime = req.runTime
            entity.priceTimeQty = req.priceTimeQty
            entity.setupTime = req.setupTime
            entity.externalSetup = req.externalSetup
            entity.fixedTime = req.fixedTime
            entity.plnnoMachine = req.plnnoMachine
            entity.plnnoWorkers = req.plnnoWorkers
            entity.plnnoSetup = req.plnnoSetup
            entity.phantom = req.phantom
            entity.leadtmOffset = req.leadtmOffset
            entity.pdays = req.pdays
            entity.optionsPercent = req.optionsPercent
            entity.scrapPct = req.scrapPct
            entity.setupScrap = req.setupScrap
            entity.documentId = req.documentId
            entity.toolNo = req.toolNo
            entity.subcontrCtrl = req.subcontrCtrl
            entity.finite = req.finite
            entity.qtyPerHour = req.qtyPerHour
            entity.critResource = req.critResource
            entity.addMtrlOffset = req.addMtrlOffset
            entity.shippingBuffer = req.shippingBuffer

            const save = await this.Repo.save(entity)


          if (save){

            return new ProductStructureResponseModel(true, 0, "SMV Efficency Created Sucessfully",save);

          } else {

            return new ProductStructureResponseModel(false, 0, "Something went Wrong");
           
          }
      
          } catch (err) {
            throw err;
          }
        }

        async createFgRmMapping(req: FgRMMappingDto[], isUpdate: boolean): Promise<FgRmMappingResponseModel> {
          console.log(req,"service")
  
          try {

            const FgRMMappingDto: FgRMMappingDto[] = [];

            for(const data of req){
              const entity = new FgRmMappingEntity()
              entity.FgRmId = data.FgRmId
              entity.fgitemId = data.fgitemId
              entity.fgitemCode = data.fgitemCode
              entity.rmitemId = data.rmitemId
              entity.rmitemCode = data.fgitemCode
              entity.createdUser = data.createdUser
              FgRMMappingDto.push(entity)
  
            }

              const save = await this.fgrmRepo.save(FgRMMappingDto)
  
            if (save){
  
              return new FgRmMappingResponseModel(true, 0, "FG-RM Mapping Sucessfully",save);
  
            } else {
  
              return new FgRmMappingResponseModel(false, 0, "Something went Wrong");
             
            }
        
            } catch (err) {
              throw err;
            }
          }

      

}