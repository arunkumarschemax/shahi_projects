import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Raw, Repository } from 'typeorm';
import { SampleRequest } from './entities/sample-dev-request.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { SampleDevAdapter } from './dto/sample-dev-request.adapter';
import { AllSampleDevReqResponseModel, CommonResponseModel, SampleDevDto, SampleDevelopmentStatusEnum, SampleFilterRequest, SampleReqResponseModel } from '@project-management-system/shared-models';
import { SampleDevReqDto } from './dto/sample-dev-dto';
import { SampleSizeRepo } from './repo/sample-dev-size-repo';
import { Location } from '../locations/location.entity';
import { Style } from '../style/dto/style-entity';
import { ProfitControlHead } from '../profit-control-head/profit-control-head-entity';
import { Buyers } from '../buyers/buyers.entity';
import { SampleFabricRepo } from './repo/sample-dev-fabric-repo';
import { SampleTrimRepo } from './repo/sample-dev-trim-repo';
import { SampleTypes } from '../sample Types/sample-types.entity';
import { SampleSubTypes } from '../sample-sub-types/sample-sub-types.entity';
import { Brands } from '../master-brands/master-brands.entity';
import { EmplyeeDetails } from '../employee-details/dto/employee-details-entity';
import { SampleReqSizeEntity } from './entities/sample-requset-size-info-entity';
import { SampleReqFabricinfoEntity } from './entities/sample-request-fabric-info-entity';
import { SampleRequestTriminfoEntity } from './entities/sample-request-trim-info-entity';
import { SampleRequestProcessInfoEntity } from './entities/sample-request-process-info-entity';
import { SampleRequestRepository } from './repo/sample-dev-req-repo';
import { SampleDevRequest } from './dto/samle-dev-req';



@Injectable()
export class SampleRequestService {
  
    constructor(
        private sampleRepo: SampleRequestRepository,
        private sampleAdapter: SampleDevAdapter,
        private sizerepo:SampleSizeRepo,
        private fabricRepo:SampleFabricRepo,
        private sampletrimrepo:SampleTrimRepo

      ){}

    async getAllSampleDevData(request? : SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
      try {
        const dtoData: SampleDevReqDto[] = []
        const entity: SampleRequest[] = await this.sampleRepo.find({relations: ['location','style','pch','buyer','sampleType','sampleSubType','brand','dmm','technician']});
        if (entity.length > 0) {
          entity.forEach(entity => {
            const convertedData: SampleDevReqDto = this.sampleAdapter.convertEntityToDto(entity);
            dtoData.push(convertedData);
          });
          const response = new AllSampleDevReqResponseModel(true,1,'Data retrieved successfully',[]);
          return response;
        } else {
          throw new ErrorResponse(100, 'No Data found');
        }
      } catch (err) {
        return err;
      }
  }

//   async getAllSampleDevData(req? : SampleFilterRequest): Promise<SampleReqResponseModel> {
//     let query = `SELECT sample_request_id,request_no,cost_ref,m3_style_no,contact,extension,sam_value,product,type,conversion,made_in,facility_id,status,location_id,style_id,
//     profit_control_head_id,buyer_id,sample_type_id,sample_sub_type_id,brand_id,dmm_id,technician_id
//     FROM sample_request WHERE 1=1 `
//     if (req.reqNo !== undefined) {
//       query = query + (`AND request_no ='${req.reqNo}'`)
//   }
//   if (req.pch !== undefined) {
//       query = query + (`AND profit_control_head_id ='${req.pch}'`)
//   }
//   if (req.style !== undefined) {
//       query = query + (`AND style_id ='${req.style}'`)
//   }
//   if (req.status !== undefined) {
//       query = query +(`AND status ='${req.status}'`)
//   }
//   query = query + `ORDER BY sample_request_id`;
//   const queryData = await this.dataSource.query(query);
//   if(queryData.length > 0){
//     let info = [];
//     for(const data of queryData){
//       info.push(new SampleDevRequest(data.SampleRequestId,data.locationId,data.requestNo,data.styleId,data.pchId,data.buyerId,data.sampleTypeId,data.sampleSubTypeId,data.brandId,data.costRef,data.m3StyleNo,data.contact,data.extension,data.samValue,data.dmmId,data.technicianId,data.product,data.type,data.conversion,data.madeIn,data.facilityId,data.status,data.samplereqsizeinfo,data.samplereqfabricinfo,data.sampleTrimInfo,data.sampleProcessInfo))
//     }
//     return new SampleReqResponseModel(true,0,'All locations retrieved successfully',info)
// } else {
//     return new SampleReqResponseModel(false,1,'No data found',[])
// }
// }


