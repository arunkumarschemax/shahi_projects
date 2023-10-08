import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { SampleRequest } from './sample-dev-request.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { SampleDevAdapter } from './dto/sample-dev-request.adapter';
import { AllSampleDevReqResponseModel, CommonResponseModel, SampleDevDto, SampleDevelopmentStatusEnum, SampleFilterRequest } from '@project-management-system/shared-models';
import { SampleDevReqDto } from './dto/sample-dev-dto';
import { SampleRequestRepository } from './sample-dev-req-repo';
import { SampleSizeRepo } from './repo/sample-dev-size-repo';
import { SampleRequestDto } from './dto/samle-dev-req';
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

@Injectable()
export class SampleDevReqService {
  
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

    // async getAllSampleDevData(request? : SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    //   try {
    //     const dtoData: SampleDevReqDto[] = []
    //     const entity: SampleRequest[] = await this.sampleRepo.getAllSampleDevData(request)
    //     console.log(this.sampleRepo.getAllSampleDevData(request),'|||||||||||||||||')
    //     if (entity.length > 0) {
    //       entity.forEach(entity => {
    //         const convertedData: SampleDevReqDto = this.sampleAdapter.convertEntityToDto(entity);
    //         dtoData.push(convertedData);
    //       });
    //       const response = new AllSampleDevReqResponseModel(true,1,'Data retrieved successfully',dtoData);
    //       return response;
    //     } else {
    //       throw new ErrorResponse(100, 'No Data found');
    //     }
    //   } catch (err) {
    //     return err;
    //   }
    // }

  //   async getAllSampleReqNo(request? : SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
  //     const details = await this.sampleRepo.find({select: ['requestNo'],where : { requestNo: request.reqNo}});
  //     let info =[];
  //     if (details) {
  //             info.push(new SampleDevDto(null,null,null,details.requestNo,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null))
  //         return new AllSampleDevReqResponseModel(true, 1, 'data retrieved', info)
  //     } else {
  //         return new AllSampleDevReqResponseModel(false, 0, 'data not found')
  //     }
  // }


  async getAllSampleReqNo(): Promise<AllSampleDevReqResponseModel> {
    const details = await this.sampleRepo.getAllSampleReqNo();     
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrived', details)
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