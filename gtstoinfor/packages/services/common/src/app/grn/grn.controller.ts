import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommonResponseModel } from "@project-management-system/shared-models";
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
  async creteGrn(@Body() dto: any): Promise<CommonResponseModel> {
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

}