  async getAllSampleReqNo(): Promise<AllSampleDevReqResponseModel> {
    const details = await this.sampleRepo.getAllSampleReqNo();     
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', details)
    } else {
      return new CommonResponseModel(false, 0, 'data not found')
    }
}

  async cancelSampleReqById(request : SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    try {
      const sampleReq = await this.sampleRepo.findOne({ where: { SampleRequestId: request.sampleId  } })
      if (sampleReq) {
        const updateResult = await this.sampleRepo.update({ SampleRequestId: request.sampleId }, { status: SampleDevelopmentStatusEnum.CANCELLED })
        if (updateResult) {
          return new AllSampleDevReqResponseModel(true, 1, 'Sample Request cancelled successfully', undefined)
        }
      } else {
        return new AllSampleDevReqResponseModel(false, 0, 'No Sample Request found', [])
      }
    } catch (err) {
      throw err;
    }
  }


  async createSmapleDevlopmentRequest(req:SampleDevRequest):Promise<AllSampleDevReqResponseModel>{
    try{
      const samplereqEntity = new SampleRequest();
      const locationentity = new Location()
      locationentity.locationId=req.locationId
      samplereqEntity.location=locationentity
      samplereqEntity.requestNo=req.requestNo
      const styleEntity = new Style()
      styleEntity.styleId=req.styleId
      samplereqEntity.style=styleEntity
      const profitHead = new ProfitControlHead()
      profitHead.profitControlHeadId=req.pchId
      samplereqEntity.pch=profitHead
      const buyer = new Buyers()
      buyer.buyerId=req.buyerId
      samplereqEntity.buyer=buyer
      const samType = new SampleTypes()
      samType.sampleTypeId=req.sampleTypeId
      samplereqEntity.sampleType=samType
      const samSubType = new SampleSubTypes()
      samSubType.sampleSubTypeId=req.sampleSubTypeId
      samplereqEntity.sampleSubType = samSubType
      const brand = new Brands()
      brand.brandId=req.brandId
      samplereqEntity.brand=brand
      samplereqEntity.costRef=req.costRef
      samplereqEntity.m3StyleNo=req.m3StyleNo
      samplereqEntity.contact=req.contact
      samplereqEntity.extension=req.extension
      samplereqEntity.samValue=req.samValue
      const dmm = new EmplyeeDetails()
      dmm.employeeId=req.dmmId
      samplereqEntity.dmm=dmm
      const employee = new EmplyeeDetails()
      employee.employeeId=req.technicianId
      samplereqEntity.technician=employee
      samplereqEntity.product=req.product
      samplereqEntity.type=req.type
      samplereqEntity.conversion=req.conversion
      samplereqEntity.madeIn=req.madeIn
      samplereqEntity.facilityId=req.facilityId
      samplereqEntity.status=req.status

      let sampleSizeInfo =[]
      let sampleFabricInfo =[]
      let sampleTrimInfo =[]
      let sampleProcessInfo =[]
      for(const size of req.samplereqsizeinfo){
        const sizeentity = new SampleReqSizeEntity()
        sizeentity.colourId=size.colourId
        sizeentity.sizeId=size.sizeId
        sizeentity.quantity=size.quantity
        sampleSizeInfo.push(sizeentity)
        console.log(sampleSizeInfo)
      }
      samplereqEntity.samplereqsizeinfo=sampleSizeInfo
      for(const fabricObj of req.samplereqfabricinfo){
        const fabricEntity = new SampleReqFabricinfoEntity()
        fabricEntity.fabricCode=fabricObj.fabricCode
        fabricEntity.description=fabricObj.description
        fabricEntity.colourId=fabricObj.colourId
        fabricEntity.consumption=fabricObj.consumption
        fabricEntity.remarks=fabricObj.remarks
        sampleFabricInfo.push(fabricEntity)
      }
      samplereqEntity.samplereqfabricinfo=sampleFabricInfo
      for(const trimObj of req.sampleTrimInfo){
        const trimEntity = new SampleRequestTriminfoEntity()
        trimEntity.consumption=trimObj.consumption
        trimEntity.description=trimObj.description
        trimEntity.remarks=trimObj.remarks
        sampleTrimInfo.push(trimEntity)
      }
      samplereqEntity.sampleTrimInfo=sampleTrimInfo
      for(const processobj of req.sampleProcessInfo){
        const processEntity = new SampleRequestProcessInfoEntity()
        processEntity.process=processobj.process
        processEntity.description=processobj.description
        sampleProcessInfo.push(processEntity)
      }
      samplereqEntity.sampleProcessInfo=sampleProcessInfo
      const save = await this.sampleRepo.save(samplereqEntity)
      if(save){
        return new AllSampleDevReqResponseModel(true,1,'SampleDevelopmentRequest created sucessfullyy',[])

      }else{
        return new AllSampleDevReqResponseModel(false,0,'SampleDevelopmentRequest creatation Failed',[])
      }
    }
    catch(err){
      throw err
    }

  }

  
}