import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { SampleRequestService } from './sample-dev-request.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllROSLGroupsResponseModel, AllSampleDevReqResponseModel, ROSLGroupsResponseModel, SampleFilterRequest, SampleReqResponseModel } from '@project-management-system/shared-models';


@ApiTags('sample-request')
@Controller('sample-request')
export class SampleDevReqController {
    constructor(private sampleService: SampleRequestService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}


  @Post('/getAllSampleDevData')
  async getAllSampleDevData(@Body() req?:SampleFilterRequest): Promise<SampleReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleDevData(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(SampleReqResponseModel, error);
    }
  }

  // @Post('/getAllSampleReqNo')
  // async getAllSampleReqNo(): Promise<AllSampleDevReqResponseModel> {
  //   try {
  //     return await this.sampleService.getAllSampleReqNo();
  //   } catch (error) {
  //     return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
  //   }
  // }

  // @Post('/cancelSampleReqById')
  // @ApiBody({type: SampleFilterRequest})
  // async cancelSampleReqById(@Body() req : any): Promise<AllSampleDevReqResponseModel> {
  //   try {
  //     console.log(req,'controller')
  //     return await this.sampleService.cancelSampleReqById(req);
  //   } catch (error) {
  //     return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
  //   }
  // }
  @Post('/createSmapleDevlopmentRequest')
  async createSmapleDevlopmentRequest(@Body() req:any):Promise<AllSampleDevReqResponseModel>{
    try{
    return await this.sampleService.createSmapleDevlopmentRequest(req)
    }
    catch(err){
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, err);
    }
  }
}
