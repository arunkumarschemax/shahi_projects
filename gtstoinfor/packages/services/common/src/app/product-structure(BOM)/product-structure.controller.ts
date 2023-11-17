
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BomTrimResponseModel, CommonResponseModel, FgRmMappingResponseModel, ProductStructureResponseModel, RmMappingFilterRequest, SMVFilterRequest } from "@project-management-system/shared-models";
import { ProductStructureService } from "./product-structure.services";
import { SMVEfficiencyDto } from "./dto/smv-efficency.dto";
import { FgRMMappingDto } from "./dto/fg-rm-mapping.dto";
 

@ApiTags('product-structure')
@Controller('product-structure')
export class ProductStructureController {
    constructor(
      private readonly Servie: ProductStructureService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

      @ApiBody({type:SMVEfficiencyDto})   
      @Post('/createSMVEfficency')
      async createSMVEfficency(@Body() req:any): Promise<ProductStructureResponseModel> {
        try {
            return await this.Servie.createSMVEfficency(req, false)
        } catch (error) {
          return (this.applicationExceptionHandler.returnException(ProductStructureResponseModel, error));
        }
    }

    @ApiBody({type:FgRMMappingDto})   
    @Post('/createFgRmMapping')
    async createFgRmMapping(@Body() req:any): Promise<FgRmMappingResponseModel> {
      console.log(req,"cont")
      try {
          return await this.Servie.createFgRmMapping(req, false)
      } catch (error) {
        return (this.applicationExceptionHandler.returnException(FgRmMappingResponseModel, error));
      }
  }

  @Post('/getAllInfoByItemCode')
  async getAllInfoByItemCode(@Body() req:any): Promise<CommonResponseModel> {
    console.log(req)
    try {
        return await this.Servie.getAllInfoByItemCode(req)
    } catch (error) {
      return (this.applicationExceptionHandler.returnException(CommonResponseModel, error));
    }
  }

  @Post('/getRmMapped')
  @ApiBody({type: [RmMappingFilterRequest]})
  async getRmMapped(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.Servie.getRmMapped(req)
    } catch (error) {
      return (this.applicationExceptionHandler.returnException(CommonResponseModel, error));
    }
  }

  @Post('/getAllSmvData')
   @ApiBody({type: [SMVFilterRequest]})
  async getAllSmvData(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.Servie.getAllSmvData(req)
    } catch (error) {
      return (this.applicationExceptionHandler.returnException(CommonResponseModel, error));
    }
}

  @Post('/getFeaturesInfoByFgItem')
  async getFeaturesInfoByFgItem(@Body() req:any): Promise<CommonResponseModel> {
  try {
      return await this.Servie.getFeaturesInfoByFgItem(req)
  } catch (error) {
    return (this.applicationExceptionHandler.returnException(CommonResponseModel, error));
  }
  }

}