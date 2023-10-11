import { FabricRequestEntity } from "./fabric-request.entity";
import { Injectable } from "@nestjs/common";
import { FabricRequestRepository } from "./repository/fabric-request.repository";
import { CommonResponseModel, FabricDevelopmentRequestResponse, StatusEnum } from "@project-management-system/shared-models";
import { FabricRequestDto } from "./dto/fabric-request.dto";
import { FabricRequestQualitiesInfoEntity } from "./fabric-request-quality-info.entity";
import { FabricRequestItemsEntity } from "./fabric-request-items.entity";
import { FabricRequestQualitiesEntity } from "./fabric-request-qualities.entity";
import { FabricRequestQualitiesRepository } from "./repository/fabric-request-qualities.repository";

@Injectable()
export class FabricDevelopmentService {
    constructor (
         private FabricRepo: FabricRequestRepository,
         private qualityrepo: FabricRequestQualitiesRepository
    ){}


     async createFabricDevelopmentRequest(req: FabricRequestDto, isUpdate: boolean): Promise<FabricDevelopmentRequestResponse> {
      console.log(req,"service")
      try {

        const data = await this.FabricRepo.getAllCount();
        const maxId = data.fabric_request_id
        console.log(data,"data")

    
        const Entity = new FabricRequestEntity();
        Entity.locationId = req.locationId
        Entity.requestNo = "REQ"+(maxId+1)
        Entity.styleId = req.styleId
        Entity.buyerId = req.buyerId
        Entity.pchId = req.pchId
        Entity.type = req.type
        Entity.sampleTypeId = req.sampleTypeId
        Entity.remarks = req.remarks
        Entity.fabricResponsible = req.fabricResponsible
        Entity.facilityId = req.facilityId
        Entity.lightSourcePrimary = req.lightSourcePrimary
        Entity.lightSourceSecondary = req.lightSourceSecondary
        Entity.lightSourceTertiary = req.lightSourceTertiary
        Entity.status = StatusEnum.OPEN
        Entity.fileName = req.fileName
        Entity.fileName= req.filePath
        Entity.fabricQuantityEntity = []
        

        
        for(const qualityData of req.qualities){
            const entity = new FabricRequestQualitiesEntity()
            entity.quality= qualityData.quality
            entity.placement = qualityData.placement
            entity.width = qualityData.width
            entity.description = qualityData.description
            entity.fabricDescription = qualityData.fabricDescription
            entity.fabricCode = "FABRIC"+"/"+ (maxId+1)
            entity.fabricEntity = []
             
            
          

            for (const qualityDataInfo of qualityData.qualitiesInfo){
              const quantityInfoEntity = new FabricRequestQualitiesInfoEntity()
              quantityInfoEntity.styleId = qualityDataInfo.styleId
              quantityInfoEntity.colorId = qualityDataInfo.colorId
              quantityInfoEntity.garmentQuantity = qualityDataInfo.garmentQuantity
              quantityInfoEntity.consumption = qualityDataInfo.consumption
              quantityInfoEntity.wastage = qualityDataInfo.wastage
              quantityInfoEntity.fabricQuantity = qualityDataInfo.fabricQuantity
              quantityInfoEntity.uomId = qualityDataInfo.uomId
              quantityInfoEntity.fileName = qualityDataInfo.fileName
              quantityInfoEntity.filePath = qualityDataInfo.filePath
              quantityInfoEntity.status = StatusEnum.OPEN
              quantityInfoEntity.remarks = qualityDataInfo.remarks
              quantityInfoEntity.fabricItemsEntity = []
            
            

              for (const iteminfo of qualityDataInfo.itemsinfo){
              const itemEntity = new FabricRequestItemsEntity()
              itemEntity.itemCode = iteminfo.itemCode
              itemEntity.description = iteminfo.description

              quantityInfoEntity.fabricItemsEntity.push(itemEntity)
              
              
              }

              entity.fabricEntity.push(quantityInfoEntity)
            
            
            }
            
            Entity.fabricQuantityEntity.push(entity)


          }
        
        const save = await this.FabricRepo.save(Entity);
    
        if (save){
            
       return new FabricDevelopmentRequestResponse(true, 0, "Fabric Development Request successfully");
        }
    
        } catch (err) {
          throw err;
        }
      }

   async getFabricDevReqData(): Promise<CommonResponseModel> {
      try {
     const data = await this.FabricRepo.find({
      relations:["fabricQuantityEntity","fabricQuantityEntity.fabricEntity","fabricQuantityEntity.fabricEntity.fabricItemsEntity"]
     })
     console.log(data,'-----------')
     return new CommonResponseModel(true, 0, "Fabric Development Request successfully", data);

        } catch (err) {
          throw err;
        }
      }    

}