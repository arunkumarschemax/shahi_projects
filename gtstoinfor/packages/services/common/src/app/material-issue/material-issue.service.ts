import { Injectable } from "@nestjs/common";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest, OperationTrackingResponseModel, OperationTrackingDto, OperationInventoryDto, OperationInventoryResponseModel, TrackingEnum, MaterialIssueResponseModel, MaterialIssueRequest, MaterialIssueIdreq, MaterialFabricEnum, ResponesNoDropDownRes, RequestNoDto, MaterialIssueReportsDto, MaterialReportsResponse, BuyerIdReq, ExternalRefReq, buyerReq, AllocationReportReq } from "@project-management-system/shared-models";
import { Item } from "../items/item-entity";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { DataSource, Entity } from "typeorm";
import { MaterialIssueRepository } from "./repo/material-issue-repository";
import { MaterialFabricRepository } from "./repo/material-fabric-repository";
import { MaterialTrimRepository } from "./repo/material-trim-repository";
import { MaterialIssueEntity } from "./entity/material-issue-entity";
import { Location } from '../locations/location.entity';
import { ProfitControlHead } from "../profit-control-head/profit-control-head-entity";
import { MaterialFabricEntity } from "./entity/material-fabric-entity";
import { MaterialTrimEntity } from "./entity/material-trim-entity";
import { MaterialIssueDto } from "./dto/material-issue-dto";
import { Result } from 'antd';
import { AppDataSource } from "../app-datasource";
import { SampleTypes } from "../sample Types/sample-types.entity";
import { Buyers } from "../buyers/buyers.entity";
import { Colour } from "../colours/colour.entity";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { MaterialIssueLogRepository } from "./repo/material-issue-log-repo";
import { MaterialIssueLogDto } from "./dto/material-issue-log-dto";
import { MaterialIssueLogEntity } from "./entity/material-issue-log-entity";


@Injectable()
export class MaterialIssueService {
    constructor(
        private issueRepo: MaterialIssueRepository,
        private fabricRepo: MaterialFabricRepository,
        private trimRepo: MaterialTrimRepository,
        private matisslogRepo: MaterialIssueLogRepository,
        private readonly dataSource: DataSource,
        

        // private readonly dataSource: AppDataSource,
    ) { }

