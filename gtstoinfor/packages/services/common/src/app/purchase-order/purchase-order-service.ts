import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { PurchaseOrderEntity } from "./entities/purchase-order-entity";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PurchaseOrderDto } from "./dto/purchase-order-dto";
import { PurchaseOrderFbricEntity } from "./entities/purchase-order-fabric-entity";
import { PurchaseOrderTrimEntity } from "./entities/purchase-order-trim-entity";

@Injectable()
export class PurchaseOrderService{
    constructor(
        @InjectRepository(PurchaseOrderEntity)
        private poRepo:Repository<PurchaseOrderEntity>,
        @InjectDataSource()
        private dataSource: DataSource,
        ){  }



async cretePurchaseOrder(req:PurchaseOrderDto):Promise<CommonResponseModel>{
    try{
        console.log(req)
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
            pofabricEntity.fabricTypeId=poFabric.fabricTypeId
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
            pofabricEntity.m3FabricCode=poFabric.m3FabricCode
            pofabricEntity.content=poFabric.content
            pofabricInfo.push(pofabricEntity)
        }
        poEntity.poFabricInfo=pofabricInfo
        for(const trimInfo of req.poTrimInfo){
            const trimEntity= new PurchaseOrderTrimEntity()
            trimEntity.colourId=trimInfo.colourId
            trimEntity.productGroupId=trimInfo.productGroupId
            trimEntity.trimId=trimInfo.trimId
            trimEntity.m3TrimCode=trimInfo.m3TrimCode
            trimEntity.description=trimInfo.description
            trimEntity.consumption=trimInfo.consumption
            trimEntity.remarks=trimInfo.remarks
            poTrimInfo.push(trimEntity)
        }
        poEntity.poTrimInfo=poTrimInfo
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

    async getAllPoData ():Promise<CommonResponseModel>{
        try{
            let query =`SELECT po.purchase_order_id as purchaseOrderId,po.po_number AS poNumber,po.vendor_id AS vendorId,po.style_id AS styleId,s.style,po.expected_delivery_date AS deliveryDate, po.purchase_order_date AS orderDate,po.status, 
            po.remarks,pof.po_fabric_id as poFabricId,pof.colour_id AS colorId, c.colour as fabricColor,pof.product_group_id AS productGroupId,pg.product_group AS fabricProductGroup, pof.remarks as fabricRemarks,pof.fabric_type_id AS fabricTypeId,pof.purchase_order_id as fabricPurchaseOrderId,
            ft.fabric_type_name AS fabricTypeName,pof.fabric_code AS fabricCode,pof.m3_fabric_code AS m3FabricCode,pof.shahi_fabric_code AS shahiFabricCode,pof.content,pof.weave_id AS weaveId,
            pof.weight,pof.width,pof.construction,pof.yarn_count AS yarnCount,pof.finish,pof.shrinkage,pof.pch,pch.profit_control_head AS profitControlHead,pof.moq,pot.po_trim_id as poTrimId,pot.trim_id,pot.description,
            pot.consumption,pot.remarks as trimRemarks,pot.product_group_id AS trimProductGroupId,tpg.product_group AS trimProductGroup,pot.m3_trim_code AS m3TrimCode,pot.colour_id AS trimColorId,tc.colour as trimColor,pot.purchase_order_id as trimPurchaseOrderId
            FROM purchase_order po
            LEFT JOIN purchase_order_fabric pof ON pof.purchase_order_id = po.purchase_order_id
            LEFT JOIN purchase_order_trim pot ON pot.purchase_order_id = po.purchase_order_id
            LEFT JOIN style s ON s.style_id = po.style_id
            LEFT JOIN colour c ON c.colour_id = pof.colour_id
            LEFT JOIN product_group pg ON pg.product_group_id = pof.product_group_id
            LEFT JOIN fabric_weave fw ON fw.fabric_weave_id = pof.weave_id
            LEFT JOIN fabric_type ft ON ft.fabric_type_id = pof.fabric_type_id
            LEFT JOIN profit_control_head pch ON pch.profit_control_head_id = pof.pch
            LEFT JOIN colour tc ON tc.colour_id = pot.colour_id
            LEFT JOIN product_group tpg ON tpg.product_group_id = pot.product_group_id`
            const data = await this.dataSource.query(query)

            if (data.length > 0) {
                const responseData = data.reduce((acc, item) => {
                  const purchaseOrderId = item.purchaseOrderId;
          
                  if (!acc[purchaseOrderId]) {
                    acc[purchaseOrderId] = {
                        purchaseOrderId: item.purchaseOrderId,
                        poNumber: item.poNumber,
                        vendorId: item.vendorId,
                        styleId: item.styleId,
                        style: item.style,
                        deliveryDate: item.deliveryDate,
                        orderDate: item.orderDate,
                        status: item.status,
                        fabricInfo: [],
                        trimInfo: [],
                    };
                  }
          
                  acc[purchaseOrderId].fabricInfo.push({
                    poFabricId: item.poFabricId,
                    colorId: item.colorId,
                    fabricColor: item.fabricColor,
                    productGroupId: item.productGroupId,
                    productGroup: item.fabricProductGroup,
                    fabricRemarks: item.fabricRemarks,
                    fabricTypeId: item.fabricTypeId,
                    fabricTypeName: item.fabricTypeName,
                    fabricCode: item.fabricCode,
                    m3FabricCode: item.m3FabricCode,
                    shahiFabricCode: item.shahiFabricCode,
                    content: item.content,
                    weaveId: item.weaveId,
                    weight: item.weight,
                    width: item.width,
                    construction: item.construction,
                    yarnCount: item.yarnCount,
                    finish: item.finish,
                    shrinkage: item.shrinkage,
                    pch: item.pch,
                    profitControlHead: item.profitControlHead,
                    moq: item.moq,
                  });
          
                  acc[purchaseOrderId].trimInfo.push({
                    poTrimId: item.poTrimId,
                    trimId: item.trimId,
                    description: item.description,
                    consumption: item.consumption,
                    trimRemarks: item.trimRemarks,
                    trimProductGroupId: item.trimProductGroupId,
                    trimProductGroup: item.trimProductGroup,
                    m3TrimCode: item.m3TrimCode,
                    trimColorId: item.trimColorId,
                    trimColor: item.trimColor,
                  });
          
                  return acc;
                }, {});
          
                const finalResponse = Object.values(responseData);
                return new CommonResponseModel(true, 0 , "Purchase Order Data retrieved successfully",finalResponse)
            }else{
                return new CommonResponseModel(false,1,"No data found",[])
            }
        }catch(err){
            throw(err)
        }
    }

}