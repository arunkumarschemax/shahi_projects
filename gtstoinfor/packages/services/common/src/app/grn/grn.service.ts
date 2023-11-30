import { Injectable, Query } from '@nestjs/common';
import { CommonResponseModel, CustomerOrderStatusEnum, GrnReq, PoItemEnum, PurchaseOrderStatus } from '@project-management-system/shared-models';
import { GrnRepository } from './dto/grn-repository';
import { GrnAdapter } from './dto/grn-adapter';
import { GrnDto, PurchaseOrderReq } from './dto/grn-dto';
import { GrnEntity } from './entities/grn-entity';
import { GrnItemsEntity } from './entities/grn-items-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PurchaseOrderEntity } from '../purchase-order/entities/purchase-order-entity';
import { PurchaseOrderFbricEntity } from '../purchase-order/entities/purchase-order-fabric-entity';
import { PurchaseOrderTrimEntity } from '../purchase-order/entities/purchase-order-trim-entity';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { IndentRepository } from '../indent/dto/indent-repository';
import { FabricIndentRepository } from '../indent/dto/fabric-indent-repository';
import { TrimIndentRepository } from '../indent/dto/trim-indent-repository';
let moment = require('moment');

@Injectable()

export class GrnService{
    constructor(
        private grnRepo:GrnRepository,
        private grnAdapter:GrnAdapter,
        @InjectRepository(PurchaseOrderFbricEntity)
        private poFabricRepo:Repository<PurchaseOrderFbricEntity>,
        @InjectRepository(PurchaseOrderTrimEntity)
        private poTrimRepo:Repository<PurchaseOrderTrimEntity>,
        private readonly dataSource: DataSource,
        @InjectRepository(PurchaseOrderEntity)
        private readonly poRepo:Repository<PurchaseOrderEntity>,
        private readonly indentRepo:IndentRepository,
        private readonly indentFabricRepo:FabricIndentRepository,
        private readonly indentTrimRepo:TrimIndentRepository


      
    ){}

    async createGrne(req: any, isUpdate: boolean):Promise<CommonResponseModel>{
        try {
            const slNo = await this.grnRepo.count()
            // console.log(slNo);
            const indentnum ="IND" + "/" + "22-23" + "/"+"00"+Number(Number(slNo) + 1)
            req.requestNo = indentnum;
            //  console.log(req);
            //   const convertedindentEntity: Indent = this.indentAdapter.convertDtoToEntity(req, isUpdate);
            //     console.log(convertedindentEntity)
            //   const savedindentEntity: Indent = await this.indentRepo.save(convertedindentEntity);
            //   const savedindentDto: IndentDto = this.indentAdapter.convertEntityToDto(savedindentEntity);
            //   if (savedindentDto) {
            //       // generating resposnse
            //       const response = new CommonResponseModel(true, 1, isUpdate ? 'indent Updated Successfully' : 'indent Created Successfully', savedindentDto);
            //       return response;
            //   } else {
            //       throw new ErrorResponse(11106, 'indent saved but issue while transforming into DTO');
            //   }
          } catch (error) {
              return error;
          }
    }

    async getAllIndentData(): Promise<CommonResponseModel> {
        const data = await this.grnRepo.find({relations: ['iFabricInfo', 'iTrimsInfo']});
        return new CommonResponseModel(true, 1235, 'Data retrieved Successfully',data);
    }

    async getAllPoDataToUPdateStatus(purchaseOrderId:number,materialType:string):Promise<CommonResponseModel>{
        try{
            const manager = this.dataSource;
            let query='SELECT pt.grn_quantity AS ptGrnQuantity,pf.grn_quantity AS pfGrnQuantity,po_fabric_id AS poFabricId,po_trim_id AS poTrimId,po.purchase_order_id AS purchaseOrderId,po_number AS poNumber,po.status AS poStatus,fab_item_status AS fabItemStatus,trim_item_status AS trimItemStatus FROM purchase_order po LEFT JOIN purchase_order_fabric pf ON pf.purchase_order_id=po.purchase_order_id LEFT JOIN purchase_order_trim pt ON pt.purchase_order_id=po.purchase_order_id WHERE po.purchase_order_id='+purchaseOrderId+''
            if(materialType == 'Fabric'){
                query=query+' and fab_item_status in ("OPEN","PARTAILLY RECEIVED")'
            }
            if(materialType == 'Trim'){
                query=query+' and trim_item_status in ("OPEN","PARTAILLY RECEIVED")'
            }
            const result= await manager.query(query)
            if(result){
                return new CommonResponseModel(true,1,'',result)
            }
        }catch(err){
            throw err
        }
    }
    async getAllIndentDataUPdateStatus(materialType:string,id:number):Promise<CommonResponseModel>{
        try{
            const manager = this.dataSource;
            let query=' SELECT it.quantity AS trimQuantity,ifc.quantity AS fabQuantity,ifc.received_quantity,it.received_quantity,i.indent_id AS indentId,ifabric_id AS indenFabricId,itrims_id AS indentTrimId FROM indent i LEFT JOIN indent_fabric ifc ON i.indent_id=ifc.indent_id LEFT JOIN indent_trims it ON it.indent_id=i.indent_id WHERE i.indent_id>0 '
            if(materialType == 'Fabric'){
                query=query+' and i.indent_id ='+id+' and ifc.quantity != ifc.received_quantity'
            }
            if(materialType == 'Trim'){
                query=query+' and i.indent_id='+id+'  and it.quantity != it.received_quantity'
            }
            const result= await manager.query(query)
            if(result){
                return new CommonResponseModel(true,1,'',result)
            }
        }catch(err){
            throw err
        }
    }

