import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { PurchaseOrderEntity } from "./entities/purchase-order-entity";
import { CommonResponseModel,GrnItemsFormDto, LifeCycleStatusEnum, PurchaseStatusEnum, PurchaseViewDto, StatusEnum, VendorIdReq } from "@project-management-system/shared-models";
import { PurchaseOrderDto } from "./dto/purchase-order-dto";
import { PurchaseOrderFbricEntity } from "./entities/purchase-order-fabric-entity";
import { PurchaseOrderTrimEntity } from "./entities/purchase-order-trim-entity";
import { FORMERR } from "dns";
import { purchaseOrdeIdreq } from "./dto/purchase-order-id-req";
import { FabriCWeaveDto } from "../fabric weave/dto/fabric-weave.dto";
import { PurchaseOrderRepository } from "./repo/purchase-order-repository";
import { PurchaseOrderFabricRepository } from "./repo/purchase-order-fabric-repository";
import { PurchaseOrderTrimRepository } from "./repo/purchase-order-trim-repository";
import { PurchaseOrderItemsEntity } from "./entities/purchase-order-items-entity";
import { SampleRequestRepository } from "../sample-dev-request/repo/sample-dev-req-repo";
let moment = require('moment');

@Injectable()
export class PurchaseOrderService {
    constructor(
        // @InjectRepository(PurchaseOrderEntity)
        private poRepo: PurchaseOrderRepository,
        private poFabricRepo: PurchaseOrderFabricRepository,
        private poTrimRepo: PurchaseOrderTrimRepository,
        @InjectDataSource()
        private dataSource: DataSource,
        private sampleReqRepo:SampleRequestRepository
    ) { }



    async cretePurchaseOrder(req: PurchaseOrderDto): Promise<CommonResponseModel> {
        try {
            const currentYear = moment().format('YYYY')
            const currentDate = moment();
            const netyaer = currentDate.year();
            const nextYear = netyaer + 1;
            let FromYear = currentYear.toString().substr(-2)
            let ToYear = (nextYear).toString().substr(-2)
            console.log(ToYear)
            console.log('$$$$')
            let poNumber
            const data = 'select max(purchase_order_id) as poId from purchase_order'
            const maxId = await this.poRepo.query(data)
            if (maxId[0].poId == null) {
                poNumber = 'PO/' + FromYear + '-' + ToYear + '/' + '001' + ''
            } else {
                poNumber = 'PO/' + FromYear + '-' + ToYear + '/' + maxId[0].poId.toString().padStart(3, 0) + ''
            }
            let poItemInfo = []
            const poEntity = new PurchaseOrderEntity()
            poEntity.poNumber = poNumber
            poEntity.vendorId = req.vendorId
            poEntity.styleId = req.styleId
            poEntity.buyerId = req.buyerId
            poEntity.expectedDeliveryDate = req.expectedDeliveryDate
            poEntity.purchaseOrderDate = req.purchaseOrderDate
            poEntity.createdUser = req.createdUser
            poEntity.createdUser = req.createdUser
            poEntity.poMaterialType = req.poMaterialType
            poEntity.poAgainst = req.poAgainst
            poEntity.currencyId=req.currencyId
            poEntity.exchangeRate=req.exchangeRate
            poEntity.deliveryAddress=req.deliveryAddress
            poEntity.totalAmount=req.totalAmount
            for(const item of req.poItemInfo){
                console.log(item,'$$$$')
                const pofabricEntity = new PurchaseOrderItemsEntity()
                        pofabricEntity.colourId = item.colourId
                        pofabricEntity.m3ItemId = item.m3ItemId
                        pofabricEntity.poQuantity = item.poQuantity
                        pofabricEntity.grnQuantity = item.grnQuantity
                        pofabricEntity.quantityUomId = item.quantityUomId
                        pofabricEntity.poQuantity = item.poQuantity
                        pofabricEntity.quantityUomId = item.quantityUomId
                        pofabricEntity.sampleItemId = item.sampleItemId
                        pofabricEntity.indentItemId = item.indentItemId
                        pofabricEntity.unitPrice = item.unitPrice
                        pofabricEntity.discount = item.discount
                        pofabricEntity.transportation = item.transportation
                        pofabricEntity.tax = item.tax
                        pofabricEntity.subjectiveAmount = item.subjectiveAmount
                        poItemInfo.push(pofabricEntity)
            }
            poEntity.poItemInfo=poItemInfo
            // let save
            const save = await this.poRepo.save(poEntity)
            
            if (save) {
                if(req.poAgainst == 'INDENT'){
                    for(const update of req.poItemInfo){
                        if(update.indentId != undefined){

                        }
                    }
                }
                if(req.poAgainst == 'SAMPLE ORDER'){
                    for(const update of req.poItemInfo){
                        if(update.sampleReqId != undefined){
                           const  dat = await this.sampleReqRepo.update({SampleRequestId:update.sampleReqId},{lifeCycleStatus:LifeCycleStatusEnum.PO_RAISED})
                        }
                    }
                }
                

                return new CommonResponseModel(true, 1, 'purchased Order Created Sucessfully')
            } else {
                return new CommonResponseModel(false, 0, 'Something went Wrong')

            }
        } catch (err) {
            throw err
        }
    }