    async createMaterialIssue(req: MaterialIssueDto): Promise<MaterialIssueResponseModel> {
        try {

            let today = new Date();
            let CurrentYear = today.getFullYear();
            let CurrentMonth = today.getMonth();
            let fromDate = 0;
            let toDate = 0;
            const getLength = await this.issueRepo.getMaterialIssueById();
            let totalRecords = getLength.materialIssueId

            if (CurrentMonth < 4) {
                fromDate = (CurrentYear - 1);
                toDate = (CurrentYear);
            } else {
                fromDate = (CurrentYear);
                toDate = (CurrentYear + 1);
            }

            totalRecords = totalRecords + 1;
            var refNo = totalRecords + "";
            while (refNo.length < 4) refNo = "0" + refNo;

            const consumptionCode = "CON/" + (fromDate.toString().substr(-2)) + "-" + (toDate.toString().substr(-2)) + "/" + refNo;

            const issueData = new MaterialIssueEntity()
            issueData.consumptionCode = consumptionCode
            issueData.requestNo = req.requestNo
            issueData.poNumber = req.poNumber
            issueData.issueDate = req.issueDate
            issueData.locationId = req.locationId
            issueData.pchId = req.pchId
            issueData.buyerId = req.buyerId
            issueData.sampleTypeId = req.sampleTypeId
            issueData.sampleSubTypeId = req.sampleSubTypeId
            issueData.styleId = req.styleId
            issueData.styleNo = req.styleNo
            issueData.brandId = req.brandId
            issueData.dmmId = req.dmmId
            issueData.technicianId = req.technicianId
            issueData.description = req.description
            issueData.costRef = req.costRef
            issueData.m3StyleNo = req.m3StyleNo
            issueData.contact = req.contact
            issueData.extn = req.extn
            issueData.SAM = req.SAM
            issueData.product = req.product
            issueData.type = req.type
            issueData.conversion = req.conversion
            issueData.madeIn = req.madeIn
            issueData.remarks = req.remarks
            let fabricInfo = []
            let trimInfo = []
            for (const fabric of req.fabricInfo) {
                const fabricEntity = new MaterialFabricEntity()
                fabricEntity.fabricCode = fabric.fabricCode
                fabricEntity.description = fabric.description
                fabricEntity.colorId = fabric.colorId
                fabricEntity.consumption = fabric.consumption
                fabricEntity.consumptionUom = fabric.consumptionUom
                fabricEntity.consumptionUomId = fabric.consumptionUomId
                fabricEntity.issuedQuantity = fabric.issuedQuantity
                fabricEntity.issuedQuantityUom = fabric.issuedQuantityUom
                fabricEntity.issuedUomId = fabric.issuedUomId
                fabricEntity.remarks = fabric.remarks
                fabricEntity.status = MaterialFabricEnum.OPEN
                fabricEntity.reportedStatus = MaterialFabricEnum.OPEN
                fabricInfo.push(fabricEntity)
            }
            issueData.fabric = fabricInfo
            for (const trim of req?.trimInfo) {
                const trimEntity = new MaterialTrimEntity()
                trimEntity.trimCode = trim.trimCode
                trimEntity.description = trim.description
                trimEntity.colorId = trim.colorId
                trimEntity.consumption = trim.consumption
                trimEntity.consumptionUomId = trim.consumptionUomId
                trimEntity.consumptionUom = trim.consumptionUom
                trimEntity.issuedQuantity = trim.issuedQuantity
                trimEntity.issuedQuantityUom = trim.issuedQuantityUom
                trimEntity.issuedUomId = trim.issuedUomId
                trimEntity.remarks = trim.remarks
                trimInfo.push(trimEntity)
            }
            issueData.trim = trimInfo
            const save = await this.issueRepo.save(issueData)
            if (save) {
                return new MaterialIssueResponseModel(true, 1, 'Material Issued successfully', [])
            }
            else {
                return new MaterialIssueResponseModel(false, 0, 'Material Issuing Failed', [])
            }
        } catch (err) {
            throw (err)
        }
    }

    async getDataByStyleId(req: MaterialIssueRequest): Promise<CommonResponseModel> {
        try {
            const data = await this.fabricRepo.getDataByStyleId(req)
            console.log(req, '============')
            if (data.length > 0) {
                return new CommonResponseModel(true, 1, 'Data retrieved successfully', data)
            } else {
                return new CommonResponseModel(false, 0, 'No data found', [])
            }
        } catch (err) {
            throw (err)
        }
    }


    async getAllMaterialIssues(req?:buyerReq) {

        try {
            let dataquery = `SELECT 
            mi.material_issue_id,
            mi.consumption_code,
            mi.request_no,
            mi.issue_date,
            buy.buyer_name,
            mi.style_no,
            mi.po_number        
            FROM material_issue AS mi            
            LEFT JOIN buyers AS buy ON mi.buyer_id = buy.buyer_id`

            const res = await AppDataSource.query(dataquery);
            if (res) {
                return res;
            } if(req?.extRefNo){
                dataquery = dataquery+` where buy.external_ref_number = '${req.extRefNo}'`
            } else {
                console.log("NO data");
            }

        } catch (err) {
            console.log(err, "error");
            throw err;
        }

    }

