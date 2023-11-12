import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { M3StyleDTO } from "./m3-style.dto";
import { M3StyleService } from "./m3-style.service";





@ApiTags('M3Style')
@Controller('/m3Style')
export class M3StyleController {
  constructor(private readonly Service: M3StyleService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }

    @Post('createM3Style')
    @ApiBody({type:M3StyleDTO})
    async createM3Style(@Body() createDto: any): Promise<CommonResponseModel> {
      try {
        return await this.Service.createM3Style(createDto);
      } catch (error) {
        return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
      }
    }

    @Post('/getM3Style')
    async getM3Style(): Promise<CommonResponseModel> {
      const data=await this.Service.getM3Style()
      return  data
  }

  @Post('/activateOrDeactivateM3Style')
async activateOrDeactivateM3Style(@Body() req: any): Promise<CommonResponseModel> {
  return await this.Service.activateOrDeactivateM3Style(req);

}

}