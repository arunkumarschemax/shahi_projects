import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import {CommonResponseModel } from '@project-management-system/shared-models';
import { GaugeService } from './gauge.service';
import { GaugeDTO } from './dto/gauge.dto';

@ApiTags('gauge')
@Controller('gauge')
export class GaugeController {


    constructor(
        private readonly gaugeService: GaugeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/getAllGauge')
      async getAllGauge(): Promise<CommonResponseModel> {
          try {
           return await this.gaugeService.getAllGauge();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/createGauge')
      @ApiBody({type: GaugeDTO})
      async createGauge(@Body() req:any): Promise<CommonResponseModel> {
          try {
           return await this.gaugeService.createGauge(req, false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/updateGauge')
      @ApiBody({type: GaugeDTO})
      async updateGauge(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.gaugeService.createGauge(req, true)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/activateOrDeactivateGauge')
      @ApiBody({type: GaugeDTO})
      async activateOrDeactivateGauge(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.gaugeService.activateOrDeactivateGauge(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getAllActiveGauge')
      async getAllActiveGauge(): Promise<CommonResponseModel>{
          try{
              return await this.gaugeService.getAllActiveGauge()
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getGaugeById')
      @ApiBody({type: GaugeDTO})
      async getGaugeById(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.gaugeService.getGaugeById(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }



}