    async getMaterialIssueDetailsById(req: MaterialIssueIdreq) {
        console.log(req, "id");

        try {
            let dataquery = `SELECT * , buy.buyer_name,br.brand_name,st.sample_type,loc.location_name
                FROM material_issue AS mi                
                LEFT JOIN location AS loc ON mi.location_id = loc.location_id
                LEFT JOIN buyers AS buy ON mi.buyer_id = buy.buyer_id
                LEFT JOIN sample_types AS st ON mi.sample_type_id = st.sample_type_id
                LEFT JOIN brands AS br ON mi.brand_id = br.brand_id
                
                WHERE material_issue_id = "${req.id}"`

            const res = await AppDataSource.query(dataquery);
            if (res) {
                console.log(res, "......................");
                return res;
            } else {
                console.log("NO data");
            }

        } catch (err) {
            console.log(err, "error");
            return err;
        }
    }

    async getAllFabricDetails(req: MaterialIssueIdreq) {
        console.log(req, "req")
        try {
            let dataquery = `SELECT * , col.colour AS fabric_colour
            FROM material_fabric AS mf            
            LEFT JOIN colour AS col ON col.colour_id = mf.color_id             
            WHERE material_issue_id = "${req.id}"`;

            const res = await AppDataSource.query(dataquery);
            if (res) {
                console.log(res, "......................");
                return res;
            } else {
                console.log("NO data");
            }

        } catch (err) {
            console.log(err, "error");
            return err;
        }
    }

    async getAllTrimDetails(req: MaterialIssueIdreq) {
        console.log(req, "req");
        try {
            let dataquery = `SELECT * , col.colour AS trim_colour
            FROM material_trim AS mt            
            LEFT JOIN colour AS col ON col.colour_id = mt.color_id             
            WHERE material_issue_id = "${req.id}"`;

            const res = await AppDataSource.query(dataquery);
            if (res) {
                console.log(res, "......................");
                return res;
            } else {
                console.log("NO data");
            }

        } catch (err) {
            console.log(err, "error");
            return err;
        }
    }

   
    
