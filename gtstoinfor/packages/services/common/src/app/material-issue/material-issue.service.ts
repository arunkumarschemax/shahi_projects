import { Injectable } from "@nestjs/common";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest, OperationTrackingResponseModel, OperationTrackingDto, OperationInventoryDto, OperationInventoryResponseModel, TrackingEnum, MaterialIssueResponseModel, MaterialIssueRequest } from "@project-management-system/shared-models";
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


@Injectable()
export class MaterialIssueService {
    constructor(
        private issueRepo: MaterialIssueRepository,
        private fabricRepo: MaterialFabricRepository,
        private trimRepo: MaterialTrimRepository
        // private readonly dataSource: DataSource,
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
                    fromDate = (CurrentYear-1);
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
                for(const fabric of req.fabricInfo){
                    const fabricEntity = new MaterialFabricEntity()
                    fabricEntity.fabricCode = fabric.fabricCode
                    fabricEntity.description = fabric.description
                    fabricEntity.colorId = fabric.colorId
                    fabricEntity.consumption = fabric.consumption
                    fabricEntity.consumptionUom = fabric.consumptionUom
                    fabricEntity.uomId = fabric.uomId
                    fabricEntity.issuedQuantity = fabric.issuedQuantity
                    fabricEntity.issuedQuantityUom = fabric.issuedQuantityUom
                    fabricEntity.issuedUomId = fabric.issuedUomId
                    fabricEntity.remarks = fabric.remarks
                    fabricInfo.push(fabricEntity)
                }
                issueData.fabric = fabricInfo
                for(const trim of req.trimInfo){
                    const trimEntity = new MaterialTrimEntity()
                    trimEntity.description = trim.description
                    trimEntity.colorId = trim.colorId
                    trimEntity.consumption = trim.consumption
                    trimEntity.uomId = trim.uomId
                    trimEntity.consumptionUom = trim.consumptionUom
                    trimEntity.issuedQuantity = trim.issuedQuantity
                    trimEntity.issuedQuantityUom = trim.issuedQuantityUom
                    trimEntity.issuedUomId = trim.issuedUomId
                    trimEntity.remarks = trim.remarks
                    trimInfo.push(trimEntity)
                }
                issueData.trim = trimInfo
                const save = await this.issueRepo.save(issueData)
                if(save){
                    return new MaterialIssueResponseModel(true,1,'Material Issued successfully',[])
                }
                else{
                    return new MaterialIssueResponseModel(false,0,'Material Issuing Failed',[])
                }
            }catch(err){
                throw(err)
            }
        }

    async getDataByStyleId(req: MaterialIssueRequest):Promise<CommonResponseModel>{
        try{
            const data = await this.fabricRepo.getDataByStyleId(req)
            console.log(req,'============')
            if(data.length > 0){
                return new CommonResponseModel(true,1,'Data retrieved successfully',data) 
            }else{
                return new CommonResponseModel(false,0,'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }
    // async getMaterialIssue():Promise<CommonResponseModel>{
    //     try{
    //         const data = await this.issueRepo.getMaterialIssue()
    //         if(data.length>0){
    //             const groupedData = data.reduce((result,item)=>{
    //                 const requestNo = item.request_no;
    //                 const consumptionCode = item.consumption_code;
    //                 if(!result[requestNo]){
    //                     result[requestNo]={
    //                         request_no:requestNo,
    //                         consumption_code: consumptionCode,
    //                         mi_items:[],
    //                     };
    //                 }
    //                 result[requestNo].mi_items.push({
    //                     material_fabric_id:item.material_fabric_id,
    //                     fabric_code:item.fabric_code,
    //                 });
    //                 return result;
    //             },{});
            
           
    //             return new CommonResponseModel(true,1,'Data retrieved successfully',Object.values(groupedData) )
    //     }
    //             return new CommonResponseModel(false,0,'No data found',[])
            
    //     }
    // }
    async getMaterialIssue(): Promise<CommonResponseModel> {
        try {
          const data = await this.issueRepo.getMaterialIssue(); 
    
          if (data.length > 0) {
            const groupedData = data.reduce((result, item) => {
              const requestNo = item.requestNo;
              const consumptionCode = item.consumptioncode;
              const styleno = item.styleno;
              const sampletype = item.sampletype;
              const pchId = item.pchId;
              const date = item.date;
              const locationId = item.locationId;
              const style = item.style;
              const buyer = item.buyer;
              if (!result[consumptionCode]) {
                result[consumptionCode] = {
                  request_no: requestNo,
                  consumption_code: consumptionCode,
                  style_no:styleno,
                  sample_type_id:sampletype,
                  pch_id:pchId,
                  issue_date:date,
                  location_id:locationId,
                  m_style_no:style,
                  buyer_id:buyer,
                  mi_items: [],
                };
              }
              result[consumptionCode].mi_items.push({
                material_fabric_id: item.material_fabric_id,
                material_trim_id:item.material_trim_id,
                fabricCode: item.fabricCode ,
                fbdescription:item.fbdescription,
                colour:item.colour,
                consumption:item.consumption,
                issuedQuantity:item.issuedQuantity,



              });
              return result;
            }, {});
    
            return new CommonResponseModel(true, 1, 'Data retrieved successfully', Object.values(groupedData));
          }
          return new CommonResponseModel(false, 0, 'No data found', []);
        } catch (error) {
          return new CommonResponseModel(false, 0, 'An error occurred', []);
        }
      }
}