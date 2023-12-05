import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommissionResponseModel, CommonRequestAttrs, CommonResponseModel, TypeActivateReq, TypeReq, TypeResponseModel } from "@project-management-system/shared-models";
import { TrimParamsMappingService } from "./trim-params-mapping.service";
import { TrimParamsMappingRequest } from "./trim-params-mapping.req";
import { TrimIdRequest } from "./trim-id.request";

@ApiTags('TrimParamsMapping')
@Controller('trim-params-mapping')
export class TrimParamsMappingController {
    constructor(
        private trimParamsMappingService: TrimParamsMappingService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }


    @Post('/createMapping')
    @ApiBody({type:TrimParamsMappingRequest})
    async createMapping(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.trimParamsMappingService.createMapping(req,false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
      }
  
      @Post('/updateMapping')
      @ApiBody({type:TrimParamsMappingRequest})
      async updateMapping(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.trimParamsMappingService.createMapping(req,true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
      }
    
      @Post('/getMappedParamsByTrim')
      @ApiBody({type:TrimIdRequest})
      async getMappedParamsByTrim(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.trimParamsMappingService.getMappedParamsByTrim(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
      }
}