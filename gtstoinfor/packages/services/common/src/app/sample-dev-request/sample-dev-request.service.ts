import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Raw, Repository } from 'typeorm';
import { SampleRequest } from './entities/sample-dev-request.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { SampleDevAdapter } from './dto/sample-dev-request.adapter';
import { AllSampleDevReqResponseModel, CommonResponseModel, SampleDevDto, SampleDevelopmentStatusEnum, SampleFilterRequest, SampleReqResponseModel } from '@project-management-system/shared-models';
import { SampleDevReqDto } from './dto/sample-dev-dto';
import { SampleRequestRepository } from './repo/sample-dev-req-repo';
import { SampleDevRequest } from './dto/samle-dev-req';

@Injectable()
export class SampleRequestService {
  
    constructor(
        private sampleRepo: SampleRequestRepository,
        private sampleAdapter: SampleDevAdapter,
        @InjectDataSource()
        private dataSource: DataSource,
      ){}

    async getAllSampleDevData(request? : SampleFilterRequest): Promise<SampleReqResponseModel> {
      try{
          const details = await this.sampleRepo.getAllSampleDevData(request)
          if(details.length > 0){
              let info = [];
              for(const data of details){
                info.push(new SampleDevRequest(data.SampleRequestId,data.locationId,data.requestNo,data.styleId,data.pchId,data.buyerId,data.sampleTypeId,data.sampleSubTypeId,data.brandId,data.costRef,data.m3StyleNo,data.contact,data.extension,data.samValue,data.dmmId,data.technicianId,data.product,data.type,data.conversion,data.madeIn,data.facilityId,data.status,data.samplereqsizeinfo,data.samplereqfabricinfo,data.sampleTrimInfo,data.sampleProcessInfo))
              }
              return new SampleReqResponseModel(true,0,'All locations retrieved successfully',info)
          } else {
              return new SampleReqResponseModel(false,1,'No data found',[])
          }
      } catch(err) {
          throw err
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

}