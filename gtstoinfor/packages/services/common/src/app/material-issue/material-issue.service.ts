import { Injectable } from "@nestjs/common";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest, OperationTrackingResponseModel, OperationTrackingDto, OperationInventoryDto, OperationInventoryResponseModel, TrackingEnum, MaterialIssueResponseModel, MaterialIssueRequest, MaterialIssueIdreq, MaterialFabricEnum, ResponesNoDropDownRes, RequestNoDto, MaterialIssueReportsDto, MaterialReportsResponse } from "@project-management-system/shared-models";
import { Item } from "../items/item-entity";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { DataSource, Entity } from "typeorm";
import { MaterialIssueRepository } from "./repo/material-issue-repository";
import { MaterialFabricRepository } from "./repo/material-fabric-repository";
import { MaterialTrimRepository } from "./repo/material-trim-repository";
import { MaterialIssueEntity } from "./entity/material-issue-entity";
import { LocationEntity } from '../locations/location.entity';
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


@Injectable()
export class MaterialIssueService {
    constructor(
        private issueRepo: MaterialIssueRepository,
        private fabricRepo: MaterialFabricRepository,
        private trimRepo: MaterialTrimRepository,
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


    async getAllMaterialIssues() {

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

    async getMaterialIssue(req: RequestNoDto): Promise<MaterialReportsResponse> {
        const materialIssueData = await this.issueRepo.getMaterialData();
        if (materialIssueData.length) {
            for (const tRec of materialIssueData) {
                tRec.fabricData = await this.fabricRepo.findfbDataThroughMiId(tRec.id);
                for (const itemCode of tRec.fabricData) {
                    const rmQuery = `Select rm.item_code AS fabricCode ,rm.product_group_id as productGroupId from rm_items rm WHERE rm.item_code = "${itemCode.itemCode}"`;
                    const rmData = await this.dataSource.query(rmQuery);
                    itemCode.itemCode = rmData[0]?.fabricCode;
                    const grpQuery = `Select pg.product_group AS materialtype from product_group pg WHERE pg.product_group_id = "${rmData[0].productGroupId}"`
                    const grpData = await this.dataSource.query(grpQuery);
                    itemCode.productName = grpData[0]?.materialtype;
                };
                tRec.trimData = await this.trimRepo.findTrimDataThroughMiId(tRec.id);
                for (const trm of tRec.trimData) {
                    const rmQuery = `Select rm.item_code AS fabricCode ,rm.product_group_id as productGroupId  from rm_items rm WHERE rm.item_code = "${trm.itemCode}"`;
                    const rmData = await this.dataSource.query(rmQuery);
                    trm.itemCode = rmData.fabricCode;
                    const grpQuery = `Select pg.product_group AS materialtype from product_group pg WHERE pg.product_group_id = "${rmData[0]?.productGroupId}"`
                    const grpData = await this.dataSource.query(grpQuery);
                    trm.productName = grpData.materialtype;
                };

            };

        };
        console.log(materialIssueData, "laaast ")
        return new MaterialReportsResponse(true, 1, 'Data retrieved successfully', materialIssueData);

    };

    async getMaterialIssues(): Promise<ResponesNoDropDownRes> {
        const data = await this.issueRepo.getMaterialIssues()
        if (data.length) {
            return new ResponesNoDropDownRes(true, 1, 'Inventory data Retrived Sucessfully', data)
        } else {
            return new ResponesNoDropDownRes(false, 6546, 'Inventory data Not Found', data)

        }

    }
}



