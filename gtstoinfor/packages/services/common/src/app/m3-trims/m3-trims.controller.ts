import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BuyerIdReq, CommonResponseModel, M3TrimTypeRequest } from "@project-management-system/shared-models";
import { M3TrimsDTO } from "./m3-trims.dto";
import { M3TrimsService } from "./m3-trims.service";

@ApiTags('m3Trims')
@Controller('/m3trims')
export class M3TrimsController {
  constructor(private readonly Service: M3TrimsService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }

  @Post('createM3Trims')
  @ApiBody({type:M3TrimsDTO})
  async createM3Trims(@Body() createDto: any): Promise<CommonResponseModel> {
    try {
      return await this.Service.createM3Trims(createDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

  @Post('/getM3Trims')
  async getM3Trims(): Promise<CommonResponseModel> {
    try {
      return await this.Service.getM3Trims();
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
}

@Post('/getM3TrimsByBuyer')
async getM3TrimsByBuyer(@Body() req: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getM3TrimsByBuyer(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getM3TrimsByTrimCode')
async getM3TrimsByTrimCode(@Body() req: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getM3TrimsByTrimCode(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}


}