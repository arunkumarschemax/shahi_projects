import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { SampleDevReqService } from './sample-dev-request.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllROSLGroupsResponseModel, AllSampleDevReqResponseModel, ROSLGroupsResponseModel, SampleFilterRequest } from '@project-management-system/shared-models';


@ApiTags('sample-request')
@Controller('sample-request')
export class SampleDevReqController {
    constructor(private sampleService: SampleDevReqService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}


  @Post('/getAllSampleDevData')
  async getAllSampleDevData(): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleDevData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/getAllSampleReqNo')
  async getAllSampleReqNo(@Body() req : SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleReqNo(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }
}
