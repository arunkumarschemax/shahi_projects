
import { Injectable } from "@nestjs/common";
import { BomTrimResponseModel, CommonResponseModel, FeatureInfoModel, FeatureSubstitutionModel, FgItemCodeReq, FgItemCreIdRequest, FgRmMappingResponseModel, ProductStructureResponseModel, RmMappingFilterRequest, SKUlistFilterRequest, SMVFilterRequest, fgInfoModel, optionInfoModel } from "@project-management-system/shared-models";
import { SMVEfficiencyRepository } from "./repository/smv-efficency.repository";
import { SMVEfficiencyDto } from "./dto/smv-efficency.dto";
import { SMVEfficiencyEntity } from "./smv-efficency.entity";
import { FgRMMappingDto } from "./dto/fg-rm-mapping.dto";
import { FgRmMappingEntity } from "./fg-rm-mapping.entity";
import { FgRmMappingRepository } from "./repository/fg-rm-mapping.repo";
import { FgRMItemsMappingDto } from "./dto/rm-item-dto";
import { SKUGenerationService } from "@project-management-system/shared-services";


@Injectable()
export class ProductStructureService {
    constructor (
         private Repo: SMVEfficiencyRepository,
         private fgrmRepo : FgRmMappingRepository,
         private fgSkuService : SKUGenerationService 
         
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
          // console.log(req,"service")
  
          try {
            
            let flag = true
            

            for (const data of req.itemInfo){
              const entity = new FgRmMappingEntity()
              entity.fgitemId = req.fgitemId
              entity.fgitemCode = req.fgitemCode
              entity.createdUser = req.createdUser  
              entity.rmitemId = data.rmitemId
              entity.rmitemCode = data.rmitemCode
              entity.operationId = data.operationId
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
                const fgItemId = item.fg_rm_id;
                
                
                if (!result[fgItemCode]) {
                  result[fgItemCode] = {
                    fg_item_id: fgItemId,
                    fg_item_code: fgItemCode,
                    rm_items: [],
                  };
                }
                result[fgItemCode].rm_items.push({
                  rm_item_id: item.rm_item_id,
                  rm_item_code: item.rm_item_code,
                  item_type: item.item_type,
                  item_group:item.item_group,
                  is_sub_contract:item.is_sub_contract,
                  facility:item.facility,
                  season:item.season,
                  operation_name:item.operation_name,
                  sequence:item.sequence

                });
                return result;
              }, {});
          
              return new CommonResponseModel(true, 1111, 'Data retrieved', Object.values(groupedData));
            }
          
            return new CommonResponseModel(false, 0, 'Data Not retrieved', []);
          }

          async getAllSmvData(req?:SMVFilterRequest): Promise<CommonResponseModel> {
            const data = await this.Repo.getSMV(req)
            console.log(data, "data")
            if (data.length > 0){
    
                return new CommonResponseModel(true, 1111, 'Data retreived',data )
            }
            return new CommonResponseModel(false, 0, 'Data Not retreived',[])
          }
      
    
  async getFeaturesInfoByFgItem(req:FgItemCreIdRequest):Promise<CommonResponseModel>{
    try{
      const data =[]
      const skureq = new SKUlistFilterRequest(req.fgItemId)
      const sizeInfo = await this.fgSkuService.getSize(skureq)
      const colorInfo = await this.fgSkuService.getColor(skureq)
      const destinationInfo = await this.fgSkuService.getDestination(skureq)
      const featureMap = new Map<string,FeatureInfoModel>()
      const info = await this.fgrmRepo.getInfoByFgItem(req)
      if(info){
        for(const rec of info){
          if(!featureMap.has(rec.feature_code)){
            featureMap.set(rec.feature_code,new FeatureInfoModel(rec.feature_code,rec.feature_id,rec.option_group,[],[]))
         
          }
          featureMap.get(rec.feature_code).optionInfo.push(new optionInfoModel(rec.option_value,rec.rm_item_id,rec.rm_item_code,rec.rm_sku_id,rec.rm_sku_code,rec.feature_option_id,rec.option_id))
          
        }
        const featureModel : FeatureInfoModel[] =[];
        featureMap.forEach((e => {
          if(e.option == 'COLOR'){
            for(const col of colorInfo.data){
              featureMap.get(e.featureCode).fgInfo.push(new fgInfoModel(col.color,e.featureCode))
            }
          }
          if(e.option == 'SIZE'){
            for(const si of sizeInfo.data){
              featureMap.get(e.featureCode).fgInfo.push(new fgInfoModel(si.size,e.featureCode))
            }
          }
          if(e.option == 'DESTINATION'){
            for(const des of destinationInfo.data){
              featureMap.get(e.featureCode).fgInfo.push(new fgInfoModel(des.destination,e.featureCode))
            }
          }
          featureModel.push(e)}))
        data.push(new FeatureSubstitutionModel(info[0].fg_item_id,info[0].fg_item_code,featureModel))
      }
      return new CommonResponseModel(true,1,'Data retrieved',data)
    }catch(err){
      return new CommonResponseModel(false,0,'No data found')
    }
  }
}