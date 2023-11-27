import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ReclassificationDTO } from "./reclassification.dto";
import { ReclassificationService } from "./reclassification.service";



@ApiTags('Reclassification')
@Controller('/reclassification')
export class ReclassificationController {
  constructor(private readonly Service: ReclassificationService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }

  @Post('createReclassification')
  @ApiBody({type:ReclassificationDTO})
  async createReclassification(@Body() dto: ReclassificationDTO): Promise<CommonResponseModel> {
    try {
      return await this.Service.createReclassification(dto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

}