    async getIndentid(materialType:string,id:number):Promise<CommonResponseModel>{
        try{
            const manager = this.dataSource;
            let query=' SELECT i.indent_id as indentId FROM indent i LEFT JOIN indent_fabric ifc ON i.indent_id=ifc.indent_id LEFT JOIN indent_trims it ON it.indent_id=i.indent_id WHERE i.indent_id>0 '
            if(materialType == 'Fabric'){
                query=query+' and ifabric_id ='+id+''
            }
            if(materialType == 'Trim'){
                query=query+' and itrims_id='+id+''
            }
            const result= await manager.query(query)
            if(result){
                return new CommonResponseModel(true,1,'',result)
            }
        }catch(err){
            throw err
        }
    }

    async createGrn(req:GrnDto):Promise<CommonResponseModel>{       
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try{
            console.log(req,'========')
            const currentYear = moment().format('YYYY')
            let ToYear = currentYear.toString().substr(-2)
            let FromYear = (currentYear - 1).toString().substr(-2)
            let grnNumber
            const data = 'select max(grn_id) as grnId from grn'
            const maxId = await this.grnRepo.query(data)
            if (maxId[0].grnId == null) {
                grnNumber = 'GRN/' + FromYear + '-' + ToYear + '/' + '001' + ''
            } else {
                grnNumber = 'GRN/' + FromYear + '-' + ToYear + '/' + maxId[0].grnId.toString().padStart(3, 0) + ''
            }

            let mrnNumber
            if (maxId[0].grnId == null) {
                mrnNumber = 'MRN/' + FromYear + '-' + ToYear + '/' + '001' + ''
            } else {
                mrnNumber = 'MRN/' + FromYear + '-' + ToYear + '/' + maxId[0].grnId.toString().padStart(3, 0) + ''
            }
        await transactionalEntityManager.startTransaction();
            const itemInfo=[]
            const grnEntity = new GrnEntity()
            grnEntity.grnNumber=grnNumber
            grnEntity.mrnNumber = mrnNumber
            grnEntity.vendorId=req.vendorId
            // grnEntity.styleId=req.styleId
            grnEntity.poId=req.poId
            grnEntity.grnDate=req.grnDate
            grnEntity.contactPerson = req.contactPerson
            grnEntity.createdUser=req.createdUser
            grnEntity.updatedUser=req.updatedUser
            grnEntity.itemType=req.materialtype
            grnEntity.invoiceNo = req.invoiceNo
            // console.log(req,'===========')
            for(const item of req.grnItemInfo){
                // console.log(item,'$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                // item.conversionQuantity=200
                // item.conversionUomId=1
                const itemEntity = new GrnItemsEntity()
                itemEntity.m3ItemCodeId=item.m3ItemCodeId
                // itemEntity.productGroupId=item.productGroupId
                itemEntity.receivedQuantity=item.receivedQuantity
                // itemEntity.receivedUomId=item.receivedUomId
                itemEntity.acceptedQuantity=item.acceptedQuantity
                // itemEntity.acceptedUomId=item.acceptedUomId
                itemEntity.rejectedQuantity=item.rejectedQuantity
                itemEntity.rejectedUomId=item.rejectedUomId
                itemEntity.conversionQuantity=item.conversionQuantity
                itemEntity.conversionUomId=item.conversionUomId
                itemEntity.remarks=item.remarks
                itemInfo.push(itemEntity)
            }
            grnEntity.grnItemInfo=itemInfo
            // let save
            const save = await this.grnRepo.save(grnEntity)  
            if(save){
                for(const item of req.grnItemInfo){ 
                  if(item.indentFabricId != null){
                   if(req.materialtype == 'Fabric'){
                    console.log('****************************')
                    const poQuantity = await this.poFabricRepo.find({where:{poFabricId:item.poFabricId}})
                    if(poQuantity[0].poQuantity == item.conversionQuantity){
                    await this.poFabricRepo.update({poFabricId:item.poFabricId},{grnQuantity:item.conversionQuantity,fabricItemStatus:PoItemEnum.RECEIVED})
                    }
                    else{
                        await this.poFabricRepo.update({poFabricId:item.poFabricId},{fabricItemStatus:PoItemEnum.PARTAILLY_RECEIVED,grnQuantity:item.conversionQuantity})
                    }
                 
                    await this.indentFabricRepo.update({ifabricId:item.indentFabricId},{recivedQuantity:item.conversionQuantity})
                    const indentId = await this.getIndentid(req.materialtype,item.indentFabricId) 
                    const indentData = await this.getAllIndentDataUPdateStatus(req.materialtype,indentId.data[0].indentId)
                    if(indentData.data.length == 0){
                        await this.indentRepo.update({indentId:indentId.data[0].indentId},{status:CustomerOrderStatusEnum.CLOSED})
                       }  else{
                        await this.indentRepo.update({indentId:indentId.data[0].indentId},{status:CustomerOrderStatusEnum.IN_PROGRESS})
                       }

                   }
                }
                if(item.indentFabricId == null){
                    await  this.poFabricRepo.update({poFabricId:item.poFabricId},{grnQuantity:item.conversionQuantity})
                }
                if(item.indentTrinId != null){
                    if(req.materialtype == 'Trim'){
                        const poQuantity = await this.poTrimRepo.find({where:{poTrimId:item.poTrimId}})
                        if(poQuantity[0].poQuantity == item.conversionQuantity){
                            await this.poTrimRepo.update({poTrimId:item.poTrimId},{grnQuantity:item.conversionQuantity,trimItemStatus:PoItemEnum.RECEIVED})
                        }else{
                            await this.poTrimRepo.update({poTrimId:item.poTrimId},{grnQuantity:item.conversionQuantity,trimItemStatus:PoItemEnum.PARTAILLY_RECEIVED})
                        }
                        await this.indentTrimRepo.update({itrimsId:item.indentTrinId},{recivedQuantity:item.conversionQuantity})
                        const indentId = await this.getIndentid(req.materialtype,item.indentTrinId) 
                        const indentData = await this.getAllIndentDataUPdateStatus(req.materialtype,indentId.data[0].indentId)
                        if(indentData.data.length == 0){
                            await this.indentRepo.update({indentId:indentId.data[0].indentId},{status:CustomerOrderStatusEnum.CLOSED})
                           }  else{
                            await this.indentRepo.update({indentId:indentId.data[0].indentId},{status:CustomerOrderStatusEnum.IN_PROGRESS})
                           }
                       }
                }
                if(item.indentTrinId == null){
                    await this.poTrimRepo.update({poTrimId:item.poTrimId},{grnQuantity:item.conversionQuantity})
                }
                     
                 }
                    const poData = await this.getAllPoDataToUPdateStatus(req.poId,req.materialtype)
                    if(poData.data.length == 0){
                        await this.poRepo.update({purchaseOrderId:req.poId},{status:PurchaseOrderStatus.CLOSED})
                    }else{
                        await this.poRepo.update({purchaseOrderId:req.poId},{status:PurchaseOrderStatus.IN_PROGRESS})
                    }
                    
                await transactionalEntityManager.completeTransaction();
                return new CommonResponseModel(true,1,'Grn Created Sucessfully',save)

            }else{
                await transactionalEntityManager.releaseTransaction();
                return new CommonResponseModel(false,0,'Something went wrong',[])
            }
            
        }
        catch(err){
            throw err
        }
    }
    async getAllGrn(req?:GrnReq):Promise<CommonResponseModel>{
        try{
            const manager = this.dataSource;
            let query=`SELECT g.grn_id AS grnId,g.grn_number AS grnNo,DATE(g.grn_date) AS grnDate,g.status,g.item_type AS itemType,g.grn_type AS grnType,g.invoice_no AS invoiceNo,
            g.vendor_id AS vendorId, CONCAT(v.vendor_name,'-',v.vendor_code) AS vendor,g.po_id AS poId,po.po_number AS poNumber
            FROM grn g
            LEFT JOIN purchase_order po ON po.purchase_order_id = g.po_id
            LEFT JOIN vendors v ON v.vendor_id = g.vendor_id
            where 1=1`
            if(req?.grnId){
                query=query+` AND g.grn_id=${req.grnId}`
            }
            if(req?.grnNo){
                query=query+` AND g.grn_number='${req.grnNo}'`
            }
            if(req?.poNumber){
                query=query+` AND po.po_number='${req.poNumber}'`
            }
            if(req?.status){
                query=query+` AND g.status='${req.status}'`
            }
            if (req.fromDate) {
                query = query +` AND Date(g.grn_date) BETWEEN '${req.fromDate}' AND '${req.toDate}'`
            }
            const result= await manager.query(query)
            if(result){
                return new CommonResponseModel(true,1,'',result)
            }
        }catch(err){
            throw err
        }
    }
    // async getGrnItemById(req:GrnReq):Promise<CommonResponseModel>{
    //     try{
    //         const manager = this.dataSource;
    //         let query=`SELECT grn_item_id , grn_items.item_id ,rm.item_code AS fabricCode,t.trim_code, grn_items.m3_item_id , grn_items.product_group_id , grn_items.received_quantity , grn_items.received_uom_id , grn_items.accepted_quantity , grn_items.accepted_uom_id , 
    //         grn_items.rejected_quantity , grn_items.rejected_uom_id ,grn_items.conversion_quantity,  grn_items.conversion_uom_id , grn_items.location_mapped_status , grn_items.grn_id , grn_items.m3_item_code_id,u.uom FROM grn_items
    //         LEFT JOIN m3_items rm ON rm.m3_items_Id = grn_items.m3_item_code_id
    //         LEFT JOIN m3_trims t ON t.m3_trim_Id = grn_items.m3_item_code_id
    //         LEFT JOIN uom u ON u.id = grn_items.received_uom_id
    //         WHERE grn_items.grn_id = '${req.grnId}'`
    //         // if(materialType == 'Fabric'){
    //         //     query=query+' and ifabric_id ='+id+''
    //         // }
    //         // if(materialType == 'Trim'){
    //         //     query=query+' and itrims_id='+id+''
    //         // }
    //         const result= await manager.query(query)
    //         if(result){
    //             return new CommonResponseModel(true,1,'',result)
    //         }
    //     }catch(err){
    //         throw err
    //     }
    // }

