import { Body, Controller, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import {FactoryResponseModel} from '../../../../../libs/shared-models/src/common/factory/factory-response-objects'
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { AllFactoriesResponseModel, AllFobResponseModel, CommonResponseModel, FobFilterRequest, FobResponseModel } from '@project-management-system/shared-models';
import { ApiBody } from '@nestjs/swagger';
import { FobService } from './fob.service';
import { FobDto } from './dto/fob.dto';


@Controller('/fobPriceList')
export class FobController {
    constructor(
        private fobService: FobService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
        ) { }

    @Post('/createFobplist')
    @ApiBody({type:FobDto})
    async createFobplist(@Body() Dto:any): Promise<FobResponseModel>{
        try{
            return await this.fobService.createFobplist(Dto,false)
        }catch(error){
            return this.applicationExceptionhandler.returnException(FobResponseModel, error)
        }
    }

   @Post('/updateFobplist')
   @ApiBody({type:FobDto})
  async updateFobplist(@Body()request:any): Promise<FobResponseModel> {
    try {
       
      return await this.fobService.createFobplist(request, true);
    } catch (error) {
      return this.applicationExceptionhandler.returnException(FobResponseModel, error);
    }
  }

    // @Post('/getFobPrice')
    // async getFobPrice(): Promise<FobResponseModel>{
    //     try{
    //         return await this.fobService.getFobPrice()
    //     }catch(error){
    //         return this.applicationExceptionhandler.returnException(FobResponseModel, error)
    //     }
    // }

    @Post('/getFobPrice')
    @ApiBody({type:FobFilterRequest})
  
    async getFobPrice(@Body() req?:any): Promise<FobResponseModel>{
        try{
            return await this.fobService.getFobPrice(req)
        }catch(error){
            return this.applicationExceptionhandler.returnException(FobResponseModel, error)
        }
    }

    @Post('/getActiveFob')
    async getActiveFob() : Promise<FobResponseModel>{
        try{
            return await this.fobService.getActiveFob()
        }catch(error){
            return this.applicationExceptionhandler.returnException(FobResponseModel, error);
        }
    }

    @Post("/activateOrDeactivate")
  async activateOrDeactivate(@Body() activateDeactivateReq:any) : Promise<AllFobResponseModel>{
    return await this.fobService.ActivateOrDeactivate(activateDeactivateReq)
    }


    @Post('/uploadFobPrice')
    async uploadFobPrice(@Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.fobService.uploadFobPrice(data);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getFobPlanningSeasonCode')
    async getFobPlanningSeasonCode(): Promise<CommonResponseModel> {
        try {
            return this.fobService.getFobPlanningSeasonCode();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getFobPlanningSeasonYear')
    async getFobPlanningSeasonYear(): Promise<CommonResponseModel> {
        try {
            return this.fobService.getFobPlanningSeasonYear();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getFobStyleNumber')
    async getFobStyleNumber(): Promise<CommonResponseModel> {
        try {
            return this.fobService.getFobStyleNumber();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getFobColorCode')
    async getFobColorCode(): Promise<CommonResponseModel> {
        try {
            return this.fobService.getFobColorCode();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getFobSizeDescription')
    async getFobSizeDescription(): Promise<CommonResponseModel> {
        try {
            return this.fobService.getFobSizeDescription();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    
}