    async getAllPONumbers(req: VendorIdReq): Promise<CommonResponseModel> {
        try {
            let query = `SELECT purchase_order_id as purchaseOrderId,po_number AS poNumber,vendor_id as vendorId,po_material_type as materialType,po_against as poAgainst FROM purchase_order WHERE status NOT IN ('cancelled', 'closed')`
            if (req.vendorId) {
                query = query + ` AND vendor_id = '${req.vendorId}'`;
            }
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }
    }

    async getPODataById(req: VendorIdReq): Promise<CommonResponseModel> {
        try {
            // ,if.ifabric_id AS indentFabricId
            console.log(req)
            req.materialType = req.materialType.toLowerCase().includes('trim') ? 'Trim' : 'Fabric' 
            let query
            if (req.materialType === 'Fabric') {
                query = `SELECT m.item_code AS m3itemCode,poi.m3_item_id as m3ItemCodeId,poi.po_quantity AS poQuantity,poi.quantity_uom_id AS quantityUomId,u.uom,poi.purchase_order_item_id as poItemId,
                poi.purchase_order_id AS purchaseOrderId,m.fabric_type AS m3ItemTypeId,ft.fabric_type_name AS m3ItemType,
                poi.grn_quantity AS grnQuantity,poi.sample_item_id AS sampleItemId,poi.indent_item_id as indentItemId,b.buyer_id AS buyerId,CONCAT(b.buyer_code,'-',b.buyer_name) AS buyer,s.style_id,s.style,poi.unit_price as unitPrice,poi.discount,poi.tax,poi.transportation,poi.subjective_amount as subjectiveAmount,poi.po_item_status as poItemStatus,poi.colour_id as colourId,c.colour as colour
                FROM purchae_order_items poi
                LEFT JOIN uom u ON u.id = poi.quantity_uom_id
                LEFT JOIN m3_items m ON m.m3_items_Id = poi.m3_item_id
                LEFT JOIN fabric_type ft ON ft.fabric_type_id = m.fabric_type
                LEFT JOIN colour c ON c.colour_id = poi.colour_id
                `
                if (req.poAgainst =='Indent') {
                    query = query + ` 
                    LEFT JOIN indent_fabric inf ON inf.ifabric_id = poi.indent_item_id
                    LEFT JOIN indent i ON i.indent_id = inf.indent_id 
                    LEFT JOIN style s ON s.style_id = i.style 
                    LEFT JOIN buyers b ON b.buyer_id = s.buyer_id
                    WHERE poi.purchase_order_id = ${req.poId}`
                }
                if (req.poAgainst === 'Sample Order') {
                    query = query + ` 
                    LEFT JOIN sample_request_fabric_info srf ON srf.fabric_info_id  = poi.sample_item_id   
                    LEFT JOIN sample_request sr ON sr.sample_request_id  = srf.sample_request_id                  
                    LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id 
                    LEFT JOIN style s ON s.style_id = sr.style_id
                    WHERE poi.purchase_order_id = ${req.poId}`
                }
            }
            if (req.materialType === 'Trim') {
                query = `SELECT mt.trim_code as m3itemCode,poi.m3_item_id AS m3ItemCodeId,mt.trim_type as m3ItemType,poi.purchase_order_id AS purchaseOrderId, poi.po_quantity AS poQuantity,
                poi.quantity_uom_id AS quantityUomId,u.uom,poi.grn_quantity AS grnQuantity,poi.indent_item_id as indentItemId, poi.sample_item_id as sampleItemId,b.buyer_id AS buyerId,CONCAT(b.buyer_code,'-',b.buyer_name) AS buyer,s.style_id,s.style,poi.unit_price as unitPrice,poi.discount,poi.tax,poi.transportation,poi.subjective_amount as subjectiveAmount,poi.po_item_status as poItemStatus,poi.colour_id as colourId,c.colour as colour
                FROM purchae_order_items poi
                LEFT JOIN uom u ON u.id = poi.quantity_uom_id
                LEFT JOIN m3_trims mt ON mt.m3_trim_Id=poi.m3_item_id
                LEFT JOIN colour c ON c.colour_id = poi.colour_id
                `
                if (req.poAgainst == 'Indent') {
                    query = query + ` 
                    LEFT JOIN indent_trims it ON it.itrims_id = poi.indent_item_id
                    LEFT JOIN indent i ON i.indent_id = it.indent_id 
                    LEFT JOIN style s ON s.style_id = i.style 
                    LEFT JOIN buyers b ON b.buyer_id = i.buyer_id 
                    WHERE poi.purchase_order_id = ${req.poId}`
                }
                if (req.poAgainst == 'Sample Order') {
                    query = query + `
                     LEFT JOIN sample_request_fabric_info srf ON srf.fabric_info_id  = poi.sample_item_id   
                     LEFT JOIN sample_request sr ON sr.sample_request_id  = srf.sample_request_id 
                     LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id 
                     LEFT JOIN style s ON s.style_id = sr.style_id
                     WHERE poi.purchase_order_id = ${req.poId}`
                }

            }
            console.log(query)
            const itemData = await this.poTrimRepo.query(query)
            const grnItemsArr: GrnItemsFormDto[] = []
            for (const rec of itemData) {
                const grnItemsDto = new GrnItemsFormDto(rec.poItemId, rec.m3ItemCodeId, rec.m3itemCode, rec.m3ItemType, rec.m3ItemTypeId, rec.poItemStatus, rec.quantityUomId, rec.uom, rec.unitPrice, rec.discount, rec.tax, rec.transportation, rec.subjectiveAmount, rec.grnQuantity, rec.poQuantity, rec.colourId, rec.colour, rec.sampleItemId, rec.indentItemId,rec.buyerId,rec.buyer)
                grnItemsArr.push(grnItemsDto)
            }
            const poQuery = `select p.purchase_order_id as poId,p.style_id as styleId,p.po_material_type as poMaterialType,p.po_against as poAgainst from purchase_order p where p.purchase_order_id = ${req.poId}`
            const poData = await this.poTrimRepo.query(poQuery)
             poData[0].grnItems = itemData 

            if (grnItemsArr.length > 0) {
                return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", poData)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            console.log(err)
            throw (err)
        }
    }

    async getMaterialTpye(): Promise<CommonResponseModel> {
        try {
            let query = `SELECT purchase_order_id AS purchaseOrderId,po_material_type AS materialType FROM purchase_order `
            const data = await this.dataSource.query(query)

            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }

    }

    async getAllPoData(req?: PurchaseViewDto): Promise<CommonResponseModel> {
        try {
            let query2 = `Select po.status as status  FROM purchase_order po LEFT JOIN vendors v ON v.vendor_id = po.vendor_id `
            const statuses = await this.dataSource.query(query2);
            const count = Object.keys(PurchaseStatusEnum).map((key) => {

                return {
                    [PurchaseStatusEnum[key]]: statuses.filter((rec => rec.status === PurchaseStatusEnum[key])).length
                }
            });
            let query = `SELECT po.purchase_order_id AS id, po.po_number AS poNumber, po.vendor_id AS vendorId, v.vendor_code AS vendorCode,
            v.vendor_name AS vendorName,po.expected_delivery_date AS deliveryDate, po.purchase_order_date AS orderDate,po.status,po.po_material_type AS materialType
            FROM purchase_order po
            LEFT JOIN vendors v ON v.vendor_id = po.vendor_id `
            if (req) {
                if (req?.id) {
                    query += `where po.purchase_order_id = ${req?.id}`
                }
                if (req?.confirmStartDate) {
                    query += `WHERE ${req?.confirmStartDate ? `Date(expected_delivery_date) BETWEEN '${req?.confirmStartDate}' AND '${req?.confirmEndDate}'` : '1=1'}`
                }
                if (req?.poconfirmStartDate) {
                    query += `WHERE ${req?.poconfirmStartDate ? `Date(purchase_order_date) BETWEEN '${req?.poconfirmStartDate}' AND '${req?.poconfirmEndDate}'` : '1=1'}`
                }
                if (req?.status) {

                    query += `Where po.status = "${req.status}"`
                }
            }
            const data: any = await this.dataSource.query(query);
            data.push(count)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }
    }

    async GetPurchaseData(req?: PurchaseViewDto): Promise<CommonResponseModel> {
        try {
            let query = `SELECT  null as pofabricData,null as poTrimdata, s.style AS styleName,po.purchase_order_id AS purchaseOrderId,po.po_number AS poNumber,po.vendor_id AS vendorId,po.style_id AS styleId,po.vendor_id AS vendorId, v.vendor_name AS vendorName,
            expected_delivery_date AS expectedDeliverydate,purchase_order_date AS purchaseOrderDate,po.status AS poStatus,po_material_type AS poMaterialtype,b.buyer_name as buyername
             FROM purchase_order  po 
            LEFT JOIN style s ON s.style_id=po.style_id
            LEFT JOIN  vendors v ON v.vendor_id= po.vendor_id
            LEFT JOIN buyers b ON  b.buyer_id = po.buyer_id
            `
            if (req?.id) {
                query += ` where po.purchase_order_id = ${req?.id}`
            }
            query+=` order by po.expected_delivery_date`
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }
    }

    async GetPurchaseFabricData(purchaseOrderId: number): Promise<CommonResponseModel> {
        try {
            console.log(purchaseOrderId)
            let query = `SELECT u.uom AS quantityUom,item_code AS itemCode,c.colour AS colourName,po_fabric_id AS pofabricId,pf.colour_id AS colourId,
            m3_fabric_code AS m3fabricCode,shahi_fabric_code AS shahiFabricCode,purchase_order_id AS purchaseOrderId,
            indent_fabric_id AS indentFabricId,po_quantity AS poQuantity,
            quantity_uom_id AS quantityUomId,
            fab_item_status AS fabItemStatus,grn_quantity
            FROM purchase_order_fabric pf
            LEFT JOIN colour c ON c.colour_id=pf.colour_id
            LEFT JOIN m3_items mi ON mi.m3_items_Id=pf.m3_fabric_code
            LEFT JOIN uom u ON u.id=quantity_uom_id where pf.purchase_order_id=`+ purchaseOrderId + ``
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }
    }
    async GetPurchaseTrimData(purchaseOrderId: number): Promise<CommonResponseModel> {
        try {
            let query = `SELECT ri.trim_code AS trimcode,ri.trim_type AS trimtype,pg.product_group AS productGroup,po_trim_id AS poTrimid,pt.product_group_id AS productGrouoId,trim_id AS trimId,m3_trim_code AS m3trimCode,
            purchase_order_id,colour_id AS clourId,
                       indent_trim_id AS indentTrimId,po_quantity AS poQuantity,trim_item_status AS trimItemStaus ,
                       grn_quantity AS grnQuantity 
                       FROM purchase_order_trim pt
                       LEFT JOIN product_group pg ON pg.product_group_id=pt.product_group_id
                       LEFT JOIN m3_trims ri ON ri.m3_trim_Id =pt.m3_trim_code
                        where pt.purchase_order_id=`+ purchaseOrderId + ``
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", data)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }
    }
    async getAllPurchaseOrderData(req?: PurchaseViewDto): Promise<CommonResponseModel> {
        try {
            const data = []
            const podata = await this.GetPurchaseData(req)
            for (const po of podata.data) {
                console.log(po, '^^^^^^^^^^^^^^^^^^^')
                const fabData = await this.GetPurchaseFabricData(po.purchaseOrderId)
                const fabricInfo = []
                // for (const fabrData of fabData.data) {
                // //     console.log(fabrData)
                // //     console.log('**************************8')
                //     fabricInfo.push(fabrData)
                // }
                // const trimData = await this.GetPurchaseTrimData(po.purchaseOrderId)
                // const triminfo = []
                // for (const trim of trimData.data) {
                //     triminfo.push(trim)
                // }
                data.push({
                    styleName: po.styleName,
                    purchaseOrderId: po.purchaseOrderId,
                    poNumber: po.poNumber,
                    buyerId: po.buyerId,
                    buyername: po.buyername,
                    vendorId: po.vendorId,
                    vendorName: po.vendorName,
                    expectedDeliverydate: po.expectedDeliverydate,
                    purchaseOrderDate: po.purchaseOrderDate,
                    poMaterialtype: po.poMaterialtype,
                    poStatus: po.poStatus,
                    poId:po.purchaseOrderId
                    // fabInfo: fabricInfo,
                    // triminfo: triminfo

                })
            }
            if (data) {
                console.log(data, "kkkkkkkkkkkk");

                return new CommonResponseModel(true, 1, 'data retrived sucessfully', data)

            } else {
                return new CommonResponseModel(false, 0, 'no data found', [])

            }

        }
        catch (err) {
            throw err
        }
    }

    async getPodetailsById(req:PurchaseViewDto):Promise<CommonResponseModel>{
        // const PoType = `select po_material_type from purchase_order where purchase_order_id = ${req.id}`
        // const poTypeRes = await this.dataSource.query(PoType)
        // console.log(poTypeRes,'poTypeRes')
        // let poData = `select * from purchase_order po `
        // if(poTypeRes == 'Fabric'){
        //     poData = poData+` left join purchase_order_fabric pof on pof.purchase_order_id = po.purchase_order_id `
        // }else{
        //     poData = poData+` left join purchase_order_trim pot on pot.purchase_order_id = po.purchase_order_id`
        // }
        // poData = poData+` where po.purchase_order_id = ${req.id}`
        // const podatares = await this.dataSource.query(poData)
        const poTrimData = `select po.*,poi.*,mi.item_code,v.vendor_name,f.address from purchase_order po left join purchae_order_items poi on poi.purchase_order_id = po.purchase_order_id left join m3_items mi on mi.m3_items_Id = poi.m3_item_id left join factory f on f.id = po.delivery_address left join vendors v on v.vendor_id = po.vendor_id where po.purchase_order_id = ${req.id}`
        const poTrimdatares = await this.dataSource.query(poTrimData)
        // console.log(podatares)
        // const PoDetails = {
        //     fabricInfo:[],
        //     trimInfo:[]
        // }
        if(poTrimdatares.length > 0){
            // PoDetails.fabricInfo = podatares
            // PoDetails.trimInfo = poTrimdatares
            return new CommonResponseModel(true,1,'data retreived',poTrimdatares)
        }else{
            return new CommonResponseModel(false,0,'No data')
        }
        return 
    }

}