import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel, RangeResponse } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { RangeService } from './range-service';
import { RangeDTO } from './range-dto/range-dto';

@ApiTags('range')
@Controller('range')
export class RangeController {

    constructor(
      private Service: RangeService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
   
  
  @Post('/getRangeData')
  async getRangeData(): Promise<RangeResponse> {
    try {
      return await this.Service.getRangeData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(RangeResponse, error);
    }
  }
  @Post('/createRange')
  @ApiBody({type:RangeDTO})
  async createRange(@Body() Dto:any): Promise<RangeResponse>{
      try{
          return await this.Service.createRange(Dto,false)
      }catch(error){
          return this.applicationExceptionHandler.returnException(RangeResponse, error)
      }
  }

 @Post('/updateRange')
 @ApiBody({type:RangeDTO})
async updateRange(@Body()request:any): Promise<RangeResponse> {
  try {
     
    return await this.Service.createRange(request, true);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(RangeResponse, error);
  }
}
@Post('/getActiveRange')
    async getActiveRange() : Promise<RangeResponse>{
        try{
            return await this.Service.getActiveRange()
        }catch(error){
            return this.applicationExceptionHandler.returnException(RangeResponse, error);
        }
    }

    @Post("/ActivateOrDeactivate")
  async ActivateOrDeactivate(@Body() activateDeactivateReq:any) : Promise<RangeResponse>{
    return await this.Service.ActivateOrDeactivate(activateDeactivateReq)
    }
}
