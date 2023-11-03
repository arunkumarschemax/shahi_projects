
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BomRequest, BomTrimResponseModel, CommonResponseModel, FgRmMappingResponseModel, ProductStructureResponseModel } from "@project-management-system/shared-models";
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
        console.log(req)
        try {
            return await this.Servie.createSMVEfficency(req, false)
        } catch (error) {
          return (this.applicationExceptionHandler.returnException(ProductStructureResponseModel, error));
        }
    }

    @ApiBody({type:[FgRMMappingDto]})   
    @Post('/createFgRmMapping')
    async createFgRmMapping(@Body() req:any): Promise<FgRmMappingResponseModel> {
      console.log(req)
      try {
          return await this.Servie.createFgRmMapping(req, false)
      } catch (error) {
        return (this.applicationExceptionHandler.returnException(FgRmMappingResponseModel, error));
      }
  }




    }