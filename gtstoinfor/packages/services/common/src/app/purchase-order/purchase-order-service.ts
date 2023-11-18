import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { PurchaseOrderEntity } from "./entities/purchase-order-entity";
import { CommonResponseModel, PurchaseViewDto, VendorIdReq } from "@project-management-system/shared-models";
import { PurchaseOrderDto } from "./dto/purchase-order-dto";
import { PurchaseOrderFbricEntity } from "./entities/purchase-order-fabric-entity";
import { PurchaseOrderTrimEntity } from "./entities/purchase-order-trim-entity";
import { FORMERR } from "dns";
import { purchaseOrdeIdreq } from "./dto/purchase-order-id-req";
import { FabriCWeaveDto } from "../fabric weave/dto/fabric-weave.dto";
import { PurchaseOrderRepository } from "./repo/purchase-order-repository";
import { PurchaseOrderFabricRepository } from "./repo/purchase-order-fabric-repository";
import { PurchaseOrderTrimRepository } from "./repo/purchase-order-trim-repository";
let moment = require('moment');

@Injectable()
export class PurchaseOrderService{
    constructor(
        // @InjectRepository(PurchaseOrderEntity)
        private poRepo:PurchaseOrderRepository,
        private poFabricRepo: PurchaseOrderFabricRepository,
        private poTrimRepo : PurchaseOrderTrimRepository,
        @InjectDataSource()
        private dataSource: DataSource,
        ){  }



async cretePurchaseOrder(req:PurchaseOrderDto):Promise<CommonResponseModel>{
    try{
        console.log(req.poFabricInfo)
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        const currentYear =moment().format('YYYY')
        let ToYear=currentYear.toString().substr(-2)
        let FromYear=(currentYear-1).toString().substr(-2)
        let poNumber
        const data = 'select max(purchase_order_id) as poId from purchase_order'
        const maxId=await this.poRepo.query(data)
        if(maxId[0].poId == null){
            poNumber='PO/'+FromYear+'-'+ToYear+'/'+'001'+''
        }else{
            poNumber='PO/'+FromYear+'-'+ToYear+'/'+maxId[0].poId.toString().padStart(3,0)+''
        }
        // const finalArray :PurchaseOrderEntity[]=[]
        // for(const indent of req.indentId){
            let pofabricInfo=[]
            let poTrimInfo =[]
            const poEntity = new PurchaseOrderEntity()
        poEntity.poNumber=poNumber
        poEntity.vendorId=req.vendorId
        poEntity.styleId=req.styleId
        poEntity.expectedDeliveryDate=req.expectedDeliveryDate
        poEntity.purchaseOrderDate=req.purchaseOrderDate
        poEntity.createdUser=req.createdUser
        poEntity.createdUser=req.createdUser
        poEntity.poMaterialType=req.poMaterialType
        if(req.poFabricInfo){
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
                pofabricEntity.indentFabricId=poFabric.indentFabricId
                pofabricEntity.poQuantity=poFabric.poQuantity
                pofabricEntity.quantityUomId=poFabric.quantityUomId
                pofabricInfo.push(pofabricEntity)
            }
            poEntity.poFabricInfo=pofabricInfo
        }
        if(req.poTrimInfo){
         for(const trimInfo of req.poTrimInfo){
             const trimEntity= new PurchaseOrderTrimEntity()
             trimEntity.colourId=trimInfo.colourId
             trimEntity.productGroupId=trimInfo.productGroupId
             trimEntity.trimId=trimInfo.trimId
             trimEntity.m3TrimCode=trimInfo.m3TrimCode
             trimEntity.description=trimInfo.description
             trimEntity.consumption=trimInfo.consumption
             trimEntity.remarks=trimInfo.remarks
             trimEntity.indentTrimId=trimInfo.indentTrimId
             trimEntity.poQuantity=trimInfo.poQuantity
             trimEntity.quantityUomId=trimInfo.quantityUomId
             poTrimInfo.push(trimEntity)
         }
         poEntity.poTrimInfo=poTrimInfo
        }
           
            // finalArray.push(poEntity)
        // }

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

    async getAllPONumbers(req: VendorIdReq): Promise<CommonResponseModel>{
        try{
            let query =`SELECT purchase_order_id as purchaseOrderId,po_number AS poNumber,vendor_id as vendorId,po_material_type as materialType FROM purchase_order WHERE status NOT IN ('cancelled', 'closed')`
            if (req.vendorId) {
                query = query + ` AND vendor_id = '${req.vendorId}'`;
            }
            const data = await this.dataSource.query(query)
            if(data.length > 0){
                return new CommonResponseModel(true,0, "PO Numbers retrieved successfully", data)
            }else{
                return new CommonResponseModel(false,1,"No data found",[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getPODataById(req: VendorIdReq): Promise<CommonResponseModel>{
        try{
            console.log(req,'f3-=-=-=-=-=-=-=-=-=3333333333333333')
            let responseData 
            if(req.materialType === 'Fabric' ){
                const fabricData = await this.poFabricRepo.getPOFabricData(req)
                responseData = fabricData
            }
            if(req.materialType === 'Trim'){
                const trimData = await this.poTrimRepo.getPOTrimData(req)
                responseData = trimData
            }
            if(responseData.length > 0){
                return new CommonResponseModel(true,0, "PO Numbers retrieved successfully",responseData)
            }else{
                return new CommonResponseModel(false,1,"No data found",[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getMaterialTpye():Promise<CommonResponseModel>{
        try{
            let query =`SELECT purchase_order_id AS purchaseOrderId,po_material_type AS materialType FROM purchase_order `
            const data = await this.dataSource.query(query)

            if(data.length > 0){
                return new CommonResponseModel(true,0, "PO Numbers retrieved successfully", data)
            }else{
                return new CommonResponseModel(false,1,"No data found",[])
            }  
        }catch(err){
            throw(err)
        }
       
    }

    async getAllPoData (req?:PurchaseViewDto):Promise<CommonResponseModel>{
        
        try{
            let query =`SELECT po.purchase_order_id AS id, po.po_number AS poNumber, po.vendor_id AS vendorId, v.vendor_code AS vendorCode,
            v.vendor_name AS vendorName,po.expected_delivery_date AS deliveryDate, po.purchase_order_date AS orderDate,po.status,po.po_material_type AS materialType
            FROM purchase_order po
            LEFT JOIN vendors v ON v.vendor_id = po.vendor_id`
            if(req?.id){
                query += ` where po.purchase_order_id = ${req?.id}`
            }
            if (req.confirmStartDate) {
            query +=   ` WHERE ${req.confirmStartDate ? `Date(expected_delivery_date) BETWEEN '${req.confirmStartDate}' AND '${req.confirmEndDate}'` : '1=1'}`
            }
            if (req.poconfirmStartDate) {
                query +=   ` WHERE ${req.poconfirmStartDate ? `Date(purchase_order_date) BETWEEN '${req.poconfirmStartDate}' AND '${req.poconfirmEndDate}'` : '1=1'}`
                }
          
            
            const data = await this.dataSource.query(query)
            console.log(data,'1245789633')
            if(data.length > 0){
                return new CommonResponseModel(true,0, "PO Numbers retrieved successfully", data)
            }else{
                return new CommonResponseModel(false,1,"No data found",[])
            }  
        }catch(err){
            throw(err)
        }
    }

    async GetPurchaseData (req?:PurchaseViewDto):Promise<CommonResponseModel>{
        try{
            let query =`SELECT  null as pofabricData,null as poTrimdata, s.style AS styleName,po.purchase_order_id AS purchaseOrderId,po.po_number AS poNumber,po.vendor_id AS vendorId,po.style_id AS styleId,
            expected_delivery_date AS expectedDeliverydate,purchase_order_date AS purchaseOrderDate,po.status AS poStatus,po_material_type AS poMaterialtype FROM purchase_order  po LEFT JOIN style s ON s.style_id=po.style_id `
            if(req?.id){
                query += ` where po.purchase_order_id = ${req?.id}`
            }
            const data = await this.dataSource.query(query)
            if(data.length > 0){
                return new CommonResponseModel(true,0, "PO Numbers retrieved successfully", data)
            }else{
                return new CommonResponseModel(false,1,"No data found",[])
            }  
        }catch(err){
            throw(err)
        }
    }

    async GetPurchaseFabricData (purchaseOrderId:number):Promise<CommonResponseModel>{
        try{
            console.log(purchaseOrderId)
            let query =`SELECT po_fabric_id AS pofabricId,colour_id AS colourId,product_group_id AS productGroupId,fabric_type_id AS fabricTypeId,
            m3_fabric_code AS m3fabricCode,shahi_fabric_code AS shahiFabricCode,content,weave_id AS weaveId,width,yarn_count AS yarnCount,finish,shrinkage,
            pch,moq,purchase_order_id AS purchaseOrderId,indent_fabric_id AS indentFabricId,po_quantity AS poQuantity,quantity_uom_id AS quantityUomId,
            fab_item_status AS fabItemStatus,grn_quantity
            FROM purchase_order_fabric pf where pf.purchase_order_id=`+purchaseOrderId+``
            const data = await this.dataSource.query(query)
            if(data.length > 0){
                return new CommonResponseModel(true,0, "PO Numbers retrieved successfully", data)
            }else{
                return new CommonResponseModel(false,1,"No data found",[])
            }  
        }catch(err){
            throw(err)
        }
    }
    async GetPurchaseTrimData (purchaseOrderId:number):Promise<CommonResponseModel>{
        try{
            let query =`SELECT po_trim_id AS poTrimid,product_group_id AS productGrouoId,trim_id AS trimId,m3_trim_code AS m3trimCode, purchase_order_id,colour_id AS clourId,
            indent_trim_id AS indentTrimId,po_quantity AS poQuantity,trim_item_status AS trimItemStaus,grn_quantity AS grnQuantity FROM purchase_order_trim pt where pt.purchase_order_id=`+purchaseOrderId+``
            const data = await this.dataSource.query(query)
            if(data.length > 0){
                return new CommonResponseModel(true,0, "PO Numbers retrieved successfully", data)
            }else{
                return new CommonResponseModel(false,1,"No data found",[])
            }  
        }catch(err){
            throw(err)
        }
    }
    async getAllPurchaseOrderData(req?:PurchaseViewDto):Promise<CommonResponseModel>{
        try{
            const data =[]
            const podata= await this.GetPurchaseData(req)
            for(const po of podata.data){
                console.log(po.purchaseOrderId)
                console.log('^^^^^^^^^^^^^^^^^^^')
                const fabData= await this.GetPurchaseFabricData(po.purchaseOrderId)
                 const fabricInfo=[]
                for(const fabrData of fabData.data){
                    console.log(fabrData)
                    console.log('**************************8')
                    fabricInfo.push(fabrData)
                }
               const trimData = await this.GetPurchaseTrimData(po.purchaseOrderId)
                const triminfo =[]
                for(const trim of trimData.data){
                    triminfo.push(trim)
                }
                data.push({
                    styleName:po.styleName,
                    purchaseOrderId:po.purchaseOrderId,
                    poNumber:po.poNumber,
                    vendorId:po.vendorId,
                    expectedDeliverydate:po.expectedDeliverydate,
                    purchaseOrderDate:po.purchaseOrderDate,
                    poMaterialtype:po.poMaterialtype,
                    poStatus:po.poStatus,
                    fabInfo:fabricInfo,
                    triminfo:triminfo   

                })
            }
            if(data){
                return new CommonResponseModel(true,1,'data retrived sucessfully',data)
            }else{
                return new CommonResponseModel(false,0,'no data found',[])

            }

        }
        catch(err){
            throw err
        }
    }

}