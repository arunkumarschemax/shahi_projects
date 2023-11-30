/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CommonResponseModel, GrnReq } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { GrnService } from "./grn.service";
import { GrnDto, PurchaseOrderReq } from "./dto/grn-dto";

@ApiTags('grn')
@Controller('grn')
export class GrnController {
  constructor(
    private readonly grnService: GrnService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler

  ) { }
  @Post('/createGrn')
  async createGrn(@Body() dto: any): Promise<CommonResponseModel> {
    try {
      return await this.grnService.createGrn(dto);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/updateGrn')
  async updateGrn(@Body() dto: any, @Req() request: Request): Promise<CommonResponseModel> {
    try {
      return await this.grnService.createGrn(dto);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getAllGrn')
  @ApiBody({type:GrnReq})
  async getAllGrn(@Body() dto?: any): Promise<CommonResponseModel> {
    try {
      return await this.grnService.getAllGrn(dto);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  // @Post('/getGrnItemById')
  // @ApiBody({type:GrnReq})
  // async getGrnItemById(@Body()  request: any): Promise<CommonResponseModel> {
  //   try {
  //     return await this.grnService.getGrnItemById(request);
  //   } catch (error) {
  //     return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
  //   }
  // }

  @Post('/getGRNItemsData')
  @ApiBody({type:GrnReq})
  async getGRNItemsData(@Body()  request: any): Promise<CommonResponseModel> {
    try {
      return await this.grnService.getGRNItemsData(request);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getGRNNoData')
  async getGRNNoData(): Promise<CommonResponseModel> {
    try {
      return await this.grnService.getGRNNoData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getPONoData')
  async getPONoData(): Promise<CommonResponseModel> {
    try {
      return await this.grnService.getPONoData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
}