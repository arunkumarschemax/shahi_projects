import { Injectable, Query } from '@nestjs/common';
import { CommonResponseModel, CustomerOrderStatusEnum, GRNTypeEnum, GrnReq, PoItemEnum, PurchaseOrderStatus } from '@project-management-system/shared-models';
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
import { PurchaseOrderItemsEntity } from '../purchase-order/entities/purchase-order-items-entity';

let moment = require('moment');

@Injectable()

export class GrnService {
    constructor(
        private grnRepo: GrnRepository,
        private grnAdapter: GrnAdapter,
        @InjectRepository(PurchaseOrderFbricEntity)
        private poFabricRepo: Repository<PurchaseOrderFbricEntity>,
        @InjectRepository(PurchaseOrderTrimEntity)
        private poTrimRepo: Repository<PurchaseOrderTrimEntity>,
        private readonly dataSource: DataSource,
        @InjectRepository(PurchaseOrderEntity)
        private readonly poRepo: Repository<PurchaseOrderEntity>,
        private readonly indentRepo: IndentRepository,
        private readonly indentFabricRepo: FabricIndentRepository,
        private readonly indentTrimRepo: TrimIndentRepository,
        @InjectRepository(PurchaseOrderItemsEntity)
        private poItemRepo: Repository<PurchaseOrderItemsEntity>,



    ) { }

    async createGrne(req: any, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
            const slNo = await this.grnRepo.count()
            // console.log(slNo);
            const indentnum = "IND" + "/" + "23-24" + "/" + "00" + Number(Number(slNo) + 1)
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
        const data = await this.grnRepo.find({ relations: ['iFabricInfo', 'iTrimsInfo'] });
        return new CommonResponseModel(true, 1235, 'Data retrieved Successfully', data);
    }

    async getAllPoDataToUPdateStatus(purchaseOrderId: number, materialType: string): Promise<CommonResponseModel> {
        try {
            const manager = this.dataSource;
            let query = 'SELECT pt.grn_quantity AS ptGrnQuantity,purchase_order_item_id AS poFabricId,po.purchase_order_id AS purchaseOrderId,po_number AS poNumber,po.status AS poStatus,po_item_status AS fabItemStatus FROM purchase_order po LEFT JOIN purchae_order_items pt ON pt.purchase_order_id=po.purchase_order_id WHERE po.purchase_order_id=' + purchaseOrderId + ''
            console.log(materialType,'materialTypematerialTypematerialType')
            if (materialType == 'Fabric') {
                query = query + ' and po_item_status in ("OPEN","PARTAILLY RECEIVED")'
            }
            else {
                query = query + ' and po_item_status in ("OPEN","PARTAILLY RECEIVED")'
            }
            const result = await manager.query(query)
            if (result) {
                return new CommonResponseModel(true, 1, '', result)
            }
        } catch (err) {
            throw err
        }
    }
    async getAllIndentDataUPdateStatus(materialType: string, id: number): Promise<CommonResponseModel> {
        try {
            const manager = this.dataSource;
            let query = ' SELECT it.quantity AS trimQuantity,ifc.quantity AS fabQuantity,ifc.received_quantity,it.received_quantity,i.indent_id AS indentId,ifabric_id AS indenFabricId,itrims_id AS indentTrimId FROM indent i LEFT JOIN indent_fabric ifc ON i.indent_id=ifc.indent_id LEFT JOIN indent_trims it ON it.indent_id=i.indent_id WHERE i.indent_id>0 '
            if (materialType == 'Fabric') {
                query = query + ' and i.indent_id =' + id + ' and ifc.quantity != ifc.received_quantity'
            }
            else {
                query = query + ' and i.indent_id=' + id + '  and it.quantity != it.received_quantity'
            }
            const result = await manager.query(query)
            if (result) {
                return new CommonResponseModel(true, 1, '', result)
            }
        } catch (err) {
            throw err
        }
    }

    async getIndentid(materialType: string, id: number): Promise<CommonResponseModel> {
        try {
            const manager = this.dataSource;
            let query = ' SELECT i.indent_id as indentId FROM indent i LEFT JOIN indent_fabric ifc ON i.indent_id=ifc.indent_id LEFT JOIN indent_trims it ON it.indent_id=i.indent_id WHERE i.indent_id>0 '
            if (materialType == 'Fabric') {
                query = query + ' and ifabric_id =' + id + ''
            }
            else {
                query = query + ' and itrims_id=' + id + ''
            }
            const result = await manager.query(query)
            if (result) {
                return new CommonResponseModel(true, 1, '', result)
            }
        } catch (err) {
            throw err
        }
    }

