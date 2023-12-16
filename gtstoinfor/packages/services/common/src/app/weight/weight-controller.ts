import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { WeightService } from "./weight-service";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { WeightDto } from "./dto/weight-dto";

@ApiTags('weight')
@Controller('weight')
export class weightController{
    constructor(
        private readonly weightService :WeightService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
    @Post('/createWeight')
    @ApiBody({type: WeightDto})
    async createWeight(@Body() req:any): Promise<CommonResponseModel> {
      console.log(req,"req con")
    try {
        return await this.weightService.createWeight(req,false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/updateWeight')
    @ApiBody({type: WeightDto})
    async updateWeight(@Body() req:any): Promise<CommonResponseModel> {
      console.log(req,"update")
    try {
        return await this.weightService.createWeight(req,true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/getAllActiveWeight')
    async getAllActiveWeight(): Promise<CommonResponseModel> {
    try {
        return await this.weightService.getAllActiveWeight();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }

    @Post('/activeteOrDeactivateWeight')
    async activeteOrDeactivateWeight(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.weightService.activeteOrDeactivateWeight(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/getAllWeight')
    async getAllWeight(): Promise<CommonResponseModel> {
    try {
        return await this.weightService.getAllWeight();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
}