import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { RackPositionService } from "./rack-position.service";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { RackPositionDTO } from "./rack-position.dto";


@ApiTags('RM POSITIONS')
@Controller('/positions')
export class RackPositionController {
  constructor(private readonly Service: RackPositionService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }




  @Post('createPosition')
  @ApiBody({type:RackPositionDTO})
  async createPosition(@Body() createDto: any): Promise<CommonResponseModel> {
    try {
      return await this.Service.createPosition(createDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

@Post('getPosition')
  async getPosition(): Promise<CommonResponseModel> {
    const data=await this.Service.getPosition()
    return  data
}


@Post('/activateOrDeactivatePosition')
async activateOrDeactivatePosition(@Body() req: any): Promise<CommonResponseModel> {
  return await this.Service.activateOrDeactivatePosition(req);

}




}