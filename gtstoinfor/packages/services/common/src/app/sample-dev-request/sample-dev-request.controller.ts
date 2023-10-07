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
  async getAllSampleDevData(@Body() req?:SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleDevData(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/getAllSampleReqNo')
  async getAllSampleReqNo(): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleReqNo();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/cancelSampleReqById')
  @ApiBody({type: SampleFilterRequest})
  async cancelSampleReqById(@Body() req : any): Promise<AllSampleDevReqResponseModel> {
    try {
      console.log(req,'controller')
      return await this.sampleService.cancelSampleReqById(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }
}
