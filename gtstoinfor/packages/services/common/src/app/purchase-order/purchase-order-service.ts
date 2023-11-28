import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { PurchaseOrderEntity } from "./entities/purchase-order-entity";
import { CommonResponseModel, PurchaseStatusEnum, PurchaseViewDto, StatusEnum, VendorIdReq } from "@project-management-system/shared-models";
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
export class PurchaseOrderService {
    constructor(
        // @InjectRepository(PurchaseOrderEntity)
        private poRepo: PurchaseOrderRepository,
        private poFabricRepo: PurchaseOrderFabricRepository,
        private poTrimRepo: PurchaseOrderTrimRepository,
        @InjectDataSource()
        private dataSource: DataSource,
    ) { }



    async cretePurchaseOrder(req: PurchaseOrderDto): Promise<CommonResponseModel> {
        try {
            // console.log(req.poFabricInfo)
            // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
            const currentYear = moment().format('YYYY')
            let ToYear = currentYear.toString().substr(-2)
            let FromYear = (currentYear - 1).toString().substr(-2)
            let poNumber
            const data = 'select max(purchase_order_id) as poId from purchase_order'
            const maxId = await this.poRepo.query(data)
            if (maxId[0].poId == null) {
                poNumber = 'PO/' + FromYear + '-' + ToYear + '/' + '001' + ''
            } else {
                poNumber = 'PO/' + FromYear + '-' + ToYear + '/' + maxId[0].poId.toString().padStart(3, 0) + ''
            }
            let pofabricInfo = []
            let poTrimInfo = []
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
            // if (req.poFabricInfo) {
            //     for (const poFabric of req.poFabricInfo) {
            //         const pofabricEntity = new PurchaseOrderFbricEntity()
            //         pofabricEntity.colourId = poFabric.colourId
            //         pofabricEntity.remarks = poFabric.remarks
            //         pofabricEntity.m3FabricCode = poFabric.m3FabricCode
            //         pofabricEntity.indentFabricId = poFabric.indentFabricId
            //         pofabricEntity.sampleReqFabricId = poFabric.sampleReqFabricId
            //         pofabricEntity.poQuantity = poFabric.poQuantity
            //         pofabricEntity.quantityUomId = poFabric.quantityUomId
            //         pofabricInfo.push(pofabricEntity)
            //     }
            //     poEntity.poFabricInfo = pofabricInfo
            // }
            // if (req.poTrimInfo) {
            //     for (const trimInfo of req.poTrimInfo) {
            //         const trimEntity = new PurchaseOrderTrimEntity()
            //         console.log(trimInfo)
            //         console.log('""""""""""""""""""""""""""""""""""""""""""""')
            //         trimEntity.colourId = trimInfo.colourId
            //         trimEntity.m3TrimCode = trimInfo.m3TrimCode
            //         trimEntity.indentTrimId = trimInfo.indentTrimId
            //         trimEntity.sampleReqTrimId = trimInfo.sampleReqTrimId
            //         trimEntity.poQuantity = trimInfo.poQuantity
            //         trimEntity.quantityUomId = trimInfo.quantityUomId
            //         poTrimInfo.push(trimEntity)
            //     }
            //     poEntity.poTrimInfo = poTrimInfo
            // }

            const save = await this.poRepo.save(poEntity)
            if (save) {
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
            // console.log(req,'================')
            let responseData
            if (req.materialType === 'Fabric') {
                let query=`SELECT m.item_code AS itemCode,pof.po_fabric_id AS poFabricId,pof.m3_fabric_code AS m3fabricCode,pof.po_quantity AS poQuantity,pof.quantity_uom_id AS quantityUomId,u.uom,
                pof.purchase_order_id AS purchaseOrderId,pof.fabric_type_id AS fabricTypeId,ft.fabric_type_name AS fabricTypeName,po.po_material_type AS materialType,po.po_against AS  poAgainst,
                pof.grn_quantity AS grnQuantity,if.ifabric_id AS indentFabricId,pof.sample_request_id AS sampleRequestId,b.buyer_id AS buyerId,CONCAT(b.buyer_code,'-',b.buyer_name) AS buyer,s.style_id,s.style
                FROM purchase_order_fabric pof
                LEFT JOIN purchase_order po ON po.purchase_order_id = pof.purchase_order_id
                LEFT JOIN fabric_type ft ON ft.fabric_type_id = pof.fabric_type_id
                LEFT JOIN uom u ON u.id = pof.quantity_uom_id
                LEFT JOIN m3_items m ON m.m3_items_Id = pof.m3_fabric_code`
                if(req.poAgainst === 'INDENT'){
                    query = query + ` 
                    LEFT JOIN indent i ON i.indent_id = pof.indent_id 
                    LEFT JOIN style s ON s.style_id = i.style 
                    LEFT JOIN buyers b ON b.buyer_id = s.buyer_id
                    LEFT JOIN indent_fabric if ON if.indent_id = i.indent_id
                    WHERE pof.purchase_order_id = ${req.poId}`
                }
                if(req.poAgainst === 'SAMPLE ORDER'){
                    query = query + ` 
                    LEFT JOIN sample_request sr ON sr.sample_request_id  = pof.sample_request_id 
                    LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id 
                    LEFT JOIN style s ON s.style_id = sr.style_id
                    WHERE pof.purchase_order_id = ${req.poId}`
                }
                const fabricData = await this.dataSource.query(query)
                responseData = fabricData
            }
            if (req.materialType === 'Trim') {
                let query = `SELECT mt.trim_code as m3TrimCode,pot.po_trim_id AS poTrimId,pot.trim_id AS trimId, pot.m3_trim_code AS m3TrimCode,pot.purchase_order_id AS purchaseOrderId, pot.po_quantity AS poQuantity,
                pot.quantity_uom_id AS quantityUomId,u.uom,po.po_material_type AS materialType,pot.grn_quantity AS grnQuantity,pot.indent_id as indentId, pot.sample_request_id as sampleRequestId,po.po_against AS poAgainst,b.buyer_id AS buyerId,CONCAT(b.buyer_code,'-',b.buyer_name) AS buyer,s.style_id,s.style
                FROM purchase_order_trim pot
                LEFT JOIN purchase_order po ON po.purchase_order_id = pot.purchase_order_id
                LEFT JOIN uom u ON u.id = pot.quantity_uom_id
                LEFT JOIN m3_trims mt ON mt.m3_trim_Id=pot.m3_trim_code`
                if(req.poAgainst === 'INDENT'){
                    query = query + ` 
                    LEFT JOIN indent i ON i.indent_id = pot.indent_id 
                    LEFT JOIN style s ON s.style_id = i.style 
                    LEFT JOIN buyers b ON b.buyer_id = s.buyer_id 
                    WHERE pot.purchase_order_id = ${req.poId}`
                }
                if(req.poAgainst === 'SAMPLE ORDER'){
                    query = query + ` LEFT JOIN sample_request sr ON sr.sample_request_id  = pot.sample_request_id LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id LEFT JOIN style s ON s.style_id = sr.style_id WHERE pot.purchase_order_id = ${req.poId}`
                }
                const trimData = await this.poTrimRepo.query(query)
                responseData = trimData
            }
            if (responseData.length > 0) {
                return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", responseData)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
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
                console.log(po,'^^^^^^^^^^^^^^^^^^^')
                const fabData = await this.GetPurchaseFabricData(po.purchaseOrderId)
                const fabricInfo = []
                for (const fabrData of fabData.data) {
                //     console.log(fabrData)
                //     console.log('**************************8')
                    fabricInfo.push(fabrData)
                }
                const trimData = await this.GetPurchaseTrimData(po.purchaseOrderId)
                const triminfo = []
                for (const trim of trimData.data) {
                    triminfo.push(trim)
                }
                data.push({
                    styleName: po.styleName,
                    purchaseOrderId: po.purchaseOrderId,
                    poNumber: po.poNumber,
                    buyerId:po.buyerId,
                    buyername:po.buyername,
                    vendorId: po.vendorId,
                    vendorName:po.vendorName,
                    expectedDeliverydate: po.expectedDeliverydate,
                    purchaseOrderDate: po.purchaseOrderDate,
                    poMaterialtype: po.poMaterialtype,
                    poStatus: po.poStatus,
                    fabInfo: fabricInfo,
                    triminfo: triminfo

                })
            }
            if (data) {
                console.log(data,"kkkkkkkkkkkk");
                
                return new CommonResponseModel(true, 1, 'data retrived sucessfully', data)
                
            } else {
                return new CommonResponseModel(false, 0, 'no data found', [])

            }

        }
        catch (err) {
            throw err
        }
    }

}