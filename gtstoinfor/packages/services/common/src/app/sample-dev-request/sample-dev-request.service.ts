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
import { SampleRequestDto } from './dto/samle-dev-req';



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
      try{
          const details = await this.sampleRepo.getAllSampleDevData(request)
          // for(const data of details){
          //   data.samplereqsizeinfo = await this.sizerepo.getAllSizeData(data.sampleId)
          //   data.samplereqfabricinfo = await this.fabricRepo.getAllFabricData(data.sampleId)
          // }
          if(details.length > 0){
              return new AllSampleDevReqResponseModel(true,0,'All Sample Requests retrieved successfully',details)
          } else {
              return new AllSampleDevReqResponseModel(false,1,'No data found',[])
          }
      } catch(err) {
          throw err
      }
  }


  async getAllSampleReqNo(): Promise<CommonResponseModel> {
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

  async getAllPCH(): Promise<CommonResponseModel> {
    const details = await this.sampleRepo.getAllPCH();     
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', details)
    } else {
      return new CommonResponseModel(false, 0, 'data not found')
    }
}

  async createSmapleDevlopmentRequest(req:SampleRequestDto):Promise<AllSampleDevReqResponseModel>{
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
      }
      else{
        return new AllSampleDevReqResponseModel(false,0,'SampleDevelopmentRequest creatation Failed',[])
      }
    }
    catch(err){
      throw err
    }

  }
  
  async getAllStyleNo(): Promise<CommonResponseModel> {
    const details = await this.sampleRepo.getAllStyleNo();     
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', details)
    } else {
      return new CommonResponseModel(false, 0, 'data not found')
    }
  }


}