 async getMaterialIssue(req: RequestNoDto): Promise<CommonResponseModel> {
    console.log(req,'--------------')
    try {
        let query = `SELECT mi.material_issue_id AS id,mi.consumption_code AS consumptioncode,mi.request_no AS requestNo,mi.issue_date AS issue_date,mi.location_id AS locationId,l.location_name AS locationname,mi.pch_id AS profitControlId,ph.profit_control_head AS pch,mi.buyer_id AS buyer_id,b.buyer_name AS buyername,mi.sample_type_id AS sample_type_id,smp.sample_type AS sampleType,mi.style_no AS style_no,mi.description,mi.m3_style_no AS m3_style_no,mi.product,mi.type,fb.material_fabric_id AS materialcode,fb.fabric_code AS fabricCode,fb.consumption AS consumption,fb.consumption_uom AS fbconsumption_uom,fb.issued_quantity AS issued_quantity,fb.issued_quantity_uom AS fbissued_quantity_uom,tr.material_trim_id AS materialtrim_id,tr.description AS trimdescription,tr.color_id AS trimcolor_id,tr.consumption AS trimconsumption,tr.consumption_uom AS trimconsumption_uom,tr.issued_quantity AS trimissued_quantity,tr.issued_quantity_uom AS trimissued_quantity_uom,c.colour AS color,rm.item_code AS fabricCode,fb.status AS status,pg.product_group AS materialtype
    FROM material_issue mi
    LEFT JOIN material_fabric fb ON fb.material_issue_id = mi.material_issue_id
    LEFT JOIN material_trim tr ON tr.material_issue_id = mi.material_issue_id
    LEFT JOIN colour c ON c.colour_id = fb.color_id
    LEFT JOIN rm_items rm ON rm.item_code = fb.fabric_code
    LEFT JOIN product_group pg ON pg.product_group_id = rm.product_group_id
    LEFT JOIN location l ON l.location_id = mi.location_id
    LEFT JOIN sample_types smp ON smp.sample_type_id = mi.sample_type_id
    LEFT JOIN profit_control_head ph ON ph.profit_control_head_id = mi.pch_id
    LEFT JOIN buyers b ON b.buyer_id = mi.buyer_id`;
    // if (req && req.requestNo && req.consumption) {
    //     query += ` WHERE mi.request_no = "${req.requestNo}" AND mi.consumption_code = "${req.consumption}"`;
    //   };
    if(req.consumption){
        query += ` WHERE mi.consumption_code = '${req.consumption}'`
    }

        const data = await this.dataSource.query(query);
        if (data.length > 0) {
            const groupedData = data.reduce((result, item) => {
                 const id = item.id;
                const consumptionCode = item.consumptioncode;
                const style_no = item.style_no;
                const sampletype = item.sampleType;
                const pchId = item.pch;
                const date = item.issue_date;
                const locationId = item.locationname;
                const style = item.style;
                const m3_style_no = item.m3_style_no;
                const buyer = item.buyername;
                if (!result[consumptionCode]) {
                    result[consumptionCode] = {
                        material_issue_id: id,
                        consumptionCode: consumptionCode,
                        style: style_no,
                        sampleType: sampletype,
                        pch: pchId,
                        issue_date: date,
                        location: locationId,
                        m_style_no: style,
                        buyername: buyer,
                        m3StyleNo: m3_style_no,
                        mi_items: [],
                    };
                }
                result[consumptionCode].mi_items.push({
                    material_fabric_id: item.material_fabric_id,
                    productName: item.materialtype,
                    materialcode: item.fabricCode,
                    description: item.description,
                    color: item.color,
                    consumption: item.consumption,
                    issuedQuantity: item.issued_quantity,
                    status:item.status,



                });
                result[consumptionCode].mi_items.push({
                    material_trim_id: item.material_trim_id,
                    productName: item.materialtype,
                    materialcode: item.fabricCode,
                    description: item.description,
                    color: item.color,
                    consumption: item.consumption,
                    issuedQuantity: item.issued_quantity,
                    status:item.status,

                });
                return result;

            }, {});
            return new CommonResponseModel(true, 1, 'Data retrieved successfully', Object.values(groupedData));
        }
        return new CommonResponseModel(false, 0, 'No data found', []);
    } catch (error) {
        return ;
    }
}

    async getMaterialIssues(req:RequestNoDto): Promise<ResponesNoDropDownRes> {
        const data = await this.issueRepo.getMaterialIssues()

        if (data.length) {
            return new ResponesNoDropDownRes(true, 1, 'Inventory data Retrived Sucessfully', data)
        } else {
            return new ResponesNoDropDownRes(false, 6546, 'Inventory data Not Found', data)

        }

    }

    async createMaterialIssueLog(req: MaterialIssueLogDto): Promise<CommonResponseModel> {
        try {
                 console.log(req,"serviccc")
           const entity = new MaterialIssueLogEntity()
            entity.materialAllocationId = req.materialAllocationId
            // entity.materialIssueLogId = req.materialIssueLogId
            entity.buyerId = req.buyerId
            entity.locationId = req.locationId
            entity.allocateQuantity = req.allocateQuantity
            entity.itemType = req.itemType
            entity.sampleItemId = req.sampleItemId
            entity.sampleOrderId = req.sampleOrderId
            entity.m3ItemId = req.m3ItemId
            entity.createdUser = req.createdUser
            entity.stockId = req.stockId
            entity.quantity = req.allocateQuantity
            entity.buyer = req.buyer
            entity.loction = req.location
            entity.requestNo = req.requestNo
        
            
            const save = await this.matisslogRepo.save(entity)
            if (save) {
                return new CommonResponseModel(true, 1, 'Material Issued successfully', [])
            }
            else {
                return new CommonResponseModel(false, 0, 'Material Issuing Failed', [])
            }
        } catch (err) {
            throw (err)
        }
    }

