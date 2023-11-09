import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PurchaseOrderEntity } from "./entities/purchase-order-entity";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PurchaseOrderDto } from "./dto/purchase-order-dto";
import { PurchaseOrderFbricEntity } from "./entities/purchase-order-fabric-entity";
import { PurchaseOrderTrimEntity } from "./entities/purchase-order-trim-entity";

@Injectable()
export class PurchaseOrderService{
    constructor(
        @InjectRepository(PurchaseOrderEntity)
        private poRepo:Repository<PurchaseOrderEntity>){  }



async cretePurchaseOrder(req:PurchaseOrderDto):Promise<CommonResponseModel>{
    try{
        let pofabricInfo=[]
        let poTrimInfo =[]
        const poEntity = new PurchaseOrderEntity()
     poEntity.poNumber=req.poNumber
     poEntity.vendorId=req.vendorId
     poEntity.styleId=req.styleId
     poEntity.expectedDeliveryDate=req.expectedDeliveryDate
     poEntity.purchaseOrderDate=req.purchaseOrderDate
     poEntity.createdUser=req.createdUser
     poEntity.createdUser=req.createdUser
        for(const poFabric of req.poFabricInfo){
            const pofabricEntity = new PurchaseOrderFbricEntity()
            pofabricEntity.colourId=poFabric.colourId
            pofabricEntity.productGroupId=poFabric.productGroupId
            pofabricEntity.remarks=poFabric.remarks
            pofabricEntity.fabricType=poFabric.fabricType
            pofabricEntity.fabricCode=poFabric.fabricCode
            pofabricEntity.shahiFabricCode=poFabric.shahiFabricCode
            pofabricEntity.weaveId=poFabric.weaveId
            pofabricEntity.weight=poFabric.weight
            pofabricEntity.width=poFabric.width
            pofabricEntity.construction=poFabric.construction
            pofabricEntity.yarnCount=poFabric.yarnCount
            pofabricEntity.finish=poFabric.finish
            pofabricEntity.shrinkage=poFabric.shrinkage
            pofabricEntity.pch=poFabric.pch
            pofabricEntity.moq=poFabric.moq
            pofabricInfo.push(pofabricEntity)
        }
        for(const trimInfo of req.poTrimInfo){
            const trimEntity= new PurchaseOrderTrimEntity()
            trimEntity.productGroupId=trimInfo.productGroupId
            trimEntity.trimId=trimInfo.trimId
            trimEntity.trimCode=trimInfo.trimCode
            trimEntity.description=trimInfo.description
            trimEntity.consumption=trimInfo.consumption
            trimEntity.remarks=trimInfo.remarks
            poTrimInfo.push(trimEntity)
        }
        const save = await this.poRepo.save(poEntity)
        if(save){
            return new CommonResponseModel(true,1,'purchased Order Created Sucessfully')
        }else{
       return new CommonResponseModel(false,0,'Something went Wrong')
            
        }
        }catch(err){
            throw err
        }
    }

}