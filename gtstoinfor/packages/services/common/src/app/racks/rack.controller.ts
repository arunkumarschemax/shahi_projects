import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { RacksService } from "./rack.service";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { RacksDTO } from "./rack.dto";



@ApiTags('Racks')
@Controller('/racks')
export class RacksController {
  constructor(private readonly Service: RacksService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }




  @Post('createRacks')
  @ApiBody({type:RacksDTO})
  async createRacks(@Body() createDto: any): Promise<CommonResponseModel> {
    try {
      return await this.Service.createRacks(createDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

  @Post('getRacks')
  async getRacks(): Promise<CommonResponseModel> {
    const data=await this.Service.getRacks()
    return  data
}

@Post('/activateOrDeactivateRacks')
async activateOrDeactivateRacks(@Body() req: any): Promise<CommonResponseModel> {
  return await this.Service.activateOrDeactivateRacks(req);

}

}