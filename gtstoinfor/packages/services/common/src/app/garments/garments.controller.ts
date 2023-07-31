import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { GarmentsDTO } from './dto/garments.dto';
import { GarmentsService } from './garments.service';
// import { CurrencyResponseModel, AllCurrencyResponseModel } from '@gtpl/shared-models/masters';
// import { CurrencyRequest } from './dto/currencies.request';
// import { UserRequestDto } from './dto/user-logs-dto';
import { AllCurrencyResponseModel, AllGarmentResponseModel, CurrencyResponseModel, GarmentResponseModel } from '@project-management-system/shared-models';
import { GarmentRequest } from './dto/garments.request';

@ApiTags('garments')
@Controller('garments')
export class GarmentsController {
    constructor(
        private garmentsService: GarmentsService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
    @Post('/createGarment')
    async createGarment(@Body() garmentDto:GarmentsDTO,isUpdate:boolean=false): Promise<GarmentResponseModel> {
    try {
    //   console.log('createCurrency',currenciesDto)
        return await this.garmentsService.createGarment(garmentDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(GarmentResponseModel, error);
      }
    }
    @Post('/updateGarment')
    async updateGarment(@Body() garmentDto: GarmentsDTO,@Req() request:Request): Promise<GarmentResponseModel> {
      try {
        // console.log('update Currency');
        console.log(request);
        return await this.garmentsService.createGarment(garmentDto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(GarmentResponseModel, error);
      }
    }
    @Post('/getAllGarments')
  async getAllGarments(): Promise<AllGarmentResponseModel> {
    try {
          return await this.garmentsService.getAllGarments();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllGarmentResponseModel, error);
    }
  }
  @Post('/getAllActiveGarments')
  async getAllActiveGarments(): Promise<AllGarmentResponseModel> {
      try {
          return await this.garmentsService.getAllActiveGarments();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllGarmentResponseModel, error)
      }
  }
  @Post('/activateOrDeactivateGarment')
  async activateOrDeactivateGarment(@Body() garmentreq: GarmentRequest): Promise<GarmentResponseModel> {
      try {
          return await this.garmentsService.activateOrDeactivateGarment(garmentreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(GarmentResponseModel, err);
      }
  }
  @Post('/getGarmentById')
  async getGarmentById(@Body() garmentreq: GarmentRequest): Promise<GarmentResponseModel> {
      try {
          return await this.garmentsService.getActiveGarmentById(garmentreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(GarmentResponseModel, err);
      }
  }
}
