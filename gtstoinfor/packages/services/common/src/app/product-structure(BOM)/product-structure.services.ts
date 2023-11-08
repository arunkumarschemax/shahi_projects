
import { Injectable } from "@nestjs/common";
import { BomRequest, BomTrimResponseModel, CommonResponseModel, FgItemCodeReq, FgRmMappingResponseModel, ProductStructureResponseModel, RmMappingFilterRequest, SMVFilterRequest } from "@project-management-system/shared-models";
import { SMVEfficiencyRepository } from "./repository/smv-efficency.repository";
import { SMVEfficiencyDto } from "./dto/smv-efficency.dto";
import { SMVEfficiencyEntity } from "./smv-efficency.entity";
import { FgRMMappingDto } from "./dto/fg-rm-mapping.dto";
import { FgRmMappingEntity } from "./fg-rm-mapping.entity";
import { FgRmMappingRepository } from "./repository/fg-rm-mapping.repo";
import { FgRMItemsMappingDto } from "./dto/rm-item-dto";


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

        async createFgRmMapping(req: FgRMMappingDto, isUpdate: boolean): Promise<FgRmMappingResponseModel> {
          console.log(req,"service")
  
          try {
            
            let flag = true
            

            for (const data of req.itemInfo){
              const entity = new FgRmMappingEntity()
              entity.fgitemId = req.fgitemId
              entity.fgitemCode = req.fgitemCode
              entity.createdUser = req.createdUser  
              entity.rmitemId = data.rmitemId
              entity.rmitemCode = data.rmitemCode
              const save = await this.fgrmRepo.save(entity)
      

            }
  
            if (!flag){
              return new FgRmMappingResponseModel(false, 0, "Something went Wrong");   
  
            } else {
              return new FgRmMappingResponseModel(true, 0, "FG-RM Mapping Sucessfully",);
              
            }
        
            } catch (err) {
              throw err;
            }
          }

   async getAllInfoByItemCode(req:FgItemCodeReq):Promise<CommonResponseModel>{
    try{
      const data = await this.fgrmRepo.getAllInfoByItemCode(req)
      if(data.length > 0){
        return new CommonResponseModel(true,1,'Data retrieved',data)
      } else{
        return new CommonResponseModel(false,0,'No data found')
      }
    } catch(err){
      throw err
    }
   }       
          // async getRmMapped(req?:RmMappingFilterRequest): Promise<CommonResponseModel> {
          //   const data = await this.fgrmRepo.getAllFgRmMapped(req)
          //   if (data.length > 0){
    
          //       return new CommonResponseModel(true, 1111, 'Data retreived',data )
          //   }
          //   return new CommonResponseModel(false, 0, 'Data Not retreived',[])
          // }

          async getRmMapped(req?: RmMappingFilterRequest): Promise<CommonResponseModel> {
            const data = await this.fgrmRepo.getAllFgRmMapped(req);
          
            if (data.length > 0) {
              const groupedData = data.reduce((result, item) => {
                const fgItemCode = item.fg_item_code;
                const fgItemId = item.fg_item_id;
                if (!result[fgItemId]) {
                  result[fgItemId] = {
                    fg_item_id: fgItemId,
                    fg_item_code: fgItemCode,
                    rm_items: [],
                  };
                }
                result[fgItemId].rm_items.push({
                  rm_item_id: item.rm_item_id,
                  rm_item_code: item.rm_item_code,
                  item_type: item.item_type,
                  item_group:item.item_group,
                  is_sub_contract:item.is_sub_contract,
                  facility:item.facility,
                  season:item.season

                });
                return result;
              }, {});
          
              return new CommonResponseModel(true, 1111, 'Data retrieved', Object.values(groupedData));
            }
          
            return new CommonResponseModel(false, 0, 'Data Not retrieved', []);
          }
          
          

          async getAllSmvData(req?:SMVFilterRequest): Promise<CommonResponseModel> {
            const data = await this.Repo.getSMV(req)
            if (data.length > 0){
    
                return new CommonResponseModel(true, 1111, 'Data retreived',data )
            }
            return new CommonResponseModel(false, 0, 'Data Not retreived',[])
          }
      

}