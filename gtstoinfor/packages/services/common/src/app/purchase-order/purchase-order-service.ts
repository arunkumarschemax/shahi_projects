import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { PurchaseOrderEntity } from "./entities/purchase-order-entity";
import { CommonResponseModel,CustomerOrderStatusEnum,GrnItemsFormDto, ItemTypeEnum, LifeCycleStatusEnum, PurchaseStatusEnum, PurchaseViewDto, StatusEnum, VendorIdReq } from "@project-management-system/shared-models";
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
import { IndentRepository } from "../indent/dto/indent-repository";
let moment = require('moment');

@Injectable()
export class PurchaseOrderService {
    constructor(
        // @InjectRepository(PurchaseOrderEntity)
        private poRepo: PurchaseOrderRepository,
        private indentRepo:IndentRepository,
        private poFabricRepo: PurchaseOrderFabricRepository,
        private poTrimRepo: PurchaseOrderTrimRepository,
        @InjectDataSource()
        private dataSource: DataSource,
        private sampleReqRepo:SampleRequestRepository
    ) { }



    async cretePurchaseOrder(req: PurchaseOrderDto): Promise<CommonResponseModel> {
        try {

            const today = new Date();
            const CurrentYear = today.getFullYear();
            const CurrentMonth = today.getMonth();
            let fromDate = 0;
            let toDate = 0;
            let itemType;
            let poItemType

            if(req.poMaterialType === "Fabric"){
                itemType = 'F';
                poItemType = req.poMaterialType
            }
            else{
                itemType = 'T';
                poItemType = 'Trim'
            }
            const data = 'select  max(ref_no) as poId from purchase_order where po_material_type = "'+poItemType+'"';
                let totalPO = await this.poRepo.query(data)
            // if (!isUpdate) {
                if (CurrentMonth < 4) {
                    fromDate = (CurrentYear-1);
                    toDate = (CurrentYear);
                } else {
                    fromDate = (CurrentYear);
                    toDate = (CurrentYear + 1);
                }

            // }
            
            let val = totalPO[0].poId + 1;


            let refNo = val + "";
            while (refNo.length < 4) refNo = "0" + refNo;

            let poNumber = "PO/" + (fromDate.toString().substr(-2)) + "-" + (toDate.toString().substr(-2)) + "/" + itemType + "/" + refNo;

            console.log(poNumber);
            // const currentYear = moment().format('YYYY')
            // const currentDate = moment();
            // const netyaer = currentDate.year();
            // const nextYear = netyaer + 1;
            // let FromYear = currentYear.toString().substr(-2)
            // let ToYear = (nextYear).toString().substr(-2)
            // console.log(ToYear)
            // console.log('$$$$')
            // if buyer wise ponumber generation happens need to include Buyer also.
            // const data = 'select max(purchase_order_id) as poId from purchase_order where po_material_type = "'+req.poMaterialType+'"';
            // const maxId = await this.poRepo.query(data)
            // let val = maxId[0].poId + 1;
            // if (maxId[0].poId == null) {
            //     poNumber = 'PO/' + FromYear + '-' + ToYear + '/' + '000001' + ''
            // } else {
            //     poNumber = 'PO/' + FromYear + '-' + ToYear + '/' + val.toString().padStart(5, 0) + ''
            // }
            let poItemInfo = []
            const poEntity = new PurchaseOrderEntity()
            poEntity.poNumber = poNumber
            poEntity.vendorId = req.vendorId
            // poEntity.styleId = req.styleId
            poEntity.buyerId = req.buyerId
            poEntity.expectedDeliveryDate = req.expectedDeliveryDate
            poEntity.purchaseOrderDate = req.purchaseOrderDate
            poEntity.createdUser = req.createdUser
            poEntity.createdUser = req.createdUser
            if(req.poMaterialType === "Fabric"){
                poItemType = req.poMaterialType;
            }else{
                poItemType = 'Trim';
            }
            poEntity.poMaterialType = poItemType
            poEntity.poAgainst = req.poAgainst
            poEntity.currencyId=req.currencyId
            poEntity.exchangeRate=req.exchangeRate
            poEntity.deliveryAddress=req.deliveryAddress
            poEntity.totalAmount=req.totalAmount
            poEntity.refNo=Number(refNo)
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
                        pofabricEntity.styleId = item.styleId
                        if((req.poAgainst).toUpperCase() == 'SAMPLE ORDER'){
                            pofabricEntity.materialType = ItemTypeEnum[(req.poMaterialType).toUpperCase()]
                        }
                        if((req.poAgainst).toUpperCase() == 'INDENT'){
                            pofabricEntity.materialType = ItemTypeEnum[(item.materialType).toUpperCase()]
                        }
                        poItemInfo.push(pofabricEntity)
            }
            poEntity.poItemInfo=poItemInfo
            // let save
            const save = await this.poRepo.save(poEntity)
            
            if (save) {
                if((req.poAgainst).toUpperCase() == 'INDENT'){
                    const indentUpdate = await this.indentRepo.update({indentId:req.poItemInfo[0].indentId},{status:CustomerOrderStatusEnum.IN_PROGRESS})
                    for(const update of req.poItemInfo){
                        if(update.indentId != undefined){

                        }
                    }
                }
                if((req.poAgainst).toUpperCase() == 'SAMPLE ORDER'){
                    for(const update of req.poItemInfo){
                        if(update.sampleReqId != undefined){
                           const  dat = await this.sampleReqRepo.update({SampleRequestId:update.sampleReqId},{lifeCycleStatus:LifeCycleStatusEnum.PO_RAISED})
                        }
                    }
                }
                

                return new CommonResponseModel(true, 1, 'purchased Order Created Sucessfully',save)
            } else {
                return new CommonResponseModel(false, 0, 'Something went Wrong')

            }
        } catch (err) {
            throw err
        }
    }

    async getAllPONumbers(req: VendorIdReq): Promise<CommonResponseModel> {
        try {
            let buyerId
            if(req.buyerRefNo){
                const buyerdata = `select buyer_id from buyers where external_ref_number = '${req.buyerRefNo}'`;
                const res = await this.dataSource.query(buyerdata)
                buyerId = res[0].buyer_id
            }
            let query = `
            SELECT po.purchase_order_id AS purchaseOrderId,po.po_number AS poNumber,po.vendor_id AS vendorId,po.po_material_type AS materialType,po.po_against AS poAgainst,
            mt.trim_mapping_id AS trimMappingId
            FROM purchase_order po
            LEFT JOIN purchae_order_items poi ON poi.purchase_order_id = po.purchase_order_id
            LEFT JOIN m3_trims mt ON mt.m3_trim_Id=poi.m3_item_id
            WHERE status NOT IN ('cancelled', 'closed')`
            if(req.buyerRefNo){
                query = query + ` AND po.buyer_id = '${buyerId}'`;
            }
            if (req.vendorId) {
                query = query + ` AND po.vendor_id = '${req.vendorId}'`;
            }
            query = query +` GROUP BY po.po_number ORDER BY po.po_number`
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
                query = `SELECT m.item_code AS m3itemCode,poi.m3_item_id as m3ItemCodeId,poi.po_quantity AS poQuantity,poi.quantity_uom_id AS quantityUomId,u.uom,poi.purchase_order_item_id as poItemId,m.description,
                poi.purchase_order_id AS purchaseOrderId,m.fabric_type AS m3ItemTypeId,ft.fabric_type_name AS m3ItemType,
                poi.grn_quantity AS grnQuantity,poi.sample_item_id AS sampleItemId,poi.indent_item_id as indentItemId,b.buyer_id AS buyerId,CONCAT(b.buyer_code,'-',b.buyer_name) AS buyer,s.style_id,s.style,poi.unit_price as unitPrice,poi.discount,t.tax_percentage as tax,t.tax_id as taxId,poi.transportation,poi.subjective_amount as subjectiveAmount,poi.po_item_status as poItemStatus,poi.colour_id as colourId,c.colour as colour, poi.item_type AS itemType `;
                if(req.poAgainst == 'Indent'){
                    query = query + `,i.indent_id as indentId `
                }
                if(req.poAgainst == 'Sample Order'){
                    query = query +  `,sr.sample_request_id as sampleRequestId `
                }
                query = query + `
                FROM purchae_order_items poi
                LEFT JOIN uom u ON u.id = poi.quantity_uom_id
                LEFT JOIN taxes t on t.tax_id = poi.tax
                LEFT JOIN m3_items m ON m.m3_items_Id = poi.m3_item_id
                LEFT JOIN fabric_type ft ON ft.fabric_type_id = m.fabric_type
                LEFT JOIN colour c ON c.colour_id = poi.colour_id
                `
                if (req.poAgainst == 'Indent') {
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
            else {
                query = `SELECT mt.trim_code as m3itemCode,
                mt.category_id AS categoryId,cg.category,
                mt.color_id AS colorId,cl.colour as color,
                mt.content_id AS contentId,ct.content,
                mt.finish_id AS finishId,f.finish,
                mt.hole_id AS holeId,h.hole,
                mt.logo, mt.part,
                mt.quality_id AS qualityId,q.quality_name AS qualityName,
                mt.structure_id AS structureId,st.structure,
                mt.thickness_id AS thicknessId,th.thickness,
                mt.type_id AS typeId,ty.type,
                mt.uom_id AS UOMId, uom.uom as UOM,
                mt.variety_id AS varietyId,v.variety,
                mt.trim_category_id AS trimCategoryId,tr.trim_category AS trimCategory,
                mt.trim_mapping_id AS trimMappingId,
                tpm.structure, tpm.category, tpm.content, tpm.type, tpm.finish, tpm.hole, tpm.quality, tpm.thickness, tpm.variety, tpm.uom, tpm.color, tpm.logo, tpm.part,
                poi.m3_item_id AS m3ItemCodeId,mt.trim_type as m3ItemType,poi.purchase_order_id AS purchaseOrderId, poi.po_quantity AS poQuantity,poi.purchase_order_item_id as poItemId,
                poi.quantity_uom_id AS quantityUomId,u.uom,poi.grn_quantity AS grnQuantity,poi.indent_item_id as indentItemId, poi.sample_item_id as sampleItemId,b.buyer_id AS buyerId,CONCAT(b.buyer_code,'-',b.buyer_name) AS buyer,s.style_id,s.style,poi.unit_price as unitPrice,poi.discount,t.tax_percentage as tax,t.tax_id as taxId,poi.transportation,poi.subjective_amount as subjectiveAmount,poi.po_item_status as poItemStatus,poi.colour_id as colourId,c.colour as colour, poi.item_type AS itemType`
                if(req.poAgainst == 'Indent'){
                    query = query + `,i.indent_id as indentId`
                }
                if(req.poAgainst == 'Sample Order'){
                    query = query +  `,sr.sample_request_id as sampleRequestId `
                }
                query = query + `
                FROM purchae_order_items poi
                LEFT JOIN taxes t on t.tax_id = poi.tax
                LEFT JOIN uom u ON u.id = poi.quantity_uom_id
                LEFT JOIN m3_trims mt ON mt.m3_trim_Id=poi.m3_item_id
                LEFT JOIN colour c ON c.colour_id = poi.colour_id
                LEFT JOIN category cg ON cg.category_id = mt.category_id
                LEFT JOIN content ct ON ct.content_id = mt.content_id
                LEFT JOIN finish f ON f.finish_id = mt.finish_id
                LEFT JOIN hole h ON h.hole_id = mt.hole_id
                LEFT JOIN qualitys q ON q.quality_id = mt.quality_id
                LEFT JOIN structure st ON st.structure_id = mt.structure_id
                LEFT JOIN thickness th ON th.thickness_id = mt.thickness_id
                LEFT JOIN type ty ON ty.type_id = mt.type_id
                LEFT JOIN variety v ON v.variety_id = mt.variety_id
                LEFT JOIN trim tr ON tr.trim_id = mt.trim_category_id
                LEFT JOIN trim_params_mapping tpm ON tpm.trim_mapping_id = mt.trim_mapping_id
                LEFT JOIN colour cl ON cl.colour_id = mt.color_id
                LEFT JOIN uom uom ON uom.id = mt.uom_id
                LEFT JOIN purchase_order po ON po.purchase_order_id = poi.purchase_order_id
                LEFT JOIN buyers b ON b.buyer_id = po.buyer_id
                LEFT JOIN style s ON s.style_id = poi.style_id
                `
                if (req.poAgainst == 'Indent') {
                    query = query + ` 
                    LEFT JOIN indent_trims it ON it.itrims_id = poi.indent_item_id
                    LEFT JOIN indent i ON i.indent_id = it.indent_id 
                    WHERE poi.purchase_order_id = ${req.poId}`
                }
                if (req.poAgainst == 'Sample Order') {
                    query = query + `
                     LEFT JOIN sample_request_trim_info srf ON srf.trim_info_id  = poi.sample_item_id   
                     LEFT JOIN sample_request sr ON sr.sample_request_id  = srf.sample_request_id
                     WHERE poi.purchase_order_id = ${req.poId}`
                }

            }
            const itemData = await this.poTrimRepo.query(query)

            const modifiedRes = itemData.map(item => {
                const trueValues = Object.keys(item)
                .filter(key => ["structure", "category", "content", "type", "finish", "hole", "quality", "thickness", "variety", "uom", "color", "logo", "part"].includes(key) && item[key] === 1)
                .map(key => key.toUpperCase());

                const concatenatedValues = trueValues.join('/');
                const label = trueValues.length > 0 ? "BUYER/TRIM TYPE/TRIM CATEGORY/":""

                const trimParams = label + concatenatedValues
                return { ...item, trimParams };
            });
           
            const grnItemsArr: GrnItemsFormDto[] = []
            for (const rec of modifiedRes) {
                const receivedQty = rec.poQuantity - rec.grnQuantity
                const grnItemsDto = new GrnItemsFormDto(rec.poItemId, rec.m3ItemCodeId, rec.m3itemCode, rec.m3ItemType, rec.m3ItemTypeId, rec.poItemStatus, rec.quantityUomId, rec.uom, rec.unitPrice, rec.discount, rec.tax, rec.transportation, rec.subjectiveAmount, rec.grnQuantity, rec.poQuantity, rec.colourId, rec.colour, rec.sampleItemId, rec.indentItemId,rec.buyerId,rec.buyer,rec?.sampleRequestId,rec?.indentId,receivedQty,receivedQty,rec.categoryId,rec.category,rec.colorId,rec.color,rec.contentId,rec.content,rec.finishId,rec.finish,rec.holeId,rec.hole,rec.logo,rec.part,rec.qualityId,rec.qualityName,rec.structureId,rec.structure,rec.thicknessId,rec.thickness,rec.typeId,rec.type,rec.UOMId,rec.UOM,rec.varietyId,rec.variety,rec.trimCategoryId,rec.trimCategory,rec.trimMappingId,rec.style_id,rec.trimParams,0,0,0,0,"",0,undefined,"",undefined,"",0,0,rec.itemType,rec.description);
                grnItemsArr.push(grnItemsDto)
            }
            const poQuery = `select p.purchase_order_id as poId,p.po_material_type as poMaterialType,p.po_against as poAgainst,p.grn_quantity as grnQuantity from purchase_order p where p.purchase_order_id = ${req.poId}`
            const poData = await this.poTrimRepo.query(poQuery)
             poData[0].grnItems = grnItemsArr


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
            let query = 'SELECT  null as pofabricData,null as poTrimdata, s.style AS styleName,po.purchase_order_id AS purchaseOrderId,po.po_number AS poNumber,po.po_against as poAgainst,po.vendor_id AS vendorId,po.style_id AS styleId,po.vendor_id AS vendorId, v.vendor_name AS vendorName,expected_delivery_date AS expectedDeliverydate,purchase_order_date AS purchaseOrderDate,po.status AS poStatus,po_material_type AS poMaterialtype,b.buyer_name as buyername,po.buyer_id as buyerId FROM purchase_order  po LEFT JOIN style s ON s.style_id=po.style_id LEFT JOIN  vendors v ON v.vendor_id= po.vendor_id LEFT JOIN buyers b ON  b.buyer_id = po.buyer_id WHERE 1=1'

            let param :any={}
            if(req){
            //   if (req.id!== undefined){
            //     query += ` where po.purchase_order_id = ${req?.id}`
            //   }
              if (req.ExternalRefNo && req.ExternalRefNo!=null){
                query += ` AND b.external_ref_number = '${req.ExternalRefNo}'`
              }
              if (req.status && req.status.length > 0) {
                // Assuming req.status is an array of enums
                const statusValues = req.status.map(status => `'${status}'`).join(',');
                query += ` AND po.status IN (${statusValues})`;
            }
              if (req.poconfirmStartDate) {
                query += ` AND purchase_order_date between '${req.poconfirmStartDate}'  and '${req.poconfirmEndDate}'`;
            }
              if (req.confirmStartDate) {
                query += ` AND expected_delivery_date between '${req.confirmStartDate}' and '${req.confirmEndDate}'`;
            }
            if(req.tab){
                query += ` AND po_material_type LIKE '%${req.tab}%'`
            }
            //   if (req.status){
                
            //     // query += `and po.status IN  ('${req.status})')`
            //     query += ` AND po.status IN ("${req.status}")`
            //   }
            }
            
             query+= ` ORDER BY po.expected_delivery_date`
            const data = await this.dataSource.query(query,param)
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
            // console.log(purchaseOrderId)
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
            let query = `SELECT ri.trim_code AS trimcode,ri.trim_type AS trimtype,pg.product_group AS productGroup,po_trim_id AS poTrimid,pt.product_group_id AS productGrouoId,trim_id AS trimId,m3_trim_code AS m3trimCode ,
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
                    poId:po.purchaseOrderId,
                    poAgainst: po.poAgainst
                    // fabInfo: fabricInfo,
                    // triminfo: triminfo

                })
            }
            if (data) {

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
        const PoType = `select po_material_type,po_against from purchase_order where purchase_order_id = ${req.id}`
        const poTypeRes = await this.dataSource.query(PoType)
        console.log(poTypeRes,'poTypeResdd')
        let concatString
        let columnName
        let joinString
        let columns
        console.log(poTypeRes[0].po_against,'kkkkkk')
        if(poTypeRes[0].po_against == 'Sample Order'){
            joinString = `LEFT JOIN sample_request_fabric_info srf ON srf.fabric_info_id = poi.sample_item_id
            LEFT JOIN sample_request s ON s.sample_request_id = srf.sample_request_id`
            columns = `s.request_no as sample_req_no,s.expected_delivery_date as date ` 
        }else {
            joinString = `LEFT JOIN sample_request_trim_info srt ON srt.trim_info_id = poi.sample_item_id
            LEFT JOIN sample_request sr ON sr.sample_request_id = srt.sample_request_id`
            columns = `i.request_no,i.indent_date`
        }
        // let poData = `select * from purchase_order po `
        if(poTypeRes[0].po_material_type == 'Fabric'){
            concatString = ` 
            left join m3_items mi on mi.m3_items_Id = poi.m3_item_id left join uom u ON u.id = poi.quantity_uom_id 
            LEFT JOIN indent_fabric ii ON ii.ifabric_id = poi.indent_item_id ${joinString}
            `
            columnName =    `mi.item_code,mi.hsn_code as hsnCode,mi.description,u.uom,${columns}`
        //     poData = poData+` left join purchase_order_fabric pof on pof.purchase_order_id = po.purchase_order_id `
        }else{
            concatString = ` 
            left join m3_trims mi on mi.m3_trim_Id = poi.m3_item_id left join uom u ON u.id = poi.quantity_uom_id
            LEFT JOIN indent_trims ii ON ii.itrims_id = poi.indent_item_id ${joinString}
            
            `
            columnName = `mi.trim_code as item_code , mi.hsn_code as hsnCode,mi.description ,u.uom,${columns} `
        //     poData = poData+` left join purchase_order_trim pot on pot.purchase_order_id = po.purchase_order_id`
        }
        // poData = poData+` where po.purchase_order_id = ${req.id}`
        // const podatares = await this.dataSource.query(poData)
        
        const poTrimData = `select po.*,poi.*,${columnName},poi.unit_price,i.request_no as indentNo,i.indent_date as indentDate,v.vendor_name,v.contact_number,v.bank_acc_no,v.gst_number,v.postal_code,f.address,t.tax_percentage AS taxPercentage ,cur.currency_name as currencyName
        from purchase_order po
        left join purchae_order_items poi on poi.purchase_order_id = po.purchase_order_id ${concatString}
        LEFT JOIN indent i ON i.indent_id = ii.indent_id left join factory f on f.id = po.delivery_address 
        left join currencies cur on cur.currency_id=po.currency_id  
        left join vendors v on v.vendor_id = po.vendor_id LEFT JOIN taxes t ON t.tax_id = poi.tax
        where po.purchase_order_id = ${req.id} `
        console.log(poTrimData,'ppppppphhh')
        console.log(concatString,'columnsssss');

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
    async getAllPos(): Promise<CommonResponseModel> {
        try {
            let query = `SELECT p.purchase_order_id,p.po_number FROM  grn g LEFT JOIN purchase_order p ON p.purchase_order_id = g.po_id GROUP BY g.po_id`
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
    async QrByPoId(req: VendorIdReq): Promise<CommonResponseModel> {
        try {
            let query = `SELECT grn.grn_id,p.purchase_order_id, gi.grn_item_id,gi.grn_item_no,grn.invoice_no,grn.item_type, IF(grn.item_type = "FABRIC",mit. item_code , 
            mtr.trim_code) AS itemCode,tpm.structure, tpm.category, tpm.content, tpm.type, tpm.finish, tpm.hole, tpm.quality, tpm.thickness, tpm.variety, tpm.uom, tpm.color, tpm.logo, tpm.part FROM  purchase_order p 
            LEFT JOIN grn ON grn.po_id = p.purchase_order_id
            LEFT JOIN grn_items gi ON gi.grn_id = grn.grn_id
            LEFT JOIN m3_items mit ON mit.m3_items_id = gi.m3_item_code_id AND grn.item_type = "FABRIC"
            LEFT JOIN m3_trims mtr ON mtr.m3_trim_Id = gi.m3_item_code_id AND grn.item_type != "FABRIC"
            LEFT JOIN trim_params_mapping tpm ON tpm.trim_mapping_id = mtr.trim_mapping_id
            WHERE p.purchase_order_id = '${req.poId}'`
            const data = await this.dataSource.query(query)
            if (data.length > 0) {
                const modifiedRes = data.map(item => {
                    const trueValues = Object.keys(item)
                    .filter(key => ["structure", "category", "content", "type", "finish", "hole", "quality", "thickness", "variety", "uom", "color", "logo", "part"].includes(key) && item[key] === 1)
                    .map(key => key.toUpperCase());
    
                    const concatenatedValues = trueValues.join('/');
                    const label = trueValues.length > 0 ? "BUYER/TRIM TYPE/TRIM CATEGORY/":""

                    const trimParams = label + concatenatedValues
                    return { ...item, trimParams };
                })
            // if (data.length > 0) {
                 return new CommonResponseModel(true, 0, "PO Numbers retrieved successfully", modifiedRes)
            } else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }
        } catch (err) {
            throw (err)
        }
    }

}