import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { SampleRequest } from './sample-dev-request.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { SampleDevAdapter } from './dto/sample-dev-request.adapter';
import { AllSampleDevReqResponseModel, CommonResponseModel, SampleDevDto, SampleFilterRequest } from '@project-management-system/shared-models';
import { SampleDevReqDto } from './dto/sample-dev-dto';
import { SampleRequestRepository } from './sample-dev-req-repo';

@Injectable()
export class SampleDevReqService {
  
    constructor(
        @InjectRepository(SampleRequest)
        private sampleRepo: SampleRequestRepository,
        private sampleAdapter: SampleDevAdapter,
      ){}

    async getAllSampleDevData(): Promise<AllSampleDevReqResponseModel> {
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

    async getAllSampleReqNo(request : SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
      const details = await this.sampleRepo.findOne({select: ['requestNo'],where : { requestNo: request.reqNo}});
      let info =[];
      if (details) {
              info.push(new SampleDevDto(null,null,null,details.requestNo,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null))
          return new AllSampleDevReqResponseModel(true, 1, 'data retrieved', info)
      } else {
          return new AllSampleDevReqResponseModel(false, 0, 'data not found')
      }
  }

}