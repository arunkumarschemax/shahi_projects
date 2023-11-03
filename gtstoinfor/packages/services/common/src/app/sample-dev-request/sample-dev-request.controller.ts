import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { SampleRequestService } from './sample-dev-request.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllROSLGroupsResponseModel, AllSampleDevReqResponseModel, CommonResponseModel, ROSLGroupsResponseModel, SampleDevDto, SampleFilterRequest, SampleReqResponseModel } from '@project-management-system/shared-models';
import { SampleRequestDto } from './dto/samle-dev-req';


@ApiTags('sample-request')
@Controller('sample-request')
export class SampleDevReqController {
    constructor(private sampleService: SampleRequestService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}


  @Post('/getAllSampleDevData')
  @ApiBody({type: SampleFilterRequest})
  async getAllSampleDevData(@Body() req?:any): Promise<AllSampleDevReqResponseModel> {
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

  @Post('/createSampleDevelopmentRequest')
  @ApiBody({type: SampleRequestDto})
  async createSampleDevelopmentRequest(@Body() req:any):Promise<AllSampleDevReqResponseModel>{
    try{
    return await this.sampleService.createSampleDevelopmentRequest(req)
    }
    catch(err){
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, err);
    }
  }

  @Post('/getAllPCH')
  async getAllPCH(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllPCH();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getAllStyleNo')
  async getAllStyleNo(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllStyleNo();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
}