    async createGrn(req: GrnDto): Promise<CommonResponseModel> {
        
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try {

            const today = new Date();
            const CurrentYear = today.getFullYear();
            const CurrentMonth = today.getMonth();
            let fromDate = 0;
            let toDate = 0;
            let itemType;
            if(req.itemType === "FABRIC"){
                itemType = 'F';
            }
            else{
                itemType = 'T';
            }
            const data = 'select max(ref_no) as grnId from grn where item_type = "'+req.itemType+'"';
                let totalGrn = await this.grnRepo.query(data)
            // if (!isUpdate) {
                if (CurrentMonth < 4) {
                    fromDate = (CurrentYear-1);
                    toDate = (CurrentYear);
                } else {
                    fromDate = (CurrentYear);
                    toDate = (CurrentYear + 1);
                }

            // }
            
            let val = totalGrn[0].grnId + 1;


            let refNo = val + "";
            while (refNo.length < 4) refNo = "0" + refNo;

            let grnNumber = "GRN/" + (fromDate.toString().substr(-2)) + "-" + (toDate.toString().substr(-2)) + "/" + itemType + "/" + refNo;

            console.log(grnNumber);


            // let materialType
            // if(req.materialtype == 'Fabric'){
            //     materialType='F'
            // }else{
            //     materialType='T'
            // }

            // const currentYear = moment().format('YYYY')
            // let ToYear = currentYear.toString().substr(-2)
            // let FromYear = (currentYear - 1).toString().substr(-2)
            // let grnNumber
            // const data = 'select max(grn_id) as grnId from grn'
            // const maxId = await this.grnRepo.query(data)
            // if (maxId[0].grnId == null) {
            //     grnNumber = 'GRN/'+ FromYear + '-' + ToYear + '/' + '001' + ''
            // } else {
            //     grnNumber = 'GRN/'+ FromYear + '-' + ToYear + '/' + maxId[0].grnId.toString().padStart(3, 0) + ''
            // }

            let grnItemNumber
            const data1 = 'select max(grn_item_id) as grnItemId from grn_items'
            const maxItemId = await this.grnRepo.query(data1)
            if (maxItemId[0].grnItemId == null) {
                grnItemNumber = 'GRNI'+ req.materialtype + '/' + (fromDate.toString().substr(-2)) + '-' + (toDate.toString().substr(-2)) + '/' + '001' + ''
            } else {
                grnItemNumber = 'GRNI'+ req.materialtype + '/' + (fromDate.toString().substr(-2)) + '-' + (toDate.toString().substr(-2)) + '/' + maxItemId[0].grnItemId.toString().padStart(3, 0) + ''
            }

            let mrnNumber
            if (totalGrn[0].grnId == null) {
                mrnNumber = 'MRN/' + (fromDate.toString().substr(-2)) + '-' + (toDate.toString().substr(-2)) + '/' + '001' + ''
            } else {
                mrnNumber = 'MRN/' + (fromDate.toString().substr(-2)) + '-' + (toDate.toString().substr(-2)) + '/' + totalGrn[0].grnId.toString().padStart(3, 0) + ''
            }
            // await transactionalEntityManager.startTransaction();
            const itemInfo = []
            const grnEntity = new GrnEntity()
            grnEntity.grnNumber = grnNumber
            grnEntity.vendorId = req.vendorId
            // grnEntity.styleId=req.styleId
            grnEntity.poId = req.poId
            grnEntity.grnDate = req.grnDate
            grnEntity.invoiceNoDate = req.invoiceDate
            grnEntity.createdUser = req.createdUser
            grnEntity.updatedUser = req.updatedUser
            grnEntity.itemType = req.itemType
            grnEntity.invoiceNo = req.invoiceNo
            grnEntity.grnAmount = req.grnAmount
            grnEntity.grnQuantity = req.grnQuantity
            grnEntity.refNo = Number(refNo);
            grnEntity.grnType  = Object.keys(GRNTypeEnum).find(key => GRNTypeEnum[key] === req.grnType) as any;
            // console.log(req,'===========')
            for (const item of req.grnItemInfo) {
                const itemEntity = new GrnItemsEntity()
                itemEntity.m3ItemCodeId = item.m3ItemCodeId
                itemEntity.receivedQuantity = item.receivedQuantity
                itemEntity.acceptedQuantity = item.acceptedQuantity
                itemEntity.rejectedQuantity = item.rejectedQuantity
                itemEntity.conversionQuantity = item.conversionQuantity
                itemEntity.conversionUomId = item.uomId
                itemEntity.remarks = item.remarks
                itemEntity.m3ItemCodeId = item.m3ItemCodeId
                itemEntity.sampleItemId = item.sampleItemId
                itemEntity.indentItemId = item.indentItemId
                itemEntity.remarks = item.remarks
                itemEntity.poItemId = item.poItemId
                itemEntity.grnItemAmount = item.grnItemAmount
                itemEntity.sampleRequestId = item.sampleRequestId
                itemEntity.indentId = item.indentId
                itemEntity.buyerId = item.buyerId
                itemEntity.uomId = item.uomId
                itemEntity.styleId = item.styleId
                itemEntity.grnItemNo = grnItemNumber
                itemEntity.poId = req.poId
                itemEntity.itemType = item.itemType
                itemInfo.push(itemEntity)
            }
            grnEntity.grnItemInfo = itemInfo
            // let save
            const save = await this.grnRepo.save(grnEntity)
            if (save) {
                let totGrnQty = 0
                for (const item of req.grnItemInfo) {
                    totGrnQty = Number(totGrnQty+item.receivedQuantity)
                    if (item.m3ItemCode != null) {
                        const poQuantity = await this.poItemRepo.find({ where: { purchaseOrderItemId: item.poItemId } })
                        // console.log(poQuantity,'poQuantity')
                        // console.log(item.receivedQuantity,'item.receivedQuantity')
                        if (Number(poQuantity[0].poQuantity) == (Number(poQuantity[0].grnQuantity)+Number(item.receivedQuantity))) {
                            await this.poItemRepo.update({ purchaseOrderItemId: item.poItemId }, {grnQuantity: () => `grn_quantity + ${item.receivedQuantity}`, poitemStatus: PoItemEnum.RECEIVED })
                        }
                        else {
                            await this.poItemRepo.update({ purchaseOrderItemId: item.poItemId }, { poitemStatus: PoItemEnum.PARTAILLY_RECEIVED, grnQuantity: () => `grn_quantity + ${item.receivedQuantity}` })
                        }
                        console.log(req.materialtype,'req.materialtype')
                        if(req.grnType != GRNTypeEnum.SAMPLE_ORDER){
                            const indentId = await this.getIndentid(req.materialtype, item.indentItemId)
                            const indentData = await this.getAllIndentDataUPdateStatus(req.materialtype, indentId.data[0].indentId)
                            if (indentData.data.length == 0) {
                                await this.indentRepo.update({ indentId: indentId.data[0].indentId }, { status: CustomerOrderStatusEnum.CLOSED })
                            } else {
                                await this.indentRepo.update({ indentId: indentId.data[0].indentId }, { status: CustomerOrderStatusEnum.IN_PROGRESS })
                            }
                        }
                    }
                }
                const poData = await this.getAllPoDataToUPdateStatus(req.poId, req.materialtype)
                if (poData.data.length == 0) {
                    await this.poRepo.update({ purchaseOrderId: req.poId }, { status: PurchaseOrderStatus.CLOSED,grnQuantity: () => `grn_quantity + ${totGrnQty}` })
                } else {
                    await this.poRepo.update({ purchaseOrderId: req.poId }, { status: PurchaseOrderStatus.IN_PROGRESS,grnQuantity: () => `grn_quantity + ${totGrnQty}` })
                }

                // await transactionalEntityManager.completeTransaction();
                return new CommonResponseModel(true, 1, 'Grn Created Sucessfully', save)
            } else {
                // await transactionalEntityManager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong', [])
            }

        }
        catch (err) {
            // await transactionalEntityManager.releaseTransaction();
            throw err
        }
    }
    async getAllGrn(req?: GrnReq): Promise<CommonResponseModel> {
        try {
            const manager = this.dataSource;
            let query = `SELECT g.grn_id AS grnId,g.grn_number AS grnNo,DATE(g.grn_date) AS grnDate,DATE(g.invoice_date) AS invoiceDate,g.status,g.item_type AS itemType,g.grn_type AS grnType,g.invoice_no AS invoiceNo,
            g.vendor_id AS vendorId, CONCAT(v.vendor_name,'-',v.vendor_code) AS vendor,g.po_id AS poId,po.po_number AS poNumber,gi.buyer_id AS buyerId,g.location_mapped_status as locationMapStatus
            FROM grn g
            LEFT JOIN purchase_order po ON po.purchase_order_id = g.po_id
            LEFT JOIN vendors v ON v.vendor_id = g.vendor_id
            left join grn_items gi on gi.grn_id = g.grn_id
            left join buyers b on b.buyer_id = gi.buyer_id
            where 1=1`
            if (req?.grnId) {
                query = query + ` AND g.grn_id=${req.grnId}`
            }
            if (req?.grnNo) {
                query = query + ` AND g.grn_number='${req.grnNo}'`
            }
            if (req?.poNumber) {
                query = query + ` AND po.po_number='${req.poNumber}'`
            }
            if (req?.status) {
                query = query + ` AND g.status='${req.status}'`
            }
            if (req.fromDate) {
                query = query + ` AND Date(g.grn_date) BETWEEN '${req.fromDate}' AND '${req.toDate}'`
            }
            if(req.extRefNumber != undefined){
                query = query +" and b.external_ref_number = " + `"${req.extRefNumber}"`
            }
            if(req.tab){
                query += ` AND g.item_type LIKE '%${req.tab}%'`
            }
            query = query + ' GROUP BY g.grn_id'
            const result = await manager.query(query)
            if (result) {
                return new CommonResponseModel(true, 1, '', result)
            }
        } catch (err) {
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

    async getGRNItemsData(req?: GrnReq): Promise<CommonResponseModel> {
        try {
            // console.log(req,'--------------')
            let query = `SELECT g.grn_number AS grnNumber,gi.received_quantity AS receivedQty,gi.accepted_quantity AS acceptedQty,gi.rejected_quantity  AS rejectedQty,u.uom,
            gi.conversion_quantity  AS conversionQty,uom.uom AS convertedUom,gi.location_mapped_status AS locMapStatus,gi.remarks,gi.m3_item_code_id AS m3ItemCodeId,CONCAT(m3.item_code,'-',m3.description) AS itemCode,gi.buyer_id AS buyerId, CONCAT(b.buyer_code,'-',b.buyer_name) AS buyerName
            FROM grn_items gi LEFT JOIN grn g ON g.grn_id = gi.grn_id
            LEFT JOIN purchase_order po ON po.purchase_order_id = g.po_id
            LEFT JOIN vendors v ON v.vendor_id = g.vendor_id
            LEFT JOIN uom u ON u.id = gi.uom_id
            LEFT JOIN uom uom ON uom.id = gi.conversion_uom_id
            LEFT JOIN buyers b ON b.buyer_id = gi.buyer_id `
            if (req.itemType === 'Fabric') {
                query = query + ` LEFT JOIN m3_items m3 ON m3.m3_items_id = gi.m3_item_code_id`
            }
            if (req.itemType !== 'Fabric') {
                query = query + ` LEFT JOIN m3_trims m3 ON m3.m3_trim_id = gi.m3_item_code_id`
            }
            if (req?.grnId) {
                query = query + ` where g.grn_id=${req.grnId}`
            }
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "GRN's retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }
    }

    async getGRNNoData(): Promise<CommonResponseModel> {
        try {
            let query = `SELECT grn_number as grnNo FROM grn GROUP BY grn_number ORDER BY grn_number `
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "GRN's retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }
    }
    async getPONoData(): Promise<CommonResponseModel> {
        try {
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
        } catch (err) {
            throw (err)
        }
    }

    async getGrnReportData():Promise<CommonResponseModel>{
        try{
            const query='SELECT mt.description AS m3TrimDesc,mt.trim_code AS m3TrimCode,mi.item_code AS m3ItemCode,mi.description AS m3ItemDescription,u.uom,s.style,g.invoice_no AS grnInvoiceNo,g.grn_number AS grnNumber,b.buyer_name AS buyerName,i.request_no AS indentNo,sr.request_no AS sampleReqNo,sr.life_cycle_status AS sampleLifeCycleStatus,poi.subjective_amount AS totalPoAmount,poi.tax AS tax,poi.discount AS poDiscount,poi.unit_price AS unitPrice,po.grn_quantity AS grnQuantity,poi.po_quantity AS poQuantity,poi.po_item_status AS poItemStatus,po_against AS poAgainst,po.po_number AS poNumber,po.status AS poStatus,gi.received_quantity AS receivedQuantity,gi.accepted_quantity AS acceptedQuantity,gi.rejected_quantity AS rejectedQuantity,gi.location_mapped_status AS locationMappedStatus,grn_item_amount AS grnItemAmount,grn_item_no AS grnItemNo,gi.item_type AS itemType FROM grn_items gi LEFT JOIN grn g ON g.grn_id=gi.grn_id LEFT JOIN purchase_order po ON po.purchase_order_id=gi.po_id LEFT JOIN purchae_order_items poi ON poi.purchase_order_item_id=gi.po_item_id  LEFT JOIN sample_request sr ON sr.sample_request_id=gi.sample_req_id LEFT JOIN indent i ON i.indent_id=gi.indent_id LEFT JOIN buyers b ON b.buyer_id=i.buyer_id LEFT JOIN style s ON s.style_id=gi.style_id LEFT JOIN uom u ON u.id=gi.uom_id LEFT JOIN m3_items mi ON mi.m3_items_Id=gi.m3_item_code_id AND gi.item_type IN ("FABRIC")  LEFT JOIN m3_trims mt ON mt.m3_trim_Id=gi.m3_item_code_id AND gi.item_type NOT IN("FABRIC")'
            const result = await this.grnRepo.query(query)
            if(result){
                return new CommonResponseModel(true,1,'Data Retrived Sucessfully',result)
            }else{
                return new CommonResponseModel(false,0,'No Data Found',[])
            }

        }catch(err){
            throw err
        }
    }
}