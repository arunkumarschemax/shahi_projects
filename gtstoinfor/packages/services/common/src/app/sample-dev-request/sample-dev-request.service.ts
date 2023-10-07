import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { SampleRequest } from './sample-dev-request.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { SampleDevAdapter } from './dto/sample-dev-request.adapter';
import { AllSampleDevReqResponseModel, CommonResponseModel, SampleDevDto, SampleDevelopmentStatusEnum, SampleFilterRequest } from '@project-management-system/shared-models';
import { SampleDevReqDto } from './dto/sample-dev-dto';
import { SampleRequestRepository } from './sample-dev-req-repo';

@Injectable()
export class SampleDevReqService {
  
    constructor(
        @InjectRepository(SampleRequest)
        private sampleRepo: SampleRequestRepository,
        private sampleAdapter: SampleDevAdapter,
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
          const response = new AllSampleDevReqResponseModel(true,1,'Data retrieved successfully',dtoData);
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

}