    async getGRNItemsData(req?:GrnReq):Promise<CommonResponseModel>{
        try{
            console.log(req,'--------------')
            let query = `SELECT g.grn_number AS grnNumber,gi.received_quantity AS receivedQty,gi.accepted_quantity AS acceptedQty,gi.rejected_quantity  AS rejectedQty,u.uom,
            gi.conversion_quantity  AS conversionQty,uom.uom AS convertedUom,gi.location_mapped_status AS locMapStatus,gi.remarks,`
            if(req.itemType === 'FABRIC'){
                query = query + `gi.m3_item_code_id AS m3ItemCodeId,m3.item_code AS itemCode
                FROM grn_items gi
                LEFT JOIN m3_items m3 ON m3.m3_items_id = gi.m3_item_code_id`
            }
            if(req.itemType === 'TRIM'){
                query = query + `m3.trim_code AS itemCode,m3.m3_trim_Id AS m3ItemId
                FROM grn_items gi
                LEFT JOIN m3_trims m3 ON m3.m3_trim_Id = gi.m3_item_code_id`
            }
            query = query +` LEFT JOIN grn g ON g.grn_id = gi.grn_id
            LEFT JOIN purchase_order po ON po.purchase_order_id = g.po_id
            LEFT JOIN vendors v ON v.vendor_id = g.vendor_id
            LEFT JOIN uom u ON u.id = gi.uom_id
            LEFT JOIN uom uom ON uom.id = gi.conversion_uom_id`
            if(req?.grnId){
                query=query+` where g.grn_id=${req.grnId}`
            }
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "GRN's retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        }catch(err){
            throw(err)
        }
    }

    async getGRNNoData():Promise<CommonResponseModel>{
        try{
            let query = `SELECT grn_number as grnNo FROM grn ORDER BY grn_number`
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "GRN's retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        }catch(err){
            throw(err)
        }
    }
    async getPONoData():Promise<CommonResponseModel>{
        try{
            let query = `
            SELECT po.po_number as poNumber, g.po_id as poId 
            FROM grn g
            LEFT JOIN purchase_order po ON po.purchase_order_id = g.po_id
            GROUP BY po.po_number
            ORDER BY po_number`
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "PO Number retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        }catch(err){
            throw(err)
        }
    }
}