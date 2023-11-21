import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { M3ItemsService } from "./m3-items.service";
import { M3ItemsDTO } from "./m3-items.dto";



@ApiTags('m3Items')
@Controller('/m3Items')
export class M3ItemsController {
  constructor(private readonly Service: M3ItemsService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }




  @Post('createM3Items')
  @ApiBody({type:M3ItemsDTO})
  async createM3Items(@Body() createDto: any): Promise<CommonResponseModel> {
    try {
      return await this.Service.createM3Items(createDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

  @Post('/getM3Items')
  async getM3Items(): Promise<CommonResponseModel> {
    const data=await this.Service.getM3Items()
    return  data
}

@Post('/getM3FabricsByBuyer')
  async getM3FabricsByBuyer(@Body() req: any): Promise<CommonResponseModel> {
    const data=await this.Service.getM3FabricsByBuyer(req)
    return  data
}
}