    async getSampleReq():Promise<CommonResponseModel>{
        try{
            let query = `Select sr.request_no AS requestNo,sr.sample_request_id as requestId
            From material_allocation ma 
            LEFT JOIN sample_request sr ON sr.sample_request_id = ma.sample_order_id
            GROUP BY sr.request_no
            ORDER BY sr.request_no`
            const data = await this.dataSource.query(query)
            if (data.length>0) {
                return new CommonResponseModel(true, 1, 'Data retrieved successfully', data)
            }
            else {
                return new CommonResponseModel(false, 0, 'No data found', [])
            }
        }catch(err){
            throw(err)
        }
    }

    async getMaterialAllocationReport(req?: AllocationReportReq):Promise<CommonResponseModel>{
        try{
            let query = `SELECT ma.material_allocation_id,mai.material_allocation_items_id,ma.item_type AS itemType,ma.status,srfi.consumption as fabConsumption,
            srti.consumption as trimConsumption,sr.request_no AS requestNo,b.buyer_name AS buyerName,mai.quantity,SUM(mai.allocate_quantity) AS allocateQty,
            CASE WHEN ma.item_type = 'FABRIC' THEN srfi.consumption ELSE srti.consumption END AS combinedConsumption,rp.rack_position_name AS rackPosition
            FROM material_allocation ma
            LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
            LEFT JOIN sample_request sr ON sr.sample_request_id = ma.sample_order_id
            LEFT JOIN sample_request_fabric_info srfi ON srfi.fabric_info_id = ma.sample_item_id AND ma.item_type = 'FABRIC'
            LEFT JOIN sample_request_trim_info srti ON srti.trim_info_id = ma.sample_item_id AND ma.item_type != 'FABRIC'
            LEFT JOIN buyers b ON b.buyer_id = ma.buyer_id
            LEFT JOIN stocks s ON s.id = mai.stock_id
            LEFT JOIN rack_position rp ON rp.position_id = mai.location_id
            WHERE 1=1`
            if(req.requestNo){
                query += ` AND sr.request_no = '${req.requestNo}'`
            }
            if(req.rackPosition){
                query += ` AND rp.rack_position_name = '${req.rackPosition}'`
            }
            if(req.extRefNo){
                query += ` AND b.external_ref_number ='${req.extRefNo}'`
            }
            query += ` GROUP BY ma.sample_order_id,ma.item_type`

            const data = await this.dataSource.query(query)
            if(data.length > 0){
                // const groupData = data.reduce((result,item)=>{
                //     const buyerName = item?.buyerName
                //     const requestNo = item?.requestNo
                //     const allocateQty = item?.allocateQty
                //     const status = item?.status

                //     if(!result[requestNo]){
                //         result[requestNo]={
                //             requestNo : requestNo,
                //             buyerName : buyerName,
                //             allocateQty : allocateQty,
                //             status: status,
                //             subData:[],
                //         }
                //     }
                //     result[requestNo].subData.push({
                //         requestNo: item?.requestNo,
                //         itemType: 'Fabric',
                //         consumption: item?.fabConsumption,
                //     })
                //     result[requestNo].subData.push({
                //         requestNo: item?.requestNo,
                //         itemType: item?.itemType != 'Fabric',
                //         consumption: item?.trimConsumption
                //     })
                //     return result
                // },{})
                return new CommonResponseModel(true,1,'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false,0,'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getRackPositions():Promise<CommonResponseModel>{
        try{
            let query = `Select rp.rack_position_name AS rackPosition,rp.position_id as positionId
            From material_allocation ma 
            LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
            LEFT JOIN rack_position rp ON rp.position_id = mai.location_id
            GROUP BY rp.rack_position_name
            ORDER BY rp.rack_position_name`
            const data = await this.dataSource.query(query)
            if (data.length>0) {
                return new CommonResponseModel(true, 1, 'Data retrieved successfully', data)
            }
            else {
                return new CommonResponseModel(false, 0, 'No data found', [])
            }
        }catch(err){
            throw(err)
        }
    }

}



