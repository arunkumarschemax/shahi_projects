import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { GrnService } from "./grn.service";

@ApiTags('grn')
@Controller('Grn')
export class GrnController {
  constructor(
    private readonly grnService: GrnService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler

  ) { }
  @Post('/creteGrn')
  async creteGrn(@Body() dto: any, isUpdate: boolean = false): Promise<CommonResponseModel> {
    try {
      return await this.grnService.createGrn(dto, false);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/updateGrn')
  async updateGrn(@Body() dto: any, @Req() request: Request): Promise<CommonResponseModel> {
    try {
      return await this.grnService.createGrn(dto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

}