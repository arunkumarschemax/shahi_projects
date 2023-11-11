import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { QualityService } from "./quality.service";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { QualityDTO } from "./quality.dto";




@ApiTags('Quality')
@Controller('/quality')
export class QualityController {
  constructor(private readonly Service: QualityService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }

    @Post('createQuality')
    @ApiBody({type:QualityDTO})
    async createQuality(@Body() createDto: any): Promise<CommonResponseModel> {
      try {
        return await this.Service.createQuality(createDto);
      } catch (error) {
        return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
      }
    }

    @Post('/getQuality')
    async getQuality(): Promise<CommonResponseModel> {
      const data=await this.Service.getQuality()
      return  data
  }

  @Post('/activateOrDeactivateQuality')
async activateOrDeactivateQuality(@Body() req: any): Promise<CommonResponseModel> {
  return await this.Service.activateOrDeactivateQuality(req);

}

  }